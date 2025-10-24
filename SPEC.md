# Спецификация сайта «Вастрилэнд / Vas3kland»

Этот документ фиксирует цели, требования, вопросы и техническую спецификацию перед разработкой. Версия: 0.1 (черновик).

## Цели
- Создать официальный информационный сайт страны Вастрилэнд, основанной экспедицией сообщества vas3k.club во время визита в Либерлэнд (граница Сербии и Хорватии).
- Визуально отдать дань стилю раннего интернета и/или официальных «гос-сайтов», сохранив серьёзный публичный тон.
- Поддержать два языка: русский и английский.

## Аудитория
- Участники и читатели vas3k.club, знакомые с контекстом.
- Любители интернет-артефактов и меметики «раннего веба».
- Случайные посетители, которым нужна краткая справка о «стране» и источниках.

## Источники и оригинальность
- Вдохновляющий материал: пост и тред vas3k.club — https://vas3k.club/post/28654/
- О клубе: https://vas3k.club/docs/about/
- На сайте публикуются оригинальные тексты (не копипаст). Ссылки на первоисточник обязательны.

- Два языка: RU/EN, переключатель языка в интерфейсе, remember last choice.
- Шрифт: Comic Sans (или максимально близкий аналог, например Comic Neue). Фолбэки: 'Comic Sans MS', 'Comic Sans', 'Comic Neue', 'Chalkboard SE', cursive.
- Стиль: «гос-сайт/ранний веб» без прямых упоминаний шутливости в копирайте
  - Marquee-ленты, рамки, тени, градиенты, пиксельные иконки.
  - Небольшие анимации без перегруза.
  - Счетчик посещений (локально, без бэкенда).
- Контентные секции:
  1) Hero (флаг/эмблема, лозунг, CTA)
  2) О стране (About)
  3) История основания (Discovery Story)
  4) Принципы/«Конституция» (короткие пункты)
  5) Гражданство (игровая форма, «сертификат» на клиенте)
  6) Символика: флаг, эмблема, возможно карта-заглушка
  7) FAQ
  8) Ссылки (пост/тред vas3k.club), дисклеймер
- Адаптивность: базовая (мобильные ширины, крупные кликабельные элементы).
- Доступность: alt-тексты, lang-атрибут, контраст.
- SEO-минимум: title, description (динамически под язык), open graph базовый.

## Нефункциональные
- Технический стек: статический HTML/CSS/JS, без сборки.
- I18n: JSON словари + простой клиентский переключатель.
- Деплой: любой статика-хостинг (GH Pages/Cloudflare Pages/Netlify).

## Навигация и IA
- Одна страница (SPA без роутинга). Якоря в шапке.
- Переключатель RU/EN в шапке. Счетчик посещений в подвале.

## Контент (структура ключей i18n)
- hero.title, hero.subtitle, hero.cta
- about.title, about.text
- story.title, story.p1..pN
- principles.title, principles.items[]
- citizenship.title, citizenship.desc, citizenship.form.name, citizenship.form.reason, citizenship.form.submit, citizenship.success
- symbols.title, symbols.flag.title, symbols.emblem.title, symbols.map.title
- faq.title, faq.q1/a1 ...
- links.title, links.post, links.disclaimer
- footer.counter, footer.rights
- ui.lang_ru, ui.lang_en

## Вопросы к заказчику
1) Нужны ли дополнительные разделы (например, «экономика», «география», «правительство», «новости»)?
2) Есть ли предпочтения по цветовому коду флага/эмблемы? Сейчас предлагаем меметичную гамму (ярко-пиксельную).
3) Допускается ли внешняя загрузка шрифта Comic Neue (Google Fonts) как аналога Comic Sans для кроссплатформенности?
4) Нужны ли дополнительные ссылки/логотипы (сообщества, партнеры)?
5) Будет ли отдельный домен? Если да — какой фавикон желателен?
6) Есть ли ограничения по юмору/самопрезентации (тон и глубина иронии)?

## Предположения (до ответа на вопросы)
- Дополнительные разделы пока не нужны; держим страницу компактной.
- Цвета символики — яркие, но читаемые; без сложной геральдики.
- Разрешается подключить Comic Neue через Google Fonts (при наличии сети). На офлайне — фолбэки.
- Домен — пока нет, статический хостинг из репозитория.
- Публичный тон — официальный и серьёзный; без явных упоминаний шутливости/пост‑иронии.

## Критерии приемки (MVP)
- Сайт открывается локально без ошибок, все ресурсы отдаются (200 OK).
- Переключение RU/EN меняет все тексты, title и description, сохраняется в localStorage.
- Счетчик посещений увеличивается и отображается.
- Форма «гражданства» работает на клиенте, показывает «сертификат»/сообщение.
- Стиль визуально соответствует «ранний веб/гос» эстетике.

---

# Site Specification (English summary)

- Purpose: official informational site for Vas3kland, established by a vas3k.club expedition during a Liberland visit.
- Languages: RU/EN with a header toggle; remember choice.
- Typeface: Comic Sans or closest analog (Comic Neue). Fallbacks listed above.
- Aesthetic: early web / gov-site vibes (serious public copy): marquees, borders, bright accents, light animations.
- Stack: static HTML/CSS/JS, JSON-based i18n.
- Content sections: Hero, About, Discovery Story, Principles, Citizenship (application form), Symbols (flag/emblem/map), FAQ, Links, Disclaimer.
- Acceptance: no 404s, working i18n, visit counter, citizenship confirmation, accessible basics.
