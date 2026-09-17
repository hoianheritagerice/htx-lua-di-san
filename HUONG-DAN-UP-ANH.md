# Cách đưa ảnh cánh đồng và ảnh timeline lên GitHub

## 1. Hiểu ba loại ảnh

| Loại ảnh | Hiện ở đâu? | Cách dùng |
|---|---|---|
| Ảnh bìa ngang hiện có | Đầu phần giới thiệu, có số thửa/hộ/diện tích | Giữ nguyên. Bấm ảnh này không mở thư viện. |
| Khoảng 15 ảnh riêng của mỗi cánh đồng | Các ảnh nhỏ dưới ảnh bìa; bấm mở thư viện | Có nút trước/sau, phím trái/phải và ảnh nhỏ để chọn. |
| Ảnh minh họa mốc mùa vụ | Cạnh tên mốc trên timeline và trong hộp chi tiết | Dùng bộ 13 tên file đã quy ước trước đây. |

Ảnh thư viện nên là ảnh đầy đủ, giữ tỷ lệ gốc. **Không cắt thành dải ngang như ảnh bìa.** Chọn ảnh rõ, xuất JPG có cạnh dài khoảng 1.600–2.000 px, mục tiêu khoảng 200–500 KB/ảnh; xem lại chất lượng trước khi dùng. Không chỉ đổi đuôi PNG thành JPG — phải xuất/lưu đúng định dạng.

## 2. Đặt ảnh vào đúng thư mục trên máy tính

Tạo thư mục `img`, bên trong có `canh-dong` và `timeline`. Trong `canh-dong`, tạo ba thư mục sau:

| Cánh đồng | Thư mục | Tên 15 ảnh |
|---|---|---|
| Ông Đảng | `img/canh-dong/ckod/` | `01.jpg`, `02.jpg`, …, `15.jpg` |
| Đồng Cao | `img/canh-dong/ctdc/` | `01.jpg`, `02.jpg`, …, `15.jpg` |
| Đồng Mẫu | `img/canh-dong/ctdm/` | `01.jpg`, `02.jpg`, …, `15.jpg` |

Ba cánh đồng được dùng cùng tên `01.jpg` vì nằm ở ba thư mục khác nhau. Ảnh sắp theo thứ tự số; chọn ảnh đẹp nhất làm `01.jpg`. Dùng chữ thường, hai chữ số, không dấu và không khoảng trắng. Trên Windows, bật hiển thị phần mở rộng tên file để tránh đặt thành `01.jpg.jpg`.

Nếu mới có 8 ảnh, đặt `01.jpg` đến `08.jpg` là được; không cần làm ảnh trống cho đủ 15.

## 3. Đặt tên ảnh timeline

Đặt các ảnh sau trong `img/timeline/`. Đây là bộ tên cũ, không cần đổi sang tên mới:

| Mốc | Tên file chính xác |
|---|---|
| Lễ Tịch điền - Xuống đồng | `01-le-cung-xuong-dong.jpg` |
| Gieo sạ | `02-gieo-sa.jpg` |
| Cùng xuống giống | `03-cung-xuong-giong.jpg` |
| Giai đoạn mạ | `04-giai-doan-ma.jpg` |
| Đẻ nhánh rộ | `05-de-nhanh-ro.jpg` |
| Làm đòng | `06-lam-dong.jpg` |
| Trổ bông | `07-tro-bong.jpg` |
| Thăm đồng mùa lúa trổ | `08-tham-dong-lua-tro.jpg` |
| Chắc hạt | `09-chac-hat.jpg` |
| Chín vàng | `10-chin-vang.jpg` |
| Thu hoạch | `11-thu-hoach.jpg` |
| Ngày hội gặt | `12-ngay-hoi-gat.jpg` |
| Lễ cúng Tạ ơn & mừng Lúa mới | `13-cung-com-moi.jpg` |

Bộ này là **ảnh minh họa chung**, được dùng ở cả ba cánh đồng và ghi rõ “Ảnh minh họa”. Nó không được coi là bằng chứng một hoạt động đã diễn ra ở vụ đang xem. Nếu chỉ có một phần bộ ảnh, các mốc thiếu file sẽ hiện biểu tượng và chữ, không giữ ô ảnh hỏng.

Nếu muốn gắn ảnh thật cho riêng một cánh đồng/vụ, dùng phần `suKienTheoVu` ở cuối hướng dẫn; ảnh riêng được ưu tiên hơn ảnh minh họa chung.

## 4. Upload lên GitHub

