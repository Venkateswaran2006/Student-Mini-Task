/* ============================================================
   app.js  –  BrightMinds Learning  v3
   Features: auto-advance, shuffled options, voice (fixed),
             Web Audio, validation, sound-image captcha,
             confetti, fireworks, multi-language support
   ============================================================ */
'use strict';

/* ══ State ══════════════════════════════════════════════════ */
const State = {
  currentClass: null,
  currentTask: null,   // 0-based index
  currentQ: 0,
  score: 0,
  answered: false,
  autoTimer: null,
  student: { name: '', dob: '' },
  questions: []      // questions for current task (with shuffled options)
};

/* ══ Web Audio ══════════════════════════════════════════════ */
const SFX = (() => {
  let ctx = null;
  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { }
    }
    if (ctx && ctx.state === 'suspended') { ctx.resume(); }
    return ctx;
  }
  function tone(freq, dur, type = 'sine', vol = 0.25) {
    const c = ac(); if (!c) return;
    try {
      const o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type;
      o.frequency.setValueAtTime(freq, c.currentTime);
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(c.currentTime); o.stop(c.currentTime + dur);
    } catch (e) { }
  }
  function click() { tone(520, 0.06, 'square', 0.12); }
  function correct() {
    tone(523, .1, 'sine', .3); setTimeout(() => tone(659, .1, 'sine', .3), 110);
    setTimeout(() => tone(784, .18, 'sine', .3), 220);
  }
  function wrong() { tone(280, .15, 'square', .25); setTimeout(() => tone(200, .3, 'square', .2), 150); }
  function captcha() {
    [440, 550, 660].forEach((f, i) => setTimeout(() => tone(f, .08, 'sine', .2), i * 70));
  }
  function advance() { tone(660, .07, 'sine', .18); setTimeout(() => tone(880, .09, 'sine', .18), 75); }
  function fanfare() {
    [523, 659, 784, 988, 1047].forEach((f, i) => setTimeout(() => tone(f, .2, 'sine', .25), i * 90));
  }
  function regSuccess() {
    [440, 550, 660, 880].forEach((f, i) => setTimeout(() => tone(f, .1, 'sine', .22), i * 80));
  }
  return { click, correct, wrong, captcha, advance, fanfare, regSuccess };
})();

/* ══ Text-to-Speech (Voice) ════════════════════════════════ */
const Voice = (() => {
  const _supported = 'speechSynthesis' in window;
  let _keepAlive = null;

  function speak(text) {
    if (!_supported) return;
    // Cancel existing speech, wait one tick, then speak.
    // Immediate speak() after cancel() is silently swallowed by Chrome.
    try { window.speechSynthesis.cancel(); } catch (e) { }
    clearInterval(_keepAlive);

    setTimeout(() => {
      try {
        const utt = new SpeechSynthesisUtterance(text);
        // en-US is universally available; specifying en-IN causes
        // silent failure when that voice is not installed.
        utt.lang = 'en-US';
        utt.rate = 0.88;
        utt.pitch = 1.05;
        utt.volume = 1;

        // Chrome pauses after ~15s — keep alive with pause/resume cycle
        utt.onstart = () => {
          clearInterval(_keepAlive);
          _keepAlive = setInterval(() => {
            if (!window.speechSynthesis.speaking) { clearInterval(_keepAlive); return; }
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }, 10000);
        };
        utt.onend = () => clearInterval(_keepAlive);
        utt.onerror = () => clearInterval(_keepAlive);

        window.speechSynthesis.speak(utt);
      } catch (e) { }
    }, 100);
  }

  function stop() {
    clearInterval(_keepAlive);
    if (_supported) { try { window.speechSynthesis.cancel(); } catch (e) { } }
  }

  return { speak, stop, supported: () => _supported };
})();


