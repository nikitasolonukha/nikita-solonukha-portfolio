# QA · редакционная оболочка портфолио

22 сентября 2026: Home, Work, About, Archive и Case перестроены в персональную редакционную систему. Первый экран показывает собственный портрет Никиты и имя; проекты начинаются ниже. Следующий pass добавил Lenis + GSAP/ScrollTrigger, бегущую типографику, переходы, reveal, Work preview, fullscreen mobile menu и отдельную страницу Contact. Реальные проектные медиа и границы достоверности сохранены. Геометрия и motion описаны в `references/DENNIS_SYSTEM.md` и `references/DENNIS_MOTION_SYSTEM.md`.

Проверка локального сайта `/site/` после разделения Home / Work / About / Archive. Источник проектов — канонический `portfolio/data.json`; research и review не заменены.

| Область | Проверка | Результат |
|---|---|---|
| Структура | 35 опубликованных кейсов | 12 выбранных в Work + 23 в Archive; все доступны по case URL |
| Home / Work / кейсы | 320, 390, 430, 768, 1024, 1440, 1920 | 28 views, ошибок 0 |
| 35 кейсов | 390 и 1440 | 70 views, ошибок 0 |
| Навигация / разные типы кейсов | Home, Work, About, Archive, Shopify, Meta, Portnoy, AI Support на 320, 390, 768, 1440 | 32 views, ошибок 0 |
| Media | Скриншоты и master video берутся из сохранённых материалов проектов | Пропавших изображений и пустых video-секций в проверенных views нет |
| Motion | Пять коротких фрагментов из существующих master videos | Проигрываются без звука при hover/focus; `prefers-reduced-motion` отключает превью |
| Взаимодействия | Фильтры Work, пять видео-превью, мобильное меню, reduced-motion | Ошибок 0; локальные video URL возвращают 200 |
| Feature moments | Пифпаф Reels, Портной 3D, AI Support webchat + Telegram на 390/1440 | 6 визуальных проверок, ошибок 0 |
| Ссылки | Home, Work, About, Archive, Contact и все 35 case pages | 40 страниц, 443 внутренних ссылки, ошибок 0 |
| Целостность контента | `portfolio/data.json`, assets, исключённые проекты, NDA-границы | 35 кейсов, 353 media-файла, ошибок 0 |
| Загрузка | Home, Work, Shopify, B2B на 390/1440 | Нет autoplay и переполнения; на страницах кейсов при открытии загружаются метаданные только основного видео |
| Дополнительные видео | Shopify и B2B на мобильной ширине | `preload=none`; воспроизведение запускается по действию пользователя |
| Новый первый экран | 390 и 1440 | Портрет загружен; горизонтального переполнения нет |
| Motion | Home / Work / About / Archive / Contact / Shopify на 390 и 1440 | 12 views; ошибки 0; desktop marquee движется, touch/reduced сохраняют читаемость |
| Переходы | Work → Contact, Case → Next Case, мобильное меню/Escape | Реальная навигация работает; ошибок 0 |
| Загрузка с motion | Home, Work, Shopify, B2B на 390/1440 | 8 views; overflow 0, autoplay 0, видео-превью `preload=none` |
| Дополнительные ширины | Home, Work, Contact, Shopify на 320/430/768/1024/1920 | 20 views, ошибок и overflow нет |
| Публикация | GitHub Pages, Home / Work / About / Archive / Contact и 4 ключевых кейса на 390/1440 | Коммит `3af7454` собран; 18 опубликованных views, ошибок 0 |
| Публичный motion | Home, Work, мобильный About | Lenis/GSAP/ScrollTrigger загружаются; marquee движется, preview виден, меню открывается |

Проверки измеряли горизонтальное переполнение, runtime JS errors, наличие H1, битые изображения, количество видео и наличие архивной пометки там, где нет записи. Снимки новой системы лежат в `site/qa/`: `motion-hero-top-{390,1440}.png`, `motion-work-1440.png`, `motion-contact-{390,1440}.png`, а также прежние кадры кейсов Meta/Portnoy/Support.

Локальные замеры загрузки — диагностика, а не публичные Core Web Vitals или точный замер 60 fps. Отчёты: `site/qa/all-cases.json`, `site/qa/links.json`, `site/qa/content-integrity.json`, `site/qa/performance.json`, `site/qa/motion-pass.json`, `site/qa/motion-breakpoints.json`, `site/qa/public-smoke.json`, `site/qa/public-motion.json`.

Ограничения доказательств: для **Личного AI-ассистента**, **Telegram News**, **n8n Copilot** и **Университетских проектов** не найден полный оригинальный UI/workflow export; кейсы отмечены как архивные. **Внутренние продукты юридической компании** показаны как обезличенный NDA-кейс без вымышленного UI. Детали источников и статусов — в `MASTER_CASE_QUEUE.md` и отдельных `projects/*/case.md`.
