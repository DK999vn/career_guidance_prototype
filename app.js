const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

const vnIcon = (name) => {
  const paths = {
    pho: `<path d="M4 11h16c-.5 5-3.3 8-8 8s-7.5-3-8-8Z"/><path d="M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4M17 7c0-2 2-2 2-4"/><path d="M3 11h18"/>`,
    motorbike: `<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M7 17h5l3-6h3M10 17 8 11h4l3 3h3M16 8h3"/>`,
    rice: `<path d="M12 21V6M12 10c-4 0-6-2-6-5 4 0 6 2 6 5ZM12 14c4 0 6-2 6-5-4 0-6 2-6 5ZM12 18c-4 0-6-2-6-5 4 0 6 2 6 5Z"/>`,
    pavilion: `<path d="M3 9h18L16 5H8L3 9ZM6 10v9M10 10v9M14 10v9M18 10v9M4 20h16"/><path d="m7 5 5-3 5 3"/>`,
    lotus: `<path d="M12 20c-5-2-7-5-6-9 3 0 5 1 6 4 1-3 3-4 6-4 1 4-1 7-6 9Z"/><path d="M12 15c-3-2-4-5 0-9 4 4 3 7 0 9Z"/><path d="M4 21h16"/>`
  };
  return `<svg class="vn-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.lotus}</svg>`;
};

const badge = (label, tone = "blue", iconName = "") =>
  `<span class="badge badge-${tone}">${iconName ? icon(iconName) : ""}${label}</span>`;

const button = (label, variant = "primary", iconName = "", attrs = "") =>
  `<button class="btn btn-${variant}" type="button" ${attrs}>${iconName ? icon(iconName) : ""}${label}</button>`;

function portalHeader(active = "Trang chủ") {
  const nav = ["Tra cứu", "So sánh", "Khám phá bản thân", "Tiện ích", "Về dữ liệu"];
  return `
    <div class="official-band">
      <span>BẢN DÙNG THỬ · DỮ LIỆU MINH HỌA</span>
      <div class="official-right"><span>Quyền quyết định thuộc về bạn</span></div>
    </div>
    <header class="site-header">
      <a class="brand" href="#screen-home" data-nav="screen-home" aria-label="Thử Nghề - Trang chủ">
        <span class="brand-mark">T</span>
        <span class="brand-copy">
          <span class="brand-name">Thử Nghề</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="Điều hướng chính">
        ${nav.map((item) => {
          const target = { "Tra cứu": "screen-search", "So sánh": "screen-compare", "Khám phá bản thân": "screen-discovery-question", "Tiện ích": "screen-saved", "Về dữ liệu": "screen-about-data" }[item];
          return `<a class="nav-link ${item === active ? "active" : ""}" href="#${target}" data-nav="${target}">${item}</a>`;
        }).join("")}
      </nav>
      <div class="header-actions">
        <button class="icon-button" type="button" aria-label="Tìm kiếm" data-nav="screen-search">${icon("search")}</button>
        ${button("Trợ lý", "soft", "sparkles", `data-nav="screen-agent"`)}
        ${button("Đã lưu 3", "outline", "bookmark", `data-nav="screen-saved" data-save-count="3"`)}
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="content-container footer-row">
        <div class="footer-note"><strong>Thử Nghề</strong><br>Prototype hỗ trợ học sinh tra cứu và đối chiếu lựa chọn. Không thay thế tư vấn tuyển sinh, hướng nghiệp hoặc nguồn chính thức của cơ sở đào tạo.</div>
        <div class="footer-links"><span>Điều khoản dữ liệu</span><span>Khả năng tiếp cận</span><span>Liên hệ</span></div>
      </div>
    </footer>`;
}

function crumbs(items) {
  return `<div class="content-container crumbs">${items.map((item, index) => `${index ? icon("chevron-right") : ""}<span>${item}</span>`).join("")}</div>`;
}

function screenFrame(id, title, description, content, minHeight = 1120) {
  return `
    <section class="screen-shell" id="${id}" data-screen="${id}">
      <div class="screen-label">
        <h2>${title}</h2>
        <span>${description}</span>
      </div>
      <article class="artboard" style="min-height:${minHeight}px">${content}</article>
    </section>`;
}

function homeScreen() {
  return screenFrame(
    "screen-home",
    "01 · Home",
    "First visit · 1440 px",
    `
      ${portalHeader("Trang chủ")}
      <section class="hero">
        <div class="hero-content">
          <div class="hero-copy">
            <p class="eyebrow">Khám phá · Tra cứu · So sánh</p>
            <h1>Hiểu nghề. Chọn ngành. Tự tin quyết định.</h1>
            <p>Xem công việc thực tế, đường học và dữ liệu có nguồn — rồi đặt các lựa chọn cạnh nhau để tự quyết định.</p>
            <div class="hero-entity-selector" role="tablist" aria-label="Loại thông tin muốn tìm">
              <button class="hero-entity active" type="button" role="tab" aria-selected="true" data-home-search-mode="job">Nghề</button>
              <button class="hero-entity" type="button" role="tab" aria-selected="false" data-home-search-mode="major">Ngành học</button>
              <button class="hero-entity" type="button" role="tab" aria-selected="false" data-home-search-mode="program">Trường & chương trình</button>
            </div>
            <label class="hero-search">
              ${icon("search")}
              <input aria-label="Tìm kiếm nhanh" placeholder="Nhập tên nghề, ngành học hoặc trường...">
              <button class="btn btn-primary btn-round" type="button" aria-label="Tìm kiếm" data-home-search-action="submit">${icon("arrow-right")}</button>
            </label>
          </div>
        </div>
      </section>
      <section class="start-section">
        <div class="content-container">
          <div class="start-grid">
            <article class="start-card">
              <div class="icon-box purple">${icon("compass")}</div>
              <div><h3>Chưa biết bắt đầu</h3><p>Trả lời 4 câu hỏi ngắn để có chủ đề và từ khóa khám phá.</p><a class="text-link" href="#screen-discovery-question" data-nav="screen-discovery-question">Khám phá trong 3 phút ${icon("arrow-right")}</a></div>
            </article>
            <article class="start-card">
              <div class="icon-box teal">${icon("briefcase-business")}</div>
              <div><h3>Muốn hiểu một nghề</h3><p>Xem công việc, kỹ năng và những đường học liên quan.</p><a class="text-link" href="#screen-search" data-nav="screen-search">Tra cứu nghề ${icon("arrow-right")}</a></div>
            </article>
            <article class="start-card">
              <div class="icon-box orange">${icon("graduation-cap")}</div>
              <div><h3>Đang cân nhắc ngành hoặc trường</h3><p>Xem nội dung học, chương trình, chi phí và tuyển sinh.</p><a class="text-link" href="#screen-search" data-nav="screen-search" data-search-preset="program">Tra cứu ngành và trường ${icon("arrow-right")}</a></div>
            </article>
          </div>
        </div>
      </section>
      <section class="home-feature">
        <div class="content-container home-feature-grid">
          <div class="home-feature-copy">
            <p class="eyebrow">Một nghề để khám phá</p>
            <h2>Chuyên viên phân tích dữ liệu làm gì?</h2>
            <p>Không chỉ ngồi với bảng số. Công việc bắt đầu từ một câu hỏi và kết thúc bằng phát hiện giúp mọi người hành động tốt hơn.</p>
            <div class="feature-facts">
              <span>${icon("message-circle-question")} Làm rõ câu hỏi</span>
              <span>${icon("database")} Kiểm tra dữ liệu</span>
              <span>${icon("presentation")} Trình bày phát hiện</span>
            </div>
            <div class="home-feature-actions">${button("Xem nghề này", "primary", "arrow-right", `data-nav="screen-job-detail"`)} ${button("Đặt vào so sánh", "outline", "columns-3", `data-nav="screen-compare"`)}</div>
          </div>
          <div class="career-spot" aria-hidden="true">
            <div class="career-spot-main">${icon("chart-no-axes-combined")}<strong>Dữ liệu</strong><span>từ con số đến quyết định</span></div>
            <div class="career-spot-list">
              <div>${icon("message-circle-question")}<span><strong>01</strong> Đặt đúng câu hỏi</span></div>
              <div>${icon("database")}<span><strong>02</strong> Kiểm tra thông tin</span></div>
              <div>${icon("presentation")}<span><strong>03</strong> Kể câu chuyện rõ ràng</span></div>
            </div>
          </div>
        </div>
      </section>
      ${footer()}
      <span class="screen-note">Mọi số liệu demo đều phải gắn nhãn khi triển khai</span>
    `,
    1180
  );
}

function searchScreen() {
  const cards = [
    {
      featured: true,
      visual: ["chart-no-axes-combined", "teal", "Phân tích"],
      title: "Chuyên viên phân tích dữ liệu",
      summary: "Biến câu hỏi của tổ chức thành yêu cầu dữ liệu, kiểm tra và phân tích dữ liệu, rồi trình bày phát hiện để hỗ trợ ra quyết định.",
      activities: ["Làm rõ câu hỏi", "Kiểm tra dữ liệu", "Trình bày phát hiện"],
      majors: "6 ngành học liên quan",
      status: badge("Có dữ liệu quan sát", "teal", "check-circle-2")
    },
    {
      visual: ["database", "blue", "Hệ thống"],
      title: "Kỹ sư dữ liệu",
      summary: "Thiết kế và vận hành luồng dữ liệu để dữ liệu có thể được thu thập, xử lý, kiểm soát chất lượng và sử dụng ổn định.",
      activities: ["Xây dựng luồng dữ liệu", "Quản lý hệ thống", "Giám sát chất lượng"],
      majors: "5 ngành học liên quan",
      status: badge("Thiếu dự báo phù hợp", "gray", "circle-minus")
    },
    {
      visual: ["search-check", "orange", "Nghiên cứu"],
      title: "Chuyên viên nghiên cứu thị trường",
      summary: "Thu thập và phân tích thông tin về người dùng, đối thủ và thị trường để hỗ trợ các quyết định sản phẩm hoặc kinh doanh.",
      activities: ["Thiết kế nghiên cứu", "Phân tích hành vi", "Đề xuất hành động"],
      majors: "7 ngành học liên quan",
      status: badge("Có dữ liệu quan sát", "teal", "check-circle-2")
    }
  ];
  return screenFrame(
    "screen-search",
    "02 · Search Results",
    "Tra cứu nghề · giữ bộ lọc khi chuyển màn",
    `
      <div class="search-page">
        ${portalHeader("Tra cứu")}
        <section class="search-toolbar">
          <div class="content-container">
            <div class="search-title-row"><div><h1>Tìm nghề, ngành học hoặc chương trình</h1><p>Chọn loại thông tin rồi nhập điều bạn muốn tìm.</p></div></div>
            <div class="search-main-row">
              <div class="segmented" role="tablist" aria-label="Loại thông tin"><button class="segment active" data-search-mode="job" role="tab" aria-selected="true">Nghề</button><button class="segment" data-search-mode="major" role="tab" aria-selected="false">Ngành học</button><button class="segment" data-search-mode="program" role="tab" aria-selected="false">Trường & chương trình</button></div>
              <label class="global-search">${icon("search")}<input value="phân tích dữ liệu" aria-label="Từ khóa tìm kiếm"><button class="btn btn-primary" type="button" data-search-action="submit">Tìm kiếm</button></label>
            </div>
          </div>
        </section>
        <div class="content-container search-layout">
          <aside class="filter-panel">
            <div class="filter-head"><strong>Bộ lọc</strong><button class="text-link text-button" type="button" data-search-action="clear-filters">Xóa tất cả</button></div>
            <div class="filter-group"><h3>Nhóm hoạt động</h3><div class="check-list"><label class="check-row checked"><span class="check-box">${icon("check")}</span>Phân tích và giải thích</label><label class="check-row"><span class="check-box"></span>Xây dựng hệ thống</label><label class="check-row"><span class="check-box"></span>Nghiên cứu con người</label><label class="check-row"><span class="check-box"></span>Tổ chức và vận hành</label></div></div>
            <div class="filter-group"><h3>Môi trường làm việc</h3><div class="check-list"><label class="check-row"><span class="check-box"></span>Làm việc nhóm thường xuyên</label><label class="check-row checked"><span class="check-box">${icon("check")}</span>Kết hợp tập trung cá nhân</label><label class="check-row"><span class="check-box"></span>Di chuyển nhiều</label></div></div>
            <div class="filter-group"><h3>Khu vực dữ liệu</h3><div class="check-list"><label class="check-row checked"><span class="check-box">${icon("check")}</span>Toàn quốc</label><label class="check-row"><span class="check-box"></span>Miền Bắc</label><label class="check-row"><span class="check-box"></span>Miền Trung</label><label class="check-row"><span class="check-box"></span>Miền Nam</label></div></div>
          </aside>
          <main>
            <div class="results-head"><div><h2>12 nghề liên quan đến “phân tích dữ liệu”</h2></div><div class="filter-chips"><span class="chip active">Phân tích và giải thích ${icon("x")}</span><span class="chip active">Toàn quốc ${icon("x")}</span></div></div>
            <div class="search-state search-state-loading" data-search-state="loading" hidden>
              <span class="state-spinner" aria-hidden="true"></span>
              <div><strong>Đang tìm trong danh mục</strong><p>Giữ nguyên bố cục và bộ lọc trong khi tải kết quả.</p></div>
            </div>
            <div class="search-state search-state-empty" data-search-state="empty" hidden>
              <span class="missing-icon">${icon("search-x")}</span>
              <div><strong>Chưa tìm thấy kết quả phù hợp</strong><p>Thử từ gần nghĩa hoặc bỏ bớt một bộ lọc.</p><div class="header-actions">${button("Xóa bộ lọc", "outline", "filter-x", `data-search-action="clear-filters"`)} ${button("Xem tất cả kết quả", "primary", "list", `data-search-action="show-all"`)}</div></div>
            </div>
            <div class="result-list">
              ${cards.map((card) => `
                <article class="result-card ${card.featured ? "featured" : ""}">
                  <div class="result-visual ${card.visual[1]}">${icon(card.visual[0])}<span>${card.visual[2]}</span></div>
                  <div class="result-copy"><div class="result-topline">${badge("Nghề", "blue")} ${card.status}</div><h3>${card.title}</h3><ul class="activity-list">${card.activities.map((item) => `<li>${item}</li>`).join("")}</ul></div>
                  <div class="result-side"><div class="result-stat"><span>Liên kết đào tạo</span><strong>${card.majors}</strong></div><div class="header-actions">${button("So sánh", "outline", "plus", `data-search-card-action="compare"`)} ${button("Xem nghề", "primary", "arrow-right")}</div></div>
                </article>`).join("")}
            </div>
          </main>
        </div>
        <div class="compare-tray"><div class="tray-items"><span class="tray-count">1</span><div><strong>Đã thêm Chuyên viên phân tích dữ liệu</strong><span>Chọn thêm 1–2 nghề cùng loại để bắt đầu so sánh</span></div></div>${button("Mở so sánh", "outline", "columns-3", `data-nav="screen-compare"`)}</div>
      </div>
    `,
    1310
  );
}

