# HTX LÚA DI SẢN — HƯỚNG DẪN VẬN HÀNH

Cập nhật: **22/08/2026**
Viết cho người tiếp quản hệ thống. Đọc hết mục 0 và mục 1 trước khi sửa bất cứ thứ gì.

---

## 0. BA ĐIỀU PHẢI BIẾT TRƯỚC

### 0.1 Chỉ có một người biết hệ thống này

Toàn bộ website, backend, cấu trúc Notion và quy ước dữ liệu hiện do **một mình anh Quân** nắm.
Không có người thứ hai kiểm tra chéo. Vì vậy tài liệu này ghi cả **lý do** chứ không chỉ thao tác — chỗ nào có chữ ⚠ là chỗ đã từng trả giá bằng dữ liệu mất thật.

### 0.2 Luôn lấy bản mới nhất từ GitHub làm gốc

Trước khi sửa file web, **tải bản mới nhất từ GitHub** rồi mới sửa lên đó.
Sửa trên một bản zip cũ rồi đẩy đè là mất hết thay đổi ở giữa. Chuyện này đã xảy ra.

### 0.3 Lỗi im lặng là kẻ thù chính

Hệ thống này hỏng theo kiểu **không báo lỗi**: form vẫn hiện "✓ Đã lưu", trigger vẫn báo "Error rate 0%", trong khi dữ liệu rơi mất. Ba lần mất dữ liệu lớn đều thuộc kiểu này.
Nguyên tắc: **thà chặn không cho lưu, còn hơn báo thành công giả.**

---

## 1. HAI VIỆC CẦN LÀM NGAY

### 1.1 ⚠ Nút "Xem đầy đủ trang truy xuất" đang dẫn tới trang 404

- `ban-do.html` dòng 139 có nút `#tTruyXuat`
- `js/ban-do.js` dòng ~418 gán `href = 'truy-xuat.html?ma=...'` và **hiện nút lên** với mọi thửa đã có mã sản phẩm
- Backend `Code.gs` **có sẵn** `handleGetTraceability_` và action `getTraceability`
- **Nhưng `truy-xuat.html` không tồn tại trong repo, cũng không có trong bất kỳ bản sao lưu nào**

Nghĩa là: bấm nút đó → 404. Backend đã dựng xong, nút đã dựng xong, chỉ thiếu trang.

**Xử lý — chọn một:**
- Dựng lại `truy-xuat.html` (backend sẵn sàng, chỉ cần trang gọi `getTraceability`), hoặc
- Tạm ẩn nút: trong `js/ban-do.js` đổi `nutTX.style.display = ''` thành `= 'none'`

Đừng để nguyên. Khách quét mã QR là đối tượng thấy trang này.

### 1.2 ⚠ `HUONG-DAN.txt` trên GitHub là một bản `Code.gs` CŨ, không phải hướng dẫn

| | HUONG-DAN.txt | Code.gs hiện tại |
|---|---|---|
| Bản | 2.0 — 29/07/2026 | 22/08/2026 |
| Số dòng | 1.781 | 2.233 |
| `CACHE_VER` | `v2` | `v11` |

Thiếu 11 hàm, trong đó có `handleGetTraceability_`, `noiTaskVuVaoLo`, `vaBucXaVuCu`, `chuanHoaMaSP_`, `viPhamVal_`.
File đó còn ghi ngay đầu: *"FILE NÀY THAY THẾ TOÀN BỘ Code.gs CŨ. Ctrl+A → Delete → dán nguyên file này"*. **Làm theo là mất gần một tháng sửa lỗi.**

**Xử lý:** xoá `HUONG-DAN.txt`, thay bằng file này, và đưa `Code.gs` thật vào repo tại `apps-script/Code.gs` (xem mục 2.3).

---

## 2. HỆ THỐNG GỒM NHỮNG GÌ

### 2.1 Ba lớp

