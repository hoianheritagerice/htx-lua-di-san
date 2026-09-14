/* Timeline: đường cong ở dải riêng; tên/ngày/ảnh nằm ngoài dải đó.
 * Tính lại khi thay gói, tải ảnh, tải phông chữ hoặc đổi kích thước màn hình.
 */
const ANH_MOC_CD = {
  'le-xuong-dong':'01-le-cung-xuong-dong', 'gieo-sa':'02-gieo-sa',
  'xuong-giong':'03-cung-xuong-giong', 'giai-doan-ma':'04-giai-doan-ma',
  'de-nhanh':'05-de-nhanh-ro', 'lam-dong':'06-lam-dong',
  'tro-bong':'07-tro-bong', 'tham-dong':'08-tham-dong-lua-tro',
  'chac-hat':'09-chac-hat', 'chin-vang':'10-chin-vang',
  'thu-hoach':'11-thu-hoach', 'ngay-hoi-gat':'12-ngay-hoi-gat', 'com-moi':'13-cung-com-moi'
};
function anhHoatDongCD(s){
  if(s.anhXacNhan)return {src:s.anhXacNhan,chu:'Ảnh hoạt động · '+CAU_HINH_CANH_DONG.dong[DONG_HIEN_TAI].ten+' · '+tenVuCD(VU_HIEN_TAI)};
  const cfg=CAU_HINH_CANH_DONG.anhTimeline;
  if(!cfg?.bat||!ANH_MOC_CD[s.id])return null;
  return {src:cfg.thuMuc+'/'+ANH_MOC_CD[s.id]+'.'+cfg.duoi,chu:'Ảnh minh họa · '+s.ten};
}
function iconHoatDongCD(id){
  // Bông lúa rủ: cuống cong, nhánh nhỏ và hạt thon; không dùng bông lúa mì.
  const hat='<path d="M8 29C9 22 9 14 13 8c5-6 13-3 14 4M9 23C5 20 3 16 3 12c4 4 6 8 6 11Zm1-4c2-4 5-6 9-7-4 3-6 6-9 7Z"/>'
    +'<path d="m15 6-1 6m4-7-1 9m5-8-2 9m5-6-1 9m3-6 1 7M14 10l-3 4m6-4 2 6m2-5 2 6" stroke-width="1.1"/>'
    +'<g fill="var(--icon-accent)" stroke-width="1.1"><ellipse cx="11" cy="15" rx="1.3" ry="2.3" transform="rotate(20 11 15)"/><ellipse cx="14" cy="13" rx="1.3" ry="2.3"/><ellipse cx="17" cy="15" rx="1.3" ry="2.3"/><ellipse cx="19" cy="17" rx="1.3" ry="2.3" transform="rotate(-12 19 17)"/><ellipse cx="21" cy="16" rx="1.3" ry="2.3"/><ellipse cx="23" cy="18" rx="1.3" ry="2.3"/><ellipse cx="25" cy="19" rx="1.3" ry="2.3"/><ellipse cx="28" cy="20" rx="1.3" ry="2.3" transform="rotate(-15 28 20)"/></g>';
  const shapes={
    'le-xuong-dong':'<path d="M7 20h18l-3 7H10Z" fill="var(--icon-accent)"/><path d="M11 19V9m5 10V6m5 13V9M9 29h14M11 6c2-2-1-2 0-4m5 1c2-2-1-2 0-3m5 6c2-2-1-2 0-4"/>',
    'gieo-sa':'<path d="m5 10 7 2 5-3c3-2 5 1 2 3l-4 3-5 1-5-1M5 9v9M5 27h23"/><path d="M14 20c-4-3-6 0-3 2 2 1 3-1 3-2Zm8-3c-4-3-6 0-3 2 2 1 3-1 3-2Zm3 7c-4-3-6 0-3 2 2 1 3-1 3-2Z" fill="var(--icon-accent)"/>',
    'xuong-giong':'<path d="M4 25c5-2 7 2 12 0s7 2 12 0M16 25V14m-7 1 4-4 6 1m-3 8 6-4 6 1"/><path d="M16 15c-6 0-8-4-6-7 4 0 6 3 6 7Zm0-3c0-5 3-8 7-7 1 4-2 7-7 7Z" fill="var(--icon-accent)"/>',
    'giai-doan-ma':'<path d="M6 28h21M16 27V15"/><path d="M16 20C5 20 5 11 6 10c7 0 10 4 10 10Zm0-4C16 6 22 4 27 5c0 7-4 11-11 11Z" fill="var(--icon-accent)"/>',
    'de-nhanh':'<path d="M4 28h24M16 27V8M10 27V17m12 10V14"/><path d="M16 15c-5 0-7-4-6-6 4 0 6 2 6 6Zm0-4c5 0 7-4 6-6-4 0-6 2-6 6ZM10 22c-5 0-7-4-6-6 4 0 6 2 6 6Zm12-3c5 0 7-4 6-6-4 0-6 2-6 6Z" fill="var(--icon-accent)"/>',
    'lam-dong':'<path d="M16 28V13M7 28h18"/><path d="M16 19C8 12 12 5 16 3c4 4 8 11 0 16Z" fill="var(--icon-accent)"/><path d="M16 25c-6-1-9-5-9-9 6 0 9 4 9 9Zm0-3c6-1 9-5 9-9-6 0-9 4-9 9Z"/>',
    'tro-bong':hat+'<path d="M25 3v5m-2.5-2.5h5M5 12v4m-2-2h4" stroke="var(--icon-accent)"/>',
    'tham-dong':'<path d="m5 11 10-7 10 7Z" fill="var(--icon-accent)"/><path d="M10 12a5 5 0 0 0 10 0M7 28v-4a8 8 0 0 1 16 0v4M4 28h24M26 20v-5m-3 3 3 2 3-2"/>',
    'chac-hat':hat,
    'chin-vang':hat+'<path d="m10 27 5-5m-5 5 1-6" stroke="var(--icon-accent)"/>',
    'thu-hoach':'<path d="M17 4c12 0 16 16 5 20 5-6 4-12-5-14Z" fill="var(--icon-accent)"/><path d="m22 24-5 5-3-3 6-6M8 26V8m0 6-4-4m4 9 5-5m-5 9-4-4"/>',
    'ngay-hoi-gat':'<path d="m10 28 3-10L9 5m13 23-3-10 4-13M16 27V4"/><path d="m8 10 5 3m10-3-4 3M12 18h8v5h-8Z" fill="var(--icon-accent)"/><path d="M13 21 8 25m11-4 5 4M8 6l2-2 2 2m2-3 2-2 2 2m3 3 2-2 2 2"/>',
    'com-moi':'<path d="M4 18h24c-1 7-5 10-12 10S5 25 4 18Z" fill="var(--icon-accent)"/><path d="M7 17c1-5 5-7 9-7s8 2 9 7M11 7c3-3-2-3 0-6m6 6c3-3-2-3 0-6m6 6c3-3-2-3 0-6M10 30h12"/>'
  };
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[id]||shapes['giai-doan-ma'])+'</svg>';
}

