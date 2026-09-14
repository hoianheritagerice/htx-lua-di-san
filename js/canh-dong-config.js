/* Nội dung bổ sung của tab Cánh đồng.
 * Mô tả và tên gói vẫn đọc từ NOI_DUNG trong noi-dung.js.
 * Ảnh: thêm {thumb, src, chu} vào anh của đúng cánh đồng; không cần đủ 20.
 * thumb: ảnh nhỏ 480–640px. src: ảnh lớn 1600–2000px chỉ tải khi mở xem.
 * Lưu file trong img/canh-dong/<ma-dong>/; không dùng link Notion hết hạn.
 * Quyền lợi dùng mã hoạt động ổn định, không dò tên trong nhật ký.
 */
const CAU_HINH_CANH_DONG = {
  dong: {
    CKOD: {slug:'ong-dang', ten:'Ông Đảng', anh:[], thuVien:{soAnh:0,duoi:'jpg',coAnhNho:false}},
    CTDC: {slug:'dong-cao', ten:'Đồng Cao', anh:[], thuVien:{soAnh:0,duoi:'jpg',coAnhNho:false}},
    CTDM: {slug:'dong-mau', ten:'Đồng Mẫu', anh:[], thuVien:{soAnh:0,duoi:'jpg',coAnhNho:false}}
  },
  // Sau khi upload 01.jpg ... 15.jpg vào img/canh-dong/ckod (hoặc ctdc/ctdm),
  // đổi soAnh:0 thành soAnh:15 của đúng đồng. Ảnh bìa không thuộc thư viện.
  // Ảnh timeline chung: bật sau khi upload đủ bộ tên file trong hướng dẫn.
  anhTimeline: {bat:false, thuMuc:'img/timeline', duoi:'jpg'},
  goi: {
    'gieo-mam': {nhan:'Người gieo mầm', hoatDong:['xuong-giong','tham-dong','ngay-hoi-gat'], doiTuong:'Trải nghiệm dành cho gia đình.'},
    'dong-kien-tao': {nhan:'Người đồng kiến tạo', hoatDong:['xuong-giong','tham-dong','ngay-hoi-gat'], doiTuong:'Trải nghiệm dành cho nhân viên, khách hàng và đối tác.'},
    'doi-tac': {nhan:'Đối tác kiến tạo di sản', hoatDong:['xuong-giong','tham-dong','ngay-hoi-gat'], doiTuong:'Trải nghiệm dành cho doanh nghiệp đồng hành.'}
  },
  /* Chỉ gán các trải nghiệm được mô tả trong gói hiện có.
   * Lễ cúng chưa được nêu rõ trong quyền lợi gói nên vẫn hiện công khai,
   * chưa đánh dấu bao gồm. Khi chốt, thêm le-xuong-dong / com-moi ở trên.
   * Có thể ghi đè quyền lợi từng vụ: 'CKOD:HT26': { 'doi-tac': [...] }.
   */
  quyenLoiTheoVu: {},
  /* Ngày sự kiện do HTX xác nhận, ví dụ:
   * 'CKOD:HT26': { 'ngay-hoi-gat': {ngay:'2026-09-12', trangThai:'Đã diễn ra', anh:'img/...jpg'} }
   * Trạng thái: Dự kiến / Đã xác nhận lịch / Đã diễn ra / Hoãn / Hủy.
   */
  suKienTheoVu: {}
};