function jobDetailScreen() {
  return screenFrame(
    "screen-job-detail",
    "03 · Chi tiết nghề",
    "Công việc, đường học, số liệu và nguồn",
    `
      ${portalHeader("Tra cứu")}
      ${crumbs(["Trang chủ", "Tra cứu nghề", "Chuyên viên phân tích dữ liệu"])}
      <section class="entity-hero">
        <div class="content-container entity-head">
          <div class="entity-title"><div class="entity-type">${badge("Nghề", "blue")} ${badge("Dữ liệu minh họa", "orange", "flask-conical")}</div><h1>Chuyên viên phân tích dữ liệu</h1><p>Giúp một tổ chức hiểu điều gì đang xảy ra bằng cách đặt câu hỏi, kiểm tra dữ liệu và trình bày phát hiện rõ ràng.</p><div class="entity-meta"><span>${icon("tags")} Tên thường gặp: Data Analyst</span><span>${icon("layers-3")} Nhóm nghề: Phân tích và ra quyết định</span><span>${icon("clock-3")} Cập nhật: 18/09/2026</span></div></div>
          <div class="job-hero-side"><div class="job-hero-visual">${icon("chart-no-axes-combined")}<span><strong>Từ câu hỏi</strong> đến phát hiện có ích</span></div><div class="entity-actions">${button("Lưu", "outline", "bookmark", `data-action="save"`)} ${button("Thêm so sánh", "primary", "columns-3", `data-nav="screen-compare"`)}</div></div>
        </div>
      </section>
      <div class="content-container detail-layout">
        <aside class="anchor-nav"><strong>Trong trang này</strong><a class="active">Tóm tắt</a><a>Một ngày làm việc</a><a>Môi trường</a><a>Kỹ năng</a><a>Bức tranh thị trường</a><a>Thu nhập</a><a>Đường học liên quan</a><a>Điều cần kiểm tra</a></aside>
        <main class="detail-main">
          <section class="content-section">
            <div class="section-heading"><div><h2>Ba điều dễ hình dung về nghề này</h2><p>Đọc nhanh để biết công việc có gần với điều bạn muốn thử hay không.</p></div></div>
            <div class="decision-summary"><div class="summary-cell"><span>Công việc bắt đầu từ</span><strong>Một câu hỏi cần làm rõ</strong><p>Ví dụ: vì sao người dùng rời bỏ một sản phẩm?</p></div><div class="summary-cell"><span>Phần tốn nhiều thời gian</span><strong>Kiểm tra và làm sạch dữ liệu</strong><p>Dữ liệu phải đủ tốt trước khi có thể kết luận.</p></div><div class="summary-cell"><span>Kết quả tạo ra</span><strong>Biểu đồ, phát hiện, đề xuất</strong><p>Giúp người khác hiểu và cân nhắc hành động tiếp theo.</p></div></div>
          </section>
          <section class="content-section">
            <h2>Một ngày làm việc có thể gồm</h2>
            <div class="day-flow"><div class="day-step"><span class="step-number">01</span><strong>Làm rõ câu hỏi</strong><p>Trao đổi với bộ phận nghiệp vụ về mục tiêu và cách dùng kết quả.</p></div><div class="day-step"><span class="step-number">02</span><strong>Tìm dữ liệu</strong><p>Xác định bảng, trường và phạm vi dữ liệu cần thiết.</p></div><div class="day-step"><span class="step-number">03</span><strong>Kiểm tra chất lượng</strong><p>Phát hiện thiếu, trùng, sai định dạng hoặc khác định nghĩa.</p></div><div class="day-step"><span class="step-number">04</span><strong>Phân tích</strong><p>Chọn phương pháp phù hợp với câu hỏi và dữ liệu.</p></div><div class="day-step"><span class="step-number">05</span><strong>Trình bày</strong><p>Giải thích phát hiện, giới hạn và hành động có thể cân nhắc.</p></div></div>
          </section>
          <section class="content-section">
            <div class="two-column"><div class="info-panel"><h3>Môi trường và cách làm việc</h3><ul class="info-list"><li>${icon("users")}<span>Kết hợp làm việc tập trung với trao đổi liên phòng ban.</span></li><li>${icon("monitor-cog")}<span>Sử dụng bảng tính, SQL, công cụ trực quan hóa và tài liệu nghiệp vụ.</span></li><li>${icon("calendar-clock")}<span>Nhịp deadline thay đổi theo chu kỳ báo cáo và dự án.</span></li></ul></div><div class="info-panel"><h3>Kỹ năng được thể hiện bằng hành vi</h3><ul class="info-list"><li>${icon("message-square-text")}<span>Chuyển câu hỏi mơ hồ thành đại lượng có thể kiểm tra.</span></li><li>${icon("shield-check")}<span>Nhận ra dữ liệu không đủ tốt trước khi kết luận.</span></li><li>${icon("presentation")}<span>Giải thích kết quả cho người không chuyên về dữ liệu.</span></li></ul></div></div>
          </section>
          <section class="content-section">
            <div class="section-heading"><div><h2>Nhu cầu tuyển dụng thay đổi ra sao?</h2><p>Biểu đồ cho thấy mức xuất hiện của tin tuyển dụng, không phải số việc làm được bảo đảm.</p></div><div class="chip-row">${badge("Số liệu đã có", "teal")} ${badge("Ước tính đến 2028", "purple")}</div></div>
            <div class="market-grid">
              <div class="chart-panel"><div class="chart-head"><div><strong>Chỉ số tin tuyển dụng của nhóm nghề</strong><span>2022–2028 · Toàn quốc · 2024 = 100 · dữ liệu minh họa</span></div>${badge("Dữ liệu thử nghiệm", "orange", "flask-conical")}</div><div class="trend-chart"><div class="bar-group"><span class="trend-bar" style="height:45%"></span><span class="bar-label">2022</span></div><div class="bar-group"><span class="trend-bar" style="height:54%"></span><span class="bar-label">2023</span></div><div class="bar-group"><span class="trend-bar" style="height:63%"></span><span class="bar-label">2024</span></div><div class="bar-group"><span class="trend-bar forecast" style="height:70%"></span><span class="bar-label">2025</span></div><div class="bar-group"><span class="trend-bar forecast" style="height:78%"></span><span class="bar-label">2026</span></div><div class="bar-group"><span class="trend-bar forecast" style="height:84%"></span><span class="bar-label">2027</span></div><div class="bar-group"><span class="trend-bar forecast" style="height:88%"></span><span class="bar-label">2028</span></div></div><div class="chart-legend"><span class="legend-item"><span class="legend-swatch"></span>Số liệu đã có</span><span class="legend-item"><span class="legend-swatch forecast"></span>Dự báo + khoảng có thể xảy ra</span></div></div>
              <aside class="source-summary"><div class="agent-panel-head"><h3>Bạn đang xem dữ liệu gì?</h3>${icon("external-link")}</div><dl class="source-meta"><div><dt>Đo điều gì</dt><dd>Mức thay đổi của tin tuyển dụng</dd></div><div><dt>Không phải</dt><dd>Số việc làm hay khả năng có việc của bạn</dd></div><div><dt>Khu vực</dt><dd>Toàn quốc</dd></div><div><dt>Số liệu đã có</dt><dd>2022–2024</dd></div><div><dt>Ước tính</dt><dd>2025–2028</dd></div><div><dt>Cập nhật</dt><dd>18/09/2026</dd></div></dl><button class="text-link text-button" type="button" data-source-id="job-postings-index">Xem nguồn và cách tính ${icon("arrow-right")}</button></aside>
            </div>
          </section>
          <section class="content-section"><h2>Thu nhập</h2><div class="missing-panel"><span class="missing-icon">${icon("circle-minus")}</span><div><strong>Chưa có dữ liệu phù hợp</strong><p>Chưa có nguồn đủ tương thích về nghề, khu vực và nhóm kinh nghiệm để công bố khoảng thu nhập.</p></div>${button("Xem nguồn liên quan", "outline", "database", `data-source-id="salary-gap"`)}</div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Những đường học có thể dẫn tới nghề này</h2><p>Quan hệ nhiều–nhiều; không có một ngành duy nhất bắt buộc.</p></div></div><div class="relation-grid"><article class="relation-card"><div class="result-topline">${badge("Ngành học", "blue")} ${badge("Liên kết cần duyệt", "yellow")}</div><h3>Khoa học dữ liệu</h3><p>Tập trung vào dữ liệu, mô hình và cách triển khai phân tích.</p><div class="card-footer"><span>Nền tảng định lượng cao</span><a class="text-link" href="#screen-major-detail" data-nav="screen-major-detail">Xem ngành ${icon("arrow-right")}</a></div></article><article class="relation-card"><div class="result-topline">${badge("Ngành học", "blue")} ${badge("Liên kết cần duyệt", "yellow")}</div><h3>Hệ thống thông tin</h3><p>Kết nối công nghệ, quy trình và nhu cầu của tổ chức.</p><div class="card-footer"><span>Công nghệ + nghiệp vụ</span><a class="text-link" href="#screen-major-detail" data-nav="screen-major-detail">Xem ngành ${icon("arrow-right")}</a></div></article><article class="relation-card"><div class="result-topline">${badge("Ngành học", "blue")} ${badge("Liên kết cần duyệt", "yellow")}</div><h3>Thống kê ứng dụng</h3><p>Tập trung vào suy luận, thiết kế phân tích và độ bất định.</p><div class="card-footer"><span>Phương pháp định lượng</span><a class="text-link" href="#screen-major-detail" data-nav="screen-major-detail">Xem ngành ${icon("arrow-right")}</a></div></article></div></section>
        </main>
      </div>
      ${footer()}
    `,
    1880
  );
}

function majorDetailScreen() {
  return screenFrame(
    "screen-major-detail",
    "04 · Chi tiết ngành học",
    "Nội dung học, nghề liên quan và chương trình",
    `
      ${portalHeader("Tra cứu")}
      ${crumbs(["Trang chủ", "Tra cứu ngành học", "Khoa học dữ liệu"])}
      <section class="entity-hero"><div class="content-container entity-head"><div class="entity-title"><div class="entity-type">${badge("Ngành học", "blue")} ${badge("Nội dung khái quát", "yellow", "book-open-check")}</div><h1>Khoa học dữ liệu</h1><p>Học cách dùng toán, lập trình và kiến thức thực tế để tìm câu trả lời hoặc xây dựng sản phẩm từ dữ liệu.</p><div class="entity-meta"><span>${icon("binary")} Máy tính và dữ liệu</span><span>${icon("route")} 8 nghề liên quan</span><span>${icon("school")} 12 chương trình để tìm hiểu</span></div></div><div class="job-hero-side"><div class="job-hero-visual major">${icon("binary")}<span><strong>Toán + Lập trình</strong> cùng bối cảnh ứng dụng</span></div><div class="entity-actions">${button("Lưu", "outline", "bookmark", `data-action="save"`)} ${button("Thêm so sánh", "primary", "columns-3", `data-nav="screen-compare"`)}</div></div></div></section>
      <div class="content-container detail-layout">
        <aside class="anchor-nav"><strong>Trong trang này</strong><a class="active">Ngành học là gì</a><a>Khối kiến thức</a><a>Nền tảng nên chuẩn bị</a><a>Nghề liên quan</a><a>Chương trình đào tạo</a><a>Điều cần kiểm tra</a></aside>
        <main class="detail-main">
          <section class="content-section"><div class="section-heading"><div><h2>Bạn sẽ học những gì?</h2><p>Bốn nhóm dưới đây giúp hình dung nhanh; tỷ lệ thực tế thay đổi theo từng chương trình.</p></div>${badge("Ví dụ minh họa", "orange", "flask-conical")}</div><div class="curriculum-bar"><span class="curriculum-segment seg-math" style="width:28%"></span><span class="curriculum-segment seg-compute" style="width:34%"></span><span class="curriculum-segment seg-domain" style="width:18%"></span><span class="curriculum-segment seg-project" style="width:20%"></span></div><div class="curriculum-legend"><span class="legend-item"><span class="legend-swatch seg-math"></span>Toán và thống kê · 28%</span><span class="legend-item"><span class="legend-swatch seg-compute"></span>Lập trình và dữ liệu · 34%</span><span class="legend-item"><span class="legend-swatch seg-domain"></span>Ứng dụng thực tế · 18%</span><span class="legend-item"><span class="legend-swatch seg-project"></span>Dự án và trình bày · 20%</span></div></section>
          <section class="content-section"><h2>Các khối kiến thức thường gặp</h2><div class="module-grid"><div class="module-row"><span class="module-index">01</span><div><strong>Xác suất và suy luận thống kê</strong><span>Đọc dữ liệu trong điều kiện có biến thiên và bất định.</span></div></div><div class="module-row"><span class="module-index">02</span><div><strong>Lập trình và cấu trúc dữ liệu</strong><span>Xử lý dữ liệu bằng công cụ tính toán có thể tái sử dụng.</span></div></div><div class="module-row"><span class="module-index">03</span><div><strong>Cơ sở dữ liệu và kỹ thuật dữ liệu</strong><span>Tổ chức, truy xuất và kiểm soát chất lượng dữ liệu.</span></div></div><div class="module-row"><span class="module-index">04</span><div><strong>Mô hình hóa và học máy</strong><span>Xây dựng, đánh giá và giới hạn cách dùng mô hình.</span></div></div><div class="module-row"><span class="module-index">05</span><div><strong>Trực quan hóa và kể chuyện dữ liệu</strong><span>Trình bày kết quả để người khác hiểu và kiểm tra.</span></div></div><div class="module-row"><span class="module-index">06</span><div><strong>Đạo đức và quản trị dữ liệu</strong><span>Nhận diện rủi ro thiên lệch, quyền riêng tư và sử dụng sai.</span></div></div></div></section>
          <section class="content-section"><h2>Bạn có thể chuẩn bị từ bây giờ</h2><div class="two-column"><div class="info-panel"><h3>Những điều nên thử</h3><ul class="info-list"><li>${icon("calculator")}<span>Học toán theo hướng hiểu khái niệm và thực hành.</span></li><li>${icon("code-2")}<span>Thử mô tả một vấn đề bằng quy trình hoặc mã lệnh.</span></li><li>${icon("languages")}<span>Làm quen dần với tài liệu tiếng Anh.</span></li></ul></div><div class="info-panel"><h3>Trước khi chọn chương trình</h3><ul class="info-list"><li>${icon("list-checks")}<span>Xem đề cương thật thay vì chỉ dựa vào tên ngành.</span></li><li>${icon("folder-kanban")}<span>Thử một dự án dữ liệu nhỏ.</span></li><li>${icon("messages-square")}<span>Hỏi sinh viên về cách học và khối lượng bài tập.</span></li></ul></div></div><div class="callout blue" style="margin-top:14px">${icon("info")}<div><strong>Bạn không cần giỏi sẵn mọi thứ.</strong><br>Mỗi chương trình có mức độ và nguồn hỗ trợ khác nhau; hãy kiểm tra từng nơi cụ thể.</div></div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Nghề liên quan</h2><p>Những nghề dưới đây có thể sử dụng một phần kiến thức của ngành; không phải mọi sinh viên đều đi cùng một hướng.</p></div><a class="text-link">Xem toàn bộ 8 nghề ${icon("arrow-right")}</a></div><div class="relation-grid"><article class="relation-card"><div class="icon-box teal">${icon("chart-no-axes-combined")}</div><h3 style="margin-top:14px">Chuyên viên phân tích dữ liệu</h3><p>Làm rõ câu hỏi, phân tích và trình bày phát hiện.</p><div class="card-footer"><span>Nhiều lối vào</span>${badge("Có dữ liệu", "teal")}</div></article><article class="relation-card"><div class="icon-box purple">${icon("brain-circuit")}</div><h3 style="margin-top:14px">Chuyên viên khoa học dữ liệu</h3><p>Thử nghiệm mô hình và đánh giá khả năng sử dụng.</p><div class="card-footer"><span>Đòi hỏi phương pháp sâu hơn</span>${badge("Đang bổ sung", "gray")}</div></article><article class="relation-card"><div class="icon-box orange">${icon("workflow")}</div><h3 style="margin-top:14px">Kỹ sư dữ liệu</h3><p>Xây dựng luồng dữ liệu ổn định và có thể giám sát.</p><div class="card-footer"><span>Thiên về hệ thống</span>${badge("Có dữ liệu", "teal")}</div></article></div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Chương trình đào tạo đang có trong danh mục</h2><p>Học phí, thời gian và điều kiện tuyển sinh được gắn ở cấp chương trình, không gắn chung cho ngành.</p></div>${button("Lọc chương trình", "outline", "sliders-horizontal")}</div><table class="data-table"><thead><tr><th>Chương trình</th><th>Cơ sở đào tạo</th><th>Địa điểm</th><th>Thời lượng</th><th>Dữ liệu tuyển sinh</th><th></th></tr></thead><tbody><tr><td><strong>Khoa học dữ liệu</strong>Chương trình minh họa A</td><td>Cơ sở đào tạo A</td><td>Hà Nội</td><td>4 năm</td><td>${badge("Năm 2026", "teal")}</td><td><a class="text-link">Xem ${icon("arrow-right")}</a></td></tr><tr><td><strong>Khoa học dữ liệu ứng dụng</strong>Chương trình minh họa B</td><td>Cơ sở đào tạo B</td><td>TP. Hồ Chí Minh</td><td>4 năm</td><td>${badge("Thiếu học phí", "gray")}</td><td><a class="text-link">Xem ${icon("arrow-right")}</a></td></tr><tr><td><strong>Phân tích dữ liệu kinh doanh</strong>Chương trình minh họa C</td><td>Cơ sở đào tạo C</td><td>Đà Nẵng</td><td>3,5 năm</td><td>${badge("Năm 2026", "teal")}</td><td><a class="text-link">Xem ${icon("arrow-right")}</a></td></tr></tbody></table></section>
        </main>
      </div>
      ${footer()}
    `,
    1760
  );
}

function programDetailScreen() {
  return screenFrame(
    "screen-program-detail",
    "05 · Chi tiết chương trình",
    "Tuyển sinh, thời lượng và chi phí",
    `
      ${portalHeader("Tra cứu")}
      ${crumbs(["Trang chủ", "Tra cứu trường & chương trình", "Cơ sở đào tạo A", "Khoa học dữ liệu"])}
      <section class="entity-hero">
        <div class="content-container program-identity">
          <div class="entity-title">
            <div class="entity-type">${badge("Chương trình đào tạo", "blue")} ${badge("Dữ liệu minh họa", "orange", "flask-conical")}</div>
            <h1>Khoa học dữ liệu</h1>
            <p>Chương trình tại Cơ sở đào tạo A · Hà Nội. Hãy kiểm tra đúng năm tuyển sinh khi xem điều kiện và chi phí.</p>
            <div class="entity-meta"><span>${icon("school")} Cơ sở đào tạo A</span><span>${icon("map-pin")} Hà Nội</span><span>${icon("calendar-days")} Kỳ tuyển sinh 2026</span></div>
            <div class="entity-actions" style="margin-top:22px">${button("Mở trang chính thức", "outline", "external-link", `data-source-id="program-official"`)} ${button("Thêm so sánh", "primary", "columns-3", `data-nav="screen-compare"`)}</div>
          </div>
          <div class="program-facts">
            <div class="program-fact"><span>Thời lượng</span><strong>4 năm · toàn thời gian</strong></div>
            <div class="program-fact"><span>Ngôn ngữ</span><strong>Tiếng Việt + học liệu tiếng Anh</strong></div>
            <div class="program-fact"><span>Học phí 2026</span><strong>Chưa có dữ liệu phù hợp</strong></div>
            <div class="program-fact"><span>Thông tin</span><strong>Đang dùng dữ liệu minh họa</strong></div>
          </div>
        </div>
      </section>
      <div class="content-container detail-layout">
        <aside class="anchor-nav"><strong>Trong trang này</strong><a class="active">Tổng quan</a><a>Nội dung học</a><a>Điều kiện tuyển sinh</a><a>Chi phí</a><a>Nguồn chính thức</a><a>Việc cần kiểm tra</a></aside>
        <main class="detail-main">
          <section class="content-section"><div class="section-heading"><div><h2>Chương trình này có gì đáng chú ý?</h2><p>Cùng tên ngành nhưng mỗi trường có thể khác về nội dung học, thời lượng, chi phí và cách tuyển sinh.</p></div></div><div class="decision-summary"><div class="summary-cell"><span>Học theo hướng</span><strong>Dữ liệu và mô hình ứng dụng</strong><p>Đi từ dữ liệu thô đến kết quả có thể sử dụng.</p></div><div class="summary-cell"><span>Cách học</span><strong>Toàn thời gian tại cơ sở</strong><p>Nên kiểm tra lịch học và yêu cầu có mặt.</p></div><div class="summary-cell"><span>Thông tin việc làm</span><strong>Chưa đủ để so sánh</strong><p>Hãy xem nghề cụ thể thay vì dựa vào nội dung quảng bá.</p></div></div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Nội dung học được chia thế nào?</h2><p>Tỷ lệ minh họa để bạn hình dung nhanh; hãy mở đề cương chính thức trước khi quyết định.</p></div></div><div class="curriculum-bar"><span class="curriculum-segment seg-math" style="width:25%"></span><span class="curriculum-segment seg-compute" style="width:38%"></span><span class="curriculum-segment seg-domain" style="width:17%"></span><span class="curriculum-segment seg-project" style="width:20%"></span></div><div class="curriculum-legend"><span class="legend-item"><span class="legend-swatch seg-math"></span>Toán & thống kê · 25%</span><span class="legend-item"><span class="legend-swatch seg-compute"></span>Công nghệ dữ liệu · 38%</span><span class="legend-item"><span class="legend-swatch seg-domain"></span>Tự chọn ứng dụng · 17%</span><span class="legend-item"><span class="legend-swatch seg-project"></span>Dự án & thực tập · 20%</span></div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Điều kiện tuyển sinh</h2><p>Mỗi điều kiện đi cùng năm áp dụng và đường dẫn chính thức; không suy diễn từ dữ liệu năm trước.</p></div>${badge("Năm 2026", "teal", "calendar-check")}</div><table class="data-table"><thead><tr><th>Phương thức</th><th>Điều kiện công bố</th><th>Phạm vi áp dụng</th><th>Trạng thái</th></tr></thead><tbody><tr><td><strong>Xét kết quả thi</strong>Kỳ thi tốt nghiệp THPT</td><td>Tổ hợp và ngưỡng nhận hồ sơ</td><td>Đợt tuyển sinh 2026</td><td>${badge("Có văn bản", "teal")}</td></tr><tr><td><strong>Xét kết quả học tập</strong>Hồ sơ học bạ</td><td>Tiêu chí chi tiết theo đề án</td><td>Cần xác minh từng đợt</td><td>${badge("Đang kiểm tra", "orange")}</td></tr><tr><td><strong>Phương thức khác</strong>Theo đề án của trường</td><td>Chưa có dữ liệu đủ chi tiết</td><td>Không tự suy luận</td><td>${badge("Thiếu dữ liệu", "gray")}</td></tr></tbody></table></section>
          <section class="content-section"><h2>Chi phí học tập</h2><div class="missing-panel"><span class="missing-icon">${icon("wallet-cards")}</span><div><strong>Chưa có học phí được xác minh cho năm 2026</strong><p>Hệ thống không dùng mức của năm trước để tự điền. Bạn có thể mở nguồn trường hoặc lưu câu hỏi này vào checklist.</p></div>${button("Mở nguồn trường", "outline", "external-link", `data-source-id="program-tuition-gap"`)}</div></section>
          <section class="content-section"><div class="section-heading"><div><h2>Việc nên kiểm tra trước khi lưu lựa chọn</h2><p>Những việc đã rõ và những câu hỏi cần hỏi thêm.</p></div>${button("Lưu danh sách", "outline", "bookmark-check", `data-checklist-save`)}</div><div class="admission-checklist"><div class="check-item"><span class="check-status">${icon("check")}</span><div><strong>Kiểm tra đúng tên chương trình</strong><span>Đã đối chiếu với danh mục tuyển sinh 2026.</span></div></div><div class="check-item"><span class="check-status">${icon("check")}</span><div><strong>Xác nhận thời lượng học</strong><span>Thông tin áp dụng cho hình thức toàn thời gian.</span></div></div><div class="check-item pending"><span class="check-status">${icon("clock-3")}</span><div><strong>Xác minh học phí toàn khóa</strong><span>Chưa có nguồn 2026 đủ điều kiện công bố.</span></div></div><div class="check-item pending"><span class="check-status">${icon("clock-3")}</span><div><strong>Hỏi về học bổng và chi phí khác</strong><span>Không chỉ nhìn học phí danh nghĩa.</span></div></div><div class="check-item pending"><span class="check-status">${icon("clock-3")}</span><div><strong>Đọc đề cương học phần</strong><span>Kiểm tra mức toán, lập trình và dự án thực tế.</span></div></div><div class="check-item pending"><span class="check-status">${icon("clock-3")}</span><div><strong>Kiểm tra điều kiện từng phương thức</strong><span>Tránh dùng ngưỡng của một đợt cho toàn bộ tuyển sinh.</span></div></div></div></section>
        </main>
      </div>
      ${footer()}
    `,
    1650
  );
}

