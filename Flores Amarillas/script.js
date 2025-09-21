// Canvas de luces flotantes permanentes
const lightsCanvas = document.getElementById('lights');
const lightsCtx = lightsCanvas.getContext('2d');
lightsCanvas.width = window.innerWidth;
lightsCanvas.height = window.innerHeight;

// Clase Luz
class Light {
  constructor(){
    this.x = Math.random() * lightsCanvas.width;
    this.y = Math.random() * lightsCanvas.height;
    this.radius = 5 + Math.random()*15; // tamaño variable
    this.color = `hsla(${Math.random()*360}, 70%, 70%, 0.61)`; // opacidad 61%
    this.speedX = (Math.random()-0.5) * 0.3; // movimiento horizontal suave
    this.speedY = (Math.random()-0.5) * 0.3; // movimiento vertical suave
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // rebote en los bordes
    if(this.x < 0) this.x = 0;
    if(this.x > lightsCanvas.width) this.x = lightsCanvas.width;
    if(this.y < 0) this.y = 0;
    if(this.y > lightsCanvas.height) this.y = lightsCanvas.height;
  }
  draw() {
    lightsCtx.fillStyle = this.color;
    lightsCtx.beginPath();
    lightsCtx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    lightsCtx.fill();
  }
}

// Crear 60 luces
const lights = [];
for(let i = 0; i < 60; i++){
  lights.push(new Light());
}

// Animación continua sin desaparecer
function animateLights(){
  lightsCtx.clearRect(0,0,lightsCanvas.width,lightsCanvas.height); // limpiar canvas completamente
  lights.forEach(light => {
    light.update();
    light.draw();
  });
  requestAnimationFrame(animateLights);
}
animateLights();

// Ajustar tamaño al cambiar ventana
window.addEventListener('resize', ()=>{
  lightsCanvas.width = window.innerWidth;
  lightsCanvas.height = window.innerHeight;
});
animateLights()

// ---------- GLOBOS ----------
const balloonsContainer = document.querySelector('.balloons-container');
const letters = ['L','O','V','E'];
letters.forEach(letter => {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.innerText = letter;
  balloonsContainer.appendChild(balloon);
});

// ---------- FUEGOS ARTIFICIALES ----------
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 2 + Math.random()*2;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.gravity = 0.05;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let particles = [];

function explode(x, y) {
  const colors = ['red','yellow','blue','purple','orange','pink'];
  for(let i=0;i<50;i++){
    particles.push(new Particle(x, y, colors[Math.floor(Math.random()*colors.length)]));
  }
  playSound();
}

function playSound(){
  const audio = new Audio('explosion.mp3'); // coloca tu mp3 en la carpeta
  audio.volume = 0.5;
  audio.play();
}

function animate() {
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.alpha <=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

// Fuegos artificiales automáticos: 10 cada 2 segundos
function autoFireworks() {
  for(let i=0; i<10; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    explode(x, y);
  }
}
setInterval(autoFireworks, 2000);