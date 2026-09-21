# MASTER CASE QUEUE

Текущий проход по исправлению presentation отслеживается отдельно: [PORTFOLIO_CORRECTION_QUEUE.md](PORTFOLIO_CORRECTION_QUEUE.md).

Обновлено: 21.09.2026. ОБЯЗАТЕЛЬНЫЙ ВТОРОЙ ПРОХОД — IN PROGRESS. Текущий реестр: READY 45 строк / 36 самостоятельных пакета; BLOCKED 9; PRIVATE/NDA 2; NOT PORTFOLIO 7. Финальный статус снят до завершения повторного QA.

READY означает готовность локального пакета, не разрешение на публичную публикацию. Исходники, вклад автора и права перечислены в case.md. Повторные версии и названия сохранены как aliases, а не выданы за дополнительные продукты. Полные технические данные — master-case-queue.json. Каталог — review/index.html.

01. **ИИ-агент (RAG) — BLOCKED**
    - Источник: не сопоставлен — не найден
    - Следующий шаг / причина: В Шаблоны для n8n найдены SuperRAG (42 узла) и Обновленный Ультимативный RAG (54). В последнем прямо указан автор Cole Medin. Обложка старого кейса — иллюстрация, не запись workflow. Нельзя доказать, какой экспорт и какие изменения принадлежат Никите. См. projects/rag-agent/case.md.
02. **ИИ-агент (универсальный) — BLOCKED**
    - Источник: не сопоставлен — не найден
    - Следующий шаг / причина: Найдены Ai sekretar (43 узла) и GPT/интернет (10 узлов). Есть Telegram, memory, routing и модели; нет Google Calendar nodes. Старый кейс обещает слоты, CRM и no-show, но точный экспорт этих сценариев не найден. Общих тегов недостаточно для идентификации. См. projects/universal-agent/case.md.
03. **LexLegal Consulting — READY**
    - Источник: C:/сайт легал2 — HTML-экспорт Mobirise 6.0.1; projects/lexlegal/case.md
    - Следующий шаг / причина: Полные реальные master desktop/mobile, screenshot всех разделов, storyboard, QA продукта 3 ширин и кейса 4 ширин. Согласованный дизайн сохранён; публикация и авторство отдельно в case.md.
04. **Лидогенератор B2B (парсинг Google Карт) — READY**
    - Источник: local n8n export ищет клиентов через карты.json; authorship confirmed by user
    - Следующий шаг / причина: review/maps-lead-generator.html; table-first B2B workspace, settings, six-stage run, 12-row results, company detail, filters, workflow drawer, desktop/mobile walkthrough и QA. Экспорт и credentials не публикуются.
05. **Личный AI-ассистент — READY**
    - Источник: archived portfolio card + cover; authorship confirmed by user
    - Следующий шаг / причина: Подготовлен архивный редакционный пакет с desktop/mobile walkthrough, QA и явными границами доказательств. Runtime не восстановлен; архивная обложка не выдается за UI.
06. **Лендинг для бота по оживлению фото — READY**
    - Источник: private lending + локальная РАБОТА/Сайты/Сайт оживление фото; projects/photo-animation/source-manifest.json
    - Следующий шаг / причина: Единый кейс review/photo-animation.html; 2 версии одного лендинга сохранены. Source slider/playback/услуги, 2 master/cover, QA3/case4. Бот не проверен, фото/video rights отдельно; сравнение кадра/видео подписано.
07. **Лендинг для чат-бота таролога — NOT PORTFOLIO**
    - Источник: archived portfolio card + cover; authorship confirmed by user
    - Следующий шаг / причина: Удалён из публичного портфолио по прямому запросу пользователя. Локальный исследовательский пакет сохранён в архиве.
08. **Колесо Фортуны (геймификация отзывов) — READY**
    - Источник: public my-roulette @621d803; projects/roulette/case.md
    - Следующий шаг / причина: review/roulette.html; реальные master desktop/mobile: второй шанс, результат, reload lock. 8 секторов×4 размера ранее, новые QA3/case4; внешних POST нет.
