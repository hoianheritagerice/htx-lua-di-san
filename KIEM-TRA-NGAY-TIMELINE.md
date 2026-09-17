# Ngày lễ/trải nghiệm đã chuyển vào Notion

Đã thêm 6 cột Date và điền đủ **48 ô ngày cho 8 vụ hiện có** trong [ORIGINAL DATABASE → VỤ MÙA](https://app.notion.com/37c1c9d219fa80bfaa4ce4e651f9b270). Thực hiện ngày 16/09/2026; hoàn tất gói cập nhật ngày 17/09/2026.

Nguồn ngày: lịch đang hiển thị trên timeline (mã web ở commit `503c087` và ngày nông học của từng vụ trong Notion), được bạn yêu cầu lấy làm ngày chính thức. Đã đọc lại đủ 48 ô sau khi ghi, tất cả khớp. Không đổi các ngày nông học, trạng thái vụ hoặc liên kết sản phẩm.

## Các cột bạn sửa từ nay

| Mốc trên web | Cột trong DB VỤ MÙA |
|---|---|
| Lễ Tịch điền - Xuống đồng | Ngày lễ Tịch điền - Xuống đồng |
| Cùng xuống giống | Ngày trải nghiệm xuống giống |
| Giai đoạn mạ | Ngày giai đoạn mạ |
| Thăm đồng lúa trổ | Ngày trải nghiệm thăm đồng |
| Ngày hội gặt | Ngày hội gặt |
| Lễ cúng Tạ ơn & mừng Lúa mới | Ngày lễ Tạ ơn & mừng Lúa mới |

Mở đúng dòng cánh đồng + vụ để sửa. Nếu chưa thấy cột trong bảng đang xem, mở trang của dòng vụ hoặc bật hiển thị cột trong view đó. Giữ tên cột để Apps Script đọc đúng.

## Bảng ngày đã ghi

| Vụ | Tịch điền | Xuống giống | Mạ | Thăm đồng | Hội gặt | Tạ ơn & Lúa mới |
|---|---|---|---|---|---|---|
| [Cẩm Thanh - Đồng Mẫu - Hè Thu 2026](https://app.notion.com/37c1c9d219fa8015bc1dcb97e08bacf8) | 20/06/2026 | 24/09/2026 | 03/10/2026 | 08/06/2026 | 23/08/2026 | 15/06/2026 |
| [Cẩm Thanh - Đồng Cao -  Hè Thu 2026](https://app.notion.com/3831c9d219fa805ea6aaf88838eb32fa) | 15/06/2026 | 19/09/2026 | 28/09/2026 | 03/06/2026 | 18/08/2026 | 10/06/2026 |
| [Cẩm Kim - Ông Đảng - Hè Thu 2026](https://app.notion.com/37c1c9d219fa80b1b51cc61b744e5fbf) | 07/06/2026 | 10/09/2026 | 19/09/2026 | 26/05/2026 | 10/08/2026 | 02/06/2026 |
| [Cẩm Kim - Ông Đảng - Đông Xuân 2026](https://app.notion.com/3c31c9d219fa812fb26fc7033da9b1d9) | 02/01/2026 | 16/04/2026 | 25/04/2026 | 21/12/2025 | 20/03/2026 | 28/12/2025 |
| [Cẩm Kim - Ông Đảng - Hè Thu 2025](https://app.notion.com/3c31c9d219fa81d185fcf17958bf0cc7) | 07/06/2025 | 11/09/2025 | 20/09/2025 | 26/05/2025 | 10/08/2025 | 02/06/2025 |
| [Cẩm Kim - Ông Đảng - Đông Xuân 2025](https://app.notion.com/3c31c9d219fa817dabb9d6dff7aa93f4) | 08/01/2025 | 06/05/2025 | 15/05/2025 | 27/12/2024 | 05/04/2025 | 03/01/2025 |
| [Cẩm Kim - Ông Đảng - Hè Thu 2024](https://app.notion.com/3c41c9d219fa8113939cda2fba1e6f2b) | 07/06/2024 | 11/09/2024 | 20/09/2024 | 26/05/2024 | 10/08/2024 | 02/06/2024 |
| [Cẩm Kim - Ông Đảng - Đông Xuân 2024](https://app.notion.com/3c61c9d219fa81a1bc13f46a78d22572) | 08/01/2024 | 16/04/2024 | 25/04/2024 | 27/12/2023 | 21/03/2024 | 03/01/2024 |

## Cách web hoạt động sau bản cập nhật

- Cả 13 mốc lấy ngày từ đúng trang VỤ MÙA. Sáu mốc trên đọc cột mới, không cộng/trừ ngày gieo sạ hoặc thu hoạch nữa.
- Các ngày bổ sung đã chốt không mang nhãn Dự kiến.
- Thay đổi một ngày trong Notion chỉ thay đổi mốc tương ứng; các ngày sự kiện khác giữ nguyên.
- Nếu bạn xóa một ngày, web hiện Chưa có ngày. Không tự tạo ngày thay thế.
- `suKienTheoVu` trong `js/canh-dong-config.js` chỉ dùng để chọn ảnh riêng; các khóa ngày/trạng thái của cấu hình cũ không ghi đè dữ liệu Notion.
- Quyền lợi theo gói và thư viện ảnh giữ nguyên.
- Mốc thu hoạch vẫn dùng cột **Ngày thu hoạch dự kiến** và **Trạng thái vụ**: Đã thu hoạch thì bỏ nhãn Dự kiến; Đang canh tác thì giữ. Thay đổi lần này không tự đánh dấu một vụ đã thu hoạch.

## Phần nào đã có hiệu lực?

**Notion đã được cập nhật trực tiếp.** Mã frontend và phần bổ sung Apps Script đã làm xong, kiểm thử và đóng gói, nhưng chưa triển khai vào Apps Script/GitHub.

Đọc **apps-script/HUONG-DAN-CAP-NHAT.md**, cập nhật Apps Script trước rồi thay các file web. Backend dùng lại dữ liệu trang vụ đã tải, không thêm lượt gọi Notion riêng cho sáu ngày.

Các hướng dẫn cũ yêu cầu nhập ngày lễ trong file cấu hình GitHub được thay bằng cách nhập trực tiếp trong Notion ở trên.
