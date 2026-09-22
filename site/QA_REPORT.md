# QA · новое портфолио

Проверка локального сайта `/site/` после разделения Home / Work / About / Archive. Источник проектов — канонический `portfolio/data.json`; research и review не заменены.

| Область | Проверка | Результат |
|---|---|---|
| Структура | 35 опубликованных кейсов | 12 выбранных в Work + 23 в Archive; все доступны по case URL |
| Home / Work / кейсы | 320, 390, 430, 768, 1024, 1440, 1920 | 28 views, ошибок 0 |
| 35 кейсов | 390 и 1440 | 70 views, ошибок 0 |
| Навигация / разные типы кейсов | Home, Work, About, Archive, Shopify, Meta, Portnoy, AI Support на 320, 390, 768, 1440 | 32 views, ошибок 0 |
| Media | Скриншоты и master video берутся из сохранённых материалов проектов | Пропавших изображений и пустых video-секций в проверенных views нет |
| Motion | Семь коротких фрагментов из существующих master videos | Проигрываются без звука при hover/focus; `prefers-reduced-motion` отключает превью |
| Взаимодействия | Четыре фильтра Work, семь видео-превью, мобильное меню, reduced-motion | Ошибок 0; локальные video URL возвращают 200 |
| Feature moments | Пифпаф Reels, Портной 3D, AI Support webchat + Telegram на 390/1440 | 6 визуальных проверок, ошибок 0 |
| Ссылки | Home, Work, About, Archive и все 35 case pages | 39 страниц, 441 внутренняя ссылка, ошибок 0 |
| Целостность контента | `portfolio/data.json`, assets, исключённые проекты, NDA-границы | 35 кейсов, 353 media-файла, ошибок 0 |
| Загрузка | Home, Work, Shopify, B2B на 390/1440 | Нет autoplay и переполнения; на страницах кейсов при открытии загружаются метаданные только основного видео |
| Дополнительные видео | Shopify и B2B на мобильной ширине | `preload=none`; воспроизведение запускается по действию пользователя |
| Публикация | GitHub Pages, Home / Work / About / Archive и 4 ключевых кейса на 390/1440 | Коммит `7d0b8e0` собран; 16 опубликованных views, ошибок 0 |

Проверки измеряли горизонтальное переполнение, runtime JS errors, наличие H1, битые изображения, количество видео и наличие архивной пометки там, где нет записи. Снимки результата лежат в `site/qa/`: `home-1440.png`, `home-390.png`, `work-1440.png`, `work-390.png`, `shopify-1440.png`, `shopify-390.png`, отдельные top screenshots About/Archive/Meta/Portnoy/Support.

Локальные замеры загрузки — диагностика, а не публичные Core Web Vitals. Отчёты: `site/qa/all-cases.json`, `site/qa/links.json`, `site/qa/content-integrity.json`, `site/qa/performance.json`, `site/qa/public-smoke.json`.

Ограничения доказательств: для **Личного AI-ассистента**, **Telegram News**, **n8n Copilot** и **Университетских проектов** не найден полный оригинальный UI/workflow export; кейсы отмечены как архивные. **Внутренние продукты юридической компании** показаны как обезличенный NDA-кейс без вымышленного UI. Детали источников и статусов — в `MASTER_CASE_QUEUE.md` и отдельных `projects/*/case.md`.
