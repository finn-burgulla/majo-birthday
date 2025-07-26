// --- Birthday Card Flip ---
window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('birthday-card');
  const openBtn = document.getElementById('open-card-btn');
  const closeBtn = document.getElementById('close-card-btn');
  if (card && openBtn && closeBtn) {
    openBtn.addEventListener('click', () => {
      card.classList.add('flipped');
    });
    closeBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
    });
  }
});
const confettiCanvas = document.getElementById('confetti-canvas');

const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
  const colors = ['#ff5e62', '#ff9966', '#f9d423', '#a8e063', '#43cea2', '#1976d2', '#9d50bb', '#ee0979', '#f6d365', '#fda085'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    r: Math.random() * 8 + 6,
    d: Math.random() * 80 + 40,
    color: randomColor(),
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 10);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  for (let i = 0; i < confettiPieces.length; i++) {
    let p = confettiPieces[i];
    p.y += Math.cos(p.d) + 2 + p.r / 2;
    p.x += Math.sin(0.5) * 2;
    p.tiltAngle += p.tiltAngleIncremental;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    if (p.y > confettiCanvas.height) {
      confettiPieces[i] = createConfettiPiece();
      confettiPieces[i].y = 0;
    }
  }
}

function startConfetti() {
  confettiPieces = Array.from({ length: 120 }, createConfettiPiece);
  (function animate() {
    drawConfetti();
    requestAnimationFrame(animate);
  })();
}

window.addEventListener('DOMContentLoaded', startConfetti);

// --- Floating Balloons Animation ---
const balloonContainer = document.getElementById('balloon-container');

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.background = randomColor();
  balloon.style.left = Math.random() * 90 + 'vw';
  balloon.style.animationDuration = (Math.random() * 4 + 8) + 's';
  balloon.style.opacity = 0.85;
  balloon.style.setProperty('--balloon-translate', Math.random() * 40 - 20 + 'px');
  balloonContainer.appendChild(balloon);
  setTimeout(() => balloon.remove(), (parseFloat(balloon.style.animationDuration) * 1000));
}

function animateBalloons() {
  for (let i = 0; i < 8; i++) {
    setTimeout(createBalloon, i * 1200);
  }
}

setInterval(animateBalloons, 9000);
animateBalloons();

// Balloon CSS (if not present, inject)
if (!document.getElementById('balloon-style')) {
  const style = document.createElement('style');
  style.id = 'balloon-style';
  style.innerHTML = `
  .balloon {
    position: absolute;
    bottom: -120px;
    width: 48px;
    height: 65px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    animation: floatBalloon linear forwards;
    z-index: 4;
    left: 50vw;
    will-change: transform, opacity;
    transition: opacity 0.5s;
  }
  @keyframes floatBalloon {
    0% { transform: translateY(0) translateX(var(--balloon-translate, 0)); opacity: 0.8; }
    10% { opacity: 1; }
    100% { transform: translateY(-110vh) translateX(var(--balloon-translate, 0)); opacity: 0; }
  }
  `;
  document.head.appendChild(style);
}

// Interactive Wish Button
const wishBtn = document.getElementById('wish-btn');
if (wishBtn) {
  wishBtn.addEventListener('click', () => {
    const wishes = [
      '¡Feliz cumpleaños, Majo! May your dreams take flight like these balloons!',
      'Sending you Peruvian sunshine and US college luck! ☀️🎓',
      'You are brave, brilliant, and so loved. ¡Vamos, Majo!',
      'May your year be as vibrant as a Peruvian festival! 🎉',
      '¡Te deseo lo mejor en tu nueva aventura! 🇵🇪✈️🇺🇸',
      'Keep shining, Majo! The world is yours.'
    ];
    const msg = wishes[Math.floor(Math.random() * wishes.length)];
    wishBtn.textContent = msg;
    wishBtn.disabled = true;
    wishBtn.style.background = 'linear-gradient(90deg, #43cea2, #1976d2)';
    setTimeout(() => {
      wishBtn.textContent = 'Click for a Surprise!';
      wishBtn.disabled = false;
      wishBtn.style.background = '';
    }, 4200);
  });
}

// Peruvian Trivia Section
const triviaBtn = document.getElementById('trivia-btn');
const triviaQ = document.getElementById('trivia-question');
const triviaFacts = [
  'Peru is home to Machu Picchu, one of the New Seven Wonders of the World!',
  'The potato originated in Peru, and there are over 3,000 varieties grown there.',
  'Lake Titicaca in Peru is the highest navigable lake in the world.',
  'Peru has three official languages: Spanish, Quechua, and Aymara.',
  'The Nazca Lines, mysterious ancient geoglyphs, are found in southern Peru.',
  'Peru is famous for its delicious ceviche and vibrant cuisine.',
  'The Amazon River begins in Peru!',
  'The Inti Raymi festival in Cusco celebrates the Incan sun god.'
];
if (triviaBtn && triviaQ) {
  triviaBtn.addEventListener('click', () => {
    const fact = triviaFacts[Math.floor(Math.random() * triviaFacts.length)];
    triviaQ.textContent = fact;
    triviaBtn.disabled = true;
    setTimeout(() => {
      triviaBtn.disabled = false;
      triviaQ.textContent = 'Click again for another fun fact!';
    }, 4000);
  });
  // Show a random fact on load
  triviaQ.textContent = triviaFacts[Math.floor(Math.random() * triviaFacts.length)];
}

// (Optional) Collage/Carousel Animation
// You can add more images to the collage-grid in HTML or dynamically here.
// For a simple fade-in effect:
window.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.collage-grid img');
  imgs.forEach((img, i) => {
    img.style.opacity = 0;
    setTimeout(() => {
      img.style.transition = 'opacity 1.2s';
      img.style.opacity = 1;
    }, 400 + i * 350);
  });
});

// --- Typewriter Effect ---
function createTypewriter(msg, targetId = 'typewriter-message') {
  let el = document.getElementById(targetId);
  if (!el) {
    el = document.createElement('div');
    el.id = targetId;
    el.style.textAlign = 'center';
    el.style.fontFamily = "'Pacifico', 'Nunito', cursive, sans-serif";
    el.style.fontSize = '1.5rem';
    el.style.margin = '1.5rem auto 0 auto';
    el.style.color = '#d72660';
    el.style.letterSpacing = '1.2px';
    el.style.textShadow = '0 2px 8px #fff6';
    el.style.minHeight = '2.5em';
    const hero = document.querySelector('.hero');
    if (hero) hero.insertAdjacentElement('afterend', el);
    else document.body.prepend(el);
  }
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < msg.length) {
      el.textContent += msg.charAt(i);
      i++;
      setTimeout(type, 55 + Math.random() * 60);
    } else {
      el.innerHTML += ' <span class="star">★</span>';
    }
  }
  type();
}

window.addEventListener('DOMContentLoaded', () => {
  createTypewriter("Feliz cumpleaños, Majo 🎉🎈✨ You’re going to do amazing things!");
});