| Lớp | Ở đâu | Sửa xong thì làm gì |
|---|---|---|
| Giao diện | GitHub Pages `hoianheritagerice.github.io/htx-lua-di-san/` | đẩy GitHub, **đổi `?v=`** |
| Backend | Google Apps Script (Web App) | Lưu, và **Triển khai lại** nếu đổi dữ liệu trả về |
| Dữ liệu | Notion (3 database) + Google Drive (ảnh/video) | — |

### 2.2 File trong repo

```
index.html  canh-dong.html  chi-tiet.html  san-pham.html  ve-chung-toi.html  ban-do.html
css/   chung.css  hieu-ung.css
js/    chung.js  ban-do.js  bieu-do-thoi-tiet.js  noi-dung.js  so-lieu-tong.js
       form-quan-tam.js  hieu-ung.js
img/   (ảnh thật + logo + favicon)
```

`js/noi-dung.js` là lớp quản lý nội dung — sửa chữ trên trang thì sửa ở đây, đừng sửa thẳng trong HTML.

### 2.3 ⚠ `Code.gs` KHÔNG có trong repo

Backend chỉ tồn tại **một bản duy nhất trong Apps Script**. Không có lịch sử, không có bản sao lưu.
Xoá nhầm hoặc dán đè là mất trắng.

**Nên làm:** tạo thư mục `apps-script/` trong repo, bỏ `Code.gs` vào, và mỗi lần sửa backend thì đẩy kèm. Git lo phần lịch sử. Đây là việc rẻ nhất mà giảm rủi ro nhiều nhất.

### 2.4 Ba database Notion

| Tên | ID | Dùng để |
|---|---|---|
| Mã sản phẩm (lô) | `3891c9d2…63c7` | mỗi thửa × mỗi vụ = một lô |
| MASTERTASK (nhật ký) | `37c1c9d2…8199` | mọi bản ghi ngoài đồng |
| Thời tiết ngày | `6bfcec56…5261` | một dòng / cánh đồng / ngày |
| Vụ mùa | `37c1c9d2…70` | mốc sinh trưởng, tổng hợp thời tiết |

Token Notion và tài khoản người dùng nằm trong **Script Properties**, không nằm trong `Code.gs`. Thay file `Code.gs` không làm mất chúng.

---

## 3. QUY TẮC TRIỂN KHAI

### 3.1 Sửa file web

Đẩy GitHub là xong — **nhưng phải đổi `?v=`**.

```html
<link rel="stylesheet" href="css/chung.css?v=20260822a">
<script src="js/chung.js?v=20260822a"></script>
<script src="js/ban-do.js?v=20260822a"></script>
```

⚠ **Không đổi số này thì xã viên vẫn chạy bản cũ mà không ai biết.**
Ngày 22/08/2026 máy xã viên chạy `ban-do.html` mới ghép với `js/ban-do.js` cũ — vì trình duyệt điện thoại giữ file `.js` rất lâu còn `.html` thì kiểm lại thường xuyên. Kết quả: chọn ảnh xong không lưu được.

Quy ước: ngày + chữ cái, ví dụ `20260822a`, sửa tiếp trong ngày thì `20260822b`.
Số trong `ban-do.html` phải khớp với `window.BANDO_JS_VER` trong `js/ban-do.js` — chốt chặn dùng nó để nhận ra bản cũ.

### 3.2 Sửa `Code.gs`

| Loại thay đổi | Cần gì |
|---|---|
| Chạy hàm tay trong editor (`noiTaskVuVaoLo`, `keoThoiTietLichSu`…) | chỉ **Lưu** |
| Đổi dữ liệu web app trả về (whitelist, `VU.DS`, cấu trúc payload) | **Lưu + Triển khai lại + tăng `CACHE_VER`** |

⚠ **Triển khai lại = "Phiên bản mới" của BẢN TRIỂN KHAI ĐANG CÓ.**
Chọn nhầm "Bản triển khai mới" thì URL `/exec` đổi, mà URL đó ghi cứng trong `js/chung.js` — cả trang đứng hình.