/* ══ Page Router ════════════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id + '-page');
  if (pg) { pg.classList.add('active'); window.scrollTo(0, 0); }
}

/* ══ Particles / Confetti ═══════════════════════════════════ */
function launchConfetti(n = 55) {
  const wrap = document.getElementById('confetti-wrap'); if (!wrap) return;
  wrap.innerHTML = '';
  const cols = ['#f9ca24', '#6c5ce7', '#FF6B9D', '#26de81', '#4ECDC4', '#fd79a8', '#FF9F43', '#74b9ff'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${-10 - Math.random() * 20}%;
      background:${cols[Math.floor(Math.random() * cols.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '3px'};
      width:${6 + Math.random() * 9}px;height:${6 + Math.random() * 9}px;
      animation-duration:${1.6 + Math.random() * 2.2}s;
      animation-delay:${Math.random() * 0.6}s;`;
    wrap.appendChild(p);
  }
}

/* ══ Fireworks ═══════════════════════════════════════════════ */
function launchFireworks() {
  const wrap = document.getElementById('fireworks-wrap'); if (!wrap) return;
  const cols = ['#f9ca24', '#6c5ce7', '#FF6B9D', '#26de81', '#4ECDC4'];
  for (let f = 0; f < 10; f++) {
    setTimeout(() => {
      const cx = 10 + Math.random() * 80, cy = 10 + Math.random() * 75;
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * 360, rad = ang * Math.PI / 180;
        const dist = 35 + Math.random() * 70;
        const el = document.createElement('div');
        el.className = 'firework';
        el.style.cssText = `left:${cx}%;top:${cy}%;
          background:${cols[Math.floor(Math.random() * cols.length)]};
          --dx:${Math.cos(rad) * dist}px;--dy:${Math.sin(rad) * dist}px;
          width:${4 + Math.random() * 6}px;height:${4 + Math.random() * 6}px;
          animation-duration:${0.8 + Math.random() * 0.5}s;`;
        wrap.appendChild(el);
        setTimeout(() => el.remove(), 1600);
      }
    }, f * 280);
  }
}

/* ══ Feedback banner ════════════════════════════════════════ */
function showFeedback(ok) {
  const ov = document.getElementById('feedback-overlay');
  const bn = document.getElementById('feedback-banner');
  if (!ov || !bn) return;
  const okMsgs = I18n.t('okMsgs');
  const badMsgs = I18n.t('badMsgs');
  bn.textContent = ok
    ? okMsgs[Math.floor(Math.random() * okMsgs.length)]
    : badMsgs[Math.floor(Math.random() * badMsgs.length)];
  bn.className = 'feedback-banner' + (ok ? '' : ' wrong-fb');
  ov.classList.add('show');
  setTimeout(() => ov.classList.remove('show'), 1100);
  if (ok) launchConfetti(45);
}

/* ══ Stars ═══════════════════════════════════════════════════ */
function buildStars(score, total) {
  const pct = (score / total) * 100;
  const n = pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;
  const row = document.getElementById('star-row'); if (!row) return;
  row.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('span');
    s.className = 'star-item';
    s.textContent = i < n ? '⭐' : '☆';
    s.style.animationDelay = (i * 0.15) + 's';
    if (i >= n) { s.style.opacity = '0.25'; s.style.animation = 'none'; }
    row.appendChild(s);
  }
}

function resultMsg(score, total) {
  const p = (score / total) * 100;
  if (p === 100) return I18n.t('res100');
  if (p >= 90) return I18n.t('res90');
  if (p >= 70) return I18n.t('res70');
  if (p >= 50) return I18n.t('res50');
  if (p >= 30) return I18n.t('res30');
  return I18n.t('resLow');
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════ */
function initHome() {
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', () => {
      SFX.click();
      State.currentClass = card.dataset.classId;
      openRegister(card.dataset.classId);
    });
    card.addEventListener('mouseenter', () => SFX.click());
  });

  // Build floating emojis
  const emojis = ['⭐', '🌈', '🎈', '🦋', '🌸', '🚀', '💡', '🎯', '🎨', '🌟', '🍎', '✏️', '📚', '🎓'];
  const wrap = document.querySelector('.floating-emojis');
  if (wrap) {
    emojis.forEach((em, i) => {
      const el = document.createElement('div');
      el.className = 'float-emoji';
      el.textContent = em;
      el.style.cssText = `
        left:${5 + (i * 6.8) % 90}%;
        animation-delay:${i * 0.55}s;
        animation-duration:${5 + Math.random() * 4}s;
        font-size:${1 + Math.random() * 1.5}rem;`;
      wrap.appendChild(el);
    });
  }
}

/* ══════════════════════════════════════════════════════════
   REGISTRATION PAGE
   ══════════════════════════════════════════════════════════ */
function openRegister(classId) {
  const cls = QuestionsDB.getClass(classId); if (!cls) return;

  const badge = document.getElementById('class-badge-reg');
  if (badge) { badge.textContent = cls.emoji + ' ' + cls.name; badge.style.background = cls.color; }

  // Generate fresh sound-image captcha
  CaptchaManager.reset();

  // Clear fields + errors
  ['reg-name', 'reg-dob'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  ['name-error', 'dob-error', 'cap-error'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  });

  // Step state
  document.getElementById('step-captcha').style.display = 'none';
  document.getElementById('btn-reg-submit').style.display = 'none';
  document.getElementById('btn-next-step').style.display = 'inline-flex';

  showPage('register');
}

function initRegister() {
  // Name validation: letters only
  const nameInput = document.getElementById('reg-name');
  if (nameInput) Validation.nameOnly(nameInput);

  // Step 1 → Step 2 (Name + DOB → Captcha)
  const btnStep = document.getElementById('btn-next-step');
  if (btnStep) {
    btnStep.addEventListener('click', () => {
      const name = document.getElementById('reg-name').value;
      const dob = document.getElementById('reg-dob').value;
      let ok = true;

      Validation.clearError(document.getElementById('name-error'));
      Validation.clearError(document.getElementById('dob-error'));

      if (!Validation.isValidName(name)) {
        Validation.showError(document.getElementById('name-error'), I18n.t('nameErr'));
        ok = false;
      }
      if (!Validation.isValidDOB(dob)) {
        Validation.showError(document.getElementById('dob-error'), I18n.t('dobErr'));
        ok = false;
      }
      if (!ok) { SFX.wrong(); return; }

      // Success – move to captcha
      SFX.regSuccess();
      State.student.name = name.trim();
      State.student.dob = dob;

      // Re-render captcha in case language changed
      CaptchaManager.reset();

      document.getElementById('step-captcha').style.display = 'block';
      document.getElementById('step-captcha').classList.add('slide-in');
      document.getElementById('btn-next-step').style.display = 'none';
      document.getElementById('btn-reg-submit').style.display = 'inline-flex';
    });
  }

  // Submit (captcha check)
  const btnSubmit = document.getElementById('btn-reg-submit');
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      Validation.clearError(document.getElementById('cap-error'));

      if (!CaptchaManager.isValidated()) {
        Validation.showError(document.getElementById('cap-error'), I18n.t('captchaErr'));
        CaptchaManager.reset();  // new captcha on failure
        SFX.wrong();
        return;
      }
      SFX.correct();
      openTaskSelect(State.currentClass);
    });
  }

  // Back button
  document.getElementById('back-to-home')?.addEventListener('click', () => { SFX.click(); showPage('home'); });

  // Enter key on name field
  document.getElementById('reg-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('reg-dob')?.focus();
  });

  document.getElementById('reg-dob')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-next-step')?.click();
  });
}

/* ══════════════════════════════════════════════════════════
   TASK SELECT
   ══════════════════════════════════════════════════════════ */
function openTaskSelect(classId) {
  const cls = QuestionsDB.getClass(classId); if (!cls) return;
  document.getElementById('task-class-emoji').textContent = cls.emoji;
  document.getElementById('task-class-name').textContent = cls.name;
  document.getElementById('task-student-name').textContent = '👋 Hello, ' + State.student.name + '!';

  const grid = document.getElementById('task-cards-grid');
  grid.innerHTML = '';
  cls.tasks.forEach((task, i) => {
    const card = document.createElement('div');
    card.className = 'task-select-card';
    card.innerHTML = `<div class="task-num">${i + 1}</div>
      <div class="task-title">${task.title}</div>
      <div class="task-info">${I18n.t('taskInfo')}</div>`;
    card.style.borderColor = cls.color + '88';
    card.addEventListener('click', () => { SFX.click(); startTask(classId, i); });
    card.addEventListener('mouseenter', () => SFX.click());
    grid.appendChild(card);
  });

  document.getElementById('task-select-view').style.display = 'flex';
  document.getElementById('quiz-view').classList.remove('active');
  showPage('tasks');
}

/* ══════════════════════════════════════════════════════════
   QUIZ ENGINE
   ══════════════════════════════════════════════════════════ */
function startTask(classId, taskIdx) {
  const cls = QuestionsDB.getClass(classId);
  const task = QuestionsDB.getTask(classId, taskIdx);
  if (!cls || !task) return;

  State.currentClass = classId;
  State.currentTask = taskIdx;
  State.currentQ = 0;
  State.score = 0;
  State.answered = false;
  State.autoTimer = null;

  // Pre-shuffle all questions' options
  State.questions = task.questions.map(q => {
    const { shuffled, correctIndex } = QuestionsDB.shuffleOptions(q.options, q.answer);
    return { ...q, shuffledOptions: shuffled, correctIndex };
  });

  document.getElementById('quiz-class-label').textContent = cls.emoji + ' ' + cls.name;
  document.getElementById('quiz-task-label').textContent = 'Task ' + (taskIdx + 1);
  updateScoreBadge();

  document.getElementById('task-select-view').style.display = 'none';
  document.getElementById('quiz-view').classList.add('active');

  renderQuestion();
}

function updateScoreBadge() {
  const b = document.getElementById('score-badge');
  if (b) b.textContent = '⭐ ' + State.score + ' / ' + State.questions.length;
}

function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const pct = (State.currentQ / State.questions.length) * 100;
  if (fill) fill.style.width = Math.max(pct, 4) + '%';
  if (label) label.textContent = 'Q ' + (Math.min(State.currentQ + 1, State.questions.length)) + ' / ' + State.questions.length;
}

function renderQuestion() {
  Voice.stop();
  State.answered = false;
  if (State.autoTimer) { clearTimeout(State.autoTimer); State.autoTimer = null; }

  const q = State.questions[State.currentQ];
  if (!q) return;

  document.getElementById('question-num').textContent = 'Question ' + (State.currentQ + 1) + ' of ' + State.questions.length;
  document.getElementById('question-text').textContent = q.q;

  // Speaker button – robust voice reading fix
  const speakerBtn = document.getElementById('speaker-btn');
  if (speakerBtn) {
    speakerBtn.style.display = 'inline-flex';  // always show; browser will handle unsupported gracefully
    // Remove previous listeners by replacing element
    const fresh = speakerBtn.cloneNode(true);
    speakerBtn.parentNode.replaceChild(fresh, speakerBtn);
    fresh.addEventListener('click', () => {
      SFX.click();
      fresh.classList.add('tada');
      setTimeout(() => fresh.classList.remove('tada'), 500);
      Voice.speak(q.q);
    });
    // Also support touchstart for immediate mobile response
    fresh.addEventListener('touchstart', (e) => {
      e.preventDefault();
      SFX.click();
      fresh.classList.add('tada');
      setTimeout(() => fresh.classList.remove('tada'), 500);
      Voice.speak(q.q);
    }, { passive: false });
  }

  // Build options
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.shuffledOptions.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-letter', letters[i]);
    btn.dataset.value = opt;
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span class="opt-text">${opt}</span>`;
    btn.addEventListener('click', () => handleAnswer(btn, opt, q));
    grid.appendChild(btn);
  });

  // Animate card
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });

  updateProgress();
}

