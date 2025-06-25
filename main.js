import { animate, createTimeline, utils } from './anime.esm.js';
console.log('JS loaded');

// --- HERO PARTICLES (Cursor-following grid) ---
const particlesContainer = document.querySelector('.particles');
const rows = 15;
const grid = [rows, rows];
let w = window.innerWidth;
let h = document.querySelector('.hero').offsetHeight;
let hw = w / 2;
let hh = h / 2;
particlesContainer.style.setProperty('--size', rows);
particlesContainer.innerHTML = '';
for (let i = 0; i < (rows * rows); i++) {
  particlesContainer.appendChild(document.createElement('div'));
}
const duration = 50;
const particleDivs = particlesContainer.querySelectorAll('div');
function animateParticles(x, y, rot) {
  if (particleDivs.length === 0) return;
  animate({
    targets: particleDivs,
    translateX: x,
    translateY: y,
    rotate: rot,
    duration: duration,
    easing: 'outElastic(.3, 1.4)',
  });
}
window.addEventListener('pointermove', e => {
  const { clientX, clientY } = e;
  animateParticles(
    utils.mapRange(clientX, 0, w, -hw, hw),
    utils.mapRange(clientY, 0, h, -hh, hh),
    -Math.atan2(hw - clientX, hh - clientY)
  );
});
window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = document.querySelector('.hero').offsetHeight;
  hw = w / 2;
  hh = h / 2;
});

// --- FIREFLIES (Features section) ---
const firefliesBg = document.getElementById('fireflies-bg');
const fireflyCount = 18;
const fireflies = [];
firefliesBg.innerHTML = '';
for (let i = 0; i < fireflyCount; i++) {
  const f = document.createElement('div');
  f.className = 'firefly';
  firefliesBg.appendChild(f);
  fireflies.push(f);
}
function animateFirefly(f, i) {
  const w = firefliesBg.offsetWidth;
  const h = firefliesBg.offsetHeight;
  animate({
    targets: f,
    left: [utils.random(0, w - 24), utils.random(0, w - 24)],
    top: [utils.random(0, h - 24), utils.random(0, h - 24)],
    scale: [0.7, 1.2, 0.7],
    opacity: [0.5, 0.9, 0.5],
    duration: utils.random(4000, 9000),
    easing: 'easeInOutSine',
    complete: () => animateFirefly(f, i)
  });
}
fireflies.forEach(animateFirefly);
window.addEventListener('resize', () => {
  fireflies.forEach(animateFirefly);
});

