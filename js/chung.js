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
  if(oLoi) oLoi.textContent=''; if(nut) nut.disabled = true;
  try{
    const r = await goiAPI({action:'login', username:$('dnUser').value.trim(), password:$('dnPass').value});
    if(!r.ok) throw r.error;
    localStorage.setItem('htx_phien', JSON.stringify({token:r.token, username:r.username, role:r.role||'admin'}));
    veUserBox(); dongModal('mpDN');
    if(typeof thuaDangChon !== 'undefined' && thuaDangChon !== null && typeof moNhapLieu === 'function') moNhapLieu();
  }catch(e){ if(oLoi) oLoi.textContent = e; else alert(e); }
  if(nut) nut.disabled = false;
}

function dangXuat(){ localStorage.removeItem('htx_phien'); veUserBox(); }

/* ================== MODAL DÙNG CHUNG ================== */
/* ---------- modal ---------- */
function moModal(id){ $(id).classList.add('mo'); }
function dongModal(id){ $(id).classList.remove('mo'); }
document.querySelectorAll('.modal-phu').forEach(m=>{
  m.addEventListener('click', e=>{ if(e.target===m) m.classList.remove('mo'); });
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
  return (g && g.ten) ? g.ten : '';
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

/* ================== KHỞI ĐỘNG ================== */
apDungNoiDung();
veUserBox();
