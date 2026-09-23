/* ================= КОНФИГУРАЦИЯ ================= */
const person = {
  nameRu: 'Лю Мэнцзе',
  nameZh: '刘梦洁',
  birth: { year: 2007, month: 9, day: 23 },
  currentAge: 20,            // на главном экране
  turningAge: 21,            // скоро будет 21
  cakeMsgRu: 'С двадцатилетием!',   // ← исправлено
  cakeMsgZh: '二十岁快乐！'           // ← исправлено
};


/* Изображения (присланные пользователем) */
const BEAR_IMG = 'bear.png';
const PORTRAIT_IMG = 'portrait.jpg';


/* ---------- Пекинское время (UTC+8) ---------- */
const BJ_OFFSET = 8 * 3600 * 1000;
const bjNow = () => new Date(Date.now() + BJ_OFFSET);
const pad = (n) => String(n).padStart(2, '0');

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ============ ИЗОБРАЖЕНИЯ ============ */
(function setImages() {
  document.getElementById('portraitImg').src = PORTRAIT_IMG;
  const bl = document.getElementById('bearLeftImg');
  const br = document.getElementById('bearRightImg');
  bl.src = BEAR_IMG;
  br.src = BEAR_IMG;
  bl.onerror = () => { bl.style.display = 'none'; };
  br.onerror = () => { br.style.display = 'none'; };
})();

/* ============ ЛЕПЕСТКИ СЛИВЫ ============ */
(function createPetals() {
  const colors = ['#ffd6e7', '#f7a8c4', '#ffb3c6', '#ffc9de', '#e8a0bf', '#f9d4e4'];
  const c = document.getElementById('petals');
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = rand(8, 22);
    p.style.width = size + 'px';
    p.style.height = size * 0.8 + 'px';
    p.style.left = rand(0, 100) + 'vw';
    p.style.background = pick(colors);
    p.style.animationDuration = rand(7, 15) + 's';
    p.style.animationDelay = rand(0, 12) + 's';
    p.style.setProperty('--drift', rand(-80, 80) + 'px');
    p.style.setProperty('--rot', rand(360, 900) + 'deg');
    c.appendChild(p);
  }
})();

/* ============ ФОНАРИКИ ============ */
(function createLanterns() {
  const c = document.getElementById('lanterns');
  const positions = [6, 22, 40, 60, 78, 94];
  positions.forEach((left, i) => {
    const l = document.createElement('div');
    l.className = 'lantern';
    l.style.left = left + 'vw';
    l.style.animationDuration = rand(3.5, 5.5) + 's';
    l.style.animationDelay = i * 0.4 + 's';
    l.innerHTML =
      '<div class="string"></div><div class="cap"></div>' +
      '<div class="body"></div><div class="tassel"></div>';
    c.appendChild(l);
  });
})();

/* ============ ЗОЛОТЫЕ БЛЁСТКИ ============ */
(function createSparkles() {
  const c = document.getElementById('sparkles');
  setInterval(() => {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = rand(2, 5);
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = rand(0, 100) + 'vw';
    s.style.animationDuration = rand(6, 12) + 's';
    c.appendChild(s);
    setTimeout(() => s.remove(), 12000);
  }, 500);
})();

/* ============ ЭКВАЛАЙЗЕР ============ */
(function equalizer() {
  const eq = document.getElementById('equalizer');
  for (let i = 0; i < 28; i++) {
    const b = document.createElement('div');
    b.className = 'eq-bar';
    b.style.left = (i * 3.57) + '%';
    b.style.animationDuration = rand(.6, 1.4) + 's';
    b.style.animationDelay = rand(0, .8) + 's';
    b.style.height = rand(12, 60) + 'px';
    eq.appendChild(b);
  }
})();

/* ============ ФЕЙЕРВЕРКИ ============ */
(function fireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const colors = ['#ffd700', '#ff6b6b', '#ff2ec4', '#00f0ff', '#54a0ff', '#ff4757', '#ffffff', '#a855f7'];

  function Particle(x, y, color, angle, speed) {
    this.x = x; this.y = y;
    this.vx = Math.cos(angle) * speed * rand(0.55, 1);
    this.vy = Math.sin(angle) * speed * rand(0.55, 1);
    this.color = color;
    this.life = 1;
    this.decay = rand(0.008, 0.018);
    this.gravity = 0.045;
  }

  function explode(x, y) {
    const color = pick(colors);
    const count = Math.floor(rand(40, 70));
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + rand(-0.1, 0.1);
      particles.push(new Particle(x, y, color, angle, rand(2, 6.5)));
    }
  }

  function tick() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985; p.vy *= 0.985;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('click', (e) => explode(e.clientX, e.clientY));
  setInterval(() => {
    explode(rand(window.innerWidth * 0.15, window.innerWidth * 0.85),
            rand(window.innerHeight * 0.15, window.innerHeight * 0.55));
  }, 1400);
})();

