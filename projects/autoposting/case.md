# Autopost — API-очередь публикаций

**Статус: READY.** Приватный backend показан через безопасный API-first replay.

## СОПОСТАВЛЕНИЕ

Папки `Сервисы/autoposting-main` и `Сервисы/автопостинг` — две копии одного сервиса: SHA-256 ключевого `autopost_service.py` совпадает (`272524E5…97665`). Признаков связи с внутренней системой юридической компании или отдельным Telegram-ботом в исходнике нет. Проект не объединён с кейсом Telegram-рассылки; запись `рассылкаnew.mp4` относится к отдельному browser automation сценарию.

## ORIGINAL

Исследован `autoposting/автопостинг`, commit `287c22ec1ff41a60adfae6c5bd8d2ffaeb46b102`: FastAPI router, `AutopostService`, worker, доменные модели, stub repositories и Upload-Post client. Сервис создаёт publish job, выбирает активный social account, обрабатывает pending queue и сохраняет `published_post_id`. Поддерживаемый enum площадок включает Telegram, VK, OK, Instagram, TikTok, Facebook, YouTube и Pinterest; в исходных stub-аккаунтах подготовлены Instagram, YouTube, TikTok, Facebook и Pinterest.

## VERIFIED

Исходный service выполнен с in-memory repositories и локальным Upload-Post adapter. Проверены success, network retry, recovery success, validation failed, authentication failed, future schedule, HTTP 422 на неверное задание и HTTP 400 на неизвестный фильтр. Внешних публикаций: 0.

Browser QA нового replay: 1440×900 и 390×844, ошибок страницы нет, горизонтального переполнения нет, сломанных изображений нет. Видео 18.08 секунды.

## PORTFOLIO POLISH

Старый generic dashboard заменён на интерфейс, соответствующий сущности продукта: request builder для `POST /autopost/jobs`, очередь, lifecycle trace и фактический JSON response. Пользователь видит input → pending → worker → retry/success/failed.

## DEMO / MOCK

Тексты, media URL, аккаунты и ответы Upload-Post синтетические. Кнопки запускают исходный service через локальный FastAPI; сетевой transport заменён mock-клиентом. «Transport online» меняет demo-сценарий и повторно запускает реальный обработчик.

## ОГРАНИЧЕНИЯ

Постоянной БД в найденной версии нет; очередь хранится в памяти. Не проверены реальные social credentials, production worker concurrency, distributed locks и backoff. Публичный frontend у оригинала отсутствовал, поэтому API console — новый presentation layer, а не исторический интерфейс.
