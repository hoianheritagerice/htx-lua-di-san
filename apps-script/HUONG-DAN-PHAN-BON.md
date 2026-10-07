# Phân bón linh hoạt: Notion → Nhật ký web

Cập nhật 07/10/2026: tối đa **3 lần bón/vụ/thửa**, mỗi lần dùng **compost, bánh dầu hoặc cả hai**. Loại và lượng lấy trực tiếp từ từng lần; không còn chọn mẫu Tách 3 lần/Phối trộn 2 lần ở Vụ mùa.

## Nhập liệu tại Notion

Trong DB Mã sản phẩm, mở **Nhập phân bón**, chọn đúng mã thửa và Vụ mùa:

| Lần | Ngày thực tế | Compost (kg/thửa) | Bánh dầu (kg/thửa) |
| --- | --- | --- | --- |
| 1 | Ngày bón phân lần 1 | Compost lần 1 (kg) | Bánh dầu lần 1 (kg) |
| 2 | Ngày bón phân lần 2 | Compost lần 2 (kg) | Bánh dầu lần 2 (kg) |
| 3 | Ngày bón phân lần 3 | Compost lần 3 (kg) | Bánh dầu lần 3 (kg) |

- Số dương: lượng thực tế đã bón. **0: xác nhận không dùng loại đó. Trống: chưa biết/chưa ghi.**
- Lần chưa dùng để trống toàn bộ ngày và hai lượng. Lần đã bón phải có ít nhất một lượng dương.
- Nhập kg riêng của thửa, không nhập kg/sào, số bao hoặc tổng cánh đồng. Không sao chép kg vào task.
- **Bón phân** hiển thị công thức Bón lần 1–3 và cảnh báo Kiểm tra bón phân. Tổng compost/bánh dầu tự cộng ba lần; còn thiếu dữ liệu thì chưa chốt tổng.
- Mùa mới tạo hồ sơ mới, giữ mùa cũ. Đổi một/hai loại trong ba lần không cần sửa code.
- Hướng dẫn đầy đủ: https://app.notion.com/p/3f21c9d219fa819b9395edb11cd3e41b

## Hợp đồng dữ liệu với API/web

Apps Script đọc đúng ba cột **Bón lần 1–3** (formula string) và ba cột **Ngày bón phân lần 1–3**. Dòng đầu công thức là ngày/thông báo thiếu ngày; những dòng sau chứa loại + kg hoặc cảnh báo thiếu lượng.

Web hiển thị nội dung API trả về; không tự quyết định loại phân theo cánh đồng/vụ và không tính kg từ định mức. Một lần có hai loại sẽ hiện cả hai trong cùng lần. Ngày của thửa không bị thay bằng ngày task chung. Lượng chỉ gắn một lần cho task bón phù hợp, không lặp vào task nhận/vận chuyển. Nếu thiếu task phù hợp, API thêm dòng hiển thị Bón phân theo hồ sơ thửa; không tạo task mới trong Notion. Thiếu ngày được tách riêng.

## Apps Script cần deploy

Dùng file hoàn chỉnh **Code-phan-bon-20261007.gs** đã giao trong cuộc trao đổi, được ghép trên phiên bản Code.gs mới nhất chủ dự án cung cấp (3506 dòng nguồn, có cấp/thu hồi link và kiểm tra quyền).

1. Thay nội dung Code.gs bằng file hoàn chỉnh đã giao. **Không đổi tên handleGetHistory_**.
2. Nếu từng thêm file PhanBonNhatKy.gs theo hướng dẫn mô-đun trước, gỡ file đó để tránh trùng hàm. File mô-đun trong repo không cần dùng cùng bản Code.gs hoàn chỉnh.
3. Triển khai phiên bản mới trên Web app hiện có; giữ URL /exec, quyền truy cập và tài khoản thực thi.
4. Mở Nhật ký bằng tài khoản/link hợp lệ, đối chiếu cùng mã sản phẩm với Notion. Kiểm tra cả một loại, hai loại, thiếu lượng/ngày và quyền chỉ xem đúng thửa.

File Apps Script đã giao đọc công thức tổng hợp nên **không cần sửa lại chỉ vì đổi sang lượng theo từng lần**. Không đăng thông tin bí mật của Code.gs vào repo công khai. Thêm loại phân khác cần cập nhật công thức/tổng lượng/chi phí; thêm lần thứ 4 cần cập nhật cả API và kiểm tra web.

## Chi phí và dữ liệu đã chuyển

Chi phí vật tư phân bón chọn **Loại phân + Lần bón + Mã thửa**; Số lượng tự lấy kg đúng loại/lần từ các thửa liên kết, chia 20 nếu đơn vị bao 20kg. Giá và thanh toán giữ theo khoản chi, không nhập kg lần nữa.

Đã đối chiếu 167 hồ sơ: giữ nguyên ngày của hồ sơ thực và tổng lượng đã ghi (compost 14.360 kg; bánh dầu 2.812,5 kg). Các số bánh dầu cũ chuyển vào lần 2/3 ở HT26 Ông Đảng, lần 1/2 ở HT26 Đồng Cao/Đồng Mẫu theo cách bón đã đối chiếu. Không tự bổ sung compost hay ghi 0 thay ô chưa có hồ sơ xác nhận. Nguồn lượng của 6 khoản chi hiện có giữ nguyên, không đổi đơn giá hoặc thanh toán.

Kiểm tra mô phỏng API/giao diện bao gồm 39 tổ hợp một/hai loại trong 1–3 lần, chống lặp và kiểm tra quyền. **Đối chiếu API đang chạy chỉ hoàn tất sau khi chủ dự án deploy**.
