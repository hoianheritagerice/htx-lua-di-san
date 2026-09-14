/* SỐ CHỐT GIỚI THIỆU — không gọi API, không thay đổi khi đổi mùa vụ.
 * Nguồn: ORIGINAL DATABASE > NÔNG DÂN > Thông tin Thửa Đất, đọc 14/09/2026.
 * https://app.notion.com/37e1c9d219fa8005b438f85823107346
 * Đã đọc đầy đủ 82 dòng (has_more=false), không mã trùng, không thiếu diện tích/người.
 * Thửa: Mã Thửa phân biệt. Hộ: relation Người Canh tác phân biệt trong mỗi đồng.
 * Diện tích: tổng Diện tích thửa (m2), mỗi mã chỉ cộng một lần.
 * Bao gồm mọi thửa, không lọc hữu cơ, không cộng Mã Sản phẩm theo mùa vụ.
 * Muốn chốt lại: đối chiếu Notion rồi sửa có chủ đích file này.
 */
const SO_CHOT_CANH_DONG = Object.freeze({
  ngayChot:'2026-09-14',
  CKOD:Object.freeze({soThua:21,soHo:18,dienTich:17056.1}),
  CTDC:Object.freeze({soThua:41,soHo:32,dienTich:15479}),
  CTDM:Object.freeze({soThua:20,soHo:19,dienTich:14538})
});
