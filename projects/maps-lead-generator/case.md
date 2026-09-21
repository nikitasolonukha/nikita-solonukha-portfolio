# Atlas / Leads — B2B-лидогенератор из Google Maps

**Статус: READY.** Авторство workflow подтверждено Никитой; внешний execution заменён безопасным demo replay.

## Что это

n8n-сценарий принимает нишу и город, получает карточки организаций, нормализует поля, сверяет результат с существующей таблицей, обходит сайты, извлекает email и обновляет Google Sheets.

## ORIGINAL

- экспорт `ищет клиентов через карты.json`, workflow `Leads`;
- 15 узлов и два прохода обработки;
- Chat Trigger и ручной запуск существующих строк;
- HTTP-поиск организаций;
- Google Sheets read, append и update;
- AI Agent + Structured Output Parser для email;
- развилки для дублей, отсутствующего сайта и пустого результата.

Авторство подтверждено пользователем. Экспорт не публикуется: в нём есть ссылки на credentials.

## VERIFIED

Безопасно проверены имена и типы узлов, связи, два прохода и credential references. Новая UI-запись прошла на 1440×900 и 390×844: page errors 0, horizontal overflow 0, broken images 0. Проверены настройка запроса, шесть этапов, 12 строк, company detail, фильтр 10 записей с email и workflow detail.

## PORTFOLIO POLISH

Прежний презентационный лендинг заменён на плотный B2B workspace. Основной экран теперь таблица компаний, а не hero и KPI-карточки. Есть рабочая навигация, сохранённые списки, настройка поиска, компактный run trace, фильтры, detail drawer и экспорт. Композиция опирается на реальные table-first enrichment/prospecting patterns, но не копирует конкретный продукт.

## DEMO / MOCK

Google Maps, сайты, модель и Google Sheets не вызываются. Двенадцать компаний и контакты вымышлены; локальные задержки воспроизводят последовательность существующего workflow. Demo не доказывает актуальную доступность внешних интеграций.

## SCREEN → ACTION → STATE → RESULT

Настройки → ниша, город, рейтинг → готовая конфигурация.

Запуск → 6 визуальных этапов → 12 компаний / 10 email / 8 новых.

Таблица → открыть строку → полный company record и enrichment history.

Фильтр → «С email» → 10 подходящих строк.

Workflow → детали → проверенная топология 15 узлов и граница demo.

## Материалы

- `master-desktop-v2.webm` / `master-mobile-v2.webm`;
- `cover-v2.webp`, desktop/mobile posters;
- settings, table, detail, email filter и workflow screenshots;
- `qa-v2.json` и `storyboard.md`.

## Reconciliation, 22.09.2026

Atlas / Leads (n8n Maps enrichment) и Beauty Lead Hunter (Python/Playwright/Streamlit/SQLite) объединены в один редакционный B2B Lead Generator. Это две реализации одного направления, не один общий backend. Материалы второй реализации сохранены в `../beauty-lead/` и включены в страницу кейса. Telegram AI Lead Hunter остаётся отдельным продуктом; MTProto относится к нему.

## Объединённый walkthrough, 22.09.2026

Создан `master-combined.mp4` как монтаж уже проверенных локальных записей обеих составляющих. Он не утверждает единую live production-интеграцию между demo-средами. Отдельные исходные видеозаписи и скриншоты сохранены.
