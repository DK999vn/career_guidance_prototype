/* Compact facts for the existing three demo results in each search category. */
(function () {
  const searchFacts = {
    job: [
      [
        ["Ngành liên quan", "6 ngành", "number"],
        ["Thu nhập", "Chưa có số liệu", "missing"],
        ["Tin tuyển dụng", "Có số liệu mẫu", "text"]
      ],
      [
        ["Ngành liên quan", "5 ngành", "number"],
        ["Thu nhập", "Chưa có số liệu", "missing"],
        ["Dự báo", "Chưa có dự báo", "missing"]
      ],
      [
        ["Ngành liên quan", "7 ngành", "number"],
        ["Thu nhập", "Chưa có số liệu", "missing"],
        ["Tin tuyển dụng", "Có số liệu mẫu", "text"]
      ]
    ],
    major: [
      [
        ["Chương trình", "12 chương trình", "number"],
        ["Thông tin hiện có", "Nội dung khái quát", "text"]
      ],
      [
        ["Chương trình", "18 chương trình", "number"],
        ["Thông tin hiện có", "Liên kết chương trình", "text"]
      ],
      [
        ["Chương trình", "7 chương trình", "number"],
        ["Thông tin hiện có", "Đang kiểm tra", "missing"]
      ]
    ],
    program: [
      [
        ["Nơi học", "Hà Nội", "text"],
        ["Thời lượng", "4 năm", "number"],
        ["Học phí", "Chưa có số liệu", "missing"]
      ],
      [
        ["Nơi học", "TP. Hồ Chí Minh", "text"],
        ["Thời lượng", "4 năm", "number"],
        ["Học phí", "Chưa có số liệu", "missing"]
      ],
      [
        ["Nơi học", "Đà Nẵng", "text"],
        ["Thời lượng", "3,5 năm", "number"],
        ["Học phí", "Chưa có số liệu", "missing"]
      ]
    ]
  };

  window.renderSearchFacts = function renderSearchFacts(mode, index) {
    const facts = searchFacts[mode]?.[index];
    if (!facts) return "";

    return `<dl class="search-facts-list search-facts-list--${facts.length}">${facts.map(([label, value, state]) =>
      `<div class="search-fact search-fact--${state}"><dt>${label}</dt><dd>${value}</dd></div>`
    ).join("")}</dl><span class="search-facts-demo">Dữ liệu minh họa</span>`;
  };
})();
