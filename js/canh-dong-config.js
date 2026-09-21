/* Nội dung bổ sung của tab Cánh đồng.
 * Mô tả và tên gói vẫn đọc từ NOI_DUNG trong noi-dung.js.
 * Ảnh: thêm {thumb, src, chu} vào anh của đúng cánh đồng; không cần đủ 20.
 * thumb: ảnh nhỏ 480–640px. src: ảnh lớn 1600–2000px chỉ tải khi mở xem.
 * Lưu file trong img/canh-dong/<ma-dong>/; không dùng link Notion hết hạn.
 * Quyền lợi dùng mã hoạt động ổn định, không dò tên trong nhật ký.
 */
const CAU_HINH_CANH_DONG = {
  dong: {
    CKOD: {slug:'ong-dang', ten:'Ông Đảng', anh:[], thuVien:{soAnh:16,duoi:'jpg',coAnhNho:false}},
    CTDC: {slug:'dong-cao', ten:'Đồng Cao', anh:[], thuVien:{soAnh:16,duoi:'jpg',coAnhNho:false}},
    CTDM: {slug:'dong-mau', ten:'Đồng Mẫu', anh:[], thuVien:{soAnh:13,duoi:'jpg',coAnhNho:false}}
  },
  // Sau khi upload 01.jpg ... 15.jpg vào img/canh-dong/ckod (hoặc ctdc/ctdm),
  // đổi soAnh:0 thành soAnh:15 của đúng đồng. Ảnh bìa không thuộc thư viện.
  // Ảnh timeline chung: bật sau khi upload đủ bộ tên file trong hướng dẫn.
  anhTimeline: {bat:true, thuMuc:'img/timeline', duoi:'jpg'},
  goi: {
    /* Hai gói sào ruộng hiện hành. Trong từng vụ, quyền lợi trải nghiệm
       nêu rõ Lễ Tịch Điền và Lễ cúng mừng lúa mới; các hoạt động Tour/MICE
       thuộc "Sự kiện độc bản" là chương trình riêng, không trộn vào selector gói. */
    'gieo-mam': {nhan:'Người gieo mầm', hoatDong:['le-xuong-dong','com-moi'], doiTuong:'Trải nghiệm dành cho Người gieo mầm.'},
    'doi-tac': {nhan:'Đối tác cách mạng di sản', hoatDong:['le-xuong-dong','com-moi'], doiTuong:'Trải nghiệm dành cho Đối tác cách mạng di sản.'}
  },
  /* Chỉ gán các trải nghiệm được mô tả trong gói hiện có.
   * Lễ cúng chưa được nêu rõ trong quyền lợi gói nên vẫn hiện công khai,
   * chưa đánh dấu bao gồm. Khi chốt, thêm le-xuong-dong / com-moi ở trên.
   * Có thể ghi đè quyền lợi từng vụ: 'CKOD:HT26': { 'doi-tac': [...] }.
   */
  quyenLoiTheoVu: {},
  /* Ảnh riêng của từng vụ, ví dụ:
   * 'CKOD:HT26': { 'ngay-hoi-gat': {anh:'img/...jpg'} }
   * Ngày của mọi mốc sửa trong DB VỤ MÙA (Notion).
   * Các khóa ngay/trangThai của cấu hình cũ không còn ghi đè ngày Notion.
   */
  suKienTheoVu: {}
};
