/**********************************************************************
 * js/hieu-ung.js — HIỆU ỨNG DÙNG CHUNG cho mọi trang
 *
 * Cách dùng: chỉ cần nạp file này ở cuối trang, KHÔNG phải sửa HTML.
 * Nó tự tìm các khối quen thuộc (tiêu đề, thẻ, ảnh, mục...) và gắn
 * hiệu ứng hiện dần khi cuộn tới.
 *
 * Muốn chỉnh tay 1 phần tử cụ thể thì thêm thuộc tính vào HTML:
 *   data-hien="len" | "trai" | "phai" | "no" | "mo" | "xuong"
 * Muốn BỎ hiệu ứng cho 1 phần tử: thêm data-hien-bo
 **********************************************************************/
(function(){
  'use strict';

  var itMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Tự gắn hiệu ứng cho các khối quen thuộc ---------- */
  // [bộ chọn, kiểu hiệu ứng, có so le không]
  var QUY_TAC = [
    ['.eyebrow',                    'len',   false],
    ['section h2',                  'len',   false],
    ['.sec-head p, .tl-head p',     'len',   false],
    ['.chuyen .grid > div',         'len',   true ],
    ['.grid2 > div',                'len',   true ],
    ['.khung-anh',                  'no',    false],
    ['.anh, .anh-ph, .goi-hinh',    'no',    false],
    ['.sp-card',                    'len',   true ],
    ['.cd-card, .cd-o',             'len',   true ],
    ['.gt-o',                       'len',   true ],
    ['.goi',                        'len',   false],
    ['.td-o',                       'len',   true ],
    ['.dc-row',                     'len',   true ],
    ['.tl-legend .lg',              'len',   true ],
    ['.phase-now',                  'no',    false],
    ['.dangky .form, .dangky p',    'len',   false],
    ['.map-box',                    'len',   false],
    ['.tl-note, .dc-note',          'len',   false],
    ['footer .ft-grid > div',       'len',   true ],
  ];

  QUY_TAC.forEach(function(qt){
    var ds = document.querySelectorAll(qt[0]);
    var n = 0;
    Array.prototype.forEach.call(ds, function(el){
      if(el.hasAttribute('data-hien') || el.hasAttribute('data-hien-bo')) return;
      // bỏ qua phần tử nằm trong header/thanh chọn (luôn phải thấy ngay)
      if(el.closest('header') || el.closest('.chon-bar') || el.closest('.topbar')) return;
      el.setAttribute('data-hien', qt[1]);
      if(qt[2]){
        el.style.setProperty('--tre', (Math.min(n,6) * 0.09).toFixed(2) + 's');
        n++;
      }
    });
  });

  /* ---------- 2. Chữ tiêu đề lớn trôi lên từng dòng ---------- */
  // chỉ áp dụng cho h1 trong khối hero (chữ to, đáng để nhấn)
  Array.prototype.forEach.call(
    document.querySelectorAll('.hero h1, .cd-hero h1, .vhero h1, .shero h1'),
    function(h){
      if(itMotion) return;
      if(h.querySelector('.chu-troi')) return;
      // tách theo từ, gói mỗi từ trong 1 lớp che để trôi lên
      var tu = h.innerHTML.split(/(\s+)/);
      h.innerHTML = tu.map(function(t){
        if(!t.trim()) return t;
        return '<span class="chu-troi"><span>' + t + '</span></span>';
      }).join('');
      Array.prototype.forEach.call(h.querySelectorAll('.chu-troi'), function(s,i){
        s.querySelector('span').style.setProperty('--tre', (i*0.045).toFixed(3) + 's');
      });
      h.setAttribute('data-chu-troi','');
    }
  );

  /* ---------- 3. Theo dõi cuộn để bật hiệu ứng ---------- */
  function bat(el){
    el.classList.add('hien');
    if(el.hasAttribute('data-chu-troi')){
      Array.prototype.forEach.call(el.querySelectorAll('.chu-troi'), function(s){
        s.classList.add('hien');
      });
    }
    if(el.hasAttribute('data-so')) demSo(el);
  }

  var canTheoDoi = document.querySelectorAll('[data-hien], [data-chu-troi], [data-so]');

  if(itMotion || !('IntersectionObserver' in window)){
    // máy yếu hoặc người dùng tắt chuyển động → hiện hết ngay
    Array.prototype.forEach.call(canTheoDoi, bat);
  } else {
    var obs = new IntersectionObserver(function(muc){
      muc.forEach(function(m){
        if(m.isIntersecting){ bat(m.target); obs.unobserve(m.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(canTheoDoi, function(el){ obs.observe(el); });

    // phần tử đã nằm sẵn trong màn hình lúc mở trang → hiện luôn, khỏi chờ
    setTimeout(function(){
      Array.prototype.forEach.call(canTheoDoi, function(el){
        var r = el.getBoundingClientRect();
        if(r.top < window.innerHeight * 0.92 && r.bottom > 0){ bat(el); obs.unobserve(el); }
      });
    }, 60);
  }

  /* ---------- 4. Số đếm dần (mục Tác động) ---------- */
  function demSo(el){
    var dich = parseFloat(el.getAttribute('data-so'));
    if(isNaN(dich)) return;
    var duoi = el.getAttribute('data-so-duoi') || '';
    var leSo = (dich % 1 !== 0) ? 1 : 0;
    if(itMotion){ el.textContent = dich.toFixed(leSo) + duoi; return; }
    var batDau = null, thoiGian = 1400;
    function buoc(t){
      if(!batDau) batDau = t;
      var p = Math.min((t - batDau)/thoiGian, 1);
      var m = 1 - Math.pow(1 - p, 3);              // chậm dần về cuối
      el.textContent = (dich * m).toFixed(leSo) + duoi;
      if(p < 1) requestAnimationFrame(buoc);
    }
    requestAnimationFrame(buoc);
  }

  /* ---------- 5. Ảnh: lỗi tải thì ẩn đi, lộ khung gợi ý ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('img.anh-that'), function(img){
    img.addEventListener('error', function(){ img.classList.add('loi'); });
    if(img.complete && img.naturalWidth === 0) img.classList.add('loi');
    /* Ô gợi ý đang để trống → tự điền TÊN FILE cần đặt. Nhờ vậy mở trang
       lên là biết ngay phải bỏ ảnh nào vào img/, khỏi tra tài liệu. */
    var oGoiY = img.parentNode && img.parentNode.querySelector('.goi-y');
    if(oGoiY && !oGoiY.textContent.trim()){
      var duongDan = img.getAttribute('src') || '';
      oGoiY.innerHTML = 'Chưa có ảnh<br><b style="font-weight:600">' + duongDan + '</b>';
    }
    if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    if(!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
  });

  /* ---------- 5b. Ảnh nền lớn: thiếu ảnh thì nhắc luôn tên file ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.hero-anh'), function(khung){
    var img = khung.querySelector('img.hero-bg');
    if(!img) return;
    var duongDan = img.getAttribute('src') || '';
    function nhac(){
      if(khung.querySelector('.hero-goi-y')) return;
      var n = document.createElement('span');
      n.className = 'hero-goi-y';
      n.textContent = 'Chưa có ảnh nền: ' + duongDan;
      khung.appendChild(n);
    }
    img.addEventListener('error', nhac);
    if(img.complete && img.naturalWidth === 0) nhac();
  });

  /* ---------- 6. Nút & thẻ mượt hơn khi rê chuột ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll('.cta, .them-gio, .mo-bando, .dangnhap, .nut-gui, .doc-them, .cd-link, .field-tab, .dangky .form button'),
    function(el){ el.classList.add('nut-muot'); }
  );
  Array.prototype.forEach.call(
    document.querySelectorAll('.sp-card, .gt-o, .cd-card, .cd-o, .goi, .map-box'),
    function(el){ el.classList.add('the-muot'); }
  );

})();
