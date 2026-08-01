/**********************************************************************
 * js/so-lieu-tong.js — MỤC "NHỮNG CON SỐ TỪ CÁNH ĐỒNG THẬT" (trang chủ)
 *
 * Cộng số liệu THẬT của 3 cánh đồng bằng ĐÚNG API mà trang Cánh Đồng
 * đang dùng (`getMapData`). Vì vậy:
 *   - KHÔNG phải sửa Code.gs, KHÔNG phải triển khai lại Apps Script
 *   - Số trên trang chủ và số trên bảng bản đồ luôn khớp nhau
 *
 * Cần `js/chung.js` nạp TRƯỚC (để có goiAPI).
 *
 * ---------------------------------------------------------------
 * CÁCH TÍNH — đọc trước khi sửa
 * ---------------------------------------------------------------
 * "Diện tích canh tác theo hướng hữu cơ"
 *   = cộng `Diện tích (m2)` của các lô CÓ `Canh tác hữu cơ` = đúng,
 *     trong vụ hiện tại, ở cả 3 cánh đồng. Lô không hữu cơ KHÔNG cộng.
 *
 * "Hộ nông dân xã viên tham gia"
 *   = đếm số HỘ khác nhau có ít nhất 1 lô hữu cơ.
 *     Một hộ có 2 thửa (ghi "1/2", "2/2" trong sổ) chỉ tính LÀ MỘT.
 *     Bảng GOP_HO bên dưới là danh sách các cặp đó.
 *
 * ⚠ ĐỪNG cắt số cuối của mã thửa để gộp hộ. Ở Đồng Mẫu có
 *   TU7 = HUỲNH TƯ và TU5 = HUỲNH TỨ — HAI hộ khác nhau. Cắt số là
 *   nhập hai người làm một. Chỉ gộp theo bảng GOP_HO.
 *
 * KHI SANG VỤ MỚI: sửa VU_HIEN_TAI. Khi có hộ mới tách/nhập thửa:
 * sửa GOP_HO (đối chiếu cột `Mã Thửa` trong Notion và MA_NONG_DAN
 * trong js/ban-do.js — hai nơi này phải kể cùng một câu chuyện).
 **********************************************************************/

(function () {
  'use strict';

  var VU_HIEN_TAI = 'HT26';
  var CAC_DONG    = ['CKOD', 'CTDC', 'CTDM'];

  /* Mã thửa phụ  ->  mã thửa chính của CÙNG MỘT HỘ.
     Chép theo các dòng "1/2" và "2/2" trong MA_NONG_DAN (js/ban-do.js). */
  var GOP_HO = {
    CKOD: { LONG2: 'LONG1', LA2: 'LA1', HOT2: 'HOT1' },
    CTDC: {
      LE2: 'LE1', BE2: 'BE1', TRIEU2: 'TRIEU1', CU2: 'CU1', THA2: 'THA1',
      HU2: 'HU1', KHANH2: 'KHANH1', THUC2: 'THUC1', DO2: 'DO1'
    },
    CTDM: { HOI2: 'HOI1' }
  };

  var KHOA_DEM = 'htx_tongquan_v1_' + VU_HIEN_TAI;
  var HAN_DEM  = 12 * 60 * 60 * 1000;          // 12 giờ

  /* ---------- tiện ích ---------- */
  function $(id) { return document.getElementById(id); }

  function dinhDangDienTich(m2) {
    if (!m2) return '—';
    if (m2 >= 10000) return (m2 / 10000).toFixed(1).replace('.', ',') + ' ha';
    return Math.round(m2).toLocaleString('vi-VN') + ' m²';
  }

  /* Đếm dần cho đẹp — tự làm ở đây để không phải đụng vào hieu-ung.js */
  function demDan(el, dich, hau) {
    if (!el) return;
    var itMotion = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var le = (dich % 1 !== 0) ? 1 : 0;
    if (itMotion) { el.textContent = dich.toFixed(le).replace('.', ',') + hau; return; }
    var batDau = null;
    requestAnimationFrame(function buoc(t) {
      if (!batDau) batDau = t;
      var p = Math.min((t - batDau) / 1200, 1);
      var m = 1 - Math.pow(1 - p, 3);
      el.textContent = (dich * m).toFixed(le).replace('.', ',') + hau;
      if (p < 1) requestAnimationFrame(buoc);
    });
  }

  /* ---------- vẽ ra màn hình ---------- */
  function ve(kq) {
    var oDT = $('tdDienTich'), oHo = $('tdSoHo'), oThua = $('tdThua');

    if (oDT) {
      if (kq.dienTich >= 10000) demDan(oDT, kq.dienTich / 10000, ' ha');
      else oDT.textContent = dinhDangDienTich(kq.dienTich);
    }
    if (oHo)   demDan(oHo, kq.soHo, ' hộ');
    if (oThua && kq.soThua > 0) {
      // để hiệu ứng đếm (nếu chưa chạy) dừng đúng con số thật
      oThua.setAttribute('data-so', kq.soThua);
      if (oThua.textContent !== '0') oThua.textContent = kq.soThua;
    }

    var note = document.querySelector('.td-note');
    if (note) {
      note.textContent = '* Diện tích, số hộ và số thửa lấy trực tiếp từ dữ liệu ' +
                         'Notion của vụ đang canh tác, cộng từ cả 3 cánh đồng.';
    }
  }

  /* ---------- cộng dồn 3 cánh đồng ---------- */
  function congDon(cacKetQua) {
    var dienTich = 0, soThua = 0;
    var tapHo = {};                       // "CKOD:LONG1" -> true

    cacKetQua.forEach(function (r) {
      if (!r || !r.ok || !r.plots) return;
      soThua += r.plots.length;

      r.plots.forEach(function (pl) {
        if (!pl.organic) return;                       // chỉ tính lô hữu cơ
        if (pl.area) dienTich += pl.area;

        var doan = (pl.productCode || '').split('-');  // CKOD-LONG1-HT26-DT8
        if (doan.length < 2) return;
        var dong   = doan[0].toUpperCase();
        var maThua = doan[1].toUpperCase();
        var chinh  = (GOP_HO[dong] && GOP_HO[dong][maThua]) || maThua;
        tapHo[dong + ':' + chinh] = true;
      });
    });

    return { dienTich: dienTich, soHo: Object.keys(tapHo).length, soThua: soThua };
  }

  /* ---------- chạy ---------- */
  function napTuMang() {
    return Promise.all(CAC_DONG.map(function (dong) {
      return goiAPI({ action: 'getMapData', field: dong, season: VU_HIEN_TAI })
        .catch(function () { return null; });          // 1 đồng lỗi, 2 đồng kia vẫn hiện
    }));
  }

  function chay() {
    if (!$('tdDienTich') && !$('tdSoHo')) return;       // trang không có mục này

    // 1) có số cũ thì hiện ngay, khỏi để người xem nhìn dấu "—"
    try {
      var dem = JSON.parse(localStorage.getItem(KHOA_DEM) || 'null');
      if (dem && dem.kq && (Date.now() - dem.luc) < HAN_DEM) ve(dem.kq);
    } catch (e) {}

    // 2) rồi lặng lẽ lấy số mới
    napTuMang().then(function (cacKetQua) {
      var kq = congDon(cacKetQua);
      if (!kq.dienTich && !kq.soHo) return;             // không lấy được gì → giữ số cũ
      ve(kq);
      try {
        localStorage.setItem(KHOA_DEM, JSON.stringify({ luc: Date.now(), kq: kq }));
      } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', chay);
  } else {
    chay();
  }
})();
