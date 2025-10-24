// @ts-nocheck
(function(){
  const DEFAULT_LANG = 'ru';
  const SUPPORTED = ['ru','en'];
  let currentLang = localStorage.getItem('vas3kland_lang') || DEFAULT_LANG;
  if (!SUPPORTED.includes(currentLang)) currentLang = DEFAULT_LANG;

  function setHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((o,k)=> (o && k in o) ? o[k] : undefined, obj);
  }

  function applyTranslations(dict) {
    // Elements with data-i18n text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = getByPath(dict, key);
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });
    // Attribute bindings: data-i18n-attr="attr:key.path"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      const pairs = spec.split(';').map(s=>s.trim()).filter(Boolean);
      pairs.forEach(pair => {
        const parts = pair.split(':');
        const attr = parts[0];
        const key = parts[1];
        if (!attr || !key) return;
        const val = getByPath(dict, key);
        if (typeof val === 'string') el.setAttribute(attr, val);
      });
    });

    // Dynamic lists
    const principles = (dict && dict.principles && Array.isArray(dict.principles.items)) ? dict.principles.items : [];
    const pl = document.getElementById('principles-list');
    if (pl) {
      pl.innerHTML = '';
      principles.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        pl.appendChild(li);
      });
    }

    const faq = (dict && dict.faq && Array.isArray(dict.faq.items)) ? dict.faq.items : [];
    const faqList = document.getElementById('faq-list');
    if (faqList) {
      faqList.innerHTML = '';
      faq.forEach((i) => {
        const div = document.createElement('div');
        div.className = 'item';
        const q = document.createElement('div'); q.className = 'q'; q.textContent = i.q;
        const a = document.createElement('div'); a.className = 'a'; a.textContent = i.a;
        div.appendChild(q); div.appendChild(a);
        faqList.appendChild(div);
      });
    }

    // Memes list
    const memes = (dict && dict.memes && Array.isArray(dict.memes.items)) ? dict.memes.items : [];
    const ml = document.getElementById('memes-list');
    if (ml) {
      ml.innerHTML = '';
      memes.forEach((m) => {
        const li = document.createElement('li');
        li.textContent = m;
        ml.appendChild(li);
      });
    }

    // Document title and meta description
    if (dict.meta?.title) document.title = dict.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta?.description) metaDesc.setAttribute('content', dict.meta.description);
  }

  async function loadLang(lang) {
    const res = await fetch(`i18n/${lang}.json`);
    if (!res.ok) throw new Error('Failed to load language');
    const dict = await res.json();
    applyTranslations(dict);
    setHtmlLang(lang);
    localStorage.setItem('vas3kland_lang', lang);
    currentLang = lang;
  }

  function initLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        loadLang(lang).catch(console.error);
      });
    });
  }

  // Initialize
  initLangButtons();
  loadLang(currentLang).catch(console.error);
})();
