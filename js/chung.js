/**********************************************************************
 * js/chung.js — DÙNG CHUNG cho mọi trang (gọi API, đăng nhập, modal)
 * Tách ra từ index.html gốc — KHÔNG đổi logic, chỉ 1 dòng trong dangNhap()
 * được canh gác thêm (xem ghi chú tại chỗ) để dùng an toàn trên các trang
 * không có bản đồ (san-pham.html, cau-chuyen.html, dat-hang.html…).
 **********************************************************************/

/* ================== CẤU HÌNH ================== */
// URL Web App của Apps Script (Triển khai → Ứng dụng web → URL /exec)
const API_URL = 'https://script.google.com/macros/s/AKfycbxkBLw-2LGnKPrc0m8cjogwqyv1kCyP5D1hN8A7Pt2IQ6n8QwRGQhD8ea8PAQzOVwjy/exec';

/* ================== TIỆN ÍCH DÙNG CHUNG ================== */
const $ = id => document.getElementById(id);

/* ---------- gọi API ---------- */
async function goiAPI(body){
  const res = await fetch(API_URL, {method:'POST', body: JSON.stringify(body)});
  return res.json();
}

/* Điện thoại: đổi link sang notion:// để mở thẳng app */
function linkNotion(u){
  if(!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return u;
  // Rút mã trang 32 ký tự ở cuối link — đưa app đường dẫn trần thì nó
  // mở đúng trang task; để nguyên link có tiêu đề dài app hay bị lạc.
  const m = u.match(/([0-9a-f]{32})(?:[?#].*)?$/i);
  return m ? 'notion://www.notion.so/' + m[1]
           : u.replace(/^https?:\/\//, 'notion://');
}

function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

/* ================== ĐĂNG NHẬP & PHIÊN ================== */
/* ---------- đăng nhập ---------- */
function phienHienTai(){
  try{ return JSON.parse(localStorage.getItem('htx_phien')||'null'); }catch(e){ return null; }
}
function veUserBox(){
  const ph = phienHienTai();
  const box = $('userBox');
  if(!box) return;                 // trang không có ô này thì bỏ qua
  box.innerHTML = ph
    ? `👤 ${ph.username}${(ph.role==='khach')?' (khách xem)':''} <button onclick="dangXuat()">Đăng xuất</button>`
    : `<button onclick="moModal('mpDN')">Đăng nhập</button>`;
}

async function dangNhap(){
  const oLoi = $('dnLoi'), nut = $('dnGui');
  if(oLoi) oLoi.textContent='';
  /* Apps Script mất 2-5 giây mới trả lời. Bản cũ chỉ khoá nút mà không đổi
     chữ, nên người dùng bấm xong thấy màn hình đứng im, tưởng treo rồi bấm
     lại nhiều lần. Đổi chữ nút là đủ để hết cảm giác giật. */
  const chuCu = nut ? nut.textContent : '';
  if(nut){ nut.disabled = true; nut.textContent = 'Đang đăng nhập…'; }
  try{
    const r = await goiAPI({action:'login', username:$('dnUser').value.trim(), password:$('dnPass').value});
    if(!r.ok) throw r.error;
    localStorage.setItem('htx_phien', JSON.stringify({token:r.token, username:r.username, role:r.role||'admin'}));
    veUserBox(); dongModal('mpDN');
    /* Vẽ lại bản đồ là việc nặng (81 thửa + nhãn). Làm ngay tại đây thì
       hộp đăng nhập đứng hình mất nửa giây mới đóng. Đẩy sang lượt sau để
       hộp đóng mượt trước, bản đồ cập nhật ngay sau đó. */
    setTimeout(function(){
      if(typeof capNhatQuyenXem === 'function') capNhatQuyenXem();
      if(typeof thuaDangChon !== 'undefined' && thuaDangChon !== null && typeof moNhapLieu === 'function') moNhapLieu();
    }, 0);
  }catch(e){ if(oLoi) oLoi.textContent = e; else alert(e); }
  if(nut){ nut.disabled = false; nut.textContent = chuCu || 'Đăng nhập'; }
}

function dangXuat(){
  localStorage.removeItem('htx_phien');
  veUserBox();
  if(typeof capNhatQuyenXem === 'function') capNhatQuyenXem();   // trả bản đồ về chế độ khách
}

/* ================== MODAL DÙNG CHUNG ================== */
/* ---------- modal ---------- */
function moModal(id){ $(id).classList.add('mo'); }
function dongModal(id){ $(id).classList.remove('mo'); }
/* Bấm ra NỀN để đóng modal.

   ⚠ PHẢI kiểm CẢ điểm nhấn xuống LẪN điểm nhả ra. Đừng rút gọn lại
   thành mỗi 'click' như trước.

   Lỗi cũ (sửa 22/08/2026): trên điện thoại form nằm sát đáy màn hình
   (css align-items:flex-end), khoảng trống phía trên chính là nền này.
   Xã viên chạm vào ô nhập → bàn phím bật lên giữa lúc ngón tay còn
   đang chạm → trang co lại → tới lúc trình duyệt sinh 'click' thì điểm
   chạm đã rơi ra nền → e.target === m → form đóng mất. Phải thử ba
   bốn lần, khi bàn phím đã mở sẵn không còn co giãn nữa, mới gõ được.

   Ghi nhớ đúng chỗ nhấn xuống thì hết: ngón tay bắt đầu trên ô nhập
   nghĩa là người ta muốn gõ, không phải muốn đóng. Cách này cũng chặn
   luôn trường hợp bôi đen chữ trong form rồi kéo tay ra ngoài. */
document.querySelectorAll('.modal-phu').forEach(m=>{
  let nhanTrenNen = false;
  const ghiNhan = e => { nhanTrenNen = (e.target === m); };

  /* Gắn cả ba, ĐỪNG rẽ nhánh theo window.PointerEvent. Trình duyệt sinh
     nhiều sự kiện cho cùng một cú chạm nên gắn thừa là vô hại — cả ba
     đều ghi cùng một giá trị. Còn rẽ nhánh thì môi trường nào thiếu
     PointerEvent sẽ không nghe được sự kiện nào, cờ kẹt ở false, và
     bấm ra nền KHÔNG đóng được form nữa. Bài thử ngày 22/08/2026 bắt
     đúng lỗi này trước khi kịp đẩy lên. */
  m.addEventListener('pointerdown', ghiNhan);
  m.addEventListener('mousedown',   ghiNhan);
  m.addEventListener('touchstart',  ghiNhan, { passive: true });

  m.addEventListener('click', e=>{
    if (e.target === m && nhanTrenNen) m.classList.remove('mo');
    nhanTrenNen = false;
  });
});

/* ==================================================================
   ĐỔ CHỮ TỪ js/noi-dung.js VÀO TRANG
   ------------------------------------------------------------------
   Toàn bộ chữ của website nằm trong js/noi-dung.js. Trong file .html
   chỉ còn các ô trống được đánh dấu:

     data-nd="trangChu.hero.tieuDe"   → đổ 1 đoạn chữ (cho phép thẻ HTML)
     data-nd-ds="goi.muc.gieo-mam.quyenLoi"  → đổ danh sách gạch đầu dòng
     data-nd-gia="goi.muc.gieo-mam"   → đổ dòng giá
     data-nd-bang="trangSanPham.doiChieu"    → đổ bảng đối chiếu

   PHẦN NÀY KHÔNG PHẢI SỬA khi đổi nội dung. Chỉ sửa js/noi-dung.js.
   ================================================================== */
function layND(duong){
  if(!window.NOI_DUNG) return null;
  return duong.split('.').reduce(function(o,k){
    return (o === null || o === undefined) ? null : o[k];
  }, window.NOI_DUNG);
}

/* Tên gói dùng cho nút "Tôi quan tâm" — để nút luôn khớp tên đã sửa */
function tenGoi(ma){
  const g = layND('goi.muc.' + ma);
  return (g && g.ten) ? chuThuan(g.ten) : '';
}

function apDungNoiDung(){
  /* ban-do.html không dùng ô nội dung nào — bỏ qua luôn, đừng báo lỗi
     kẻo hiện dải đỏ ngay giữa bản đồ nhúng trong trang Cánh Đồng. */
  if(!document.querySelector('[data-nd],[data-nd-ds],[data-nd-gia],[data-nd-bang]')) return;

  if(!window.NOI_DUNG){
    console.error('[HTX] Không nạp được js/noi-dung.js — trang sẽ thiếu chữ. ' +
                  'File đó nhiều khả năng bị lỗi cú pháp (thiếu dấu phẩy hoặc dấu `).');
    const bao = document.createElement('div');
    bao.style.cssText = 'background:#b03c2a;color:#fff;padding:10px 16px;font-size:13px;text-align:center';
    bao.textContent = 'Không nạp được nội dung trang (js/noi-dung.js). ' +
                      'Bấm F12 → Console để xem dòng bị lỗi.';
    document.body.insertBefore(bao, document.body.firstChild);
    return;
  }
  const thieu = [];

  document.querySelectorAll('[data-nd]').forEach(function(el){
    const d = el.getAttribute('data-nd'), v = layND(d);
    if(typeof v === 'string') el.innerHTML = v; else thieu.push(d);
  });

  document.querySelectorAll('[data-nd-ds]').forEach(function(el){
    const d = el.getAttribute('data-nd-ds'), v = layND(d);
    if(Array.isArray(v)) el.innerHTML = v.map(function(x){ return '<li>'+x+'</li>'; }).join('');
    else thieu.push(d);
  });

  document.querySelectorAll('[data-nd-gia]').forEach(function(el){
    const d = el.getAttribute('data-nd-gia'), g = layND(d);
    if(g) el.innerHTML = (g.gia||'') + ' <small>' + (g.giaDv||'') + '</small>';
    else thieu.push(d);
  });

  document.querySelectorAll('[data-nd-bang]').forEach(function(el){
    const d = el.getAttribute('data-nd-bang'), b = layND(d);
    if(!b || !b.cot || !b.hang){ thieu.push(d); return; }
    let h = '<div class="dc-row head">' +
            b.cot.map(function(c){ return '<div class="dc-cell">'+c+'</div>'; }).join('') +
            '</div>';
    b.hang.forEach(function(hang){
      h += '<div class="dc-row"><div class="dc-cell">'+hang[0]+'</div>';
      for(let i=1;i<hang.length;i++){
        h += (String(hang[i]).toLowerCase() === 'co')
           ? '<div class="dc-cell"><span class="yes">✓</span></div>'
           : '<div class="dc-cell"><span class="no">–</span></div>';
      }
      h += '</div>';
    });
    el.innerHTML = h;
  });

  if(thieu.length){
    console.warn('[HTX] Không tìm thấy trong js/noi-dung.js:', thieu.join(' · '));
  }
}

/* ==================================================================
   MENU DI ĐỘNG (nút ☰)
   ------------------------------------------------------------------
   Không viết lại danh sách tab ở đây — tự chép từ <nav class="menu">
   có sẵn trong trang. Nhờ vậy sau này thêm/bớt tab chỉ cần sửa trong
   .html, menu di động tự theo, không sợ lệch giữa hai nơi.
   ================================================================== */
function khoiTaoMenuDiDong(){
  const nut  = document.querySelector('.burger');
  const menu = document.querySelector('.nav .menu');
  const head = document.querySelector('header');
  if(!nut || !menu || !head || head.querySelector('.menu-mobile')) return;

  const bang = document.createElement('nav');
  bang.className = 'menu-mobile';
  bang.innerHTML = menu.innerHTML;                 // chép các tab

  // thêm nút đăng nhập vào cuối, vì trên di động chữ "Đăng nhập" bị ẩn
  const dn = document.createElement('button');
  dn.className = 'mm-dangnhap';
  dn.textContent = 'Đăng nhập';
  dn.addEventListener('click', function(){ dong(); moModal('mpDN'); });
  bang.appendChild(dn);
  head.appendChild(bang);

  function mo(){
    bang.classList.add('mo');
    nut.textContent = '✕';
    nut.setAttribute('aria-expanded','true');
    nut.setAttribute('aria-label','Đóng menu');
  }
  function dong(){
    bang.classList.remove('mo');
    nut.textContent = '☰';
    nut.setAttribute('aria-expanded','false');
    nut.setAttribute('aria-label','Mở menu');
  }

  nut.addEventListener('click', function(e){
    e.stopPropagation();
    bang.classList.contains('mo') ? dong() : mo();
  });
  bang.addEventListener('click', function(e){ if(e.target.tagName === 'A') dong(); });
  document.addEventListener('click', function(e){
    if(bang.classList.contains('mo') && !head.contains(e.target)) dong();
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') dong(); });
  window.addEventListener('resize', function(){ if(window.innerWidth > 680) dong(); });
}

/* ================== KHỞI ĐỘNG ================== */
apDungNoiDung();
khoiTaoMenuDiDong();
veUserBox();
