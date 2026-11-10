/* =========================================================
   Bilingual language toggle (EN default / 中文)
   Short UI strings use data-en / data-zh attributes.
   Long blocks use .lang-en / .lang-zh wrappers (CSS toggled).
   ========================================================= */
(function () {
  var STORE_KEY = 'fogbubble_lang';

  function getStored() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }

  function applyLang(lang) {
    var root = document.documentElement;
    if (lang === 'zh') {
      root.lang = 'zh-CN';
      root.classList.add('lang-zh');
    } else {
      root.lang = 'en';
      root.classList.remove('lang-zh');
    }

    // Short strings: swap textContent / alt / placeholder
    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var en = el.getAttribute('data-en');
      var zh = el.getAttribute('data-zh');
      var val = (lang === 'zh') ? (zh !== null ? zh : en) : (en !== null ? en : zh);
      if (el.tagName === 'IMG') {
        el.alt = val || el.alt;
      } else if (el.hasAttribute('data-placeholder')) {
        el.setAttribute('placeholder', val || '');
      } else {
        el.textContent = val || '';
      }
    }

    // Document title
    var t = document.querySelector('title[data-en]');
    if (t) {
      document.title = (lang === 'zh')
        ? (t.getAttribute('data-zh') || '')
        : (t.getAttribute('data-en') || '');
    }

    // Meta description
    var m = document.querySelector('meta[name="description"][data-en]');
    if (m) {
      m.setAttribute('content', (lang === 'zh')
        ? (m.getAttribute('data-zh') || '')
        : (m.getAttribute('data-en') || ''));
    }

    // Toggle button label
    var tog = document.querySelector('[data-lang-toggle]');
    if (tog) tog.textContent = (lang === 'zh') ? 'EN' : '中文';

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  window.applyLang = applyLang;
  window.toggleLang = function () {
    applyLang(getStored() === 'zh' ? 'en' : 'zh');
  };

  document.addEventListener('DOMContentLoaded', function () {
    var tog = document.querySelector('[data-lang-toggle]');
    if (tog) tog.addEventListener('click', window.toggleLang);
    applyLang(getStored() === 'zh' ? 'zh' : 'en');
  });
})();
