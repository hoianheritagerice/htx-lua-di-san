# Bản cập nhật Cánh đồng — bản 8, ngày 17/09/2026

Đã đối chiếu repository ở commit `503c087`, đang dùng bản 5. Giữ cấu hình ảnh hiện tại: Ông Đảng 16 ảnh, Đồng Cao 16 ảnh, Đồng Mẫu 13 ảnh; bộ ảnh timeline đang bật. Bản 8 gồm các thay đổi trước đó, chưa được đẩy lên GitHub. Notion đã được cập nhật trực tiếp ở bản 7.

## Đưa bản cập nhật lên web

**Nếu đã áp dụng bản 7:** lần này chỉ thay **4 file**: `canh-dong.html`, `css/canh-dong.css`, `js/canh-dong-ui.js`, `js/bieu-do-thoi-tiet.js`. Giữ đúng thư mục. Không cần sửa Notion hoặc triển khai lại Apps Script cho riêng phần giao diện bản 8.

**Nếu web còn ở bản 5 như commit trên:** cập nhật Apps Script theo `apps-script/HUONG-DAN-CAP-NHAT.md` để đọc ngày lễ từ Notion, rồi thay 4 file vừa nêu và 3 file `js/canh-dong-config.js`, `index.html`, `js/noi-dung.js`. Chỉ upload frontend thì API cũ chưa trả được các ngày mới.

Gói ZIP chứa đủ 12 file web dưới đây để cập nhật từ bản cũ hơn, bao gồm cả trang chủ:

| File | Việc cần làm |
|---|---|
| `canh-dong.html` | Thay file hiện có ở gốc repo |
| `chi-tiet.html` | Thay file hiện có ở gốc repo |
| `index.html` | Thay file hiện có ở gốc repo |
| `css/canh-dong.css` | Thay file hiện có trong css |
| `js/canh-dong-config.js` | Thay file hiện có trong js |
| `js/canh-dong-ui.js` | Thay file hiện có trong js |
| `js/bieu-do-thoi-tiet.js` | Thay file hiện có trong js |
| `js/canh-dong-so-chot.js` | Thay file hiện có trong js |
| `js/canh-dong-timeline.js` | Thay file hiện có trong js |
| `js/noi-dung.js` | Thay file hiện có trong js |
| `js/so-lieu-tong.js` | Thay file hiện có trong js |
| `js/dem-so.js` | Thêm file mới trong js |

Các file HTML đã đổi mã phiên bản để tải JavaScript mới. Notion đã được bổ sung cột và ngày. Apps Script cần ghép phần đọc cột mới trước khi cập nhật web; bản đồ và ảnh bìa giữ nguyên. Nếu đã tự thêm cấu hình ảnh/quyền lợi sau commit trên, giữ lại các giá trị đó khi ghép bản mới.

Đọc **HUONG-DAN-UP-ANH.md** để đặt tên và upload 15 ảnh/cánh đồng cùng bộ ảnh timeline.

## Những thay đổi chính

### Điều chỉnh mới trong bản 8

- Chú thích dưới biểu đồ chỉ còn: “Mưa, nhiệt độ và bức xạ lấy tự động từ Open-Meteo”.
- Trên màn hình rộng tối đa 720 px, ba cánh đồng nằm trên một hàng gồm ba ô bằng nhau. Tên ở trên, địa danh ở dưới; nhãn Cánh đồng và ô chọn mùa vụ có hàng riêng. Máy tính giữ cách trình bày tên và địa danh cùng dòng.
- Nút Xem tất cả ảnh và liên kết Xem quyền lợi gói dùng chung mũi tên SVG nét mảnh, lấy màu từ chữ, không còn emoji ô xanh trên điện thoại.
- Đổi mã phiên bản tải CSS/JavaScript để trình duyệt nhận bản mới. Không thay số liệu, ảnh, ngày mùa vụ hoặc quyền lợi gói.
- Đã kiểm tra cú pháp JavaScript và chạy lại kiểm tra DOM cho thư viện ảnh, chuyển cánh đồng, chọn gói và timeline. Chưa xác nhận giao diện bằng trình duyệt trên điện thoại thật.

### Điều chỉnh mới trong bản 7

