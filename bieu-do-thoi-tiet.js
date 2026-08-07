/* ======================================================================
   BIỂU ĐỒ THỜI TIẾT MÙA VỤ — HTX LÚA DI SẢN HỘI AN
   Tách khỏi canh-dong.html ngày 06/08/2026.

   Vì sao tách: phần này đã dài hơn 400 dòng và còn lớn thêm. Để trong
   HTML thì mỗi lần sửa biểu đồ là đụng vào cả trang, hỏng là phải xem
   lại nguyên file. Tách riêng thì GitHub → file → History → Revert
   lấy lại được đúng một file.

   Trục ngang = NSS (ngày sau sạ), KHÔNG phải ngày dương lịch — ba cánh
   đồng gieo lệch nhau tới 30 ngày nên trục dương lịch không so được.

   CÁC LỚP VẼ, từ dưới lên (thứ tự này quyết định cái gì che cái gì):
     1. Vùng bức xạ  — nền hổ phách, im lặng
     2. Ranh giới giai đoạn — vạch mảnh + tên, KHÔNG tô nền nữa
     3. Cột mưa
     4. Đường nhiệt độ cao nhất
     5. Chấm nhật ký đồng
     6. Vạch "Hôm nay" và con trỏ đọc số

   File này cần được nạp TRƯỚC đoạn <script> gọi napThoiTiet().
   ====================================================================== */

/* ---------- màu và tiện ích dùng chung ---------- */
const MAU_MUA    = '#5b8fc9';
const MAU_MUA_TO = '#2f6ea5';    // ngày mưa ≥50mm
const MAU_NHIET  = '#c94f3d';
const MAU_BUCXA  = '#d9a13b';
const MAU_NHOM   = { 'Canh tác': '#6f9b3f', 'Vấn đề': '#c0392b', 'Quan sát': '#8a9db8' };

/* Thứ tự ưu tiên khi nhiều bản ghi rơi đúng CÙNG MỘT NGÀY: chấm gộp lấy
   màu của nhóm nặng nhất. Vấn đề phải nổi lên trên, vì đó là thứ người
   xem cần thấy trước. */
const UU_TIEN_NHOM = ['Vấn đề', 'Canh tác', 'Quan sát'];