09. **Автоматизированная рассылка в Telegram 24/7 — READY**
    - Источник: Desktop/РАБОТА/Приложения/скрипт рассылка; 12 файлов совпали с копией для заказчика
    - Следующий шаг / причина: Telegram-first safe demo: исходное сообщение → папка/чат → немедленное сообщение → 23 отложенных сообщения → результат. Desktop/mobile QA PASS; внешних отправок нет.
10. **Сайт для психоаналитика — READY**
    - Источник: Desktop/МОЕ/Сайты/татьяна-·-психоаналитик + авторские видео; projects/tatiana/case.md
    - Следующий шаг / причина: Авторские записи сохранены + два полных новых master. Сборка/TS PASS, меню/карусель/tabs QA3, 4 видео case QA4. Локальные a11y исправления; авторство подтверждено.
11. **AI Саппорт-система с RAG — BLOCKED**
    - Источник: Desktop/РАБОТА/Сервисы/tg-business-rag-worker (2), src + migrations; точное совпадение архитектуры со старым кейсом
    - Следующий шаг / причина: Исходная RAG-логика подтверждена кодом, но реальный Telegram-интерфейс сценария не зафиксирован. Новая техническая web-панель не заменяет пользовательский Telegram UI. См. projects/support-rag/case.md и TELEGRAM_VISUAL_AUDIT.md.
12. **Telegram AI Lead Hunter — READY**
    - Источник: Desktop tg-business-rag-worker (2)/leads-worker + backend-webchat-clean: Junction parser, ingest, topics/RAG; точное совпадение старого описания
    - Следующий шаг / причина: review/telegram-leads.html; Telegram-first demo replay, исходные parser/webhook/ingest, draft, duplicate/anonymous states и связанный MTProto transport boundary. Внешних отправок нет.
13. **PP BOT — закрытая база рецептов — READY**
    - Источник: work/research-ppbot; public GitHub ppbot, commit 379b7a9
    - Следующий шаг / причина: review/ppbot.html; исправлен пустой Canvas, synthetic recipes, master desktop/mobile, QA 390/768/1440 и case 320–1440. Telegram backend отсутствует; закрытая коллекция не опубликована.
14. **ИИ-агрегатор новостей из Telegram — READY**
    - Источник: archived portfolio card + cover; authorship confirmed by user
    - Следующий шаг / причина: Подготовлен архивный редакционный пакет с desktop/mobile walkthrough, QA и явными границами доказательств. Runtime не восстановлен; архивная обложка не выдается за UI.
15. **Копайлот для ТГ-контента — 4 слоя — BLOCKED**
    - Источник: projects/copilot/source-manifest.json; подробности в case.md
    - Следующий шаг / причина: Точный n8n workflow проекта и реальный Telegram flow не найдены. Найденный SuperRAG относится к другой системе и не используется как доказательство Copilot. См. projects/copilot/case.md и TELEGRAM_VISUAL_AUDIT.md.
16. **GIGANT — персональный ИИ-агент — READY**
    - Источник: Desktop/МОЕ/ИИ агенты/Гигант: app/app, app/tests, README/ARCHITECTURE/DEMO_SCENARIOS
    - Следующий шаг / причина: review/gigant.html; настоящий agent loop + mock tools/model; 61 source tests, QA3, 2 master, cover/screens/storyboard, case QA4. Новая панель явно обозначена; Open WebUI/LLM/bridge не запущены.
17. **Desert Wheels — ROI-калькулятор автопроката — READY**
    - Источник: desert-wheels-roi-calculator — подтверждено назначением и кодом
    - Следующий шаг / причина: review/desert-wheels.html; новые master desktop/mobile, QA 390/768/1440, PDF, negative/reset, build+lint PASS. Прежний дизайн сохранён.
18. **Women Strange — бренд сумок ручной работы — READY**
    - Источник: Desktop/МОЕ/Сайты/СайтБрендсумок; projects/women-strange/case.md
    - Следующий шаг / причина: Реальные master desktop/mobile, все разделы/взаимодействия, QA3 и case4, cover/screens/storyboard. Ограничения и новые доработки перечислены в case.md.