/* ============ ВОЗРАСТ / ИМЯ ============ */
(function setAge() {
  document.getElementById('ageNum').textContent = person.currentAge;
  document.getElementById('nameLine').innerHTML =
    '— <span class="ru">' + person.nameRu + '</span> · <span class="zh">' + person.nameZh + '</span>';
})();

/* ============ ПЕКИНСКИЕ ЧАСЫ + ОТСЧЁТ ============ */
(function clockAndCountdown() {
  const clockEl = document.getElementById('bjClock');
  const el = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };

  function nextBirthdayEpoch() {
    const y = bjNow().getUTCFullYear();
    let target = Date.UTC(y, 8, 23) - BJ_OFFSET; // 23.09 00:00 Пекин
    if (Date.now() >= target) target = Date.UTC(y + 1, 8, 23) - BJ_OFFSET;
    return target;
  }

  function update() {
    const d = bjNow();
    clockEl.textContent =
      pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) +
      '  ·  ' + pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();

    const diff = nextBirthdayEpoch() - Date.now();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.d.textContent = pad(days);
    el.h.textContent = pad(hours);
    el.m.textContent = pad(mins);
    el.s.textContent = pad(secs);
  }
  update();
  setInterval(update, 1000);
})();

/* ============ ПЕЧАТАЮЩИЙСЯ ТЕКСТ ============ */
(function typewriter() {
  const lines = [
    { ru: 'Пусть сбудутся все твои мечты ✨', zh: '愿你所有的梦想都成真' },
    { ru: 'Ты — наше счастье 💛', zh: '你是我们的幸福' },
    { ru: person.cakeMsgRu + ' 🎂', zh: person.cakeMsgZh },
    { ru: 'Сегодня весь мир празднует тебя 🌸', zh: '今天全世界都在为你庆祝' }
  ];
  const el = document.getElementById('subtitle');
  let li = 0, ci = 0, deleting = false;
  const cur = () => lines[li];
  function step() {
    const full = cur().ru + ' · ' + cur().zh;
    if (!deleting) {
      ci++;
      el.textContent = full.slice(0, ci);
      if (ci === full.length) { deleting = true; return setTimeout(step, 2400); }
    } else {
      ci--;
      el.textContent = full.slice(0, ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(step, deleting ? 18 : 70);
  }
  step();
})();

/* ============ КРАСНЫЙ КОНВЕРТ: ФОТО + МИШКИ ============ */
(function hongbao() {
  const fortunes = [
    { zh: '心想事成', ru: 'Пусть сбываются все мечты' },
    { zh: '幸福美满', ru: 'Счастья и гармонии' },
    { zh: '前程似锦', ru: 'Блестящего будущего' },
    { zh: '万事如意', ru: 'Пусть всё складывается удачно' },
    { zh: '健康平安', ru: 'Здоровья и спокойствия' },
    { zh: '笑口常开', ru: 'Пусть улыбка не сходит с лица' }
  ];
  const box = document.getElementById('hongbao');
  const fortune = document.getElementById('fortune');
  box.addEventListener('click', () => {
    if (box.classList.contains('open')) return;
    box.classList.add('open');
    const f = pick(fortunes);
    document.getElementById('fortuneZh').textContent = f.zh;
    document.getElementById('fortuneRu').textContent = f.ru;
    fortune.classList.add('show');
  });
})();

/* ============ ТОРТ / СВЕЧИ ============ */
(function cake() {
  const cake = document.getElementById('cake');
  const msg = document.getElementById('cakeMessage');
  cake.addEventListener('click', () => {
    if (cake.classList.contains('blown')) return;
    cake.classList.add('blown');
    msg.innerHTML =
      '<span class="zh">' + person.cakeMsgZh + '</span> ' +
      '<span class="ru">' + person.cakeMsgRu + '</span>';
    msg.classList.add('show');
  });
})();
