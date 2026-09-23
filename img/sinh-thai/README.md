# Hình và chuyển động hệ sinh thái

- `ban-phac-thao-da-duyet.png`: bản phác thảo người dùng đã duyệt.
- `ech-chuyen-dong.png`: các tư thế ếch; giữ nguyên nhịp nhảy đã được người dùng chấp nhận.
- `cu-dan-chuyen-dong.png`: 16 tư thế mới, tạo bằng công cụ imagegen tích hợp, đang chờ người dùng xem trên preview. Bốn hàng lần lượt là vịt bơi, chim bay, chuột chạy/cắn gốc và chuồn chuồn bay/đậu. Ảnh gốc giữ nguyên; màu đỏ đô và lớp giấy bên trong nhân vật được xử lý lúc hiển thị.

Prompt tạo bộ tư thế mới: dùng bản phác thảo đã duyệt làm tham chiếu nghiêm ngặt; nét đen mềm, tròn, đơn giản, cùng khuôn mặt dễ thương; một atlas 4 × 4 ô, không chữ hay đường kẻ, có khoảng đệm. Mỗi hàng cùng nhân vật quay phải và giữ kích thước: vịt bơi không lộ chân (thư giãn, vươn cổ, cúi đầu, ngẩng đầu); chim bay (cánh cao, chếch lên, ngang, hạ xuống); chuột chạy bằng bốn chân (duỗi, thu, đổi bước, dừng cúi đầu gặm); chuồn chuồn (cánh dựng, nửa dựng, ngang, tư thế đậu). Không bóng đổ, không cảnh nền hoặc đạo cụ.

Lúa được vẽ theo ảnh `img/timeline/` và hình trong `iconHoatDongCD`: lá dài nhọn, dảnh chung gốc, đòng còn trong bẹ, bông xuất hiện từ mốc trổ, hạt đổi màu khi chín. Ghép cảnh bằng ID hoạt động, không dùng vị trí sau khi sắp ngày.

Kiểm tra: chạy ba tệp `tests/timeline-ecosystem*.test.cjs`. Trang `tests/timeline-preview.html` giúp xem trang thật trong các bề rộng phổ biến. Các kiểm tra hình học và vòng đời không thay thế việc kiểm tra chuyển động trên trình duyệt/điện thoại thật.

Chỉnh sửa preview tiếp theo: rắn, cua và châu chấu được đối chiếu với bản phác thảo đã duyệt. Cảnh rắn/cua mỗi nơi một con; chim và trùn có lúa dày hơn; tổ chim dùng cả hai chim con trong ảnh gốc, nhỏ hơn chim mẹ và nằm giữa các dảnh lúa; chuồn chuồn đậu trên lá trong cảnh cận.

Bản chuyển động mới: `ran-truon.png` gồm 8 tư thế rắn cuộn, duỗi thành chữ S và thu lại; `cua-bo.png` gồm 4 pha chân cua; `chau-chau-nhay.png` gồm 4 pha co chân, bật, bay và đáp. Cả ba được tạo bằng imagegen tích hợp, dùng bản phác thảo đã duyệt làm hình tham chiếu; ảnh nguồn của người dùng không bị sửa. Mỗi ảnh là atlas trên nền trong suốt; phần màu đỏ đô được xử lý khi hiển thị. Prompt chính: giữ cùng gương mặt, tỷ lệ và nét vẽ tay từ nhân vật tương ứng trong ảnh gốc; thay tư thế thân/chân theo tuần tự; không bối cảnh, chữ, đổ bóng hay con vật khác.