function handleAnswer(btn, selected, q) {
  if (State.answered) return;
  State.answered = true;
  SFX.click();

  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  const isCorrect = selected === q.answer;

  if (isCorrect) {
    btn.classList.add('correct');
    State.score++;
    SFX.correct();
    showFeedback(true);
  } else {
    btn.classList.add('wrong');
    SFX.wrong();
    showFeedback(false);
    // Highlight correct answer
    document.querySelectorAll('.option-btn').forEach(b => {
      if (b.dataset.value === q.answer) b.classList.add('correct');
    });
  }

  updateScoreBadge();
  updateProgress();

  // ── AUTO-ADVANCE after 1.4 seconds ──
  State.autoTimer = setTimeout(() => {
    State.currentQ++;
    if (State.currentQ >= State.questions.length) {
      showResult();
    } else {
      SFX.advance();
      renderQuestion();
    }
  }, 1400);
}

/* ══════════════════════════════════════════════════════════
   RESULT PAGE
   ══════════════════════════════════════════════════════════ */
function showResult() {
  Voice.stop();
  const cls = QuestionsDB.getClass(State.currentClass);
  const total = State.questions.length;
  const score = State.score;

  document.getElementById('result-score-num').innerHTML = '<span>' + score + '</span> / ' + total;
  document.getElementById('result-task-name').textContent = cls.emoji + ' ' + cls.name + ' – Task ' + (State.currentTask + 1);
  document.getElementById('result-student-name').textContent = '🎓 ' + State.student.name;
  document.getElementById('result-message').textContent = resultMsg(score, total);

  buildStars(score, total);

  const pct = (score / total) * 100;
  const trophy = pct === 100 ? '🏆' : pct >= 70 ? '🥇' : pct >= 50 ? '🥈' : '🎓';
  const te = document.getElementById('trophy-emoji');
  if (te) { te.textContent = trophy; te.style.animation = 'none'; requestAnimationFrame(() => { te.style.animation = ''; }); }

  showPage('result');
  setTimeout(() => { SFX.fanfare(); launchFireworks(); }, 350);
}

