/* Những cư dân nhỏ của đồng ruộng. SVG nét đơn, không thư viện/mạng bổ sung.
 * Chuyển động nằm trong ô riêng; nhãn và ngày vẫn do timeline quản lý.
 * Minh họa sự đa dạng, không phải dữ liệu kiểm kê loài theo từng mùa vụ.
 */
(function(){
  'use strict';
  const eye=(x,y)=>`<ellipse class="eco-eye" cx="${x}" cy="${y}" rx="2.3" ry="3" fill="currentColor" stroke="none"/>`;
  const shapes={
    frog:`<g class="eco-breathe"><path d="M31 82Q22 63 39 42Q43 34 46 27C44 11 61 9 64 24C73 10 85 18 83 31Q102 39 96 52Q91 61 80 63L77 86M44 57Q38 66 40 78"/><path d="M41 83C23 88 12 72 20 64C33 57 50 73 45 85L66 87L61 80M71 62L67 85L84 88L80 83L89 84M80 48Q86 52 93 46"/>${eye(55,26)}${eye(77,27)}<path d="M39 47l-3 4m-5 7-2 4"/></g>`,
    dragonfly:`<g class="eco-hover"><g class="eco-wings"><path d="M61 44C47 8 16 7 18 20C20 31 45 43 61 44ZM62 45C88 13 113 24 102 35C93 43 75 46 62 45ZM59 47C33 30 10 40 21 50C31 58 48 54 59 47ZM62 48C85 38 108 53 96 58C83 63 68 54 62 48Z"/></g><path d="M57 47L40 91Q39 99 44 94L65 48M52 63l5 3m-9 7 5 3m-9 7 4 3"/><path d="M57 46C48 41 51 30 58 31C59 23 69 25 70 32C80 40 71 49 63 49Z"/>${eye(60,34)}${eye(68,34)}</g>`,
    snake:`<g class="eco-sway"><path d="M40 85C5 77 14 52 37 57C58 61 62 79 46 79C33 78 32 69 38 67M39 86C75 97 96 77 79 54C71 43 62 36 68 27C72 21 84 22 87 16C91 8 78 5 66 12C44 24 56 45 64 56C74 72 61 80 47 79"/><g class="eco-tongue"><path d="M86 20l13 1 5-6m-5 6 7 2"/></g>${eye(77,15)}<path d="M58 36l7-2m-3 13 7-2M71 61l8-2M75 75l8 3M27 66l-5 3"/></g>`,
    mouse:`<g class="eco-tail"><path d="M42 86C15 96 12 78 17 60S14 39 9 39"/></g><g class="eco-breathe"><path d="M47 35C24 28 33 6 48 12C56 14 59 21 58 27L73 25L94 41L80 47C74 51 76 61 68 66M44 36C25 50 25 78 40 86C57 95 76 82 66 72C57 61 47 70 51 78M65 82L84 87L67 90M73 48L63 54L68 60M42 28C35 19 46 15 51 22"/>${eye(72,35)}<path d="M90 40l13-6m-12 7 13 5m-9-7 3-11"/></g>`,
    nest:`<g class="eco-chicks"><path d="M27 63V49C19 34 29 26 40 31C50 22 61 32 57 46L62 62M59 64V49C59 29 81 28 85 43L98 47L87 54L86 65M44 39l12 5-11 5M86 42l9-6"/>${eye(37,38)}${eye(77,42)}</g><path d="M13 58Q57 80 105 58C105 101 21 106 13 58ZM18 68Q63 88 100 66M25 79Q61 97 91 79M11 57l-5-9m17 10-4-8m79 10 9-11M16 74l-8 3m90-1 13-3"/>`,
    bird:`<g class="eco-bird-body"><path d="M19 71C41 64 37 28 61 26C67 10 91 14 92 30L108 34L93 40C88 74 59 89 35 75L14 83L25 71Z"/><g class="eco-bird-wing"><path d="M66 46Q59 68 34 67Q54 82 75 53"/></g>${eye(82,29)}</g><path d="M54 80l-2 12-9 5m9-5 8 6M69 78l2 12 10 5m-10-5-6 7"/>`,
    fish:`<g class="eco-fish-tail"><path d="M85 51L108 34Q103 53 110 75L85 64Z"/></g><path d="M14 58Q44 24 86 51L86 64Q45 91 14 58ZM46 39Q57 19 72 41M52 77Q59 94 68 76M35 43Q45 57 35 74"/>${eye(28,54)}<path d="M55 52q6 3 0 6m9-4q6 3 0 6"/>`,
    worm:`<g class="eco-wriggle"><path d="M16 73C14 49 35 45 47 66S67 89 71 61S82 24 99 32C110 38 103 49 95 46C86 41 87 62 81 79S49 99 37 77S28 74 25 80C22 87 15 82 16 73ZM23 58l10 8M35 55l7 12M43 61l-2 16M53 73l-6 12M65 76l2 16M73 65l11 5M77 47l11 4M85 33l7 12"/></g>`,
    snail:`<g class="eco-snail-head"><path d="M20 80L22 45Q11 29 25 27Q40 29 33 44L39 63M21 29l-5-12M31 28l4-14"/><circle cx="15" cy="12" r="5"/><circle cx="36" cy="9" r="5"/><path d="M23 37q4 5 8 0"/></g><path d="M17 83Q48 77 104 87L12 87ZM39 78C22 57 41 35 62 36C98 35 104 74 82 82C64 92 43 75 50 59C57 43 80 50 80 64C80 78 63 76 64 64"/>`,
    duck:`<g class="eco-duck-body"><path d="M18 59L25 64C44 71 57 62 54 45C43 37 44 17 58 15C77 10 83 27 78 36L98 40Q106 49 92 50L74 46C80 59 86 76 66 84C39 98 17 82 18 59Z"/><g class="eco-bird-wing"><path d="M33 69Q44 86 61 70"/></g>${eye(69,28)}</g><path class="eco-duck-feet" d="M44 87v7l-11 7 18-2M62 87v7l13 5-16 2"/>`,
    crab:`<g class="eco-crab-legs"><path d="M30 60L16 54L8 68M29 68L14 65L7 80M31 76L18 79L17 94M88 60l16-6 8 14M89 68l17-3 7 15M87 76l15 3 1 15"/></g><g class="eco-claws"><path d="M34 56L26 42M88 55l8-13M25 43C8 39 8 17 22 14L21 27L34 17C45 30 40 40 25 43ZM95 43C78 40 77 27 88 17L101 27L100 14C114 17 116 39 95 43Z"/></g><path d="M53 49l-2-9m21 9 2-9"/><circle cx="50" cy="36" r="4"/><circle cx="75" cy="36" r="4"/><ellipse cx="61" cy="67" rx="32" ry="21"/><path d="M52 64q9 10 18 0"/>`,
    grasshopper:`<g class="eco-breathe"><path d="M20 66Q44 44 77 46C84 26 104 32 105 45C108 55 94 66 83 62L72 75L16 77Z"/><path d="M86 33Q79 16 73 12M96 32Q112 15 109 7M37 70L51 34L77 77L72 82L49 47L39 76L27 88M83 65L90 74L91 89M92 64L102 73L108 87M29 70l7-7m10 10 7-7"/>${eye(95,44)}</g>`
  };
  const svg=type=>`<svg viewBox="0 0 120 110" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[type]}</svg>`;
  const types=['frog','dragonfly','fish','snail','duck','worm','grasshopper','bird','nest','mouse','snake','crab','fish'];
  const names={frog:'Ếch',dragonfly:'Chuồn chuồn',fish:'Đàn cá nhỏ',snail:'Ốc',duck:'Vịt',worm:'Trùn',grasshopper:'Châu chấu',bird:'Chim',nest:'Tổ chim',mouse:'Chuột',snake:'Rắn',crab:'Cua'};
  let layer=null, observer=null, paused=false;
  function updatePause(){
    if(!layer)return;
    layer.classList.toggle('eco-paused',paused||document.hidden);
  }
  document.addEventListener('visibilitychange',updatePause);
  function create(river){
    layer=document.createElement('div');layer.className='cd-ecosystem';layer.setAttribute('aria-hidden','true');river.append(layer);
    if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>e.target.classList.toggle('eco-visible',e.isIntersecting));
    },{rootMargin:'80px'});
    const control=document.createElement('button');control.type='button';control.className='eco-control';
    control.textContent='Tạm dừng chuyển động';control.setAttribute('aria-pressed','false');
    control.addEventListener('click',()=>{
      paused=!paused;control.setAttribute('aria-pressed',String(paused));
      control.textContent=paused?'Bật chuyển động':'Tạm dừng chuyển động';updatePause();
    });
    const note=document.createElement('p');note.className='eco-caption';
    note.append(document.createTextNode('Những cư dân nhỏ của đồng ruộng'),control);river.before(note);
    updatePause();
  }
  function sceneHTML(type){
    if(type==='fish')return `<div class="eco-school">${[0,1,2,3].map(i=>`<span class="eco-fish eco-fish-${i}">${svg('fish')}</span>`).join('')}</div><i class="eco-bubble eco-bubble-1"></i><i class="eco-bubble eco-bubble-2"></i>`;
    return `<div class="eco-animal eco-${type}">${svg(type)}</div>`;
  }
  // Coordinates are in the same local space as timeline labels. Mobile uses
  // the 64px gap AFTER each measured label/photo, never the narrow path lane.
  function placements(layout){
    return layout.points.map((p,i)=>{
      if(layout.mobile){
        const w=Math.min(142,p.label.width),h=52;
        return {x:p.label.x+(p.label.width-w)/2,y:p.label.y+p.label.height+6,width:w,height:h,type:types[i%types.length]};
      }
      const w=Math.min(190,p.label.width),h=120;
      const x=p.right?layout.width-p.label.x-p.label.width:p.label.x+p.label.width+2*(layout.width/2-p.label.x-p.label.width);
      return {x:x+(p.label.width-w)/2,y:p.y,width:w,height:h,type:types[i%types.length]};
    });
  }
  function render(river,layout){
    if(!layer||!layer.isConnected)create(river);
    const boxes=placements(layout);
    while(layer.children.length>boxes.length){const n=layer.lastElementChild;observer?.unobserve(n);n.remove();}
    boxes.forEach((box,i)=>{
      let scene=layer.children[i];
      if(!scene){
        scene=document.createElement('div');scene.className='eco-scene'+(observer?'':' eco-visible');
        scene.dataset.animal=box.type;scene.dataset.name=names[box.type];scene.innerHTML=sceneHTML(box.type);
        scene.style.setProperty('--eco-delay',(-i*.71)+'s');layer.append(scene);observer?.observe(scene);
      }
      Object.assign(scene.style,{left:box.x+'px',top:box.y+'px',width:box.width+'px',height:box.height+'px'});
    });
    layer.classList.toggle('eco-mobile',layout.mobile);
  }
  window.HeSinhThaiCD={render,placements};
})();