// Animate hero title and tagline
animate({
  targets: '.hero-title',
  translateY: [40, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1200,
  delay: 200
});
animate({
  targets: '.hero-tagline',
  translateY: [30, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1000,
  delay: 500
});
animate({
  targets: '.app-box',
  scale: [0.95, 1],
  opacity: [0, 1],
  easing: 'spring(1, 80, 10, 0)',
  duration: 900,
  delay: 800
});

// Bounce animation for 'anything you want'
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
  animate({
    targets: '.gradient-text',
    translateY: [0, -8, 0],
    scale: [1, 1.08, 1],
    easing: 'easeInOutSine',
    duration: 1800,
    loop: true,
    direction: 'alternate',
    delay: 1200
  });
}

// Typewriter effect for input placeholder
const input = document.querySelector('.app-input');
const placeholderText = 'Ask ThinkVibe to create a web app that...';
let i = 0;
input.placeholder = '';
function typeWriter() {
  if (i < placeholderText.length) {
    input.placeholder += placeholderText.charAt(i);
    i++;
    setTimeout(typeWriter, 38);
  }
}
setTimeout(typeWriter, 1500);

// Add floating animated shapes to #hero-animation
const animationContainer = document.getElementById('hero-animation');
const colors = ['#a78bfa', '#7c3aed', '#e0c3fc'];
const numShapes = 18;

for (let i = 0; i < numShapes; i++) {
  const div = document.createElement('div');
  div.className = 'floating-shape';
  div.style.background = colors[i % colors.length];
  div.style.left = `${utils.random() * 95}%`;
  div.style.width = `${32 + utils.random() * 32}px`;
  div.style.height = div.style.width;
  div.style.opacity = 0.18 + utils.random() * 0.18;
  animationContainer.appendChild(div);
  animate({
    targets: div,
    translateY: [0, -40 - utils.random() * 80],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 3500 + utils.random() * 2000,
    delay: utils.random() * 1200
  });
}

// AI Agent Animation (inspired by additive-creature and svg-line-drawing)
const agentContainer = document.getElementById('ai-agent-animation');
if (agentContainer) {
  agentContainer.innerHTML = `<svg id="ai-agent-svg" width="100%" height="100%" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;
  const svg = document.getElementById('ai-agent-svg');
  const center = { x: 170, y: 170 };
  const orbCount = 7;
  const orbitRadius = 110;
  const orbs = [];
  // Draw orbs and lines
  for (let i = 0; i < orbCount; i++) {
    const angle = (2 * Math.PI * i) / orbCount;
    const x = center.x + orbitRadius * Math.cos(angle);
    const y = center.y + orbitRadius * Math.sin(angle);
    // Line from center to orb
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center.x);
    line.setAttribute('y1', center.y);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', '#a78bfa');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('opacity', '0.7');
    svg.appendChild(line);
    // Orb
    const orb = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    orb.setAttribute('cx', x);
    orb.setAttribute('cy', y);
    orb.setAttribute('r', '18');
    orb.setAttribute('fill', i % 2 === 0 ? '#7c3aed' : '#e0c3fc');
    orb.setAttribute('opacity', '0.92');
    svg.appendChild(orb);
    orbs.push({ orb, angle });
  }
  // Central glowing core
  const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  core.setAttribute('cx', center.x);
  core.setAttribute('cy', center.y);
  core.setAttribute('r', '38');
  core.setAttribute('fill', 'url(#coreGradient)');
  core.setAttribute('filter', 'url(#glow)');
  svg.appendChild(core);
  // Add SVG defs for glow and gradient
  svg.innerHTML += `
    <defs>
      <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
        <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.7"/>
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;
  // Animate orbs orbiting
  animate({
    targets: orbs,
    angle: (el, i) => [el.angle, el.angle + 2 * Math.PI],
    update: function(anim) {
      orbs.forEach((o, i) => {
        const a = o.angle;
        const x = center.x + orbitRadius * Math.cos(a);
        const y = center.y + orbitRadius * Math.sin(a);
        o.orb.setAttribute('cx', x);
        o.orb.setAttribute('cy', y);
        // Animate the corresponding line
        svg.childNodes[i*2].setAttribute('x2', x);
        svg.childNodes[i*2].setAttribute('y2', y);
      });
    },
    duration: 8000,
    easing: 'linear',
    loop: true
  });
  // Animate core pulsing
  animate({
    targets: core,
    r: [38, 44, 38],
    easing: 'easeInOutSine',
    duration: 2200,
    loop: true
  });
}

// Add icons to feature cards
const icons = [
  `<svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="18" height="18" rx="4"/><path d="M9 14h6M9 18h10"/></svg>`,
  `<svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="14" r="9"/><path d="M14 8v6l4 2"/></svg>`,
  `<svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12v-2a4 4 0 0 1 8 0v2"/><rect x="6" y="12" width="12" height="8" rx="2"/><path d="M12 16v2"/></svg>`
];
const icon1 = document.getElementById('feature-icon-1');
const icon2 = document.getElementById('feature-icon-2');
const icon3 = document.getElementById('feature-icon-3');
if (icon1) icon1.innerHTML = icons[0];
if (icon2) icon2.innerHTML = icons[1];
if (icon3) icon3.innerHTML = icons[2];

// --- Animated Canvas Background: Bouncing/Floating Shapes + Glowing Orbs ---
(function animatedCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const hero = document.querySelector('.hero');
  let W = 0, H = 0;
  function resize() {
    W = hero.offsetWidth;
    H = hero.offsetHeight;
    canvas.width = W;
    canvas.height = H;
  }
  resize();
  window.addEventListener('resize', resize);
  // Bouncing shapes
  const shapes = [];
  const numShapes = 14;
  const colors = [
    ctx.createLinearGradient(0, 0, 120, 120),
    ctx.createLinearGradient(0, 0, 120, 120),
    ctx.createLinearGradient(0, 0, 120, 120)
  ];
  colors[0].addColorStop(0, '#a78bfa'); colors[0].addColorStop(1, '#e0c3fc');
  colors[1].addColorStop(0, '#7c3aed'); colors[1].addColorStop(1, '#a78bfa');
  colors[2].addColorStop(0, '#e0c3fc'); colors[2].addColorStop(1, '#a78bfa');
  for (let i = 0; i < numShapes; i++) {
    const type = ['square', 'circle', 'triangle'][i % 3];
    const size = 32 + utils.random() * 48;
    shapes.push({
      type,
      x: utils.random(0, W - size),
      y: utils.random(0, H - size),
      dx: (utils.random() - 0.5) * 1.5,
      dy: (utils.random() - 0.5) * 1.5,
      size,
      color: colors[i % colors.length],
      angle: utils.random(0, Math.PI * 2),
      dAngle: (utils.random() - 0.5) * 0.01
    });
  }
  // Glowing orbs
  const orbs = [];
  const numOrbs = 7;
  for (let i = 0; i < numOrbs; i++) {
    orbs.push({
      x: utils.random(0, W),
      y: utils.random(0, H),
      r: 60 + utils.random() * 60,
      dx: (utils.random() - 0.5) * 0.3,
      dy: (utils.random() - 0.5) * 0.3,
      alpha: 0.12 + utils.random() * 0.13,
      color: `rgba(124,58,237,0.18)`
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Orbs
    orbs.forEach(o => {
      ctx.save();
      ctx.globalAlpha = o.alpha;
      const g = ctx.createRadialGradient(o.x, o.y, o.r * 0.2, o.x, o.y, o.r);
      g.addColorStop(0, '#a78bfa');
      g.addColorStop(0.5, '#e0c3fc');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    });
    // Bouncing shapes
    shapes.forEach(s => {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.translate(s.x + s.size/2, s.y + s.size/2);
      ctx.rotate(s.angle);
      ctx.translate(-s.size/2, -s.size/2);
      ctx.fillStyle = s.color;
      if (s.type === 'square') {
        ctx.fillRect(0, 0, s.size, s.size);
      } else if (s.type === 'circle') {
        ctx.beginPath();
        ctx.arc(s.size/2, s.size/2, s.size/2, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(s.size/2, 0);
        ctx.lineTo(s.size, s.size);
        ctx.lineTo(0, s.size);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    });
  }
  function animate() {
    // Orbs
    orbs.forEach(o => {
      o.x += o.dx;
      o.y += o.dy;
      // Fade in/out and change direction occasionally
      if (Math.random() < 0.003) o.dx = (utils.random() - 0.5) * 0.3;
      if (Math.random() < 0.003) o.dy = (utils.random() - 0.5) * 0.3;
      if (Math.random() < 0.002) o.alpha = 0.10 + utils.random() * 0.15;
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;
    });
    // Bouncing shapes
    shapes.forEach(s => {
      s.x += s.dx;
      s.y += s.dy;
      s.angle += s.dAngle;
      if (s.x < 0) { s.x = 0; s.dx *= -1; }
      if (s.x + s.size > W) { s.x = W - s.size; s.dx *= -1; }
      if (s.y < 0) { s.y = 0; s.dy *= -1; }
      if (s.y + s.size > H) { s.y = H - s.size; s.dy *= -1; }
    });
    draw();
    requestAnimationFrame(animate);
  }
  animate();
})();

// --- Overlay input modal for user ideas (fallback for easy access) ---
function showInputOverlay() {
  if (document.getElementById('input-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'input-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(124,58,237,0.13)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 1000;
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:1.5rem;box-shadow:0 2px 32px #a78bfa33;padding:2.2rem 2rem;max-width:95vw;width:420px;display:flex;flex-direction:column;align-items:center;">
      <h2 style='color:#7c3aed;font-size:1.3rem;font-weight:800;margin-bottom:1.2rem;'>Describe what you want to design</h2>
      <form id='overlay-form' style='width:100%;display:flex;gap:0.7rem;'>
        <input type='text' id='overlay-input' placeholder='e.g. A landing page for a travel app' style='flex:1;font-size:1.1rem;padding:1rem 1.1rem;border-radius:1.1rem;border:1.5px solid #e0c3fc;background:#f8f7fc;color:#222;outline:none;'/>
        <button type='submit' style='padding:1rem 2rem;font-size:1.1rem;border-radius:1.1rem;font-weight:700;background:linear-gradient(90deg,#a78bfa 0%,#7c3aed 100%);color:#fff;border:none;cursor:pointer;'>Submit</button>
      </form>
      <button id='close-overlay' style='margin-top:1.2rem;background:none;border:none;color:#7c3aed;font-weight:600;cursor:pointer;font-size:1rem;'>Cancel</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('close-overlay').onclick = () => overlay.remove();
  document.getElementById('overlay-form').onsubmit = e => {
    e.preventDefault();
    // You can handle the input value here
    overlay.remove();
  };
}
document.addEventListener('DOMContentLoaded', () => {
  const startDesigningBtn = document.querySelector('.main-cta');
  const designInputSection = document.getElementById('design-input-section');
  if (startDesigningBtn && designInputSection) {
    startDesigningBtn.addEventListener('click', e => {
      e.preventDefault();
      // If input section is visible, scroll; otherwise, show overlay
      const rect = designInputSection.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        designInputSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          designInputSection.classList.add('highlight-bounce');
          setTimeout(() => designInputSection.classList.remove('highlight-bounce'), 900);
        }, 600);
      } else {
        showInputOverlay();
      }
    });
  }

  // Add redirect for Log in and Get started buttons
  const loginBtn = document.querySelector('.login');
  const getStartedBtn = document.querySelector('.get-started');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      console.log('Login button clicked');
      window.location.assign('login.html');
    });
  }
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      console.log('Get Started button clicked');
      window.location.assign('signup.html');
    });
  }
}); 