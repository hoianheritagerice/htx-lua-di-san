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
  // Lá hình dải dài, đầu nhọn; các dảnh chung gốc. Màu hạt độc lập màu chọn gói.
  const laMa='<path d="M16 27Q13 17 8 7Q14 13 16 27ZM16 23Q17 10 22 3Q19 14 16 23ZM16 27Q21 18 27 15Q22 20 16 27Z" fill="#6b9144" stroke="#365e30" stroke-width=".8"/>';
  const laThan='<path d="M10 27Q7 17 3 12Q9 16 10 27ZM11 22Q16 13 22 12Q17 15 11 22Z" fill="#6b9144" stroke="#365e30" stroke-width=".8"/>';
  const bong=(chin=false)=>laThan+'<g stroke="'+(chin?'#977024':'#426d35')+'" stroke-width="1.2"><path d="M10 29C11 22 10 12 14 7C18 1 25 4 27 10"/><path d="m15 6-2 4m5-6-1 5m5-4-1 6m4-4-1 6m3-3 1 6" stroke-width=".8"/><g fill="'+(chin?'#edbc38':'#b6c76b')+'" stroke-width=".75"><ellipse cx="12" cy="11" rx="1.15" ry="2.3" transform="rotate(25 12 11)"/><ellipse cx="16" cy="10" rx="1.15" ry="2.3" transform="rotate(12 16 10)"/><ellipse cx="20" cy="12" rx="1.15" ry="2.3"/><ellipse cx="24" cy="14" rx="1.15" ry="2.3" transform="rotate(-12 24 14)"/><ellipse cx="28" cy="17" rx="1.15" ry="2.3" transform="rotate(-18 28 17)"/></g></g>';
  const shapes={
    'le-xuong-dong':'<path d="M7 20h18l-3 7H10Z" fill="var(--icon-accent)"/><path d="M11 19V9m5 10V6m5 13V9M9 29h14M11 6c2-2-1-2 0-4m5 1c2-2-1-2 0-3m5 6c2-2-1-2 0-4"/>',
    'gieo-sa':'<path d="m5 10 7 2 5-3c3-2 5 1 2 3l-4 3-5 1-5-1M5 9v9M5 28h23"/><g fill="#edbc38" stroke="#977024" stroke-width=".8"><ellipse cx="12" cy="22" rx="1.1" ry="2.5" transform="rotate(40 12 22)"/><ellipse cx="20" cy="19" rx="1.1" ry="2.5" transform="rotate(25 20 19)"/><ellipse cx="25" cy="25" rx="1.1" ry="2.5" transform="rotate(50 25 25)"/></g>',
    'xuong-giong':laMa+'<path d="M4 27q4-2 8 0t8 0t8 0" stroke="#668c89" stroke-width="1.1"/>',
    'giai-doan-ma':laMa+'<path d="m16 27-3 3m3-3v3m0-3 3 3" stroke="#94764b" stroke-width=".9"/>',
    'de-nhanh':'<g stroke="#365e30" stroke-width="1.1"><path d="M16 28Q10 20 9 10M16 28V5M16 28Q23 18 24 9"/><path d="M10 19Q5 11 3 9Q8 12 10 19ZM15 17Q10 8 9 3Q14 9 15 17ZM16 20Q18 9 21 4Q20 14 16 20ZM21 20Q25 13 30 12Q25 16 21 20Z" fill="#6b9144" stroke-width=".7"/></g><path d="m16 28-4 2m4-2v2m0-2 4 2" stroke="#94764b" stroke-width=".9"/>',
    'lam-dong':'<path d="M15 29V8" stroke="#365e30" stroke-width="1.2"/><path d="M15 25Q8 14 5 10Q13 15 15 25ZM16 21Q21 10 27 7Q22 14 16 21ZM15 17Q12 8 13 3Q16 8 15 17Z" fill="#6b9144" stroke="#365e30" stroke-width=".8"/><path d="M14 22Q13 16 15 10Q18 16 16 22Z" fill="#a9bf67" stroke="#426d35" stroke-width=".9"/>',
    'tro-bong':laThan+'<path d="M10 29Q11 16 15 6Q17 2 21 4M15 7l4 3m-5 1 4 3m-5 1 3 3" stroke="#426d35" stroke-width="1"/><g fill="#c1d38c" stroke="#557c3b" stroke-width=".65"><ellipse cx="21" cy="5" rx="1" ry="2" transform="rotate(-30 21 5)"/><ellipse cx="19" cy="10" rx="1" ry="2" transform="rotate(-30 19 10)"/><ellipse cx="18" cy="14" rx="1" ry="2" transform="rotate(-30 18 14)"/><ellipse cx="16" cy="18" rx="1" ry="2"/></g>',
    'tham-dong':'<path d="m5 11 10-7 10 7Z" fill="var(--icon-accent)"/><path d="M10 12a5 5 0 0 0 10 0M7 28v-4a8 8 0 0 1 16 0v4M4 28h24M26 20v-5m-3 3 3 2 3-2"/>',
    'chac-hat':bong(),
    'chin-vang':bong(true),
    'thu-hoach':'<g transform="translate(0 5) scale(.7)">'+bong(true)+'</g><path d="M19 3c12 2 13 15 4 20 4-6 4-12-4-16Z" fill="#d9ded4" stroke="#526451" stroke-width="1.2"/><path d="m23 23-5 6-3-2 6-6Z" fill="#b38b51" stroke="#74532d" stroke-width="1"/>',
    'ngay-hoi-gat':'<g stroke="#977024" stroke-width="1.1"><path d="M12 29Q16 21 12 10Q9 3 5 8M16 29V9Q16 2 21 5M21 29Q17 20 23 11Q26 7 29 12"/><g fill="#edbc38" stroke-width=".7"><ellipse cx="5" cy="10" rx="1.1" ry="2.2"/><ellipse cx="9" cy="11" rx="1.1" ry="2.2"/><ellipse cx="20" cy="7" rx="1.1" ry="2.2"/><ellipse cx="17" cy="10" rx="1.1" ry="2.2"/><ellipse cx="26" cy="13" rx="1.1" ry="2.2"/><ellipse cx="29" cy="15" rx="1.1" ry="2.2"/></g></g><path d="M12 21h9v3h-9Z" fill="#a85b34" stroke="#774226" stroke-width=".8"/>',
    'com-moi':'<path d="M4 18h24c-1 7-5 10-12 10S5 25 4 18Z" fill="var(--icon-accent)"/><path d="M7 17c1-5 5-7 9-7s8 2 9 7M11 7c3-3-2-3 0-6m6 6c3-3-2-3 0-6m6 6c3-3-2-3 0-6M10 30h12"/>'
  };
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[id]||shapes['giai-doan-ma'])+'</svg>';
}

