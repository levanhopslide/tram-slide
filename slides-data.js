/*
  FILE DỮ LIỆU CỦA SLIDEAZ
  Đây là file bạn sửa nhiều nhất. Mỗi sản phẩm là một khối { ... }.
  Muốn thêm slide: copy một khối, dán thêm vào cuối danh sách (nhớ dấu phẩy giữa các khối), rồi sửa.

  Các trường:
    id        mã ngắn không dấu, không trùng nhau (ví dụ "s7")
    code      mã hiển thị trên trang sản phẩm (ví dụ "SA-007")
    title     tên slide
    author    tên người đăng
    topic     chủ đề (viết giống nhau thì gộp chung một nhóm trong danh mục)
    type      "paid" là slide bán, "free" là slide miễn phí
    price     giá bán, tính bằng đồng (số, ví dụ 49000). Slide miễn phí để 0
    oldPrice  giá gốc để gạch ngang (để 0 nếu không giảm giá)
    slides    số slide trong bộ
    date      ngày đăng, dạng năm-tháng-ngày
    summary   một hai câu mô tả
    thumb     ảnh nhỏ hiện trên thẻ sản phẩm (đặt cùng thư mục với index.html)
    preview   ảnh lớn tổng hợp cả bộ, hiện ở trang chi tiết
    file      file PDF cho slide miễn phí (để tải về và xem). Slide bán để ""
    effects   mô tả hiệu ứng (ví dụ "Morph và hiệu ứng chữ lướt vào")
    demoTiktok / demoYoutube   link video demo (để "" nếu chưa có)
    sample    true nếu là bản mẫu (hiện nhãn "Mẫu"); xóa dòng này với slide thật
*/
window.SLIDEAZ = {
  brand: "SlideAZ",
  owner: "Lê Văn Hợp",

  // Cách khách liên hệ để mua. Dán link của bạn vào, để "" thì nút tương ứng sẽ bị ẩn.
  zalo: "",        // ví dụ "https://zalo.me/0912345678"
  messenger: "",   // ví dụ "https://m.me/ten-trang-cua-ban"
  tiktok: "",      // link kênh TikTok, ví dụ "https://www.tiktok.com/@ten-kenh"
  youtube: "",
  facebook: "",

  // Link Google Form nhận slide từ người khác (xem README). Để "" thì nút "Gửi slide" tạm thời không bấm được.
  formUrl: "",

  contact: "levanhop052@gmail.com",

  slides: [
    {
      id: "s0",
      code: "SA-001",
      title: "Cách mạng tháng Tám 1945 (slide chuyển động Morph)",
      author: "SlideAZ",
      topic: "Lịch sử – Tuyên truyền",
      type: "paid",
      price: 49000,
      oldPrice: 69000,
      slides: 7,
      date: "2026-10-11",
      summary: "Bộ 7 slide về Cách mạng tháng Tám: bối cảnh, Tân Trào, Tổng khởi nghĩa, Tuyên ngôn Độc lập. Nền zoom chậm, mây trôi, chữ lướt vào khi chuyển slide.",
      thumb: "thumb-cmt8.jpg",
      preview: "prev-cmt8.jpg",
      file: "",
      effects: "Morph, nền zoom chậm, chữ lướt vào",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    },
    {
      id: "s1",
      code: "SA-002",
      title: "Đào tạo nguồn nhân lực trong doanh nghiệp",
      author: "Lê Văn Hợp",
      topic: "Quản trị nhân lực",
      type: "free",
      price: 0,
      oldPrice: 0,
      slides: 4,
      date: "2026-10-08",
      summary: "Lý do cần đào tạo, quy trình đào tạo bốn bước và bốn mức đánh giá hiệu quả.",
      thumb: "thumb-dao-tao-nhan-luc.jpg",
      preview: "prev-dao-tao-nhan-luc.jpg",
      file: "dao-tao-nhan-luc.pdf",
      effects: "Không (file PDF)",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    },
    {
      id: "s2",
      code: "SA-003",
      title: "Quy trình tuyển dụng 5 bước",
      author: "Lê Văn Hợp",
      topic: "Quản trị nhân lực",
      type: "free",
      price: 0,
      oldPrice: 0,
      slides: 4,
      date: "2026-10-05",
      summary: "Đi từ xác định nhu cầu đến lúc ứng viên nhận việc.",
      thumb: "thumb-quy-trinh-tuyen-dung.jpg",
      preview: "prev-quy-trinh-tuyen-dung.jpg",
      file: "quy-trinh-tuyen-dung.pdf",
      effects: "Không (file PDF)",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    },
    {
      id: "s3",
      code: "SA-004",
      title: "Kỹ năng thuyết trình hiệu quả",
      author: "Lê Văn Hợp",
      topic: "Kỹ năng mềm",
      type: "free",
      price: 0,
      oldPrice: 0,
      slides: 4,
      date: "2026-09-28",
      summary: "Cách chuẩn bị nội dung, đứng trước lớp và trả lời câu hỏi.",
      thumb: "thumb-ky-nang-thuyet-trinh.jpg",
      preview: "prev-ky-nang-thuyet-trinh.jpg",
      file: "ky-nang-thuyet-trinh.pdf",
      effects: "Không (file PDF)",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    },
    {
      id: "s4",
      code: "SA-005",
      title: "Quản lý thời gian cho sinh viên",
      author: "Bạn học (mẫu)",
      topic: "Kỹ năng mềm",
      type: "free",
      price: 0,
      oldPrice: 0,
      slides: 4,
      date: "2026-10-09",
      summary: "Lập danh sách việc, xếp ưu tiên và giữ nhịp học 25 phút.",
      thumb: "thumb-quan-ly-thoi-gian.jpg",
      preview: "prev-quan-ly-thoi-gian.jpg",
      file: "quan-ly-thoi-gian.pdf",
      effects: "Không (file PDF)",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    },
    {
      id: "s5",
      code: "SA-006",
      title: "Văn hóa tổ chức là gì?",
      author: "Bạn học (mẫu)",
      topic: "Quản trị nhân lực",
      type: "free",
      price: 0,
      oldPrice: 0,
      slides: 4,
      date: "2026-10-02",
      summary: "Khái niệm, ba tầng văn hóa và vai trò đối với nhân viên.",
      thumb: "thumb-van-hoa-to-chuc.jpg",
      preview: "prev-van-hoa-to-chuc.jpg",
      file: "van-hoa-to-chuc.pdf",
      effects: "Không (file PDF)",
      demoTiktok: "",
      demoYoutube: "",
      sample: true
    }
  ]
};
