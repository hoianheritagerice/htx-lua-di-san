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
function makeSprites(image,atlas,canvas,motion){
  function cut(img,rect,trim=true){
    const c=canvas(Math.ceil(rect[2]),Math.ceil(rect[3])),g=c.getContext('2d');
    g.drawImage(img,...rect,0,0,c.width,c.height);
    const data=g.getImageData(0,0,c.width,c.height),p=data.data;
    let minX=c.width,minY=c.height,maxX=0,maxY=0;
    // Remove the paper only at display time. Keep the original source files.
    for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
      const i=(y*c.width+x)*4,l=(p[i]+p[i+1]+p[i+2])/3;
      const a=Math.round(clamp((242-l)/210)*p[i+3]);
      p[i]=120;p[i+1]=62;p[i+2]=72;p[i+3]=a;
      if(a>100){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
    }
    // Flood only the exterior paper. Closed character interiors use the scene
    // paper color so rice cannot show through a duck, mouse or wing.
    const outside=new Uint8Array(c.width*c.height),queue=new Int32Array(outside.length);let head=0,tail=0;
    function visit(k){if(k<0||k>=outside.length||outside[k]||p[k*4+3]>45)return;outside[k]=1;queue[tail++]=k;}
    for(let x=0;x<c.width;x++){visit(x);visit((c.height-1)*c.width+x);}
    for(let y=0;y<c.height;y++){visit(y*c.width);visit(y*c.width+c.width-1);}
    while(head<tail){const k=queue[head++];if(k%c.width)visit(k-1);if(k%c.width<c.width-1)visit(k+1);visit(k-c.width);visit(k+c.width);}
    for(let k=0;k<outside.length;k++)if(!outside[k]){const i=k*4,a=p[i+3]/255;p[i]=p[i]*a+245*(1-a);p[i+1]=p[i+1]*a+242*(1-a);p[i+2]=p[i+2]*a+232*(1-a);p[i+3]=255;}
    if(minX>maxX)throw new Error('Empty ecosystem sprite');
    g.putImageData(data,0,0);
    if(!trim)return c;
    const out=canvas(maxX-minX+5,maxY-minY+5);
    out.getContext('2d').drawImage(c,minX-2,minY-2,out.width,out.height,0,0,out.width,out.height);return out;
  }
  const sprites={};for(const [k,r] of Object.entries(crop))sprites[k]=cut(image,r);
  // The generated poses are not perfectly cell-aligned: explicit source regions
  // preserve every toe and exclude neighboring poses. Scale for source resolution.
  const regions=[[50,104,308,310],[495,165,315,248],[865,80,413,332],[1320,110,445,277],[82,515,310,252],[495,567,320,253],[898,546,374,237],[1315,544,445,259]];
  sprites.frogFrames=regions.map(r=>cut(atlas,r.map(v=>v*atlas.width/1774)));
  if(motion){
    // Shared crop dimensions keep each body anchored across wing/leg poses.
    const rows=[[40,250],[335,290],[695,180],[927,257]];
    ['duck','bird','mouse','dragonfly'].forEach((name,row)=>{
      sprites[name+'Frames']=Array.from({length:4},(_,col)=>cut(motion,[col*320,rows[row][0],320,rows[row][1]].map(v=>v*motion.width/1280),false));
    });
  }
  sprites.snakeHead=cut(image,[931,76,110,70]);
  // Separate original crab body and claws; the walking legs are articulated below.
  sprites.crabBody=cut(image,[799,810,178,137]);
  sprites.crabClaw=cut(image,[763,747,83,101]);
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
// Match the existing timeline illustrations by event ID, including reordered dates.
const habitats={
 'le-xuong-dong':['frog','bare'],'gieo-sa':['snail','sown'],
 'xuong-giong':['fish','seedling'],'giai-doan-ma':['dragonfly','seedling'],
 'de-nhanh':['duck','tillering'],'lam-dong':['worm','booting'],
 'tro-bong':['grasshopper','heading'],'tham-dong':['bird','heading'],
 'chac-hat':['nest','filling'],'chin-vang':['mouse','ripe'],
 'thu-hoach':['snake','harvest'],'ngay-hoi-gat':['crab','stubble'],'com-moi':['fish','stubble']
};
function habitat(id){const [type,stage]=habitats[id]||['fish','seedling'];return {type,stage};}
const riceSpec={bare:{height:0,tillers:0},sown:{height:0,tillers:0},seedling:{height:34,tillers:2},tillering:{height:66,tillers:5},booting:{height:79,tillers:4},heading:{height:81,tillers:4},filling:{height:80,tillers:4},ripe:{height:73,tillers:4},harvest:{height:65,tillers:3},stubble:{height:13,tillers:4}};
function rice(g,x,y,t,stage='tillering',scale=1,disturb=0){
 const spec=riceSpec[stage]||riceSpec.seedling;
 g.save();g.translate(x,y);g.scale(scale,scale);
 const gold=['ripe','harvest','stubble'].includes(stage),stem=gold?'#9f8748':'#81916c';
 if(!spec.height){if(stage==='sown')for(let i=0;i<4;i++)ellipse(g,-12+i*9,-1-(i%2)*2,1,2,'#ae9055',.8);g.restore();return;}
 for(let j=0;j<spec.tillers;j++){
  const offset=(j-(spec.tillers-1)/2)*5,h=spec.height*(.8+.2*Math.sin(j*2+1)),sway=Math.sin(t*.85+x*.07+j*.35)*2+disturb;
  const top=offset*1.7+sway;
  path(g,p=>{p.moveTo(offset*.25,0);p.quadraticCurveTo(offset,-h*.48,top,-h);},stem,1.1,.9);
  if(stage==='stubble')continue;
  // Narrow, pointed leaf blades emerge from culms, not a fan of grass.
  for(let k=0;k<3;k++){
   const side=(j+k)%2?1:-1,base=-h*(.19+k*.19),bx=offset*(.4+k*.19),lx=bx+side*(18+k*4)*(stage==='seedling'?.48:1)+sway,ly=base-h*(.34-k*.035);
   g.save();g.fillStyle=gold?'#c7b471':'#aab990';g.globalAlpha=.38;g.beginPath();g.moveTo(bx,base);g.quadraticCurveTo(bx+side*9,ly+3,lx,ly);g.quadraticCurveTo(bx+side*4,ly+10,bx,base);g.fill();g.restore();
   path(g,p=>{p.moveTo(bx,base);p.quadraticCurveTo(bx+side*9,ly+3,lx,ly);p.quadraticCurveTo(bx+side*4,ly+10,bx,base);},stem,.85,.8);
  }
  if(stage==='booting'){
   // Swollen leaf sheath; the panicle is still enclosed at this stage.
   path(g,p=>{p.moveTo(top-1,-h*.56);p.quadraticCurveTo(top-5,-h*.76,top,-h*.94);p.quadraticCurveTo(top+3,-h*.7,top-1,-h*.56);},stem,1.4);
  }
  if(['heading','filling','ripe','harvest'].includes(stage)){
   const droop=stage==='heading'?4:stage==='filling'?11:19;
   path(g,p=>{p.moveTo(top,-h);p.bezierCurveTo(top+4,-h-13,top+15,-h-9,top+19,-h+droop);},stem,1);
   for(let k=0;k<6;k++){
    const u=k/5,px=top+3+u*16,py=-h-6+u*u*(droop+6),side=k%2?-1:1;
    path(g,p=>{p.moveTo(px,py);p.lineTo(px+side*4,py+5);},stem,.7);
    g.save();g.translate(px+side*4,py+6);g.rotate(-side*.25);g.fillStyle=gold?'#c5a151':'#b3bf81';g.beginPath();g.ellipse(0,0,1.25,2.6,0,0,Math.PI*2);g.fill();g.restore();
    if(stage==='heading')ellipse(g,px+side*5,py+5,.65,.65,'#dad0a2',.9);
   }
  }
 }
 g.restore();
}
function field(g,t,stage,y=147){path(g,p=>{p.moveTo(21,y);p.quadraticCurveTo(158,y-5,300,y);},SOIL,1.2,.65);[[42,.72],[76,.82],[246,.88],[282,.72]].forEach(([x,k])=>rice(g,x,y,t,stage,k));}
function wake(g,x,y,t,dir=1,size=1){for(let j=0;j<3;j++){const age=(t*.65+j/3)%1;ellipse(g,x-dir*(12+age*28)*size,y+age*3,(8+age*17)*size,(2+age*3)*size,WATER,(1-age)*.6);}}
function fish(g,s,t,stage){g.save();g.fillStyle='#e5ece3';g.globalAlpha=.7;g.beginPath();g.ellipse(169,124,127,40,0,0,Math.PI*2);g.fill();g.restore();pond(g,t,120);field(g,t,stage);for(let i=0;i<5;i++){const u=t*.44+i*.19,x=164+48*Math.cos(u)+[-22,28,-12,38,5][i],y=121+[0,8,23,33,19][i]+Math.sin(t*1.1+i)*2;const flip=Math.sin(u)<0;bend(g,s.fish,x,y,[43,34,29,25,21][i],t+i,2.1,true,flip);wake(g,x,y+3,t+i,flip?1:-1,.45);}for(let i=0;i<3;i++){const u=(t*.28+i*.31)%1;ellipse(g,69+i*64,155-u*68,1.5,1.5,WATER,Math.sin(u*Math.PI)*.5);}}
function duckPose(t,i=0){const u=t*.31-i*.35,dir=Math.cos(u)>=0?1:-1;return {x:156+59*Math.sin(u)-dir*i*57,y:131+i*16+Math.sin(t*1.7-i)*.7,dir,frame:(t+i*1.3)%9>6.8?2:Math.floor(t*.8+i)%2};}
function duck(g,s,t,stage){pond(g,t,133);field(g,t,stage,135);
 for(let i=0;i<2;i++){
  const p=duckPose(t,i),w=i?57:85;
  // Swimming artwork has no standing feet. Its hull intersects the waterline.
  g.save();g.beginPath();g.rect(0,0,320,p.y);g.clip();sprite(g,s.duckFrames[p.frame],p.x,p.y+7,w,{flip:p.dir<0});g.restore();
  wake(g,p.x,p.y,t+i,p.dir,i?.65:1);ellipse(g,p.x,p.y,w*.34,2.4,WATER,.55);
 }
 rice(g,30,157,t,stage,.83);rice(g,293,157,t,stage,.8);
}
function worm(g,s,t,stage){
 g.save();g.fillStyle='#eee3d3';g.beginPath();g.moveTo(24,87);g.quadraticCurveTo(144,77,295,87);g.lineTo(287,172);g.quadraticCurveTo(167,181,31,171);g.closePath();g.fill();g.restore();
 path(g,p=>{p.moveTo(24,87);p.quadraticCurveTo(155,77,295,87);},SOIL,1.5);
 [52,108,209,268].forEach((x,i)=>{
  rice(g,x,84,t,stage,.66);
  for(let j=0;j<4;j++)path(g,p=>{p.moveTo(x,84);p.quadraticCurveTo(x+(j-1.5)*5,96,x+(j-1.5)*8,110+(j%2)*7);p.moveTo(x+(j-1.5)*4,98);p.lineTo(x+(j-1.5)*11,105);},SOIL,.7,.65);
 });
 for(let i=0;i<28;i++)ellipse(g,37+(i*67)%245,99+(i*19)%65,.65,.65,SOIL,.5);
 for(let i=0;i<7;i++){
  const x=57+(i%4)*65+Math.sin(t*.45+i)*5,y=127+Math.floor(i/4)*36+(i%2)*2,w=[29,22,31,20,24,32,23][i];
  bend(g,s.worm,x,y,w,t*.6+i*2,1.8,false,i%2===1);
 }
}
function dragonflyPose(t,i,stage){
 const q=(t+i*3.7)%12,base=i?83:239,tip=riceSpec[stage].height*.8;
 const perchY=147-Math.max(19,tip*.68);
 if(q<3)return {x:base,y:perchY,frame:3,perched:true,flip:i===1};
 const u=(q-3)/9;
 return {x:base+(i?-1:1)*Math.sin(u*Math.PI*2)*67,y:perchY-Math.sin(u*Math.PI)*46,frame:[0,1,2,1][Math.floor(t*15+i)%4],perched:false,flip:Math.cos(u*Math.PI*2)*(i?-1:1)<0};
}
function dragonfly(g,s,t,stage){pond(g,t,154);field(g,t,stage);
 // A slender bank reed is the perch before rice has emerged.
 if(riceSpec[stage].height===0)[83,239].forEach(x=>path(g,p=>{p.moveTo(x,147);p.quadraticCurveTo(x-4,134,x+5,126);},'#919574',1));
 [239,83].forEach(x=>rice(g,x,147,t,stage,.8));
 for(let i=0;i<2;i++){const p=dragonflyPose(t,i,stage);sprite(g,s.dragonflyFrames[p.frame],p.x,p.y+5,i?48:66,{flip:p.flip,angle:p.perched?-.08:Math.sin(t+i)*.05});}
}
function mousePose(t,i=0){const q=(t+i*1.8)%10,a=i?277:58,b=i?225:130;
 if(q<2.5)return {x:lerp(a,b,smooth(q/2.5)),run:true,flip:i===1};
 if(q<6.3)return {x:b,run:false,flip:i===1};
 if(q<8.8)return {x:lerp(b,a,smooth((q-6.3)/2.5)),run:true,flip:i===0};
 return {x:a,run:false,flip:i===0};
}
function mouse(g,s,t,stage){field(g,t,stage);
 [156,207].forEach((x,i)=>rice(g,x,147,t,stage,i?.77:.94,Math.sin(t*18+i)*((t+i*1.8)%10>2.5&&(t+i*1.8)%10<6.3?1.4:0)));
 for(let i=0;i<2;i++){
  const p=mousePose(t,i),w=i?51:72,frame=p.run?[0,1,2,1][Math.floor(t*11+i)%4]:3;
  sprite(g,s.mouseFrames[frame],p.x,147+(p.run?Math.sin(t*21)*.8:Math.sin(t*13)*.35),w,{flip:p.flip});
  if(!p.run){const mouth=p.x+(p.flip?-1:1)*w*.35;path(g,a=>{a.moveTo(mouth,139);a.lineTo(mouth+Math.sin(t*19)*2,137);},INK,.9);if(t%1<.6)for(let k=0;k<2;k++)ellipse(g,mouth+k*4,143+(t%1)*5,1,.6,'#ae9055',.8);}
 }
}
function flyingBird(g,s,x,y,w,t,flip=false){const frame=[0,1,2,3,2,1][Math.floor(t*9)%6];sprite(g,s.birdFrames[frame],x,y,w,{flip});}
function bird(g,s,t,stage){field(g,t,stage);for(let i=0;i<2;i++){
 const u=t*.43-i*.48,x=159+91*Math.sin(u),y=99+i*29-Math.cos(u*2)*17;
 flyingBird(g,s,x,y,i?49:70,t+i*.27,Math.cos(u)<0);
 }}
function nest(g,s,t,stage){field(g,t,stage);path(g,p=>{p.moveTo(100,164);p.quadraticCurveTo(163,142,231,142);p.moveTo(205,145);p.lineTo(234,156);},SOIL,2);
 const im=s.nest,w=92,h=w*im.height/im.width,x=159,y=151;
 // Preserve the basket pixels, animate the two chicks independently above its rim.
 for(let i=0;i<2;i++){
  const cx=143+i*31,cy=123+Math.sin(t*3+i)*2+(i?4:0),r=i?9:11;
  g.save();g.fillStyle='#f5f2e8';g.strokeStyle=INK;g.lineWidth=1.65;g.beginPath();g.moveTo(cx-r-3,cy+12);g.quadraticCurveTo(cx-r,cy+4,cx-r,cy-4);g.bezierCurveTo(cx-r-1,cy-20,cx+r+5,cy-20,cx+r,cy-3);g.quadraticCurveTo(cx+r-1,cy+7,cx+r+4,cy+12);g.fill();g.stroke();
  g.fillStyle=INK;g.beginPath();g.arc(cx+3,cy-9,1.7,0,Math.PI*2);g.fill();
  const gape=3+3*(.5+.5*Math.sin(t*4+i));g.beginPath();g.moveTo(cx+r-1,cy-7);g.lineTo(cx+r+9,cy-9-gape);g.lineTo(cx+r+3,cy-3);g.lineTo(cx+r+8,cy+gape);g.lineTo(cx+r-1,cy+1);g.stroke();g.restore();
 }
 g.drawImage(im,0,im.height*.53,im.width,im.height*.47,x-w/2,y-h*.47,w,h*.47);
 const q=t%11,u=q/11,px=254-Math.sin(u*Math.PI)*69,py=65+Math.sin(u*Math.PI)*38;
 flyingBird(g,s,px,py,56,t,true);
 path(g,p=>{p.moveTo(px-21,py-29);p.quadraticCurveTo(px-24,py-21,px-20,py-18);},INK,1.2);
}
function snake(g,s,t,stage){field(g,t,stage);for(let i=0;i<2;i++){
 const q=t*.32+i*.8,angle=Math.atan2(-Math.sin(q)*.65,Math.cos(q)),length=i?64:94;
 g.save();g.translate(157+Math.sin(q)*49,i?157:132);
 const pts=Array.from({length:37},(_,k)=>{const u=k/36;const along=(u-.5)*length,wave=Math.sin(u*Math.PI*3-t*3+i)*4.2*(1-u);return {x:Math.cos(angle)*along-Math.sin(angle)*wave,y:Math.sin(angle)*along*.28+Math.cos(angle)*wave};});
 const trace=p=>{p.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(a=>p.lineTo(a.x,a.y));};
 path(g,trace,INK,i?7:10);path(g,trace,'#f5f2e8',i?4:7);
 for(let k=5;k<33;k+=6)ellipse(g,pts[k].x,pts[k].y,1.8,i?1.4:2.2,INK,.8);
 const head=pts.at(-1);sprite(g,s.snakeHead,head.x,head.y+3,i?18:24,{angle:Math.atan2(Math.sin(angle)*.28,Math.cos(angle))});
 if(t%3<.35&&Math.abs(Math.cos(angle))>.7)path(g,p=>{const d=Math.sign(Math.cos(angle)),x=head.x+d*(i?12:16),y=head.y;p.moveTo(x,y);p.lineTo(x+d*5,y-1);p.lineTo(x+d*7,y-3);p.moveTo(x+d*5,y-1);p.lineTo(x+d*7,y+1);},INK,.8);
 g.restore();
 }}
function crabPose(t,i=0){const q=(t+i*4)%12;
 // Both animals have a complete out / forage / retreat / hidden cycle.
 const emergence=q<2?smooth(q/2):q<7?1:q<9?1-smooth((q-7)/2):0;
 return {x:lerp(i?250:68,i?172:142,emergence),emergence,walking:q<2||(q>=7&&q<9),phase:q<2?'emerge':q<7?'forage':q<9?'retreat':'hidden'};
}
function crabBody(g,s,x,y,k,t,walking){g.save();g.translate(x,y);g.scale(k,k);
 for(let side of [-1,1])for(let j=0;j<4;j++){
  const stride=walking?Math.sin(t*15+j*1.8+side)*4:Math.sin(t*2+j)*.5;
  path(g,p=>{p.moveTo(side*15,-12+j*5);p.quadraticCurveTo(side*29,-19+j*7,side*(35+stride),j*5-5);p.lineTo(side*(30+stride),j*5+3);},INK,1.6);
 }
 for(let side of [-1,1]){const angle=side*(.2+Math.sin(t*3+side)*.13);path(g,p=>{p.moveTo(side*16,-12);p.quadraticCurveTo(side*27,-22,side*24,-32);},INK,2);sprite(g,s.crabClaw,side*24,-28,18,{flip:side<0,angle});}
 sprite(g,s.crabBody,0,7,42);g.restore();}
function crab(g,s,t,stage){pond(g,t,150);field(g,t,stage,137);
 for(let i=0;i<2;i++){
  const hx=i?260:59,hy=i?158:132,k=i?.55:.8,p=crabPose(t,i);
  g.save();g.fillStyle='#ddcfb9';g.beginPath();g.ellipse(hx,hy,30*k,24*k,0,Math.PI,Math.PI*2);g.fill();g.fillStyle='#9b806e';g.beginPath();g.ellipse(hx,hy,19*k,14*k,0,Math.PI,Math.PI*2);g.fill();g.restore();
  // The bank occludes the body as it walks through the mouth of the burrow.
  g.save();g.beginPath();g.rect(i?95:hx,hy-53,i?hx-95:180,80);g.clip();
  if(p.emergence>0)crabBody(g,s,p.x,hy-3,k,t+i,p.walking);g.restore();
  path(g,a=>{a.moveTo(hx-20*k,hy+1);a.quadraticCurveTo(hx,hy+4,hx+20*k,hy+1);},SOIL,2);
 }
}
function snail(g,s,t,stage){field(g,t,stage);for(let i=0;i<2;i++){
 const x=139+Math.sin(t*.19-i*.5)*58-i*42,y=146+i*14,w=i?37:57,flip=Math.cos(t*.19-i*.5)>0;
 path(g,p=>{p.moveTo(x+(flip?-1:1)*w*.35,y+1);p.quadraticCurveTo(x-30,y+2,x-45,y+1);},WATER,1,.32);
 bend(g,s.snail,x,y,w,t*.27, .65,true,flip);
 }}
function grasshopper(g,s,t,stage){field(g,t,stage);for(let i=0;i<2;i++){
 const q=(t+i*2.2)%10,rev=q>=5,u=q%5,a=rev?(i?266:192):(i?160:83),b=rev?(i?160:83):(i?266:192),k=clamp((u-1.6)/1.1),jump=u>=1.6&&u<2.7;
 const x=lerp(a,b,k),y=143+i*15-(jump?Math.sin(k*Math.PI)*64:0),w=i?42:62;
 sprite(g,s.grasshopper,x,y,w,{flip:rev,angle:jump?-.2*Math.sin(k*Math.PI):0,squash:u>1.35&&u<1.6?.84:1});
 if(jump)path(g,p=>{const side=rev?1:-1;p.moveTo(x+side*7,y-7);p.lineTo(x+side*25,y+5);p.lineTo(x+side*33,y+3);},INK,1.2);
 }}
function draw(g,s,type,t,stage='tillering'){
 g.clearRect(0,0,320,192);g.save();g.fillStyle='#f5f2e8';g.fillRect(0,0,320,192);
 if(type==='frog'){
  frog(g,s,t);
  // Keep the approved main frog choreography; a smaller companion rests on the bank.
  sprite(g,s.frogFrames[0],34,165,30,{squash:1+Math.sin(t*2)*.018});
 }else ({fish,duck,worm,dragonfly,mouse,bird,nest,snake,crab,snail,grasshopper}[type]||fish)(g,s,t,stage);
 g.restore();
}
root.HeSinhThaiArt={makeSprites,draw,frogPose,crop,habitat,habitats,riceSpec,duckPose,dragonflyPose,mousePose,crabPose};
})(typeof window==='undefined'?globalThis:window);