// Hàm thuần để kiểm chứng khoảng cách đường, biểu tượng và nhãn ở mọi bề rộng.
function tinhBoCucTimelineCD(width,heights){
  const mobile=width<680, center=mobile?68:width/2, amplitude=mobile?28:Math.min(76,width*.09);
  const labelEdge=mobile?142:center+amplitude+52;
  const labelWidth=mobile?Math.max(110,width-152):Math.min(280,width/2-amplitude-64);
  let y=24;
  const points=heights.map((height,i)=>{
    // Neo mốc vào tên/ngày; ảnh kéo dài xuống dưới, không đẩy tên xa biểu tượng.
    const sceneHeight=Math.min(340,width-8)*.6;
    const rowHeight=mobile?Math.max(160,height+64)+sceneHeight+32:Math.max(190,height+64), cy=y+48;
    // Chữ và ảnh nằm phía ngoài, cùng bên với mốc; cách mép vòng tròn 20px.
    const right=mobile||i%2===1;
    const p={x:center+(i%2?amplitude:-amplitude),y:cy,label:{x:right?labelEdge:center-amplitude-52-labelWidth,y:cy-26,width:labelWidth,height},right};
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
  if(window.HeSinhThaiCD)obstacles.push(...window.HeSinhThaiCD.placements(layout));
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
  const layout=tinhBoCucTimelineCD(width,heights);
  layout.points.forEach((p,i)=>{p.eventId=nodes[i].dataset.hoatDong;});
  BO_CUC_TIMELINE_CD=layout;
  river.style.height=layout.height+'px';
  nodes.forEach((node,i)=>{
    const p=layout.points[i],label=node.querySelector('.river-label');
    node.style.left=p.x+'px';node.style.top=p.y+'px';
    label.style.left=(p.label.x-p.x+32)+'px';label.style.top=(p.label.y-p.y+32)+'px';label.style.textAlign=p.right?'left':'right';
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
  if(window.HeSinhThaiCD)window.HeSinhThaiCD.render(river,layout);
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