function compareScreen() {
  const row = (label, helper, a, b, c, last = false) => `
    <div class="compare-cell compare-label ${last ? "last-row" : ""}"><strong>${label}</strong><span>${helper}</span></div>
    <div class="compare-cell ${last ? "last-row" : ""}"><div class="compare-value">${a}</div></div>
    <div class="compare-cell ${last ? "last-row" : ""}"><div class="compare-value">${b}</div></div>
    <div class="compare-cell ${last ? "last-row" : ""}"><div class="compare-value">${c}</div></div>`;
  return screenFrame(
    "screen-compare",
    "06 · So sánh ngành học",
    "Ba ngành · tiêu chí do bạn chọn",
    `
      <div class="compare-page" data-compare-state="ready">
        ${portalHeader("So sánh")}
        <section class="compare-tools"><div class="content-container"><div class="compare-tools-row"><div><h1>So sánh ngành học</h1><p>Đặt các lựa chọn cạnh nhau theo điều bạn quan tâm.</p></div><div class="header-actions">${button("Lưu bảng", "outline", "bookmark", `data-action="save"`)} ${button("Thay lựa chọn", "primary", "replace", `data-compare-state-action="not-enough"`)}</div></div><div class="compare-mode-row"><div class="segmented" role="tablist" aria-label="Loại đối tượng so sánh"><button class="segment" data-compare-mode="job">Nghề</button><button class="segment active" data-compare-mode="major">Ngành học</button><button class="segment" data-compare-mode="program">Chương trình</button></div><div class="compare-state-demo" aria-hidden="true"><button class="active" type="button" data-compare-state-action="ready" tabindex="-1">Đủ 3</button><button type="button" data-compare-state-action="not-enough" tabindex="-1">Chưa đủ</button><button type="button" data-compare-state-action="max" tabindex="-1">Đã tối đa</button></div></div><div class="priority-bar"><span class="priority-label">Xem trước:</span><span class="chip active">Nội dung học ${icon("x")}</span><span class="chip active">Nền tảng cần có ${icon("x")}</span><span class="chip active">Nghề liên quan ${icon("x")}</span><span class="chip">+ Thêm tiêu chí</span></div></div></section>
        <div class="content-container compare-wrapper">
          <div class="compare-state-panel compare-not-enough" data-compare-state-panel="not-enough" hidden><span class="missing-icon">${icon("columns-2")}</span><div><strong>Cần ít nhất 2 lựa chọn cùng loại</strong><p>Hiện còn 1 ngành trong bảng. Thêm một ngành khác để bắt đầu đối chiếu theo từng tiêu chí.</p></div>${button("Thêm lựa chọn", "primary", "plus", `data-compare-state-action="ready"`)}</div>
          <div class="compare-state-panel compare-max" data-compare-state-panel="max" hidden><span>${icon("info")}</span><div><strong>Bảng đã có tối đa 3 lựa chọn</strong><p>Bỏ một lựa chọn trước khi thêm ngành khác. Dữ liệu đang xem vẫn được giữ nguyên.</p></div>${button("Quay lại bảng", "outline", "arrow-left", `data-compare-state-action="ready"`)}</div>
          <div class="compare-table">
            <div class="compare-cell compare-label compare-header-cell"><strong>Lựa chọn</strong><span>Có thể so sánh tối đa 3 ngành.</span></div>
            <div class="compare-cell compare-header-cell"><div class="result-topline">${badge("Đang cân nhắc", "blue")}</div><h3>Khoa học dữ liệu</h3><p>Dữ liệu, mô hình và sản phẩm phân tích.</p><div class="card-footer"><span>Lý do lưu: thích phân tích</span>${icon("more-horizontal")}</div></div>
            <div class="compare-cell compare-header-cell"><div class="result-topline">${badge("Đang cân nhắc", "blue")}</div><h3>Hệ thống thông tin</h3><p>Công nghệ, quy trình và tổ chức.</p><div class="card-footer"><span>Lý do lưu: phạm vi rộng</span>${icon("more-horizontal")}</div></div>
            <div class="compare-cell compare-header-cell"><div class="result-topline">${badge("Cần kiểm tra", "orange")}</div><h3>Thống kê ứng dụng</h3><p>Phương pháp định lượng và suy luận.</p><div class="card-footer"><span>Lý do lưu: thích toán</span>${icon("more-horizontal")}</div></div>
            ${row("Trọng tâm học", "Mô tả khái quát, cần kiểm tra đề cương thật", "<strong>Dữ liệu + mô hình</strong>Thu thập, xử lý, mô hình hóa và truyền đạt kết quả.<span class='cell-source'>" + icon("database") + " Nội dung ngành</span>", "<strong>Hệ thống + nghiệp vụ</strong>Phân tích nhu cầu tổ chức, thiết kế và quản trị hệ thống.<span class='cell-source'>" + icon("database") + " Nội dung ngành</span>", "<strong>Suy luận + phương pháp</strong>Thiết kế nghiên cứu, ước lượng, kiểm định và mô hình thống kê.<span class='cell-source'>" + icon("database") + " Nội dung ngành</span>")}
            ${row("Khối kiến thức", "Không phải tỷ trọng chuẩn cho mọi chương trình", "<ul><li>Toán và thống kê</li><li>Lập trình và dữ liệu</li><li>Học máy</li></ul>", "<ul><li>Phân tích nghiệp vụ</li><li>Cơ sở dữ liệu</li><li>Quản trị hệ thống</li></ul>", "<ul><li>Xác suất</li><li>Suy luận thống kê</li><li>Thiết kế thí nghiệm</li></ul>")}
            ${row("Bạn sẽ cần làm quen với", "Những điều có thể chuẩn bị dần", "<strong>Toán + lập trình</strong>Kiên trì với bài toán mở và kiểm tra dữ liệu.", "<strong>Logic + giao tiếp</strong>Kết nối yêu cầu con người với giải pháp công nghệ.", "<strong>Toán + suy luận</strong>Thoải mái với khái niệm trừu tượng và độ bất định.")}
            ${row("Nghề liên quan", "Một ngành dẫn tới nhiều nghề", "Phân tích dữ liệu · Khoa học dữ liệu · Kỹ sư dữ liệu", "Phân tích nghiệp vụ · Tư vấn hệ thống · Quản trị dữ liệu", "Phân tích thống kê · Nghiên cứu thị trường · Phân tích rủi ro")}
            ${row("Chương trình trong danh mục", "Số chương trình hiện có, không phải toàn thị trường", "<strong>12 chương trình</strong><span class='cell-source'>" + icon("school") + " Xem chương trình</span>", "<strong>18 chương trình</strong><span class='cell-source'>" + icon("school") + " Xem chương trình</span>", "<strong>7 chương trình</strong><span class='cell-source'>" + icon("school") + " Xem chương trình</span>")}
            ${row("Dữ liệu thị trường", "Nên xem ở một nghề cụ thể", "<div class='incompatible-box'><strong>Chưa so sánh ở cấp ngành</strong>Hãy chọn một nghề liên quan.</div>", "<div class='incompatible-box'><strong>Chưa so sánh ở cấp ngành</strong>Hãy chọn một nghề liên quan.</div>", "<div class='incompatible-box'><strong>Chưa so sánh ở cấp ngành</strong>Hãy chọn một nghề liên quan.</div>")}
            ${row("Ghi chú của bạn", "Ưu tiên cá nhân, không phải dữ liệu khách quan", "<strong>Điểm được:</strong> gần sở thích phân tích.<br><strong>Đánh đổi:</strong> cần chuẩn bị lập trình.", "<strong>Điểm được:</strong> nhiều hướng nghề.<br><strong>Đánh đổi:</strong> cần tìm chương trình có đủ phân tích dữ liệu.", "<strong>Điểm được:</strong> nền tảng định lượng.<br><strong>Đánh đổi:</strong> chưa rõ môi trường học phù hợp.", true)}
          </div>
        </div>
      </div>
    `,
    1580
  );
}

function discoveryQuestionScreen() {
  const choices = [
    ["chart-no-axes-combined", "Tìm mẫu và giải thích dữ liệu", "Nhìn ra điều gì đang thay đổi", true],
    ["messages-square", "Trao đổi để hiểu nhu cầu", "Đặt câu hỏi và làm rõ vấn đề", true],
    ["blocks", "Xây dựng một hệ thống hoạt động", "Ghép nhiều phần thành quy trình", false],
    ["flask-conical", "Thử nghiệm và kiểm tra giả thuyết", "So sánh kết quả trước khi kết luận", true],
    ["palette", "Tạo nội dung hoặc hình ảnh", "Biến ý tưởng thành trải nghiệm", false],
    ["hand-heart", "Hỗ trợ trực tiếp cho người khác", "Tạo ảnh hưởng qua tương tác", false]
  ];
  return screenFrame(
    "screen-discovery-question",
    "07 · Discovery Questions",
    "Step 2 of 4 · optional reflection",
    `
      <div class="discovery-page">
        ${portalHeader("Khám phá bản thân")}
        <div class="discovery-shell">
          <section class="discovery-intro" data-discovery-intro>
            <div class="discovery-intro-copy"><span class="discovery-intro-icon">${icon("compass")}</span><p class="eyebrow">Khám phá từ điều bạn tò mò</p><h1>Chưa biết bắt đầu? Hãy thử 4 câu hỏi ngắn.</h1><p>Chọn những hoạt động bạn muốn thử. Bạn sẽ nhận được vài chủ đề và từ khóa để tiếp tục tra cứu.</p><div class="discovery-intro-rules"><span>${icon("list-checks")} 4 câu hỏi</span><span>${icon("clock-3")} Khoảng 3 phút</span><span>${icon("refresh-cw")} Có thể sửa lại</span></div><div class="header-actions">${button("Bắt đầu khám phá", "primary", "arrow-right", `data-discovery-action="start"`)} ${button("Đi thẳng tới Tra cứu", "outline", "search", `data-nav="screen-search"`)}</div></div>
            <div class="discovery-preview" aria-hidden="true"><div class="preview-orbit">${icon("sparkles")}</div><div class="preview-card one">${icon("chart-no-axes-combined")}<span>Thích tìm quy luật?</span></div><div class="preview-card two">${icon("flask-conical")}<span>Muốn thử nghiệm?</span></div><div class="preview-card three">${icon("messages-square")}<span>Thích làm rõ vấn đề?</span></div></div>
          </section>
          <div data-discovery-questions hidden>
          <div class="progress-head"><span>Khám phá bản thân · Bước 2/4</span><span>Có thể bỏ qua bất kỳ câu hỏi nào</span></div>
          <div class="progress-track"><div class="progress-fill"></div></div>
          <div class="discovery-layout">
            <main class="question-panel">
              <p class="eyebrow">Hoạt động khiến bạn tò mò</p>
              <h1>Bạn muốn thử làm những hoạt động nào?</h1>
              <p>Chọn tối đa 3 hoạt động. Đây là tín hiệu để tạo từ khóa tìm hiểu, không phải bài kiểm tra năng lực hay kết luận nghề phù hợp.</p>
              <div class="choice-grid">${choices.map(([iconName, title, note, selected], index) => `<button class="choice-tile ${selected ? "selected" : ""}" type="button" data-choice="${index}" aria-pressed="${selected}"><span class="choice-icon">${icon(iconName)}</span><span><strong>${title}</strong><span>${note}</span></span><span class="choice-indicator">${selected ? icon("check") : ""}</span></button>`).join("")}</div>
              <div class="question-actions">${button("Quay lại", "ghost", "arrow-left", `data-discovery-action="back"`)}<div class="header-actions">${button("Bỏ qua câu này", "outline", "", `data-discovery-action="skip"`)} ${button("Tiếp tục", "primary", "arrow-right", `data-discovery-action="next"`)}</div></div>
            </main>
            <aside class="discovery-aside">
              <div class="guide-panel"><h3>Kết quả sẽ được dùng thế nào?</h3><p>Câu trả lời tạo ra các chủ đề và từ khóa để bạn mở Tra cứu. Bạn có thể sửa hoặc bỏ kết quả bất kỳ lúc nào.</p></div>
              <div class="guide-panel"><h3>Hệ thống không làm gì?</h3><ul><li>Không tính “điểm phù hợp” tổng hợp.</li><li>Không chẩn đoán tính cách hoặc năng lực.</li><li>Không dự đoán bạn sẽ thành công với nghề nào.</li></ul></div>
              <div class="guide-panel"><h3>Quyền riêng tư</h3><p>Câu trả lời chỉ lưu trong phiên prototype và không được đưa vào kho tri thức của trợ lý.</p></div>
            </aside>
          </div>
          </div>
        </div>
      </div>
    `,
    1130
  );
}

function discoveryResultScreen() {
  const themes = [
    ["chart-no-axes-combined", "Phân tích và giải thích", "Tìm mẫu, kiểm tra dữ liệu và diễn đạt điều đã quan sát.", ["Bạn chọn hoạt động tìm mẫu trong dữ liệu", "Bạn coi trọng việc hiểu rõ trước khi hành động"], "phân tích dữ liệu"],
    ["flask-conical", "Thử nghiệm và kiểm chứng", "Đặt giả thuyết, so sánh kết quả và thận trọng với kết luận.", ["Bạn chọn hoạt động thử nghiệm", "Bạn ưu tiên bằng chứng có thể kiểm tra"], "nghiên cứu định lượng"],
    ["messages-square", "Hiểu nhu cầu và trình bày", "Làm rõ câu hỏi cùng người khác và biến kết quả thành thông tin dễ dùng.", ["Bạn chọn hoạt động trao đổi để hiểu nhu cầu", "Bạn quan tâm tác động của công việc"], "phân tích nghiệp vụ"]
  ];
  return screenFrame(
    "screen-discovery-result",
    "08 · Discovery Results",
    "Themes, not fit scores",
    `
      ${portalHeader("Khám phá bản thân")}
      <section class="result-intro"><div class="content-container result-intro-grid"><div><div class="entity-type">${badge("Kết quả khám phá", "purple", "compass")} ${badge("Có thể thay đổi", "yellow", "refresh-cw")}</div><h1>Ba hướng đáng để bạn thử tìm hiểu</h1><p>Dựa trên những hoạt động bạn vừa chọn. Hãy mở một hướng thấy tò mò nhất để bắt đầu.</p></div><aside class="answer-summary"><strong>Bạn đã chọn</strong><div class="chip-row"><span class="chip active">Tìm mẫu dữ liệu</span><span class="chip active">Thử nghiệm</span><span class="chip active">Làm rõ nhu cầu</span><span class="chip">+ 4 ưu tiên khác</span></div><a class="text-link" href="#screen-discovery-question" style="margin-top:12px" data-nav="screen-discovery-question">Sửa câu trả lời ${icon("pencil")}</a></aside></div></section>
      <div class="content-container discovery-results-body">
        <div class="section-heading"><div><h2>Bạn có thể bắt đầu từ đâu?</h2><p>Chọn một hướng khiến bạn muốn biết thêm; thứ tự dưới đây không phải xếp hạng.</p></div></div>
        <div class="theme-grid">${themes.map(([iconName, title, copy, reasons, seed], index) => `<article class="theme-card"><div class="theme-rank"><span class="icon-box ${index === 1 ? "purple" : index === 2 ? "orange" : "teal"}">${icon(iconName)}</span><span class="theme-number">0${index + 1}</span></div><h3>${title}</h3><p>${copy}</p><ul class="why-list">${reasons.map((reason) => `<li>${icon("check-circle-2")}<span>${reason}</span></li>`).join("")}</ul><div class="card-footer"><span>Từ khóa: ${seed}</span><a class="text-link" href="#screen-search" data-nav="screen-search" data-search-preset="${index === 2 ? "major" : "job"}" data-search-query="${seed}">Mở tra cứu ${icon("arrow-right")}</a></div></article>`).join("")}</div>
        <div class="next-actions"><div class="search-seeds"><h3>Bắt đầu với từ khóa nào?</h3><p>Mỗi từ khóa mở Tra cứu ở đúng loại đối tượng; bạn có thể sửa hoặc tìm rộng hơn.</p><div class="seed-list"><button class="seed" type="button" data-nav="screen-search" data-search-preset="job" data-search-query="phân tích dữ liệu">Nghề · Phân tích dữ liệu</button><button class="seed" type="button" data-nav="screen-search" data-search-preset="major" data-search-query="khoa học dữ liệu">Ngành · Khoa học dữ liệu</button><button class="seed" type="button" data-nav="screen-search" data-search-preset="job" data-search-query="nghiên cứu thị trường">Nghề · Nghiên cứu thị trường</button><button class="seed" type="button" data-nav="screen-search" data-search-preset="major" data-search-query="hệ thống thông tin">Ngành · Hệ thống thông tin</button></div></div><div class="info-panel white"><h3>Không thấy mình trong kết quả?</h3><p style="margin:0 0 14px;color:var(--gray-700);font-size:11px;line-height:18px">Bạn có thể sửa câu trả lời, bỏ toàn bộ kết quả hoặc đi thẳng đến Tra cứu mà không dùng Discovery.</p><div class="header-actions">${button("Làm lại", "outline", "refresh-cw", `data-discovery-action="restart"`)} ${button("Mở tra cứu", "primary", "search", `data-nav="screen-search"`)}</div></div></div>
        <section class="content-section" style="margin-top:34px"><div class="section-heading"><div><h2>Lựa chọn để tìm hiểu tiếp</h2><p>Một nghề và một ngành được gợi ý như điểm bắt đầu, không phải đáp án.</p></div>${button("Xem danh sách đã lưu", "outline", "bookmark", `data-nav="screen-saved"`)}</div><div class="relation-grid"><article class="relation-card"><div class="result-topline">${badge("Nghề", "blue")} ${badge("Có dữ liệu quan sát", "teal")}</div><h3>Chuyên viên phân tích dữ liệu</h3><p>Khớp với chủ đề phân tích, kiểm chứng và trình bày phát hiện.</p><div class="card-footer"><span>6 ngành liên quan</span><a class="text-link" href="#screen-job-detail" data-nav="screen-job-detail">Xem nghề ${icon("arrow-right")}</a></div></article><article class="relation-card"><div class="result-topline">${badge("Ngành", "blue")} ${badge("Nội dung khái quát", "yellow")}</div><h3>Khoa học dữ liệu</h3><p>Một đường học kết hợp toán, lập trình và bối cảnh ứng dụng.</p><div class="card-footer"><span>12 chương trình demo</span><a class="text-link" href="#screen-major-detail" data-nav="screen-major-detail">Xem ngành ${icon("arrow-right")}</a></div></article><article class="relation-card"><div class="result-topline">${badge("Bước tiếp theo", "purple")}</div><h3>So sánh với một lựa chọn khác</h3><p>Chọn tiêu chí của bạn để thấy điểm được, đánh đổi và phần còn thiếu.</p><div class="card-footer"><span>Không tạo điểm tổng hợp</span><a class="text-link" href="#screen-compare" data-nav="screen-compare">Mở so sánh ${icon("arrow-right")}</a></div></article></div></section>
      </div>
      ${footer()}
    `,
    1360
  );
}