- Đã thêm 6 cột Date trong DB VỤ MÙA và điền đủ 48 ngày cho 8 vụ theo ngày đang hiển thị trên timeline, được bạn chốt làm ngày chính thức. Đã đọc lại và đối chiếu toàn bộ sau khi ghi. Không đổi ngày nông học, trạng thái vụ hoặc quan hệ sản phẩm.
- Cả 13 mốc đọc ngày từ Notion. Bỏ bảng tính ngày tự động `NEO_SU_KIEN`; sáu mốc bổ sung không còn Dự kiến. Sửa một ngày lễ không làm các ngày khác dịch theo.
- Các trường ngày/trạng thái trong `suKienTheoVu` không còn ghi đè ngày Notion; cấu hình này chỉ bổ sung ảnh theo vụ.
- Thêm `apps-script/TimelineNotion.gs` và bản ghép `apps-script/Code.gs.patch`. Dùng lại properties của trang vụ đã tải nên không tăng số lần gọi Notion riêng cho các ngày mới.
- `KIEM-TRA-NGAY-TIMELINE.md` chứa đúng tên cột và bảng 48 ngày đã ghi; `apps-script/HUONG-DAN-CAP-NHAT.md` hướng dẫn ghép mã và triển khai. Những hướng dẫn nhập ngày lễ trong cấu hình GitHub ở bản cũ được thay thế bằng việc nhập trực tiếp trong Notion.

### Điều chỉnh mới trong bản 6

- Xóa câu chú thích dưới các số ở mục Tác động trên trang chủ, gồm cả khối HTML và khoảng trống riêng của khối này. Giữ nguyên số cố định và bộ đếm.
- Sửa lỗi thu hoạch luôn bị gắn Dự kiến: khi API trả `daXong:true`, mốc hiện Đã thu hoạch. Vụ đang canh tác giữ trạng thái dự kiến. Tiêu đề cửa sổ đổi thành Ngày thu hoạch.
- Không tự xác nhận các ngày lễ/trải nghiệm đang tính bằng cách cộng/trừ ngày nông học. Bản kiểm tra **KIEM-TRA-NGAY-TIMELINE.md** chỉ rõ từng nguồn, các cột Notion phải sửa, dữ liệu hiện tại của ba đồng và cách nhập ngày sự kiện thật vào cấu hình có sẵn.
- Đã kiểm tra trực tiếp Notion và API Ông Đảng HT26: Notion ghi Đã thu hoạch, API trả `daXong:true`, ngày 09/09/2026. Lỗi của vụ này nằm ở frontend. Không sửa dữ liệu Notion hoặc Apps Script.

### Điều chỉnh mới trong bản 5

- Đổi tên thành **Lễ Tịch điền - Xuống đồng** và **Lễ cúng Tạ ơn & mừng Lúa mới** ở cả timeline và cửa sổ chi tiết.
- Bấm ảnh, tên hoặc biểu tượng đều mở cùng cửa sổ: tên/ngày ở trên, ảnh lớn giữ tỷ lệ gốc ở giữa, mô tả ở dưới. Ảnh dùng chung nguồn với ảnh nhỏ trên timeline, ưu tiên ảnh riêng của mùa vụ nếu có. Không tạo ảnh phóng lớn từ ô ảnh nhỏ đã cắt.
- Cửa sổ có ảnh rộng tối đa 960 px, thích ứng màn hình nhỏ; có nút đóng phía trên, phía dưới và phím Esc. Ảnh lỗi có thông báo, mô tả vẫn đọc được. Mốc chưa có ảnh vẫn mở mô tả.
- Cửa sổ dùng chung hàm SVG và bảng màu với timeline, bao gồm trạng thái có trong gói. Không gọi bộ biểu tượng cũ nữa.
- Ngày từ Notion và ngày lễ dự kiến gắn theo mã hoạt động cố định. Đổi tên hiển thị không làm hỏng liên kết ngày, ảnh hoặc gói.

### Tự đổi tên và mô tả sau này

Trên GitHub, mở **`canh-dong.html`**, bấm bút chì, tìm **`let SU_KIEN = [`**. Mỗi mốc có:

| Thuộc tính | Nội dung sửa |
|---|---|
| `ten` | Tên hiện cạnh biểu tượng trên timeline |
| `tenDay` | Tiêu đề cửa sổ khi bấm xem ảnh/mốc |
| `mo` | Mô tả dưới ảnh lớn |

Ví dụ hai thuộc tính tên của mốc đầu:

```js
ten:'Lễ Tịch điền - Xuống đồng', tenDay:'Lễ Tịch điền - Xuống đồng',
```

Đổi cả `ten` và `tenDay` nếu muốn tên nhất quán ở hai nơi. Giữ nguyên dấu nháy và dấu phẩy. Không đổi thứ tự mốc, `MA_HOAT_DONG` hoặc tên file ảnh chỉ vì đổi tên hiển thị. Tên ảnh cũ `01-le-cung-xuong-dong.jpg` và `13-cung-com-moi.jpg` vẫn dùng bình thường. Lưu thay đổi rồi tải lại trang. Không cần sửa Notion hoặc Apps Script.

