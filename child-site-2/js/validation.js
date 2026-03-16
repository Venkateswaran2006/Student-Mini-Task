/* ============================================================
   validation.js – Form validation helpers
   ============================================================ */

const Validation = (() => {

  /** Allow only letters + spaces in name fields */
  function nameOnly(input) {
    input.addEventListener('input', () => {
      const filtered = input.value.replace(/[^a-zA-Z\s]/g, '');
      if (input.value !== filtered) {
        input.value = filtered;
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
      }
    });
  }

  /** Return true if name is valid (2+ letters, no numbers/symbols) */
  function isValidName(value) {
    return /^[a-zA-Z\s]{2,}$/.test(value.trim());
  }

  /** Return true if DOB is filled */
  function isValidDOB(value) {
    return value.trim().length > 0;
  }

  /** Show field error */
  function showError(el, msg) {
    el.textContent = msg;
    el.style.display = 'block';
    el.classList.add('pop-in');
    setTimeout(() => el.classList.remove('pop-in'), 300);
  }

  /** Clear field error */
  function clearError(el) {
    el.textContent = '';
    el.style.display = 'none';
  }

  return { nameOnly, isValidName, isValidDOB, showError, clearError };
})();
