# Meta Ads Library Collector

**Статус: READY.** Реальный backend, проверенный live collection и отдельный portfolio presentation layer.

## ORIGINAL

Приватный meta-ads-service, commit f95b85b0f33bef68bdaa03cf0967c3c61f3522d9: Python/FastAPI/Pydantic, asyncio worker pool, in-memory job repository, atomic FileResultStore, challenge-aware bootstrap, GraphQL adapter через curl_cffi, parser multi-JSON и изоляция параллельных задач.

Исторического пользовательского frontend в проекте не было. Продуктом был HTTP-сервис, создающий управляемые jobs сбора Meta Ads Library.

## VERIFIED

- Исходный отчёт фиксирует live run: 40 уникальных объявлений, 2 GraphQL pages, 6 HTTP requests.
- Поля реального результата: ad_archive_id, advertiser/page, active status, start/end dates, body/title/description, CTA, destination URL, platforms, images/videos, format и Meta snapshot URL.
- В локальном архиве сохранены реальные результаты Nike advertiser mode и более крупные acceptance/concurrency datasets.
- 33 unit/integration теста прошли: parser, lifecycle, queue, cancel, timeout, isolation, auth, validation, API result и safe errors.

## PORTFOLIO POLISH

Создана зрелая results-first презентация поверх исходного API-контракта:

1. search input;
2. queued/running processing;
3. normalized ads list;
4. creative preview;
5. advertiser, text, dates, formats and platforms;
6. Meta Library and destination links;
7. session job registry;
8. API contract.

Интерфейс специально не построен как KPI dashboard: главный экран после обработки — плотная выдача объявлений.

## DEMO / REPLAY

Portfolio flow запускает настоящий create_app и JobService. Внешний Meta upstream заменён replay fixture из подтверждённого локального результата. Шесть публичных creative previews повторно сняты из Meta Ad Library и сохранены локально, чтобы short-lived CDN URLs не ломали кейс.

Cookies, production credentials, аккаунты и массовый live scraping в видео не используются.

## LIMITS

Queue/repository исходной версии находятся в памяти и рассчитаны на один Uvicorn worker. Proxy rotation и последующий load-test phase не выдаются за функции завершённой версии. Presentation UI — portfolio polish, а не исторический frontend.

## QA

Desktop 1440×900 и mobile 390×844: полный flow search → processing → results → detail → jobs → API. Horizontal overflow 0, page errors 0, broken images 0; 6 result rows доступны в обеих версиях.

## Второй визуальный проход — 22.09.2026

На экране поиска до запуска задачи теперь видны три креатива из того же проверенного replay-результата и ссылка на полную выдачу. Это устраняет большую пустую область и сразу показывает назначение сервиса. На `http://127.0.0.1:4332/demo/` повторно сняты desktop/mobile master: поиск → задача через настоящий JobService с локальным scraper adapter → готовая выдача → другая карточка объявления → история → API. Кадры `search-redesign-*`, `results-redesign-*`, `detail-redesign-*` записаны из той же версии. `redesign-capture-qa.json`: page errors 0, horizontal overflow 0, broken images 0 на 1440 и 390; 768 ранее проверен в отдельном визуальном проходе. Временное уведомление о завершении убрано с финальных кадров результата. Исторического frontend по-прежнему не заявляется.

После проверки длительности master переснят ещё раз с паузами для чтения creatives, метаданных и результата. Desktop-видео теперь 33,44 с вместо 11,64 с; файл декодируется в браузере как 1440×900 WebM. Mobile master также обновлён тем же сценарием.

## Visual redesign V2 · 22.09.2026

Portfolio-only results UI сделан контрастнее и плотнее: слева список результатов, справа крупный реальный creative и нормализованные поля. Поиск и API-контракт сохранены; исторического frontend это по-прежнему не означает. Видео `assets/master-v2-{desktop,mobile}.webm` пересняты с потоком search → processing → results → detail → jobs → API. `redesign-v2-capture-qa.json` подтверждает шесть строк результата, отсутствие page errors, битых изображений и горизонтального overflow на 1440/390; 768 проверено отдельно и визуально просмотрено. Результат и новый poster показаны в review. Art direction остаётся IN PROGRESS до проверки всех второстепенных состояний.

Финальный V2 проход: проверены пустая история задач, все четыре вкладки API-контракта, ограничение архивного replay, успешный поиск и шесть строк результата на 1440/768/390. Указано, что **40 объявлений** относятся к подтверждённому исходному live run, а текущий локальный replay содержит **20 записей**, из которых шесть выведены в визуальном списке. Поле `active` — состояние на момент сбора, не проверка статуса объявления сегодня. Другой query/country/status в демо больше не возвращает Nike-данные: UI объясняет ограничение, а local scraper adapter отклоняет несовпадающий запрос. Исходный API при наличии upstream этим не ограничен.

После текстового и поведенческого уточнения desktop/mobile walkthrough пересняты (27,9 и 28,0 с); `redesign-v2-capture-qa.json` не содержит ошибок страницы, переполнения и битых изображений. Публичная review-страница проверена на 1440/768/390: оба видео декодируются, все изображения загружаются, HTTP/page errors и overflow нет. На ней показаны результат, история задач и API. **Visual READY для portfolio replay.** Исторического web frontend не было; live scraping, свежесть объявлений и production deployment не заявляются.
