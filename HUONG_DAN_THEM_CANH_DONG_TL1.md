# HƯỚNG DẪN THÊM CÁNH ĐỒNG TRƯỜNG LỆ 1 (TL1)

Ngày kiểm tra: **10/11/2026**. Ghi lại quyết định vận hành, dữ liệu nguồn, các nơi phải đồng bộ và checklist thử nghiệm trước khi merge.

## 1. Nguồn và số liệu chốt

- Nguồn hình học: tệp HTX cung cấp **Trường Lệ 1.dxf**, đối tượng **REGION** tại **Layout1 / Paper Space**. Vẽ thành 13 vùng ruộng đóng, độc lập. Tọa độ trong bản CAD là **tọa độ bản vẽ**, **không phải GPS/WGS84**.
- **13 thửa trồng lúa**, một người canh tác **Anh Trung**. Mã cánh đồng **TL1**.
- Nhóm A: A1=2.230, A2=2.400, A3=3.750 (**8.380 m²**).
- Nhóm B: B1=2.450, B2=1.300, B3=1.800 (**5.550 m²**).
- Nhóm C: C1=1.550, C2=3.650, C3=1.600, C4=1.850 (**8.650 m²**).
- Nhóm D: D1=2.050, D2=1.900, D3=1.900 (**5.850 m²**).
- **Tổng 28.430 m²** là tổng diện tích **ghi trong bản CAD**; không suy ra diện tích đất pháp lý từ kích thước hình SVG.
- **Không tạo bản ghi canh tác cho AO SEN (1.300 m², 3.700 m²), khu nuôi vịt hay kênh/đường trong Notion**. Trong bản đồ số, ao có thể là hình nền phân biệt, không nhấn chọn, không có mã ruộng, không tính tổng.
- Các đa giác ruộng từ DXF có kiểm tra hợp lệ/không chồng lấn lên nhau hoặc khu ao. Đường cong/đối tượng ACIS không phải nguồn đo tọa độ pháp lý; nếu cần độ chính xác đo đạc, xuất thêm closed LWPOLYLINE trong hệ tọa độ quy chuẩn.

## 2. Notion — cấu trúc hiện có, không tạo database mới

**ORIGINAL DATABASE / NÔNG DÂN**:

1. `Thông tin Nông Dân`: một hồ sơ `Anh Trung` tại `Trường Lệ 1 - Cẩm Châu`, liên kết 13 thửa.
2. `Thông tin Thửa Đất`: mã `TL1-A1` ... `TL1-D3`, diện tích từ nhãn DXF, đều liên kết **một** Anh Trung.
3. `Thông tin Mã sản phẩm`: 13 mã `TL1-A1-DX27` ... `TL1-D3-DX27`; relation Mã Thửa đất và Vụ mùa đúng từng lô. **Không gắn hậu tố giống** hay chọn `Mã vụ-giống` khi chưa xác nhận giống của từng khu.
4. `VỤ MÙA`: `Trường Lệ 1 - Đông Xuân 2027`, trạng thái `Kế hoạch`. Ngày gieo sạ chưa có nên để trống, không tạo ngày dự kiến phụ.
5. `THỜI TIẾT NGÀY`: cột select `Cánh đồng` đã thêm option `TL1`. Chỉ ghi ngày khi trạng thái vụ là `Đang canh tác`, bắt đầu từ 7 ngày trước `Ngày gieo sạ`; dừng khi `Đã thu hoạch`. **Không chạy backfill tự phát khi đang Kế hoạch/Chuẩn bị**.

Có view riêng cho TL1 ở cả năm database trên. Các lựa chọn cũ CKOD, CTDC, CTDM và dữ liệu cũ giữ nguyên.

## 3. Điểm thời tiết (GPS duy nhất cấp cánh đồng)

- **Latitude** `15.894578`.
- **Longitude** `108.338016`.
- Nhãn: `Trường Lệ 1 — Cẩm Châu`.
- Đây là tọa độ **đại diện cấp cánh đồng để gọi Open-Meteo**, không tự ghi vào cột `Tọa độ GRPS Thửa` của 13 thửa: như vậy sẽ làm khách hiểu sai tọa độ tâm từng thửa.
- Apps Script bổ sung `CONFIG.FIELDS_GEO.TL1`, nhận diện tên vụ `TRUONG LE 1`, mã `TL1` trong cấp link/khách đồng hành, và tên hộ `CONFIG.TEN_HO.TL1`.
- **Nguồn backend chuẩn** là `HTX_Code_gs_CHUYEN_VU_TU_FILE_MOI_20261109.gs` do người dùng đã triển khai kỳ trước; bản thêm TL1 là **`HTX_Code_gs_TL1_THOI_TIET_20261110.gs`** kèm `HTX_Code_gs_TL1_THOI_TIET_20261110.diff` được xuất trong cuộc hội thoại, **không ghi đè các hàm khác**.
- Trong Apps Script, sau khi thay code phải **Deploy > Manage deployments > Edit > New version > Deploy** và giữ nguyên URL /exec. Không tạo trigger mới; `keoThoiTietHangNgay` là trigger cũ.
- Sau khi thay mã, chạy `kiemTraCauHinhThoiTietTheoVu()` để chỉ **đọc kiểm tra** log; không chạy tay `keoThoiTietLichSu()` hoặc backfill TL1 nếu chưa ở giai đoạn cần ghi.

