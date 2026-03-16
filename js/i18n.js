/* ============================================================
   i18n.js – BrightMinds Multi-Language Support
   Languages: English (en), Tamil (ta), Hindi (hi)
   ============================================================ */
'use strict';

const I18n = (() => {
  let _lang = 'en';

  const translations = {
    en: {
      /* Loader */
      loaderText: 'BrightMinds Learning',
      /* Navbar */
      navLKG: '🌟 LKG', nav1st: '🌈 1st', nav2nd: '🦋 2nd',
      nav3rd: '🚀 3rd', nav4th: '⚡ 4th', nav5th: '🏆 5th',
      /* Home */
      homeTitle: 'BrightMinds Learning',
      homeSubtitle: '🎓 Fun Learning For Every Child! 🎓',
      homeDesc: 'Welcome to BrightMinds! 🌟<br>Complete exciting tasks, answer fun questions, earn stars ⭐, and become a champion learner!<br><strong>Choose your class below to start your adventure! 🚀</strong>',
      homeFooterNote: '📚 5 Tasks × 10 Questions per Class &nbsp;•&nbsp; ⭐ Earn Stars &nbsp;•&nbsp; 🎉 Celebrate &nbsp;•&nbsp; 🔊 Voice Support',
      cardLKG: 'LKG', card1st: '1st Std', card2nd: '2nd Std',
      card3rd: '3rd Std', card4th: '4th Std', card5th: '5th Std',
      /* Footer */
      footerBy: '❤️ Created by ',
      footerName: 'Venkatesh',
      footerSite: 'BrightMinds Learning',
      footerRange: 'LKG – 5th Standard',
      /* Register */
      regTitle: "Let's Get Started!",
      regSubtitle: 'Fill in your details to begin the adventure',
      step1Label: '📋 Step 1 – Your Details',
      nameLabel: '👤 Your Name',
      nameSmall: '(letters only)',
      namePlaceholder: 'e.g. Riya Sharma',
      dobLabel: '🎂 Date of Birth',
      btnNextStep: '➡️ Next – Solve Captcha',
      step2Label: '🔐 Step 2 – Prove You\'re Human!',
      captchaLabel: '🔊 Listen & Choose the correct picture:',
      captchaHint: '💡 Click the speaker to hear a sound, then click the matching image!',
      btnSubmit: '🚀 Start Learning!',
      btnBackHome: '← Back to Home',
      nameErr: '⚠️ Name must contain letters only (min 2 characters)!',
      dobErr: '⚠️ Please enter your Date of Birth!',
      captchaErr: '⚠️ Wrong choice! Listen again and click the correct image.',
      /* Tasks page */
      taskSubtitle: 'Tap a task to begin your learning adventure!',
      taskInfo: '📝 10 Questions',
      btnBackTasks: '← Back to Home',
      btnBackQuiz: '← Back to Tasks',
      /* Quiz */
      progressLabel: '📈 Progress',
      /* Result */
      resultSubtitle: 'You completed the task! Here\'s your score:',
      scoreLabel: 'Your Score',
      btnRetry: '🔄 Try Again',
      btnNextTask: '▶️ Next Task',
      btnHome: '🏠 Home',
      /* Feedback messages */
      okMsgs: ['⭐ Correct!','🎉 Awesome!','👏 Brilliant!','🌟 Great!','💯 Perfect!'],
      badMsgs: ['❌ Oops!','😅 Try again!','❌ Wrong!','😬 Not quite!','💪 Keep going!'],
      /* Result messages */
      res100: '🏆 Perfect Score! You are a Genius!',
      res90: '🌟 Outstanding! Absolutely Amazing!',
      res70: '🎉 Great Work! Keep it Up!',
      res50: '👍 Good Effort! Practice Makes Perfect!',
      res30: '💪 Keep Trying! You Can Do It!',
      resLow: '😊 Don\'t Give Up! Try Again!',
    },

    ta: {
      /* Loader */
      loaderText: 'BrightMinds கல்வி',
      /* Navbar */
      navLKG: '🌟 LKG', nav1st: '🌈 1வது', nav2nd: '🦋 2வது',
      nav3rd: '🚀 3வது', nav4th: '⚡ 4வது', nav5th: '🏆 5வது',
      /* Home */
      homeTitle: 'BrightMinds கல்வி',
      homeSubtitle: '🎓 ஒவ்வொரு குழந்தைக்கும் வேடிக்கையான கல்வி! 🎓',
      homeDesc: 'BrightMinds-க்கு வரவேற்கிறோம்! 🌟<br>சுவாரஸ்யமான பணிகளை முடிக்கவும், கேள்விகளுக்கு பதிலளிக்கவும், நட்சத்திரங்கள் ⭐ பெறவும், சாம்பியன் மாணவராக மாறவும்!<br><strong>உங்கள் வகுப்பை தேர்ந்தெடுக்கவும்! 🚀</strong>',
      homeFooterNote: '📚 5 பணிகள் × 10 கேள்விகள் &nbsp;•&nbsp; ⭐ நட்சத்திரங்கள் &nbsp;•&nbsp; 🎉 கொண்டாட்டம் &nbsp;•&nbsp; 🔊 குரல் ஆதரவு',
      cardLKG: 'LKG', card1st: '1வது', card2nd: '2வது',
      card3rd: '3வது', card4th: '4வது', card5th: '5வது',
      /* Footer */
      footerBy: '❤️ உருவாக்கியவர் ',
      footerName: 'Venkatesh',
      footerSite: 'BrightMinds கல்வி',
      footerRange: 'LKG – 5வது வகுப்பு',
      /* Register */
      regTitle: 'தொடங்கலாம்!',
      regSubtitle: 'உங்கள் விவரங்களை நிரப்பி ச冒険ஐ தொடங்குங்கள்',
      step1Label: '📋 படி 1 – உங்கள் விவரங்கள்',
      nameLabel: '👤 உங்கள் பெயர்',
      nameSmall: '(எழுத்துக்கள் மட்டும்)',
      namePlaceholder: 'எ.கா. ரியா சர்மா',
      dobLabel: '🎂 பிறந்த தேதி',
      btnNextStep: '➡️ அடுத்தது – கேப்ட்சா',
      step2Label: '🔐 படி 2 – நீங்கள் மனிதர் என்று நிரூபிக்கவும்!',
      captchaLabel: '🔊 கேளுங்கள் & சரியான படத்தை தேர்ந்தெடுக்கவும்:',
      captchaHint: '💡 ஒலியை கேட்க ஸ்பீக்கர் ஐகானை அழுத்தவும், பிறகு பொருத்தமான படத்தை கிளிக் செய்யவும்!',
      btnSubmit: '🚀 கற்றல் தொடங்கு!',
      btnBackHome: '← முகப்பிற்கு திரும்பு',
      nameErr: '⚠️ பெயரில் எழுத்துக்கள் மட்டுமே இருக்க வேண்டும் (குறைந்தது 2)!',
      dobErr: '⚠️ உங்கள் பிறந்த தேதியை உள்ளிடவும்!',
      captchaErr: '⚠️ தவறான தேர்வு! மீண்டும் கேட்டு சரியான படத்தை தேர்ந்தெடுக்கவும்.',
      /* Tasks page */
      taskSubtitle: 'உங்கள் கற்றல் சாகசத்தை தொடங்க ஒரு பணியை தட்டவும்!',
      taskInfo: '📝 10 கேள்விகள்',
      btnBackTasks: '← முகப்பிற்கு திரும்பு',
      btnBackQuiz: '← பணிகளுக்கு திரும்பு',
      /* Quiz */
      progressLabel: '📈 முன்னேற்றம்',
      /* Result */
      resultSubtitle: 'நீங்கள் பணியை முடித்தீர்கள்! உங்கள் மதிப்பெண்:',
      scoreLabel: 'உங்கள் மதிப்பெண்',
      btnRetry: '🔄 மீண்டும் முயற்சி',
      btnNextTask: '▶️ அடுத்த பணி',
      btnHome: '🏠 முகப்பு',
      /* Feedback */
      okMsgs: ['⭐ சரி!','🎉 அருமை!','👏 மிகவும் நன்று!','🌟 கலக்கல்!','💯 சரியான பதில்!'],
      badMsgs: ['❌ தவறு!','😅 மீண்டும் முயற்சி!','❌ தவறான பதில்!','😬 சரியில்லை!','💪 தொடர்ந்து முயற்சி!'],
      /* Result messages */
      res100: '🏆 சரியான மதிப்பெண்! நீங்கள் மேதை!',
      res90: '🌟 அருமை! மிகவும் நன்று!',
      res70: '🎉 சிறப்பான வேலை! தொடர்ந்து செய்!',
      res50: '👍 நல்ல முயற்சி! பயிற்சி சரியானதை செய்யும்!',
      res30: '💪 தொடர்ந்து முயற்சி! உனக்கு முடியும்!',
      resLow: '😊 விட்டுவிடாதே! மீண்டும் முயற்சி!',
    },

    hi: {
      /* Loader */
      loaderText: 'BrightMinds सीखना',
      /* Navbar */
      navLKG: '🌟 LKG', nav1st: '🌈 1ली', nav2nd: '🦋 2री',
      nav3rd: '🚀 3री', nav4th: '⚡ 4थी', nav5th: '🏆 5वीं',
      /* Home */
      homeTitle: 'BrightMinds सीखना',
      homeSubtitle: '🎓 हर बच्चे के लिए मज़ेदार सीखना! 🎓',
      homeDesc: 'BrightMinds में आपका स्वागत है! 🌟<br>रोमांचक कार्य पूरे करें, मज़ेदार सवालों के जवाब दें, तारे ⭐ कमाएँ और चैंपियन सीखने वाले बनें!<br><strong>नीचे अपनी कक्षा चुनें और अपना साहसिक कार्य शुरू करें! 🚀</strong>',
      homeFooterNote: '📚 5 कार्य × 10 प्रश्न &nbsp;•&nbsp; ⭐ तारे कमाएँ &nbsp;•&nbsp; 🎉 जश्न मनाएँ &nbsp;•&nbsp; 🔊 आवाज़ सहायता',
      cardLKG: 'LKG', card1st: '1ली', card2nd: '2री',
      card3rd: '3री', card4th: '4थी', card5th: '5वीं',
      /* Footer */
      footerBy: '❤️ निर्मित: ',
      footerName: 'Venkatesh',
      footerSite: 'BrightMinds सीखना',
      footerRange: 'LKG – 5वीं कक्षा',
      /* Register */
      regTitle: 'शुरू करते हैं!',
      regSubtitle: 'अपना साहसिक कार्य शुरू करने के लिए विवरण भरें',
      step1Label: '📋 चरण 1 – आपकी जानकारी',
      nameLabel: '👤 आपका नाम',
      nameSmall: '(केवल अक्षर)',
      namePlaceholder: 'जैसे: राहुल शर्मा',
      dobLabel: '🎂 जन्म तिथि',
      btnNextStep: '➡️ अगला – कैप्चा हल करें',
      step2Label: '🔐 चरण 2 – सिद्ध करें कि आप इंसान हैं!',
      captchaLabel: '🔊 सुनें और सही तस्वीर चुनें:',
      captchaHint: '💡 आवाज़ सुनने के लिए स्पीकर पर क्लिक करें, फिर सही तस्वीर पर क्लिक करें!',
      btnSubmit: '🚀 सीखना शुरू करें!',
      btnBackHome: '← होम पर वापस',
      nameErr: '⚠️ नाम में केवल अक्षर होने चाहिए (कम से कम 2)!',
      dobErr: '⚠️ कृपया अपनी जन्म तिथि दर्ज करें!',
      captchaErr: '⚠️ गलत चुनाव! फिर से सुनें और सही तस्वीर चुनें।',
      /* Tasks page */
      taskSubtitle: 'अपना सीखने का साहसिक कार्य शुरू करने के लिए एक काम चुनें!',
      taskInfo: '📝 10 प्रश्न',
      btnBackTasks: '← होम पर वापस',
      btnBackQuiz: '← कार्यों पर वापस',
      /* Quiz */
      progressLabel: '📈 प्रगति',
      /* Result */
      resultSubtitle: 'आपने कार्य पूरा किया! आपका स्कोर:',
      scoreLabel: 'आपका स्कोर',
      btnRetry: '🔄 फिर से कोशिश',
      btnNextTask: '▶️ अगला कार्य',
      btnHome: '🏠 होम',
      /* Feedback */
      okMsgs: ['⭐ सही!','🎉 शानदार!','👏 बहुत बढ़िया!','🌟 कमाल!','💯 एकदम सही!'],
      badMsgs: ['❌ गलत!','😅 फिर कोशिश करें!','❌ गलत जवाब!','😬 सही नहीं!','💪 कोशिश जारी रखें!'],
      /* Result messages */
      res100: '🏆 पूर्ण अंक! आप प्रतिभाशाली हैं!',
      res90: '🌟 शानदार! बिल्कुल अद्भुत!',
      res70: '🎉 बढ़िया काम! ऐसे ही करते रहें!',
      res50: '👍 अच्छा प्रयास! अभ्यास से सफलता मिलती है!',
      res30: '💪 कोशिश करते रहो! तुम कर सकते हो!',
      resLow: '😊 हार मत मानो! फिर कोशिश करो!',
    }
  };

  function setLang(lang) {
    if (!translations[lang]) return;
    _lang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem('bm_lang', lang); } catch(e){}
    applyTranslations();
    updateLangButtons();
  }

  function t(key) {
    return (translations[_lang] && translations[_lang][key] !== undefined)
      ? translations[_lang][key]
      : (translations['en'][key] || key);
  }

  function getLang() { return _lang; }

  function applyTranslations() {
    // Helper
    const set = (id, val, html = false) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (html) el.innerHTML = val; else el.textContent = val;
    };
    const setAttr = (id, attr, val) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute(attr, val);
    };
    const setAll = (sel, val) => {
      document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
    };

    /* Loader */
    set('loader-text', t('loaderText'));

    /* Navbar class links */
    const navKeys = ['navLKG','nav1st','nav2nd','nav3rd','nav4th','nav5th'];
    document.querySelectorAll('[data-nav-class]').forEach((link, i) => {
      if (navKeys[i]) link.innerHTML = t(navKeys[i]);
    });

    /* Home page */
    set('home-title', t('homeTitle'));
    set('home-subtitle', t('homeSubtitle'));
    set('home-desc', t('homeDesc'), true);
    set('home-footer-note', t('homeFooterNote'), true);

    /* Class card names */
    const cardKeys = ['cardLKG','card1st','card2nd','card3rd','card4th','card5th'];
    document.querySelectorAll('.class-card .card-name').forEach((el, i) => {
      if (cardKeys[i]) el.textContent = t(cardKeys[i]);
    });

    /* Footer texts */
    document.querySelectorAll('.footer-by').forEach(el => { el.textContent = t('footerBy'); });
    document.querySelectorAll('.footer-name').forEach(el => { el.textContent = t('footerName'); });
    document.querySelectorAll('.footer-site').forEach(el => { el.textContent = t('footerSite'); });
    document.querySelectorAll('.footer-range').forEach(el => { el.textContent = t('footerRange'); });

    /* Register page */
    set('reg-title', t('regTitle'));
    set('reg-subtitle', t('regSubtitle'));
    set('step1-label', t('step1Label'));
    set('name-label-text', t('nameLabel'));
    set('name-label-small', t('nameSmall'));
    setAttr('reg-name', 'placeholder', t('namePlaceholder'));
    set('dob-label-text', t('dobLabel'));
    set('btn-next-step', t('btnNextStep'));
    set('step2-label', t('step2Label'));
    set('captcha-label', t('captchaLabel'));
    set('captcha-hint', t('captchaHint'));
    set('btn-reg-submit', t('btnSubmit'));
    set('back-to-home', t('btnBackHome'));

    /* Tasks page */
    const taskSub = document.getElementById('task-subtitle');
    if (taskSub) taskSub.textContent = t('taskSubtitle');
    document.querySelectorAll('.task-info').forEach(el => { el.textContent = t('taskInfo'); });
    set('back-from-tasks', t('btnBackTasks'));
    set('back-from-quiz', t('btnBackQuiz'));

    /* Quiz progress label */
    document.querySelectorAll('.progress-label-text').forEach(el => {
      el.textContent = t('progressLabel');
    });

    /* Result page */
    set('result-subtitle', t('resultSubtitle'));
    set('score-label', t('scoreLabel'));
    set('btn-retry', t('btnRetry'));
    set('btn-next-task', t('btnNextTask'));
    set('btn-home-result', t('btnHome'));
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active-lang', btn.dataset.lang === _lang);
    });
  }

  function init() {
    // Restore saved language
    try {
      const saved = localStorage.getItem('bm_lang');
      if (saved && translations[saved]) _lang = saved;
    } catch(e){}
    applyTranslations();
    updateLangButtons();
  }

  return { t, setLang, getLang, init, applyTranslations };
})();