### Điều chỉnh mới trong bản 4

- Trên máy tính, tên/ngày và ảnh nằm cùng phía với biểu tượng của chính mốc đó; khoảng cách từ mép vòng tròn đến khối nội dung là 20 px. Không còn để chữ phía đối diện bên kia đường cong.
- Giảm biên độ đường cong trên máy tính còn tối đa 76 px mỗi bên trục giữa. Khối nội dung rộng ít nhất 205 px ở bố cục máy tính để đặt ảnh. Giữ độ uốn ngang trên điện thoại.
- Biểu tượng neo ngang phần tên/ngày. Ảnh nằm dưới tên, chiều cao hàng tự tăng theo nội dung; không căn biểu tượng vào giữa cả khối ảnh khiến tên bị đẩy lên xa.
- Vẽ lại các mốc nông học: lá dài hẹp, mạ thanh, các dảnh đẻ nhánh từ chung gốc; làm đòng có bẹ ôm thân, trổ bông có bông mới nhú. Hạt chắc xanh nhạt, hạt chín vàng với viền nâu. Thu hoạch có bông lúa vàng và liềm, ngày hội gặt có bó lúa vàng. Màu hạt không bị màu chọn gói ghi đè.

### Các thay đổi được giữ từ bản trước

- Bỏ dòng ngày chốt dưới ảnh. Ba số trên ảnh chạy tăng dần khi đi vào màn hình, dừng đúng số cố định; đổi cánh đồng sẽ đếm lại theo cánh đồng mới. Tôn trọng thiết lập giảm chuyển động của thiết bị.
- Mục Tác động trên trang chủ cộng trực tiếp số của ba cánh đồng: **82 thửa, 69 hộ, 47.073,1 m² (hiển thị 4,71 ha), 3 cánh đồng**. Không gọi Notion/API hay đọc bộ nhớ đệm để lấy các số này. Nhãn diện tích đổi thành tổng diện tích ba cánh đồng vì số bao gồm cả canh tác không hữu cơ.
- Sự kiện thuộc gói có nền vàng hổ phách, viền nổi, chữ nâu đậm và nhãn “Có trong gói”.
- Ảnh ngang cũ trở thành ảnh bìa riêng; không được đưa vào thư viện ảnh lớn.
- Trên ảnh bìa có ba số cố định: số thửa, số hộ, tổng diện tích. Trang giới thiệu cũ cũng dùng chung bộ số này.
- Thư viện chỉ gồm ảnh đầy đủ được upload riêng. Có nút trước/sau, phím trái/phải, ảnh nhỏ để chọn và Esc để đóng. Chưa có ảnh thì không mở thư viện rỗng.
- Tải ảnh đánh số 01–15 rồi đổi `soAnh` trong cấu hình là dùng được; không cần khai báo 45 đường dẫn thủ công.
- Timeline có dải đường riêng, tên/ngày/ảnh ở bên cạnh; tự đo chiều cao để xếp hàng theo nội dung.
- Nhãn Hôm nay kiểm tra vùng trống, đổi hướng để tránh chữ và biểu tượng. Gần mốc thì nằm dưới biểu tượng, bỏ chấm thừa. Nét đường phía sau nhãn được ngắt để không chạy xuyên chữ.
- Bộ 13 biểu tượng được vẽ lại bằng SVG, rõ nét khi phóng to. Hoạt động ngoài gói vẫn dễ nhìn; hoạt động trong gói có viền nổi và nhãn.
- Bộ ảnh timeline cũ được hỗ trợ theo đúng 13 tên file. Bật `anhTimeline.bat` sau khi upload; ảnh chung có nhãn “Ảnh minh họa”. Có thể ghi đè bằng ảnh riêng theo cánh đồng và vụ.

## Số chốt từ Notion

