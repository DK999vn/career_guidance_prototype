const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.join(__dirname, "qa");
const reportPath = path.join(outputDir, "qa-dashboards-report.json");
const screens = ["screen-job-detail", "screen-major-detail", "screen-program-detail"];
const report = {
  scope: "Web/Desktop dashboards and search results",
  widths: [1280, 1440, 1920],
  checks: [],
  layouts: [],
  screenshots: [],
  consoleErrors: [],
  pageErrors: []
};

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function inspectLayout(page, selector, kind) {
  return page.locator(selector).evaluate((root, layoutKind) => {
    const tolerance = 2;
    const visible = (node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" &&
        style.display !== "none" && !node.closest("[hidden]");
    };
    const outer = root.getBoundingClientRect();
    const issues = [];
    const controls = root.querySelectorAll("button, h1, h2, h3, select");
    for (const node of controls) {
      if (!visible(node)) continue;
      const rect = node.getBoundingClientRect();
      const card = layoutKind === "search" ? node.closest(".result-card") : null;
      const bounds = card ? card.getBoundingClientRect() : outer;
      let scrollContainer = null;
      for (let parent = node.parentElement; parent && parent !== root; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (/auto|scroll/.test(style.overflowX) && parent.scrollWidth > parent.clientWidth + tolerance) {
          scrollContainer = parent;
          break;
        }
      }
      if (scrollContainer) continue;
      if (rect.left < bounds.left - tolerance || rect.right > bounds.right + tolerance ||
          rect.top < bounds.top - tolerance || rect.bottom > bounds.bottom + tolerance) {
        issues.push({ type: "outside-container", tag: node.tagName, text: node.textContent.trim().slice(0, 90) });
      }
      const style = getComputedStyle(node);
      if (node.tagName !== "SELECT" && !/auto|scroll/.test(style.overflowX) &&
          style.textOverflow !== "ellipsis" && node.scrollWidth > node.clientWidth + tolerance) {
        issues.push({ type: "text-overflow", tag: node.tagName, text: node.textContent.trim().slice(0, 90) });
      }
    }
    if (layoutKind === "search") {
      for (const card of root.querySelectorAll(".result-card")) {
        if (!visible(card)) continue;
        const rect = card.getBoundingClientRect();
        if (rect.left < outer.left - tolerance || rect.right > outer.right + tolerance) {
          issues.push({ type: "card-outside-results", text: card.querySelector("h3")?.textContent });
        }
      }
    }
    return {
      width: innerWidth,
      rootScrollWidth: root.scrollWidth,
      rootClientWidth: root.clientWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + tolerance ||
        root.scrollWidth > root.clientWidth + tolerance,
      issues
    };
  }, kind);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(8000);
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => report.pageErrors.push(error.message));

  const check = async (name, run) => {
    try {
      const detail = await run();
      report.checks.push({ name, passed: true, ...(detail ? { detail } : {}) });
    } catch (error) {
      report.checks.push({ name, passed: false, error: error.message });
      const file = `dashboard-failure-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
      await page.screenshot({ path: path.join(outputDir, file) }).catch(() => {});
    }
  };
  const open = async (screenId) => {
    await page.evaluate((id) => showPrototypeScreen(id), screenId);
    await page.locator(`#${screenId}.is-active`).waitFor({ state: "visible" });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  };
  const saveScreenshot = async (name, fullPage = false) => {
    await page.screenshot({ path: path.join(outputDir, name), fullPage, animations: "disabled" });
    report.screenshots.push(name);
  };

  try {
    await page.goto("http://127.0.0.1:4173/#screen-home", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (const width of report.widths) {
      await page.setViewportSize({ width, height: 960 });
      for (const id of screens) {
        await check(`${id}-${width}-layout`, async () => {
          await open(id);
          const dashboard = page.locator(`#${id} .dashboard-page`);
          await dashboard.waitFor({ state: "visible" });
          assert.equal(await dashboard.locator(".dashboard-stat").count(), 3, "Expected three key fact cards");
          const layout = await inspectLayout(page, `#${id} .dashboard-page`, "dashboard");
          report.layouts.push({ id, ...layout });
          await saveScreenshot(`dashboard-${id.replace("screen-", "")}-${width}.png`);
          if (width === 1440) await saveScreenshot(`dashboard-${id.replace("screen-", "")}-1440-full.png`, true);
          assert.equal(layout.horizontalOverflow, false, "Dashboard or page has horizontal overflow");
          assert.deepEqual(layout.issues, [], "Controls or headings overflow their dashboard");
        });
      }
      for (const mode of ["job", "major", "program"]) {
        await check(`search-${mode}-${width}-layout`, async () => {
          await open("screen-search");
          await page.locator(`#screen-search [data-search-mode='${mode}']`).click();
          const layout = await inspectLayout(page, "#screen-search .artboard", "search");
          report.layouts.push({ id: `search-${mode}`, ...layout });
          await saveScreenshot(`dashboard-search-${mode}-${width}.png`);
          assert.equal(layout.horizontalOverflow, false, "Search page has horizontal overflow");
          assert.deepEqual(layout.issues, [], "Search card actions overflow their card");
          assert.equal(await page.locator("#screen-search .result-summary").count(), 0, "Removed short descriptions must not return");
        });
      }
    }

    await page.setViewportSize({ width: 1440, height: 960 });
    await check("job-region-period-and-chart-value", async () => {
      await open("screen-job-detail");
      const root = page.locator("#screen-job-detail");
      await root.locator("#job-region").selectOption("hanoi");
      assert.equal(await root.locator("[data-job-chart-empty]").isVisible(), true, "Hanoi must show its missing-data state");
      assert.equal(await root.locator("[data-job-chart-content]").isVisible(), false, "National data must not remain for Hanoi");
      await root.locator("#job-region").selectOption("all");
      assert.equal(await root.locator("[data-job-chart-content]").isVisible(), true);
      assert.equal(await root.locator("[data-job-chart-empty]").isVisible(), false);
      await root.locator("#job-period").selectOption("all");
      assert.equal(await root.locator("[data-chart-year]:visible").count(), 3);
      await root.locator("#job-period").selectOption("recent");
      assert.equal(await root.locator("[data-chart-year]:visible").count(), 2);
      await root.locator("[data-chart-year='2023']").click();
      assert.match(await root.locator("[data-chart-readout]").textContent(), /86/);
      await root.locator("#job-period").selectOption("all");
    });

    await check("job-source-drawer-keyboard-close", async () => {
      await open("screen-job-detail");
      await page.locator("#screen-job-detail [data-source-id='job-postings-index']").first().click();
      const drawer = page.locator("[data-source-drawer]");
      assert.equal(await drawer.getAttribute("aria-hidden"), "false");
      assert.match(await drawer.locator("[data-source-field='title']").textContent(), /tin tuyển dụng/);
      await page.keyboard.press("Escape");
      assert.equal(await drawer.getAttribute("aria-hidden"), "true");
    });

    await check("major-program-composition-and-missing-state", async () => {
      await open("screen-major-detail");
      const root = page.locator("#screen-major-detail");
      await root.locator("#major-program").selectOption("b");
      assert.equal(await root.locator(".dashboard-empty:visible").count() > 0, true, "Program B must show missing curriculum data");
      assert.equal(await root.locator(".composition-ring:visible").count(), 0, "Program B must not inherit Program A's ring");
      await root.locator("#major-program").selectOption("a");
      assert.equal(await root.locator(".composition-ring:visible").count(), 1);
      await root.locator("[data-composition-index='1']").click();
      assert.match(await root.locator("[data-composition-note]").textContent(), /38%/);
    });

    await check("program-timeline-admission-and-accordion", async () => {
      await open("screen-program-detail");
      const root = page.locator("#screen-program-detail");
      await root.locator(".timeline-step[data-study-year='2']").click();
      assert.match(await root.locator("[data-timeline-note]").textContent(), /Năm 2/);
      await root.locator("#program-year").selectOption("2026");
      const initial = normalize(await root.locator("[data-admission-status]").textContent());
      await root.locator("#program-year").selectOption("2027");
      const missing = normalize(await root.locator("[data-admission-status]").textContent());
      assert.notEqual(missing, initial, "Changing the admission year must update the displayed status");
      assert.match(missing, /chưa|thiếu/i, "2027 must show missing information");
      await root.locator("#program-year").selectOption("2026");
      const details = root.locator("details").first();
      const wasOpen = await details.evaluate((node) => node.open);
      await details.locator("summary").click();
      assert.equal(await details.evaluate((node) => node.open), !wasOpen, "Accordion must toggle");
    });

    for (const [mode, id] of [["job", screens[0]], ["major", screens[1]], ["program", screens[2]]]) {
      await check(`${mode}-compare-type`, async () => {
        await open(id);
        await page.locator(`#${id} [data-detail-compare]`).first().click();
        assert.equal(await page.locator("#screen-compare.is-active").count(), 1);
        assert.equal(await page.evaluate(() => prototypeState.compareMode), mode, "Compare must preserve the selected entity type");
      });
      await check(`search-${mode}-second-result-identity`, async () => {
        await open("screen-search");
        await page.locator(`#screen-search [data-search-mode='${mode}']`).click();
        const card = page.locator("#screen-search .result-card").nth(1);
        const selectedName = normalize(await card.locator("h3").textContent());
        await card.locator(".btn-primary").click();
        const root = page.locator(`#${id}`);
        const heading = normalize(await root.locator("h1").textContent());
        assert.equal(heading, selectedName, "Detail must display the selected result rather than the first result");
        if (mode === "job") {
          assert.equal(await root.locator("[data-job-chart-content]").isVisible(), false, "A second job must not inherit the Data Analyst series");
          assert.equal(await root.locator("[data-job-chart-empty]").isVisible(), true);
        }
        if (mode === "major") {
          assert.equal(await root.locator(".composition-ring:visible").count(), 0, "A second major must not inherit the first major's composition");
        }
        if (mode === "program") {
          assert.match(await root.locator(".dashboard-page").textContent(), /TP\. Hồ Chí Minh/);
        }
        await saveScreenshot(`dashboard-${mode}-second-result-1440.png`, true);
        return { selectedName, heading };
      });
    }
    await check("browser-errors", async () => {
      assert.deepEqual(report.consoleErrors, [], "Browser console errors were reported");
      assert.deepEqual(report.pageErrors, [], "Uncaught browser exceptions were reported");
    });
  } catch (error) {
    report.checks.push({ name: "setup-or-unhandled-failure", passed: false, error: error.message });
  } finally {
    report.passed = report.checks.length > 0 && report.checks.every((item) => item.passed);
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    process.stdout.write(`${JSON.stringify({ passed: report.passed, checks: report.checks.length, failures: report.checks.filter((item) => !item.passed), reportPath }, null, 2)}\n`);
    await browser.close();
    if (!report.passed) process.exitCode = 1;
  }
})().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
