/* ============================================================
   captcha.js – Sound-based Image Captcha for Children
   Replaces math captcha. Plays an animal sound; child clicks
   the matching animal image to proceed.
   ============================================================ */
'use strict';

const CaptchaManager = (() => {

  // Sound + animal pool
  const ANIMALS = [
    {
      id: 'dog',
      labelEn: 'Dog', labelTa: 'நாய்', labelHi: 'कुत्ता',
      emoji: '🐕', col: '#f9ca24',
      /* Web Audio: rough dog-bark pattern */
      playSound: (ctx) => {
        const bark = (t) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'sawtooth';
          o.frequency.setValueAtTime(280, t);
          o.frequency.exponentialRampToValueAtTime(120, t + 0.12);
          g.gain.setValueAtTime(0.35, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          o.start(t); o.stop(t + 0.15);
        };
        const n = ctx.currentTime;
        bark(n); bark(n + 0.22); bark(n + 0.44);
      }
    },
    {
      id: 'cat',
      labelEn: 'Cat', labelTa: 'பூனை', labelHi: 'बिल्ली',
      emoji: '🐱', col: '#fd79a8',
      /* Cat meow – smooth sine wavering */
      playSound: (ctx) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine';
        const t = ctx.currentTime;
        o.frequency.setValueAtTime(480, t);
        o.frequency.linearRampToValueAtTime(540, t + 0.18);
        o.frequency.linearRampToValueAtTime(400, t + 0.55);
        g.gain.setValueAtTime(0.28, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        o.start(t); o.stop(t + 0.65);
      }
    },
    {
      id: 'cow',
      labelEn: 'Cow', labelTa: 'பசு', labelHi: 'गाय',
      emoji: '🐄', col: '#26de81',
      /* Cow moo – low, long oscillator sweep */
      playSound: (ctx) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine';
        const t = ctx.currentTime;
        o.frequency.setValueAtTime(130, t);
        o.frequency.linearRampToValueAtTime(155, t + 0.3);
        o.frequency.linearRampToValueAtTime(120, t + 0.9);
        g.gain.setValueAtTime(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
        o.start(t); o.stop(t + 1.05);
      }
    },
    {
      id: 'bird',
      labelEn: 'Bird', labelTa: 'பறவை', labelHi: 'पक्षी',
      emoji: '🐦', col: '#74b9ff',
      /* Bird chirp – rapid FM-style tones */
      playSound: (ctx) => {
        const chirp = (t, freq) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, t);
          o.frequency.linearRampToValueAtTime(freq * 1.4, t + 0.07);
          g.gain.setValueAtTime(0.22, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
          o.start(t); o.stop(t + 0.1);
        };
        const n = ctx.currentTime;
        chirp(n, 1200); chirp(n + 0.13, 1400); chirp(n + 0.26, 1300);
        chirp(n + 0.44, 1500); chirp(n + 0.57, 1200);
      }
    },
    {
      id: 'frog',
      labelEn: 'Frog', labelTa: 'தவளை', labelHi: 'मेंढक',
      emoji: '🐸', col: '#6c5ce7',
      /* Frog ribbit – crunchy square bursts */
      playSound: (ctx) => {
        const rib = (t) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'square';
          o.frequency.setValueAtTime(200, t);
          o.frequency.linearRampToValueAtTime(160, t + 0.18);
          g.gain.setValueAtTime(0.18, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          o.start(t); o.stop(t + 0.22);
        };
        const n = ctx.currentTime;
        rib(n); rib(n + 0.32);
      }
    }
  ];

  let _ctx = null;
  let _correct = null;         // correct animal object
  let _options = [];           // 3 animal objects shown as options
  let _validated = false;

  function _getCtx() {
    if (!_ctx) {
      try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { }
    }
    // Resume in case it's suspended (mobile)
    if (_ctx && _ctx.state === 'suspended') { _ctx.resume(); }
    return _ctx;
  }

  /** Pick a new captcha: one correct animal + 2 distractors */
  function generate() {
    _validated = false;
    const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);
    _correct = shuffled[0];
    _options = shuffled.slice(0, 3); // includes correct at some index
    renderCaptcha();
  }

  /** Play the animal sound for the current captcha */
  function playSound() {
    const ctx = _getCtx();
    if (!ctx || !_correct) return;
    try { _correct.playSound(ctx); } catch (e) { }
  }

  /** Validate that the user picked the correct animal */
  function validate(animalId) {
    return animalId === _correct.id;
  }

  function isValidated() { return _validated; }

  function getCorrect() { return _correct; }

  /** Render the captcha UI into #captcha-area */
  function renderCaptcha() {
    const area = document.getElementById('captcha-area');
    if (!area) return;

    // Get current language label
    const lang = (typeof I18n !== 'undefined') ? I18n.getLang() : 'en';
    const labelKey = lang === 'ta' ? 'labelTa' : lang === 'hi' ? 'labelHi' : 'labelEn';

    area.innerHTML = `
      <div class="captcha-sound-row">
        <button class="captcha-speaker-btn" id="captcha-speaker-btn" title="Play sound" aria-label="Play animal sound">
          🔊
        </button>
        <div class="captcha-sound-hint" id="captcha-sound-hint"></div>
      </div>
      <div class="captcha-img-grid" id="captcha-img-grid">
        ${_options.map(a => `
          <button class="captcha-img-btn" data-animal="${a.id}"
                  aria-label="${a[labelKey]}"
                  style="--ac:${a.col}">
            <span class="captcha-animal-emoji">${a.emoji}</span>
            <span class="captcha-animal-label">${a[labelKey]}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Speaker button
    const spkBtn = document.getElementById('captcha-speaker-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', () => {
        playSound();
        spkBtn.classList.add('captcha-playing');
        setTimeout(() => spkBtn.classList.remove('captcha-playing'), 700);
      });
    }

    // Image buttons
    area.querySelectorAll('.captcha-img-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_validated) return;
        const chosen = btn.dataset.animal;
        if (validate(chosen)) {
          _validated = true;
          btn.classList.add('captcha-correct');
          // Disable all buttons
          area.querySelectorAll('.captcha-img-btn').forEach(b => b.disabled = true);
          // Show success hint
          const hint = document.getElementById('captcha-sound-hint');
          if (hint) hint.textContent = '✅';
        } else {
          btn.classList.add('captcha-wrong');
          setTimeout(() => btn.classList.remove('captcha-wrong'), 600);
          // Flash speaker to encourage replaying
          if (spkBtn) {
            spkBtn.classList.add('captcha-playing');
            setTimeout(() => spkBtn.classList.remove('captcha-playing'), 600);
          }
        }
      });
    });
  }

  /** Reset validated state (called when opening register page) */
  function reset() {
    _validated = false;
    generate();
  }

  return { generate, playSound, validate, isValidated, getCorrect, reset, renderCaptcha };
})();