// Hàm thuần để kiểm chứng khoảng cách đường, biểu tượng và nhãn ở mọi bề rộng.
function tinhBoCucTimelineCD(width,heights){
  const mobile=width<680, center=mobile?68:width/2, amplitude=mobile?28:Math.min(180,width*.18);
  const labelEdge=mobile?142:center+amplitude+74;
  const labelWidth=mobile?Math.max(110,width-152):Math.min(310,width/2-amplitude-86);
  let y=24;
  const points=heights.map((height,i)=>{
    const rowHeight=Math.max(160,height+64), cy=y+rowHeight/2;
    const right=mobile||i%2===0;
    const p={x:center+(i%2?amplitude:-amplitude),y:cy,label:{x:right?labelEdge:center-amplitude-74-labelWidth,y:cy-height/2,width:labelWidth,height},right};
    y+=rowHeight;return p;
  });
  return {width,height:y+24,points,mobile};
}
function chamNhauCD(a,b,gap=6){return a.x < b.x+b.width+gap && a.x+a.width+gap > b.x && a.y < b.y+b.height+gap && a.y+a.height+gap > b.y;}
function viTriHomNayCD(layout,anchor){
  const w=80,h=28, points=layout.points;
  const near=points.find(p=>Math.abs(p.y-anchor.y)<=48);
  if(near){
    const box={x:Math.max(2,Math.min(layout.width-w-2,near.x-w/2)),y:near.y+44,width:w,height:h};
    return {box,anchor:{x:near.x,y:near.y+32},huong:'duoi',ganMoc:true};
  }
  const obstacles=points.flatMap(p=>[p.label,{x:p.x-34,y:p.y-34,width:68,height:68}]);
  const ds=[
    {x:anchor.x+16,y:anchor.y-h/2,huong:'phai'},
    {x:anchor.x-w-16,y:anchor.y-h/2,huong:'trai'},
    {x:Math.max(2,Math.min(layout.width-w-2,anchor.x-w/2)),y:anchor.y+18,huong:'duoi'},
    {x:Math.max(2,Math.min(layout.width-w-2,anchor.x-w/2)),y:anchor.y-h-18,huong:'tren'}
  ];
  const safe=c=>c.x>=2&&c.x+w<=layout.width-2&&c.y>=0&&c.y+h<=layout.height&&!obstacles.some(o=>chamNhauCD({...c,width:w,height:h},o));
  let choice=ds.find(safe);
  if(!choice){
    // Quãng trống giữa hai hàng luôn có ít nhất 64px để đặt nhãn 28px.
    for(const dy of [-28,28,-56,56,-84,84]){
      choice=ds.map(c=>({...c,y:c.y+dy})).find(safe);if(choice)break;
    }
  }
  // Không có ô an toàn thì để thông tin Hôm nay ở tiêu đề, tuyệt đối không đè chữ.
  return choice?{box:{...choice,width:w,height:h},anchor,huong:choice.huong,ganMoc:false}:null;
}
let FRAME_TIMELINE_CD=0, BO_CUC_TIMELINE_CD=null;
function henXepTimelineCD(){
  cancelAnimationFrame(FRAME_TIMELINE_CD);
  FRAME_TIMELINE_CD=requestAnimationFrame(xepTimelineCD);
}
function xepTimelineCD(){
  const river=document.getElementById('river');if(!river)return;
  const nodes=Array.from(river.querySelectorAll('.river-node'));if(!nodes.length)return;
  const width=river.clientWidth||Math.min(960,window.innerWidth-44);
  const base=tinhBoCucTimelineCD(width,nodes.map(()=>100));
  nodes.forEach((node,i)=>{node.querySelector('.river-label').style.width=base.points[i].label.width+'px';});
  const heights=nodes.map(node=>node.querySelector('.river-label').offsetHeight||100+(node.querySelector('.cd-tl-photo')?140:0));
  const layout=tinhBoCucTimelineCD(width,heights);BO_CUC_TIMELINE_CD=layout;
  river.style.height=layout.height+'px';
  nodes.forEach((node,i)=>{
    const p=layout.points[i],label=node.querySelector('.river-label');
    node.style.left=p.x+'px';node.style.top=p.y+'px';
    label.style.left=(p.label.x-p.x+32)+'px';label.style.top='32px';label.style.textAlign=p.right?'left':'right';
  });
  const svg=river.querySelector('svg.path');svg.setAttribute('viewBox','0 0 '+width+' '+layout.height);
  let d='M '+layout.points[0].x+' '+(layout.points[0].y-32);
  d+=' L '+layout.points[0].x+' '+layout.points[0].y;
  for(let i=1;i<layout.points.length;i++){
    const a=layout.points[i-1],b=layout.points[i],delta=(b.y-a.y)/3;
    d+=' C '+a.x+' '+(a.y+delta)+' '+b.x+' '+(b.y-delta)+' '+b.x+' '+b.y;
  }
  const last=layout.points.at(-1);d+=' L '+last.x+' '+(last.y+32);
  document.getElementById('riverBase').setAttribute('d',d);document.getElementById('riverDone').setAttribute('d',d);
  veHomNayCD(layout);
}
function veHomNayCD(layout){
  const river=document.getElementById('river');river.querySelector('.cd-today')?.remove();
  const path=document.getElementById('riverDone'),base=document.getElementById('riverBase');
  path.removeAttribute('mask');base.removeAttribute('mask');river.querySelector('#cdTodayMask')?.remove();
  path.style.strokeDasharray='0 10000';
  const txt=document.getElementById('phaseTxt'),phase=document.getElementById('phaseNow');
  phase.querySelector('.pn-dot').style.display='none';
  const ds=SU_KIEN.map((s,i)=>({s,i})).filter(x=>x.s.ngay&&!['Hủy','Hoãn'].includes(x.s.trangThai));
  if(!ds.length){txt.textContent='Chưa có lịch cho mùa vụ này';return;}
  const date=s=>new Date(s.ngay+'T00:00:00').getTime(),today=HOM_NAY.getTime();
  if(today<date(ds[0].s)){txt.textContent='Mùa vụ sắp bắt đầu';return;}
  if(today>date(ds.at(-1).s)){txt.textContent='Đã qua các mốc lịch hiện có';return;}
  let anchor=layout.points[ds[0].i];
  for(let j=0;j<ds.length-1;j++){
    const a=ds[j],b=ds[j+1];if(today<date(a.s)||today>date(b.s))continue;
    const t=(today-date(a.s))/Math.max(1,date(b.s)-date(a.s));
    // Nội suy theo vị trí các mốc, kể cả mốc chưa có ngày nằm giữa.
    const fractional=a.i+(b.i-a.i)*t,k=Math.min(Math.floor(fractional),layout.points.length-2),u=fractional-k;
    const p=layout.points[k],q=layout.points[k+1],smooth=u*u*(3-2*u);
    anchor={x:p.x+(q.x-p.x)*smooth,y:p.y+(q.y-p.y)*u};break;
  }
  txt.textContent='Vị trí hôm nay trên lịch mùa vụ';phase.querySelector('.pn-dot').style.display='';
  const placed=viTriHomNayCD(layout,anchor);
  if(placed){
    const t=document.createElement('div');t.className='cd-today';
    const label=document.createElement('span');label.className='cd-today-label '+placed.huong;label.textContent='Hôm nay';
    label.style.left=placed.box.x+'px';label.style.top=placed.box.y+'px';t.append(label);
    if(!placed.ganMoc){const dot=document.createElement('span');dot.className='cd-today-dot';dot.style.left=anchor.x+'px';dot.style.top=anchor.y+'px';t.append(dot);}
    river.append(t);
    // Cắt nét đường phía sau nhãn, kể cả khi Hôm nay nằm ngay dưới biểu tượng.
    const ns='http://www.w3.org/2000/svg',mask=document.createElementNS(ns,'mask');mask.id='cdTodayMask';mask.setAttribute('maskUnits','userSpaceOnUse');
    const white=document.createElementNS(ns,'rect');white.setAttribute('width',layout.width);white.setAttribute('height',layout.height);white.setAttribute('fill','white');
    const hole=document.createElementNS(ns,'rect');for(const [key,value] of Object.entries({x:placed.box.x-5,y:placed.box.y-7,width:placed.box.width+10,height:placed.box.height+12,rx:8,fill:'black'}))hole.setAttribute(key,value);
    mask.append(white,hole);river.querySelector('defs').append(mask);path.setAttribute('mask','url(#cdTodayMask)');base.setAttribute('mask','url(#cdTodayMask)');
  }
  try{
    const total=path.getTotalLength();let lo=0,hi=total;
    for(let k=0;k<26;k++){const mid=(lo+hi)/2;if(path.getPointAtLength(mid).y<anchor.y)lo=mid;else hi=mid;}
    path.style.strokeDasharray=lo+' '+total;
  }catch(e){}
}
function veHanhTrinhCD(){
  const river=document.getElementById('river');river.querySelectorAll('.river-node,.cd-today').forEach(n=>n.remove());
  SU_KIEN.forEach((s,i)=>{
    const node=document.createElement('button');node.type='button';node.className='river-node';node.dataset.hoatDong=s.id;
    const date=s.ngay?s.ngay.split('-').reverse().slice(0,2).join('/'):'Chưa có ngày';
    const status=s.trangThai||(s.ngay?(s.duKien?'Dự kiến':'Mốc mùa vụ'):'');
    node.setAttribute('aria-label',s.ten+' · '+date+(status?' · '+status:''));
    node.innerHTML='<span class="river-dot '+s.loai+'">'+iconHoatDongCD(s.id)+'</span><span class="river-label"><span class="t">'+s.ten+'</span><span class="d">'+date+(status?' · '+status:'')+'</span></span>';
    const anh=anhHoatDongCD(s);
    if(anh){
      const box=document.createElement('span');box.className='cd-tl-photo';
      const img=document.createElement('img');img.src=anh.src;img.alt=anh.chu;img.loading='lazy';img.decoding='async';img.width=400;img.height=260;
      const caption=document.createElement('span');caption.textContent=s.anhXacNhan?'Ảnh hoạt động':'Ảnh minh họa';
      img.addEventListener('load',henXepTimelineCD);img.addEventListener('error',()=>{box.remove();henXepTimelineCD();});
      box.append(img,caption);node.querySelector('.river-label').append(box);
    }
    node.addEventListener('click',()=>moCT(i));river.append(node);
  });
  ['gieo-sa','le-xuong-dong','tham-dong'].forEach((id,i)=>{const chip=document.querySelectorAll('.tl-legend .chip')[i];if(chip)chip.innerHTML=iconHoatDongCD(id);});
  apDungGoiCD();xepTimelineCD();
}
window.addEventListener('resize',henXepTimelineCD,{passive:true});
if(document.fonts)document.fonts.ready.then(henXepTimelineCD);