function aboutDataScreen() {
  return screenFrame(
    "screen-about-data",
    "09 · About the Data",
    "Sources, coverage and quality rules",
    `
      ${portalHeader("Về dữ liệu")}
      <section class="method-hero"><div class="content-container method-hero-grid"><div><p class="eyebrow">Hiểu trước khi sử dụng</p><h1>Dữ liệu này có đáng tin không?</h1><p>Mỗi con số cần trả lời được ba câu hỏi: đến từ đâu, áp dụng cho thời gian nào và đang nói về điều gì.</p></div><aside class="coverage-meter trust-check"><div class="coverage-meter-label">${badge("Dữ liệu minh họa", "orange", "flask-conical")}</div><strong>Trước khi dùng một con số</strong><span>${icon("link-2")} Xem nguồn</span><span>${icon("calendar-days")} Xem năm áp dụng</span><span>${icon("map-pin")} Xem khu vực và đối tượng</span></aside></div></section>
      <nav class="content-container about-subnav" aria-label="Nội dung về dữ liệu"><button class="active" type="button" data-about-index="0">Cách làm</button><button type="button" data-about-index="2">Nguồn dữ liệu</button><button type="button" data-about-index="3">Độ đầy đủ</button><button type="button" data-about-index="4">Dự báo</button><button type="button" data-about-index="5">Trợ lý</button><button type="button" data-about-index="6">Quyền riêng tư</button></nav>
      <div class="content-container data-page-body">
        <section class="content-section"><div class="section-heading"><div><h2>Trước khi một con số xuất hiện</h2><p>Dữ liệu phải đi qua năm bước để bạn có thể hiểu và kiểm tra.</p></div></div><div class="method-flow"><div class="method-step">${icon("folder-input")}<strong>1. Tìm nguồn</strong><span>Ưu tiên văn bản chính thức và dữ liệu mở.</span></div><div class="method-step">${icon("list-tree")}<strong>2. Ghi đúng nghĩa</strong><span>Con số đo điều gì và dùng đơn vị nào.</span></div><div class="method-step">${icon("shield-check")}<strong>3. Kiểm tra</strong><span>Có đủ thông tin và truy lại được hay không.</span></div><div class="method-step">${icon("scale")}<strong>4. Đối chiếu</strong><span>Cùng thời gian, khu vực và đối tượng.</span></div><div class="method-step">${icon("panel-top-open")}<strong>5. Hiển thị rõ</strong><span>Luôn đi cùng nguồn và phần còn thiếu.</span></div></div></section>
        <section class="content-section"><div class="section-heading"><div><h2>Cách đọc các nhãn</h2><p>Mỗi nhãn nói rõ dữ liệu đang ở trạng thái nào.</p></div></div><div class="status-legend"><div class="status-item">${badge("Số liệu đã có", "teal")}<strong>Có thể xem và kiểm tra nguồn</strong><p>Luôn ghi rõ năm và phạm vi.</p></div><div class="status-item">${badge("Ước tính đến 2028", "purple")}<strong>Chỉ dùng trong khoảng được hỗ trợ</strong><p>Không phải lời hứa về tương lai.</p></div><div class="status-item">${badge("Chưa có dữ liệu", "gray")}<strong>Thông tin vẫn còn thiếu</strong><p>Không tự điền bằng số 0 hoặc số cũ.</p></div><div class="status-item">${badge("Dữ liệu minh họa", "orange")}<strong>Chỉ dùng để thử trải nghiệm</strong><p>Không phải dữ liệu đang chạy thật.</p></div></div></section>
        <section class="content-section"><div class="section-heading"><div><h2>Danh mục nguồn</h2><p>Mỗi nguồn có chủ sở hữu, loại thông tin, thời kỳ và phạm vi được phép sử dụng.</p></div>${button("Tìm trong danh mục", "outline", "search")}</div><div class="source-catalog"><article class="source-card"><span class="source-logo">${icon("landmark")}</span><div><h3>Dữ liệu thống kê lao động</h3><p>Chỉ số lịch sử theo nhóm nghề, khu vực và kỳ công bố. Cần kiểm tra định nghĩa từng bảng.</p></div>${badge("Nguồn chính", "teal")}</article><article class="source-card"><span class="source-logo">${icon("school")}</span><div><h3>Đề án tuyển sinh của cơ sở đào tạo</h3><p>Điều kiện, học phí và chương trình theo năm áp dụng; liên kết về văn bản gốc.</p></div>${badge("Nguồn chính", "teal")}</article><article class="source-card"><span class="source-logo">${icon("briefcase-business")}</span><div><h3>Dữ liệu tin tuyển dụng tổng hợp</h3><p>Phản ánh tin đăng trong phạm vi nguồn, không đồng nghĩa tổng số việc làm.</p></div>${badge("Nguồn bổ sung", "blue")}</article><article class="source-card"><span class="source-logo">${icon("file-search")}</span><div><h3>Nghiên cứu và báo cáo chuyên đề</h3><p>Dùng để bổ sung bối cảnh; không thay thế chỉ số chính thức nếu định nghĩa khác.</p></div>${badge("Nguồn tham khảo", "yellow")}</article></div></section>
        <section class="content-section"><div class="section-heading"><div><h2>Hiện dữ liệu đã có đến đâu?</h2><p>Bản dùng thử có phần đã sẵn sàng, phần đang kiểm tra và phần chưa có.</p></div></div><div class="data-coverage-grid"><article>${icon("briefcase-business")}<div><strong>Nghề</strong><span>Có mô tả và một phần dữ liệu thị trường</span></div>${badge("Đang bổ sung", "yellow")}</article><article>${icon("graduation-cap")}<div><strong>Ngành học</strong><span>Có nội dung khái quát và nghề liên quan</span></div>${badge("Đang bổ sung", "yellow")}</article><article>${icon("school")}<div><strong>Chương trình</strong><span>Một số thông tin tuyển sinh còn thiếu</span></div>${badge("Cần kiểm tra", "orange")}</article><article>${icon("activity")}<div><strong>Xu hướng</strong><span>Chỉ hỗ trợ một số nhóm nghề đến 2028</span></div>${badge("Phạm vi giới hạn", "purple")}</article></div></section>
        <section class="content-section"><div class="section-heading"><div><h2>Trợ lý được phép làm gì?</h2><p>Đây là bản mô phỏng, đang dùng dữ liệu minh họa.</p></div>${badge("Bản dùng thử", "orange", "flask-conical")}</div><div class="governance-grid"><article><h3>${icon("user-check")} Hỏi bạn trước</h3><p>Không tự tạo hoặc thay đổi nội dung đã lưu.</p></article><article><h3>${icon("book-open-check")} Cho bạn xem nguồn</h3><p>Thông tin quan trọng mở được nguồn và phần còn thiếu.</p></article><article><h3>${icon("shield-alert")} Không quyết định thay</h3><p>Giúp so sánh nhưng không chọn ngành thay học sinh.</p></article></div></section>
        <section class="content-section"><div class="section-heading"><div><h2>Quyền riêng tư và sử dụng có trách nhiệm</h2><p>Câu trả lời khám phá bản thân, ghi chú và lựa chọn chỉ tồn tại trong phiên dùng thử; không được dùng để tạo hồ sơ cá nhân.</p></div></div><div class="two-column"><div class="info-panel white"><h3>Không thu thập trong bản dùng thử</h3><ul class="info-list"><li>${icon("circle-minus")}<span>Không yêu cầu số định danh hoặc hồ sơ học tập cá nhân.</span></li><li>${icon("circle-minus")}<span>Không dùng câu trả lời của bạn làm dữ liệu cho trợ lý.</span></li><li>${icon("circle-minus")}<span>Không tạo điểm phù hợp hay hồ sơ năng lực.</span></li></ul></div><div class="info-panel white"><h3>Từ điển ngắn</h3><dl class="glossary-list"><div><dt>Nghề</dt><dd>Công việc hoặc nhóm công việc có hoạt động tương tự.</dd></div><div><dt>Ngành học</dt><dd>Lĩnh vực học tập ở cấp khái quát.</dd></div><div><dt>Chương trình</dt><dd>Chương trình cụ thể tại một cơ sở đào tạo.</dd></div><div><dt>Dự báo</dt><dd>Ước tính một chỉ số trong khoảng thời gian giới hạn.</dd></div></dl></div></div></section>
      </div>
      ${footer()}
    `,
    1570
  );
}

function savedScreen() {
  const saved = [
    ["graduation-cap", "Khoa học dữ liệu", "Ngành học · Lưu vì thích phân tích và xây dựng mô hình", "blue"],
    ["graduation-cap", "Hệ thống thông tin", "Ngành học · Lưu vì kết hợp công nghệ và nhu cầu tổ chức", "teal"],
    ["briefcase-business", "Chuyên viên phân tích dữ liệu", "Nghề · Lưu để kiểm tra công việc thực tế và đường học", "orange"]
  ];
  return screenFrame(
    "screen-saved",
    "10 · Saved Decision Board",
    "Priorities, family concerns and unknowns",
    `
      <div class="saved-page">
        ${portalHeader("Tiện ích")}
        ${crumbs(["Trang chủ", "Danh sách đã lưu"])}
        <div class="content-container page-header"><div><p class="eyebrow">Không cần chốt ngay</p><h1>Lựa chọn của bạn</h1><p>Lưu những điều đang cân nhắc, đặt chúng cạnh nhau và ghi lại câu hỏi cần kiểm tra.</p></div>${button("Mở so sánh", "primary", "columns-3", `data-nav="screen-compare"`)}</div>
        <div class="content-container utility-tabs" role="tablist" aria-label="Các tiện ích"><button class="active" type="button" role="tab" aria-selected="true" data-utility-tab="saved">Đã lưu</button><button type="button" role="tab" aria-selected="false" data-utility-tab="comparisons">So sánh</button><button type="button" role="tab" aria-selected="false" data-utility-tab="activity">Gần đây</button><button type="button" role="tab" aria-selected="false" data-utility-tab="checklist">Việc cần làm</button></div>
        <main class="content-container saved-body">
          <div data-utility-panel="saved"><div class="saved-overview"><div class="saved-list">${saved.map(([iconName, title, note, tone], index) => `<article class="saved-card" data-saved-item="${index}"><span class="icon-box ${tone}">${icon(iconName)}</span><div><h3>${title}</h3><p>${note}</p></div><div class="header-actions">${badge("Đã lưu", "teal", "check")}<button class="icon-button" type="button" aria-label="Bỏ lưu ${title}" data-saved-action="remove">${icon("bookmark-x")}</button></div></article>`).join("")}</div><aside class="saved-rail"><h3>Sẵn sàng để so sánh</h3><p>Bạn đã có hai ngành cùng loại. Chọn tiêu chí quan trọng để đặt cạnh nhau.</p><ul class="readiness-list"><li>${icon("check-circle-2")}<span>2 ngành cùng loại</span></li><li>${icon("check-circle-2")}<span>3 tiêu chí cá nhân đã chọn</span></li><li>${icon("alert-circle")}<span>2 khoảng trống dữ liệu cần giữ lại</span></li></ul>${button("So sánh 2 ngành", "outline", "arrow-right", `data-nav="screen-compare"`)}</aside></div><div class="section-heading"><div><h2>Làm rõ điều đang xung đột</h2><p>Biến cảm giác “khó chọn” thành các câu hỏi có thể trao đổi và kiểm tra.</p></div>${badge("Ghi chú của bạn", "blue", "pencil")}</div><div class="decision-board"><section class="decision-column"><h3>${icon("sparkles")} Điều em ưu tiên</h3><article class="note-card"><strong>Được làm việc với dữ liệu thực</strong><p>Em muốn hiểu vấn đề và trình bày kết quả, không chỉ viết mã.</p></article><article class="note-card"><strong>Có nhiều hướng nghề sau khi học</strong><p>Chưa muốn khóa mình vào một vai trò quá sớm.</p></article><article class="note-card"><strong>Chi phí trong khả năng gia đình</strong><p>Cần biết tổng chi phí, không chỉ học phí một năm.</p></article><button class="btn btn-soft btn-sm" type="button" data-note-action="priority">${icon("plus")} Thêm ưu tiên</button></section><section class="decision-column"><h3>${icon("messages-square")} Gia đình đang lo</h3><article class="note-card"><strong>Khả năng tìm việc sau tốt nghiệp</strong><p>Cần phân biệt dữ liệu thị trường với bảo đảm việc làm cá nhân.</p></article><article class="note-card"><strong>Ngành có quá khó không?</strong><p>Nên chuyển thành câu hỏi về môn học, nền tảng và nguồn hỗ trợ.</p></article><article class="note-card"><strong>Chi phí phát sinh ngoài học phí</strong><p>Chưa có dữ liệu phù hợp cho chương trình đang xem.</p></article><button class="btn btn-soft btn-sm" type="button" data-note-action="concern">${icon("plus")} Thêm điều lo</button></section><section class="decision-column"><h3>${icon("list-checks")} Cần kiểm tra tiếp</h3><article class="note-card"><strong>Đọc đề cương hai chương trình cụ thể</strong><p>So sánh học phần toán, lập trình, dự án và thực tập.</p></article><article class="note-card"><strong>Mở nguồn học phí năm 2026</strong><p>Không dùng học phí năm cũ làm giả định.</p></article><article class="note-card"><strong>Hỏi một sinh viên đang học</strong><p>Tìm hiểu cách học và khối lượng bài tập thực tế.</p></article><button class="btn btn-soft btn-sm" type="button" data-note-action="question">${icon("plus")} Thêm câu hỏi</button></section></div><div class="callout blue" style="margin-top:22px">${icon("share-2")}<div><strong>Tóm tắt để trao đổi cùng gia đình hoặc giáo viên.</strong><br>Bản tóm tắt giữ nguyên phần chưa biết và nguồn cần kiểm tra, không tạo một khuyến nghị thắng cuộc.</div></div></div>
          <section class="utility-panel" data-utility-panel="comparisons" hidden><div class="section-heading"><div><h2>Bảng so sánh đã lưu</h2><p>Mở lại đúng lựa chọn và tiêu chí bạn đã dùng.</p></div>${button("Tạo bảng mới", "primary", "plus", `data-nav="screen-compare"`)}</div><article class="utility-record"><div>${badge("Ngành học", "blue")} ${badge("Còn thiếu dữ liệu", "orange")}</div><h3>Khoa học dữ liệu × Hệ thống thông tin × Thống kê ứng dụng</h3><p>3 lựa chọn · 7 tiêu chí · cập nhật trong phiên này</p>${button("Mở lại bảng", "outline", "columns-3", `data-nav="screen-compare"`)}</article></section>
          <section class="utility-panel" data-utility-panel="activity" hidden><div class="section-heading"><div><h2>Hoạt động gần đây</h2><p>Những việc bạn vừa thực hiện trong phiên này.</p></div></div><ol class="activity-timeline"><li><span>${icon("bookmark")}</span><div><strong>Đã lưu Khoa học dữ liệu</strong><p>Lý do: thích phân tích và xây dựng mô hình</p></div><time>Phiên này</time></li><li><span>${icon("columns-3")}</span><div><strong>Đã mở bảng so sánh ngành</strong><p>Ba lựa chọn, giữ nguyên phần không tương thích</p></div><time>Phiên này</time></li><li><span>${icon("compass")}</span><div><strong>Đã hoàn thành Khám phá bản thân</strong><p>Ba chủ đề để tiếp tục tìm hiểu</p></div><time>Phiên này</time></li></ol></section>
          <section class="utility-panel" data-utility-panel="checklist" hidden><div class="section-heading"><div><h2>Việc cần làm trước khi quyết định</h2><p>Đánh dấu từng việc sau khi bạn đã tự kiểm tra.</p></div>${badge("1/4 đã kiểm tra", "yellow", "list-checks")}</div><div class="decision-checklist"><button class="checked" type="button" aria-pressed="true" data-checklist-item>${icon("check")}<span><strong>Đọc mô tả hai ngành</strong><small>Đã xem trọng tâm và khối kiến thức</small></span></button><button type="button" aria-pressed="false" data-checklist-item><span class="check-placeholder"></span><span><strong>Đối chiếu hai chương trình cụ thể</strong><small>Cần mở đề cương chính thức</small></span></button><button type="button" aria-pressed="false" data-checklist-item><span class="check-placeholder"></span><span><strong>Xác minh học phí đúng năm</strong><small>Không dùng dữ liệu cũ thay thế</small></span></button><button type="button" aria-pressed="false" data-checklist-item><span class="check-placeholder"></span><span><strong>Trao đổi với gia đình hoặc giáo viên</strong><small>Giữ lại điều còn chưa biết</small></span></button></div></section>
        </main>
      </div>
    `,
    1240
  );
}

