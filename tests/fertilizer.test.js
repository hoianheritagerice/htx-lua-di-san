const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const renderer = require('../js/phan-bon.js');
const source = fs.readFileSync(path.join(__dirname, '../apps-script/PhanBonNhatKy.gs'), 'utf8');
const props = (items) => Object.fromEntries([1, 2, 3].flatMap(i => {
  const item = items[i] || {};
  return [
    ['Bón lần ' + i, {formula: {type: 'string', string: item.text || ''}}],
    ['Ngày bón phân lần ' + i, {date: {start: item.date || null}}]
  ];
}));
const context = (extra = {}) => vm.createContext({
  dateVal_: p => p && p.date && p.date.start,
  ...extra
});
const run = (result, p) => {
  const c = context(); vm.runInContext(source, c);
  return JSON.parse(JSON.stringify(c.ganPhanBonTuHoSo_(result, p)));
};
const entry = (id, title, status = 'Hoàn thành', date = '2026-06-21') => ({
  pageId: id, title, date, status, hoatDong: ['Bón phân'], phanKg: 999, phanLoai: 'cũ'
});
const mix = props({1: {date: '2026-06-21', text: '21/06/2026\nPhân bò compost: 160 kg\nBánh dầu ủ (đợt 1): 15 kg'}});
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

test('một lần bón giữ đủ hai loại và số kg, chỉ gắn một task thực tế', () => {
  const result = run({ok: true, entries: [entry('t', 'Vận chuyển và nhận phân bón'), entry('a', 'Rải phân đợt 1'), entry('b', 'Bón phân đợt 1')]}, mix);
  assert.equal(result.entries.filter(e => e.phanBon.length).length, 1);
  assert.equal(result.entries.find(e => e.pageId === 'a').phanBon[0].noiDung, 'Phân bò compost: 160 kg\nBánh dầu ủ (đợt 1): 15 kg');
  assert.equal(result.entries.find(e => e.pageId === 't').phanBon.length, 0);
  assert.ok(result.entries.every(e => !('phanKg' in e) && !('phanLoai' in e)));
});

test('ngày riêng của thửa không bị thay bằng ngày task cánh đồng', () => {
  const p = props({1: {date: '2026-07-06', text: '06/07/2026\nBánh dầu ủ (đợt 1): 12 kg'}});
  const result = run({ok: true, entries: [entry('a', 'Rải phân đợt 1')]}, p);
  const fertilizer = result.entries.find(e => e.phanBon.length);
  assert.equal(fertilizer.date, '2026-07-06');
  assert.equal(fertilizer.nguonPhanBon, 'hoSoThua');
  assert.equal(result.entries.find(e => e.pageId === 'a').phanBon.length, 0);
});

test('thiếu ngày được tách riêng, không tạo sự kiện ngày bón', () => {
  const p = props({1: {text: 'Chưa có ngày bón\nPhân bò compost: 160 kg\nBánh dầu ủ (đợt 1): 15 kg'}});
  const result = run({ok: true, entries: []}, p);
  assert.equal(result.entries.length, 0);
  assert.equal(result.phanBonChuaCoNgay.length, 1);
  assert.match(renderer.chuaCoNgay(result.phanBonChuaCoNgay, esc), /chưa có ngày bón/);
});

test('không gắn lượng thực tế vào kế hoạch hay tập huấn', () => {
  const result = run({ok: true, entries: [entry('p', 'Bón phân đợt 1', 'Chưa thực hiện'), entry('h', 'Tập huấn chăm sóc và bón phân')]}, mix);
  assert.ok(result.entries.filter(e => ['p', 'h'].includes(e.pageId)).every(e => !e.phanBon.length));
  assert.equal(result.entries.filter(e => e.phanBon.length).length, 1);
});

test('hai lần cùng ngày được gộp một dòng hồ sơ, dữ liệu không lặp khi chạy lại', () => {
  const p = props({1: {date: '2026-06-21', text: '21/06/2026\nCompost: 160 kg'}, 2: {date: '2026-06-21', text: '21/06/2026\nBánh dầu: 15 kg'}});
  const result = run({ok: true, entries: []}, p);
  assert.equal(result.entries.length, 1);
  assert.equal(result.entries[0].phanBon.length, 2);
  assert.deepEqual(run(result, p), result);
});

test('wrapper bảo toàn từ chối quyền, không đọc Notion sau khi bị từ chối', () => {
  let reads = 0;
  const c = context({handleGetHistoryBase_: () => ({ok: false, error: 'Không có quyền'}), findProductPageId_: () => { reads++; }});
  vm.runInContext(source, c);
  assert.equal(c.handleGetHistory_({linkKey: 'denied'}).ok, false);
  assert.equal(reads, 0);
  c.handleGetHistoryBase_ = () => { throw 'Không có quyền'; };
  assert.throws(() => c.handleGetHistory_({}), e => e === 'Không có quyền');
  assert.equal(reads, 0);
});

