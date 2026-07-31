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

/* ================== KHỞI ĐỘNG ================== */
veUserBox();
