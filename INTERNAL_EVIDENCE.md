# Внутренние доказательства и ограничения

Эти записи предназначены для исследования и QA. Публичный шаблон не выводит поля `proof` и `boundary`.

## KONTUR

SOURCE: [case.md](projects/protective-structures/case.md)
PROOF: Проверены экраны 1440 и 390 px; есть записи desktop и mobile. Реальные построенные объекты не заявляются.
LIMITATIONS: Frontend и демонстрационная форма. Реальные объекты и инженерные расчёты не заявляются.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## LexLegal

SOURCE: [case.md](projects/lexlegal/case.md)
PROOF: В основе найденный экспорт Mobirise; presentation-слой и исходная версия в кейсе разделены.
LIMITATIONS: Редизайн найденного Mobirise-экспорта. Новый визуальный слой отделён от исторического проекта.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## MAGNUM

SOURCE: [case.md](projects/magnum/case.md)
PROOF: Авторские видеозаписи подтверждают исходный сайт; интерактивная версия для портфолио отмечена отдельно.
LIMITATIONS: ORIGINAL подтверждён авторскими видео. Новая интерактивная версия честно обозначена как PORTFOLIO POLISH по реальным материалам проекта.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Живые фото

SOURCE: [case.md](projects/photo-animation/case.md)
PROOF: Проверены адаптивные экраны 390/768/1440; обработчик Telegram-бота в исходниках не найден.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Колесо Фортуны

SOURCE: [case.md](projects/roulette/case.md)
PROOF: Проверены 32 сектора и мобильный/десктопный интерфейс; публичное демо не отправляет webhooks.
LIMITATIONS: В публичном preview Telegram SDK и webhook отключены, реальные призы не выдаются. Демо показывает существующий пользовательский сценарий.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Татьяна

SOURCE: [case.md](projects/tatiana/case.md)
PROOF: Исходник собран Vite; вкладки, меню и контакты проверены на 390/768/1440 без overflow.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## PP BOT

SOURCE: [case.md](projects/ppbot/case.md)
PROOF: По сообщению Никиты на основе выгрузки воронки: 22–24 июня — 111 пользователей и 28 оплат (28/111 ≈ 25,2%); на 26 июня — 149 пользователей и 35 оплат (35/149 ≈ 23,5%). Исходная выгрузка в текущем пакете не найдена. В репозитории ppbot также есть JSON с 125 рецептами и Canvas reader.
LIMITATIONS: Запущенный Telegram-продукт и локальная portfolio-версия WebApp — разные слои. Реальные Telegram-материалы сохранены; экран синтетического рецепта удалён из публичной презентации по просьбе автора.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## GIGANT

SOURCE: [case.md](projects/gigant/case.md)
PROOF: 61 тест core agent loop прошёл в изоляции; интерфейс кейса — локальная демонстрация, не оригинальный UI.
LIMITATIONS: Новая демонстрационная панель; исходная логика и локальные адаптеры описаны в кейсе.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Desert Wheels

SOURCE: [case.md](projects/desert-wheels/case.md)
PROOF: React/TypeScript/Vite build пройден; значения демонстрационные, не подтверждённая доходность.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Women Strange

SOURCE: [case.md](projects/women-strange/case.md)
PROOF: В исходном сайте пять фотографий из папки проекта; корзины и онлайн-оплаты в найденной версии нет.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Linux Lab

SOURCE: [case.md](projects/linux-lab/case.md)
PROOF: Из DOCX извлечены текст и девять оригинальных иллюстраций; production-система безопасности не заявляется.
LIMITATIONS: Архивные снимки из отчётов. Это не запись работающей виртуальной машины.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Пифпаф

SOURCE: [case.md](projects/pifpaf/case.md)
PROOF: Проверены 8 маршрутов; 56 тестов PASS, 2 SKIP. Живой Apify/Instagram сейчас не подтверждён.
LIMITATIONS: Запись использует локальные ответы API и вымышленные ролики. Живой сбор Apify не выполнялся.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Shopify Store Builder