19. **AI-система поиска B2B-клиентов — READY**
    - Источник: МОЕ/Сайты/Beauty Lead Hunter.zip: Python/Playwright/Streamlit/SQLite, 24 исходных файла извлечены без данных и ключей
    - Следующий шаг / причина: review/beauty-lead.html; исходный Streamlit + SQLite pipeline, synthetic fixtures; 12 backend + good-site regression, QA3, 2 master/cover, case QA4. Без scraper/LLM/outreach; авторство и публикация уточняются.
20. **Система мониторинга Telegram-каналов — BLOCKED**
    - Источник: work/research-parser-tg-muiv; public commit 654ae68; назначение и стек совпадают со старым учебным кейсом
    - Следующий шаг / причина: Парсер и SQLite подтверждены, но пользовательский Telegram UI не найден. Новая панель остаётся технической реконструкцией и не включается в READY-витрину. См. projects/channel-monitor/case.md и TELEGRAM_VISUAL_AUDIT.md.
21. **Программный комплекс для работы с защищёнными сообщениями — READY**
    - Источник: archived portfolio card + cover; authorship confirmed by user
    - Следующий шаг / причина: Подготовлен архивный редакционный пакет с desktop/mobile walkthrough, QA и явными границами доказательств. Runtime не восстановлен; архивная обложка не выдается за UI.
22. **Анализ и визуализация данных — READY**
    - Источник: archived portfolio card + cover; authorship confirmed by user
    - Следующий шаг / причина: Подготовлен архивный редакционный пакет с desktop/mobile walkthrough, QA и явными границами доказательств. Runtime не восстановлен; архивная обложка не выдается за UI.
23. **Linux и информационная безопасность — READY**
    - Источник: Desktop/МОЕ/кибербез/кибербез.zip: 10 DOCX отчётов со скриншотами и именем автора
    - Следующий шаг / причина: review/linux-lab.html; 9 оригинальных кадров KGpg/iptables/ClamAV, два архивных walkthrough, cover/storyboard/hash manifest, QA3/case4. VM не перезапускалась; учебный опыт, не commercial audit.
24. **Внутренние продукты и автоматизация юридической компании — PRIVATE/NDA**
    - Источник: archived portfolio description; authorship confirmed by user
    - Следующий шаг / причина: Обезличенный редакционный кейс подготовлен: review/legal-automation.html. Исходники и внутренние UI не раскрываются; код независимо не проверен.
25. **Поддержка и развитие коммерческих web-продуктов — PRIVATE/NDA**
    - Источник: не сопоставлен — не найден
    - Следующий шаг / причина: NDA указан в исходном портфолио. Допустимо только согласованное обезличенное описание; исходники не раскрывать.
26. **MAGNUM — сайт клуба спортивного покера — READY**
    - Источник: Авторские приоритетные видео + текущая папка с другим hero
    - Следующий шаг / причина: Архивный media-first кейс готов по приоритетным авторским видео. Расхождение с найденным кодом сохранено как ограничение доказательств и больше не блокирует публикационный пакет.
27. **Пифпаф — работа с Instagram Reels — READY**
    - Источник: public pifpaf-dashboard @055366e; отдельная локальная копия + mock API
    - Следующий шаг / причина: 8 маршрутов QA3, master desktop/mobile + error/retry/delete clips, build PASS, 56 tests PASS/2 SKIP, case QA4. Авторизация/Instagram/Supabase демонстрационные; роль и публичные права отдельно.
28. **Создание магазинов Shopify — READY**
    - Источник: work/research-ai-store-builder — private; отдельный frontend-прототип вынесен в самостоятельную строку
    - Следующий шаг / причина: review/store-builder-embedded.html; 132 local tests, исходный React UI с MOCK action, QA 3 размеров, 2 master, cover. Живой Shopify не проверен; публикация не разрешена.