function agentScreen() {
  return screenFrame(
    "screen-agent",
    "11 · Trợ lý tìm hiểu",
    "Mục tiêu, các bước, nguồn và điều chưa biết",
    `
      <div class="agent-page" data-agent-state="awaiting">
        <header class="agent-topbar"><a class="brand" href="#screen-home" data-nav="screen-home"><span class="brand-mark">T</span><span class="brand-copy"><span class="brand-name">Thử Nghề</span><span class="brand-tagline">Trợ lý tìm hiểu</span></span></a><div class="header-actions">${badge("Đang dùng dữ liệu minh họa", "orange", "flask-conical")} ${button("Đóng trợ lý", "outline", "x", `data-nav="screen-home"`)}</div></header>
        <div class="agent-shell">
          <aside class="agent-sidebar">
            <p class="eyebrow">Điều bạn đang cân nhắc</p><h1>Cùng bạn làm rõ lựa chọn</h1><p>Viết điều bạn muốn tìm hiểu. Trợ lý sẽ nhắc lại yêu cầu và hỏi trước khi tạo bảng so sánh.</p>
            <label class="agent-input"><span>Điều bạn muốn tìm hiểu</span><textarea aria-label="Điều bạn muốn tìm hiểu">Em muốn so sánh Khoa học dữ liệu và Hệ thống thông tin. Em dự kiến tốt nghiệp năm 2031, muốn học ở Hà Nội và cần xem nội dung học, chi phí cùng cơ hội nghề nghiệp.</textarea></label>
            <div class="constraint-block"><h3>Trợ lý hiểu rằng bạn quan tâm</h3><div class="chip-row"><span class="chip active">Hà Nội</span><span class="chip active">Tốt nghiệp 2031</span><span class="chip active">Nội dung học</span><span class="chip active">Chi phí</span><span class="chip active">Cơ hội nghề nghiệp</span></div></div>
            <div class="permission-block"><h3>Bạn kiểm soát những gì?</h3><div class="permission-row"><span>Tìm thông tin</span>${badge("Có thể tìm", "teal")}</div><div class="permission-row"><span>Tạo bảng so sánh</span>${badge("Luôn hỏi trước", "orange")}</div><div class="permission-row"><span>Thay đổi danh sách đã lưu</span>${badge("Luôn hỏi trước", "orange")}</div><div class="permission-row"><span>Quyết định ngành học</span>${badge("Bạn quyết định", "red")}</div></div>
            <button class="btn btn-soft btn-sm agent-refusal-demo" type="button" data-agent-action="refusal">Thử yêu cầu “Em nên chọn ngành nào?”</button>
          </aside>
          <main class="agent-main">
            <div class="agent-stage-head"><div><div class="entity-type">${badge("Bạn duyệt trước khi bắt đầu", "blue", "user-check")}</div><h2>Tạo bảng so sánh theo điều bạn quan tâm</h2><p>Kiểm tra bốn việc dưới đây. Bạn có thể sửa yêu cầu trước khi bắt đầu.</p></div>${button("Xem hoạt động", "outline", "scroll-text", `data-agent-action="log"`)}</div>
            <div class="agent-grid">
              <div class="agent-column">
                <section class="agent-panel panel-highlight" data-agent-panel="plan"><div class="agent-panel-head"><h3>Trợ lý sẽ làm 4 việc này</h3>${badge("Chờ bạn đồng ý", "blue")}</div><div class="plan-list"><div class="plan-step"><span class="plan-index">1</span><div><strong>Kiểm tra đúng hai ngành</strong><p>Không nhầm với nghề có tên gần giống.</p></div>${badge("Xem thông tin", "gray")}</div><div class="plan-step"><span class="plan-index">2</span><div><strong>Tìm chương trình tại Hà Nội</strong><p>Xem nội dung học, thời lượng, học phí và phần còn thiếu.</p></div>${badge("Xem thông tin", "gray")}</div><div class="plan-step"><span class="plan-index">3</span><div><strong>Tìm các nghề liên quan</strong><p>Chỉ đặt cạnh nhau những số liệu có thể so sánh.</p></div>${badge("Xem thông tin", "gray")}</div><div class="plan-step"><span class="plan-index">4</span><div><strong>Tạo bảng nháp cho bạn xem</strong><p>Bạn có thể sửa hoặc hoàn tác trước khi lưu.</p></div>${badge("Tạo bản nháp", "orange")}</div></div><div class="plan-actions">${button("Sửa yêu cầu", "outline", "pencil", `data-agent-action="edit"`)} ${button("Đồng ý, bắt đầu", "primary", "play", `data-agent-action="run"`)}</div><div class="agent-progress" aria-hidden="true"><span></span><strong>Đang tìm trong các nguồn đã kiểm tra…</strong></div></section>
                <section class="agent-panel" data-agent-output data-agent-variant="result"><div class="agent-panel-head"><h3>Bản nháp kết quả</h3>${badge("Còn thông tin cần kiểm tra", "orange", "circle-dot")}</div><table class="data-table"><thead><tr><th>Tiêu chí</th><th>Khoa học dữ liệu</th><th>Hệ thống thông tin</th></tr></thead><tbody><tr><td><strong>Trọng tâm</strong></td><td>Dữ liệu, mô hình, sản phẩm phân tích</td><td>Công nghệ, quy trình và tổ chức</td></tr><tr><td><strong>Chương trình tại Hà Nội</strong></td><td>3 chương trình cần kiểm tra</td><td>5 chương trình cần kiểm tra</td></tr><tr><td><strong>Học phí 2026</strong></td><td>${badge("Chưa đủ dữ liệu", "gray")}</td><td>${badge("Có 2 nguồn", "teal")}</td></tr><tr><td><strong>Dự báo năm 2031</strong></td><td colspan="2">${badge("Chưa có dự báo đáng tin cậy", "orange")} Dùng số liệu gần nhất để tham khảo</td></tr></tbody></table><div class="plan-actions">${button("Hoàn tác bản nháp", "outline", "undo-2", `data-agent-action="undo"`)} ${button("Mở trong So sánh", "primary", "arrow-right", `data-nav="screen-compare"`)}</div></section>
                <section class="agent-panel" data-agent-output data-agent-variant="result"><div class="agent-panel-head"><h3>Thông tin và nguồn đã kiểm tra</h3>${badge("3 thông tin có nguồn", "teal", "shield-check")}</div><div class="rag-answer"><p>Khoa học dữ liệu thường tập trung nhiều hơn vào quy trình dữ liệu và mô hình hóa, trong khi Hệ thống thông tin đặt trọng tâm rõ hơn vào việc kết nối công nghệ với quy trình của tổ chức.<button class="citation" type="button" data-source-id="major-content-framework" aria-label="Mở nguồn 1">1</button><button class="citation" type="button" data-source-id="program-catalogue" aria-label="Mở nguồn 2">2</button></p><p>Không có nguồn đủ phù hợp để so sánh chi phí toàn khóa của tất cả chương trình tại Hà Nội cho năm 2026.<button class="citation" type="button" data-source-id="program-tuition-gap" aria-label="Mở nguồn 3">3</button></p></div><div class="source-chip-list"><button class="source-chip" type="button" data-source-id="major-content-framework">${icon("file-text")}<div><strong>[1] Khung nội dung ngành học · phiên bản 0.4</strong><span>Phạm vi quốc gia · truy cập 18/09/2026</span></div>${badge("Nguồn bổ sung", "blue")}</button><button class="source-chip" type="button" data-source-id="program-catalogue">${icon("file-text")}<div><strong>[2] Danh mục chương trình và đề cương</strong><span>Ba cơ sở đào tạo · năm học 2026</span></div>${badge("Nguồn chính", "teal")}</button><button class="source-chip" type="button" data-source-id="program-tuition-gap">${icon("file-warning")}<div><strong>[3] Báo cáo khoảng trống học phí</strong><span>Thiếu năm áp dụng ở 4/8 chương trình</span></div>${badge("Thiếu thông tin", "orange")}</button></div></section>
              </div>
              <aside class="agent-column">
                <section class="agent-panel agent-awaiting" data-agent-awaiting><div class="awaiting-visual">${icon("user-check")}</div><div class="agent-panel-head"><h3>Sẵn sàng khi bạn đồng ý</h3></div><p>Trợ lý chưa tạo hay lưu nội dung nào. Hãy xem bốn việc bên trái rồi chọn “Đồng ý, bắt đầu”.</p></section>
                <section class="agent-panel" data-agent-output data-agent-variant="result"><div class="agent-panel-head"><h3>Điều chưa biết</h3>${badge("4 mục", "orange")}</div><ul class="unknown-list"><li>${icon("circle-help")}<span>Học phí 2026 của bốn chương trình chưa có văn bản đủ điều kiện.</span></li><li>${icon("circle-help")}<span>Chưa có dự báo đáng tin cậy đến năm 2031.</span></li><li>${icon("circle-help")}<span>Không thể lấy số liệu của một nghề để đại diện cho cả ngành học.</span></li><li>${icon("circle-help")}<span>Bạn chưa cho biết mức ngân sách dự kiến.</span></li></ul></section>
                <section class="agent-panel" data-agent-output data-agent-variant="result"><div class="agent-panel-head"><h3>Dự báo được dùng như thế nào?</h3>${badge("Có giới hạn", "purple")}</div><dl class="source-meta"><div><dt>Nhận diện tên nghề</dt><dd>Ghép các tên gần nghĩa về đúng nhóm nghề</dd></div><div><dt>Khoảng thời gian dự báo</dt><dd>Chỉ số tin tuyển dụng từ 2025 đến 2028</dd></div><div><dt>Không hỗ trợ</dt><dd>Năm 2031 và kết quả của từng cá nhân</dd></div></dl><button class="text-link text-button" type="button" style="margin-top:12px" data-nav="screen-model" data-open-model-card>Xem cách tạo dự báo ${icon("arrow-right")}</button></section>
                <section class="agent-panel" data-agent-output data-agent-variant="result"><div class="agent-panel-head"><h3>Các bước đã thực hiện</h3>${badge("Bản dùng thử", "orange")}</div><div class="action-log"><div class="log-row">${icon("check-circle-2")}<div><strong>Đã tìm đúng hai ngành học</strong><span>Không nhầm với nghề có tên gần giống</span></div><span>Bước 1</span></div><div class="log-row">${icon("check-circle-2")}<div><strong>Đã tìm thấy 8 chương trình</strong><span>Còn thiếu thông tin ở 4 mục</span></div><span>Bước 2</span></div><div class="log-row">${icon("check-circle-2")}<div><strong>Đã kiểm tra khả năng so sánh</strong><span>Một số dữ liệu chỉ có thể so sánh một phần</span></div><span>Bước 3</span></div><div class="log-row">${icon("check-circle-2")}<div><strong>Đã tạo bản nháp so sánh</strong><span>Bạn có thể hoàn tác</span></div><span>Bước 4</span></div></div></section>
                <section class="agent-panel" data-agent-output data-agent-variant="refusal"><div class="callout orange">${icon("shield-alert")}<div><strong>Mình không thể chọn ngành thay bạn</strong><br>Mình có thể giúp bạn chọn tiêu chí, lập bảng so sánh và chỉ rõ dữ liệu nào còn thiếu.</div></div><div class="plan-actions">${button("Quay lại kế hoạch", "outline", "arrow-left", `data-agent-action="reset"`)}</div></section>
              </aside>
            </div>
          </main>
        </div>
      </div>
    `,
    960
  );
}

function modelScreen() {
  return screenFrame(
    "screen-model",
    "12 · Dự báo xu hướng",
    "Khoảng thời gian, độ chắc chắn và giới hạn",
    `
      <div class="model-page" data-model-card="closed" data-model-state="supported">
        ${portalHeader("Về dữ liệu")}
        <div class="model-shell">
          <main class="model-main">
            <div class="model-capability-row"><div class="entity-type">${badge("Dữ liệu minh họa", "orange", "flask-conical")} ${badge("Ước tính đến 2028", "purple", "activity")}</div>${button("Hiểu biểu đồ này", "outline", "panel-right-open", `data-model-action="open-card"`)}</div>
            <h1>Tin tuyển dụng đang thay đổi thế nào?</h1>
            <p>Xem xu hướng chung của nhóm nghề phân tích dữ liệu. Biểu đồ không dự đoán khả năng có việc của riêng bạn.</p>
            <section class="forecast-card">
              <div class="forecast-heading"><div><h2>Mức xuất hiện của tin tuyển dụng · 2024 = 100</h2><p>Toàn quốc · số liệu đã có 2021–2024 · ước tính 2025–2028</p></div><div class="forecast-control"><div class="segmented" role="tablist" aria-label="Năm muốn xem"><button class="segment active" role="tab" aria-selected="true" data-model-scope="supported">Đến 2028</button><button class="segment" role="tab" aria-selected="false" data-model-scope="unsupported">Năm 2031</button><button class="segment model-internal-state" role="tab" aria-selected="false" data-model-scope="unavailable" tabindex="-1">Thiếu nguồn</button></div></div></div>
              <div class="forecast-kpis"><div class="forecast-kpi"><span>Số liệu gần nhất</span><strong>2024 · 100</strong><small>Giá trị chỉ số đã quy đổi</small></div><div class="forecast-kpi"><span>Ước tính cho năm 2028</span><strong>128</strong><small>Có thể nằm trong khoảng 108–146</small></div><div class="forecast-kpi"><span>Có thể xem đến</span><strong>2028</strong><small>Chưa hỗ trợ năm 2031</small></div></div>
              <div class="forecast-chart"><span class="forecast-gridline"></span><span class="forecast-gridline"></span><span class="forecast-gridline"></span><svg class="forecast-svg" viewBox="0 0 700 210" role="img" aria-label="Biểu đồ chỉ số quan sát và dự báo minh họa"><path d="M335 96 L420 78 L505 62 L590 48 L675 40 L675 88 L590 92 L505 104 L420 116 L335 126 Z" fill="rgba(112,87,217,.16)" stroke="none"></path><polyline points="20,162 100,148 180,132 260,110 335,96" fill="none" stroke="#0B6BDC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline><polyline points="335,96 420,90 505,80 590,70 675,62" fill="none" stroke="#7057D9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 9"></polyline><line x1="335" y1="20" x2="335" y2="190" stroke="#BAC7D3" stroke-width="1" stroke-dasharray="5 5"></line><g fill="#0B6BDC"><circle cx="20" cy="162" r="6"></circle><circle cx="100" cy="148" r="6"></circle><circle cx="180" cy="132" r="6"></circle><circle cx="260" cy="110" r="6"></circle><circle cx="335" cy="96" r="6"></circle></g><g fill="#7057D9"><circle cx="420" cy="90" r="6"></circle><circle cx="505" cy="80" r="6"></circle><circle cx="590" cy="70" r="6"></circle><circle cx="675" cy="62" r="6"></circle></g><g fill="#667789" font-family="Be Vietnam Pro" font-size="12"><text x="8" y="206">2021</text><text x="88" y="206">2022</text><text x="168" y="206">2023</text><text x="248" y="206">2024</text><text x="408" y="206">2025</text><text x="493" y="206">2026</text><text x="578" y="206">2027</text><text x="663" y="206">2028</text></g></svg></div>
              <div class="chart-legend"><span class="legend-item"><span class="legend-swatch"></span>Số liệu đã có</span><span class="legend-item"><span class="legend-swatch forecast"></span>Dự báo</span><span class="legend-item"><span class="coverage-dot" style="background:rgba(112,87,217,.2)"></span>Khoảng có thể xảy ra</span></div>
              <div class="forecast-note">${icon("info")}<div><strong>128 không có nghĩa là cơ hội việc làm tăng 28%.</strong><br>Đây là mức thay đổi của tin đăng, không phải số việc làm hay kết quả của một cá nhân.</div></div>
            </section>
            <section class="content-section" style="margin-top:28px"><h2>Nếu bạn muốn xem xa hơn</h2><div class="missing-panel"><span class="missing-icon">${icon("corner-down-left")}</span><div><strong>Chưa có ước tính đáng tin cậy cho năm 2031</strong><p>Dữ liệu hiện chỉ hỗ trợ đến năm 2028. Bạn vẫn có thể xem số liệu gần nhất của năm 2024.</p></div>${button("Xem số liệu gần nhất", "outline", "bar-chart-3", `data-source-id="job-postings-index"`)}</div></section>
          </main>
          <aside class="model-drawer">
            <div class="drawer-head"><div><div class="entity-type">${badge("Thông tin về bản dự báo", "purple")} ${badge("Đã kiểm tra · phạm vi giới hạn", "teal")}</div><h2>Dự báo xu hướng việc làm v0.3</h2></div><button class="icon-button" type="button" aria-label="Đóng thông tin dự báo" data-model-action="close-card">${icon("x")}</button></div>
            <section class="model-section"><h3>Bản dự báo này nói về điều gì?</h3><dl class="model-properties"><div><dt>Chỉ số được dự báo</dt><dd>Mức thay đổi của tin tuyển dụng</dd></div><div><dt>Áp dụng cho</dt><dd>Nhóm nghề, không áp dụng cho từng người</dd></div><div><dt>Khu vực</dt><dd>Toàn quốc</dd></div><div><dt>Khoảng thời gian</dt><dd>Từ 1 đến 4 năm</dd></div><div><dt>Dữ liệu cập nhật đến</dt><dd>31/12/2024</dd></div><div><dt>Phiên bản dữ liệu</dt><dd>Bộ dữ liệu thử nghiệm 2025.02</dd></div></dl></section>
            <section class="model-section"><h3>Kết quả kiểm tra thử</h3><div class="metric-strip"><div class="metric-box"><span>Điểm sai số</span><strong>0,82</strong></div><div class="metric-box"><span>Độ phủ khoảng dự báo</span><strong>86%</strong></div><div class="metric-box"><span>Số lần kiểm tra lại</span><strong>12</strong></div></div><div class="callout yellow" style="margin-top:12px">${icon("info")}<div>Các con số này chỉ minh họa cách trình bày, chưa phải kết quả đánh giá của hệ thống thật.</div></div></section>
            <section class="model-section"><h3>Điều kiện trước khi công bố</h3><dl class="model-properties"><div><dt>Mốc để so sánh</dt><dd>Một cách dự báo đơn giản theo mùa</dd></div><div><dt>Cách kiểm tra</dt><dd>Dùng dữ liệu cũ để thử dự báo cho các giai đoạn đã biết</dd></div><div><dt>Người xem lại</dt><dd>Cần người có chuyên môn kiểm tra</dd></div><div><dt>Lần xem xét tiếp theo</dt><dd>Chưa ấn định trong bản dùng thử</dd></div></dl></section>
            <section class="model-section"><h3>Giới hạn đã biết</h3><ul class="limit-list"><li>${icon("triangle-alert")}<span>Tin tuyển dụng không đại diện cho toàn bộ việc làm trên thị trường.</span></li><li>${icon("triangle-alert")}<span>Thay đổi nền tảng đăng tin có thể làm chỉ số biến động dù nhu cầu thật không đổi.</span></li><li>${icon("triangle-alert")}<span>Không hỗ trợ dự báo cho từng ngành học, trường hoặc học sinh.</span></li><li>${icon("triangle-alert")}<span>Nếu chưa nhận diện chắc chắn nhóm nghề, hệ thống sẽ không tạo dự báo.</span></li></ul></section>
            <section class="model-section"><h3>Khi không thể dự báo</h3><div class="callout blue">${icon("shield-check")}<div>Hệ thống sẽ hiển thị số liệu gần nhất, ghi rõ thời gian của số liệu và giải thích vì sao chưa thể dự báo.</div></div></section>
            <section class="model-section"><h3>Thông tin kỹ thuật</h3><dl class="model-properties"><div><dt>Đơn vị phụ trách</dt><dd>Nhóm Dữ liệu & Phương pháp</dd></div><div><dt>Mã bản dự báo</dt><dd>lmf-demo-v0.3</dd></div><div><dt>Tài liệu phương pháp</dt><dd>MN-FORECAST-003</dd></div><div><dt>Số lần cập nhật</dt><dd>3 bản ghi</dd></div></dl><button class="btn btn-outline model-method-button" type="button" data-source-id="model-method">${icon("external-link")} Xem báo cáo phương pháp</button></section>
          </aside>
        </div>
      </div>
    `,
    1100
  );
}

