/**********************************************************************
 * js/form-quan-tam.js — FORM ĐĂNG KÝ NHẬN TƯ VẤN (dùng chung mọi trang)
 *
 * Cách dùng: nạp file này ở cuối trang, rồi gắn vào nút bất kỳ:
 *     <button onclick="moFormQuanTam('Người gieo mầm')">Tôi quan tâm gói này</button>
 *
 * File này tự chèn giao diện và kiểu dáng, không cần sửa HTML hay CSS.
 **********************************************************************/
(function () {
  'use strict';

  /* ========== CẤU HÌNH — sửa ở đây ========== */
  var ZALO      = '0931945795';
  var API       = (typeof API_URL !== 'undefined') ? API_URL : '';
  var CHO_PHUT  = 24;          // hứa liên hệ trong bao nhiêu giờ

  /* ========== KIỂU DÁNG ========== */
  var css = document.createElement('style');
  css.textContent = [
    '.fqt-nen{position:fixed;inset:0;background:rgba(20,28,15,.58);display:none;',
    '  align-items:center;justify-content:center;z-index:120;padding:16px;backdrop-filter:blur(2px)}',
    '.fqt-nen.mo{display:flex;animation:fqtHien .25s ease}',
    '@keyframes fqtHien{from{opacity:0}to{opacity:1}}',
    '.fqt-hop{background:#fffdf8;width:100%;max-width:440px;border-radius:20px;',
    '  padding:28px 26px 26px;position:relative;max-height:92vh;overflow:auto;',
    '  animation:fqtLen .3s cubic-bezier(.22,.61,.36,1)}',
    '@keyframes fqtLen{from{transform:translateY(18px);opacity:0}to{transform:none;opacity:1}}',
    '.fqt-x{position:absolute;top:14px;right:16px;background:none;border:none;font-size:24px;',
    '  color:#a8ac9c;cursor:pointer;line-height:1;padding:4px;font-family:inherit}',
    '.fqt-x:hover{color:#2b3524}',
    '.fqt-nhan{font-size:11.5px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#b5734a}',
    '.fqt-hop h3{font-family:"Playfair Display",Georgia,serif;font-size:24px;font-weight:600;',
    '  color:#1e4d2b;margin:6px 0 4px;line-height:1.2}',
    '.fqt-goi{font-size:14px;color:#5a6350;margin-bottom:18px}',
    '.fqt-goi b{color:#1e4d2b}',
    '.fqt-o{margin-bottom:13px}',
    '.fqt-o label{display:block;font-size:12.5px;font-weight:600;margin-bottom:5px;color:#41503a}',
    '.fqt-o label i{color:#b5734a;font-style:normal}',
    '.fqt-o input,.fqt-o textarea{width:100%;font-family:inherit;font-size:15px;padding:12px 13px;',
    '  border:1.5px solid #d5cdb7;border-radius:11px;background:#fff;color:#2b3524;transition:border-color .2s}',
    '.fqt-o input:focus,.fqt-o textarea:focus{outline:none;border-color:#6f9e4b}',
    '.fqt-o textarea{resize:vertical;min-height:74px;line-height:1.5}',
    '.fqt-o input::placeholder,.fqt-o textarea::placeholder{color:#a8ac9c}',
    '.fqt-loi{color:#b03c2a;font-size:13px;margin:2px 0 12px;min-height:18px}',
    '.fqt-gui{width:100%;padding:15px;border:none;border-radius:30px;background:#1e4d2b;color:#fff;',
    '  font-family:inherit;font-size:15.5px;font-weight:700;cursor:pointer;',
    '  transition:transform .25s cubic-bezier(.34,1.35,.64,1),box-shadow .25s,filter .25s}',
    '.fqt-gui:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(30,77,43,.3);filter:brightness(1.08)}',
    '.fqt-gui:disabled{opacity:.6;cursor:default;transform:none;box-shadow:none}',
    '.fqt-rieng{font-size:11.5px;color:#8a9180;text-align:center;margin-top:13px;line-height:1.5}',
    '.fqt-mat{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}',
    /* màn hình cảm ơn */
    '.fqt-xong{text-align:center;padding:10px 0 4px}',
    '.fqt-tick{width:66px;height:66px;border-radius:50%;background:#e6f2d8;color:#4f7325;',
    '  display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:32px;',
    '  animation:fqtTick .45s cubic-bezier(.34,1.5,.64,1)}',
    '@keyframes fqtTick{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}',
    '.fqt-xong h3{margin-bottom:12px}',
    '.fqt-xong p{font-size:15px;color:#41503a;margin-bottom:10px;line-height:1.6}',
    '.fqt-zalo{display:inline-flex;align-items:center;gap:8px;margin-top:8px;background:#faf6ea;',
    '  border:1px dashed #d8c48f;border-radius:13px;padding:11px 16px;font-size:13.5px;color:#6b5a3a;',
    '  text-decoration:none;transition:background .2s}',
    '.fqt-zalo:hover{background:#f5eeda}',
    '.fqt-zalo b{color:#b5734a;font-size:15px}',
    '@media(max-width:480px){.fqt-hop{padding:24px 20px 22px}.fqt-hop h3{font-size:21px}}'
  ].join('');
  document.head.appendChild(css);

  /* ========== GIAO DIỆN ========== */
  var nen = document.createElement('div');
  nen.className = 'fqt-nen';
  nen.id = 'fqtNen';
  nen.innerHTML =
    '<div class="fqt-hop" role="dialog" aria-modal="true">' +
      '<button class="fqt-x" aria-label="Đóng">&times;</button>' +
      '<div id="fqtThan"></div>' +
    '</div>';
  document.body.appendChild(nen);

  var $ = function (id) { return document.getElementById(id); };
  var goiHienTai = '';

  /* ========== MỞ / ĐÓNG ========== */
  window.moFormQuanTam = function (tenGoi) {
    goiHienTai = tenGoi || '';
    $('fqtThan').innerHTML = thanForm();
    ganSuKien();
    $('fqtGoi').innerHTML = goiHienTai
      ? 'Anh/Chị đang quan tâm gói <b>' + goiHienTai + '</b>. Nhân viên HTX sẽ liên hệ để tư vấn chi tiết.'
      : 'Nhân viên HTX sẽ liên hệ để tư vấn chi tiết cho Anh/Chị.';
    nen.classList.add('mo');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var t = $('fqtTen'); if (t) t.focus(); }, 260);
  };

  function dong() {
    nen.classList.remove('mo');
    document.body.style.overflow = '';
  }
  window.dongFormQuanTam = dong;

  nen.addEventListener('click', function (e) { if (e.target === nen) dong(); });
  nen.querySelector('.fqt-x').addEventListener('click', dong);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nen.classList.contains('mo')) dong();
  });

  /* ========== NỘI DUNG FORM ========== */
  function thanForm() {
    return '' +
      '<div class="fqt-nhan">Đăng ký nhận tư vấn</div>' +
      '<h3>Để lại thông tin liên hệ</h3>' +
      '<div class="fqt-goi" id="fqtGoi"></div>' +
      '<div class="fqt-o"><label>Họ và tên <i>*</i></label>' +
        '<input id="fqtTen" autocomplete="name" placeholder="Nguyễn Văn A"></div>' +
      '<div class="fqt-o"><label>Số điện thoại <i>*</i></label>' +
        '<input id="fqtSdt" type="tel" inputmode="tel" autocomplete="tel" placeholder="09xx xxx xxx"></div>' +
      '<div class="fqt-o"><label>Thông tin thêm</label>' +
        '<textarea id="fqtThem" placeholder="Giờ tiện liên hệ, hoặc điều Anh/Chị muốn hỏi thêm (không bắt buộc)"></textarea></div>' +
      '<input class="fqt-mat" id="fqtBay" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="fqt-loi" id="fqtLoi"></div>' +
      '<button class="fqt-gui" id="fqtGui">Gửi thông tin</button>' +
      '<div class="fqt-rieng">Thông tin của Anh/Chị chỉ dùng để liên hệ tư vấn,<br>không chia sẻ cho bên thứ ba.</div>';
  }

  function ganSuKien() {
    $('fqtGui').addEventListener('click', gui);
    ['fqtTen', 'fqtSdt'].forEach(function (id) {
      $(id).addEventListener('keydown', function (e) { if (e.key === 'Enter') gui(); });
    });
  }

  /* ========== KIỂM TRA & GỬI ========== */
  function sdtHopLe(s) {
    var so = s.replace(/[^0-9]/g, '');
    return /^0\d{9}$/.test(so) || /^84\d{9}$/.test(so);
  }

  function gui() {
    var ten  = $('fqtTen').value.trim();
    var sdt  = $('fqtSdt').value.trim();
    var them = $('fqtThem').value.trim();
    var loi  = $('fqtLoi');

    if (!ten)  { loi.textContent = 'Anh/Chị vui lòng nhập họ tên.'; $('fqtTen').focus(); return; }
    if (!sdt)  { loi.textContent = 'Anh/Chị vui lòng nhập số điện thoại.'; $('fqtSdt').focus(); return; }
    if (!sdtHopLe(sdt)) { loi.textContent = 'Số điện thoại chưa đúng, Anh/Chị kiểm tra lại giúp.'; $('fqtSdt').focus(); return; }
    if ($('fqtBay').value) { xong(); return; }          // máy gửi rác — im lặng bỏ qua

    loi.textContent = '';
    var nut = $('fqtGui');
    nut.disabled = true;
    nut.textContent = 'Đang gửi…';

    if (!API) { thatBai('Chưa cấu hình đường gửi.'); return; }

    fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        action: 'dangKyTuVan',
        hoTen: ten,
        soDienThoai: sdt,
        thongTinThem: them,
        goiQuanTam: goiHienTai,
        trangGui: location.pathname.split('/').pop() || 'index.html'
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (r && r.ok) xong();
        else thatBai(r && r.error ? r.error : 'Gửi không thành công.');
      })
      .catch(function () { thatBai('Không kết nối được.'); });
  }

  function thatBai(chiTiet) {
    var nut = $('fqtGui');
    if (nut) { nut.disabled = false; nut.textContent = 'Gửi thông tin'; }
    var loi = $('fqtLoi');
    if (loi) {
      loi.innerHTML = 'Rất tiếc, chưa gửi được thông tin. Anh/Chị vui lòng gọi hoặc nhắn Zalo ' +
        '<a href="https://zalo.me/' + ZALO + '" target="_blank" rel="noopener" style="color:#b5734a;font-weight:700">' +
        ZALO + '</a> giúp HTX.';
    }
    if (window.console) console.warn('[form quan tam]', chiTiet);
  }

  function xong() {
    $('fqtThan').innerHTML =
      '<div class="fqt-xong">' +
        '<div class="fqt-tick">✓</div>' +
        '<h3>Đã nhận được thông tin</h3>' +
        '<p>HTX Lúa Di Sản sẽ liên hệ lại với Anh/Chị trong vòng ' + CHO_PHUT + ' giờ.<br>' +
        'Cảm ơn Anh/Chị đã quan tâm.</p>' +
        '<a class="fqt-zalo" href="https://zalo.me/' + ZALO + '" target="_blank" rel="noopener">' +
          'Cần trao đổi ngay? Gọi hoặc nhắn Zalo <b>' + ZALO + '</b>' +
        '</a>' +
      '</div>';
    setTimeout(dong, 9000);
  }
})();