/* ══════════════════════════════════════════════════════════
   LANGUAGE SWITCHER
   ══════════════════════════════════════════════════════════ */
function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      SFX.click();
      const lang = btn.dataset.lang;
      I18n.setLang(lang);
      // If on register page, re-render captcha labels
      if (CaptchaManager && typeof CaptchaManager.renderCaptcha === 'function') {
        CaptchaManager.renderCaptcha();
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   BOOTSTRAP
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {

  // Loader
  const loader = document.getElementById('loading-screen');
  await QuestionsDB.load();
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 500);
  }, 1100);

  document.body.classList.add('ready');

  // Init i18n first (applies translations)
  I18n.init();

  initHome();
  initRegister();
  initLangSwitcher();

  // Hamburger
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('nav-links');
  if (ham && nav) {
    ham.addEventListener('click', () => { SFX.click(); nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Nav class links
  document.querySelectorAll('[data-nav-class]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); SFX.click();
      State.currentClass = link.dataset.navClass;
      openRegister(link.dataset.navClass);
    });
  });

  // Task page – back from quiz
  document.getElementById('back-from-quiz')?.addEventListener('click', () => {
    SFX.click();
    Voice.stop();
    if (State.autoTimer) { clearTimeout(State.autoTimer); State.autoTimer = null; }
    document.getElementById('task-select-view').style.display = 'flex';
    document.getElementById('quiz-view').classList.remove('active');
  });

  document.getElementById('back-from-tasks')?.addEventListener('click', () => {
    SFX.click();
    showPage('home');
  });

  // Result buttons
  document.getElementById('btn-retry')?.addEventListener('click', () => {
    SFX.click(); startTask(State.currentClass, State.currentTask); showPage('tasks');
  });
  document.getElementById('btn-next-task')?.addEventListener('click', () => {
    SFX.click();
    const cls = QuestionsDB.getClass(State.currentClass);
    const next = State.currentTask + 1;
    if (cls && next < cls.tasks.length) { startTask(State.currentClass, next); showPage('tasks'); }
    else openTaskSelect(State.currentClass);
  });
  document.getElementById('btn-home-result')?.addEventListener('click', () => {
    SFX.click(); showPage('home');
  });

  showPage('home');
});
