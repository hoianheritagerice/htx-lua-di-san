# Hình và chuyển động hệ sinh thái

- `ban-phac-thao-da-duyet.png`: bản phác thảo người dùng đã duyệt.
- `ech-chuyen-dong.png`: các tư thế ếch; giữ nguyên nhịp nhảy đã được người dùng chấp nhận.
- `cu-dan-chuyen-dong.png`: 16 tư thế mới, tạo bằng công cụ imagegen tích hợp, đang chờ người dùng xem trên preview. Bốn hàng lần lượt là vịt bơi, chim bay, chuột chạy/cắn gốc và chuồn chuồn bay/đậu. Ảnh gốc giữ nguyên; màu đỏ đô và lớp giấy bên trong nhân vật được xử lý lúc hiển thị.

Prompt tạo bộ tư thế mới: dùng bản phác thảo đã duyệt làm tham chiếu nghiêm ngặt; nét đen mềm, tròn, đơn giản, cùng khuôn mặt dễ thương; một atlas 4 × 4 ô, không chữ hay đường kẻ, có khoảng đệm. Mỗi hàng cùng nhân vật quay phải và giữ kích thước: vịt bơi không lộ chân (thư giãn, vươn cổ, cúi đầu, ngẩng đầu); chim bay (cánh cao, chếch lên, ngang, hạ xuống); chuột chạy bằng bốn chân (duỗi, thu, đổi bước, dừng cúi đầu gặm); chuồn chuồn (cánh dựng, nửa dựng, ngang, tư thế đậu). Không bóng đổ, không cảnh nền hoặc đạo cụ.

Lúa được vẽ theo ảnh `img/timeline/` và hình trong `iconHoatDongCD`: lá dài nhọn, dảnh chung gốc, đòng còn trong bẹ, bông xuất hiện từ mốc trổ, hạt đổi màu khi chín. Ghép cảnh bằng ID hoạt động, không dùng vị trí sau khi sắp ngày.

Kiểm tra: chạy ba tệp `tests/timeline-ecosystem*.test.cjs`. Trang `tests/timeline-preview.html` giúp xem trang thật trong các bề rộng phổ biến. Các kiểm tra hình học và vòng đời không thay thế việc kiểm tra chuyển động trên trình duyệt/điện thoại thật.