SOURCE: [case.md](projects/shopify-store-builder/case.md)
PROOF: Embedded-часть ранее прошла 132 локальных теста; Shopify preview проверен на desktop и mobile.
LIMITATIONS: V3 — локальный portfolio polish на проверенных данных и фотографиях. Отдельный original walkthrough сохраняет реальный Shopify preview. Платёж и заказ не выполнялись.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Ритм

SOURCE: [case.md](projects/ritm/case.md)
PROOF: Проверен полный цикл тренировки; 58 тестов, TypeScript и production build прошли.
LIMITATIONS: Portfolio polish: Charcoal Violet #3C1A47 и ограниченный Cyber Lime #B6FF00. Данные демонстрационные; внешняя синхронизация не подключена.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Портной

SOURCE: [case.md](projects/portnoy/case.md)
PROOF: Для кейса записан реальный 3D-конфигуратор; лицензия модели и изменения указаны отдельно.
LIMITATIONS: Локальная версия с подготовленными данными. 3D-модель — работа Style3D CG по CC Attribution; конструктивные отличия костюма достоверно показаны в 2D.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Vibe AutoRouter

SOURCE: [case.md](projects/vibe-autorouter/case.md)
PROOF: Проверены 10 классов аварийных сценариев; внешние генерации в тесте не запускались.
LIMITATIONS: Локальное demo использует исходные classifier, ranking и FakeVibeClient. Production worker, PostgreSQL и внешние генерации не проверены в этом показе.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## AI Support

SOURCE: [case.md](projects/support-rag/case.md)
PROOF: Автор подтвердил сценарий отправки от аккаунта поддержки. Есть обезличенный Telegram-экран и 12 локальных API-проверок; сквозная отправка не переснята.
LIMITATIONS: Отправка от аккаунта поддержки подтверждена автором как часть исходного продукта. Сквозной live-run с аккаунтом сейчас не переснят; Telegram-экран обезличен, webchat и AI replay проверены отдельно.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Трек в подарок

SOURCE: [case.md](projects/trekpodarok/case.md)
PROOF: В кейсе показан реальный интерфейс сайта; выполнение заказа и продажи не заявляются.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## GARMONY

SOURCE: [case.md](projects/garmony/case.md)
PROOF: Визуальная версия и адаптивные экраны представлены в кейсе; отправка реальной заявки не заявляется.
LIMITATIONS: Визуальные доработки сделаны в этой задаче. Контакты и запросы — демонстрационные.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## EP Beauty

SOURCE: [case.md](projects/ep-beauty/case.md)
PROOF: Показаны desktop и mobile версии; отправка заявки и реальные конверсии не утверждаются.
LIMITATIONS: Новый дизайн подготовлен для портфолио. Изображения не выдаются за реальные фотографии студии.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Solonflow

SOURCE: [case.md](projects/portfolio-archive/case.md)
PROOF: Существовал опубликованный сайт solonflowai-portfolio.vercel.app; сохранены кадры и запись.
LIMITATIONS: Видео и основные screenshots сняты 21 сентября 2026 с живого solonflowai-portfolio.vercel.app. Локальная polish-версия сохранена только как отдельный исследовательский слой.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Meta Ads Library Collector

SOURCE: [case.md](projects/meta-ads/case.md)
PROOF: 33 теста покрывают parser, lifecycle jobs, cancel, timeout и API result; видны креативы, рекламодатель, текст, даты, CTA и ссылки.
LIMITATIONS: Исходный backend и live collection verified. Portfolio UI — отдельный presentation layer; публичные Meta creatives используются как replay/demo evidence.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Степ

SOURCE: [case.md](projects/stepbystep/case.md)
PROOF: В продукте 20 маршрутов; основные сценарии и состояния проверены локально.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## СказкаМоя

SOURCE: [case.md](projects/skazka/case.md)
PROOF: В исходной странице есть 4 тарифа и 5 FAQ; генерация книги и оплата не подтверждены.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Twitter / X Automation

SOURCE: [case.md](projects/twitter-automation/case.md)
PROOF: 9 контрактных тестов прошли; живую отправку в X не заявляем.
LIMITATIONS: X-first demo replay. Профили и публикации вымышлены; аккаунты, DOM X и внешние действия отключены.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Telegram Schedule

