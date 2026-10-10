/*
  Phần xử lý của Trạm Slide: đọc danh sách trong slides-data.js rồi vẽ ra trang.
  Bình thường bạn không cần sửa file này. Muốn thêm slide thì sửa slides-data.js.
*/
(function () {
  "use strict";

  var D = window.TRAM_SLIDE || { slides: [] };
  var SLIDES = D.slides.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  var VIEWS = ["home", "send", "about"];
  var state = { q: "", topic: "" };

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Bỏ dấu tiếng Việt để gõ "dao tao" vẫn ra "Đào tạo".
  function fold(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  function fmtDate(iso) {
    var p = String(iso).split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso;
  }

  /* ---------- Thư viện ---------- */
  function renderChips() {
    var topics = [];
    SLIDES.forEach(function (s) { if (topics.indexOf(s.topic) < 0) topics.push(s.topic); });
    var html = ['<button type="button" class="chip" data-topic="" aria-pressed="' + (state.topic === "") + '">Tất cả</button>'];
    topics.forEach(function (t) {
      html.push('<button type="button" class="chip" data-topic="' + esc(t) + '" aria-pressed="' + (state.topic === t) + '">' + esc(t) + "</button>");
    });
    $("chips").innerHTML = html.join("");
  }

  function renderBoard() {
    var q = fold(state.q.trim());
    var list = SLIDES.filter(function (s) {
      if (state.topic && s.topic !== state.topic) return false;
      return !q || fold(s.title + " " + s.topic + " " + s.author).indexOf(q) >= 0;
    });
    $("count").textContent = list.length + " slide" + (list.length !== SLIDES.length ? " khớp, trên tổng " + SLIDES.length : "");
    if (!list.length) {
      $("board").innerHTML = '<p class="board-empty">' + (SLIDES.length
        ? "Không có slide nào khớp. Thử bỏ bớt từ khóa hoặc chọn Tất cả."
        : "Chưa có slide nào. Hãy là người gửi slide đầu tiên.") + "</p>";
      return;
    }
    $("board").innerHTML = list.map(function (s) {
      return '<a class="board-row" role="listitem" href="#slide-' + esc(s.id) + '">' +
        '<span class="board-date">' + esc(fmtDate(s.date)) + '</span>' +
        '<span class="board-main"><span class="board-name">' + esc(s.title) + '</span>' +
        '<span class="board-meta"><span>' + esc(s.author) + " · " + s.pages + ' trang</span>' +
        (s.sample ? '<span class="sample">Mẫu</span>' : "") + '</span></span>' +
        '<span class="tag"><span class="dot"></span>' + esc(s.topic) + '</span></a>';
    }).join("");
  }

  /* ---------- Nút gửi slide ---------- */
  function renderSubmit() {
    var box = $("submit-action");
    if (D.formUrl) {
      box.innerHTML = '<a class="btn primary" href="' + esc(D.formUrl) + '" target="_blank" rel="noopener">Mở biểu mẫu gửi slide</a>' +
        '<p class="hint">Biểu mẫu mở trong tab mới.</p>';
    } else {
      box.innerHTML = '<span class="btn primary" aria-disabled="true">Mở biểu mẫu gửi slide</span>' +
        '<p class="hint">Chưa gắn biểu mẫu. Chủ trang cần dán link Google Form vào trường formUrl trong slides-data.js.</p>';
    }
  }

  /* ---------- Xem một slide ---------- */
  function openSlide(id) {
    var s = SLIDES.filter(function (x) { return x.id === id; })[0];
    if (!s) { location.hash = "#home"; return; }
    $("viewer-title").textContent = s.title;
    $("viewer-meta").textContent = s.author + " · " + s.topic + " · " + fmtDate(s.date) + " · " + s.pages + " trang";
    $("viewer-summary").textContent = s.summary || "";
    $("viewer-download").href = s.file;
    $("viewer-open").href = s.file;
    $("viewer-frame").src = s.file;
    showView("viewer", "home");
  }

  /* ---------- Chuyển trang ---------- */
  function showView(name, navKey) {
    ["home", "send", "about", "viewer"].forEach(function (v) {
      $("view-" + v).hidden = (v !== name);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".top nav a"), function (a) {
      if (a.getAttribute("data-view") === navKey) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (name !== "viewer") $("viewer-frame").removeAttribute("src");
    window.scrollTo(0, 0);
  }

  function route() {
    var h = (location.hash || "").replace("#", "");
    if (h.indexOf("slide-") === 0) { openSlide(h.slice(6)); return; }
    if (VIEWS.indexOf(h) < 0) h = "home";
    showView(h, h);
  }

  /* ---------- Gắn sự kiện ---------- */
  $("q").addEventListener("input", function (e) {
    state.q = e.target.value;
    renderBoard();
  });
  $("chips").addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.topic = btn.getAttribute("data-topic");
    renderChips();
    renderBoard();
  });

  /* ---------- Khởi động ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-owner]"), function (el) { el.textContent = D.owner || "chủ trang"; });
  if (D.contact) { $("contact-text").textContent = D.contact; $("contact-line").hidden = false; }
  renderChips();
  renderBoard();
  renderSubmit();
  window.addEventListener("hashchange", route);
  route();
})();