1. Mở [repository htx-lua-di-san](https://github.com/hoianheritagerice/htx-lua-di-san), tại màn hình thấy `canh-dong.html`, `js`, `css`, `img`.
2. Chọn **Add file → Upload files**.
3. Kéo thư mục `img` đã chuẩn bị vào vùng tải lên. Kiểm tra đường dẫn xuất hiện, ví dụ `img/canh-dong/ckod/01.jpg` và `img/timeline/01-le-cung-xuong-dong.jpg`. Đừng để thành `img/img/...`.
4. Ghi mô tả như “Bổ sung ảnh ba cánh đồng và timeline”, rồi lưu thay đổi. Nếu dùng nhánh riêng, tạo và hợp nhất pull request theo quy trình repository; nếu được phép lưu trực tiếp thì dùng nhánh đang triển khai web.
5. Chờ lần triển khai GitHub Pages hoàn tất trong **Actions**, rồi mở web kiểm tra.

**Không upload file ZIP ảnh với mong muốn web tự giải nén.** Phải giải nén trên máy rồi đưa các file/thư mục ảnh lên.

GitHub nhận tối đa 100 file một lần qua trình duyệt. Bộ 45 ảnh cánh đồng + 13 ảnh timeline là 58 file; có thể tải một lượt. Các bước Upload files tham khảo [hướng dẫn chính thức của GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## 5. Cho web biết đã có ảnh

Sau khi upload, mở `js/canh-dong-config.js` trên GitHub và bấm biểu tượng bút chì để sửa.

Ở ba dòng CKOD, CTDC, CTDM, tìm đoạn:

```js
thuVien:{soAnh:0,duoi:'jpg',coAnhNho:false}
```

Đổi riêng `soAnh:0` thành số ảnh đã upload của đúng cánh đồng. Ví dụ đủ 15 ảnh:

```js
thuVien:{soAnh:15,duoi:'jpg',coAnhNho:false}
```

Đã upload ảnh timeline thì đổi:

```js
anhTimeline: {bat:false, thuMuc:'img/timeline', duoi:'jpg'},
```

thành:

```js
anhTimeline: {bat:true, thuMuc:'img/timeline', duoi:'jpg'},
```

Lưu file. Để khách không giữ cấu hình cũ trong bộ nhớ đệm, mở `canh-dong.html`, tìm dòng chứa `js/canh-dong-config.js?v=` và đổi phần sau `?v=` thành một mã mới, ví dụ `20260916b`. Mỗi lần thay cấu hình lại tăng mã này. Không cần đổi các file JavaScript khác.

**Kết quả:** mỗi cánh đồng có nút “Xem tất cả 15 ảnh”. Bấm vào rồi dùng mũi tên để xem tiếp. Xem hết ảnh 15, bấm tiếp sẽ quay về ảnh 01. Bấm phím Esc hoặc dấu × để đóng.

## 6. Thêm ảnh về sau

Ví dụ Ông Đảng đang có 15 ảnh, muốn bổ sung 3 ảnh:

1. Upload `16.jpg`, `17.jpg`, `18.jpg` vào `img/canh-dong/ckod/`.
2. Đổi `soAnh:15` thành `soAnh:18` ở dòng CKOD trong cấu hình.
3. Đổi mã `?v=` của file cấu hình trong `canh-dong.html` và lưu.

Nếu thay một ảnh cũ, cách đơn giản là dùng tên mới và khai báo danh sách `anh` thủ công, hoặc đổi phiên bản trong đường dẫn ảnh; chỉ tải đè cùng tên có thể khiến trình duyệt còn hiện ảnh đã lưu trước đó.

## 7. Hai tùy chọn khi cần

**Ảnh nhỏ để tải nhẹ hơn.** Sau này có thể xuất thêm ảnh nhỏ cạnh dài khoảng 600 px, đặt cùng tên trong thư mục `nho`, ví dụ `img/canh-dong/ckod/nho/01.jpg`. Khi đã có đủ bản nhỏ, đổi `coAnhNho:false` thành `true`. Web dùng ảnh nhỏ cho các ô xem trước, chỉ tải ảnh lớn khi chọn xem. Tải bộ ảnh nhỏ trong một lượt riêng nếu tổng số file vượt 100.

**Tên ảnh/chú thích tự chọn.** Danh sách `anh:[]` ở mỗi cánh đồng cho phép dùng tên khác và chú thích riêng. Nếu danh sách này có nội dung, nó được ưu tiên thay cho cách đánh số `soAnh`. Ví dụ:

```js
anh: [
  {src:'img/canh-dong/ckod/ven-song.jpg', chu:'Ruộng Ông Đảng bên sông Thu Bồn'},
  {src:'img/canh-dong/ckod/duong-lang.jpg', chu:'Lối vào cánh đồng'}
]
```

**Ảnh hoạt động riêng theo mùa vụ.** Upload ảnh vào đúng thư mục bạn chọn, rồi khai báo tại `suKienTheoVu`. Cấu hình này chỉ đặt ảnh; ngày của các mốc sửa trực tiếp trong DB VỤ MÙA ở Notion:

```js
suKienTheoVu: {
  'CKOD:HT26': {
    'ngay-hoi-gat': {
      anh:'img/timeline/ckod-ht26/ngay-hoi-gat.jpg'
    }
  }
}
```

## Nếu ảnh chưa hiện

- Kiểm tra đúng cánh đồng, đúng thư mục và đúng số lượng trong `soAnh`.
- `01.jpg` khác `1.jpg`, `01.JPG` và `01.png`; tên/đuôi trong cấu hình phải khớp file thật.
- Chưa bật `anhTimeline.bat` thì bộ ảnh timeline chưa xuất hiện.
- Kiểm tra Actions đã triển khai xong; tải lại bằng Ctrl+F5 hoặc mở cửa sổ riêng tư.
- Nếu đã dùng danh sách `anh`, thay đổi `soAnh` sẽ không có tác dụng cho đến khi bỏ danh sách đó.

Ảnh bìa và số chốt luôn độc lập với thư viện ảnh và với dữ liệu mùa vụ.