`CACHE_VER` là một phần khoá bộ nhớ đệm (`'map_' + CACHE_VER + '_' + field + '_' + season`). Không tăng thì trang phục vụ dữ liệu cũ tới 6 tiếng dù đã triển khai.

---

## 4. MƯỜI BỐN CÁI BẪY ĐÃ TRẢ GIÁ

Mỗi mục là một lần mất dữ liệu hoặc mất thời gian thật.

### 4.1 Bẫy về ảnh và nhập liệu

**1. Listener chọn ảnh bị xoá trong đợt dọn code (11/08/2026).**
Đợt gỡ ba hàm "bản sao chết" đã cắt nhầm `addEventListener('change')` của `#nlAnh`. Hàm `nenAnh()` vẫn còn nên grep vẫn thấy, tưởng nguyên vẹn. Hậu quả: chọn ảnh → không có gì xảy ra → bấm Lưu vẫn báo thành công → ảnh rơi hết.
→ Nay có `window.ANH_LISTENER_OK`. **Đừng xoá.**

**2. Nén ảnh chưa xong đã bấm Lưu (22/08/2026).**
`nenAnh()` bất đồng bộ, ảnh camera 12MP mất một hai giây. Trong khoảng đó `anhDaChon` vẫn rỗng.
→ Nay có `window.dangDocAnh` khoá nút Lưu và đổi chữ thành "⏳ Đang xử lý ảnh…".

**3. Ảnh HEIC của iPhone đọc không được, bị nuốt lỗi im lặng.**
→ Nay bật hộp thoại liệt kê tên từng ảnh hỏng kèm cách chuyển sang JPG.

**Cách tự kiểm 10 giây:** mở form, chọn một ảnh. Phải thấy đủ ba thứ — nút đổi thành ⏳, ảnh nhỏ hiện ra, dấu × đỏ ở góc ảnh. Thiếu bất kỳ thứ nào thì **đừng ghi tiếp**.

**4. `window.dangDocAnh` phải gắn vào `window`, đừng đổi thành `let`.**
`guiNhapLieu()` nằm trong thẻ `<script>` khác. Biến `let` ở đầu file nằm trong phạm vi từ vựng toàn cục chứ không phải thuộc tính của `window` — đọc chéo được là nhờ may, và hỏng ngay nếu file bị bọc trong IIFE hay chuyển sang `type="module"`.

### 4.2 Bẫy về danh sách lựa chọn

**5. Ba nơi phải khớp TỪNG KÝ TỰ:**

| Nơi | Biến |
|---|---|
| Notion | option của cột |
| `Code.gs` | `CONFIG.WL.*` |
| `ban-do.html` | `OPT.*` |

Notion **tự tạo option mới** khi nhận tên lạ. Một lỗi gõ là sinh option rác vĩnh viễn, sang vụ sau có cả "Cỏ chát" lẫn "cỏ chat" → hỏng đúng khả năng so sánh giữa các mùa vụ. Vì thế `Code.gs` lọc theo whitelist và **bỏ qua âm thầm** giá trị lạ (chỉ ghi `Logger.log`).

Đã dính hai lần: `Bắt ốc` và ba lựa chọn `Nhổ cỏ tay` / `Duy trì nước` / `Kiểm tra bờ` có trong Notion nhưng thiếu ở hai file kia — xã viên không bấm được, và bản ghi cũ dùng chúng thì bị lọc mất.

**Bài kiểm ba chiều** (chạy trước mỗi lần đẩy có đụng danh sách): so `Code.gs` ↔ `ban-do.html` ↔ option thật trong Notion. Hiện trạng 22/08/2026:

| Danh sách | Code.gs | ban-do | Notion |
|---|---|---|---|
| Hoạt động | 11 | 11 | 11 ✓ |
| Vấn đề | 12 | 12 | 11 ⚠ |
| Mức độ | 3 | 3 | 3 ✓ |
| Vị trí | 5 | 5 | 5 ✓ |
| Hướng xử lý | 9 | 9 | 9 ✓ |

⚠ `Nhiễm phèn` có trong hai file nhưng Notion chưa sinh option — **không phải lỗi**, Notion chỉ tạo option khi có bản ghi đầu tiên mang giá trị đó.

**6. `js/ban-do.js` từng có "bản sao chết".**
`nhapNhieuThua` / `moNhapLieu` / `guiNhapLieu` từng tồn tại ở cả hai file; bản trong `ban-do.html` gán đè lên `window` sau nên bản trong `.js` chưa từng chạy. Ai sửa nhầm bản chết thì sửa xong không thấy gì đổi.
→ Đã gỡ 11/08/2026. **Bản đang sống nằm trong `ban-do.html`.**

### 4.3 Bẫy về thời tiết

**7. `keoThoiTietLichSu` bỏ trống tham số cánh đồng = chạy cả 3.**
Vụ Đông Xuân 2026 chỉ làm ở Ông Đảng, nhưng lượt kéo quét cả ba → **236 dòng rác** cho Đồng Cao (127) và Đồng Mẫu (109) trong khoảng 20/12/2025 → 25/04/2026. Chúng vẫn còn trong Notion, vô hại nhưng nên xoá.
→ Luôn ghi rõ `const DONG = ['CKOD'];`

**8. Đừng gộp nhiều vụ vào một khoảng kéo.**
Gộp DX25 + HT25 thành 25/12/2024 → 10/09/2025 nghe thì tiện, nhưng nuốt luôn 18 ngày khe giữa hai vụ (06/05 → 23/05/2025) — quãng đó không vụ nào dùng. Và 260 dòng ăn khoảng 208 giây, sát trần `HAN_CHAY_MS` 270 giây.
→ Kéo **từng vụ một**.

**9. Kho ERA5 chậm 5–7 ngày.**
Hỏi tới ngày nó chưa có thì API trả lỗi 400 chứ không trả mảng rỗng, và lỗi đó làm **cả lượt chạy thoát ra, không ghi được ngày nào**. Đã làm chết việc ghi mưa từ 01/08/2026 mà log vẫn êm.
→ Nay code bắt lấy ngày cuối kho có rồi hỏi lại đúng tới đó.

**10. Trigger báo "Error rate 0%" không có nghĩa là chạy tốt.**
Mọi lỗi ghi Notion đều bị `try/catch` nuốt và chỉ vào `Logger`.
→ Nay có `baoDongThoiTiet_()` gửi mail khi hôm qua thiếu dòng.

**11. Cột `Bức xạ (MJ/m2)` thêm sau khi vụ DX26 đã kéo xong.**
→ Đã vá xong cho CKOD (127 dòng, 21/08/2026). Hàm `vaBucXaVuCu()` giữ lại để dùng lần sau. **Đừng vá 236 dòng Cẩm Thanh** — đó là rác của bẫy số 7.

**12. Số vũ kế nhập tay luôn đúng hơn mô hình.**
Dòng có `Nguồn = "Nhập tay"` không bao giờ bị ghi đè. Muốn quay lại số Open-Meteo thì tự đổi `Nguồn` về `"Open-Meteo forecast"`.

### 4.4 Bẫy về dữ liệu Notion

**13. Rollup của Notion chỉ tính trên 25 relation đầu.**
Đồng Cao có 36 lô → rollup **thiếu**. Vì vậy diện tích, số hộ, sản lượng đều tự cộng từ danh sách lô đã phân trang; rollup chỉ là dự phòng.

**14. Ô trống nghĩa là KHÔNG CÓ SỐ, không phải số 0.**
Định lượng phân bón của các vụ cũ để trống vì hồ sơ giấy không ghi kg/sào. Điền 0 vào là bịa dữ liệu, và tổng cộng trong hồ sơ chứng nhận sẽ sai.