SOURCE: [case.md](projects/telegram-schedule/case.md)
PROOF: Локально проверен сценарий process_folder; реальная массовая отправка в публичном демо не выполняется.
LIMITATIONS: Логика проверена на исходной функции; Telegram UI и данные обезличены, внешние отправки отключены.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Telegram Intel

SOURCE: [case.md](projects/telegram-intel/case.md)
PROOF: 45 тестов проекта прошли; в публичном сценарии используются синтетические данные.
LIMITATIONS: Команды и карточки подтверждены исходником; данные синтетические, Telegram network отключён.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Telegram AI Lead Hunter

SOURCE: [case.md](projects/telegram-leads/case.md)
PROOF: Есть обезличенный исходный Telegram-кадр и локальные проверки ingest/replay; production-отправка не подтверждена.
LIMITATIONS: Главный экран — реальный обезличенный Telegram UI. Видео ниже — безопасный локальный replay исходной parser/webhook/ingest-логики; внешних отправок нет.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## TopGadalkin

SOURCE: [case.md](projects/topgadalkin/case.md)
PROOF: Код checkout и webhook есть; реальные платежи и выполнение бота не проверялись.
LIMITATIONS: Локальная portfolio-версия. Исходник, доработки и demo-состояния разделены в описании.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## B2B Lead Generator

SOURCE: [case.md](projects/maps-lead-generator/case.md)
PROOF: Проверены workflow и таблица на демонстрационных данных; живые клиентские конверсии не заявляются.
LIMITATIONS: Atlas / Leads и Beauty Lead Hunter объединены редакционно как один B2B-кейс. Это две реализации; данные в демо синтетические, сетевой сбор и outreach отключены.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Личный AI-ассистент

SOURCE: [case.md](projects/personal-assistant/case.md)
PROOF: Автор подтвердил проект; исходный n8n canvas и live-запись сейчас недоступны.
LIMITATIONS: Авторство подтверждено автором. Архивная обложка — иллюстрация; точный n8n canvas и Telegram flow ещё отсутствуют. Видео реконструкции не используется как доказательство.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Telegram News · две версии

SOURCE: [case.md](projects/news-aggregator-archive/case.md)
PROOF: Университетский проект готов; личная версия в разработке. Оригинальный Telegram UI сохранён не полностью.
LIMITATIONS: Версии не смешаны. Исходный Telegram UI личного дайджеста не найден; университетский исходный код проверен, но Telegram-запись также не найдена. Архивное видео реконструкции не выдаётся за Telegram.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## n8n Copilot

SOURCE: [case.md](projects/copilot/case.md)
PROOF: Найдено видео этапов Notion Raw/L1; оригинальный n8n export пока отсутствует.
LIMITATIONS: Главный визуал — настоящий Notion UI из записи Никиты от 10.01.2026. Видео подтверждает первый слой; остальные слои описаны в исходной спецификации. Оно не показывает n8n nodes или Telegram.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Университетские проекты

SOURCE: [case.md](projects/university-projects/case.md)
PROOF: Для parser найден исходный код; первые две работы представлены архивными материалами.
LIMITATIONS: Umbrella-case, не один технический продукт. Для первых двух работ runtime не найден; для parser исходный код доступен, но реальный Telegram UI пока не записан.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## AI Sales Assistant

SOURCE: [case.md](projects/legal-automation/case.md)
PROOF: Автор предоставил показатели рабочего отчёта: 155 звонков, 54 разговора с AI-анализом. Исходный отчёт и разговоры не публикуются из-за NDA; пример на странице демонстрационный.
LIMITATIONS: Визуальная подача — обезличенная презентация подтверждённого автором процесса, не снимок внутреннего интерфейса. 155/54 — показатели автора; исходный отчёт закрыт NDA.
TESTS / QA: см. файлы проекта и исследовательские материалы.

## Внутренние продукты · NDA

SOURCE: [case.md](projects/internal-legal/case.md)
PROOF: Авторское описание; для AI Sales подтверждены 155 звонков и 54 AI-разбора, другие результаты не заявляются.
LIMITATIONS: Название компании, данные клиентов и внутренние интерфейсы скрыты; подробные результаты доступны только по AI Sales Assistant.
TESTS / QA: см. файлы проекта и исследовательские материалы.
