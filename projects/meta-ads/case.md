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
