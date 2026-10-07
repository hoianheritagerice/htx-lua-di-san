/* Chỉ hiển thị các lượng phân dương từ nội dung Notion/API. */
(function (root) {
  'use strict';
  function cacLuongDaBon(round) {
    return String(round.noiDung || '').split(/\r?\n/).map(function (line) {
      return line.trim();
    }).filter(function (line) {
      // Mỗi dòng theo hợp đồng: tên loại: số kg. Giữ nguyên cách viết số.
      // Không đưa ô trống/chưa có lượng, 0 hoặc số âm lên Nhật ký khách xem.
      var match = line.match(/^[^:\n]+:\s*(\d[\d.,\s]*)\s*kg\s*$/i);
      return match && /[1-9]/.test(match[1]);
    });
  }
  function chiTiet(round, esc) {
    var lines = cacLuongDaBon(round);
    if (!lines.length) return '';
    return '<div class="nk-phan-khoi"><strong>Bón lần ' + esc(round.lan)
      + ' · Lượng của thửa</strong><div>'
      + lines.map(esc).join('<br>') + '</div></div>';
  }
  function nhan(entry, esc) {
    // Khi API mới đã trả phanBon, tuyệt đối không vẽ thêm số kg kiểu cũ.
    if (Array.isArray(entry.phanBon)) return entry.phanBon.map(function (round) {
      return chiTiet(round, esc);
    }).join('');
    // Tương thích trong lúc chủ dự án chưa deploy Apps Script mới.
    if (!(Number(entry.phanKg) > 0)) return '';
    return '<span class="nk-tt nk-phan">🌱 ' + esc(entry.phanKg) + ' kg'
      + (entry.phanLoai ? ' ' + esc(entry.phanLoai) : '') + '</span>';
  }
  function chuaCoNgay(rounds, esc) {
    if (!Array.isArray(rounds) || !rounds.length) return '';
    var details = rounds.map(function (round) { return chiTiet(round, esc); }).join('');
    if (!details) return '';
    return '<div class="nk-phan-thieu"><strong>Số kg đã ghi, chưa có ngày bón</strong>'
      + details + '</div>';
  }
  const api = { nhan: nhan, chuaCoNgay: chuaCoNgay };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HTXPhanBon = api;
})(typeof window !== 'undefined' ? window : this);
