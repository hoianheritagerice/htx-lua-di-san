/* Giao diện giới thiệu, thư viện ảnh và quyền lợi gói. Không ghi Notion. */
let GOI_DANG_XEM = 'tat-ca';
let ANH_CANH_DONG = [], ANH_DANG_XEM = 0;
let NUT_MOC_CU = null;
function noiDungCD(){ return typeof NOI_DUNG !== 'undefined' ? NOI_DUNG : window.NOI_DUNG; }
function chuCD(s){ const e=document.createElement('span');e.innerHTML=s||'';return e.textContent; }
function tenVuCD(ma){
  const k=/^(HT|DX)(\d{2})$/.exec(ma);
  return k ? 'Vụ '+(k[1]==='HT'?'Hè Thu':'Đông Xuân')+' 20'+k[2] : ma;
}
function capNhatNhanVuCD(){
  const ten=CAU_HINH_CANH_DONG.dong[DONG_HIEN_TAI].ten;
  document.getElementById('cdVuNhan').textContent=ten+' · '+tenVuCD(VU_HIEN_TAI)+' · Số liệu phần canh tác hữu cơ';
  document.getElementById('selVuTrang').value=VU_HIEN_TAI;
  veChonGoiCD();
}
function capNhatDiaChiCD(){
  const u=new URL(location.href);u.searchParams.set('dong',DONG_HIEN_TAI);u.searchParams.set('vu',VU_HIEN_TAI);
  if(GOI_DANG_XEM==='tat-ca') u.searchParams.delete('goi');else u.searchParams.set('goi',GOI_DANG_XEM);
  history.replaceState(null,'',u);
}
function veGioiThieuCD(ma){
  const cfg=CAU_HINH_CANH_DONG.dong[ma], nd=noiDungCD().canhDong.muc[cfg.slug];
  document.getElementById('cdTen').innerHTML=nd.ten;
  document.getElementById('cdViTri').innerHTML='01 · '+nd.phu;
  document.getElementById('cdDan').innerHTML=nd.dan;
  document.getElementById('cdMoTa').innerHTML=(nd.than||[]).map(k=>'<article><h3>'+k.h+'</h3>'+(k.p||[]).map(p=>'<p>'+p+'</p>').join('')+(k.ds?'<ul>'+k.ds.map(t=>'<li>'+t+'</li>').join('')+'</ul>':'')+'</article>').join('');
  ANH_CANH_DONG=cfg.anh.length?cfg.anh:[{thumb:nd.anh,src:nd.anh,chu:chuCD(nd.ten)+' · '+chuCD(nd.phu)}];
  const grid=document.getElementById('cdAnh');grid.replaceChildren();grid.dataset.anhCount=Math.min(5,ANH_CANH_DONG.length);
  ANH_CANH_DONG.slice(0,5).forEach((a,i)=>{
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Xem ảnh '+(i+1)+' · '+cfg.ten);
    const img=document.createElement('img');img.src=a.thumb||a.src;img.alt=a.chu||cfg.ten;img.width=640;img.height=480;img.loading=i?'lazy':'eager';img.decoding='async';
    img.addEventListener('error',()=>{img.hidden=true;b.textContent='Ảnh chưa tải được';});
    b.append(img);b.addEventListener('click',()=>moAnhCD(i));grid.append(b);
  });
  document.getElementById('cdXemAnh').textContent=ANH_CANH_DONG.length>1?'Xem tất cả '+ANH_CANH_DONG.length+' ảnh':'Xem ảnh lớn ↗';
}
function veAnhLonCD(){
  const a=ANH_CANH_DONG[ANH_DANG_XEM], img=document.getElementById('cdAnhLon');
  img.hidden=false;document.getElementById('cdAnhLoi').hidden=true;img.alt=a.chu||'Ảnh cánh đồng';img.src=a.src;
  document.getElementById('cdAnhChu').textContent=(ANH_DANG_XEM+1)+' / '+ANH_CANH_DONG.length+' · '+(a.chu||'');
  ['cdAnhTruoc','cdAnhSau'].forEach(id=>document.getElementById(id).disabled=ANH_CANH_DONG.length<2);
  document.querySelectorAll('#cdAnhLuoi button').forEach((b,i)=>b.setAttribute('aria-current',String(i===ANH_DANG_XEM)));
}
function moAnhCD(i){
  ANH_DANG_XEM=i;
  const dlg=document.getElementById('cdLightbox'), luoi=document.getElementById('cdAnhLuoi');
  document.getElementById('cdAnhTen').textContent=CAU_HINH_CANH_DONG.dong[DONG_HIEN_TAI].ten;
  luoi.replaceChildren();
  ANH_CANH_DONG.forEach((a,j)=>{
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Xem ảnh '+(j+1));
    const img=document.createElement('img');img.src=a.thumb||a.src;img.alt='';img.loading='lazy';img.width=72;img.height=52;
    b.append(img);b.addEventListener('click',()=>{ANH_DANG_XEM=j;veAnhLonCD();});luoi.append(b);
  });
  veAnhLonCD();dlg.showModal();document.documentElement.style.overflow='hidden';
}
function quyenLoiCD(maGoi){
  const rieng=CAU_HINH_CANH_DONG.quyenLoiTheoVu[DONG_HIEN_TAI+':'+VU_HIEN_TAI];
  return rieng && rieng[maGoi] || CAU_HINH_CANH_DONG.goi[maGoi]?.hoatDong || [];
}
function cacGoiCD(sk){return Object.keys(CAU_HINH_CANH_DONG.goi).filter(k=>quyenLoiCD(k).includes(sk.id));}
function veChonGoiCD(){
  const o=document.getElementById('cdChonGoi');o.replaceChildren();
  [['tat-ca','Toàn bộ timeline'],...Object.entries(CAU_HINH_CANH_DONG.goi).map(([k,v])=>[k,chuCD(noiDungCD().goi.muc[k]?.ten||v.nhan)])].forEach(([k,t])=>{
    const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',String(GOI_DANG_XEM===k));
    b.addEventListener('click',()=>{GOI_DANG_XEM=k;capNhatDiaChiCD();veChonGoiCD();apDungGoiCD();});o.append(b);
  });
  const mo=document.getElementById('cdGoiMo');
  if(GOI_DANG_XEM==='tat-ca') mo.textContent='Xem trọn hành trình canh tác, lễ cúng và trải nghiệm. Chạm vào biểu tượng để xem chi tiết.';
  else{
    const cfg=CAU_HINH_CANH_DONG.goi[GOI_DANG_XEM];
    const theoVu=CAU_HINH_CANH_DONG.quyenLoiTheoVu[DONG_HIEN_TAI+':'+VU_HIEN_TAI]?.[GOI_DANG_XEM];
    mo.textContent=quyenLoiCD(GOI_DANG_XEM).length+' hoạt động trong gói · '+cfg.doiTuong+' '+(theoVu?'Quyền lợi áp dụng cho mùa vụ này.':'Tham khảo quyền lợi chương trình hiện hành.')+' Lịch trải nghiệm sẽ được HTX xác nhận.';
    const a=document.createElement('a');a.href='chi-tiet.html?loai=san-pham&ma='+GOI_DANG_XEM;a.textContent='Xem quyền lợi gói ↗';mo.append(a);
  }
}
function apDungGoiCD(){
  document.querySelectorAll('.river-node').forEach(node=>{
    const co=GOI_DANG_XEM!=='tat-ca'&&quyenLoiCD(GOI_DANG_XEM).includes(node.dataset.hoatDong);
    node.classList.toggle('trong-goi',co);node.classList.toggle('ngoai-goi',GOI_DANG_XEM!=='tat-ca'&&!co);
    node.querySelector('.cd-trong-goi')?.remove();
    if(co){const b=document.createElement('span');b.className='cd-trong-goi';b.textContent='Có trong gói';node.querySelector('.river-label').append(b);}
  });
}
async function layDuLieuCD(body){
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),40000);
  try{const res=await fetch(API_URL_TL,{method:'POST',body:JSON.stringify(body),signal:controller.signal});if(!res.ok)throw new Error('HTTP '+res.status);return await res.json();}
  finally{clearTimeout(timer);}
}
function khoiTaoCanhDong(){
  const q=new URLSearchParams(location.search), ds=CAU_HINH_CANH_DONG.dong;
  const dong=q.get('dong');DONG_HIEN_TAI=ds[dong]?dong:Object.keys(ds).find(k=>ds[k].slug===dong)||'CKOD';
  if(/^(HT|DX)\d{2}$/.test(q.get('vu')||'')){VU_HIEN_TAI=q.get('vu');CHON_VU_THU_CONG=true;}
  if(CAU_HINH_CANH_DONG.goi[q.get('goi')])GOI_DANG_XEM=q.get('goi');
  const sel=document.getElementById('selVuTrang');
  ['HT26','DX26','HT25','DX25','HT24','DX24',VU_HIEN_TAI].filter((v,i,a)=>a.indexOf(v)===i).forEach(v=>{if(!Array.from(sel.options).some(o=>o.value===v))sel.add(new Option(tenVuCD(v),v));});
  document.getElementById('cdXemAnh').addEventListener('click',()=>moAnhCD(0));
  const dlg=document.getElementById('cdLightbox');
  document.getElementById('cdDongAnh').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('close',()=>{document.documentElement.style.overflow='';document.getElementById('cdAnhLon').removeAttribute('src');});
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
  const doi=n=>{ANH_DANG_XEM=(ANH_DANG_XEM+n+ANH_CANH_DONG.length)%ANH_CANH_DONG.length;veAnhLonCD();};
  document.getElementById('cdAnhTruoc').addEventListener('click',()=>doi(-1));document.getElementById('cdAnhSau').addEventListener('click',()=>doi(1));
  dlg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();doi(e.key==='ArrowLeft'?-1:1);}});
  document.getElementById('cdAnhLon').addEventListener('error',()=>{document.getElementById('cdAnhLon').hidden=true;document.getElementById('cdAnhLoi').hidden=false;});
  const moc=document.getElementById('mpCT');
  moc.querySelector('.dong').addEventListener('click',()=>NUT_MOC_CU?.focus());
  moc.addEventListener('keydown',e=>{
    if(e.key==='Escape'){dongModal('mpCT');NUT_MOC_CU?.focus();}
    if(e.key==='Tab'){e.preventDefault();moc.querySelector('.dong').focus();}
  });
  chonDong(document.querySelector('[data-dong="'+DONG_HIEN_TAI+'"]'),ds[DONG_HIEN_TAI].ten,DONG_HIEN_TAI);
}
