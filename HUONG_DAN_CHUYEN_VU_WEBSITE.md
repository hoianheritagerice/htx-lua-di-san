# HƯỚNG DẪN — TỰ CHỌN VỤ HIỂN THỊ TRÊN WEBSITE (theo từng cánh đồng)

> Cập nhật: 09/11/2026. Đây là tài liệu quy tắc nghiệp vụ/kiểm thử cho nhánh `feature/chuyen-vu-theo-trang-thai-20261109`. **Không coi tài liệu là xác nhận code Apps Script production đã triển khai.**

## 1. Nguồn dữ liệu duy nhất

- Database Notion **VỤ MÙA**: `37c1c9d219fa80bfaa4ce4e651f9b270`.
- Chỉ dùng **Trạng thái vụ** với đúng bốn giá trị: `Kế hoạch`, `Chuẩn bị`, `Đang canh tác`, `Đã thu hoạch`.
- `Ngày gieo sạ` là **ngày HTX đã thống nhất cho vụ/cánh đồng**, được dùng ngay trong trạng thái Chuẩn bị để **đếm ngược ngày xuống giống**. Nếu ngày thay đổi, cập nhật ngay cột này trong Notion. **KHÔNG tạo cột ngày gieo sạ dự kiến**.
- Khi trạng thái `Đang canh tác`, dùng cùng cột đó làm mốc NSS 0. Không coi riêng việc đến ngày gieo sạ là bằng chứng đã gieo: trạng thái do HTX xác nhận.
- Các ngày về lễ Tịch điền, trải nghiệm xuống giống là sự kiện riêng, KHÔNG dùng thay ngày gieo sạ canh tác.
- Mỗi cánh đồng là một chuỗi vụ độc lập: **CKOD** (Ông Đảng), **CTDC** (Đồng Cao), **CTDM** (Đồng Mẫu).

## 2. Chọn vụ mặc định trên website

Với MỖI cánh đồng, đọc tất cả các mùa của riêng cánh đồng, sắp xếp theo **niên vụ** (DX27 mới hơn HT26, HT26 mới hơn DX26). Bỏ qua các vụ có trạng thái `Kế hoạch` khi quyết định **mặc định công khai**. Chọn vụ mới nhất có trạng thái `Chuẩn bị`, `Đang canh tác` hoặc `Đã thu hoạch`.

- **Kế hoạch**: không chuyển website; tiếp tục hiển thị vụ trước gần nhất đã công bố.
- **Chuẩn bị**: chuyển website mặc định sang vụ đó **ngay**, không chờ đến ngày gieo sạ. Hiện mốc chuẩn bị và đếm ngược từ ngày gieo sạ.
- **Đang canh tác**: hiển thị vụ đó, ngày sau sạ, các giai đoạn sinh trưởng, nhật ký/khí tượng đúng mùa.
- **Đã thu hoạch**: TIẾP TỤC hiển thị vụ vừa kết thúc với kết quả/timeline, KHÔNG tự chuyển sang vụ tiếp theo còn ở Kế hoạch.
- Nếu một cánh đồng đã Chuẩn bị DX27 còn cánh đồng khác vẫn Kế hoạch DX27: chỉ cánh đồng thứ nhất chuyển; cánh đồng còn lại giữ HT26.
- Nếu có 2 vụ trùng trạng thái công khai nhưng giai đoạn chồng lấn bất thường: **cảnh báo kiểm tra**, không đoán ngày/ghi sửa dữ liệu.
- Nếu API Notion lỗi, giữ trạng thái **đang tải/không thể xác nhận**, không tự công bố vụ từ ngày máy tính hay từ mã vụ mới nhất.
- Nếu người dùng CHỌN vụ thủ công hoặc URL có `?vu=HT26`, **giữ chính xác vụ được chọn**; chỉ tự chọn khi URL chưa khóa vụ.
- Link `?dong=CTDC&vu=HT26&cua-toi=YEN` và mọi link truy xuất khách hàng cũ phải giữ được dữ liệu lịch sử.

## 3. Hiển thị đúng ngữ nghĩa

- Vụ ở `Chuẩn bị`: ngày gieo sạ là **mốc đã chốt nhưng chưa thực hiện**. Trước ngày đó: “Còn N ngày đến ngày gieo sạ”; đúng ngày: “Lịch gieo sạ hôm nay · chờ xác nhận”; quá ngày nhưng vẫn Chuẩn bị: “Đã qua ngày theo lịch, đang chờ HTX cập nhật”, KHÔNG hiển thị NSS âm/dương như đã trồng.
- Timeline vụ Chuẩn bị hiển thị ngày có sẵn với nhãn lịch/chưa xác nhận; mốc công việc trước vụ lấy từ database MASTERTASK nếu có đường công bố an toàn, **không phát toàn bộ nhật ký nội bộ**.
- Vụ `Đang canh tác` mới cho hiện NSS/tiến độ sinh trưởng; ngày chưa tới phải gắn “Dự kiến”. Ngày đã qua **không mặc nhiên là công việc hoàn thành**, trừ khi có trạng thái xác nhận.
- Vụ `Đã thu hoạch`: dùng trạng thái kết thúc, ưu tiên ngày thu hoạch thực tế khi đủ thông tin, phân biệt nếu chỉ có ngày kế hoạch. Không hiện “đang sinh trưởng” sau thu hoạch.
- Bản đồ ở `Chuẩn bị`: nếu chưa có `Canh tác hữu cơ` ở mã sản phẩm, dùng nhãn/màu **Chưa xác nhận**, không suy ra “Không hữu cơ”. Không tự công bố năng suất.
- Biểu đồ thời tiết: giữ logic trigger hiện tại, **Chuẩn bị không kích hoạt ghi thời tiết hàng ngày**; không dựng biểu đồ sinh trưởng giả khi chưa có dữ liệu thời tiết.
- Cần hiển thị trạng thái cập nhật/cache khi API không lấy được thông tin mới; tránh dùng localStorage HT26 cho DX27.