29. **Сайт защитных сооружений от БПЛА — READY**
    - Источник: local portfolio implementation KONTUR; authorship confirmed by user
    - Следующий шаг / причина: Сопоставлен с готовым KONTUR-кейсом: адаптивный B2B-лендинг, walkthrough, screenshots и QA. Инженерные свойства и реальные объекты не заявляются.
30. **Ритм — трекер привычек и тренировок — READY**
    - Источник: ritm-tracker / work/ritm-source; локальная согласованная forest-версия
    - Следующий шаг / причина: Согласованный forest-дизайн; 5 экранов × 4 ширины, полный живой master desktop/mobile, понятные demo-данные, обложка и storyboard. Внешние интеграции не заявляются проверенными.
31. **Портной — процессы ателье — READY**
    - Источник: portnoy-atelier — см. описание
    - Следующий шаг / причина: review/portnoy.html; оригинальный demo mode, 95 unit + 10 integration + 59 E2E; 2 master видео и отдельный 3D clip; screenshots/storyboard/case/QA. Только локально, публичные права отдельно.
32. **Платформа визиток — READY**
    - Источник: business-cards-platform; work/research-business-cards-platform
    - Следующий шаг / причина: review/business-cards.html; полный CRUD/search/public/stats master, QA 3 размеров и case QA 4 размеров; backend локально эмулирован, настройки честно отмечены как незавершённые.
33. **Vibe Autorouter — READY**
    - Источник: work/research-vibe-autorouter; GitHub public main
    - Следующий шаг / причина: review/vibe-autorouter.html; полный master desktop/mobile, исходные unit 6 PASS, FakeVibeClient проверен, QA 390/768/1440 и case 320–1440; PostgreSQL orchestration не проверен, локальный adapter явно DEMO.
34. **Чат-виджет Web → Telegram — READY**
    - Источник: РАБОТА/Сервисы/tg-business-rag-worker (2)/apps/chat-web + apps/chat-widget
    - Следующий шаг / причина: review/webchat.html; исходный web frontend и embed, локальный API mock, исправлены потеря черновика и невидимый overlay; полный master desktop/mobile, QA 390/768/1440. Публичные права отдельно.
35. **Трек в подарок — READY**
    - Источник: Desktop/РАБОТА/Сайты/trekpodarok---ai-music-gift + исходное видео trekpodarok.mp4
    - Следующий шаг / причина: review/trekpodarok.html; исходник подтверждён архивным видео. Полный frontend master в двух размерах, cover, QA, storyboard. Бот и генерация не проверены; публикация отдельно.
36. **Контент-завод — BLOCKED**
    - Источник: Desktop/РАБОТА/Сервисы/ContentFactoryBot-master (4)/ContentFactoryBot-master
    - Следующий шаг / причина: Код бота и нейтральная portfolio-панель проверены, но нет безопасной записи реального Telegram-интерфейса. До появления такого материала кейс остаётся visual BLOCKED. См. projects/contentfactory/case.md и TELEGRAM_VISUAL_AUDIT.md.
37. **Бот подготовки к ЕГЭ и ОГЭ — BLOCKED**
    - Источник: не найден — см. описание
    - Следующий шаг / причина: Старый кандидат бота подготовки к ЕГЭ/ОГЭ сохранён в очереди. В scoped inventory рабочих папок и репозиториев не найден исполняемый код или запись учебного сценария. Другие Telegram-боты не подставляются вместо него. См. projects/exam-bot/case.md.
38. **GARMONY — READY**
    - Источник: projects/garmony/case.md
    - Следующий шаг / причина: Реальные master desktop/mobile, все разделы/взаимодействия, QA3 и case4, cover/screens/storyboard. Ограничения и новые доработки перечислены в case.md.
39. **EP Beauty — READY**
    - Источник: projects/ep-beauty/case.md
    - Следующий шаг / причина: Полные реальные master desktop/mobile, screenshot всех разделов, storyboard, QA продукта 3 ширин и кейса 4 ширин. Согласованный дизайн сохранён; публикация и авторство отдельно в case.md.
