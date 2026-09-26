# Lưu form “Tôi quan tâm chương trình này” vào Google Sheets

## Đã kiểm tra trên website

- Nút mở form có các trường **Họ tên**, **Số điện thoại**, **Thông tin thêm**.
- Khi bấm **Gửi thông tin**, `js/form-quan-tam.js` gửi JSON tới URL Apps Script trong `js/chung.js` với `action: "dangKyTuVan"`, kèm **gói quan tâm** và **trang gửi**.
- Bản mã backend lưu trong `HUONG-DAN.txt` chưa có nhánh `dangKyTuVan` trong `doPost`. Không thể đọc mã của bản Apps Script hiện đang triển khai chỉ từ repo. Nếu bản đó cũng chưa có nhánh này, form báo gửi thất bại và hiện số Zalo; **không có dòng Google Sheets nào được lưu**.
- Mã frontend hiện tại chỉ hiện lời cảm ơn khi Apps Script trả `{ "ok": true }`. Không cần đổi URL website nếu bổ sung đúng vào **dự án Apps Script đang dùng** và cập nhật **deployment hiện có**.

## Bước 1 — Thêm tệp xử lý

1. Mở **dự án Apps Script đang phục vụ URL `/exec`** trong `js/chung.js`. Đăng nhập bằng tài khoản Google sở hữu dự án này.
2. Chọn **+ → Script**, tạo tệp tên `form-quan-tam` và dán toàn bộ nội dung [form-quan-tam.gs](form-quan-tam.gs).
3. Trong hàm `doPost(e)` **đang có**, tìm `switch (req.action)` và thêm một nhánh trước `default`:

   ```javascript
   case 'dangKyTuVan': return jsonOut_(handleDangKyTuVan_(req));
   ```

   Nếu cấu trúc `doPost` thực tế khác bản `HUONG-DAN.txt`, cần gắn `handleDangKyTuVan_(req)` vào đường đi của request tương ứng và trả JSON. **Không tạo hàm `doPost` thứ hai**, vì sẽ đè đường đăng nhập, bản đồ và nhật ký.

## Bước 2 — Tạo bảng trong tài khoản của HTX

Trong trình soạn thảo Apps Script, chọn hàm `khoiTaoBangTuVan` rồi bấm **Run**. Google sẽ yêu cầu tài khoản sở hữu dự án cấp quyền tạo/chỉnh sửa Sheets. Mở **Execution log** để lấy URL bảng `HTX Lúa Di Sản - Đăng ký tư vấn`.

Hàm này chỉ tạo **một bảng**. Chạy lại sẽ mở bảng cũ, không tạo bảng mới. Đừng chia sẻ bảng công khai vì bảng chứa tên và số điện thoại. Mỗi người điền form sẽ tạo một dòng:

| Thời gian | Họ và tên | Số điện thoại | Chương trình quan tâm | Thông tin thêm | Trang gửi | Trạng thái | Ghi chú nội bộ |
|---|---|---|---|---|---|---|---|
| Tự ghi | Từ form | Giữ số 0 đầu | Từ nút khách bấm | Từ form | Tự ghi | Mới | HTX điền sau |

## Bước 3 — Cập nhật đúng deployment

Vào **Deploy → Manage deployments → Edit** của web app đang dùng, chọn **New version** và **Deploy**. Giữ URL `/exec` cũ; web không cần sửa. Quyền truy cập web app phải cho phép khách chưa đăng nhập gửi form, còn chế độ thực thi là **Execute as me** để ghi vào bảng riêng của HTX.

## Bước 4 — Kiểm tra trên web thật

1. Mở trang Sản phẩm, bấm **Tôi quan tâm chương trình này** và nhập một dòng thử bằng thông tin bạn tự quản lý; thêm chữ “KIỂM TRA” ở *Thông tin thêm*.
2. Form chỉ được báo **Đã nhận được thông tin** khi backend trả `ok: true`. Mở bảng vừa tạo và xác nhận dòng mới có đúng tên, số, chương trình và giờ.
3. Xóa dòng thử nếu muốn. Nếu không có dòng, kiểm tra **Apps Script → Executions** và bảo đảm đã cập nhật đúng deployment đang phục vụ URL trong `js/chung.js`.

**Lưu ý:** Chỉ gộp tệp hướng dẫn này vào GitHub chưa làm form bắt đầu lưu dữ liệu. Bước 1–3 phải hoàn tất trên chính dự án Apps Script của HTX.

Tài liệu Google: [Web apps](https://developers.google.com/apps-script/guides/web), [chỉnh sửa deployment](https://developers.google.com/apps-script/concepts/deployments), [SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app).