## 4. Các thành phần có liên quan và giới hạn thay đổi

| Thành phần | Phụ thuộc | Quy tắc thay đổi |
|---|---|---|
| Notion VỤ MÙA | trạng thái, ngày gieo sạ, ngày các mốc | **Không thêm cột; không chỉnh dữ liệu vụ bằng tự động hóa website** |
| Notion Mã sản phẩm | mã thửa, relation vụ, hữu cơ, sản lượng | Chỉ đọc đúng cánh đồng/vụ; thiếu thông tin không suy diễn |
| Apps Script `getCauHinh` | danh sách vụ / vụ mặc định | Trả về vụ mặc định **theo cánh đồng** thay vì `CONFIG.VU.HIEN_TAI` duy nhất; giữ định dạng cũ để tương thích |
| Apps Script `getMapData` | trả dữ liệu vụ và ngày | Trả rõ `trangThaiVu` và ngày theo vụ; không thay các field cũ đang dùng |
| Apps Script `getSeasonTimeline` | biểu đồ thời tiết/nhật ký | Giữ giới hạn quyền riêng tư; phân biệt công việc chưa xảy ra |
| `canh-dong.html` / `js/canh-dong-ui.js` | tab cánh đồng, bản đồ nhúng, timeline | Một cánh đồng → một vụ; không vô tình khóa `vu=HT26` ở URL |
| `ban-do.html` / `js/ban-do.js` | bản đồ độc lập, các deep link | Cùng mặc định vụ và không phá link khách hàng |
| `js/canh-dong-timeline.js` | hiển thị các mốc | Nhãn Chuẩn bị/Đang canh tác/Đã thu hoạch phù hợp |
| `js/bieu-do-thoi-tiet.js` | dữ liệu và NSS thời tiết | Không hiển thị biểu đồ sai vì vụ đang Chuẩn bị |
| Web chon gạo/demo | lời mời sự kiện theo vụ | Nếu đổi danh sách sự kiện, bảo toàn logic quyền lợi theo năm/gói |
| `Code.gs` trigger thời tiết | trạng thái `Đang canh tác` / `Đã thu hoạch` | **Không thay trigger / dữ liệu lịch sử / các bảng ngoài phạm vi** |

## 5. Checklist bắt buộc trước triển khai

- [ ] HT26 Đã thu hoạch + DX27 Kế hoạch → mặc định HT26 (từng cánh đồng).
- [ ] Đồng Cao DX27 Chuẩn bị, hai cánh đồng khác DX27 Kế hoạch → chỉ Đồng Cao hiển thị DX27.
- [ ] DX27 Chuẩn bị có ngày sạ tương lai → đếm ngược đúng theo ngày địa phương Asia/Ho_Chi_Minh.
- [ ] DX27 Chuẩn bị đến/quá ngày sạ → không tự đổi sang Đang canh tác; không tính NSS.
- [ ] DX27 Đang canh tác → NSS và timeline đúng cánh đồng, không lẫn HT26.
- [ ] DX27 Đã thu hoạch + HT27 Kế hoạch → vẫn hiển thị DX27.
- [ ] URL `?vu=HT26` và URL `?cua-toi=YEN&vu=HT26` vẫn hiện đúng HT26.
- [ ] Đổi cánh đồng sau khi tải → mặc định vụ chính xác theo cánh đồng, không lệch bản đồ/timeline/thời tiết.
- [ ] Dữ liệu mã sản phẩm DX27 chưa có nhãn hữu cơ → trung tính “Chưa xác nhận”.
- [ ] API chậm/lỗi/cache → không nhảy sang vụ khác không được xác nhận.
- [ ] Không sửa trạng thái Notion, không thêm cột, không sửa `getLinkAccess`, đăng nhập, kế toán, MASTERTASK, hay trigger thời tiết.

## 6. Vì sao thiết kế như vậy?

Một cột trạng thái đủ để HTX quyết định **thời điểm công bố**; ngày gieo sạ đủ để quản lý cả lịch chuẩn bị và NSS. Không thêm `Ngày công bố` hoặc `Ngày gieo sạ dự kiến` nhằm tránh nhập trùng và lệch số liệu. Việc chọn vụ riêng theo cánh đồng phản ánh đúng lịch canh tác khác nhau. Tách **ngày trên lịch** khỏi **xác nhận công việc đã thực hiện** giúp không phát thông tin sai lên website.

> Quan trọng: việc cập nhật code trên **nhánh thử nghiệm** chưa tác động tới GitHub Pages nhánh `main`. Apps Script còn phải cập nhật deployment đúng dự án rồi kiểm thử đầy đủ mới chuyển web chính.