function soNgayTT(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function escTT(t) {
  return String(t == null ? '' : t).replace(/[&<>"]/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function soGon(v, n) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return Number(v).toFixed(n === undefined ? 1 : n).replace(/\.0$/, '');
}

/* ======================================================================
   BĂNG GIAI ĐOẠN dựng từ NGÀY THẬT trong DB Vụ Mùa.
   Trước đây ngưỡng NSS đặt cứng 8/21/41/56/71 theo hiểu biết chung về
   lúa ngắn ngày — và sai rất xa dữ liệu thật: trổ bông thật ở NSS 67
   (đặt 56), chín vàng thật ở NSS 98 (đặt 71).
   Nay mọi ranh giới lấy từ Notion. Chỉ còn ĐÚNG MỘT ranh giới ước lượng:
   điểm mạ chuyển sang đẻ nhánh sớm (NSS 15), vì Notion không có mốc đó.
   ====================================================================== */
function bangGiaiDoan(season, gieo, nssMax) {
  const nss = d => d ? soNgayTT(gieo, d) : null;
  const moc = [
    { ten: 'Mạ',             nss: 0,                    that: true  },
    { ten: 'Đẻ nhánh sớm',   nss: 15,                   that: false },
    { ten: 'Đẻ nhánh rộ',    nss: nss(season.deNhanh),  that: true  },
    { ten: 'Làm đòng',       nss: nss(season.donDong),  that: true  },
    { ten: 'Trổ – phơi màu', nss: nss(season.troBong),  that: true  },
    { ten: 'Chắc hạt',       nss: nss(season.chacHat),  that: true  },
    { ten: 'Chín – gặt',     nss: nss(season.chinVang), that: true  }
  ].filter(m => m.nss !== null && m.nss !== undefined);

  // bảo đảm tăng dần, phòng khi ngày trong Notion nhập lệch thứ tự
  for (let i = 1; i < moc.length; i++) {
    if (moc[i].nss <= moc[i - 1].nss) moc[i].nss = moc[i - 1].nss + 1;
  }
  return moc.map((m, i) => ({
    tu:  m.nss,
    den: (i + 1 < moc.length) ? moc[i + 1].nss : Math.max(nssMax, m.nss + 1),
    ten: m.ten, that: m.that
  }));
}

/* ======================================================================
   CHIP BẬT/TẮT
   Lưu vào localStorage để lần sau vào trang giữ nguyên lựa chọn.
   ====================================================================== */
const CHIP = [
  { ma: 'mua',    ten: 'Mưa',           mau: MAU_MUA   },
  { ma: 'nhiet',  ten: 'Nhiệt độ',      mau: MAU_NHIET },
  { ma: 'bucXa',  ten: 'Bức xạ',        mau: MAU_BUCXA },
  { ma: 'nhatKy', ten: 'Nhật ký đồng',  mau: MAU_NHOM['Canh tác'] }
];
const KHOA_LUU = 'ttHienThi_v1';

function docHienThi() {
  const mac = { mua: true, nhiet: true, bucXa: true, nhatKy: true };
  try {
    const luu = JSON.parse(localStorage.getItem(KHOA_LUU) || 'null');
    if (luu && typeof luu === 'object') {
      CHIP.forEach(c => { if (typeof luu[c.ma] === 'boolean') mac[c.ma] = luu[c.ma]; });
    }
  } catch (e) { /* trình duyệt chặn localStorage — dùng mặc định */ }
  return mac;
}
function luuHienThi(h) {
  try { localStorage.setItem(KHOA_LUU, JSON.stringify(h)); } catch (e) {}
}

let HIEN_THI    = docHienThi();
let DU_LIEU_TT  = null;      // dữ liệu lần nạp gần nhất, để vẽ lại khi bấm chip

function veChip() {
  const o = document.getElementById('ttChip');
  if (!o) return;
  o.innerHTML = CHIP.map(c =>
    '<button type="button" class="tt-chip' + (HIEN_THI[c.ma] ? ' bat' : '') +
    '" data-chip="' + c.ma + '" aria-pressed="' + (HIEN_THI[c.ma] ? 'true' : 'false') + '">' +
    '<i style="background:' + c.mau + '"></i>' + c.ten + '</button>'
  ).join('') +
  '<button type="button" class="tt-chip tat-ca" data-chip="tatCa">Tất cả</button>';

  o.querySelectorAll('[data-chip]').forEach(nut => {
    nut.addEventListener('click', () => {
      const ma = nut.getAttribute('data-chip');
      if (ma === 'tatCa') CHIP.forEach(c => { HIEN_THI[c.ma] = true; });
      else {
        HIEN_THI[ma] = !HIEN_THI[ma];
        // không cho tắt sạch — biểu đồ trống trơn thì người xem tưởng hỏng
        if (!CHIP.some(c => HIEN_THI[c.ma])) HIEN_THI[ma] = true;
      }
      luuHienThi(HIEN_THI);
      veChip();
      if (DU_LIEU_TT) veThoiTiet(DU_LIEU_TT);
    });
  });
}

/* ======================================================================
   HỘP THÔNG TIN
   Dùng div riêng thay cho <title> của SVG: <title> chỉ hiện sau khi rê
   đứng yên khoảng một giây, và trên điện thoại thì không hiện gì cả.
   ====================================================================== */
function hopTT() {
  let hop = document.getElementById('ttHop');
  if (!hop) {
    hop = document.createElement('div');
    hop.id = 'ttHop'; hop.className = 'tt-hop';
    document.body.appendChild(hop);
  }
  return hop;
}
function hienHop(clientX, clientY, html) {
  const hop = hopTT();
  hop.innerHTML = html;
  hop.classList.add('hien');
  const r = hop.getBoundingClientRect();
  let X = clientX + 16, Y = clientY - r.height - 14;
  if (X + r.width > innerWidth - 8) X = clientX - r.width - 16;
  if (X < 8) X = 8;
  if (Y < 8) Y = clientY + 20;
  hop.style.left = X + 'px'; hop.style.top = Y + 'px';
}
function anHop() { const h = document.getElementById('ttHop'); if (h) h.classList.remove('hien'); }

/* ======================================================================
   VẼ BIỂU ĐỒ
   ====================================================================== */
function veThoiTiet(r) {
  DU_LIEU_TT = r;
  const oSo   = document.getElementById('ttSo');
  const oBd   = document.getElementById('ttBieuDo');
  const oBang = document.getElementById('ttBangGD');
  const oChu  = document.getElementById('ttChu');
  const tt = r.thoiTiet || [], nkTho = r.nhatKy || [], gieo = r.season && r.season.gieoSa;

  if (!gieo) {
    oBd.innerHTML = '<div class="tt-trong">Trang Vụ Mùa chưa có <b>Ngày gieo sạ</b> nên chưa dựng được trục thời gian.</div>';
    return;
  }
  if (!tt.length) {
    oBd.innerHTML = '<div class="tt-trong">Bảng <b>🌦️ THỜI TIẾT NGÀY</b> chưa có dữ liệu cho cánh đồng này.<br>' +
      '<small>Mở Apps Script, chạy hàm <b>keoThoiTietLichSu</b> một lần để kéo về từ Open-Meteo.</small></div>';
    return;
  }

  veChip();

  /* ---------- LỌC NHẬT KÝ ----------
     Chỉ căn cứ cột "Nhóm" trong Notion. Bản ghi để trống Nhóm thì KHÔNG
     lên biểu đồ — không suy diễn, không đoán thay người nhập.
     Đây là quyết định có chủ ý: bỏ trống Nhóm là lỗi nhập liệu, và cách
     chữa đúng là điền vào Notion chứ không phải đoán ở đây. */
  const nk = nkTho.filter(e => e.ngay && MAU_NHOM[e.nhom]);

  /* ---------- GỘP BẢN GHI CÙNG MỘT NGÀY ----------
     Chỉ gộp khi TRÙNG ĐÚNG NGÀY. Cách nhau một ngày thì để nguyên hai
     chấm, dù trên màn hình chúng có chạm nhau — giữ đúng vị trí thời
     gian quan trọng hơn là cho đẹp. */
  const theoNgay = {};
  nk.forEach(e => { (theoNgay[e.ngay] = theoNgay[e.ngay] || []).push(e); });
  const chamNK = Object.keys(theoNgay).sort().map(ngay => {
    const ds = theoNgay[ngay];
    const nhom = UU_TIEN_NHOM.find(t => ds.some(e => e.nhom === t)) || ds[0].nhom;
    return { ngay: ngay, nhom: nhom, ds: ds };
  });

  /* ---------- THỐNG KÊ CẢ VỤ ---------- */
  let tongMua = 0, nMua = 0, nLon = 0, khoMax = 0, kho = 0, tongN = 0, demN = 0, tongBX = 0, demBX = 0;
  tt.forEach(d => {
    const m = d.mua || 0; tongMua += m;
    if (m >= 1) nMua++;
    if (m >= 50) nLon++;
    if (m < 1) { kho++; if (kho > khoMax) khoMax = kho; } else kho = 0;
    if (d.tMax != null && d.tMin != null) { tongN += (d.tMax + d.tMin) / 2; demN++; }
    if (d.bucXa != null) { tongBX += d.bucXa; demBX++; }
  });
  oSo.innerHTML = [
    [Math.round(tongMua) + ' mm', 'Tổng mưa cả vụ'],
    [nMua, 'Ngày có mưa'],
    [nLon, 'Ngày mưa lớn (>50mm)'],
    [khoMax + ' ngày', 'Chuỗi khô dài nhất'],
    [(demN ? (tongN / demN).toFixed(1) : '—') + '°C', 'Nhiệt độ trung bình'],
    [(demBX ? Math.round(tongBX) : '—') + ' MJ/m²', 'Tổng bức xạ']
  ].map(x => '<div class="tt-o"><div class="tt-so-lon">' + x[0] + '</div><div class="tt-nhan">' + x[1] + '</div></div>').join('');

  /* ---------- KHUNG ----------
     R nới từ 12 lên 46 để có chỗ cho TRỤC PHẢI (nhiệt độ). Trước đây chỉ
     có một trục bên trái là mm, còn nhiệt độ vẽ trên thang ẩn 15–40°C
     không nhãn — nhìn không đọc được số nào. */
  const W = 1000, H = 360, L = 46, R = 46, T = 46, B = 78;
  const nssMax = Math.max(100,
    ...tt.map(d => soNgayTT(gieo, d.ngay)),
    ...chamNK.map(e => soNgayTT(gieo, e.ngay)));
  const pw = W - L - R, ph = H - T - B;
  const x = n => L + (n / nssMax) * pw;

  /* ---------- THANG ĐO ---------- */
  const muaMax = Math.max(20, ...tt.map(d => d.mua || 0));
  const yMua   = mm => T + ph - (mm / muaMax) * ph;

  const bxCo   = tt.some(d => d.bucXa != null);
  const bxMax  = Math.max(30, ...tt.map(d => d.bucXa || 0));
  const yBX    = v => T + ph - (v / bxMax) * ph;

  /* Thang nhiệt TỰ CO theo dữ liệu thật, không đặt cứng nữa. Thang cũ
     15–40°C khiến đường nhiệt lúc nào cũng bám nóc (Hội An vụ Hè Thu
     tMax 30–38°C), và ngày nào vượt 40°C thì bị cắt mất mà không báo. */
  const dsNhiet = tt.filter(d => d.tMax != null);
  const nMin = Math.floor(Math.min(...tt.filter(d => d.tMin != null).map(d => d.tMin), 20)) - 1;
  const nMax = Math.ceil(Math.max(...dsNhiet.map(d => d.tMax), 30)) + 1;
  const yNhiet = t => T + ph - ((t - nMin) / (nMax - nMin)) * ph;

  /* Trục trái: mm nếu bật mưa; nếu tắt mưa mà bật bức xạ thì bức xạ lên
     làm nhân vật chính, hiện nhãn MJ/m². */
  const traiLa = HIEN_THI.mua ? 'mua' : (HIEN_THI.bucXa && bxCo ? 'bucXa' : null);

  const BANG = bangGiaiDoan(r.season, gieo, nssMax);
  let g = '';

  /* ---------- 1. VÙNG BỨC XẠ (nền) ---------- */
  if (HIEN_THI.bucXa && bxCo) {
    const dbx = tt.map(d => [soNgayTT(gieo, d.ngay), d.bucXa])
                  .filter(p => p[0] >= 0 && p[0] <= nssMax && p[1] != null)
                  .sort((a, b) => a[0] - b[0]);
    if (dbx.length > 1) {
      const diem = dbx.map(p => x(p[0]).toFixed(1) + ',' + yBX(p[1]).toFixed(1)).join(' ');
      g += '<defs><linearGradient id="gradBX" x1="0" y1="0" x2="0" y2="1">' +
           '<stop offset="0%" stop-color="' + MAU_BUCXA + '" stop-opacity=".34"/>' +
           '<stop offset="100%" stop-color="' + MAU_BUCXA + '" stop-opacity=".05"/>' +
           '</linearGradient></defs>';
      g += '<polygon fill="url(#gradBX)" points="' +
           x(dbx[0][0]).toFixed(1) + ',' + (T + ph) + ' ' + diem + ' ' +
           x(dbx[dbx.length - 1][0]).toFixed(1) + ',' + (T + ph) + '"/>';
      g += '<polyline fill="none" stroke="' + MAU_BUCXA + '" stroke-width="1" opacity=".5" points="' + diem + '"/>';
    }
  }

  /* ---------- 2. RANH GIỚI GIAI ĐOẠN ----------
     Đã bỏ nền màu để nhường chỗ cho vùng bức xạ. Chỉ còn vạch ranh giới
     và tên giai đoạn. Vạch ĐẬM = ngày thật lấy từ Notion; vạch ĐỨT =
     ranh giới ước lượng (hiện chỉ còn một: mạ → đẻ nhánh sớm). */
  BANG.forEach((gd, i) => {
    const a = x(gd.tu), b = x(Math.min(gd.den, nssMax));
    if (b <= a) return;
    g += '<rect class="tt-gd" data-gd="' + i + '" x="' + a.toFixed(1) + '" y="' + T +
         '" width="' + (b - a).toFixed(1) + '" height="' + ph +
         '" fill="#2f4718" opacity="0" style="cursor:pointer"/>';
    if (gd.tu > 0) {
      g += '<line x1="' + a.toFixed(1) + '" y1="' + T + '" x2="' + a.toFixed(1) +
           '" y2="' + (T + ph) + '" stroke="#b6bfa6" stroke-width="1"' +
           (gd.that ? '' : ' stroke-dasharray="3 3"') + '/>';
    }
    if (b - a > 62) {
      g += '<text x="' + ((a + b) / 2).toFixed(1) + '" y="' + (T - 10) +
           '" text-anchor="middle" font-size="10.5" fill="#7b8270">' + escTT(gd.ten) + '</text>';
    }
  });

  /* ---------- lưới ngang + hai trục ---------- */
  [0, .25, .5, .75, 1].forEach(f => {
    const yy = T + ph - f * ph;
    g += '<line x1="' + L + '" y1="' + yy.toFixed(1) + '" x2="' + (W - R) + '" y2="' + yy.toFixed(1) +
         '" stroke="#d8dcd0" stroke-dasharray="2 3"/>';
    if (traiLa === 'mua') {
      g += '<text x="' + (L - 7) + '" y="' + (yy + 3.5).toFixed(1) + '" text-anchor="end" font-size="10" fill="' + MAU_MUA + '">' +
           Math.round(muaMax * f) + '</text>';
    } else if (traiLa === 'bucXa') {
      g += '<text x="' + (L - 7) + '" y="' + (yy + 3.5).toFixed(1) + '" text-anchor="end" font-size="10" fill="' + MAU_BUCXA + '">' +
           Math.round(bxMax * f) + '</text>';
    }
    if (HIEN_THI.nhiet) {
      g += '<text x="' + (W - R + 7) + '" y="' + (yy + 3.5).toFixed(1) + '" text-anchor="start" font-size="10" fill="' + MAU_NHIET + '">' +
           Math.round(nMin + (nMax - nMin) * f) + '</text>';
    }
  });
  /* Nhãn đơn vị đặt ngay đầu trục, màu trùng chuỗi — người xem khỏi phải
     dò chú giải mới biết trục nào là gì. */
  if (traiLa === 'mua')  g += '<text x="' + (L - 7) + '" y="' + (T - 6) + '" text-anchor="end" font-size="10" font-weight="600" fill="' + MAU_MUA + '">mm</text>';
  if (traiLa === 'bucXa') g += '<text x="' + (L - 7) + '" y="' + (T - 6) + '" text-anchor="end" font-size="10" font-weight="600" fill="' + MAU_BUCXA + '">MJ/m²</text>';
  if (HIEN_THI.nhiet)    g += '<text x="' + (W - R + 7) + '" y="' + (T - 6) + '" text-anchor="start" font-size="10" font-weight="600" fill="' + MAU_NHIET + '">°C</text>';

  /* ---------- 3. CỘT MƯA ---------- */
  const bw = Math.max(2, (pw / nssMax) * 0.8);
  if (HIEN_THI.mua) {
    tt.forEach(d => {
      const n = soNgayTT(gieo, d.ngay);
      if (n < 0 || n > nssMax) return;
      const m = d.mua || 0;
      if (m <= 0) return;
      /* Ngày dùng số vũ kế đo tại ruộng thì viền đậm, để phân biệt với
         số mô hình của Open-Meteo. Trung thực về xuất xứ số liệu. */
      g += '<rect x="' + (x(n) - bw / 2).toFixed(1) + '" y="' + yMua(m).toFixed(1) +
           '" width="' + bw.toFixed(1) + '" height="' + (T + ph - yMua(m)).toFixed(1) +
           '" fill="' + (m >= 50 ? MAU_MUA_TO : MAU_MUA) + '" rx="1"' +
           (d.doRuong ? ' stroke="#1d4e77" stroke-width="1"' : '') + '/>';
    });
  }

  /* ---------- 4. ĐƯỜNG NHIỆT ĐỘ CAO NHẤT ---------- */
  if (HIEN_THI.nhiet) {
    const dt = dsNhiet.map(d => [soNgayTT(gieo, d.ngay), d.tMax])
                      .filter(p => p[0] >= 0 && p[0] <= nssMax)
                      .sort((a, b) => a[0] - b[0]);
    if (dt.length > 1) {
      g += '<polyline fill="none" stroke="' + MAU_NHIET + '" stroke-width="1.5" opacity=".85" points="' +
           dt.map(p => x(p[0]).toFixed(1) + ',' + yNhiet(p[1]).toFixed(1)).join(' ') + '"/>';
    }
  }

  /* ---------- trục ngang NSS ---------- */
  for (let n = 0; n <= nssMax; n += 10) {
    g += '<line x1="' + x(n).toFixed(1) + '" y1="' + (T + ph) + '" x2="' + x(n).toFixed(1) +
         '" y2="' + (T + ph + 4) + '" stroke="#b9bfae"/>';
    g += '<text x="' + x(n).toFixed(1) + '" y="' + (T + ph + 16) +
         '" text-anchor="middle" font-size="10" fill="#98a08c">' + n + '</text>';
  }
  g += '<text x="' + L + '" y="' + (T + ph + 32) + '" font-size="10.5" fill="#7b8270">NSS — ngày sau sạ (gieo ' +
       gieo.slice(8, 10) + '/' + gieo.slice(5, 7) + ')</text>';

  /* ---------- 5. CHẤM NHẬT KÝ ---------- */
  const yE = T + ph + 46;
  g += '<line x1="' + L + '" y1="' + yE + '" x2="' + (W - R) + '" y2="' + yE + '" stroke="#e2e5da"/>';
  if (HIEN_THI.nhatKy) {
    chamNK.forEach(c => {
      const n = soNgayTT(gieo, c.ngay);
      if (n < 0 || n > nssMax) return;
      g += '<circle cx="' + x(n).toFixed(1) + '" cy="' + yE + '" r="5.5" fill="#fffdf7"/>';
      g += '<circle class="tt-cham" cx="' + x(n).toFixed(1) + '" cy="' + yE + '" r="4.2" fill="' + MAU_NHOM[c.nhom] + '"/>';
      // nhiều bản ghi cùng ngày: viền ngoài cho biết có nhiều thứ bên trong
      if (c.ds.length > 1) {
        g += '<circle cx="' + x(n).toFixed(1) + '" cy="' + yE + '" r="6.6" fill="none" stroke="' +
             MAU_NHOM[c.nhom] + '" stroke-width="1" opacity=".55"/>';
      }
      g += '<circle class="tt-hit-nk" data-ngay="' + c.ngay + '" cx="' + x(n).toFixed(1) + '" cy="' + yE +
           '" r="11" fill="transparent" style="cursor:pointer"/>';
    });
  }

  /* ---------- 6. VẠCH HÔM NAY ---------- */
  const nHN = soNgayTT(gieo, new Date().toISOString().slice(0, 10));
  if (nHN >= 0 && nHN <= nssMax) {
    const xh = x(nHN);
    g += '<line x1="' + xh.toFixed(1) + '" y1="22" x2="' + xh.toFixed(1) + '" y2="' + (yE + 11) +
         '" stroke="#2f4718" stroke-width="1.25" opacity=".45"/>';
    g += '<circle cx="' + xh.toFixed(1) + '" cy="' + yE + '" r="6.5" fill="none" stroke="#2f4718" stroke-width="1.5" opacity=".6"/>';
    const wN = 52, xN = Math.min(W - R - wN, Math.max(L, xh - wN / 2));
    g += '<rect x="' + xN.toFixed(1) + '" y="6" width="' + wN + '" height="16" rx="8" fill="#2f4718"/>';
    g += '<text x="' + (xN + wN / 2).toFixed(1) + '" y="17.5" text-anchor="middle" font-size="10" fill="#fff" font-weight="600">Hôm nay</text>';
  }

  /* ---------- 7. CON TRỎ ĐỌC SỐ ----------
     Các phần tử dựng sẵn, ẩn đi, rồi đổi toạ độ khi rê chuột. Dựng sẵn
     rẻ hơn nhiều so với chèn/xoá phần tử theo từng lần di chuột. */
  g += '<g id="ttTro" style="display:none;pointer-events:none">' +
       '<line id="troDoc" y1="' + T + '" y2="' + (T + ph) + '" stroke="#5c6352" stroke-width="1" opacity=".55"/>' +
       '<line id="troNgangMua" stroke="' + MAU_MUA + '" stroke-width="1" stroke-dasharray="3 3" opacity=".8"/>' +
       '<line id="troNgangNhiet" stroke="' + MAU_NHIET + '" stroke-width="1" stroke-dasharray="3 3" opacity=".8"/>' +
       '<circle id="troChamNhiet" r="3.4" fill="' + MAU_NHIET + '" stroke="#fffdf7" stroke-width="1.4"/>' +
       '<rect id="troNhanMuaNen" rx="3" fill="' + MAU_MUA + '"/>' +
       '<text id="troNhanMua" text-anchor="end" font-size="9.5" font-weight="700" fill="#fff"/>' +
       '<rect id="troNhanNhietNen" rx="3" fill="' + MAU_NHIET + '"/>' +
       '<text id="troNhanNhiet" text-anchor="start" font-size="9.5" font-weight="700" fill="#fff"/>' +
       '</g>';
  // vùng bắt chuột phủ kín, kể cả NGÀY KHÔNG MƯA — trước đây chỉ cột mưa
  // mới có vùng chạm nên mùa khô rê cả tuần không ra số nào
  g += '<rect id="ttBat" x="' + L + '" y="' + T + '" width="' + pw + '" height="' + ph +
       '" fill="transparent" style="cursor:crosshair"/>';

  oBd.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" role="img" ' +
    'aria-label="Biểu đồ mưa, nhiệt độ, bức xạ và nhật ký đồng theo ngày sau sạ">' + g + '</svg>';

  /* ---------- BẢNG GIAI ĐOẠN ---------- */
  const tomTat = BANG.map(gd => {
    const trong = tt.filter(d => {
      const n = soNgayTT(gieo, d.ngay);
      return n >= gd.tu && n < gd.den;
    });
    let mua = 0, sN = 0, dN = 0, bx = 0, coBx = false;
    trong.forEach(d => {
      mua += d.mua || 0;
      if (d.tMax != null && d.tMin != null) { sN += (d.tMax + d.tMin) / 2; dN++; }
      if (d.bucXa != null) { bx += d.bucXa; coBx = true; }
    });
    const soNK = chamNK.reduce((s, c) => {
      const n = soNgayTT(gieo, c.ngay);
      return s + ((n >= gd.tu && n < gd.den) ? c.ds.length : 0);
    }, 0);
    return { gd: gd, ngay: trong.length, mua: mua, nhiet: dN ? sN / dN : null, bx: coBx ? bx : null, nk: soNK };
  });

  if (oBang) {
    oBang.innerHTML =
      '<table class="tt-bang"><thead><tr>' +
      '<th>Giai đoạn</th><th>NSS</th><th>Ngày</th>' +
      '<th style="color:' + MAU_MUA + '">Mưa<br><small>mm</small></th>' +
      '<th style="color:' + MAU_NHIET + '">Nhiệt TB<br><small>°C</small></th>' +
      '<th style="color:' + MAU_BUCXA + '">Bức xạ<br><small>MJ/m²</small></th>' +
      '<th>Bản ghi</th></tr></thead><tbody>' +
      tomTat.map((t, i) =>
        '<tr data-gd="' + i + '"><td class="ten">' + escTT(t.gd.ten) +
        (t.gd.that ? '' : ' <span class="uoc" title="Ranh giới ước lượng, Notion không có mốc này">≈</span>') +
        '</td><td>' + t.gd.tu + '–' + Math.min(t.gd.den, nssMax) + '</td><td>' + t.ngay + '</td>' +
        '<td>' + (t.ngay ? Math.round(t.mua) : '—') + '</td>' +
        '<td>' + (t.nhiet != null ? soGon(t.nhiet) : '—') + '</td>' +
        '<td>' + (t.bx != null ? Math.round(t.bx) : '—') + '</td>' +
        '<td>' + (t.nk || '—') + '</td></tr>').join('') +
      '</tbody></table>';
  }

  ganTuongTac(oBd, oBang, {
    tt: tt, chamNK: chamNK, gieo: gieo, nssMax: nssMax,
    L: L, R: R, T: T, W: W, ph: ph, pw: pw,
    yMua: yMua, yNhiet: yNhiet, x: x, muaMax: muaMax
  });

  oChu.innerHTML = 'Mưa, nhiệt độ và bức xạ lấy tự động từ Open-Meteo (kho ERA5). ' +
    'Cột mưa <b>viền đậm</b> là ngày có số vũ kế đo tại ruộng — số đo tại ruộng luôn được ưu tiên hơn mô hình. ' +
    'Rê dọc biểu đồ để đọc số từng ngày; chấm tròn dưới trục là nhật ký đồng, chạm vào để xem.';
}

/* ======================================================================
   TƯƠNG TÁC: con trỏ đọc số · chấm nhật ký · đồng bộ bảng giai đoạn
   ====================================================================== */
function ganTuongTac(oBd, oBang, K) {
  const svg = oBd.querySelector('svg');
  if (!svg) return;

  /* ---------- tra cứu nhanh theo NSS ---------- */
  const theoNss = {};
  K.tt.forEach(d => {
    const n = soNgayTT(K.gieo, d.ngay);
    if (n >= 0 && n <= K.nssMax) theoNss[n] = d;
  });
  const nkTheoNgay = {};
  K.chamNK.forEach(c => { nkTheoNgay[c.ngay] = c; });

  const tro     = svg.querySelector('#ttTro');
  const doc     = svg.querySelector('#troDoc');
  const ngMua   = svg.querySelector('#troNgangMua');
  const ngNhiet = svg.querySelector('#troNgangNhiet');
  const chamN   = svg.querySelector('#troChamNhiet');
  const nhanM   = svg.querySelector('#troNhanMua');
  const nhanMN  = svg.querySelector('#troNhanMuaNen');
  const nhanN   = svg.querySelector('#troNhanNhiet');
  const nhanNN  = svg.querySelector('#troNhanNhietNen');
  const bat     = svg.querySelector('#ttBat');

  function datNhan(chu, nen, noiDung, xNeo, yNeo, veBenTrai) {
    if (!noiDung) { chu.style.display = 'none'; nen.style.display = 'none'; return; }
    chu.style.display = ''; nen.style.display = '';
    chu.textContent = noiDung;
    const w = noiDung.length * 5.4 + 10, h = 13;
    chu.setAttribute('x', veBenTrai ? xNeo - 5 : xNeo + 5);
    chu.setAttribute('y', yNeo + 3.4);
    nen.setAttribute('x', veBenTrai ? xNeo - w : xNeo);
    nen.setAttribute('y', yNeo - h / 2);
    nen.setAttribute('width', w);
    nen.setAttribute('height', h);
  }

  function ganCon(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    const sx = (clientX - rect.left) * (K.W / rect.width);
    let n = Math.round((sx - K.L) / K.pw * K.nssMax);
    n = Math.max(0, Math.min(K.nssMax, n));
    const d = theoNss[n];
    if (!d) { anTro(); return; }

    const xn = K.x(n);
    tro.style.display = '';
    doc.setAttribute('x1', xn.toFixed(1));
    doc.setAttribute('x2', xn.toFixed(1));

    /* Dóng ngang sang trục — đúng cái anh muốn: nhìn tới đâu là thấy con
       số tương ứng nằm ngay trên trục tới đó. */
    const m = d.mua || 0;
    if (HIEN_THI.mua && m > 0) {
      const ym = K.yMua(m);
      ngMua.style.display = '';
      ngMua.setAttribute('x1', K.L); ngMua.setAttribute('x2', xn.toFixed(1));
      ngMua.setAttribute('y1', ym.toFixed(1)); ngMua.setAttribute('y2', ym.toFixed(1));
      datNhan(nhanM, nhanMN, soGon(m) + ' mm', K.L, ym, true);
    } else {
      ngMua.style.display = 'none';
      datNhan(nhanM, nhanMN, null);
    }

    if (HIEN_THI.nhiet && d.tMax != null) {
      const yt = K.yNhiet(d.tMax);
      ngNhiet.style.display = '';
      ngNhiet.setAttribute('x1', xn.toFixed(1)); ngNhiet.setAttribute('x2', K.W - K.R);
      ngNhiet.setAttribute('y1', yt.toFixed(1)); ngNhiet.setAttribute('y2', yt.toFixed(1));
      chamN.style.display = '';
      chamN.setAttribute('cx', xn.toFixed(1)); chamN.setAttribute('cy', yt.toFixed(1));
      datNhan(nhanN, nhanNN, soGon(d.tMax) + '°', K.W - K.R, yt, false);
    } else {
      ngNhiet.style.display = 'none';
      chamN.style.display = 'none';
      datNhan(nhanN, nhanNN, null);
    }

    /* ---------- nội dung hộp ---------- */
    const dd = d.ngay.slice(8, 10) + '/' + d.ngay.slice(5, 7);
    let h = '<b>' + dd + '</b> · NSS ' + n;
    if (HIEN_THI.mua) {
      h += '<br>Mưa ' + soGon(m) + ' mm';
      if (d.doRuong) h += ' <span class="tt-phu">(đo tại ruộng' +
        (d.muaMeteo != null ? '; Open-Meteo ' + soGon(d.muaMeteo) : '') + ')</span>';
    }
    if (HIEN_THI.nhiet && d.tMax != null) {
      h += '<br>Nhiệt ' + soGon(d.tMax) + '°' + (d.tMin != null ? ' / ' + soGon(d.tMin) + '°' : '');
    }
    if (HIEN_THI.bucXa && d.bucXa != null) h += '<br>Bức xạ ' + soGon(d.bucXa) + ' MJ/m²';
    const c = nkTheoNgay[d.ngay];
    if (HIEN_THI.nhatKy && c) {
      h += '<br><span class="tt-phu">' + c.ds.length + ' bản ghi nhật ký — chạm vào chấm để xem</span>';
    }
    hienHop(clientX, clientY, h);
  }

  function anTro() { tro.style.display = 'none'; anHop(); }

  bat.addEventListener('mousemove', e => ganCon(e.clientX, e.clientY));
  bat.addEventListener('mouseleave', anTro);
  bat.addEventListener('touchstart', e => ganCon(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  bat.addEventListener('touchmove',  e => ganCon(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

  /* ---------- chấm nhật ký ----------
     Bấm/chạm vào chấm thì LIỆT KÊ ĐẦY ĐỦ mọi bản ghi của ngày đó, xếp
     Vấn đề lên trên cùng. */
  svg.querySelectorAll('.tt-hit-nk').forEach(el => {
    const c = nkTheoNgay[el.getAttribute('data-ngay')];
    if (!c) return;
    const hien = (cx, cy) => {
      const dd = c.ngay.slice(8, 10) + '/' + c.ngay.slice(5, 7);
      const ds = c.ds.slice().sort((a, b) =>
        UU_TIEN_NHOM.indexOf(a.nhom) - UU_TIEN_NHOM.indexOf(b.nhom));
      let h = '<b>' + dd + '</b> · NSS ' + soNgayTT(K.gieo, c.ngay) +
              (ds.length > 1 ? ' · ' + ds.length + ' bản ghi' : '');
      ds.forEach(e => {
        const phu = [e.hoatDong, (e.vanDe || []).join(', '), e.mucDo].filter(Boolean).join(' · ');
        h += '<br><span style="color:' + (MAU_NHOM[e.nhom] || '#b9bfae') + '">●</span> ' + escTT(e.ten) +
             (phu ? '<br><span class="tt-phu" style="margin-left:12px">' + escTT(phu) + '</span>' : '');
      });
      hienHop(cx, cy, h);
    };
    el.addEventListener('mouseenter', e => hien(e.clientX, e.clientY));
    el.addEventListener('mousemove',  e => hien(e.clientX, e.clientY));
    el.addEventListener('mouseleave', anHop);
    el.addEventListener('touchstart', e => { hien(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  });

  /* ---------- đồng bộ băng giai đoạn ↔ bảng ---------- */
  const bang = svg.querySelectorAll('.tt-gd');
  const dong = oBang ? oBang.querySelectorAll('tr[data-gd]') : [];
  function sang(i, bat_) {
    bang.forEach(b => { if (+b.getAttribute('data-gd') === i) b.setAttribute('opacity', bat_ ? '.09' : '0'); });
    dong.forEach(d => { if (+d.getAttribute('data-gd') === i) d.classList.toggle('sang', bat_); });
  }
  bang.forEach(b => {
    const i = +b.getAttribute('data-gd');
    b.addEventListener('mouseenter', () => sang(i, true));
    b.addEventListener('mouseleave', () => sang(i, false));
  });
  dong.forEach(d => {
    const i = +d.getAttribute('data-gd');
    d.addEventListener('mouseenter', () => sang(i, true));
    d.addEventListener('mouseleave', () => sang(i, false));
  });

  window.addEventListener('scroll', anHop, { passive: true });
  document.addEventListener('touchend', anHop, { passive: true });
}
