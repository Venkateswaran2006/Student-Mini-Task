/* ============================================================
   questions.js – Data loader + shuffle helper
   ============================================================ */

const QuestionsDB = (() => {
  let _data = null;

  async function load() {
    if (_data) return _data;
    const res = await fetch('./data/questions.json');
    _data = await res.json();
    return _data;
  }

  function getClasses()        { return _data ? _data.classes : []; }
  function getClass(id)        { return _data ? _data.classes.find(c => c.id === id) || null : null; }
  function getTask(cid, tIdx)  { const c = getClass(cid); return c ? c.tasks[tIdx] || null : null; }

  /**
   * Shuffle options while tracking where the correct answer lands.
   * Returns { shuffled: [...], correctIndex: N }
   */
  function shuffleOptions(options, answer) {
    const arr = options.map((opt, i) => ({ opt, orig: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const correctIndex = arr.findIndex(x => x.opt === answer);
    return { shuffled: arr.map(x => x.opt), correctIndex };
  }

  return { load, getClasses, getClass, getTask, shuffleOptions };
})();