40. **chatAlena — NOT PORTFOLIO**
    - Источник: https://github.com/nikitasolonukha/chatAlena
    - Следующий шаг / причина: GitHub GraphQL 21.09.2026 подтвердил isEmpty=true: репозиторий не содержит кода/commit. Непустые secure-branch-training и stepbystep-miniapp1 остаются отдельными кандидатами; это не исключение их продукта.
41. **solonflowai-portfolio — READY**
    - Источник: work/research-solonflowai-portfolio
    - Следующий шаг / причина: Единый архивный кейс review/portfolio-archive.html; отдельные source manifests всех трёх версий. Builds/types, QA3, master desktop/mobile, case QA4. Исторические версии отделены от новой подачи; неподтверждённые метрики убраны.
42. **meta-ads-service — READY**
    - Источник: https://github.com/nikitasolonukha/meta-ads-service
    - Следующий шаг / причина: review/meta-ads.html; исходный JobService с mock сборщиком, 33 теста PASS; master input/process/output + failure/cancel, UI/case QA; приватный локальный пакет.
43. **lab1ViktorandNikita — NOT PORTFOLIO**
    - Источник: https://github.com/nikitasolonukha/lab1ViktorandNikita
    - Следующий шаг / причина: Репозиторий содержит только Readme.md и Инициализация.txt: учебное планирование бота записи, без исходного приложения и реализованных сценариев. Не выдаётся за готового бота.
44. **secure-branch-training — NOT PORTFOLIO**
    - Источник: https://github.com/nikitasolonukha/secure-branch-training
    - Следующий шаг / причина: Проверены оба файла: README «Описание проекта» и index.html с двумя учебными заголовками Header by Alice / Welcome to the main branch. Это упражнение с ветками, без продуктового сценария; не самостоятельный кейс.
45. **testsergey — READY**
    - Источник: https://github.com/nikitasolonukha/testsergey
    - Следующий шаг / причина: review/nikita-chat.html; исходный REST handler + local KV, история/ошибка/повтор/валидация, master и case QA. Однопользовательский учебный чат, не мессенджер.
46. **Site-DigitalTranformation — READY**
    - Источник: work/research-Site-DigitalTranformation
    - Следующий шаг / причина: Единый архивный кейс review/portfolio-archive.html; отдельные source manifests всех трёх версий. Builds/types, QA3, master desktop/mobile, case QA4. Исторические версии отделены от новой подачи; неподтверждённые метрики убраны.
47. **secure-branch-training. — NOT PORTFOLIO**
    - Источник: https://github.com/nikitasolonukha/secure-branch-training.
    - Следующий шаг / причина: GitHub GraphQL 21.09.2026 подтвердил isEmpty=true: репозиторий не содержит кода/commit. Непустые secure-branch-training и stepbystep-miniapp1 остаются отдельными кандидатами; это не исключение их продукта.
48. **site-avito — READY**
    - Источник: work/research-site-avito
    - Следующий шаг / причина: Единый архивный кейс review/portfolio-archive.html; отдельные source manifests всех трёх версий. Builds/types, QA3, master desktop/mobile, case QA4. Исторические версии отделены от новой подачи; неподтверждённые метрики убраны.
49. **poseshaemost-MUIV — READY**
    - Источник: work/research-poseshaemost-MUIV; private commit 9a18a21
    - Следующий шаг / причина: review/attendance.html; исходные API handlers + local store, отметка/пересчёт/сохранение, master desktop/mobile, QA. Telegram/Sheets не подключены; отдельная demo-панель обозначена.
50. **keys4 — READY**
    - Источник: https://github.com/nikitasolonukha/keys4
    - Следующий шаг / причина: review/keys4.html; точные исходные формулы, Plotly hover/legend/zoom, исправлен resize; master, cover, screenshot, UI/case QA. Учебные условные данные.
51. **stepbystep-miniapp1 — READY**
    - Источник: work/research-stepbystep-miniapp1; private commit dbff9ba
    - Следующий шаг / причина: review/stepbystep.html; master desktop/mobile + дополнительный обзор, 20 экранов×3 ширины, flow QA, исправлены swipe/persistence/полив. Чат, аудио и SOS ограничения обозначены.
