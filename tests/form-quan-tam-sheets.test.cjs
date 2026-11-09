const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('Tư vấn tạo một bảng và chỉ ghi liên hệ hợp lệ dưới dạng văn bản an toàn', () => {
  const state = { properties: {}, created: 0, rows: [], locks: 0 };
  const sheet = {
    setName() {}, setFrozenRows() {}, setColumnWidth() {},
    getSheets() { return [this]; },
    getSheetByName(name) { return name === 'Đăng ký tư vấn' ? this : null; },
    getLastRow() { return state.rows.length; },
    getRange() {
      return {
        setValues(values) { state.rows.push(...values); return this; },
        setBackground() { return this; },
        setFontColor() { return this; },
        setFontWeight() { return this; },
        setNumberFormat() { return this; }
      };
    }
  };
  const book = {
    getId: () => 'sheet-123',
    getUrl: () => 'https://docs.google.com/spreadsheets/d/sheet-123/edit',
    setSpreadsheetTimeZone(zone) { assert.equal(zone, 'Asia/Ho_Chi_Minh'); },
    getSheets: () => [sheet],
    getSheetByName: name => sheet.getSheetByName(name)
  };
  const context = {
    Date, Logger: { log() {} },
    LockService: { getScriptLock: () => ({
      waitLock() { state.locks++; },
      releaseLock() { state.locks--; }
    }) },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: key => state.properties[key],
      setProperty: (key, value) => { state.properties[key] = value; }
    }) },
    SpreadsheetApp: {
      create() { state.created++; return book; },
      openById(id) { assert.equal(id, 'sheet-123'); return book; }
    }
  };
  vm.createContext(context);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '../apps-script/form-quan-tam.gs'), 'utf8'),
    context
  );

  assert.equal(context.khoiTaoBangTuVan(), book.getUrl());
  assert.equal(context.khoiTaoBangTuVan(), book.getUrl());
  assert.equal(state.created, 1);
  assert.equal(state.rows.length, 1);
  assert.equal(context.handleDangKyTuVan_({ hoTen: 'A', soDienThoai: 'abc' }).ok, false);
  assert.equal(state.rows.length, 1);

  const result = context.handleDangKyTuVan_({
    hoTen: '=HYPERLINK("bad")', soDienThoai: '+84 931 945 795',
    goiQuanTam: 'Người gieo mầm di sản', thongTinThem: '=1+1',
    trangGui: 'san-pham.html'
  });
  assert.equal(result.ok, true);
  assert.equal(state.rows.length, 2);
  assert.equal(state.rows[1][1], '\'=HYPERLINK("bad")');
  assert.equal(state.rows[1][2], '0931945795');
  assert.equal(state.rows[1][4], "'=1+1");
  assert.equal(state.rows[1][6], 'Mới');
  assert.equal(state.locks, 0);
});
