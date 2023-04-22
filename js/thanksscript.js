window.addEventListener('load', function(){
    const canvas = document.getElementById('canvasThankYou');
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
   class Particle {
      constructor(effect, x, y, color){
         this.effect = effect;
         this.x = Math.random() * this.effect.canvasWidth;
         // this.y = 0;  // To bring starting particles from top. Delete line below this.
         this.y = this.effect.canvasHeight;
         this.color = color;
         this.originX = x;
         this.originY = y;
         this.size = this.effect.gap - 1;
         this.dx = 0;
         this.dy = 0;
         this.vx = 0;
         this.vy = 0;
         this.force = 0;
         this.angle = 0;
         this.distance = 0;
         this.friction = Math.random() * 0.6 + 0.15;
         this.ease = Math.random() * 0.1 + 0.005;
         // this.friction = 0.9;   // Less resource intense
         // this.ease = 0.2;
      }
      draw(){
         this.effect.context.fillStyle = this.color;
         this.effect.context.fillRect(this.originX, this.originY, this.size, this.size);
      }
      update(){
         this.dx = this.effect.mouse.x - this.x;
         this.dy = this.effect.mouse.y - this.y;
         this.distance = this.dx * this.dx + this.dy * this.dy;
         this.force = -this.effect.mouse.radius/this.distance;

         if (this.distance < this.effect.mouse.radius){
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
         }

         this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
         this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }  
   }

   class Effect {
      constructor(context, canvasWidth, canvasHeight){
         this.context = context;
         this.canvasWidth = canvasWidth;
         this.canvasHeight = canvasHeight;
         this.textX = this.canvasWidth/2;
         this.textY = this.canvasHeight/2;
         this.fontSize = 110;
         this.lineHeight = this.fontSize * 0.9;
         this.maxTextWidth = this.canvasWidth * 0.5;
         this.textInput = document.getElementById('textInput');
         this.verticalOffset = -80;
         this.textInput.addEventListener('keyup', (e) => {
            if (e.key !==' ') {
               this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
               this.wrapText(e.target.value);
            }
         });
         // Particle Text
         this.particles = [];
         this.gap = 3;
         this.mouse = {
            radius: 20000,
            x: 0,
            y: 0
         }
         window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
         });
         
      }
      wrapText(text){
         // Canvas Settings
         const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
         gradient.addColorStop(0.3, 'rgb(0, 255, 0)');
         gradient.addColorStop(0.5, 'rgb(255, 255, 0)');
         gradient.addColorStop(0.6, 'rgb(0, 255, 0)');
         this.context.fillStyle = gradient;
         this.context.textAlign = 'center';
         this.context.textBaseline = 'middle';
         this.context.lineWidth = 1;
         this.context.strokeStyle = 'gold';
         this.context.font = this.fontSize + 'px Courier';
         // break text to new line
         let linesArray = [];
         let words = text.split(' ');
         let lineCounter = 0;
         let line = '';
         for (let i = 0; i < words.length; i++){
            let testLine = line + words[i] + ' ';
            if (this.context.measureText(testLine).width > this.maxTextWidth){
               line = words[i] + ' ';
               lineCounter++;
            } else {
               line = testLine;
            }
            linesArray[lineCounter] = line;
         }  
         let textHeight =  this.lineHeight * lineCounter;
         this.textY = this.canvasHeight/2 - textHeight/2 + this.verticalOffset;
         linesArray.forEach((el, index) => {
            this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
            this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
         });
         this.convertToParticles();
      }
      convertToParticles(){
         this.particles = [];
         const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
         this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
         for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
               const index = (y * this.canvasWidth + x ) * 4;
               const alpha = pixels[index + 3];
               if (alpha > 0){
                  const red = pixels[index];
                  const green = pixels[index + 1];
                  const blue = pixels[index + 2];
                  const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                  this.particles.push(new Particle(this, x, y, color));
               }
            }
         }
      }
      render(){
         this.particles.forEach(particle => {
            particle.update();
            particle.draw();
         });
      }
      resize(width, height){
         this.canvasWidth = width;
         this.canvasHeight = height;
         this.textX = this.canvasWidth/2;
         this.textY = this.canvasHeight/2;
         this.maxTextWidth = this.canvasWidth * 0.3;
      }
   }

   const effect = new Effect(ctx, canvas.width, canvas.height);    
   effect.wrapText(effect.textInput.value);
//   effect.wrapText('Thanks!!! You are great. Comment out row above for hard code here');
   effect.render();

   function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas,height);
      effect.render();
      requestAnimationFrame(animate);
   }
   animate();

   this.window.addEventListener('resize', function(){
      canvas.width = window.innerWidth;
      canvas.height= window.innerHeight;
      effect.resize(canvas.width, canvas.height);
      effect.wrapText(effect.textInput.value);
   });

});



