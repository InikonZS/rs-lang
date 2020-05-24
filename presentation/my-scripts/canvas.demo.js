setTimeout(()=>{
//demo1
function cnv1_demo(ctx, canvas){
  let top = 0;
  let bottom = canvas.clientHeight;
  let left = 0;
  let right = canvas.clientWidth;
  ctx.fillStyle = '#434';
  ctx.fillRect(0, 0, right, bottom)
  ctx.beginPath();
  for (let i = -right; i<right; i+=50){
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.strokeText(i, i, top + 10);
    ctx.moveTo(i, -bottom);
    ctx.lineTo(i, bottom);
  }
  for (let i = -bottom; i<bottom; i+=50){
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.strokeText(i, left, i);
    ctx.moveTo(-right, i);
    ctx.lineTo(right, i);
  }
  ctx.strokeStyle = "rgba(0, 255, 0, 1)";
  ctx.stroke();
}

let canvas = document.getElementById('cnv1');
let ctx = canvas.getContext('2d');
cnv1_demo(ctx, canvas);

//demo 2

let canvas2 = document.getElementById('cnv2');
let ctx2 = canvas2.getContext('2d');
ctx2.translate(canvas2.clientWidth/2, canvas2.clientHeight/2);
cnv1_demo(ctx2, canvas2);
ctx2.rotate(Math.PI/4);
cnv1_demo(ctx2, canvas2);

//demo 3

let canvas3 = document.getElementById('cnv3');
let ctx3 = canvas3.getContext('2d');
let a=0;
function animation_demo(timeStamp){
  ctx3.fillStyle = 'rgba(0,0,0,0.04)';
  ctx3.fillRect(0, 0, 1000, 1000);
  let newTime = Date.now();
  let dt = newTime-timeStamp;
  ctx3.beginPath();
  ctx3.moveTo(Math.trunc(100*Math.sin(a))+100, Math.trunc(100*Math.cos(a))+100);
  a+=Math.PI/3*2+0.01;
  ctx3.lineTo(Math.trunc(100*Math.sin(a))+100, Math.trunc(100*Math.cos(a))+100);
  ctx3.strokeStyle = "rgba(0, 255, 0, 1)";
  ctx3.stroke();
  requestAnimationFrame(animation_demo);
}
requestAnimationFrame(animation_demo);

//demo4
let im1 = document.getElementById('img1');
let l1 = document.getElementById('lnk1');
let imData = canvas2.toDataURL();
im1.src = imData;
l1.href = im1.src;

//demo5
let canvas4 = document.getElementById('cnv4');
let ctx4 = canvas4.getContext('2d');
let imf2 = new Image();
imf2.onload = () =>{
  window.setInterval(()=>{
    ctx4.drawImage(imf2, Math.random()*300,Math.random()*300, 32, 32);  
  }, 400);
}
imf2.src='my-scripts/github.png';

//demo6
let canvas5 = document.getElementById('cnv5');
let ctx5 = canvas5.getContext('2d');
let imf3 = new Image();
imf3.onload = () =>{
  canvas5.addEventListener('mousemove',(e)=>{
    ctx5.drawImage(imf3, e.clientX-canvas5.getBoundingClientRect().x, e.clientY-canvas5.getBoundingClientRect().y, 32, 32);    
  });
}
imf3.src='my-scripts/github.png';

},3000);
