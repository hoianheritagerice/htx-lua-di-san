# Đồng bộ phân bón Notion → Nhật ký web

Notion và phần hiển thị web đã được cập nhật ngày 07/10/2026. Cần deploy phần Apps Script dưới đây để dữ liệu mới xuất hiện trên Nhật ký.

## Cách deploy trong dự án HTX hiện tại

1. Mở đúng dự án đang phục vụ URL API được khai báo trong `js/chung.js`. Trong Code.gs, tìm duy nhất **định nghĩa hàm**:

   ```js
   function handleGetHistory_(req) {
   ```

   Đổi tên thành:

   ```js
   function handleGetHistoryBase_(req) {
   ```

   Giữ nguyên toàn bộ nội dung hàm và những nơi đang gọi `handleGetHistory_(req)`. Chỉ đổi tên ở dòng định nghĩa; không dùng Replace All.

2. Thêm một file Script tên **PhanBonNhatKy**. Dán toàn bộ nội dung `PhanBonNhatKy.gs` vào file này rồi lưu. File này định nghĩa lại `handleGetHistory_`, gọi hàm gốc để kiểm tra quyền trước, rồi bổ sung phân bón.

3. Chọn **Triển khai → Quản lý các bản triển khai → Chỉnh sửa** bản Web app đang dùng → chọn **Phiên bản mới** → **Triển khai**. Giữ URL `/exec`, quyền truy cập và tài khoản thực thi hiện tại. Không tạo deployment mới vì web đang gọi URL cũ.

4. Mở lại bản đồ, dùng tài khoản hoặc link Nhật ký hợp lệ, kiểm tra:

   | Thửa | Lần bón | Nội dung từ Notion phải có |
   | --- | --- | --- |
   | CKOD-BAY-HT26-DT100 | 29/05/2026 | Phân bò compost: 380 kg |
   | CKOD-BAY-HT26-DT100 | 19/06/2026 | Bánh dầu ủ (đợt 1): 28 kg |
   | CKOD-BAY-HT26-DT100 | 28/07/2026 | Bánh dầu ủ (đợt 2): 37 kg |
   | CTDC-BE1-HT26-VNR20 | 21/06/2026 | Phân bò compost: 160 kg; Bánh dầu ủ (đợt 1): 15 kg |
   | CTDC-BE1-HT26-VNR20 | 29/07/2026 | Bánh dầu ủ (đợt 2): 20 kg |
   | CTDC-LONG-HT26-VNR20 | Chưa có ngày | Hiện mục thiếu ngày; không tự gán ngày bón |

   Task vận chuyển/nhận phân cùng ngày không được mang thêm một bản sao lượng phân. Link/tài khoản không có quyền vẫn bị từ chối bởi hàm gốc.

## Nguồn dữ liệu và cách nhập sau này

- DB Mã sản phẩm giữ ba ngày bón và ba số kg gốc của từng thửa. Nhập/sửa các ô này trong view **Bảng dữ liệu** hoặc trang của thửa.
- DB Vụ mùa có **Cách bón phân**. Vụ HT26 Ông Đảng là **Tách 3 lần**; Đồng Cao và Đồng Mẫu là **Phối trộn 2 lần**.
- Các cột **Bón lần 1–3** tự tổng hợp ngày, loại phân và số kg theo quy tắc vụ. View **Bón phân** và ba view cánh đồng đọc các cột này, ẩn các ô nhập gốc để bảng dễ đọc. Đây là công thức tự tính, không tạo bản sao số kg cần nhập lại.
- Nhật ký web đọc trực tiếp nội dung công thức từ Notion; không chứa quy tắc gán loại phân riêng. Nếu không có task phù hợp, nó hiển thị ngày bón đã ghi dưới tên **Bón phân theo hồ sơ thửa**. Đây là dòng hiển thị, không tạo thêm task trong Notion.
- Số kg chưa có ngày được đặt trong mục **Số kg đã ghi, chưa có ngày bón**, chưa gán vào một ngày hay task nào.
- Ô **Định mức phân bón** khi nhập Nhật ký web là kg/sào, phục vụ định mức task. Số kg thực tế từng thửa vẫn nhập ở Mã sản phẩm. Không tự nhân diện tích để suy ra số kg thực tế.
- Với vụ khác, cần chọn Cách bón phân đúng trước khi dùng công thức. Vụ chưa cấu hình sẽ ghi rõ chưa xác định loại phân và khối lượng, không suy đoán theo HT26.

## Kiểm tra đã chạy trước khi giao

Kiểm tra logic ghép đúng ngày, nhiều loại trong một lần, loại trừ task chuẩn bị/vận chuyển, không lặp số kg, không suy diễn ngày còn thiếu, bảo toàn lỗi/xác thực từ hàm gốc và escape dữ liệu khi hiển thị. Các kiểm tra này dùng dữ liệu và mô phỏng API; kiểm tra trực tiếp API đang chạy chỉ hoàn tất sau khi chủ dự án deploy.

Nếu cần quay lại bản trước: triển khai lại phiên bản Apps Script cũ. Bản web vẫn hỗ trợ trường lượng phân cũ trong giai đoạn chuyển tiếp.