function sourceDrawer() {
  return `
    <div class="source-drawer-backdrop" data-source-backdrop aria-hidden="true"></div>
    <aside class="source-drawer" data-source-drawer aria-hidden="true" aria-labelledby="source-drawer-title" role="dialog" aria-modal="true">
      <div class="source-drawer-head">
        <div><p class="eyebrow">Nguồn & phương pháp</p><h2 id="source-drawer-title" data-source-field="title">Chi tiết nguồn</h2></div>
        <button class="icon-button" type="button" data-source-action="close" aria-label="Đóng thông tin nguồn">${icon("x")}</button>
      </div>
      <div class="source-drawer-body">
        <div data-source-field="status"></div>
        <section class="source-definition"><h3>Chỉ số này nói về điều gì?</h3><p data-source-field="definition"></p></section>
        <dl class="source-properties">
          <div><dt>Đối tượng</dt><dd data-source-field="entity"></dd></div>
          <div><dt>Địa lý</dt><dd data-source-field="geography"></dd></div>
          <div><dt>Thời kỳ</dt><dd data-source-field="period"></dd></div>
          <div><dt>Đơn vị</dt><dd data-source-field="unit"></dd></div>
          <div><dt>Đơn vị cung cấp</dt><dd data-source-field="provider"></dd></div>
          <div><dt>Cập nhật</dt><dd data-source-field="updated"></dd></div>
        </dl>
        <section><h3>Phương pháp</h3><p data-source-field="method"></p></section>
        <section class="source-limitation"><h3>${icon("triangle-alert")} Giới hạn cần biết</h3><p data-source-field="limitation"></p></section>
      </div>
      <div class="source-drawer-foot">
        ${button("Xem Về dữ liệu", "outline", "book-open", `data-nav="screen-about-data" data-source-action="close"`)}
        ${button("Đóng", "primary", "x", `data-source-action="close"`)}
      </div>
    </aside>`;
}

function renderBoard() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="design-board">
      <header class="board-intro">
        <div><p class="board-kicker">Data For Life · Bản dùng thử tương tác v0.2</p><h1>Thử Nghề — Cổng thông tin hỗ trợ chọn ngành dựa trên dữ liệu</h1><p>12 màn hình desktop cho các bước khám phá bản thân, tra cứu, so sánh, kiểm tra nguồn, dùng trợ lý và xem dự báo có giới hạn.</p><div class="board-actions">${button("Mở bản dùng thử", "primary", "play", `data-prototype-launch="screen-home"`)} ${button("Xem luồng chính", "outline", "route", `data-prototype-launch="screen-discovery-question"`)}</div></div>
        <div class="board-meta"><div class="board-meta-row"><span>Thiết kế tham chiếu</span><strong>CareerNet × ECSI/NCSS</strong></div><div class="board-meta-row"><span>Bản địa hóa</span><strong>Đời sống và bảng màu Việt Nam</strong></div><div class="board-meta-row"><span>Ngôn ngữ</span><strong>Be Vietnam Pro</strong></div><div class="board-meta-row"><span>Nguyên tắc</span><strong>Decision support, not replacement</strong></div><div class="board-meta-row"><span>Trạng thái công nghệ</span><strong>L0 · Mô phỏng trải nghiệm</strong></div></div>
      </header>
      <div class="board-grid">
        ${homeScreen()}
        ${searchScreen()}
        ${jobDetailScreen()}
        ${majorDetailScreen()}
        ${programDetailScreen()}
        ${compareScreen()}
        ${discoveryQuestionScreen()}
        ${discoveryResultScreen()}
        ${aboutDataScreen()}
        ${savedScreen()}
        ${agentScreen()}
        ${modelScreen()}
      </div>
    </div>
    <div class="prototype-toolbar" role="toolbar" aria-label="Điều khiển prototype">
      <button class="icon-button prototype-exit" type="button" aria-label="Quay lại bảng thiết kế">${icon("layout-grid")}</button>
      <div class="prototype-location"><span>Màn hình</span><strong>01 · Home</strong></div>
      <div class="prototype-stepper"><button class="icon-button" type="button" data-prototype-step="prev" aria-label="Màn hình trước">${icon("chevron-left")}</button><span>1 / 12</span><button class="icon-button" type="button" data-prototype-step="next" aria-label="Màn hình sau">${icon("chevron-right")}</button></div>
    </div>
    <div class="prototype-toast" role="status" aria-live="polite"></div>
    ${sourceDrawer()}`;
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  } else {
    window.addEventListener("load", () => window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } }), { once: true });
  }
}

const prototypeScreens = [
  ["screen-home", "01 · Home"],
  ["screen-search", "02 · Tra cứu"],
  ["screen-job-detail", "03 · Nghề"],
  ["screen-major-detail", "04 · Ngành học"],
  ["screen-program-detail", "05 · Chương trình"],
  ["screen-compare", "06 · So sánh"],
  ["screen-discovery-question", "07 · Khám phá"],
  ["screen-discovery-result", "08 · Kết quả khám phá"],
  ["screen-about-data", "09 · Về dữ liệu"],
  ["screen-saved", "10 · Bảng quyết định"],
  ["screen-agent", "11 · Trợ lý tìm hiểu"],
  ["screen-model", "12 · Dự báo xu hướng"]
];

const prototypeState = {
  activeScreen: "screen-home",
  homeSearchMode: "job",
  searchMode: "job",
  searchState: "results",
  compareMode: "major",
  compareState: "ready",
  agentState: "awaiting",
  discoveryState: "intro",
  discoveryStep: 1,
  discoverySelections: { 1: new Set(), 2: new Set([0, 1, 3]), 3: new Set(), 4: new Set() },
  savedCount: 3
};

const searchVariants = {
  job: {
    query: "phân tích dữ liệu",
    heading: "12 nghề liên quan đến “phân tích dữ liệu”",
    entity: "Nghề",
    stat: "Liên kết đào tạo",
    cta: "Xem nghề",
    target: "screen-job-detail",
    filters: [
      ["Nhóm hoạt động", [["Phân tích và giải thích", true], ["Xây dựng hệ thống", false], ["Nghiên cứu con người", false], ["Tổ chức và vận hành", false]]],
      ["Môi trường làm việc", [["Làm việc nhóm thường xuyên", false], ["Kết hợp tập trung cá nhân", true], ["Di chuyển nhiều", false]]],
      ["Khu vực dữ liệu", [["Toàn quốc", true], ["Miền Bắc", false], ["Miền Trung", false], ["Miền Nam", false]]]
    ],
    chips: ["Phân tích và giải thích", "Toàn quốc"],
    tray: ["Chuyên viên phân tích dữ liệu", "Chọn thêm 1–2 nghề cùng loại để bắt đầu so sánh"],
    visuals: [["chart-no-axes-combined", "teal", "Phân tích"], ["database", "blue", "Hệ thống"], ["search-check", "orange", "Nghiên cứu"]],
    cards: [
      ["Chuyên viên phân tích dữ liệu", "Làm rõ câu hỏi, kiểm tra dữ liệu và trình bày phát hiện để hỗ trợ ra quyết định.", ["Làm rõ câu hỏi", "Kiểm tra dữ liệu", "Trình bày phát hiện"], "6 ngành học liên quan", "Có dữ liệu quan sát", "teal", "check-circle-2"],
      ["Kỹ sư dữ liệu", "Thiết kế và vận hành luồng dữ liệu ổn định, có thể giám sát và kiểm soát chất lượng.", ["Xây dựng luồng dữ liệu", "Quản lý hệ thống", "Giám sát chất lượng"], "5 ngành học liên quan", "Thiếu dự báo phù hợp", "gray", "circle-minus"],
      ["Chuyên viên nghiên cứu thị trường", "Kết hợp dữ liệu và nghiên cứu con người để hiểu nhu cầu, hành vi và bối cảnh thị trường.", ["Thiết kế nghiên cứu", "Phân tích hành vi", "Đề xuất hành động"], "7 ngành học liên quan", "Có dữ liệu quan sát", "teal", "check-circle-2"]
    ]
  },
  major: {
    query: "khoa học dữ liệu",
    heading: "8 ngành học liên quan đến dữ liệu và phân tích",
    entity: "Ngành học",
    stat: "Chương trình trong danh mục",
    cta: "Xem ngành",
    target: "screen-major-detail",
    filters: [
      ["Khối kiến thức", [["Toán và thống kê", true], ["Công nghệ", false], ["Kinh doanh", false], ["Khoa học xã hội", false]]],
      ["Hình thức đào tạo", [["Chính quy", true], ["Chương trình tiên tiến", false], ["Liên kết quốc tế", false]]],
      ["Khu vực", [["Toàn quốc", true], ["Miền Bắc", false], ["Miền Trung", false], ["Miền Nam", false]]]
    ],
    chips: ["Toán và thống kê", "Chính quy", "Toàn quốc"],
    tray: ["Khoa học dữ liệu", "Chọn thêm 1–2 ngành học cùng loại để bắt đầu so sánh"],
    visuals: [["binary", "teal", "Dữ liệu"], ["network", "blue", "Hệ thống"], ["sigma", "orange", "Thống kê"]],
    cards: [
      ["Khoa học dữ liệu", "Kết hợp toán, thống kê, lập trình và kiến thức lĩnh vực để xây dựng sản phẩm từ dữ liệu.", ["Toán và thống kê", "Lập trình dữ liệu", "Mô hình hóa"], "12 chương trình", "Nội dung khái quát", "yellow", "book-open-check"],
      ["Hệ thống thông tin", "Kết nối công nghệ, quy trình và con người để thiết kế hệ thống phục vụ tổ chức.", ["Phân tích nghiệp vụ", "Cơ sở dữ liệu", "Quản trị hệ thống"], "18 chương trình", "Có liên kết chương trình", "teal", "link-2"],
      ["Thống kê ứng dụng", "Tập trung vào suy luận, thiết kế nghiên cứu và diễn giải độ bất định trong dữ liệu.", ["Xác suất", "Suy luận thống kê", "Thiết kế thí nghiệm"], "7 chương trình", "Cần duyệt mô tả", "orange", "circle-help"]
    ]
  },
  program: {
    query: "chương trình dữ liệu",
    heading: "18 chương trình đào tạo trong danh mục minh họa",
    entity: "Chương trình",
    stat: "Nguồn chính thức",
    cta: "Xem chương trình",
    target: "screen-program-detail",
    filters: [
      ["Khu vực học", [["Hà Nội", true], ["TP. Hồ Chí Minh", false], ["Đà Nẵng", false], ["Khu vực khác", false]]],
      ["Thông tin đã có", [["Tuyển sinh 2026", true], ["Đề cương chính thức", true], ["Học phí cùng năm", false]]],
      ["Thời lượng", [["3–3,5 năm", false], ["4 năm", true], ["Khác / chưa rõ", false]]]
    ],
    chips: ["Hà Nội", "Tuyển sinh 2026", "4 năm"],
    tray: ["Khoa học dữ liệu · Chương trình A", "Chọn thêm 1–2 chương trình cùng cấp dữ liệu để so sánh"],
    visuals: [["school", "teal", "Chương trình"], ["book-open-check", "blue", "Đào tạo"], ["briefcase-business", "orange", "Ứng dụng"]],
    cards: [
      ["Khoa học dữ liệu · Chương trình A", "Hà Nội · 4 năm · thông tin tuyển sinh 2026 đã có nguồn, học phí đang xác minh.", ["Toàn thời gian", "Tuyển sinh 2026", "Thiếu học phí"], "3 nguồn đã kiểm tra", "Tuyển sinh 2026", "teal", "calendar-check"],
      ["Khoa học dữ liệu ứng dụng · Chương trình B", "TP. Hồ Chí Minh · cấu trúc chương trình đã có, một số dữ liệu chi phí chưa cùng năm.", ["4 năm", "Đề cương có nguồn", "Chi phí chưa đủ"], "2 nguồn đã kiểm tra", "Thiếu học phí cùng năm", "gray", "circle-minus"],
      ["Phân tích dữ liệu kinh doanh · Chương trình C", "Đà Nẵng · 3,5 năm · cần kiểm tra điều kiện của từng phương thức tuyển sinh.", ["3,5 năm", "Có học phần dự án", "Tuyển sinh từng đợt"], "4 nguồn đã kiểm tra", "Cần xác minh điều kiện", "orange", "circle-help"]
    ]
  }
};

const sourceRecords = {
  "job-postings-index": {
    title: "Chỉ số tin tuyển dụng liên quan đến phân tích dữ liệu",
    status: ["Dữ liệu minh họa", "orange", "flask-conical"],
    definition: "Chỉ số theo dõi mức độ xuất hiện tương đối của nhóm tin tuyển dụng đã được ánh xạ vào nghề phân tích dữ liệu.",
    entity: "Nhóm nghề phân tích dữ liệu",
    geography: "Toàn quốc",
    period: "Quan sát 2022–2024 · dự báo 2025–2028",
    unit: "Chỉ số, năm 2024 = 100",
    provider: "Bộ dữ liệu minh họa của bản dùng thử",
    updated: "18/09/2026",
    method: "Loại các tin trùng nhau, nhóm theo thời gian và quy đổi về cùng hệ thống nhóm nghề đã được kiểm tra.",
    limitation: "Tin tuyển dụng không đại diện cho toàn bộ việc làm và không phải số người đang làm nghề. Dự báo chỉ dùng trong khoảng thời gian được công bố."
  },
  "salary-gap": {
    title: "Khoảng trống dữ liệu thu nhập",
    status: ["Thiếu dữ liệu", "gray", "circle-minus"],
    definition: "Prototype chưa có nguồn thu nhập đủ đồng nhất về định nghĩa nghề, kỳ đo và khu vực để hiển thị một con số đáng tin cậy.",
    entity: "Nghề phân tích dữ liệu",
    geography: "Chưa đồng nhất giữa các nguồn",
    period: "Nhiều kỳ, chưa thể đối chiếu",
    unit: "Chưa áp dụng",
    provider: "Báo cáo khoảng trống dữ liệu",
    updated: "18/09/2026",
    method: "Đối chiếu định nghĩa, khu vực, kỳ và đơn vị trước khi cho phép một chỉ số xuất hiện.",
    limitation: "Không dùng số 0, trung bình tự suy đoán hoặc nguồn tuyển dụng đơn lẻ để lấp khoảng trống."
  },
  "program-official": {
    title: "Trang thông tin chính thức của chương trình",
    status: ["Nguồn cấp A", "teal", "shield-check"],
    definition: "Thông tin mô tả chương trình, thời lượng và tuyển sinh được truy vết về trang hoặc tài liệu của cơ sở đào tạo.",
    entity: "Một chương trình đào tạo cụ thể",
    geography: "Theo cơ sở đào tạo",
    period: "Năm tuyển sinh 2026",
    unit: "Bản ghi chương trình",
    provider: "Cơ sở đào tạo · dữ liệu minh họa",
    updated: "18/09/2026",
    method: "Lưu đường dẫn nguồn, ngày truy cập, năm áp dụng và các thông tin chính của chương trình.",
    limitation: "Prototype không mở website thật và không thay thế thông báo tuyển sinh chính thức."
  },
  "program-tuition-gap": {
    title: "Khoảng trống học phí chương trình",
    status: ["Cần xác minh", "orange", "file-warning"],
    definition: "Một số bản ghi có mức học phí nhưng thiếu năm áp dụng hoặc chưa rõ học phí thuộc toàn khóa, năm học hay tín chỉ.",
    entity: "Chương trình đào tạo",
    geography: "Theo cơ sở đào tạo",
    period: "Mục tiêu: năm học 2026",
    unit: "Chưa thể chuẩn hóa",
    provider: "Danh mục chương trình minh họa",
    updated: "18/09/2026",
    method: "Chỉ so sánh khi cùng năm áp dụng và cùng cách tính; nếu không, ghi rõ là thiếu dữ liệu hoặc không thể so sánh trực tiếp.",
    limitation: "Không thể dùng để ước tính tổng chi phí học tập nếu thiếu năm và đơn vị tính."
  },
  "major-content-framework": {
    title: "Khung nội dung ngành học · phiên bản 0.4",
    status: ["Nguồn cấp B", "blue", "file-check-2"],
    definition: "Khung mô tả các nhóm kiến thức thường xuất hiện trong một ngành học; không đại diện cho mọi chương trình.",
    entity: "Ngành học",
    geography: "Phạm vi quốc gia",
    period: "Phiên bản nội dung 0.4",
    unit: "Nhóm kiến thức",
    provider: "Khung nội dung minh họa",
    updated: "18/09/2026",
    method: "Tổng hợp đề cương và gom vào nhóm kiến thức có mô tả, sau đó duyệt thủ công.",
    limitation: "Không dùng để suy ra chất lượng hay xếp hạng một trường hoặc chương trình cụ thể."
  },
  "program-catalogue": {
    title: "Danh mục chương trình và đề cương",
    status: ["Nguồn cấp A", "teal", "shield-check"],
    definition: "Danh mục bản ghi chương trình gắn với cơ sở đào tạo, địa điểm, thời lượng và tài liệu chính thức.",
    entity: "Chương trình đào tạo",
    geography: "Ba cơ sở đào tạo minh họa",
    period: "Năm học 2026",
    unit: "Bản ghi chương trình",
    provider: "Nguồn chính thức của cơ sở đào tạo · mô phỏng",
    updated: "18/09/2026",
    method: "Lấy dữ liệu theo cùng một cấu trúc và giữ đường dẫn nguồn, năm áp dụng, ngày truy cập.",
    limitation: "Danh mục chưa bao phủ đầy đủ và không phải bảng xếp hạng chương trình."
  },
  "model-method": {
    title: "Cách tạo dự báo xu hướng việc làm v0.3",
    status: ["Mô phỏng · phạm vi giới hạn", "purple", "activity"],
    definition: "Mô hình minh họa dự báo chỉ số tin tuyển dụng chuẩn hóa theo nhóm nghề, không dự báo xác suất có việc của cá nhân.",
    entity: "Nhóm nghề đã được ánh xạ và duyệt",
    geography: "Toàn quốc",
    period: "Dữ liệu cập nhật đến 31/12/2024 · dự báo từ 1 đến 4 năm",
    unit: "Chỉ số, năm 2024 = 100",
    provider: "Nhóm Dữ liệu & Phương pháp · bản dùng thử",
    updated: "18/09/2026",
    method: "So sánh với một cách dự báo đơn giản, thử lại trên nhiều giai đoạn dữ liệu cũ và yêu cầu người có chuyên môn xem trước khi công bố. Các con số hiện tại chỉ là minh họa.",
    limitation: "Không hỗ trợ năm 2031, ngành học, trường, chương trình hoặc dự báo cá nhân. Khi nguồn không sẵn sàng, hệ thống không tạo dự báo và quay về số liệu gần nhất."
  }
};

const discoverySteps = {
  1: ["Bối cảnh hiện tại", "Bạn đang đứng ở đâu trong quyết định chọn ngành?", "Chọn những mô tả gần với hoàn cảnh hiện tại. Bạn có thể sửa lại sau.", [["map", "Chưa có hướng rõ", "Muốn khám phá từ đầu"], ["signpost", "Đang cân nhắc vài hướng", "Cần thu hẹp lựa chọn"], ["target", "Đã có ngành quan tâm", "Muốn kiểm tra bằng dữ liệu"], ["users", "Gia đình có kỳ vọng riêng", "Cần chuẩn bị để trao đổi"], ["wallet", "Chi phí là ràng buộc lớn", "Cần xem khả năng tài chính"], ["map-pin", "Địa điểm học có giới hạn", "Cần lọc theo khu vực"]]],
  2: ["Hoạt động khiến bạn tò mò", "Bạn muốn thử làm những hoạt động nào?", "Chọn tối đa 3 hoạt động. Đây là tín hiệu để tạo từ khóa tìm hiểu, không phải bài kiểm tra năng lực.", [["chart-no-axes-combined", "Tìm mẫu và giải thích dữ liệu", "Nhìn ra điều gì đang thay đổi"], ["messages-square", "Trao đổi để hiểu nhu cầu", "Đặt câu hỏi và làm rõ vấn đề"], ["blocks", "Xây dựng một hệ thống hoạt động", "Ghép nhiều phần thành quy trình"], ["flask-conical", "Thử nghiệm và kiểm tra giả thuyết", "So sánh kết quả trước khi kết luận"], ["palette", "Tạo nội dung hoặc hình ảnh", "Biến ý tưởng thành trải nghiệm"], ["hand-heart", "Hỗ trợ trực tiếp cho người khác", "Tạo ảnh hưởng qua tương tác"]]],
  3: ["Điều bạn coi trọng", "Một công việc tương lai nên mang lại điều gì?", "Chọn tối đa 3 ưu tiên để dùng làm tiêu chí so sánh, không phải điểm phù hợp.", [["coins", "Thu nhập và ổn định", "Hiểu cả mức thu nhập lẫn độ biến động"], ["clock-3", "Thời gian linh hoạt", "Cân bằng học tập, công việc và đời sống"], ["sparkles", "Cơ hội phát triển", "Được học thêm và thử trách nhiệm mới"], ["heart-handshake", "Tác động xã hội", "Thấy công việc có ích với người khác"], ["users", "Môi trường cộng tác", "Được làm việc và học hỏi cùng nhóm"], ["map", "Khả năng làm ở nhiều nơi", "Không bị phụ thuộc một địa điểm"]]],
  4: ["Ràng buộc cần kiểm tra", "Điều gì có thể làm lựa chọn trở nên khó thực hiện?", "Chọn các vấn đề bạn muốn hệ thống giữ lại trong checklist quyết định.", [["wallet-cards", "Ngân sách gia đình", "Học phí và chi phí sinh hoạt"], ["map-pin", "Khoảng cách và nơi học", "Khả năng di chuyển hoặc ở xa"], ["calendar", "Thời gian đào tạo", "Số năm học và thời điểm bắt đầu"], ["book-open", "Khối lượng kiến thức", "Nền tảng cần chuẩn bị"], ["message-circle-question", "Kỳ vọng của gia đình", "Cần bằng chứng để cùng trao đổi"], ["briefcase-business", "Cơ hội nghề nghiệp", "Cần hiểu thị trường nhưng không tuyệt đối hóa"]]]
};

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function showToast(message) {
  const toast = document.querySelector(".prototype-toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

let sourceDrawerReturnFocus = null;
function openSourceDrawer(sourceId, trigger) {
  const record = sourceRecords[sourceId];
  const drawer = document.querySelector("[data-source-drawer]");
  const backdrop = document.querySelector("[data-source-backdrop]");
  if (!record || !drawer || !backdrop) return;
  sourceDrawerReturnFocus = trigger || document.activeElement;
  drawer.querySelector("[data-source-field='title']").textContent = record.title;
  drawer.querySelector("[data-source-field='status']").innerHTML = badge(...record.status);
  ["definition", "entity", "geography", "period", "unit", "provider", "updated", "method", "limitation"].forEach((field) => {
    drawer.querySelector(`[data-source-field='${field}']`).textContent = record[field];
  });
  drawer.classList.add("is-open");
  backdrop.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("source-drawer-open");
  refreshIcons();
  drawer.querySelector("[data-source-action='close']")?.focus();
}

function closeSourceDrawer() {
  const drawer = document.querySelector("[data-source-drawer]");
  const backdrop = document.querySelector("[data-source-backdrop]");
  if (!drawer?.classList.contains("is-open")) return false;
  drawer.classList.remove("is-open");
  backdrop.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("source-drawer-open");
  sourceDrawerReturnFocus?.focus?.();
  sourceDrawerReturnFocus = null;
  return true;
}

function showPrototypeScreen(screenId) {
  if (!prototypeScreens.some(([id]) => id === screenId)) return;
  prototypeState.activeScreen = screenId;
  document.body.classList.add("prototype-mode");
  document.querySelectorAll(".screen-shell").forEach((screen) => screen.classList.toggle("is-active", screen.id === screenId));
  const index = prototypeScreens.findIndex(([id]) => id === screenId);
  const toolbar = document.querySelector(".prototype-toolbar");
  toolbar.querySelector(".prototype-location strong").textContent = prototypeScreens[index][1];
  toolbar.querySelector(".prototype-stepper span").textContent = `${index + 1} / ${prototypeScreens.length}`;
  window.scrollTo({ top: 0, behavior: "instant" });
  history.replaceState(null, "", `#${screenId}`);
  requestAnimationFrame(() => document.getElementById(screenId)?.classList.add("screen-entered"));
}

