/* Scrolling starts each little habitat at its beginning; only visible scenes run. */
(function(){
'use strict';
const types=['frog','dragonfly','fish','snail','duck','worm','grasshopper','bird','nest','mouse','snake','crab','fish'];
const names={frog:'Ếch nhảy giữa bờ và nước',dragonfly:'Chuồn chuồn vỗ cánh rồi đậu trên lúa',fish:'Đàn cá nhỏ trong dòng nước',snail:'Ốc bò trên bờ ẩm',duck:'Vịt bơi giữa bụi lúa',worm:'Trùn ngọ nguậy dưới đất',grasshopper:'Năm châu chấu nhỏ bật nhảy trên lúa',bird:'Chim lớn và chim nhỏ vỗ cánh bay',nest:'Hai chim non há miệng chờ mớm mồi',mouse:'Chuột chạy tới cắn gốc lúa',snake:'Rắn uốn mình trườn trên bờ',crab:'Cua bò trên bờ với chân đổi nhịp'};
let layer,observer,sprites,loading,frame=0,last=0,paused=false,control,reduced;
const scenes=[];
function placements(layout){return layout.points.map((p,i)=>{
 const info=p.eventId?window.HeSinhThaiArt.habitat(p.eventId):{type:types[i%types.length],stage:'tillering'};
 if(layout.mobile){const w=Math.min(340,layout.width-8);return {x:(layout.width-w)/2,y:Math.max(p.label.y+p.label.height+14,p.y+86),width:w,height:w*.6,...info};}
 const w=Math.min(260,p.label.width),h=w*.6,x=p.right?layout.width-p.label.x-p.label.width:layout.width/2+(layout.width/2-p.label.x-p.label.width);
 return {x:x+(p.label.width-w)/2,y:p.y+3,width:w,height:h,...info};
});}
function load(){
 if(loading)return loading;
 const get=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('Không tải được hình hệ sinh thái'));im.src=src;});
 loading=Promise.all([get('img/sinh-thai/ban-phac-thao-da-duyet.png'),get('img/sinh-thai/ech-chuyen-dong.png'),get('img/sinh-thai/cu-dan-chuyen-dong.png'),get('img/sinh-thai/ran-truon.png'),get('img/sinh-thai/cua-bo.png'),get('img/sinh-thai/chau-chau-nhay.png')]).then(([approved,frog,motion,snake,crab,hopper])=>{
 sprites=window.HeSinhThaiArt.makeSprites(approved,frog,(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;},motion,snake,crab,hopper);
 scenes.forEach(s=>{if(s.visible)paint(s);});schedule();
 }).catch(()=>{loading=null;scenes.forEach(s=>s.el.classList.remove('eco-ready'));});
 return loading;
}
function stopped(){return paused||document.hidden||reduced?.matches;}
function paint(s){if(!sprites)return;const g=s.canvas.getContext('2d');g.setTransform(s.canvas.width/320,0,0,s.canvas.height/192,0,0);window.HeSinhThaiArt.draw(g,sprites,s.type,s.time,s.stage);s.el.classList.add('eco-ready');s.el.dataset.phase=s.type==='frog'?window.HeSinhThaiArt.frogPose(s.time).phase:'habitat';}
function schedule(){if(frame||!sprites||stopped()||!scenes.some(s=>s.visible))return;last=0;frame=requestAnimationFrame(tick);}
function tick(now){frame=0;if(stopped())return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;for(const s of scenes)if(s.visible){s.time+=dt;paint(s);}if(scenes.some(s=>s.visible))frame=requestAnimationFrame(tick);}
function sync(){cancelAnimationFrame(frame);frame=0;last=0;layer?.classList.toggle('eco-paused',stopped());if(reduced?.matches)scenes.forEach(s=>{s.time=0;if(s.visible)paint(s);});schedule();}
function create(river){
 layer=document.createElement('div');layer.className='cd-ecosystem';layer.setAttribute('aria-hidden','true');river.append(layer);
 reduced=window.matchMedia('(prefers-reduced-motion: reduce)');reduced.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>{for(const e of entries){const s=scenes.find(s=>s.el===e.target);if(!s)continue;const visible=e.isIntersecting&&e.intersectionRatio>=.22;if(visible&&!s.visible){s.time=0;s.el.classList.add('eco-entered');}s.visible=visible;s.el.classList.toggle('eco-visible',visible);if(visible){load();paint(s);}}if(!scenes.some(s=>s.visible)){cancelAnimationFrame(frame);frame=0;last=0;}schedule();},{threshold:[0,.22]});
 const caption=document.createElement('p');caption.className='eco-caption';caption.append(document.createTextNode('Những cư dân nhỏ của đồng ruộng'));
 control=document.createElement('button');control.type='button';control.className='eco-control';control.textContent='Tạm dừng chuyển động';control.setAttribute('aria-pressed','false');
 control.addEventListener('click',()=>{paused=!paused;control.setAttribute('aria-pressed',String(paused));control.textContent=paused?'Bật chuyển động':'Tạm dừng chuyển động';sync();});caption.append(control);river.before(caption);
}
function render(river,layout){
 if(!layer)create(river);
 const boxes=placements(layout);
 while(scenes.length>boxes.length){const s=scenes.pop();observer?.unobserve(s.el);s.el.remove();}
 boxes.forEach((b,i)=>{
 let s=scenes[i];if(!s){const el=document.createElement('div');el.className='eco-scene';el.dataset.animal=b.type;el.dataset.name=names[b.type];const canvas=document.createElement('canvas');el.append(canvas);layer.append(el);s={el,canvas,type:b.type,stage:b.stage,time:0,visible:!observer};scenes.push(s);if(observer)observer.observe(el);else{el.classList.add('eco-entered','eco-visible');load();}}
 if(s.type!==b.type||s.stage!==b.stage){s.type=b.type;s.stage=b.stage;s.time=0;}
 s.el.dataset.animal=b.type;s.el.dataset.stage=b.stage;s.el.dataset.name=names[b.type];
 if(s.visible)paint(s);
 Object.assign(s.el.style,{left:b.x+'px',top:b.y+'px',width:b.width+'px',height:b.height+'px'});
 const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.round(b.width*dpr),h=Math.round(b.height*dpr);
 if(s.canvas.width!==w||s.canvas.height!==h){s.canvas.width=w;s.canvas.height=h;paint(s);}
 });layer.classList.toggle('eco-mobile',layout.mobile);
}
window.HeSinhThaiCD={render,placements};
})();