Nguồn: [ORIGINAL DATABASE → Thông tin Thửa Đất](https://app.notion.com/37e1c9d219fa8005b438f85823107346), đọc ngày 14/09/2026.

| Cánh đồng | Mã thửa khác nhau | Hộ nông dân | Diện tích |
|---|---:|---:|---:|
| Ông Đảng | 21 | 18 | 17.056,1 m² |
| Đồng Cao | 41 | 32 | 15.479 m² |
| Đồng Mẫu | 20 | 19 | 14.538 m² |

Đã đọc đầy đủ 82 dòng, phản hồi `has_more=false`; không có mã thửa trùng hoặc dòng thiếu diện tích/người canh tác.

- Đếm thửa theo `Mã Thửa`, không theo mã sản phẩm của từng vụ.
- Đếm hộ theo liên kết `Người Canh tác` khác nhau trong mỗi cánh đồng. Hộ nhiều thửa chỉ đếm một lần.
- Cộng `Diện tích thửa (m2)` một lần cho mỗi mã.
- Bao gồm tất cả hình thức canh tác, không lọc hữu cơ.

Số được ghi trong `js/canh-dong-so-chot.js` và khóa đối tượng trong JavaScript. Không có cơ chế tự đồng bộ số bìa khi khách mở trang. Muốn đổi số, sửa `soThua`, `soHo`, `dienTich` của từng cánh đồng trong file này; diện tích nhập theo m². Số trên ảnh, trang giới thiệu cũ và tổng ở Tác động đều dùng chung nguồn này, không phải sửa tổng lần nữa. Tổng hộ là phép cộng số hộ của từng cánh đồng theo yêu cầu.

**Phần bản đồ/số liệu mùa vụ vẫn hoạt động riêng theo dữ liệu mùa vụ hiện có.** Không dùng tổng toàn cánh đồng để thay cho số liệu canh tác hữu cơ của mùa vụ.

## Kiểm tra và phạm vi

Đã kiểm tra cú pháp, tài nguyên tĩnh, luồng ba cánh đồng/mùa vụ, nguồn số cố định, thư viện 15/20 ảnh, ảnh bìa không mở thư viện, 13 tên ảnh timeline, ảnh lỗi, bộ chọn gói và phản hồi API về sai thứ tự.

Đã kiểm tra bộ đếm bắt đầu khi hiện trên màn hình, có giá trị trung gian, kết thúc chính xác, hủy lượt đếm cũ khi đổi cánh đồng và chế độ giảm chuyển động. Chạy các script trang chủ trong môi trường kiểm thử DOM cho đúng tổng cố định và không phát sinh yêu cầu mạng.

Bố cục đường/nhãn đã được kiểm tra hình học ở bề rộng 276, 316, 346, 386, 520, 679, 680, 720 và 960 px, với các chiều cao nhãn khác nhau khi có/không có ảnh. Đường cong không giao vùng chữ. Các vị trí Hôm nay được kiểm tra dọc từng đoạn, không giao vùng nhãn hoặc biểu tượng; gần mốc thì nằm dưới.

Bản 4 bổ sung kiểm tra khoảng cách nội dung tới đúng biểu tượng là 20 px trên máy tính, khối nội dung đủ rộng cho ảnh 205 px. Đã dựng SVG của bộ biểu tượng ở kích thước hiển thị 37 px và bố cục có/không có ảnh để kiểm tra trực quan.

Bộ biểu tượng đã được dựng thành ảnh để kiểm tra trực quan. Chưa xác nhận toàn trang bằng ảnh chụp trình duyệt vì môi trường xem trước cục bộ bị chặn. Sau khi upload, mở web trên máy tính và điện thoại để kiểm tra thực tế.

Bản 5 đã kiểm tra 13 luồng mở ảnh từ ảnh nhỏ và từ mốc, SVG trong cửa sổ trùng SVG ngoài timeline, mô tả nằm sau ảnh, ưu tiên ảnh theo mùa vụ, ảnh lỗi/thiếu, Tab/Esc và đổi tên không ảnh hưởng ngày mùa vụ. Đây là kiểm thử DOM và logic, chưa phải kiểm tra bằng trình duyệt thực tế.

Bản 6 kiểm tra trạng thái thu hoạch ở cả timeline và cửa sổ: vụ hoàn thành không còn Dự kiến; vụ đang canh tác vẫn giữ Dự kiến; hoàn thành thu hoạch không tự xác nhận ngày lễ. Kiểm tra lại bộ đếm trang chủ cho đúng số và không phát sinh yêu cầu mạng.

Bản 7 kiểm tra 48 ngày qua hàm API đã ghép, không phát sinh thêm lần tải trang Notion; frontend dùng ngày nhập riêng, cấu hình cũ không ghi đè ngày, ngày trống không sinh lại ngày giả định. Notion đã xác nhận đủ 6 cột và 48 giá trị; kiểm thử tích hợp sử dụng dữ liệu mô phỏng đúng schema. Chưa kiểm tra API triển khai mới vì chưa cập nhật dự án Apps Script đang chạy.

Camera và kho dữ liệu tĩnh của các mùa vụ cũ không nằm trong bản cập nhật này. Gói chỉ chứa mã nguồn và hướng dẫn; ảnh bạn đã upload vẫn nằm trên GitHub.
