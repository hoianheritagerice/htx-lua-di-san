/* HTX — đồng bộ phân bón từ DB Mã sản phẩm, 07/10/2026.
 * Thêm file này vào dự án Apps Script ĐANG CHẠY.
 * Đổi tên duy nhất định nghĩa handleGetHistory_ cũ thành handleGetHistoryBase_.
 * Không đổi các nơi gọi hàm; không thay phần xác thực hiện tại.
 */
function handleGetHistory_(req) {
  // Hàm gốc kiểm tra token/linkKey và quyền xem trước khi đọc dữ liệu bổ sung.
  const result = handleGetHistoryBase_(req);
  if (!result || !result.ok || !Array.isArray(result.entries)) return result;
  const productId = findProductPageId_(req.productCode);
  if (!productId) return result;
  const page = notionFetch_('https://api.notion.com/v1/pages/' + productId, 'get', null);
  return ganPhanBonTuHoSo_(result, page.properties || {});
}

function docCacLanBon_(props) {
  const rounds = [];
  for (let i = 1; i <= 3; i++) {
    const property = props['Bón lần ' + i];
    if (!property || !property.formula || property.formula.type !== 'string') {
      throw 'Cột Bón lần ' + i + ' trong Notion chưa sẵn sàng. Vui lòng kiểm tra cấu hình.';
    }
    const summary = property.formula.string || '';
    if (!summary.trim()) continue;
    rounds.push({
      lan: i,
      date: (dateVal_(props['Ngày bón phân lần ' + i]) || '').slice(0, 10),
      // Bỏ dòng ngày vì Nhật ký đã có ngày ở đầu bản ghi.
      noiDung: summary.split('\n').slice(1).join('\n'),
      tomTat: summary
    });
  }
  return rounds;
}

function laBanGhiBonThucTe_(entry) {
  if (entry.status !== 'Hoàn thành') return false;
  const title = String(entry.title || '').toLowerCase();
  // Một công việc vừa vận chuyển vừa bón vẫn là bón thực tế.
  const thaoTacBon = /(?:rải|bón)\s+phân/.test(title);
  if (/(?:tập kết|tập huấn|chuẩn bị|đặt phân)/.test(title)) return false;
  if (/(?:vận chuyển|nhận phân)/.test(title) && !thaoTacBon) return false;
  return (entry.hoatDong || []).indexOf('Bón phân') !== -1 || thaoTacBon;
}

function ganPhanBonTuHoSo_(result, props) {
  const rounds = docCacLanBon_(props);
  // Xóa trường kg cũ để không xuất song song hai cách gán phân khác nhau.
  const entries = result.entries.map(function (entry) {
    const copy = Object.assign({}, entry);
    delete copy.phanKg;
    delete copy.phanLoai;
    copy.phanBon = [];
    return copy;
  });
  const missingDates = [];
  rounds.forEach(function (round) {
    if (!round.date) { missingDates.push(round); return; }
    const candidates = entries.filter(function (entry) {
      return String(entry.date || '').slice(0, 10) === round.date
        && laBanGhiBonThucTe_(entry);
    }).sort(function (a, b) {
      // Ưu tiên task rải/bón rõ ràng, rồi chọn ổn định theo ID.
      const score = function (entry) {
        return /(?:rải|bón)\s+phân/i.test(String(entry.title || '')) ? 1 : 0;
      };
      return score(b) - score(a) || String(a.pageId || '').localeCompare(String(b.pageId || ''));
    });
    let target = candidates[0];
    if (!target) {
      // Ngày của thửa là nguồn gốc; không sửa ngày theo task chung cánh đồng.
      target = entries.find(function (entry) {
        return entry.nguonPhanBon === 'hoSoThua' && entry.date === round.date;
      });
      if (!target) {
        target = {
          pageId: 'phan-bon-' + round.date,
          date: round.date,
          title: 'Bón phân theo hồ sơ thửa',
          status: '', nhom: 'Canh tác', hoatDong: ['Bón phân'],
          nss: null, giaiDoan: '', desc: '', media: null, url: '',
          nguonPhanBon: 'hoSoThua', phanBon: []
        };
        entries.push(target);
      }
    }
    target.phanBon.push(round);
  });
  entries.sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
  return Object.assign({}, result, {
    entries: entries,
    phanBonChuaCoNgay: missingDates,
    phanBonVersion: 1
  });
}
