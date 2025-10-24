// @ts-nocheck
(function(){
  // Visit counter using localStorage
  const COUNTER_KEY = 'vas3kland_counter';
  const el = document.getElementById('hit-counter');
  const n = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10) + 1;
  localStorage.setItem(COUNTER_KEY, String(n));
  if (el) el.textContent = String(n);

  // Citizenship form playful confirmation
  /** @type {HTMLFormElement|null} */
  const form = document.getElementById('citizenship-form') instanceof HTMLFormElement
    ? document.getElementById('citizenship-form')
    : null;
  /** @type {HTMLElement|null} */
  const result = document.getElementById('citizenship-result');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form) return;
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const reason = (fd.get('reason') || '').toString().trim();
    if (!name || !reason) return;
    const lang = document.documentElement.lang || 'ru';
    const okText = lang === 'ru'
      ? `Заявка одобрена. ${name}, вам присвоено гражданство Вастрилэнда. Основание: «${reason}». Электронное подтверждение сформировано.`
      : `Application approved. ${name}, you have been granted Vas3kland citizenship. Basis: “${reason}”. Electronic confirmation has been issued.`;
    if (result) {
      result.textContent = okText;
      result.hidden = false;
    }
    form.reset();
  });

  // Retro/party mode toggle
  const retroBtn = document.getElementById('retro-toggle');
  const BODY = document.body;
  const updateRetroLabel = () => {
    const lang = document.documentElement.lang || 'ru';
    const on = BODY.classList.contains('retro');
    retroBtn && (retroBtn.textContent = on
      ? (lang === 'ru' ? 'Выключить ретро' : 'Disable retro')
      : (lang === 'ru' ? 'Включить ретро' : 'Enable retro'));
  };
  retroBtn?.addEventListener('click', () => {
    BODY.classList.toggle('retro');
    updateRetroLabel();
  });
  updateRetroLabel();
})();
