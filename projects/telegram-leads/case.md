# Telegram AI Lead Hunter — Telegram flow + MTProto transport

**Статус: READY.** Безопасный локальный demo replay на исходной логике; внешних Telegram-отправок нет.

Система принимает сообщения из Telegram-коллектора, проверяет источник, извлекает автора, защищается от повторов и передаёт лид в рабочий Telegram-сценарий. Менеджер получает подготовленный черновик и сам решает, продолжать ли контакт.

## ORIGINAL

Основной продукт подтверждён исходниками `leads-worker` и `backend-webchat-clean`: Junction parser, collector webhook, ingest, Telegram topics, draft formatter и RAG/AI pipeline. Отдельный репозиторий `LeadworkerMTProto` — внутренний сервис первой отправки через Telegram user account. Он поддерживает адресацию по username или Telegram peer (`chatId` + `accessHash`), fallback, timeout и безопасные ошибки.

Парсер основного продукта хранит MTProto/topic hints, а OpenAPI транспорта прямо называет его sender service for leads. Это подтверждает общую предметную область. Прямой production-вызов между двумя найденными репозиториями не обнаружен, поэтому MTProto показан как связанный проверенный модуль, а не как доказанный end-to-end участок.

## VERIFIED

Исходные parser → collector webhook → core ingest выполняются в локальном VM harness. Проверены: открытый автор, `pending_topic`, новое сообщение того же автора, duplicate до core, скрытый автор, allowlist чужого чата, исключение собственного бота, draft pipeline и missing user. Отдельный MTProto-пакет проверен на username, InputPeer fallback, валидацию, missing entity, timeout, unauthorized и wrong method.

Новая запись прошла visual QA на 1440×900 и 390×844: page errors 0, horizontal overflow 0, broken images 0. Видео показывает Telegram-first flow, а не вымышленный SaaS dashboard.

## DEMO / MOCK

Telegram shell — презентационная реконструкция интерфейса продукта. Сообщения, имя студии, IDs и username вымышлены. Parser, webhook, ingest и formatter исходные. KV, D1, Telegram API, topic creation, AI resolver и retrieval заменены локальными адаптерами. Кнопка MTProto показывает подтверждённые возможности отдельного транспорта; настоящая отправка не выполняется.

## PORTFOLIO POLISH

Техническая web-панель заменена на Telegram-first операторский сценарий: входящее сообщение, квалификация, путь обработки, черновик, защита от дублей и ограничение скрытого контакта. Desktop повторяет двухколоночную структуру Telegram, mobile показывает чистый чат без пустого верхнего поля. Сущность продукта и backend-контракт не изменены.

## Ограничения / PLANNED

Не проверены реальные Junction-группы, Telegram-сессия, production topic callback, внешняя AI-модель, R2 learning sync и фактическая доставка. Topic creation и storage локальные. Исходный collector ставит KV dedup до ответа core; повтор после ошибки core может быть потерян. Права на публикацию исходных клиентских данных не предполагаются, поэтому используются только вымышленные данные.

## SCREEN → ACTION → STATE → RESULT

Telegram collector → «Обработать лид» → allowlist + parse + dedup → `pending_topic`.

Квалифицированный лид → «Подготовить черновик» → исходный draft pipeline → текст для проверки менеджером.

MTProto transport → открыть модуль → username / peer fallback / timeout → описание проверенного transport boundary.

Повтор → тот же message id → duplicate → core не вызывается.

Скрытый автор → ingest-anon → безопасный маршрут → прямой контакт помечен невозможным.

## Материалы

- `assets/master-desktop-v2.mp4` и `assets/master-mobile-v2.mp4` — master walkthrough.
- `assets/cover-v2.webp`, `poster-desktop-v2.webp`, `poster-mobile-v2.webp`.
- Screenshots entry, qualified, draft, MTProto, duplicate и anonymous для desktop/mobile.
- `capture-report.json` — timings и visual QA.
- `storyboard.md` — последовательность записи.
