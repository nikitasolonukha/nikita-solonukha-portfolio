# Telegram Intel

Основная портфолио-страница: `site/case-telegram-intel.html`. Главная визуальная поверхность — безопасная реконструкция подтверждённых команд и карточек Telegram-бота; приватный код и реальные аккаунты не публикуются.

**Статус: READY.** Приватный исходник; в портфолио показан безопасный локальный replay без реальных аккаунтов и данных.

Telegram-бот для мониторинга профессиональных каналов: пользователь выбирает темы, получает свежие публикации, ищет по архиву, создаёт алерты и открывает вторичный Mini App.

## ORIGINAL

Исследован приватный `telegram-intel-bot`, commit `480eac969367203774c21f73d24aee9a0f1b52b8`. Основной пользовательский интерфейс — Telegram Bot API. В исходнике подтверждены `/start`, `/today`, `/hot`, `/search`, `/digest`, `/signals`, `/alert`, `/topics`, `/watch`, `/schedule`, карточки публикаций и inline-кнопки. Mini App на React — дополнительный кабинет, а не замена Telegram.

Backend: FastAPI, SQLAlchemy, SQLite/PostgreSQL; сбор каналов через Telethon; опциональные Meilisearch и AI summaries.

## VERIFIED

45 исходных тестов dedup, Telegram auth, trending, signals и search index прошли. API локально работал с реальной SQLite и исходными сервисами. Команды, подписи кнопок и структура карточек в новом walkthrough сверены с `app/bot/handlers.py`, `app/bot/keyboards.py` и `app/telegram_ui/cards.py`.

Browser QA Telegram replay: 1440×900 и 390×844, ошибок страницы нет, горизонтального переполнения нет, сломанных изображений нет. Видео длится 20.48 секунды на каждом размере.

## PORTFOLIO POLISH

Предыдущая аналитическая web-панель перестала быть главным доказательством. Новый кейс показывает настоящий Telegram flow: onboarding → темы → публикация → алерт → digest → переход в Mini App. Desktop оформлен как Telegram workspace, mobile — как чистый чат без пустого верхнего поля.

## DEMO / MOCK

Сообщения, каналы, даты и результаты синтетические. Внешняя сеть Telegram, Telethon ingest, доставка и внешние AI-сервисы отключены. Интерфейс локально воспроизводит существовавшие команды и состояния, но не отправляет сообщения реальным пользователям.

## НЕ ПРОВЕРЕНО / ОГРАНИЧЕНИЯ

Production Telegram auth и доставка, PostgreSQL, Meilisearch и AI summaries в этом прогоне не запускались. Публичная роль Никиты и разрешение раскрывать приватный исходник не выводятся из наличия локального доступа; код не публикуется.

## Материалы

- `master-desktop-v2.mp4` — Telegram flow на desktop.
- `master-mobile-v2.mp4` — тот же flow в мобильном чате.
- `telegram-start`, `telegram-today`, `telegram-alert`, `telegram-digest` — ключевые состояния на 1440 и 390.