## 4. Các file website đã liên quan trên nhánh TL1

- `js/tl1-ban-do.js`: dữ liệu hình học và AO SEN dạng nền; 13 plots và diện tích.
- `js/ban-do.js`: thêm `ALL_FIELDS.TL1`, ánh xạ `MA_NONG_DAN.TL1` theo nhãn `ANH TRUNG A1`... và trạng thái `Chưa xác nhận` nếu chưa có `Canh tác hữu cơ`.
- `ban-do.html`: chọn TL1; nạp `js/tl1-ban-do.js` **trước** `js/ban-do.js`, đổi version chống cache.
- `js/canh-dong-config.js`, `js/noi-dung.js`, `js/canh-dong-so-chot.js`: tên/slug, mô tả có chứng cứ, 13 thửa, 1 hộ, 28.430 m²; không dựng thông tin ảnh chưa có, không khẳng định hữu cơ/giống khi chưa xác nhận.
- `canh-dong.html`: tab TL1, map iframe, timeline và thời tiết cùng cánh đồng/vụ.
- `index.html`, `ve-chung-toi.html`, `chi-tiet.html`: thêm lối vào TL1 và cập nhật chống cache trang chi tiết.
- `img/truong-le-1-ban-do.svg`: hình minh họa từ biên vùng DXF; không phải ảnh chụp thực địa.
- **Không thay** các API quyền riêng tư, không cấp link khách TL1 tự động, không thay nhật ký cũ hay dữ liệu đã thu hoạch.

## 5. Logic chọn vụ

- TL1 chưa có vụ cũ: **chỉ riêng TL1** có thể hiện DX27 đang ở `Kế hoạch` làm mặc định, để xem bản đồ từ lúc chuẩn bị hồ sơ; nhãn hiển thị vẫn là **Kế hoạch**, không tính NSS hoặc có thể viết nhật ký mưa khi chưa canh tác.
- TL1 chuyển `Chuẩn bị`: vẫn DX27, ngày gieo sạ duy nhất trong Notion là lịch đếm ngược. `Đang canh tác`: mới tính NSS và tự ghi thời tiết theo trigger. `Đã thu hoạch`: giữ vụ vừa xong cho tới khi vụ sau chuyển sang Chuẩn bị.
- Với ba cánh đồng đã hoạt động: vẫn giữ quy tắc cũ **Kế hoạch của vụ mới không tự thay vụ vừa công bố**.
- `?dong=TL1&vu=DX27` khóa đúng vụ DX27; `?dong=TL1` chọn vụ tự động; deep link khách HT26 ở các cánh đồng cũ giữ nguyên.

## 6. Kiểm thử trước khi merge main

- [x] Notion: 1 người + 13 thửa + 13 sản phẩm + 1 vụ; 13/13 relation; tổng 28.430 m²; không có bản ghi ao.
- [x] Các view riêng TL1 trên 5 database.
- [x] Hình học: 13 polygons đóng, hợp lệ, không giao chồng diện tích đáng kể; hai AO SEN là nền.
- [x] File backend mới qua kiểm tra cú pháp (không có quyền test Apps Script trực tiếp).
- [ ] Apps Script URL /exec sau redeploy phải trả `getCauHinh().vu.THEO_DONG.TL1 = "DX27"`, `TRANG_THAI_THEO_DONG.TL1.DX27 = "Kế hoạch"`.
- [ ] `getMapData(field=TL1, season=DX27)` trả về 13 lô + đúng Vụ Mùa, chưa có trạng thái hữu cơ nếu chưa cập nhật.
- [ ] `getSeasonTimeline(TL1, DX27)` trả dữ liệu đúng vụ, thời tiết rỗng trong giai đoạn Kế hoạch, không báo hỏng/ghi thêm.
- [ ] Kiểm tra đổi qua lại CKOD, CTDC, CTDM, TL1 và khi về chậm không ghi đè dữ liệu.
- [ ] Kiểm tra bản đồ nhúng, bản đồ toàn màn hình, các link lịch sử và các luồng ghi nhật ký/cấp quyền trước khi merge.

**Triển khai**: Code.gs mới cần được cập nhật tại **đúng Apps Script project** trước khi đưa nhánh TL1 lên website main, tránh vẽ bản đồ nhưng API không nhận mã TL1.
