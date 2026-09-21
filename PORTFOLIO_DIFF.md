# PORTFOLIO DIFF

Сверка: исходный `solonflowai-portfolio`, текущий `portfolio/data.json`, master queue, локальные research-копии и сохранённый список GitHub-репозиториев. Названия объединены только там, где связь подтверждается исходниками или ранее зафиксированным исследованием.

## OLD ONLY

- ИИ-агент (RAG) — исходный конкретный workflow не сопоставлен; остаётся `BLOCKED`, пока нельзя доказать авторство найденных шаблонов.
- ИИ-агент (универсальный) — исходный workflow со слотами/CRM не сопоставлен; не заменять кейсом GIGANT без доказательства.
- AI Саппорт-система с RAG — убрана из избранного из-за отсутствующего пакета; вернуть только с реальными материалами интерфейса и базы знаний.
- Копайлот для ТГ-контента — отсутствует в текущей публичной сетке; требует n8n workflow и реальный Telegram flow.
- Автоматизированная рассылка в Telegram 24/7 — отсутствует в текущей публичной сетке; материалы `telegram-schedule` проверить и вернуть как Telegram-кейс.

## NEW ONLY

- KONTUR / защитные сооружения от БПЛА.
- MAGNUM.
- Пифпаф.
- Shopify Store Builder + Lumina Form.
- Ритм.
- Портной / Atelier.
- Визитки — оставить только если это платформа компаний; не путать с удаляемой контактной визиткой.
- Vibe AutoRouter.
- Webchat.
- Трек в подарок.
- GARMONY.
- EP Beauty.
- Solonflow — исторический кейс прежнего портфолио.
- Meta Ads Job Service.
- STEP.
- СказкаМоя.
- Twitter / X Automation.
- MTProto / Leadworker — должен быть объединён с Telegram AI Lead Hunter, если архитектура подтверждает связь.
- Autopost — должен войти в обезличенный кейс юридической компании, если связь подтвердится.
- TopGadalkin — фактическая новая версия старого лендинга таро-бота.
- Atlas / Leads — n8n B2B lead generator; связь со старым парсером Google Maps указана в MERGED.
- Roulette, Desert Wheels, Women Strange, GIGANT, PP BOT и другие найденные локальные продукты, которых не было отдельными карточками в исходной версии.

## BOTH

- LexLegal Consulting → `lexlegal`.
- Лидогенератор B2B / Google Maps → `maps-lead-generator`.
- Личный AI-ассистент → `personal-assistant`.
- Лендинг оживления фото → `photo-animation`.
- Лендинг чат-бота таролога → `topgadalkin`.
- Колесо Фортуны → `roulette`.
- Сайт психоаналитика → `tatiana`.
- PP BOT → `ppbot`.
- Telegram News Digest → `news-aggregator-archive`.
- GIGANT → `gigant`.
- Desert Wheels → `desert-wheels`.
- Women Strange → `women-strange`.
- AI-система поиска B2B-клиентов → `beauty-lead`.
- Мониторинг Telegram-каналов → `telegram-intel`, но presentation нужно вернуть в Telegram.
- Защищённые сообщения → `protected-messages`.
- Анализ и визуализация данных → `npm-data-analysis`.
- Linux и информационная безопасность → `linux-lab`.
- Внутренние продукты юридической компании → присутствуют частями; требуют одного обезличенного umbrella-case.

## MISSING

- Реальный n8n workflow личного AI-ассистента и Telegram-интерфейс.
- Реальный n8n workflow Copilot и Telegram input/output.
- Готовый университетский Telegram news bot, если это отдельный проект от архивного digest.
- Telegram AI Lead Hunter как единый кейс; сейчас MTProto ошибочно подан отдельно.
- Telegram UI для Telegram Intel — восстановлен и опубликован в Telegram-first формате.
- Реальный Telegram → обработка → публикация flow для Autopost.
- Полные страницы результатов Meta Ads с карточками объявлений и ad detail.
- Builder-часть объединённого Shopify flow перед живым storefront.
- 3D feature moment Portnoy / Atelier.
- Единый университетский комплекс: защищённые сообщения + анализ данных + связанный бот/API.
- Обезличенный umbrella-case внутренних продуктов юридической компании.
- Старый AI Support RAG — только если найдутся доказуемые исходники.

## MERGED

- `store-builder-demo` + `store-builder-embedded` + живой Lumina Form → один `shopify-store-builder`: input → generation → Shopify → storefront.
- `leadworker` / MTProto + `telegram-leads` → один Telegram AI Lead Hunter. Основной Telegram pipeline и MTProto transport подтверждены; прямой production-вызов между репозиториями не заявляется.
- `protected-messages` + `npm-data-analysis` + связанный университетский бот/API → один честный университетский программный комплекс после подтверждения связей.
- `autoposting` подтверждён как отдельный FastAPI publisher; связь с юридической системой не найдена. Telegram-рассылка сохранена отдельным проектом.
- Старый B2B Google Maps parser + `maps-lead-generator` → один B2B Lead Generator с реальным n8n pipeline и результатом.
- Старый лендинг таро-бота + `topgadalkin` → один актуальный кейс; удалённый архивный дубль не возвращать.
- `contentfactory` и `content-factory-marek` не должны существовать как два отдельных публичных кейса; отдельный дублирующий кейс удаляется.

## REMOVE

- Testsergey / `nikita-chat`.
- Учёт посещаемости / `attendance`.
- Keys 4 / `keys4`.
- Контактная визитка / `contactcard`.
- Content Factory / Контент фактори как отдельный дублирующий кейс.

Эти позиции не должны попадать в основную сетку, избранные проекты или публичный индекс кейсов.
