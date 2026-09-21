# Meta Ads Library · Job Service

**Статус: READY (локальный пакет).** Приватный backend, без публичной публикации.

API-сервис сбора рекламных записей с управляемой очередью: создать задачу, получить состояние, дождаться результата или отменить. Кейс показывает архитектуру и поведение backend, а не вымышленный рекламный dashboard.

## ORIGINAL

Приватный meta-ads-service, commit f95b85b0f33bef68bdaa03cf0967c3c61f3522d9. Python/FastAPI/Pydantic, asyncio worker pool, in-memory repository, FileResultStore, GraphQL adapter и curl_cffi. Исследованы README, отчёты фаз, модели, API schemas/routes, JobService, scraper context, isolation и тесты. README описывает завершённые фазы 0–1, дальнейшая proxy rotation/load test обозначена как не начатая.

## VERIFIED

33 исходных unit/integration теста пройдены: parser, repository/store, lifecycle, queue, cancel, timeout, isolation, auth, validation, API result и safe errors. Тесты используют fake transport; это не живой сбор с Meta. Прогон выполнен с доступными FastAPI/Pydantic runtime и curl_cffi 0.16.0; версии окружения не заявляются как точное воспроизведение lock. Имеются 14 предупреждений совместимости event loop/deprecated runtime, ошибок нет.

Локальная презентация вызывает исходный create_app и JobService. Успешный запрос получает 202, проходит worker, выдаёт JSON результата. Демонстрационный upstream failure даёт failed/409. DELETE приводит к cancelled/409. QA на 390/768/1440 и кейс на 320/390/768/1440; нет переполнения, искажения устройств и несоответствия постеров видео. Финальные кадры desktop/mobile просмотрены.

## PORTFOLIO POLISH

Создана отдельная техническая веб-презентация: входные параметры, ход выполнения, реальные HTTP-статусы и ответ API. Она прямо подписана как новый инструмент презентации, а не исходный frontend. Сам backend не переписывался для красивого результата. Обложка показывает точный интерфейс этой презентации.

## DEMO / MOCK

Mock только на границе ScraperCore: три вымышленных объявления чайной мастерской, подготовленный failure и кооперативно отменяемая задержка. Очередь, state transitions, auth, обработка ошибок и файл результата исполняются исходным кодом. Demo API key создан специально для loopback-сервера, это не секрет production. Cookies, аккаунты, прокси и Meta-сеть не используются.

## PLANNED / ОГРАНИЧЕНИЯ

Живой upstream, доступность GraphQL и production нагрузка не проверены. Repository и очередь в памяти: после restart история задач не восстанавливается; multi-worker требует другой архитектуры. Phase 2 rotation/load test не показывается как реализованная функция. Публичный показ приватного проекта и роль Никиты требуют подтверждения.

## Материалы

Master desktop/mobile: input → processing → output, failure, cancel. Overview/request/result/failure/cancel screenshots, cover, storyboard, qa.json. Телефонная версия — адаптивная презентация API, не заявление о существовавшем мобильном приложении.
