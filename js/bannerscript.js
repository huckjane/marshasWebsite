const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
let particleArray = [];
adjustX = 20;
adjustY = 0;

// handle mouse
const mouse1 = {
   x: null,
   y: null,
   radius: 150
}

window.addEventListener('mousemove', function(event){
   mouse1.x = event.x;
   mouse1.y = event.y;
}); 

ctx1.fillStyle = 'green';
ctx1.font = '1.25em Courier New';
ctx1.fillText('MARSHA JELLEFF', 0, 30);
const textCoordinates = ctx1.getImageData(0, 0, 300, 100);

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
      ctx1.fillStyle = 'green';
      ctx1.beginPath();
      ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx1.closePath();
      ctx1.fill();
   }
   update() {
      let dx = mouse1.x - this.x;
      let dy = mouse1.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse1.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < mouse1.radius) {
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
function init1() {
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
init1 ();
console.log(particleArray);

function animate1() {
   ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
   for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
   }
   connect1();
   requestAnimationFrame(animate1);
}
animate1();

function connect1() {
   for (let a = 0; a < particleArray.length; a++) {
      for (let b = 0; b < particleArray.length; b++) {
         let dx = particleArray[a].x - particleArray[b].x;
         let dy = particleArray[a].y - particleArray[b].y;
         let distance = Math.sqrt(dx * dx + dy * dy);

         if (distance < 17) {
            ctx1.strokeStyle = 'green';
            ctx1.lineWidth = 1;
            ctx1.beginPath();
            ctx1.moveTo(particleArray[a].x, particleArray[a].y);
            ctx1.lineTo(particleArray[b].x, particleArray[b].y);
            ctx1.stroke();
         } 
      }
   }
}

// window resize event
window.addEventListener('resize', 
   function() {
      canvas1.width = innerWidth;
      canvas1.height = innerHeight;
      mouse1.radius = ((canvas1.height/100) * (canvas1.width/100));
      init();
   }
);

// mouse out event
window.addEventListener('mouseout',
   function() {
      mouse1.x = undefined;
      mouse1.y = undefined;
   }
);

//-----------Notes------------------------------
// Speed can be changed by adjust density
// Mouse radius is under mouse const
// Change Snap back speed at update else 
// Change number of particles in init() for loop i
// Random distribution particles in init():
//    for (let i = 0; i < 1000; i++) {
//      let x = Math.random() * canvas1.width;
//      let y = Math.random() * canvas1.height;
//      particleArray.push(new Particle(x, y));
//   }
// Check original image for opacity on alpha rgba info:
//  if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128)
// the 4 skip through to the alphas, the 128 excludes less than 50% opacity


// Canvas is transparent, background color comes from html or css

// To Change SPREAD OF PARTICLES from init(): 
// particleArray.push(new Particle(positionX * 10, positionY * 10)); // change // 
//    multiplier
         
// To REPOSITION TEXT:
// adjustX and adjustY in init() and global variable declaration section

// To Change Opacity of Lines during mouse event, see tutorial at 54:46
// https://www.youtube.com/watch?
//   v=XGioNBHrFU4&list=TLPQMTYxMTIwMjJVYOzTrlexuA&index=3&ab_channel=Frankslaboratory