52. **lending — READY**
    - Источник: https://github.com/nikitasolonukha/lending
    - Следующий шаг / причина: Единый кейс review/photo-animation.html; 2 версии одного лендинга сохранены. Source slider/playback/услуги, 2 master/cover, QA3/case4. Бот не проверен, фото/video rights отдельно; сравнение кадра/видео подписано.
53. **stepbystep-miniapp — NOT PORTFOLIO**
    - Источник: https://github.com/nikitasolonukha/stepbystep-miniapp
    - Следующий шаг / причина: GitHub GraphQL 21.09.2026 подтвердил isEmpty=true: репозиторий не содержит кода/commit. Непустые secure-branch-training и stepbystep-miniapp1 остаются отдельными кандидатами; это не исключение их продукта.
54. **СказкаМоя — READY**
    - Источник: РАБОТА/Сайты/сказкаМоя
    - Следующий шаг / причина: review/skazka.html; исходный лендинг + явно новый книжный presentation layer. 4 тарифа/5 FAQ/границы переходов, build+QA3, два master, cover, case QA4. Бот/PDF/audio не проверены.
55. **Гадалыч — бот и web-продукт — NOT PORTFOLIO**
    - Источник: РАБОТА/Приложения/monorepoГадалыч
    - Следующий шаг / причина: Проверены все 3 entrypoint: frontend health text, Telegram echo, Nest root/ping. Только scaffold, без прикладных функций. projects/gadalych/source-audit.json; не смешивать с TopGadalkin.
56. **Автоматизация Twitter — READY**
    - Источник: РАБОТА/Приложения/скрипт твиттер 2
    - Следующий шаг / причина: review/twitter-automation.html; исходный processor/парсер, 6 offline modes/9 source checks, UI QA3 + error/retry, master/cover/case QA4. Новая панель; X не подключён; ограничения success описаны.
57. **Telegram Intel Bot — READY**
    - Источник: work/research-telegram-intel-bot; private commit 480eac9
    - Следующий шаг / причина: review/telegram-intel.html; Telegram-first replay по реальным командам, 45 исходных тестов, desktop/mobile master 20.48 сек, QA 1440/390 без overflow. Данные синтетические; приватный код не публикуется.
58. **Autopost — API-очередь публикаций — READY**
    - Источник: work/research-autoposting/автопостинг; private
    - Следующий шаг / причина: review/autoposting.html; две папки подтверждены как копии одного FastAPI publisher. API-first replay показывает POST → queue → worker → retry/success/failed; связь с юридической системой не найдена; внешних публикаций нет.
60. **Store Builder — самостоятельная витрина — READY**
    - Источник: work/research-ai-shopify-store-builder-demo — private
    - Следующий шаг / причина: review/store-builder-demo.html; Next build, QA 3 размеров, корзина/reload/custom/error retry, 2 master/cover. Mock generator, без Shopify/checkout.
61. **TopGadalkin — расшифровка ладони — READY**
    - Источник: work/taro-source, Lending-taro, f85f854; отдельный от неподтверждённого старого бота-таролога
    - Следующий шаг / причина: Согласованный dark UI; 5 групп контрактных API проверок с mocks, QA3/case4, два живых master, storyboard/cover. Бот и реальные платежи не заявляются.
62. **Контактная визитка — локальный HTML — READY**
    - Источник: projects/contactcard/source-manifest.json; подробности в case.md
    - Следующий шаг / причина: review/contactcard.html; QA3 и case QA4, два master/cover/screens/storyboard. Обезличенный исходный HTML + responsive/print polish; PDF проверен.
63. **Content Factory — микросервисная версия Marek — READY**
    - Источник: Desktop/РАБОТА/Сервисы/Контент-завод/content-zavod Marek
    - Следующий шаг / причина: Исходные React сценарии + локальный API, новая оболочка. Build/types, 12 offline source checks (включая фиксацию дефектов), QA3/case4, 2 master/cover/screens/storyboard. Инфраструктура и платформы не подключены; ограничения в case.md.



