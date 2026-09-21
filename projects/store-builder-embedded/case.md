# Shopify Store Builder — приложение для продавца

Статус: READY (локальный пакет). Приватный источник, только локальная подготовка.

## ORIGINAL
`ai-store-builder`, commit fdccb7cfab0e612559109c845f57c6a9468d2bad. React Router, React, Shopify App Bridge, Prisma, Admin GraphQL, theme extensions и шаблоны Liquid. Исследованы README, demo review report, builder loader/action/component, generated-store contract, AI generator, publisher, image scenes и тесты. Код предусматривает товар, SEO, брендовый контент, публикацию storefront и ручное принятие сгенерированных изображений. Предыдущие deployment отчёты не считаются текущей проверкой production.

## VERIFIED
132 локальных теста app/lib пройдены, отчёт unit-tests.json. Это mocked/contract tests, не живые интеграционные проверки Shopify. Исходный React Builder запущен отдельно с локальными loader/action. На 390/768/1440 проверены каталог, validation, свой товар/оптимизация фото, цены, optional facts, progress, prepared result, error/retry, disabled Image Studio. UI QA в ui-qa.json.

## PORTFOLIO POLISH
Из UI-модуля исключены server imports; App Bridge и server action заменены локальными адаптерами. Исходные стили и React-компонент сохранены; добавлены мобильные переносы и ограничение длинного описания. Локальный результат явно обозначен как подготовленный, не настоящая публикация. Shopify-ссылки не выдают другой frontend за результат этого приложения.

## DEMO / MOCK
Atelier Demo, подготовленный product ID и ответ публикации. Внешние AI/Shopify/Image API не вызываются, Prisma не подключается, миграций нет. Image Studio показана в честном состоянии недоступного провайдера. Новые изображения не генерируются. Отдельная самостоятельная storefront demo имеет другой исходник и отдельный кейс.

## Ограничения и PLANNED
Текущая установка приложения, OAuth/session, публикация в настоящем магазине, рендер темы, оплата и доставка не проверены. Наличие publisher кода и unit tests не доказывает их работоспособность в production. Не заявляются клиенты/метрики. Авторство отдельных частей и разрешение публичного показа — QUESTIONS.md.

## SCREEN → ACTION → STATE → RESULT
Каталог → выбор → заполненный input → generation.
Свой товар → загрузка/цена/факты → validation → подготовленный результат.
Generation → mock delay → success/error → result/retry.
Image Studio → провайдер отключён → действия недоступны → безопасное ограничение.

Master desktop/mobile просмотрены по декодированным кадрам. Оболочка кейса проверена на 320/390/768/1440: overflow нет, video/poster имеют исходные пропорции и не меняют высоту при запуске.
