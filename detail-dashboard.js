/* Synthetic fixtures for the local UX prototype. Never presented as verified statistics. */
const detailDashboardState = { job: 0, major: 0, program: 0 };
const dashboardDemo = {
  postings: [{ year: 2022, value: 72 }, { year: 2023, value: 86 }, { year: 2024, value: 100 }],
  curriculum: [
    { label: "Toán và thống kê", value: 25, color: "var(--blue-600)", note: "Xác suất, thống kê và tư duy định lượng." },
    { label: "Công nghệ dữ liệu", value: 38, color: "var(--teal-600)", note: "Lập trình, cơ sở dữ liệu và xử lý dữ liệu." },
    { label: "Tự chọn ứng dụng", value: 17, color: "var(--orange-600)", note: "Tìm hiểu cách dùng dữ liệu trong từng lĩnh vực." },
    { label: "Dự án và thực tập", value: 20, color: "var(--purple-600)", note: "Làm dự án, trình bày kết quả và trải nghiệm công việc." }
  ],
  years: [
    ["Nền tảng", "Làm quen với toán, tư duy lập trình và cách học ở đại học."],
    ["Công cụ dữ liệu", "Thực hành lập trình, cơ sở dữ liệu và thống kê qua bài tập."],
    ["Ứng dụng", "Phân tích dữ liệu, học phần tự chọn và dự án theo nhóm."],
    ["Dự án & thực tập", "Vận dụng kiến thức trong dự án cuối khóa và trải nghiệm thực tế."]
  ]
};

function dashboardSource(id, scope) {
  return `<div class="dashboard-source"><span>${scope}</span><button class="text-link text-button" type="button" data-source-id="${id}">Nguồn & cách đọc ${icon("arrow-up-right")}</button></div>`;
}

function dashboardStat(label, value, unit, note, iconName, missing = false) {
  return `<article class="dashboard-stat"><div class="stat-top">${icon(iconName)}<span>${label}</span></div><div class="stat-value ${missing ? "dashboard-missing-value" : ""}"><strong>${value}</strong>${unit ? `<small>${unit}</small>` : ""}</div><div class="stat-foot">${note}</div></article>`;
}

function dashboardEmpty(title, copy, source, attrs = "") {
  return `<div class="dashboard-empty" ${attrs}>${icon("chart-no-axes-column")}<strong>${title}</strong><p>${copy}</p>${source ? `<button class="text-link text-button" type="button" data-source-id="${source}">Xem thông tin còn thiếu ${icon("arrow-right")}</button>` : ""}</div>`;
}

function dashboardAccordion(title, iconName, content, open = false) {
  return `<details class="dashboard-accordion" ${open ? "open" : ""}><summary><span>${icon(iconName)}${title}</span>${icon("chevron-down")}</summary><div class="dashboard-accordion-content">${content}</div></details>`;
}

function dashboardPath(kind, index, name, sub) {
  const glyph = { job: "briefcase-business", major: "graduation-cap", program: "school" }[kind];
  return `<button type="button" class="dashboard-path" data-detail-kind="${kind}" data-detail-index="${index}"><span class="icon-box">${icon(glyph)}</span><span><strong>${name}</strong><small>${sub}</small></span>${icon("arrow-right")}</button>`;
}

function renderIndexPlot(period = "all") {
  const points = dashboardDemo.postings.filter((point) => period !== "recent" || point.year >= 2023);
  return `<div class="index-chart" aria-label="Chỉ số tin tuyển dụng minh họa; mốc năm 2024 bằng 100">
    <div class="chart-y-axis" aria-hidden="true">${[100, 75, 50, 25, 0].map((value) => `<span>${value}</span>`).join("")}</div>
    <div class="chart-plot">${points.map(({year, value}) => `<div class="index-column"><span class="bar-value">${value}</span><button class="index-bar" type="button" style="--bar-height:${value}%" data-chart-year="${year}" aria-label="Năm ${year}: chỉ số ${value}, dữ liệu minh họa" aria-pressed="${year === 2024}"></button><span class="bar-year">${year}</span></div>`).join("")}</div>
  </div>`;
}