---

## 5. NHẬP LẠI MỘT VỤ CŨ

Đã làm bốn lần. Quy trình 6 bước, khoảng 1–2 giờ mỗi vụ.

### Bước 1 — Chuẩn bị dữ liệu
Cần: **8 mốc sinh trưởng** · **giống lúa** · **danh sách lô + sản lượng** · **nhật ký từ kế hoạch giấy**.

Quy ước:
- **Mã vụ:** `HT` / `DX` + 2 số cuối năm thu hoạch. Vụ Đông Xuân 2024–2025 → `DX25`.
- **Mã vụ-giống:** `<MÃ VỤ>-<GIỐNG>`, ví dụ `HT25-VNR20`. Một vụ có thể có nhiều giống.
- **Mã lô:** `<CÁNH ĐỒNG>-<MÃ HỘ>-<MÃ VỤ>-<GIỐNG>`, ví dụ `CKOD-LONG1-DX25-DT100`.
- **Tên vụ:** `Cẩm Kim - Ông Đảng - Đông Xuân 2025`.

**Mốc sinh trưởng:** ngày gieo sạ và ngày thu hoạch lấy từ hồ sơ (thật). Sáu mốc giữa **ước lượng** từ khung NSS của vụ cùng cánh đồng cùng loại vụ, giãn theo tỉ lệ cho vừa độ dài vụ đang nhập. **Phải ghi rõ trong Ghi chú mốc nào thật mốc nào ước lượng.**

**Hộ nhiều thửa:** tách theo **tỉ lệ diện tích thật trong Notion**, không theo cột sào trong Excel — cột sào thường là ước lượng (vụ DX25 ghi 29,7 sào trong khi đo thật là 31,7). Làm tròn kiểu số dư lớn nhất để tổng của hộ không đổi.

**Hộ không tham gia:** vẫn tạo lô, đánh dấu `Không hữu cơ`, để trống sản lượng — để bản đồ tô đúng màu.

### Bước 2 — Tạo bản ghi Vụ mùa
8 mốc + `Trạng thái vụ = Đã thu hoạch` + Ghi chú nêu nguồn và chỗ nào ước lượng.

### Bước 3 — Thêm `Mã vụ-giống` vào Notion
Notion **chặn** giá trị select lạ. Phải `ALTER COLUMN … SET SELECT(…)` với **đủ cả option cũ**, nếu không là xoá mất chúng.

### Bước 4 — Tạo lô sản phẩm
Nối `Vụ mùa` + `Mã Thửa đất`, điền ngày ủ giống / gieo / 3 đợt bón phân / thu hoạch, và sản lượng khô.

### Bước 5 — Tạo nhật ký
Từ kế hoạch giấy. Mỗi mục kế hoạch có thể tách thành 2–3 bản ghi khác nhóm. Để trống quan hệ `Mã sản phẩm` — bước 6 lo.

### Bước 6 — Chạy hai hàm trong Apps Script

```js
// noiTaskVuVaoLo — nối nhật ký vào mọi lô của vụ
const MA_VU = 'DX25';

// keoThoiTietLichSu — LUÔN ghi rõ cánh đồng
const DONG = ['CKOD'];
const TU   = '2024-12-25';   // ngày gieo sạ lùi NGAY_CHUAN_BI = 7 ngày
const DEN  = '2025-05-05';   // ngày gặt
```

Rồi thêm vụ vào `CONFIG.VU.DS`, tăng `CACHE_VER`, **Triển khai lại**.

### Bảy bài kiểm sau khi nhập
1. Số lô đúng số thửa tham gia
2. Tổng sản lượng khớp hồ sơ giấy (lệch < 1 kg do làm tròn là bình thường)
3. Không lô nào trùng thửa
4. Mọi lô nối đúng Vụ mùa
5. Nhật ký đủ ba nhóm, ngày nằm trong khoảng vụ
6. Thời tiết đủ ngày, không thừa cánh đồng
7. Danh sách lựa chọn khớp ba chiều

