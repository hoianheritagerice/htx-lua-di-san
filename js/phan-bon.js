/* Chỉ hiển thị nội dung tổng hợp do Notion/API cung cấp. */
(function (root) {
  'use strict';
  function chiTiet(round, esc) {
    return '<div class="nk-phan-khoi"><strong>Bón lần ' + esc(round.lan)
      + ' · Lượng của thửa</strong><div>'
      + String(round.noiDung || '').split('\n').map(esc).join('<br>') + '</div></div>';
  }
  function nhan(entry, esc) {
    // Khi API mới đã trả phanBon, tuyệt đối không vẽ thêm số kg kiểu cũ.
    if (Array.isArray(entry.phanBon)) return entry.phanBon.map(function (round) {
      return chiTiet(round, esc);
    }).join('');
    // Tương thích trong lúc chủ dự án chưa deploy Apps Script mới.
    if (entry.phanKg == null) return '';
    return '<span class="nk-tt nk-phan">🌱 ' + esc(entry.phanKg) + ' kg'
      + (entry.phanLoai ? ' ' + esc(entry.phanLoai) : '') + '</span>';
  }
  function chuaCoNgay(rounds, esc) {
    if (!Array.isArray(rounds) || !rounds.length) return '';
    return '<div class="nk-phan-thieu"><strong>Số kg đã ghi, chưa có ngày bón</strong>'
      + rounds.map(function (round) { return chiTiet(round, esc); }).join('') + '</div>';
  }
  const api = { nhan: nhan, chuaCoNgay: chuaCoNgay };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HTXPhanBon = api;
})(typeof window !== 'undefined' ? window : this);
