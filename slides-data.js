/*
  FILE DỮ LIỆU CỦA TRẠM SLIDE
  Muốn thêm một slide: copy một khối { ... } bên dưới, dán thêm vào danh sách, sửa nội dung.

  Giải thích từng trường:
    id       mã ngắn, viết thường, không dấu, không khoảng trắng, không trùng nhau (ví dụ "s6")
    title    tên slide hiển thị trên trang
    author   tên người đăng
    topic    chủ đề, dùng để lọc (viết giống nhau thì sẽ gộp chung một nhóm)
    date     ngày đăng, dạng năm-tháng-ngày
    pages    số trang của file PDF
    file     đường dẫn tới file PDF trong thư mục slides/
    summary  một hai câu mô tả nội dung
    sample   true nếu là slide mẫu (hiện nhãn "Mẫu"); xóa dòng này với slide thật
*/
window.TRAM_SLIDE = {
  owner: "Lê Văn Hợp",

  // Dán đường link Google Form của bạn vào đây (xem README, mục "Làm biểu mẫu nhận slide").
  // Để trống thì nút "Gửi slide" sẽ tạm thời không bấm được.
  formUrl: "",

  // Cách để người xem liên hệ với bạn (email, trang Facebook...). Để trống thì phần này bị ẩn.
  contact: "levanhop052@gmail.com",

  slides: [
    {
      id: "s1",
      title: "Đào tạo nguồn nhân lực trong doanh nghiệp",
      author: "Lê Văn Hợp",
      topic: "Quản trị nhân lực",
      date: "2026-10-08",
      pages: 4,
      file: "slides/dao-tao-nhan-luc.pdf",
      summary: "Lý do cần đào tạo, quy trình đào tạo bốn bước và bốn mức đánh giá hiệu quả.",
      sample: true
    },
    {
      id: "s2",
      title: "Quy trình tuyển dụng 5 bước",
      author: "Lê Văn Hợp",
      topic: "Quản trị nhân lực",
      date: "2026-10-05",
      pages: 4,
      file: "slides/quy-trinh-tuyen-dung.pdf",
      summary: "Đi từ xác định nhu cầu đến lúc ứng viên nhận việc.",
      sample: true
    },
    {
      id: "s3",
      title: "Kỹ năng thuyết trình hiệu quả",
      author: "Lê Văn Hợp",
      topic: "Kỹ năng mềm",
      date: "2026-09-28",
      pages: 4,
      file: "slides/ky-nang-thuyet-trinh.pdf",
      summary: "Cách chuẩn bị nội dung, đứng trước lớp và trả lời câu hỏi.",
      sample: true
    },
    {
      id: "s4",
      title: "Quản lý thời gian cho sinh viên",
      author: "Bạn học (mẫu)",
      topic: "Kỹ năng mềm",
      date: "2026-10-09",
      pages: 4,
      file: "slides/quan-ly-thoi-gian.pdf",
      summary: "Lập danh sách việc, xếp ưu tiên và giữ nhịp học 25 phút.",
      sample: true
    },
    {
      id: "s5",
      title: "Văn hóa tổ chức là gì?",
      author: "Bạn học (mẫu)",
      topic: "Quản trị nhân lực",
      date: "2026-10-02",
      pages: 4,
      file: "slides/van-hoa-to-chuc.pdf",
      summary: "Khái niệm, ba tầng văn hóa và vai trò đối với nhân viên.",
      sample: true
    }
  ]
};
