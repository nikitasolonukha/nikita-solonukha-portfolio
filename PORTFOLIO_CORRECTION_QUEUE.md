# Portfolio correction queue

Единица работы — реальный продукт и его доказуемый пользовательский flow. Статус `READY` ставится только после обновления presentation, assets, storyboard, master video и QA.

01. Portfolio shell / исходная композиция + Charcoal Violet / Cyber Lime — READY — исходная редакционная композиция сохранена; #3C1A47 и #B6FF00 используются как точечные акценты; desktop проверен визуально, общий responsive-аудит пройден.
02. Удаление Testsergey, attendance, Keys 4, contact card и дубля Content Factory — READY
03. Shopify Store Builder + Lumina Form: builder → generation → Shopify → storefront — READY
04. Personal AI Assistant: n8n workflow + Telegram — BLOCKED
05. N8N Copilot: workflow + Telegram input/output — BLOCKED
06. Telegram News Digest: разделить архивную и университетскую версии — BLOCKED
07. Telegram AI Lead Hunter + MTProto: реальный обезличенный Telegram с топиками + связанный transport boundary — READY
08. B2B Lead Generator / Atlas: table-first redesign, real n8n pipeline — READY
09. Twitter / X Automation: X-first presentation — READY
10. Telegram Intel: Telegram-first presentation — READY
11. Autopost: установить принадлежность и показать Telegram → публикация — READY
12. Meta Ads: реальные страницы результатов и ad detail — READY
13. STEP: полный visual QA и новая запись — READY
14. СказкаМоя: убрать AI-визуальные клише — READY
15. Трек в подарок: убрать AI-визуальные клише — READY
16. GARMONY: ограниченный polish без смены характера — READY
17. Portnoy / Atelier: отдельный 3D feature moment — READY
18. Университетский комплекс: protected messages + data analysis + bot/API — BLOCKED — связь модулей не подтверждена: два кейса существуют только как архивные карточки без исходников, а найденный parser-tg-muiv — отдельный репозиторий мониторинга Telegram. Не объединять их в один продукт без доказательства.
19. Внутренние продукты юридической компании: sanitized actual interfaces — PRIVATE/NDA — безопасные реальные экраны не найдены; подготовлена честная обезличенная редакционная подача без вымышленного UI и клиентских данных.
20. MAGNUM: проверить полноту реальных desktop/mobile материалов — READY
21. KONTUR / БПЛА: проверить storytelling и маркировку supporting visuals — READY
22. PP BOT: Telegram/WebApp-first presentation — READY
23. Живые фото: Telegram evidence после получения материалов — BLOCKED — сайт, сравнение и responsive-видео READY; реальный Telegram flow бота не передан, а по найденному frontend его нельзя достоверно восстановить.
24. Telegram schedule / рассылка 24/7 — READY
25. AI Support RAG — READY — реальный Telegram-интерфейс подтверждён; ники/ID/ссылка обезличены, текст заменён вымышленным сценарием поддержки закрытого канала, техническая панель оставлена вторичным доказательством backend-flow.
26. LexLegal — READY — реальный Mobirise-архив отделён от согласованного portfolio polish; полный desktop/mobile walkthrough и QA основных разделов сохранены.
27. Ритм — READY — реальный Next.js-продукт, полный flow привычек/тренировки/журнала/настроек; 58 тестов, build и responsive QA.
28. Пифпаф — READY — исходный кабинет Reels, импорт/ошибка/повтор/аналитика/таблица и mobile; 56 тестов PASS, 2 SKIP.
29. EP Beauty — READY — законченный журнальный сайт с услугами, записью, студией, галереей, FAQ и контактами; изображения и demo-границы подписаны.
30. TopGadalkin / таро-бот — READY — оставлен один актуальный тёмный лендинг; архивный дубль удалён, бот/генерация/платёж не выдаются за проверенные.
31. Webchat — READY — настоящий web-виджет и подтверждённый контракт Web→Telegram; SSE, retry, reload и iframe states показаны без вымышленного dashboard.
32. Vibe AutoRouter — READY — интерфейс показывает исходную маршрутизацию, бюджеты и результат; локальный fake client и responsive QA зафиксированы.
33. Desert Wheels — READY — работающий калькулятор экономики, изменение параметров и экспорт PDF; desktop/mobile и PDF QA сохранены.
34. Women Strange — READY — реальный сайт бренда, модели/галерея/заказ и адаптив; округлые controls и полный walkthrough проверены.
35. Roulette — READY — настоящий Canvas/Telegram WebApp flow со вторым шансом, результатом и reload lock; внешние POST отключены.
36. GIGANT — READY — исходный AgentLoopService вызывается локальной demo-обвязкой; approval/reject, tools, trace и результат отделены от непроверенных production-интеграций.
37. Beauty Lead Hunter — READY — сохранён исходный Streamlit UI и pipeline; поиск, скоринг, фильтры, статусы и CSV проверены на обезличенных fixtures.
38. Linux Lab — READY — реальные архивные доказательства лабораторных показаны в viewer; он не выдаётся за новый Linux-продукт или повторный запуск VM.
39. Tatiana — READY — автор подтвердил работу с нуля; сохранены авторские записи и полный новый walkthrough всех разделов, build и responsive QA.
40. Portfolio archive / Solonflow — READY — три исторические версии объединены честно; текущий polish отделён от исходного вида, 3D/grid/languages/modals проверены.

`BLOCKED` для Personal AI Assistant означает: найденный `Ai sekretar.json` — реальный n8n workflow с Telegram, multimodal input, Google Docs и Pinecone, но он не совпадает с историческим описанием ассистента с Gmail, Calendar и расходами. Подменять один проект другим нельзя.

`BLOCKED` для Copilot означает: спецификация и промпты найдены, но точный n8n export и реальный Telegram flow отсутствуют. Подготовленная web-мастерская остаётся исследовательской реконструкцией и не используется как доказательство продукта.


`BLOCKED` для Telegram News Digest означает: архивный AI-агрегатор из старого портфолио был помечен «в разработке» и не имеет найденного исходника или Telegram-записи. Он отделён от готового университетского `parser-tg-muiv`: это другой Telegram-бот без AI-суммаризации, с подтверждёнными Telethon, SQLite, поиском и командами. Подменять один продукт другим нельзя.