test('wrapper giữ nguyên token/linkKey và nội dung được phép, đọc đúng thửa', () => {
  const req = {productCode: 'CTDC-BE1-HT26-VNR20', token: 'test', linkKey: 'test'};
  const c = context({
    handleGetHistoryBase_: r => { assert.equal(r, req); return {ok: true, entries: [entry('a', 'Rải phân đợt 1')], detailAccess: true}; },
    findProductPageId_: code => { assert.equal(code, req.productCode); return 'plot-id'; },
    notionFetch_: (url, method) => { assert.equal(url, 'https://api.notion.com/v1/pages/plot-id'); assert.equal(method, 'get'); return {properties: mix}; }
  });
  vm.runInContext(source, c);
  const result = c.handleGetHistory_(req);
  assert.equal(result.detailAccess, true);
  assert.equal(result.entries[0].phanBon.length, 1);
});

test('cấu hình thiếu không âm thầm trả lượng cũ sai loại', () => {
  assert.throws(() => run({ok: true, entries: []}, {}), e => String(e).includes('chưa sẵn sàng'));
});

test('hiển thị escape nội dung Notion và tương thích API cũ không chồng số kg', () => {
  const html = renderer.nhan({phanKg: 999, phanBon: [{lan: 1, noiDung: '<script>alert(1)</script>\nCompost: 160 kg'}]}, esc);
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('999'));
  assert.match(html, /160 kg/);
  assert.match(renderer.nhan({phanKg: 15, phanLoai: 'bánh dầu'}, esc), /15 kg/);
  assert.equal(renderer.nhan({phanKg: 15, phanBon: []}, esc), '');
});

test('chỉ hiện loại có lượng dương trong lần bón', () => {
  for (const [body,shown,hidden] of [
    ['Phân bò compost: 0 kg\nBánh dầu: 15 kg', 'Bánh dầu: 15 kg', 'Phân bò compost'],
    ['Phân bò compost: 160 kg\nBánh dầu: 0 kg', 'Phân bò compost: 160 kg', 'Bánh dầu'],
    ['Phân bò compost: Chưa có số kg\nBánh dầu: 15 kg', 'Bánh dầu: 15 kg', 'Phân bò compost']
  ]) {
    const html = renderer.nhan({phanBon: [{lan: 1, noiDung: body}]}, esc);
    assert.ok(html.includes(shown));
    assert.ok(!html.includes(hidden));
    assert.ok(!html.includes('Chưa có số kg'));
  }
});
test('bón hai loại giữ đủ tên và lượng của cả hai', () => {
  const html = renderer.nhan({phanBon: [{lan: 3, noiDung: 'Phân bò compost: 80 kg\r\nBánh dầu: 20 kg'}]}, esc);
  assert.match(html, /Bón lần 3/);
  assert.ok(html.includes('Phân bò compost: 80 kg<br>Bánh dầu: 20 kg'));
});
test('không tạo khối phân bón rỗng cho lượng 0, thiếu hoặc âm', () => {
  for (const noiDung of ['', 'Phân bò compost: 0 kg\nBánh dầu: 0,00 kg', 'Phân bò compost: Chưa có số kg', 'Hai loại đều 0 kg — kiểm tra lại lần bón', 'Bánh dầu: -5 kg']) {
    const rounds = [{lan: 1, noiDung}];
    assert.equal(renderer.nhan({phanBon: rounds}, esc), '');
    assert.equal(renderer.chuaCoNgay(rounds, esc), '');
  }
});
test('giữ số thập phân và cách viết số, ẩn mọi dạng số 0', () => {
  for (const qty of ['0.5', '0,5', '1.200,5', '1,200.5', '1 200,5']) {
    assert.ok(renderer.nhan({phanBon: [{lan: 1, noiDung: 'Bánh dầu: ' + qty + ' kg'}]}, esc).includes(qty + ' kg'));
  }
  for (const qty of ['0', '00', '0.0', '0,00', '0.000,00']) {
    assert.equal(renderer.nhan({phanBon: [{lan: 1, noiDung: 'Bánh dầu: ' + qty + ' kg'}]}, esc), '');
  }
});
test('mục thiếu ngày chỉ hiện lượng dương, không hiện loại chưa có lượng', () => {
  const html = renderer.chuaCoNgay([{lan: 2, noiDung: 'Phân bò compost: Chưa có số kg\nBánh dầu: 20 kg'}], esc);
  assert.match(html, /chưa có ngày bón/);
  assert.ok(html.includes('Bánh dầu: 20 kg'));
  assert.ok(!html.includes('Phân bò compost'));
});
test('API cũ cũng ẩn lượng bằng 0, âm hoặc không hợp lệ', () => {
  for (const phanKg of [0, -1, null, undefined, '', '0', 'không có']) {
    assert.equal(renderer.nhan({phanKg, phanLoai: 'Bánh dầu'}, esc), '');
  }
  assert.match(renderer.nhan({phanKg: 7.5, phanLoai: 'Bánh dầu'}, esc), /7.5 kg/);
});
test('escape tên loại của dòng lượng dương trước khi đưa vào HTML', () => {
  const html = renderer.nhan({phanBon: [{lan: 1, noiDung: '<img src=x onerror=alert(1)>: 15 kg'}]}, esc);
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;img'));
});