function exitPrototype() {
  document.body.classList.remove("prototype-mode");
  document.querySelectorAll(".screen-shell").forEach((screen) => screen.classList.remove("is-active", "screen-entered"));
  history.replaceState(null, "", location.pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function stepPrototype(direction) {
  const index = prototypeScreens.findIndex(([id]) => id === prototypeState.activeScreen);
  const next = (index + direction + prototypeScreens.length) % prototypeScreens.length;
  showPrototypeScreen(prototypeScreens[next][0]);
}

function renderSearchFilters(variant) {
  const root = document.querySelector("#screen-search");
  const panel = root.querySelector(".filter-panel");
  panel.querySelectorAll(".filter-group").forEach((group) => group.remove());
  variant.filters.forEach(([title, items]) => {
    const group = document.createElement("div");
    group.className = "filter-group";
    group.innerHTML = `<h3>${title}</h3><div class="check-list">${items.map(([label, selected]) => `<button class="check-row ${selected ? "checked" : ""}" type="button" aria-pressed="${selected}"><span class="check-box">${selected ? icon("check") : ""}</span>${label}</button>`).join("")}</div>`;
    panel.append(group);
  });
  root.querySelector(".filter-chips").innerHTML = variant.chips.map((label) => `<button class="chip active" type="button" data-filter-chip>${label}${icon("x")}</button>`).join("");
}

function setSearchState(state = "results") {
  const root = document.querySelector("#screen-search");
  prototypeState.searchState = state;
  root.querySelector(".result-list").hidden = state !== "results";
  root.querySelectorAll("[data-search-state]").forEach((panel) => {
    panel.hidden = panel.dataset.searchState !== state;
  });
}

function runSearch() {
  const root = document.querySelector("#screen-search");
  const input = root.querySelector(".global-search input");
  const query = input.value.trim();
  const variant = searchVariants[prototypeState.searchMode];
  setSearchState("loading");
  window.clearTimeout(runSearch.timer);
  runSearch.timer = window.setTimeout(() => {
    const haystack = [variant.query, variant.entity, ...variant.cards.flatMap((card) => [card[0], card[1], ...card[2]])].join(" ").toLocaleLowerCase("vi");
    const terms = query.toLocaleLowerCase("vi").split(/\s+/).filter((term) => term.length > 2);
    const hasMatch = !query || terms.some((term) => haystack.includes(term));
    setSearchState(hasMatch ? "results" : "empty");
    root.querySelector(".results-head h2").textContent = hasMatch
      ? (query ? `${variant.heading.split(" liên quan")[0]} liên quan đến “${query}”` : variant.heading)
      : `Không có ${variant.entity.toLowerCase()} phù hợp với “${query}”`;
    showToast(hasMatch ? `Đã cập nhật kết quả ${variant.entity.toLowerCase()}` : "Chưa có kết quả phù hợp. Bạn có thể bỏ bớt bộ lọc.");
  }, 520);
}

function applySearchMode(mode) {
  const variant = searchVariants[mode];
  if (!variant) return;
  prototypeState.searchMode = mode;
  const root = document.querySelector("#screen-search");
  root.querySelectorAll("[data-search-mode]").forEach((tab) => {
    const active = tab.dataset.searchMode === mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  root.querySelector(".global-search input").value = variant.query;
  root.querySelector(".results-head h2").textContent = variant.heading;
  renderSearchFilters(variant);
  setSearchState("results");
  root.querySelectorAll(".result-card").forEach((card, index) => {
    const data = variant.cards[index];
    const visual = variant.visuals[index];
    const visualNode = card.querySelector(".result-visual");
    visualNode.className = `result-visual ${visual[1]}`;
    visualNode.innerHTML = `${icon(visual[0])}<span>${visual[2]}</span>`;
    card.querySelector(".result-topline").innerHTML = `${badge(variant.entity, "blue")} ${badge(data[4], data[5], data[6])}`;
    card.querySelector("h3").textContent = data[0];
    card.querySelectorAll(".activity-list li").forEach((li, itemIndex) => { li.textContent = data[2][itemIndex]; });
    card.querySelector(".result-stat span").textContent = variant.stat;
    card.querySelector(".result-stat strong").textContent = data[3];
    const cta = [...card.querySelectorAll("button")].find((item) => item.classList.contains("btn-primary"));
    if (cta) cta.innerHTML = `${icon("arrow-right")}${variant.cta}`;
  });
  const tray = root.querySelector(".compare-tray");
  tray.querySelector(".tray-items strong").textContent = `Đã thêm ${variant.tray[0]}`;
  tray.querySelector(".tray-items div span").textContent = variant.tray[1];
  refreshIcons();
  showToast(`Đã chuyển sang tra cứu ${variant.entity.toLowerCase()}`);
}

let compareBaseline;
function setCompareState(state = "ready") {
  const root = document.querySelector("#screen-compare .compare-page");
  if (!root) return;
  prototypeState.compareState = state;
  root.dataset.compareState = state;
  root.querySelectorAll("[data-compare-state-action]").forEach((buttonNode) => {
    buttonNode.classList.toggle("active", buttonNode.dataset.compareStateAction === state && buttonNode.closest(".compare-state-demo"));
  });
  root.querySelectorAll("[data-compare-state-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.compareStatePanel !== state;
  });
  root.querySelector(".compare-table").hidden = state === "not-enough";
}

function applyCompareMode(mode) {
  const root = document.querySelector("#screen-compare");
  const table = root.querySelector(".compare-table");
  if (!compareBaseline) compareBaseline = table.innerHTML;
  if (mode === "major") {
    table.innerHTML = compareBaseline;
    root.querySelector(".compare-tools h1").textContent = "So sánh ngành học";
  } else {
    const sets = {
      job: {
        title: "So sánh nghề nghiệp",
        heads: [["Chuyên viên phân tích dữ liệu", "Phân tích và truyền đạt dữ liệu."], ["Kỹ sư dữ liệu", "Xây dựng hệ thống dữ liệu."], ["Nghiên cứu thị trường", "Kết hợp dữ liệu và hành vi."]],
        labels: ["Công việc thường ngày", "Kỹ năng thể hiện", "Môi trường làm việc", "Đường học thường gặp", "Dữ liệu thị trường", "Thu nhập", "Ghi chú của bạn"]
      },
      program: {
        title: "So sánh chương trình đào tạo",
        heads: [["Khoa học dữ liệu · A", "Hà Nội · 4 năm."], ["Khoa học dữ liệu ứng dụng · B", "TP.HCM · 4 năm."], ["Phân tích dữ liệu kinh doanh · C", "Đà Nẵng · 3,5 năm."]],
        labels: ["Nội dung chương trình", "Điều kiện đầu vào", "Thời lượng", "Học phí", "Tuyển sinh 2026", "Nguồn chính thức", "Ghi chú của bạn"]
      }
    };
    const data = sets[mode];
    root.querySelector(".compare-tools h1").textContent = data.title;
    const headerCells = [...table.querySelectorAll(".compare-header-cell")].slice(1);
    headerCells.forEach((cell, index) => { cell.querySelector("h3").textContent = data.heads[index][0]; cell.querySelector("p").textContent = data.heads[index][1]; });
    const cells = [...table.children].slice(4);
    for (let row = 0; row < 7; row += 1) {
      const label = cells[row * 4];
      label.querySelector("strong").textContent = data.labels[row];
      for (let col = 1; col < 4; col += 1) {
        const value = cells[row * 4 + col].querySelector(".compare-value");
        const suffix = mode === "job"
          ? ["Mô tả theo hoạt động nghề.", "Biểu hiện quan sát được.", "Khác nhau theo tổ chức.", "Có nhiều đường học.", "Chỉ số gắn nguồn và kỳ.", "Chưa có dữ liệu tương thích.", "Ghi điểm được và đánh đổi."][row]
          : ["Đối chiếu đề cương chính thức.", "Theo từng phương thức.", col === 3 ? "3,5 năm" : "4 năm", "Cần đúng năm áp dụng.", "Kiểm tra từng đợt.", "Mở website cơ sở đào tạo.", "Ghi câu hỏi cần xác minh."][row];
        value.innerHTML = `<strong>${data.heads[col - 1][0]}</strong>${suffix}${row === 3 || row === 4 ? `<span class="cell-source">${icon("database")} ${row === 3 ? "Dữ liệu còn thiếu" : "Nguồn theo chương trình"}</span>` : ""}`;
      }
    }
  }
  prototypeState.compareMode = mode;
  setCompareState("ready");
  root.querySelectorAll("[data-compare-mode]").forEach((tab) => tab.classList.toggle("active", tab.dataset.compareMode === mode));
  refreshIcons();
  showToast(`Đang xem so sánh ${mode === "major" ? "ngành học" : mode === "job" ? "nghề" : "chương trình"}`);
}

function renderDiscoveryStep() {
  const root = document.querySelector("#screen-discovery-question");
  const showIntro = prototypeState.discoveryState === "intro";
  root.querySelector("[data-discovery-intro]").hidden = !showIntro;
  root.querySelector("[data-discovery-questions]").hidden = showIntro;
  if (showIntro) {
    refreshIcons();
    return;
  }
  const step = prototypeState.discoveryStep;
  const [eyebrow, title, copy, choices] = discoverySteps[step];
  root.querySelector(".progress-head span:first-child").textContent = `Khám phá bản thân · Bước ${step}/4`;
  root.querySelector(".progress-fill").style.width = `${step * 25}%`;
  root.querySelector(".question-panel .eyebrow").textContent = eyebrow;
  root.querySelector(".question-panel h1").textContent = title;
  root.querySelector(".question-panel > p").textContent = copy;
  root.querySelectorAll(".choice-tile").forEach((tile, index) => {
    const [iconName, choiceTitle, note] = choices[index];
    const selected = prototypeState.discoverySelections[step].has(index);
    tile.querySelector(".choice-icon").innerHTML = icon(iconName);
    tile.querySelector("strong").textContent = choiceTitle;
    tile.querySelector("strong + span").textContent = note;
    tile.classList.toggle("selected", selected);
    tile.setAttribute("aria-pressed", String(selected));
    tile.querySelector(".choice-indicator").innerHTML = selected ? icon("check") : "";
  });
  refreshIcons();
}

function handleDiscoveryAction(action) {
  if (action === "start") {
    prototypeState.discoveryState = "questions";
    prototypeState.discoveryStep = 1;
    return renderDiscoveryStep();
  }
  if (action === "restart") {
    prototypeState.discoveryState = "intro";
    prototypeState.discoveryStep = 1;
    Object.values(prototypeState.discoverySelections).forEach((selection) => selection.clear());
    renderDiscoveryStep();
    return showPrototypeScreen("screen-discovery-question");
  }
  if (action === "back") {
    if (prototypeState.discoveryStep === 1) return showPrototypeScreen("screen-home");
    prototypeState.discoveryStep -= 1;
  } else if (prototypeState.discoveryStep === 4) {
    return showPrototypeScreen("screen-discovery-result");
  } else {
    prototypeState.discoveryStep += 1;
  }
  renderDiscoveryStep();
}

function changeSavedCount(delta) {
  prototypeState.savedCount = Math.max(0, prototypeState.savedCount + delta);
  document.querySelectorAll("[data-save-count]").forEach((item) => {
    item.lastChild.textContent = `Đã lưu ${prototypeState.savedCount}`;
  });
}

function updateSavedCount() {
  changeSavedCount(1);
  showToast("Đã lưu trong phiên prototype. Bạn có thể hoàn tác trong Bảng quyết định.");
}

function setUtilityPanel(panelId) {
  const root = document.querySelector("#screen-saved");
  root.querySelectorAll("[data-utility-tab]").forEach((tab) => {
    const active = tab.dataset.utilityTab === panelId;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  root.querySelectorAll("[data-utility-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.utilityPanel !== panelId;
  });
}

function updateChecklistSummary() {
  const root = document.querySelector("#screen-saved");
  const items = [...root.querySelectorAll("[data-checklist-item]")];
  const complete = items.filter((item) => item.classList.contains("checked")).length;
  const summary = root.querySelector("[data-utility-panel='checklist'] .badge");
  if (summary) summary.lastChild.textContent = `${complete}/${items.length} đã kiểm tra`;
}

function cloneScreenForCapture(screenId, title, note) {
  const source = document.querySelector(`#${screenId}`);
  const clone = source.cloneNode(true);
  const slug = `${screenId}-${title}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  clone.id = `capture-${slug}`;
  clone.classList.remove("is-active", "screen-entered");
  clone.classList.add("capture-screen");
  clone.querySelector(".screen-label h2").textContent = title;
  clone.querySelector(".screen-label span").textContent = note;
  clone.querySelectorAll("[id]").forEach((node, index) => { node.id = `${clone.id}-node-${index + 1}`; });
  return clone;
}

function setAgentCaptureState(complete) {
  const root = document.querySelector("#screen-agent .agent-page");
  const panel = document.querySelector("#screen-agent [data-agent-panel='plan']");
  const action = panel.querySelector("[data-agent-action='run']");
  prototypeState.agentState = complete ? "completed" : "awaiting";
  root.dataset.agentState = prototypeState.agentState;
  panel.classList.toggle("is-complete", complete);
  panel.classList.remove("is-running");
  panel.querySelector("h3").textContent = complete
    ? "Các bước đã hoàn thành · kết quả có thể kiểm tra"
    : "Các bước trợ lý sẽ làm — chờ bạn đồng ý";
  action.disabled = complete;
  action.innerHTML = complete ? `${icon("check")} Đã hoàn thành` : `${icon("play")} Đồng ý, bắt đầu`;
  refreshIcons();
}

function setAgentState(state) {
  const root = document.querySelector("#screen-agent .agent-page");
  const panel = root.querySelector("[data-agent-panel='plan']");
  const action = panel.querySelector("[data-agent-action='run']");
  prototypeState.agentState = state;
  root.dataset.agentState = state;
  panel.classList.toggle("is-running", state === "running");
  panel.classList.toggle("is-complete", state === "completed");
  action.disabled = state === "running" || state === "completed";
  panel.querySelector("h3").textContent = state === "completed"
    ? "Các bước đã hoàn thành · kết quả có thể kiểm tra"
    : state === "running"
      ? "Đang thực hiện các bước bạn đã đồng ý"
      : "Các bước trợ lý sẽ làm — chờ bạn đồng ý";
  action.innerHTML = state === "completed" ? `${icon("check")} Đã hoàn thành` : `${icon("play")} Đồng ý, bắt đầu`;
  refreshIcons();
}

function setModelCaptureState(unsupported) {
  setModelState(unsupported ? "unsupported" : "supported");
  setModelCard(true);
}

function setModelState(scope = "supported") {
  const root = document.querySelector("#screen-model .model-page");
  const card = root.querySelector(".forecast-card");
  root.dataset.modelState = scope;
  card.classList.toggle("scope-unsupported", scope === "unsupported");
  card.classList.toggle("scope-unavailable", scope === "unavailable");
  root.querySelectorAll("[data-model-scope]").forEach((item) => {
    const active = item.dataset.modelScope === scope;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
}

function setModelCard(open) {
  const root = document.querySelector("#screen-model .model-page");
  root.dataset.modelCard = open ? "open" : "closed";
}

function buildCapturePack(mobile = false) {
  const captures = [];
  const add = (screenId, title, note = "Trạng thái tĩnh sẵn sàng nhập Figma") => {
    captures.push(cloneScreenForCapture(screenId, title, note));
  };

  add("screen-home", "01 · Home", "Điểm bắt đầu và bối cảnh Việt Nam");

  [["job", "02A · Search — Nghề"], ["major", "02B · Search — Ngành học"], ["program", "02C · Search — Chương trình"]].forEach(([mode, title]) => {
    applySearchMode(mode);
    add("screen-search", title, `Biến thể ${mode}`);
  });

  add("screen-job-detail", "03 · Chi tiết nghề");
  add("screen-major-detail", "04 · Chi tiết ngành học");
  add("screen-program-detail", "05 · Chi tiết chương trình");

  [["major", "06A · Compare — Ngành học"], ["job", "06B · Compare — Nghề"], ["program", "06C · Compare — Chương trình"]].forEach(([mode, title]) => {
    applyCompareMode(mode);
    add("screen-compare", title, `Biến thể ${mode}`);
  });

  prototypeState.discoveryState = "intro";
  renderDiscoveryStep();
  add("screen-discovery-question", "07.0 · Discovery — Mở đầu", "Giải thích phạm vi trước khi bắt đầu");
  prototypeState.discoveryState = "questions";
  for (let step = 1; step <= 4; step += 1) {
    prototypeState.discoveryStep = step;
    renderDiscoveryStep();
    add("screen-discovery-question", `07.${step} · Discovery — Bước ${step}/4`, discoverySteps[step][0]);
  }

  add("screen-discovery-result", "08 · Kết quả khám phá");
  add("screen-about-data", "09 · Về dữ liệu");
  add("screen-saved", "10 · Bảng quyết định đã lưu");

  setAgentCaptureState(false);
  add("screen-agent", "11A · Trợ lý — Chờ bạn đồng ý", "Bạn luôn là người quyết định");
  setAgentCaptureState(true);
  add("screen-agent", "11B · Trợ lý — Hoàn thành", "Kết quả có thể kiểm tra và hoàn tác");

  setModelCaptureState(false);
  add("screen-model", "12A · Dự báo — Có thể xem", "Dự báo được hỗ trợ đến năm 2028");
  setModelCaptureState(true);
  add("screen-model", "12B · Dự báo — Chưa hỗ trợ", "Quay về số liệu gần nhất");

  const board = document.querySelector(".design-board");
  board.innerHTML = `
    <header class="capture-pack-intro">
      <p class="board-kicker">Data For Life · Figma Capture Pack v0.2</p>
      <h1>${mobile ? "Mobile 390" : "Desktop 1440"} · 21 màn hình và trạng thái</h1>
      <p>Các màn tra cứu, so sánh, khám phá, trợ lý và dự báo đã được chuẩn bị ở đúng trạng thái để đưa vào Figma.</p>
      <dl><div><dt>Viewport</dt><dd>${mobile ? "390 px" : "1440 px"}</dd></div><div><dt>Motion</dt><dd>Đã tắt</dd></div><div><dt>Dữ liệu</dt><dd>Minh họa có gắn nhãn</dd></div></dl>
    </header>
    <main class="capture-pack-grid" aria-label="Các màn hình sẵn sàng capture"></main>`;
  const grid = board.querySelector(".capture-pack-grid");
  captures.forEach((capture) => grid.append(capture));

  document.body.classList.add("capture-pack-mode");
  if (mobile) document.body.classList.add("prototype-mode", "capture-pack-mobile");
  document.querySelector(".prototype-toolbar")?.remove();
  document.querySelector(".prototype-toast")?.remove();
  refreshIcons();
  document.title = `Thử Nghề · Capture Pack ${mobile ? "390" : "1440"}`;
  window.scrollTo(0, 0);
}

function initPrototype() {
  document.addEventListener("click", (event) => {
    const sourceTrigger = event.target.closest("[data-source-id]");
    if (sourceTrigger) return openSourceDrawer(sourceTrigger.dataset.sourceId, sourceTrigger);
    const sourceClose = event.target.closest("[data-source-action='close']");
    if (sourceClose) {
      closeSourceDrawer();
      if (!sourceClose.dataset.nav) return;
    }
    if (event.target.closest("[data-source-backdrop]")) return closeSourceDrawer();
    const launch = event.target.closest("[data-prototype-launch]");
    if (launch) return showPrototypeScreen(launch.dataset.prototypeLaunch);
    const exit = event.target.closest(".prototype-exit");
    if (exit) return exitPrototype();
    const step = event.target.closest("[data-prototype-step]");
    if (step) return stepPrototype(step.dataset.prototypeStep === "next" ? 1 : -1);
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      if (nav.dataset.searchPreset) applySearchMode(nav.dataset.searchPreset);
      showPrototypeScreen(nav.dataset.nav);
      if (nav.dataset.searchQuery) {
        document.querySelector("#screen-search .global-search input").value = nav.dataset.searchQuery;
        runSearch();
      }
      if (nav.hasAttribute("data-open-model-card")) setModelCard(true);
      return;
    }
    const searchTab = event.target.closest("[data-search-mode]");
    if (searchTab) return applySearchMode(searchTab.dataset.searchMode);
    const homeSearchMode = event.target.closest("[data-home-search-mode]");
    if (homeSearchMode) {
      prototypeState.homeSearchMode = homeSearchMode.dataset.homeSearchMode;
      document.querySelectorAll("[data-home-search-mode]").forEach((item) => {
        const active = item === homeSearchMode;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      return;
    }
    const detailAnchor = event.target.closest(".anchor-nav a");
    if (detailAnchor) {
      const anchors = [...detailAnchor.parentElement.querySelectorAll("a")];
      const sections = [...detailAnchor.closest(".detail-layout").querySelectorAll(".detail-main > .content-section")];
      anchors.forEach((item) => item.classList.toggle("active", item === detailAnchor));
      sections[Math.min(anchors.indexOf(detailAnchor), sections.length - 1)]?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const majorDetailLink = event.target.closest("#screen-major-detail .text-link");
    if (majorDetailLink) {
      if (majorDetailLink.textContent.includes("8 nghề")) {
        applySearchMode("job");
        showPrototypeScreen("screen-search");
        return;
      }
      return showPrototypeScreen("screen-program-detail");
    }
    const majorDetailButton = event.target.closest("#screen-major-detail button");
    if (majorDetailButton?.textContent.includes("Lọc chương trình")) {
      applySearchMode("program");
      return showPrototypeScreen("screen-search");
    }
    const aboutNav = event.target.closest("[data-about-index]");
    if (aboutNav) {
      const root = document.querySelector("#screen-about-data");
      root.querySelectorAll("[data-about-index]").forEach((item) => item.classList.toggle("active", item === aboutNav));
      root.querySelectorAll(".data-page-body > .content-section")[Number(aboutNav.dataset.aboutIndex)]?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const sourceCatalogCard = event.target.closest("#screen-about-data .source-card");
    if (sourceCatalogCard) {
      const cards = [...sourceCatalogCard.parentElement.querySelectorAll(".source-card")];
      const sourceIds = ["job-postings-index", "program-official", "job-postings-index", "major-content-framework"];
      return openSourceDrawer(sourceIds[cards.indexOf(sourceCatalogCard)], sourceCatalogCard);
    }
    const aboutButton = event.target.closest("#screen-about-data button");
    if (aboutButton?.textContent.includes("Tìm trong danh mục")) {
      document.querySelector("#screen-about-data .source-catalog")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return showToast("Chọn một nguồn trong danh mục để xem định nghĩa, phương pháp và giới hạn.");
    }
    const homeSearch = event.target.closest("[data-home-search-action='submit']");
    if (homeSearch) {
      const query = document.querySelector("#screen-home .hero-search input").value.trim();
      applySearchMode(prototypeState.homeSearchMode);
      document.querySelector("#screen-search .global-search input").value = query || searchVariants[prototypeState.homeSearchMode].query;
      showPrototypeScreen("screen-search");
      return runSearch();
    }
    const searchAction = event.target.closest("[data-search-action]");
    if (searchAction) {
      if (searchAction.dataset.searchAction === "submit") return runSearch();
      if (searchAction.dataset.searchAction === "show-all") {
        document.querySelector("#screen-search .global-search input").value = "";
        document.querySelector("#screen-search .results-head h2").textContent = searchVariants[prototypeState.searchMode].heading;
        return setSearchState("results");
      }
      if (searchAction.dataset.searchAction === "clear-filters") {
        document.querySelectorAll("#screen-search .check-row").forEach((item) => {
          item.classList.remove("checked");
          item.setAttribute("aria-pressed", "false");
          item.querySelector(".check-box").innerHTML = "";
        });
        document.querySelector("#screen-search .filter-chips").innerHTML = "";
        setSearchState("results");
        return showToast("Đã xóa bộ lọc. Từ khóa tìm kiếm được giữ nguyên.");
      }
    }
    const filterRow = event.target.closest("#screen-search .check-row");
    if (filterRow) {
      const selected = !filterRow.classList.contains("checked");
      filterRow.classList.toggle("checked", selected);
      filterRow.setAttribute("aria-pressed", String(selected));
      filterRow.querySelector(".check-box").innerHTML = selected ? icon("check") : "";
      refreshIcons();
      return;
    }
    const filterChip = event.target.closest("[data-filter-chip]");
    if (filterChip) {
      filterChip.remove();
      return showToast("Đã bỏ một bộ lọc khỏi phiên tra cứu.");
    }
    const searchCardAction = event.target.closest("[data-search-card-action]");
    if (searchCardAction?.dataset.searchCardAction === "compare") {
      const card = searchCardAction.closest(".result-card");
      const title = card.querySelector("h3").textContent;
      const variant = searchVariants[prototypeState.searchMode];
      const tray = document.querySelector("#screen-search .compare-tray");
      tray.querySelector(".tray-items strong").textContent = `Đã thêm ${title}`;
      tray.querySelector(".tray-items div span").textContent = variant.tray[1];
      return showToast(`Đã thêm ${variant.entity.toLowerCase()} vào bảng so sánh cùng loại.`);
    }
    const resultCta = event.target.closest("#screen-search .result-card .btn-primary");
    if (resultCta) return showPrototypeScreen(searchVariants[prototypeState.searchMode].target);
    const compareStateAction = event.target.closest("[data-compare-state-action]");
    if (compareStateAction) return setCompareState(compareStateAction.dataset.compareStateAction);
    const compareTab = event.target.closest("[data-compare-mode]");
    if (compareTab) return applyCompareMode(compareTab.dataset.compareMode);
    const choice = event.target.closest(".choice-tile");
    if (choice) {
      const selected = prototypeState.discoverySelections[prototypeState.discoveryStep];
      const index = Number(choice.dataset.choice);
      if (!selected.has(index) && selected.size >= 3) return showToast("Bạn có thể chọn tối đa 3 mục ở bước này.");
      selected.has(index) ? selected.delete(index) : selected.add(index);
      return renderDiscoveryStep();
    }
    const discoveryAction = event.target.closest("[data-discovery-action]");
    if (discoveryAction) return handleDiscoveryAction(discoveryAction.dataset.discoveryAction);
    const utilityTab = event.target.closest("[data-utility-tab]");
    if (utilityTab) return setUtilityPanel(utilityTab.dataset.utilityTab);
    const savedAction = event.target.closest("[data-saved-action]");
    if (savedAction?.dataset.savedAction === "remove") {
      const card = savedAction.closest("[data-saved-item]");
      card.hidden = true;
      changeSavedCount(-1);
      const bar = document.createElement("div");
      bar.className = "restore-bar";
      bar.dataset.restoreFor = card.dataset.savedItem;
      bar.innerHTML = `<span>${icon("bookmark-x")} Đã bỏ lưu <strong>${card.querySelector("h3").textContent}</strong></span><button class="text-link text-button" type="button" data-saved-action="restore" data-restore-item="${card.dataset.savedItem}">Hoàn tác</button>`;
      card.parentElement.append(bar);
      refreshIcons();
      return showToast("Đã bỏ một mục khỏi danh sách. Có thể hoàn tác ngay trong Tiện ích.");
    }
    if (savedAction?.dataset.savedAction === "restore") {
      const id = savedAction.dataset.restoreItem;
      document.querySelector(`#screen-saved [data-saved-item='${id}']`).hidden = false;
      savedAction.closest(".restore-bar").remove();
      changeSavedCount(1);
      return showToast("Đã khôi phục mục vào danh sách đang cân nhắc.");
    }
    const noteAction = event.target.closest("[data-note-action]");
    if (noteAction) {
      const copy = {
        priority: ["Môi trường học phù hợp", "Cần xem quy mô lớp và cách hỗ trợ sinh viên."],
        concern: ["Khả năng thích nghi với môn toán", "Chuyển thành câu hỏi về học phần nền tảng và hỗ trợ học tập."],
        question: ["Kiểm tra lịch tuyển sinh chính thức", "Ghi lại mốc thời gian và nguồn cần theo dõi."]
      }[noteAction.dataset.noteAction];
      const note = document.createElement("article");
      note.className = "note-card note-card-new";
      note.innerHTML = `<strong>${copy[0]}</strong><p>${copy[1]}</p>`;
      noteAction.before(note);
      return showToast("Đã thêm ghi chú vào Bảng quyết định trong phiên prototype.");
    }
    const checklistItem = event.target.closest("[data-checklist-item]");
    if (checklistItem) {
      const checked = !checklistItem.classList.contains("checked");
      checklistItem.classList.toggle("checked", checked);
      checklistItem.setAttribute("aria-pressed", String(checked));
      const marker = checklistItem.firstElementChild;
      marker.outerHTML = checked ? icon("check") : `<span class="check-placeholder"></span>`;
      updateChecklistSummary();
      refreshIcons();
      return;
    }
    const checklistSave = event.target.closest("[data-checklist-save]");
    if (checklistSave) {
      setUtilityPanel("checklist");
      showPrototypeScreen("screen-saved");
      return showToast("Đã lưu checklist chương trình vào Tiện ích trong phiên prototype.");
    }
    const agentAction = event.target.closest("[data-agent-action]");
    if (agentAction?.dataset.agentAction === "run") {
      setAgentState("running");
      window.setTimeout(() => {
        setAgentState("completed");
        showToast("Trợ lý đã tạo bản nháp. Không có lựa chọn nào được chốt thay bạn.");
      }, 1400);
      return;
    }
    if (agentAction?.dataset.agentAction === "undo") {
      setAgentState("awaiting");
      return showToast("Đã hoàn tác bản nháp và quay về các bước chờ bạn đồng ý.");
    }
    if (agentAction?.dataset.agentAction === "edit") {
      document.querySelector("#screen-agent .agent-input textarea")?.focus();
      return showToast("Bạn có thể sửa yêu cầu; trợ lý chưa thực hiện bước nào.");
    }
    if (agentAction?.dataset.agentAction === "log") {
      if (prototypeState.agentState !== "completed") return showToast("Các bước đã làm sẽ xuất hiện sau khi bạn đồng ý và trợ lý hoàn thành bản dùng thử.");
      document.querySelector("#screen-agent .action-log")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (agentAction?.dataset.agentAction === "refusal") {
      setAgentState("refusal");
      return showToast("Trợ lý đã từ chối chọn thay và chuyển sang hỗ trợ xây tiêu chí.");
    }
    if (agentAction?.dataset.agentAction === "reset") {
      setAgentState("awaiting");
      return showToast("Đã quay lại các bước chờ bạn đồng ý.");
    }
    const modelAction = event.target.closest("[data-model-action]");
    if (modelAction) {
      setModelCard(modelAction.dataset.modelAction === "open-card");
      return;
    }
    const modelScope = event.target.closest("[data-model-scope]");
    if (modelScope) {
      const scope = modelScope.dataset.modelScope;
      setModelState(scope);
      showToast(scope === "unsupported"
        ? "Chưa có dự báo đáng tin cậy cho năm 2031. Đang hiển thị số liệu gần nhất."
        : scope === "unavailable"
          ? "Nguồn cần thiết chưa sẵn sàng nên hệ thống không tạo dự báo."
          : "Đang hiển thị dự báo thử nghiệm đến năm 2028.");
      return;
    }
    const save = event.target.closest("[data-action='save']") || [...document.querySelectorAll("button")].find((buttonNode) => buttonNode === event.target.closest("button") && /^Lưu(?! trong)/.test(buttonNode.textContent.trim()));
    if (save) return updateSavedCount();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && closeSourceDrawer()) return;
    if (event.key === "Enter" && event.target.matches("#screen-search .global-search input")) return runSearch();
    if (event.key === "Enter" && event.target.matches("#screen-home .hero-search input")) {
      document.querySelector("[data-home-search-action='submit']").click();
      return;
    }
    if (!document.body.classList.contains("prototype-mode")) return;
    if (event.key === "Escape") exitPrototype();
    if (event.key === "ArrowRight" && event.altKey) stepPrototype(1);
    if (event.key === "ArrowLeft" && event.altKey) stepPrototype(-1);
  });

  renderDiscoveryStep();
  const hashScreen = location.hash.replace("#", "");
  if (prototypeScreens.some(([id]) => id === hashScreen)) showPrototypeScreen(hashScreen);
}

renderBoard();
if (location.hash === "#capture-all") {
  buildCapturePack(false);
} else if (location.hash === "#capture-mobile") {
  buildCapturePack(true);
} else {
  initPrototype();
  if (!location.hash || location.hash === "#demo") showPrototypeScreen("screen-home");
}
