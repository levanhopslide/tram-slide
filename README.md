# Trạm Slide

Trang web tĩnh để đăng và xem slide, dùng chung cho mọi người. Chỉ gồm file HTML, CSS, JavaScript và các file PDF, không cần máy chủ riêng.

## 1. Trong thư mục này có gì

| Đường dẫn | Việc của nó |
|---|---|
| `index.html` | Khung của cả trang: thư viện, mục gửi slide, giới thiệu, khung xem slide |
| `css/style.css` | Màu sắc, cỡ chữ, bố cục |
| `js/slides-data.js` | **Danh sách slide.** Đây là file bạn sửa nhiều nhất |
| `js/app.js` | Đọc danh sách rồi vẽ ra trang, có tìm kiếm và lọc chủ đề |
| `slides/` | Nơi để các file PDF |

## 2. Xem trang trên máy của bạn

1. Giải nén thư mục.
2. Bấm đúp vào `index.html`. Trang mở bằng trình duyệt.
3. Khung xem PDF có thể trống khi mở trực tiếp từ ổ đĩa (một số trình duyệt chặn). Khi đã đưa lên GitHub Pages (mục 4) thì sẽ chạy bình thường.

## 3. Thêm một slide mới

1. Xuất slide thành **PDF** (PowerPoint: *File → Export → PDF*). Đặt tên file không dấu, không khoảng trắng, ví dụ `quan-tri-nhan-luc-chuong-2.pdf`.
2. Bỏ file vào thư mục `slides/`.
3. Mở `js/slides-data.js`, copy một khối `{ ... }`, dán thêm vào danh sách, sửa lại:
   - `id`: mã không trùng với slide nào khác (ví dụ `"s6"`)
   - `title`, `author`, `topic`, `date`, `pages`, `summary`
   - `file`: `"slides/quan-tri-nhan-luc-chuong-2.pdf"`
   - Xóa dòng `sample: true` (dòng này chỉ để hiện nhãn "Mẫu")
4. Lưu file. Mở lại trang, slide mới sẽ xuất hiện ở đầu danh sách. Dấu phẩy giữa các khối rất dễ quên, nếu trang trắng hãy kiểm tra chỗ này đầu tiên.

Slide của bạn và slide của người khác nằm chung một danh sách. Phân biệt bằng trường `author`.

## 4. Đưa trang lên mạng bằng GitHub Pages

1. Tạo tài khoản tại github.com.
2. Bấm **New repository**, đặt tên (ví dụ `tram-slide`), chọn **Public**, bấm **Create repository**.
3. Bấm **uploading an existing file**, kéo toàn bộ nội dung thư mục vào (nhớ giữ nguyên các thư mục `css`, `js`, `slides`), bấm **Commit changes**.
4. Vào **Settings → Pages**. Ở mục *Branch* chọn `main`, thư mục `/ (root)`, bấm **Save**.
5. Chờ khoảng một đến hai phút. GitHub hiện đường link dạng `https://ten-ban.github.io/tram-slide/`.

Mỗi lần thêm slide, bạn tải file mới lên repository và sửa `slides-data.js` (nút bút chì trên GitHub). Trang tự cập nhật sau ít phút.

Nếu thích **Netlify**: vào app.netlify.com, kéo thả cả thư mục vào mục *Deploy manually*, bạn nhận được link ngay.

## 5. Làm biểu mẫu nhận slide từ người khác

Trang tĩnh không tự nhận file được, nên dùng Google Forms làm cửa nhận bài.

1. Vào forms.google.com, tạo biểu mẫu mới.
2. Thêm các câu hỏi: *Tên bạn*, *Tên slide*, *Chủ đề*, và một câu **Tải tệp lên** (chọn loại PDF, giới hạn 20 MB).
3. Thêm một ô tích xác nhận: "Tôi là tác giả hoặc được phép chia sẻ slide này."
4. Bấm **Gửi → biểu tượng liên kết**, copy đường link.
5. Mở `js/slides-data.js`, dán link vào `formUrl: "..."`.
6. File người khác gửi nằm trong Google Drive của bạn. Xem qua, nếu ổn thì làm theo mục 3 để đưa lên thư viện.

## 6. Việc cần nhớ

- Chỉ đăng PDF, mỗi file tối đa khoảng 20 MB.
- Xem qua mọi slide của người khác trước khi đăng: nội dung, hình ảnh, thông tin cá nhân trên trang bìa.
- Slide đã đăng lên repository công khai thì ai cũng tải được, kể cả khi bạn xóa khỏi danh sách. Muốn gỡ hẳn, hãy xóa file PDF khỏi thư mục `slides/`.