**Kiểm cuối:** quét QR một lô có tách tỉ lệ và có đủ 3 đợt bón phân — thông là xong.

---

## 6. CÁC VỤ ĐÃ CÓ

| Mã | Tên | Cánh đồng | Lô | Sản lượng |
|---|---|---|---|---|
| `HT26` | Hè Thu 2026 | cả 3 | 82 | đang canh tác |
| `DX26` | Đông Xuân 2026 | Ông Đảng | 21 | 12.350 kg |
| `HT25` | Hè Thu 2025 | Ông Đảng | 20 | 9.990 kg |
| `DX25` | Đông Xuân 2025 | Ông Đảng | 20 + 1 | 10.513 kg |
| `HT24` | Hè Thu 2024 | Ông Đảng | 18 | 10.169 kg |

**Số hộ tham gia thay đổi theo vụ** — đừng giả định 21 thửa lúc nào cũng đủ:
- `DX25` có thêm lô `CKOD-TRANSO-DX25-DT100` đánh dấu `Không hữu cơ` (Trần Sở không tham gia)
- `HT24` chỉ 18 lô — Huỳnh Kim Long (2 thửa) và Trần Sở không làm, tổng 2.640,7 m² nằm ngoài
- `HT25` 20 lô — Trần Sở không có dữ liệu, để trống

`HT24` là **vụ đầu tiên của đề án**, nên kế hoạch của nó có cả giai đoạn tham vấn và xây hồ sơ từ tháng 3/2024 — 20 bản ghi Hành chính, nhiều hơn hẳn các vụ sau.

**Cánh đồng:** `CKOD` Ông Đảng (Cẩm Kim, 21 thửa) · `CTDC` Đồng Cao · `CTDM` Đồng Mẫu (đều Cẩm Thanh).

---

## 7. VIỆC ĐỊNH KỲ

| Việc | Khi nào | Hàm |
|---|---|---|
| Kéo thời tiết | trigger 2–3h sáng | `keoThoiTietHangNgay` |
| Đồng bộ mã sản phẩm | trigger 15 phút | `dongBoMaSanPham` |
| Phân bổ task toàn vụ | chạy tay | `phanBoTaskToanVu` |
| Tổng hợp thời tiết vụ | tay hoặc 1 lần/tuần | `tongHopThoiTietVu` |

**Hàm chẩn đoán:** `kiemTraBanVa` (tổng quát) · `kiemTraSoLieu` (diện tích và mốc mùa vụ) · `kiemTraPhanBo` · `xoaDemKieuCot` (chạy ngay sau khi đổi kiểu cột trong Notion).

⚠ **Đừng đặt trigger** cho `keoThoiTietLichSu`, `vaBucXaVuCu`, `noiTaskVuVaoLo` — đều là việc chạy một lần.

---

## 8. VIỆC NÊN LÀM

| Việc | Vì sao |
|---|---|
| Dựng lại `truy-xuat.html` hoặc ẩn nút | đang 404 với khách quét QR |
| Xoá `HUONG-DAN.txt` | là `Code.gs` cũ, khôi phục nhầm là mất một tháng |
| Đưa `Code.gs` vào repo | backend đang chỉ có một bản, không lịch sử |
| Xoá 236 dòng thời tiết Cẩm Thanh trước 01/05/2026 | rác của bẫy số 7 |
| Bỏ mã vụ ghi cứng `HT26` | còn trong `xoaDemDongThoiGian_` |
| Có người thứ hai | mục 0.1 |

---

*Sửa gì thì cập nhật file này luôn. Một tài liệu sai còn nguy hiểm hơn không có tài liệu — `HUONG-DAN.txt` là bằng chứng.*