function renderJobChart(index) {
  if (index !== 0) return `<article class="dashboard-panel"><div class="dashboard-panel-head"><div><h3>Tin tuyển dụng qua các năm</h3><p>Phạm vi: nghề đang xem</p></div></div>${dashboardEmpty("Chưa có chuỗi số liệu cho nghề này", "Bản dùng thử mới có biểu đồ mẫu cho nghề phân tích dữ liệu.", "job-postings-index")}</article>`;
  return `<article class="dashboard-panel" data-job-chart>
    <div class="dashboard-panel-head"><div><h3>Tin tuyển dụng qua các năm</h3><p>Mức xuất hiện của tin tuyển dụng · 2024 = 100</p></div>${badge("Minh họa", "orange")}</div>
    <div class="dashboard-controls"><label>Khu vực<select id="job-region"><option value="all">Toàn quốc</option><option value="hanoi">Hà Nội</option></select></label><label>Giai đoạn<select id="job-period"><option value="all">2022–2024</option><option value="recent">2023–2024</option></select></label></div>
    <div data-job-chart-content><div class="chart-readout" data-chart-readout aria-live="polite"><strong>100</strong><span>Năm 2024 · mốc so sánh</span></div><div data-index-plot>${renderIndexPlot()}</div>
      <details class="chart-table-toggle"><summary>Xem bảng số liệu</summary><table class="data-table"><caption>Chỉ số tin tuyển dụng · Toàn quốc · dữ liệu minh họa</caption><thead><tr><th scope="col">Năm</th><th scope="col">Chỉ số (2024 = 100)</th></tr></thead><tbody data-index-table>${dashboardDemo.postings.map((item) => `<tr><th scope="row">${item.year}</th><td>${item.value}</td></tr>`).join("")}</tbody></table></details>
    </div>
    ${dashboardEmpty("Chưa có số liệu riêng cho Hà Nội", "Bạn có thể quay về Toàn quốc để xem biểu đồ mẫu.", "job-postings-index", 'data-job-chart-empty hidden')}
    ${dashboardSource("job-postings-index", "Số minh họa · không phải số việc làm")}
  </article>`;
}

function renderCompositionBody(id) {
  let offset = 0;
  const arcs = dashboardDemo.curriculum.map((item) => {
    const circle = `<circle cx="90" cy="90" r="69" pathLength="100" fill="none" stroke="${item.color}" stroke-width="22" stroke-dasharray="${item.value} ${100 - item.value}" stroke-dashoffset="${-offset}"></circle>`;
    offset += item.value;
    return circle;
  }).join("");
  return `<div class="composition-layout"><div class="composition-ring"><svg viewBox="0 0 180 180" role="img" aria-labelledby="${id}-chart-title"><title id="${id}-chart-title">Nội dung Chương trình A, số minh họa: Toán 25%, Công nghệ dữ liệu 38%, Tự chọn 17%, Dự án 20%.</title><g transform="rotate(-90 90 90)">${arcs}</g></svg><div class="composition-total"><strong>4</strong><span>nhóm nội dung</span></div></div>
    <div class="composition-rows">${dashboardDemo.curriculum.map((item, index) => `<button type="button" class="composition-item" data-composition-index="${index}" aria-pressed="${index === 1}" style="--segment-color:${item.color};--share:${item.value}%"><span class="composition-label"><span>${item.label}</span><strong>${item.value}%</strong></span><span class="composition-track" aria-hidden="true"><span></span></span></button>`).join("")}</div></div>
    <p class="composition-note" data-composition-note aria-live="polite"><strong>Công nghệ dữ liệu · 38%</strong><br>Lập trình, cơ sở dữ liệu và xử lý dữ liệu.</p>`;
}

function renderCompositionPanel(kind, index) {
  return `<article class="dashboard-panel ${kind === "program" ? "composition-compact" : ""}" data-composition-panel>
    <div class="dashboard-panel-head"><div><h3>${kind === "major" ? "Một chương trình học gồm gì?" : "Cơ cấu nội dung học"}</h3><p>${index === 0 ? "Tỷ trọng minh họa của Chương trình A" : "Chưa có cơ cấu nội dung cho lựa chọn này"}</p></div>${badge("Minh họa", "orange")}</div>
    ${kind === "major" && index === 0 ? `<div class="dashboard-controls"><label>Ví dụ chương trình<select id="major-program"><option value="a">Chương trình A · Hà Nội</option><option value="b">Chương trình B · TP. Hồ Chí Minh</option></select></label></div>` : ""}
    <div data-composition-content ${index !== 0 ? "hidden" : ""}>${renderCompositionBody(kind)}</div>
    ${dashboardEmpty("Chưa có tỷ trọng từng nhóm môn", "Bạn vẫn có thể đọc các nhóm kiến thức và xem thông tin chương trình.", "program-catalogue", `data-composition-empty ${index === 0 ? "hidden" : ""}`)}
    ${dashboardSource("dashboard-curriculum", "Ví dụ một chương trình · không đại diện cả ngành")}
  </article>`;
}

