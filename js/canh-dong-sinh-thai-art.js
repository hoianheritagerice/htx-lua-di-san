/* The approved drawings are the source pixels, not redrawn approximations.
 * Canvas rendering separates motion/setting from the unchanged character art.
 * Also runs in the offline renderer used by tests; no DOM or network here.
 */
(function(root){
'use strict';
const INK='#783e48', WATER='#8caaa0', SOIL='#bea38d';
const crop={frog:[52,62,273,268],dragonfly:[393,56,325,271],snake:[765,55,299,274],mouse:[1132,64,283,262],nest:[46,424,294,210],bird:[391,403,314,246],fish:[755,438,303,211],worm:[1126,460,280,179],snail:[78,748,257,233],duck:[398,697,296,310],crab:[725,742,327,254],grasshopper:[1080,735,326,273]};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
function makeSprites(image,atlas,canvas){
  function cut(img,rect){
    const c=canvas(Math.ceil(rect[2]),Math.ceil(rect[3])),g=c.getContext('2d');
    g.drawImage(img,...rect,0,0,c.width,c.height);
    const data=g.getImageData(0,0,c.width,c.height),p=data.data;
    let minX=c.width,minY=c.height,maxX=0,maxY=0;
    // Remove the paper only at display time. Keep the original source files.
    for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
      const i=(y*c.width+x)*4,l=(p[i]+p[i+1]+p[i+2])/3;
      const a=Math.round(clamp((242-l)/210)*255);
      p[i]=120;p[i+1]=62;p[i+2]=72;p[i+3]=a;
      if(a>100){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
    }
    if(minX>maxX)throw new Error('Empty ecosystem sprite');
    g.putImageData(data,0,0);
    const out=canvas(maxX-minX+5,maxY-minY+5);
    out.getContext('2d').drawImage(c,minX-2,minY-2,out.width,out.height,0,0,out.width,out.height);return out;
  }
  const sprites={};for(const [k,r] of Object.entries(crop))sprites[k]=cut(image,r);
  // The generated poses are not perfectly cell-aligned: explicit source regions
  // preserve every toe and exclude neighboring poses. Scale for source resolution.
  const regions=[[50,104,308,310],[495,165,315,248],[865,80,413,332],[1320,110,445,277],[82,515,310,252],[495,567,320,253],[898,546,374,237],[1315,544,445,259]];
  sprites.frogFrames=regions.map(r=>cut(atlas,r.map(v=>v*atlas.width/1774)));
  return sprites;
}
function path(g,fn,color=INK,width=1.6,alpha=1){g.save();g.strokeStyle=color;g.globalAlpha*=alpha;g.lineWidth=width;g.lineCap='round';g.lineJoin='round';g.beginPath();fn(g);g.stroke();g.restore();}
function ellipse(g,x,y,rx,ry,color= WATER,alpha=.65){path(g,p=>p.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,Math.PI*2),color,1,alpha);}
function grass(g,x,y,t,scale=1){g.save();g.translate(x,y);g.scale(scale,scale);const sway=Math.sin(t*.9+x)*4;path(g,p=>{p.moveTo(0,0);p.quadraticCurveTo(-2,-22,sway,-42);p.moveTo(0,0);p.quadraticCurveTo(-12,-31,-18+sway,-36);p.quadraticCurveTo(-7,-28,0,0);p.moveTo(0,0);p.quadraticCurveTo(10,-30,18+sway,-40);p.quadraticCurveTo(12,-17,0,0);p.moveTo(0,0);p.quadraticCurveTo(-17,-8,-24,-18);},'#919574',1.2,.8);g.restore();}
function pond(g,t,y=139){g.save();g.fillStyle='#e5ece3';g.globalAlpha=.8;g.beginPath();g.ellipse(169,y+9,127,27,0,0,Math.PI*2);g.fill();g.restore();
 for(let j=0;j<4;j++)path(g,p=>{const yy=y-5+j*11;p.moveTo(64,yy);for(let x=64;x<292;x+=5)p.lineTo(x,yy+Math.sin(x*.052-t*1.5+j)*1.7);},WATER,.9,.4);
}
function bank(g,t){path(g,p=>{p.moveTo(10,141);p.quadraticCurveTo(37,129,89,140);p.moveTo(247,139);p.quadraticCurveTo(282,129,312,140);},SOIL,1.6);grass(g,30,134,t,.65);grass(g,287,135,t,1);}
function sprite(g,img,x,bottom,w,opts={}){if(!img)return;const h=w*img.height/img.width;g.save();g.translate(x,bottom);g.rotate(opts.angle||0);g.scale(opts.flip?-1:1,opts.squash||1);g.globalAlpha*=opts.alpha??1;g.drawImage(img,-w/2,-h,w,h);g.restore();}
// Slice deformation bends the actual approved outline, including tail and segments.
function bend(g,img,x,bottom,w,t,amplitude=3,tailOnly=false,flip=false){const h=w*img.height/img.width;g.save();g.translate(x,bottom);g.scale(flip?-1:1,1);for(let sx=0;sx<img.width;sx+=3){const u=sx/img.width,amount=tailOnly?Math.pow(u,3):1;const dy=Math.sin(u*7-t*4)*amplitude*amount;const sw=Math.min(3,img.width-sx);g.drawImage(img,sx,0,sw,img.height,-w/2+u*w,-h+dy,sw/img.width*w+.35,h);}g.restore();}
function splash(g,x,y,age){if(age<0||age>1)return;const a=1-age;ellipse(g,x,y,9+age*38,3+age*8,WATER,a);ellipse(g,x,y+3,4+age*25,2+age*6,WATER,a*.6);for(let j=0;j<5;j++){const dx=(j-2)*9*age,dy=-Math.sin(age*Math.PI)*(12+7*(j%2));path(g,p=>{p.moveTo(x+dx,y+dy);p.lineTo(x+dx+(j-2),y+dy-3*a);},WATER,1.5,a);}}
function frogPose(seconds){
 const t=((seconds%16)+16)%16;const reverse=t>=8,q=t%8;
 const a=reverse?272:54,b=reverse?150:181,c=reverse?93:225,d=reverse?54:272;
 let pose={x:a,y:137,frame:0,flip:reverse,alpha:1,wet:false,phase:'rest',splashAge:-1,splashX:b};
 if(q<1.1)return pose;
 if(q<1.45)return {...pose,frame:1,phase:'crouch'};
 if(q<2.35){const u=(q-1.45)/.9;return {...pose,x:lerp(a,b,u),y:lerp(137,147,u)-Math.sin(Math.PI*u)*55,frame:u<.18?2:u<.68?3:4,phase:'jump'};}
 if(q<2.85){const u=(q-2.35)/.5;return {...pose,x:b,y:147+u*28,frame:5,alpha:1-u,phase:'dive',splashAge:u};}
 if(q<5.45){const u=(q-2.85)/2.6;return {...pose,x:lerp(b,c,smooth(u)),y:151+Math.sin(u*12)*1.5,frame:Math.floor(q*4)%2?6:7,wet:true,phase:'swim',splashAge:q<3.35?(q-2.35): -1};}
 if(q<6.35){const u=(q-5.45)/.9;return {...pose,x:lerp(c,d,u),y:lerp(148,137,u)-Math.sin(Math.PI*u)*57,frame:u<.18?2:u<.62?3:4,phase:'jump-out',splashAge:u<.4?u*2:-1,splashX:c};}
 if(q<6.7)return {...pose,x:d,frame:5,phase:'land'};
 return {...pose,x:d,phase:'rest'};
}
function frog(g,s,t){pond(g,t);bank(g,t);const p=frogPose(t),im=s.frogFrames[p.frame],w=[66,75,87,100,78,75,88,103][p.frame];
 if(p.wet){g.save();g.globalAlpha=.19;sprite(g,im,p.x,p.y,w,{flip:p.flip});g.restore();g.save();g.beginPath();g.rect(0,0,320,132);g.clip();sprite(g,im,p.x,p.y,w,{flip:p.flip});g.restore();ellipse(g,p.x,135,25,4);}
 else sprite(g,im,p.x,p.y,w,{flip:p.flip,alpha:p.alpha});
 splash(g,p.splashX,145,p.splashAge);if(p.phase==='swim')ellipse(g,p.x+Math.sin(t)*3,143,20+Math.sin(t*2)*3,4,WATER,.35);
}
function fish(g,s,t){pond(g,t,120);grass(g,284,146,t,.9);grass(g,39,141,t,.6);for(let i=0;i<4;i++){const u=t*.44+i*.19,x=164+48*Math.cos(u)+[-22,28,-12,38][i],y=107+[0,12,34,43][i]+Math.sin(t*1.1+i)*2;const flip=Math.sin(u)<0;bend(g,s.fish,x,y,[43,34,29,25][i],t+i,2.1,true,flip);ellipse(g,x+18,y+4,13,2,WATER,.25);}for(let i=0;i<3;i++){const u=(t*.28+i*.31)%1;ellipse(g,69+i*64,155-u*68,1.5,1.5,WATER,Math.sin(u*Math.PI)*.5);}}
function duck(g,s,t){pond(g,t,126);[44,72,246,276].forEach((x,i)=>grass(g,x,135,t+i,.85));const x=160+60*Math.sin(t*.36),y=140+Math.sin(t*2)*1.2,flip=Math.cos(t*.36)<0;
 // Paddle below the surface and crop the standing feet at the waterline.
 path(g,p=>{p.moveTo(x-5,135);p.quadraticCurveTo(x+Math.sin(t*6)*8,143,x-12,146);p.moveTo(x+7,136);p.quadraticCurveTo(x+Math.sin(t*6+2)*8,145,x+14,146);},INK,1.1,.24);
 g.save();g.beginPath();g.rect(0,0,320,129);g.clip();sprite(g,s.duck,x,y,64,{flip});g.restore();
 for(let i=0;i<3;i++)ellipse(g,x+(flip?1:-1)*(12+i*9),131+i*3,17+i*6,3,WATER,.5-i*.1);[22,298].forEach(v=>grass(g,v,151,t,.75));
}
function worm(g,s,t){g.save();g.fillStyle='#eee3d3';g.beginPath();g.moveTo(24,80);g.quadraticCurveTo(144,68,295,80);g.lineTo(287,161);g.quadraticCurveTo(167,172,31,160);g.closePath();g.fill();g.restore();path(g,p=>{p.moveTo(24,80);p.quadraticCurveTo(155,68,295,80);},SOIL,1.6);[45,247,275].forEach(x=>grass(g,x,77,t,.65));
 for(let i=0;i<5;i++)path(g,p=>{const x=45+i*51;p.moveTo(x,79);p.quadraticCurveTo(x+8,92,x-1,105);p.moveTo(x+3,90);p.lineTo(x+12,96);},SOIL,.9,.7);
 for(let i=0;i<22;i++){const x=37+(i*67)%245,y=99+(i*19)%56;ellipse(g,x,y,.8,.8,SOIL,.55);}
 bend(g,s.worm,159+Math.sin(t*.6)*13,149,116,t,6.5);}
function small(g,s,type,t){
 const ground=147;path(g,p=>{p.moveTo(24,ground);p.quadraticCurveTo(149,140,293,ground);},SOIL,1.3,.8);
 grass(g,42,ground,t,.65);grass(g,273,ground,t,1);
 if(type==='dragonfly'){pond(g,t,143);const x=159+Math.sin(t*.55)*65,y=80+Math.sin(t*1.6)*13;g.save();g.translate(x,y);g.scale(1,.86+.14*Math.cos(t*26));sprite(g,s.dragonfly,0,25,84,{angle:Math.sin(t*.8)*.12});g.restore();grass(g,223,143,t,1.1);}
 if(type==='snail'){pond(g,t,157);const x=118+26*Math.sin(t*.23);sprite(g,s.snail,x,145,64,{squash:1+Math.sin(t*1.8)*.018,flip:Math.cos(t*.23)>0});path(g,p=>{p.moveTo(x+35,148);p.lineTo(207,149);},WATER,1,.35);}
 if(type==='snake'){bend(g,s.snake,157+Math.sin(t*.6)*32,145,82,t,3.5,false,Math.cos(t*.6)<0);grass(g,186,147,t,.8);}
 if(type==='mouse'){const x=151+Math.sin(t*.7)*67;const scurry=Math.pow(Math.abs(Math.cos(t*.7)),4);bend(g,s.mouse,x,145-Math.abs(Math.sin(t*10))*scurry*3,64,t,1.3,false,Math.cos(t*.7)<0);grass(g,90,147,t,.85);grass(g,244,148,t,.75);}
 if(type==='crab'){const x=159+Math.sin(t*.7)*48;pond(g,t,156);bend(g,s.crab,x,145,71,t*1.7,1.1);splash(g,x,149,(t*.5)%1);}
 if(type==='grasshopper'){const reverse=(t%12)>=6,q=(t%6)/6,j=q>.35&&q<.62?(q-.35)/.27:-1,a=reverse?221:106,b=reverse?106:221;const x=j<0?(q<=.35?a:b):lerp(a,b,j),y=j<0?142:142-Math.sin(j*Math.PI)*62;sprite(g,s.grasshopper,x,y,69,{angle:j<0?0:Math.sin(j*Math.PI)*-.15,squash:q>.27&&q<.35?.86:1,flip:reverse});}
 if(type==='bird'){const q=t%8,u=q<4?q:q-4,reverse=q>=4;const hopping=u>1.5&&u<2.3,k=clamp((u-1.5)/.8);const x=lerp(reverse?208:110,reverse?110:208,k),y=143-(hopping?Math.sin(k*Math.PI)*34:0),peck=u>2.8?Math.sin((u-2.8)*5)*.1:0;sprite(g,s.bird,x,y,72,{angle:hopping?-.07:peck,flip:reverse});path(g,p=>{p.moveTo(84,150);p.lineTo(108,144);p.moveTo(184,149);p.lineTo(218,145);},SOIL,1.3);}
 if(type==='nest'){path(g,p=>{p.moveTo(91,153);p.quadraticCurveTo(155,145,207,136);p.moveTo(180,143);p.lineTo(223,152);},SOIL,2);const im=s.nest,w=91,h=w*im.height/im.width,x=157,y=142,split=im.height*.49;
 g.drawImage(im,0,split,im.width,im.height-split,x-w/2,y-h*(1-.49),w,h*(1-.49));
 for(let i=0;i<2;i++)g.drawImage(im,i*im.width/2,0,im.width/2,split,x-w/2+i*w/2,y-h-2+Math.sin(t*2+i*1.6)*2.8,w/2,h*.49+2);}
}
function draw(g,s,type,t){g.clearRect(0,0,320,192);g.save();g.fillStyle='#f5f2e8';g.fillRect(0,0,320,192);if(type==='frog')frog(g,s,t);else if(type==='fish')fish(g,s,t);else if(type==='duck')duck(g,s,t);else if(type==='worm')worm(g,s,t);else small(g,s,type,t);g.restore();}
root.HeSinhThaiArt={makeSprites,draw,frogPose,crop};
})(typeof window==='undefined'?globalThis:window);
