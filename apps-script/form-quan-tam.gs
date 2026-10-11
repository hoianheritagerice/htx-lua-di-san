/*
 * Dán nguyên file này thành một tệp .gs MỚI trong dự án Apps Script
 * đang phục vụ URL /exec của website. KHÔNG tạo thêm doPost.
 *
 * Trong switch (req.action) của doPost hiện có, thêm:
 * case 'dangKyTuVan': return jsonOut_(handleDangKyTuVan_(req));
 *
 * Trước khi triển khai, chạy khoiTaoBangTuVan() một lần bằng tài khoản
 * sở hữu Apps Script. URL Google Sheets hiện trong Execution log.
 */

const TU_VAN_SHEET = {
  property: 'TU_VAN_SHEET_ID',
  tab: 'Đăng ký tư vấn',
  headers: [
    'Thời gian', 'Họ và tên', 'Số điện thoại', 'Chương trình quan tâm',
    'Thông tin thêm', 'Trang gửi', 'Trạng thái', 'Ghi chú nội bộ'
  ]
};

function khoiTaoBangTuVan() {
  const props = PropertiesService.getScriptProperties();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let id = props.getProperty(TU_VAN_SHEET.property);
    if (id) {
      const url = SpreadsheetApp.openById(id).getUrl();
      Logger.log('Bảng đăng ký tư vấn: ' + url);
      return url;
    }

    const book = SpreadsheetApp.create('HTX Lúa Di Sản - Đăng ký tư vấn');
    book.setSpreadsheetTimeZone('Asia/Ho_Chi_Minh');
    const sheet = book.getSheets()[0];
    sheet.setName(TU_VAN_SHEET.tab);
    sheet.getRange(1, 1, 1, TU_VAN_SHEET.headers.length)
      .setValues([TU_VAN_SHEET.headers])
      .setBackground('#1e4d2b')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 165);
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, 155);
    sheet.setColumnWidth(4, 230);
    sheet.setColumnWidth(5, 360);
    sheet.setColumnWidth(6, 140);
    sheet.setColumnWidth(7, 125);
    sheet.setColumnWidth(8, 260);
    sheet.getRange('C:C').setNumberFormat('@'); // Giữ số 0 đầu số điện thoại.

    id = book.getId();
    props.setProperty(TU_VAN_SHEET.property, id);
    Logger.log('Đã tạo bảng đăng ký tư vấn: ' + book.getUrl());
    return book.getUrl();
  } finally {
    lock.releaseLock();
  }
}

function handleDangKyTuVan_(req) {
  const ten = tuVanText_(req.hoTen, 120);
  const so = String(req.soDienThoai || '').replace(/[^0-9]/g, '');
  const sdt = /^84\d{9}$/.test(so) ? '0' + so.slice(2) : so;
  if (!ten || !/^0\d{9}$/.test(sdt)) {
    return { ok: false, error: 'Họ tên hoặc số điện thoại không hợp lệ.' };
  }

  const id = PropertiesService.getScriptProperties().getProperty(TU_VAN_SHEET.property);
  if (!id) return { ok: false, error: 'Bảng tư vấn chưa được thiết lập.' };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(id).getSheetByName(TU_VAN_SHEET.tab);
    if (!sheet) throw new Error('Không tìm thấy tab đăng ký tư vấn.');
    const next = sheet.getLastRow() + 1;
    sheet.getRange(next, 1, 1, TU_VAN_SHEET.headers.length).setValues([[
      new Date(),
      ten,
      sdt,
      tuVanText_(req.goiQuanTam, 150),
      tuVanText_(req.thongTinThem, 1500),
      tuVanText_(req.trangGui, 100),
      'Mới',
      ''
    ]]);
    sheet.getRange(next, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function tuVanText_(value, maxLength) {
  const text = String(value == null ? '' : value)
    .replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength);
  // Dữ liệu nhập từ web không được trở thành công thức trong Google Sheets.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