function renderTimeline(index) {
  return `<article class="dashboard-panel"><div class="dashboard-panel-head"><div><h3>Hành trình học tập</h3><p>Chọn từng năm để xem bạn có thể học gì.</p></div>${badge("Minh họa", "orange")}</div>
    <ol class="dashboard-timeline">${dashboardDemo.years.map((year, i) => `<li><button class="timeline-step" type="button" data-study-year="${i + 1}" aria-pressed="${i === 0}"><span class="timeline-year">${i + 1}</span><small>${index === 2 && i === 3 ? "Nửa năm cuối" : `Năm ${i + 1}`}</small><strong>${year[0]}</strong></button></li>`).join("")}</ol>
    <div class="timeline-note" data-timeline-note aria-live="polite"><strong>Năm 1 · Nền tảng</strong><p>${dashboardDemo.years[0][1]}</p></div>
    ${dashboardSource("dashboard-timeline", "Lộ trình gợi hình dung · tùy chương trình thực tế")}
  </article>`;
}

function renderDashboardRelated(kind) {
  if (kind === "job") return `<div class="dashboard-related">${searchVariants.major.cards.map((item, i) => `<article><span class="dashboard-caption">Ngành học</span><h3>${item[0]}</h3><p>${item[2].slice(0, 2).join(" · ")}</p><button class="text-link text-button" type="button" data-detail-kind="major" data-detail-index="${i}">Tìm hiểu ngành ${icon("arrow-right")}</button></article>`).join("")}</div>`;
  if (kind === "major") return `<div class="dashboard-related">${searchVariants.program.cards.map((item, i) => `<article><span class="dashboard-caption">Cơ sở đào tạo ${["A", "B", "C"][i]} · ${["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"][i]}</span><h3>${item[0]}</h3><p>${i === 2 ? "3,5" : "4"} năm · Học phí chưa có số liệu</p><button class="text-link text-button" type="button" data-detail-kind="program" data-detail-index="${i}">Xem chương trình ${icon("arrow-right")}</button></article>`).join("")}</div>`;
  return `<div class="dashboard-related"><article><span class="dashboard-caption">Ngành học</span><h3>Khoa học dữ liệu</h3><p>Khối kiến thức và các hướng nghề.</p><button class="text-link text-button" type="button" data-detail-kind="major" data-detail-index="0">Xem ngành ${icon("arrow-right")}</button></article><article><span class="dashboard-caption">Nghề liên quan</span><h3>Chuyên viên phân tích dữ liệu</h3><p>Công việc thực tế và số liệu thị trường.</p><button class="text-link text-button" type="button" data-detail-kind="job" data-detail-index="0">Xem nghề ${icon("arrow-right")}</button></article><article><span class="dashboard-caption">Lựa chọn của bạn</span><h3>Ghi lại điều cần hỏi</h3><p>Học phí, học bổng và điều kiện tuyển sinh.</p>${button("Lưu danh sách", "outline", "list-checks", "data-checklist-save")}</article></div>`;
}