/*
Vertical Position Adjustment:
   line 59:  this.verticalOffset = -160;


Play With Appearance:
   change gap property on line 55 and line 16:(- 1).
   change friction and ease on lines 24 and 25.

Change Origin of Particles:
      // Modify an ease on y:
      update(){
         this.x += (this.originX - this.x) * this.ease;
         this.y += this.originY - this.y;
      }

Or: 
   // This comes from left and right top corners: 
   class Particle {
      constructor(effect, x, y, color){
         this.effect = effect;
         this.x = Math.random() * this.effect.canvasWidth;
         this.y = 0;

   // This comes from bottom:
   this.y = this.effect.canvasHeight;

If you don't use the expensive Math.sqrt, you can just use the formula (line 34), 
         but use a large radius for you mouse. 


Math.atan2() gives an angle in radians between positve x axis and a line projected for 0,0 to particle position.

*/











    /*
    //const text = 'Thank You!!! Your message has been sent!';
    //const textX = canvas.width/2;
    //const textY = canvas.height/2;
    ctx.lineWidth = 2;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.5, 'gold');
    gradient.addColorStop(0.6, 'green');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'gold';
    ctx.font = '80px Courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //ctx.fillText(text, textX, textY);
    //ctx.strokeText(text, textX, textY);

    const maxTextWidth = canvas.width * 0.3;
    const lineHeight = 80;

    // If FONT SIZE is changed, change in fillText too.
   function wrapText(text){
      let linesArray = [];
      let lineCounter = 0;
      let line = '';
      let words = text.split(' ');
      for (let i = 0; i < words.length; i++){
         let testLine = line + words[i] + ' ';
         if (ctx.measureText(testLine).width > maxTextWidth){
            line = words[i] + ' ';
            lineCounter++;
         } else {
            line = testLine;
         }
         linesArray[lineCounter] = line;
      }  
      let textHeight =  lineHeight * lineCounter;
      let textY = canvas.height/2 - textHeight/2;
      linesArray.forEach((el, index) => {
         ctx.fillText(el, canvas.width/2, 300 + index * 100);
      });
      console.log(linesArray);
   }

    wrapText('Thanks!!! Your message has been sent!');

});

*/


/////////////////////////////////////////////////////////
/*
let particleArray = [];
adjustX = 20;
adjustY = 0;

// handle mouse
const mouse = {
   x: null,
   y: null,
   radius: 150
}

window.addEventListener('mousemove', function(event){
   mouse.x = event.x;
   mouse.y = event.y;
}); 

ctx.fillStyle = 'green';
ctx.font = '20px Courier New';
ctx.fillText('MARSHA JELLEFF', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 300, 100);

class Particle {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 30) + 1;
   }
   draw() {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
   }
   update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
         this.x -= directionX;
         this.y -= directionY;
      } else {
         if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/10;
         }
         if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/10;
         }
      }
   }
} 
console.log(textCoordinates);
function init() {
   particleArray = [];
   for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
         if (textCoordinates.data[(y * 4 * textCoordinates.width) + 
         (x * 4) + 3] > 128) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX * 8, positionY * 8));
         }
      }
   }
}
init ();
console.log(particleArray);

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
   }
   connect();
   requestAnimationFrame(animate);
}
animate();

function connect() {
   for (let a = 0; a < particleArray.length; a++) {
      for (let b = 0; b < particleArray.length; b++) {
         let dx = particleArray[a].x - particleArray[b].x;
         let dy = particleArray[a].y - particleArray[b].y;
         let distance = Math.sqrt(dx * dx + dy * dy);

         if (distance < 17) {
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
         } 
      }
   }
}
*/

//-----------Notes------------------------------
// Speed can be changed by adjust density
// Mouse radius is under mouse const
// Change Snap back speed at update else 
// Change number of particles in init() for loop i
// Random distribution particles in init():
//    for (let i = 0; i < 1000; i++) {
//      let x = Math.random() * canvas.width;
//      let y = Math.random() * canvas.height;
//      particleArray.push(new Particle(x, y));
//   }
// Check original image for opacity on alpha rgba info:
//  if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128)
// the 4 skip through to the alphas, the 128 excludes less than 50% opacity


// Canvas is transparent, background color comes from html

// To Change SPREAD OF PARTICLES from init(): 
// particleArray.push(new Particle(positionX * 10, positionY * 10)); // change // 
//    multiplier
         
// To REPOSITION TEXT:
// adjustX and adjustY in init() and global variable declaration section
// ctx.fillText('text', x, y, maxWidth);
// ctx.strokeText('text', x, y, maxWidth);
// Size adjusted via ctx.font = '50px Arial'
// Text Wrap via: measureText("text");

// To Change Opacity of Lines during mouse event, see tutorial at 54:46
// https://www.youtube.com/watch?
//   v=XGioNBHrFU4&list=TLPQMTYxMTIwMjJVYOzTrlexuA&index=3&ab_channel=Frankslaboratory

// CANVAS SIZE:
// Canvas element has two independent sizes that need to be 
// synchronised, else distorted.
// Setting with CSS only, effects just the element size,
// which will stretch the drawing surface size and distort
// Better to set using canvas.width to set both 
// element size and drawing surface size to same value.


// 
// 
// 

// 
// 
// 

// 
