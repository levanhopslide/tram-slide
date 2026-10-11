/*
  Phần xử lý của SlideAZ: đọc danh sách trong slides-data.js rồi vẽ ra trang.
  Bình thường bạn không cần sửa file này. Muốn thêm slide thì sửa slides-data.js.
*/
(function () {
  "use strict";

  var D = window.SLIDEAZ || { slides: [] };
  var ALL = D.slides.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  var VIEWS = ["home", "shop", "free", "how", "send", "about"];
  var state = { q: "", topic: "", type: "", sort: "new" };
  var BASE_TITLE = "SlideAZ: mẫu slide thuyết trình đẹp, có hiệu ứng chuyển động";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fold(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }
  function money(n) { return Number(n).toLocaleString("vi-VN") + "đ"; }
  function off(s) { return s.oldPrice > s.price && s.price > 0 ? Math.round((1 - s.price / s.oldPrice) * 100) : 0; }
  function byId(id) { return ALL.filter(function (x) { return x.id === id; })[0]; }
  function isFree(s) { return s.type === "free"; }

  function topics() {
    var map = {};
    ALL.forEach(function (s) { map[s.topic] = (map[s.topic] || 0) + 1; });
    return Object.keys(map).map(function (t) { return { name: t, n: map[t] }; });
  }

  /* ---------- Thẻ sản phẩm ---------- */
  function priceHtml(s) {
    if (isFree(s)) return '<span class="free-t">Miễn phí</span>';
    return '<span class="now">' + money(s.price) + "</span>" + (s.oldPrice > s.price ? '<span class="old">' + money(s.oldPrice) + "</span>" : "");
  }
  function card(s) {
    var d = off(s);
    return '<a class="card" href="#p-' + esc(s.id) + '">' +
      '<div class="card-img"><img src="' + esc(s.thumb) + '" alt="" loading="lazy">' +
      (isFree(s) ? '<span class="badge free">Miễn phí</span>' : (d ? '<span class="badge">-' + d + "%</span>" : "")) +
      (s.sample ? '<span class="badge sample">Mẫu</span>' : "") + "</div>" +
      '<div class="card-body"><span class="card-topic">' + esc(s.topic) + "</span>" +
      '<span class="card-title">' + esc(s.title) + "</span>" +
      '<span class="card-meta">' + s.slides + " slide · " + esc(s.author) + "</span>" +
      '<span class="price">' + priceHtml(s) + "</span></div></a>";
  }
  function fillGrid(id, list, emptyMsg) {
    $(id).innerHTML = list.length ? list.map(card).join("") : '<p class="empty">' + esc(emptyMsg) + "</p>";
  }

  /* ---------- Phần chung ---------- */
  function renderSocial() {
    var links = [["TikTok", D.tiktok], ["YouTube", D.youtube], ["Facebook", D.facebook]].filter(function (x) { return x[1]; });
    $("social").innerHTML = links.map(function (x) { return '<a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + x[0] + "</a>"; }).join("");
  }
  function renderMenus() {
    var t = topics();
    $("drop-menu").innerHTML = '<a href="#shop" data-topic="">Tất cả mẫu slide <small>' + ALL.length + "</small></a>" +
      t.map(function (x) { return '<a href="#shop" data-topic="' + esc(x.name) + '">' + esc(x.name) + " <small>" + x.n + "</small></a>"; }).join("");
    $("cats").innerHTML = t.map(function (x) {
      return '<a class="cat" href="#shop" data-topic="' + esc(x.name) + '"><span>' + esc(x.name) + "</span><small>" + x.n + "</small></a>";
    }).join("");
    var contact = D.contact || "";
    $("foot-contact").textContent = contact || "Đang cập nhật";
    if (contact) { $("contact-text").textContent = contact; $("contact-line").hidden = false; }
    Array.prototype.forEach.call(document.querySelectorAll("[data-owner]"), function (el) { el.textContent = D.owner || "chủ trang"; });
  }

  function renderHero() {
    var f = ALL.filter(function (s) { return !isFree(s); })[0] || ALL[0];
    if (!f) { $("hero").hidden = true; return; }
    $("hero").innerHTML =
      '<div class="hero-text"><span class="hero-tag">Slide mới</span>' +
      "<h1>" + esc(f.title) + "</h1><p>" + esc(f.summary) + "</p>" +
      '<div class="hero-actions"><a class="btn gold" href="#p-' + esc(f.id) + '">Xem chi tiết</a>' +
      '<a class="btn line-light" href="#free">Slide miễn phí</a></div></div>' +
      '<div class="hero-img"><img src="' + esc(f.thumb) + '" alt=""></div>';
  }

  /* ---------- Cửa hàng ---------- */
  function filtered() {
    var q = fold(state.q.trim());
    var list = ALL.filter(function (s) {
      if (state.topic && s.topic !== state.topic) return false;
      if (state.type && s.type !== state.type) return false;
      return !q || fold(s.title + " " + s.topic + " " + s.author + " " + s.code).indexOf(q) >= 0;
    });
    if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    return list;
  }
  function sideBtn(label, key, val, n) {
    return '<button type="button" class="side-btn" data-key="' + key + '" data-val="' + esc(val) + '" aria-pressed="' + (state[key] === val) + '"><span>' + esc(label) + "</span><span>" + n + "</span></button>";
  }
  function renderShop() {
    var t = topics();
    $("side-topics").innerHTML = sideBtn("Tất cả", "topic", "", ALL.length) + t.map(function (x) { return sideBtn(x.name, "topic", x.name, x.n); }).join("");
    var paid = ALL.filter(function (s) { return !isFree(s); }).length;
    $("side-type").innerHTML = sideBtn("Tất cả", "type", "", ALL.length) + sideBtn("Slide bán", "type", "paid", paid) + sideBtn("Miễn phí", "type", "free", ALL.length - paid);
    var list = filtered();
    $("count").textContent = list.length + " mẫu slide" + (state.q ? ' cho "' + state.q + '"' : "");
    $("sort").value = state.sort;
    fillGrid("grid-shop", list, ALL.length ? "Không có mẫu nào khớp. Thử bỏ bớt từ khóa hoặc chọn Tất cả." : "Chưa có slide nào.");
  }

  /* ---------- Trang sản phẩm ---------- */
  function contactBtn(url, cls, label) {
    return url ? '<a class="btn ' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + label + "</a>" : "";
  }
  function openProduct(id) {
    var s = byId(id);
    if (!s) { location.hash = "#home"; return; }
    document.title = s.title + " | SlideAZ";
    $("p-crumb").textContent = s.title;
    $("p-title").textContent = s.title;
    $("p-code").textContent = "Mã sản phẩm: " + s.code;
    $("p-img").src = s.preview || s.thumb;
    $("p-img").alt = "Các slide trong bộ " + s.title;
    $("p-summary").textContent = s.summary;
    var d = off(s);
    $("p-price").innerHTML = isFree(s) ? '<span class="free-t">Miễn phí</span>' :
      '<span class="now">' + money(s.price) + "</span>" + (s.oldPrice > s.price ? '<span class="old">' + money(s.oldPrice) + "</span>" : "") + (d ? '<span class="off">-' + d + "%</span>" : "");

    var act = "";
    if (isFree(s)) {
      act += '<a class="btn primary" href="' + esc(s.file) + '" download>Tải về (PDF)</a>' +
             '<a class="btn line" href="' + esc(s.file) + '" target="_blank" rel="noopener">Mở trong tab mới</a>';
    } else {
      act += contactBtn(D.zalo, "zalo", "Mua qua Zalo");
      act += contactBtn(D.messenger, "dark", "Nhắn Messenger");
      if (!D.zalo && !D.messenger) act += '<span class="btn primary" aria-disabled="true">Mua qua Zalo</span><p class="p-note">Chủ trang cần dán link Zalo hoặc Messenger vào slides-data.js để khách bấm mua được.</p>';
    }
    act += contactBtn(s.demoTiktok, "line", "Xem demo TikTok");
    act += contactBtn(s.demoYoutube, "line", "Xem demo YouTube");
    $("p-actions").innerHTML = act;

    var rows = [
      ["Số slide", s.slides + " slide"],
      ["Hiệu ứng", s.effects || "Đang cập nhật"],
      ["Chỉnh sửa", isFree(s) ? "File PDF để xem và tải, không chỉnh sửa" : "Tùy chỉnh nội dung, hình ảnh dễ dàng"],
      ["Định dạng", isFree(s) ? "PDF" : "PowerPoint (.pptx), tỉ lệ 16:9"],
      ["Chủ đề", s.topic],
      ["Người đăng", s.author]
    ];
    $("p-specs").innerHTML = rows.map(function (r) { return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("");

    var viewer = $("p-viewer");
    if (isFree(s) && s.file) { viewer.hidden = false; $("p-frame").src = s.file; }
    else { viewer.hidden = true; $("p-frame").removeAttribute("src"); }

    var rel = ALL.filter(function (x) { return x.id !== s.id; }).sort(function (a, b) { return (b.topic === s.topic) - (a.topic === s.topic); }).slice(0, 4);
    fillGrid("grid-related", rel, "");
    show("product", "shop");
  }

  /* ---------- Gửi slide ---------- */
  function renderSubmit() {
    var box = $("submit-action");
    if (D.formUrl) {
      box.innerHTML = '<a class="btn primary" href="' + esc(D.formUrl) + '" target="_blank" rel="noopener">Mở biểu mẫu gửi slide</a><p class="hint">Biểu mẫu mở trong tab mới.</p>';
    } else {
      box.innerHTML = '<span class="btn primary" aria-disabled="true">Mở biểu mẫu gửi slide</span><p class="hint">Chưa gắn biểu mẫu. Chủ trang cần dán link Google Form vào trường formUrl trong slides-data.js.</p>';
    }
  }

  /* ---------- Chuyển trang ---------- */
  function show(name, navKey) {
    ["home", "shop", "free", "how", "send", "about", "product"].forEach(function (v) { $("view-" + v).hidden = (v !== name); });
    Array.prototype.forEach.call(document.querySelectorAll(".nav a[data-view]"), function (a) {
      if (a.getAttribute("data-view") === navKey) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (name !== "product") { $("p-frame").removeAttribute("src"); document.title = BASE_TITLE; }
    window.scrollTo(0, 0);
  }
  function route() {
    var h = (location.hash || "").replace("#", "");
    if (h.indexOf("p-") === 0) { openProduct(h.slice(2)); return; }
    if (VIEWS.indexOf(h) < 0) h = "home";
    if (h === "shop") renderShop();
    show(h, h);
  }

  /* ---------- Sự kiện ---------- */
  function setTopic(t) { state.topic = t; state.type = ""; state.q = ""; $("q").value = ""; }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-topic]");
    if (a) { setTopic(a.getAttribute("data-topic")); if (location.hash === "#shop") renderShop(); return; }
    var b = e.target.closest(".side-btn");
    if (b) { state[b.getAttribute("data-key")] = b.getAttribute("data-val"); renderShop(); }
  });
  $("sort").addEventListener("change", function (e) { state.sort = e.target.value; renderShop(); });
  $("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    state.q = $("q").value; state.topic = ""; state.type = "";
    if (location.hash === "#shop") { renderShop(); } else { location.hash = "#shop"; }
  });
  $("q").addEventListener("input", function (e) {
    if (location.hash === "#shop") { state.q = e.target.value; renderShop(); }
  });

  /* ---------- Khởi động ---------- */
  renderSocial();
  renderMenus();
  renderHero();
  fillGrid("grid-paid", ALL.filter(function (s) { return !isFree(s); }).slice(0, 8), "Chưa có slide bán. Slide bán sẽ hiện ở đây.");
  fillGrid("grid-free", ALL.filter(isFree).slice(0, 4), "Chưa có slide miễn phí.");
  fillGrid("grid-freeall", ALL.filter(isFree), "Chưa có slide miễn phí.");
  renderSubmit();
  window.addEventListener("hashchange", route);
  route();
})();