function renderDashboardDetails(kind, index) {
  const card = searchVariants[kind].cards[index];
  if (kind === "job") return `<div class="dashboard-accordions">
    ${dashboardAccordion("Một ngày làm việc", "sun", `<div class="module-grid">${card[2].map((activity, i) => `<div class="module-row"><span class="module-index">0${i + 1}</span><div><strong>${activity}</strong><span>${["Trao đổi để hiểu mục tiêu và đầu ra cần có.", "Thực hành với dữ liệu, kiểm tra lại cách làm.", "Chia sẻ kết quả và ghi rõ điều còn chưa biết."][i]}</span></div></div>`).join("")}</div>`, true)}
    ${dashboardAccordion("Môi trường và kỹ năng", "users", `<div class="two-column"><div><h3>Cách làm việc</h3><p>Kết hợp làm việc tập trung và trao đổi với đồng nghiệp. Công cụ, nhịp độ và nhiệm vụ thay đổi theo từng nơi làm việc.</p></div><div><h3>Điều nên thử</h3><p>Thực hiện một bài tập nhỏ về ${card[2][0].toLowerCase()}, rồi giải thích kết quả cho một người khác.</p></div></div>`)}
    ${dashboardAccordion("Thu nhập và thông tin còn thiếu", "wallet", `<div class="missing-panel"><span class="missing-icon">${icon("circle-minus")}</span><div><strong>Chưa có số liệu thu nhập phù hợp</strong><p>Cần cùng nghề, khu vực và mức kinh nghiệm để đọc một khoảng thu nhập có ý nghĩa.</p></div>${button("Xem nguồn", "outline", "info", 'data-source-id="salary-gap"')}</div>`)}
  </div>`;
  if (kind === "major") return `<div class="dashboard-accordions">
    ${dashboardAccordion("Các nhóm kiến thức", "book-open", `<div class="module-grid">${card[2].map((activity, i) => `<div class="module-row"><span class="module-index">0${i + 1}</span><div><strong>${activity}</strong><span>Xem đề cương từng chương trình để biết các môn và yêu cầu cụ thể.</span></div></div>`).join("")}</div>`, true)}
    ${dashboardAccordion("Bạn có thể chuẩn bị gì?", "backpack", `<div class="two-column"><div><h3>Thử từ một việc nhỏ</h3><p>Làm một bài tập về ${card[2][0].toLowerCase()}. Ghi lại điều bạn thấy thú vị và điều còn khó.</p></div><div><h3>Tìm hiểu cách học</h3><p>Xem đề cương, bài tập mẫu và trao đổi với sinh viên. Bạn không cần giỏi sẵn mọi thứ.</p></div></div>`)}
    ${dashboardAccordion("Những điểm cần xem ở từng trường", "list-checks", `<ul class="info-list"><li>${icon("book-open")}Nội dung học và cách đánh giá</li><li>${icon("wallet")}Học phí, học bổng và chi phí sinh hoạt</li><li>${icon("calendar")}Thời lượng, điều kiện và năm tuyển sinh</li></ul>`)}
  </div>`;
  return `<div class="dashboard-accordions">
    ${dashboardAccordion("Điều kiện tuyển sinh", "clipboard-list", `<div class="dashboard-controls"><label>Năm tuyển sinh<select id="program-year"><option value="2026">2026</option><option value="2027">2027</option></select></label><span class="dashboard-caption" data-admission-status aria-live="polite">Thông tin minh họa · 2026</span></div><div data-admission-content><table class="data-table"><thead><tr><th scope="col">Phương thức</th><th scope="col">Cần kiểm tra</th><th scope="col">Năm</th></tr></thead><tbody><tr><td>Kết quả thi THPT</td><td>Tổ hợp và ngưỡng nhận hồ sơ</td><td>2026</td></tr><tr><td>Kết quả học tập</td><td>Điều kiện học bạ và từng đợt xét</td><td>2026</td></tr><tr><td>Phương thức khác</td><td>Theo đề án của trường</td><td>2026</td></tr></tbody></table></div>${dashboardEmpty("Chưa có thông tin tuyển sinh 2027", "Hãy kiểm tra thông báo đúng năm của trường.", "program-official", "data-admission-empty hidden")}${dashboardSource("program-official", "Cơ sở đào tạo minh họa")}`, true)}
    ${dashboardAccordion("Học phí và học bổng", "wallet-cards", `<div class="missing-panel"><span class="missing-icon">${icon("wallet")}</span><div><strong>Chưa có học phí cùng năm để so sánh</strong><p>Cần biết mức phí theo năm hay tín chỉ và các khoản khác phải đóng.</p></div>${button("Xem nguồn", "outline", "info", 'data-source-id="program-tuition-gap"')}</div>`)}
    ${dashboardAccordion("Việc cần hỏi thêm", "messages-square", `<ul class="info-list"><li>${icon("check")}Tổng chi phí toàn khóa gồm những gì?</li><li>${icon("check")}Có học bổng và điều kiện duy trì nào?</li><li>${icon("check")}Dự án và thực tập được tổ chức ra sao?</li></ul>${button("Lưu danh sách", "outline", "bookmark-check", "data-checklist-save")}`)}
  </div>`;
}

function renderDetailDashboard(kind) {
  const index = detailDashboardState[kind];
  const item = searchVariants[kind].cards[index];
  const config = {
    job: { number: "03", label: "Nghề", glyph: "briefcase-business", summary: "Công việc, số liệu và những đường học liên quan", section: "Hiểu công việc", related: "Những đường học để tìm hiểu", metadata: [["tags", index === 0 ? "Data Analyst" : "Công việc với dữ liệu"], ["map-pin", "Dữ liệu: toàn quốc"]] },
    major: { number: "04", label: "Ngành học", glyph: "graduation-cap", summary: "Nội dung học và các hướng đi sau này", section: "Nội dung & cách học", related: "Tìm chương trình đào tạo", metadata: [["book-open", "Máy tính và dữ liệu"], ["school", item[3]]] },
    program: { number: "05", label: "Trường & chương trình", glyph: "school", summary: "Thời lượng, nội dung học và điều kiện tuyển sinh", section: "Tuyển sinh & chi phí", related: "Tìm hiểu tiếp", metadata: [["school", `Cơ sở đào tạo ${["A", "B", "C"][index]}`], ["map-pin", ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"][index]], ["calendar", "Tuyển sinh 2026"]] }
  }[kind];
  const id = `screen-${kind}-detail`;
  const title = item[0];
  let stats;
  let charts;
  if (kind === "job") {
    stats = dashboardStat("Chỉ số tin tuyển dụng", index === 0 ? "100" : "Chưa có số liệu", index === 0 ? "điểm" : "", index === 0 ? "Năm 2024 · mốc so sánh · minh họa" : "Chưa có chuỗi số liệu trong bản dùng thử", "chart-column", index !== 0)
      + dashboardStat("Đường học liên quan", [6, 5, 7][index], "ngành", "Số trong danh mục minh họa", "route")
      + dashboardStat("Thu nhập", "Chưa có số liệu", "", "Cần dữ liệu cùng khu vực và kinh nghiệm", "wallet", true);
    charts = `${renderJobChart(index)}<article class="dashboard-panel"><div class="dashboard-panel-head"><div><h3>Bắt đầu từ ngành nào?</h3><p>Một số đường học bạn có thể tìm hiểu.</p></div></div><div class="dashboard-paths">${searchVariants.major.cards.map((card, i) => dashboardPath("major", i, card[0], card[2][0])).join("")}</div><p class="dashboard-caption">Một nghề có thể đi từ nhiều ngành học.</p><button class="text-link text-button" type="button" data-nav="screen-model">Xem xu hướng đến 2028 ${icon("arrow-right")}</button></article>`;
  } else if (kind === "major") {
    stats = dashboardStat("Nội dung nền tảng", "3", "nhóm kiến thức", "Các nhóm khái quát bên dưới", "book-open")
      + dashboardStat("Chương trình để tìm hiểu", [12, 18, 7][index], "chương trình", "Số trong danh mục minh họa", "school")
      + dashboardStat("Thời gian và học phí", "Theo chương trình", "", "Xem riêng ở từng cơ sở đào tạo", "calendar-days", true);
    charts = `${renderCompositionPanel(kind, index)}<article class="dashboard-panel"><div class="dashboard-panel-head"><div><h3>Học xong có thể tìm hiểu nghề gì?</h3><p>Các hướng nghề trong bản dùng thử.</p></div></div><div class="dashboard-paths">${searchVariants.job.cards.map((card, i) => dashboardPath("job", i, card[0], card[2][0])).join("")}</div><a class="text-link" href="#screen-search" data-nav="screen-search" data-search-preset="job">${index === 0 ? "Xem toàn bộ 8 nghề" : "Xem danh mục nghề"} ${icon("arrow-right")}</a></article>`;
  } else {
    stats = dashboardStat("Thời lượng", index === 2 ? "3,5" : "4", "năm", "Toàn thời gian · chương trình minh họa", "calendar-days")
      + dashboardStat("Địa điểm học", ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"][index], "", `Cơ sở đào tạo ${["A", "B", "C"][index]} · minh họa`, "map-pin", true)
      + dashboardStat("Học phí năm 2026", "Chưa có số liệu", "", "Chưa đủ thông tin để tính chi phí toàn khóa", "wallet", true);
    charts = `${renderTimeline(index)}${renderCompositionPanel(kind, index)}`;
  }
  return screenFrame(id, `${config.number} · ${config.label}`, config.summary, `
    <div class="dashboard-page" data-dashboard-kind="${kind}">
      ${portalHeader("Tra cứu")}
      ${crumbs(["Trang chủ", `Tra cứu ${config.label.toLowerCase()}`, title])}
      <section class="entity-hero dashboard-hero"><div class="content-container entity-head"><div class="dashboard-identity"><span class="dashboard-mark">${icon(config.glyph)}</span><div class="entity-title"><div class="entity-type">${badge(config.label, "blue")}${badge("Dữ liệu minh họa", "orange", "flask-conical")}</div><h1>${title}</h1><p>${item[1]}</p><div class="dashboard-meta">${config.metadata.map(([glyph, label]) => `<span>${icon(glyph)}${label}</span>`).join("")}</div></div></div><div class="entity-actions">${button("Lưu", "outline", "bookmark", `data-detail-save="${kind}-${index}" aria-pressed="false"`)}${button("So sánh", "primary", "columns-3", `data-detail-compare="${kind}"`)}</div></div></section>
      <div class="content-container dashboard-layout"><nav class="anchor-nav dashboard-nav" aria-label="Nội dung ${config.label.toLowerCase()}"><a href="#${kind}-overview" class="active" data-detail-target="${kind}-overview">Tổng quan</a><a href="#${kind}-learn" data-detail-target="${kind}-learn">${config.section}</a><a href="#${kind}-related" data-detail-target="${kind}-related">${config.related}</a></nav>
        <section class="dashboard-section" id="${kind}-overview"><div class="dashboard-section-head"><h2>Nhìn nhanh ${kind === "job" ? "về nghề" : kind === "major" ? "về ngành" : "về chương trình"}</h2><span class="dashboard-caption">${kind === "job" ? "Số liệu mẫu 2022–2024" : "Thông tin trong bản dùng thử"}</span></div><div class="dashboard-stats">${stats}</div><div class="dashboard-grid">${charts}</div></section>
        <section class="dashboard-section" id="${kind}-learn"><div class="dashboard-section-head"><h2>${config.section}</h2><button class="text-link text-button" type="button" data-expand-sections aria-expanded="false">Mở tất cả ${icon("chevrons-down")}</button></div>${renderDashboardDetails(kind, index)}</section>
        <section class="dashboard-section" id="${kind}-related"><div class="dashboard-section-head"><h2>${config.related}</h2><button class="text-link text-button" type="button" data-nav="screen-search" data-search-preset="${kind === "job" ? "major" : "program"}">Xem danh mục ${icon("arrow-right")}</button></div>${renderDashboardRelated(kind)}</section>
      </div>${footer()}
    </div>`, 1400);
}

function openDetailDashboard(kind, index = 0) {
  if (!searchVariants[kind]?.cards[index]) return;
  detailDashboardState[kind] = index;
  const current = document.getElementById(`screen-${kind}-detail`);
  current.outerHTML = renderDetailDashboard(kind);
  showPrototypeScreen(`screen-${kind}-detail`);
  refreshIcons();
}

function handleDashboardClick(event) {
  const target = event.target;
  const destination = target.closest("[data-detail-kind]");
  if (destination) { openDetailDashboard(destination.dataset.detailKind, Number(destination.dataset.detailIndex)); return true; }
  const compare = target.closest("[data-detail-compare]");
  if (compare) { applyCompareMode(compare.dataset.detailCompare); showPrototypeScreen("screen-compare"); return true; }
  const save = target.closest("[data-detail-save]");
  if (save) {
    const active = save.getAttribute("aria-pressed") !== "true";
    save.setAttribute("aria-pressed", String(active));
    save.innerHTML = `${icon(active ? "bookmark-check" : "bookmark")}${active ? "Đã lưu" : "Lưu"}`;
    changeSavedCount(active ? 1 : -1); refreshIcons(); showToast(active ? "Đã lưu lựa chọn trong phiên dùng thử." : "Đã bỏ lưu lựa chọn."); return true;
  }
  const anchor = target.closest("[data-detail-target]");
  if (anchor) {
    event.preventDefault();
    anchor.closest(".dashboard-nav").querySelectorAll("a").forEach((link) => { link.classList.toggle("active", link === anchor); link.setAttribute("aria-current", link === anchor ? "location" : "false"); });
    document.getElementById(anchor.dataset.detailTarget)?.scrollIntoView({ behavior: "smooth", block: "start" }); return true;
  }
  const expand = target.closest("[data-expand-sections]");
  if (expand) {
    const open = expand.getAttribute("aria-expanded") !== "true";
    expand.closest(".dashboard-section").querySelectorAll(".dashboard-accordion").forEach((node) => { node.open = open; });
    expand.setAttribute("aria-expanded", String(open)); expand.innerHTML = `${open ? "Thu gọn tất cả" : "Mở tất cả"} ${icon(open ? "chevrons-up" : "chevrons-down")}`; refreshIcons(); return true;
  }
  const year = target.closest("[data-chart-year]");
  if (year) { updateDashboardReadout(year); return true; }
  const composition = target.closest("[data-composition-index]");
  if (composition) {
    const item = dashboardDemo.curriculum[Number(composition.dataset.compositionIndex)];
    const panel = composition.closest("[data-composition-panel]");
    panel.querySelectorAll("[data-composition-index]").forEach((node) => node.setAttribute("aria-pressed", String(node === composition)));
    panel.querySelector("[data-composition-note]").innerHTML = `<strong>${item.label} · ${item.value}%</strong><br>${item.note}`; return true;
  }
  const timeline = target.closest("[data-study-year]");
  if (timeline) {
    const yearIndex = Number(timeline.dataset.studyYear) - 1;
    const note = dashboardDemo.years[yearIndex];
    const panel = timeline.closest(".dashboard-panel");
    panel.querySelectorAll("[data-study-year]").forEach((node) => node.setAttribute("aria-pressed", String(node === timeline)));
    panel.querySelector("[data-timeline-note]").innerHTML = `<strong>${timeline.querySelector("small").textContent} · ${note[0]}</strong><p>${note[1]}</p>`; return true;
  }
  return false;
}

function updateDashboardReadout(buttonNode) {
  const point = dashboardDemo.postings.find((item) => item.year === Number(buttonNode.dataset.chartYear));
  const chart = buttonNode.closest("[data-job-chart]");
  chart.querySelectorAll("[data-chart-year]").forEach((node) => node.setAttribute("aria-pressed", String(node === buttonNode)));
  chart.querySelector("[data-chart-readout]").innerHTML = `<strong>${point.value}</strong><span>Năm ${point.year}${point.year === 2024 ? " · mốc so sánh" : " · chỉ số tin tuyển dụng"}</span>`;
}

function initDetailDashboards() {
  document.addEventListener("change", (event) => {
    const field = event.target;
    if (field.id === "job-region") {
      const chart = field.closest("[data-job-chart]");
      const missing = field.value !== "all";
      chart.querySelector("[data-job-chart-content]").hidden = missing;
      chart.querySelector("[data-job-chart-empty]").hidden = !missing;
      chart.querySelector("#job-period").disabled = missing;
    }
    if (field.id === "job-period") {
      const chart = field.closest("[data-job-chart]");
      chart.querySelector("[data-index-plot]").innerHTML = renderIndexPlot(field.value);
      chart.querySelector("[data-index-table]").innerHTML = dashboardDemo.postings.filter((point) => field.value !== "recent" || point.year >= 2023).map((item) => `<tr><th scope="row">${item.year}</th><td>${item.value}</td></tr>`).join("");
      updateDashboardReadout(chart.querySelector("[data-chart-year='2024']"));
    }
    if (field.id === "major-program") {
      const panel = field.closest("[data-composition-panel]");
      const missing = field.value !== "a";
      panel.querySelector("[data-composition-content]").hidden = missing;
      panel.querySelector("[data-composition-empty]").hidden = !missing;
      panel.querySelector(".dashboard-panel-head p").textContent = missing ? "Chương trình B · Chưa có cơ cấu nội dung" : "Tỷ trọng minh họa của Chương trình A";
    }
    if (field.id === "program-year") {
      const section = field.closest(".dashboard-accordion-content");
      const missing = field.value === "2027";
      section.querySelector("[data-admission-content]").hidden = missing;
      section.querySelector("[data-admission-empty]").hidden = !missing;
      section.querySelector("[data-admission-status]").textContent = missing ? "Chưa có dữ liệu · 2027" : "Thông tin minh họa · 2026";
    }
  });
  document.addEventListener("focusin", (event) => {
    if (event.target.matches("[data-chart-year]")) updateDashboardReadout(event.target);
  });
  document.addEventListener("pointerover", (event) => {
    const node = event.target.closest("[data-chart-year]");
    if (node) updateDashboardReadout(node);
  });
}
