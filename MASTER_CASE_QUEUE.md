# MASTER CASE QUEUE

Каноническая публичная структура. Одна строка ниже соответствует одной карточке `portfolio/data.json` и одной странице `review/`. Остальные исходные имена и исключения сохранены отдельным списком.

| № | Проект | Статус | Кейс |
|---:|---|---|---|
| 01 | KONTUR | READY | [protective-structures](review/protective-structures.html) |
| 02 | LexLegal | READY | [lexlegal](review/lexlegal.html) |
| 03 | MAGNUM | READY | [magnum](review/magnum.html) |
| 04 | Живые фото | READY | [photo-animation](review/photo-animation.html) |
| 05 | Колесо Фортуны | READY | [roulette](review/roulette.html) |
| 06 | Татьяна | READY | [tatiana](review/tatiana.html) |
| 07 | PP BOT | READY | [ppbot](review/ppbot.html) |
| 08 | GIGANT | READY | [gigant](review/gigant.html) |
| 09 | Desert Wheels | READY | [desert-wheels](review/desert-wheels.html) |
| 10 | Women Strange | READY | [women-strange](review/women-strange.html) |
| 11 | Linux Lab | READY | [linux-lab](review/linux-lab.html) |
| 12 | Пифпаф | READY | [pifpaf](review/pifpaf.html) |
| 13 | Shopify Store Builder | READY | [shopify-store-builder](review/shopify-store-builder.html) |
| 14 | Ритм | READY | [ritm](review/ritm.html) |
| 15 | Портной | READY | [portnoy](review/portnoy.html) |
| 16 | Vibe AutoRouter | READY | [vibe-autorouter](site/case-vibe-autorouter.html) |
| 17 | AI Support | READY | [support-rag](site/case-support-rag.html) |
| 18 | Трек в подарок | READY | [trekpodarok](review/trekpodarok.html) |
| 19 | GARMONY | READY | [garmony](review/garmony.html) |
| 20 | EP Beauty | READY | [ep-beauty](review/ep-beauty.html) |
| 21 | Solonflow | READY | [portfolio-archive](review/portfolio-archive.html) |
| 22 | Meta Ads Library Collector | READY | [meta-ads](review/meta-ads.html) |
| 23 | Степ | READY | [stepbystep](review/stepbystep.html) |
| 24 | СказкаМоя | READY | [skazka](review/skazka.html) |
| 25 | Twitter / X Automation | READY | [twitter-automation](site/case-twitter-automation.html) |
| 26 | Telegram Schedule | READY | [telegram-schedule](site/case-telegram-schedule.html) |
| 27 | Telegram Intel | READY | [telegram-intel](site/case-telegram-intel.html) |
| 28 | Telegram AI Lead Hunter | READY | [telegram-leads](site/case-telegram-leads.html) |
| 29 | TopGadalkin | READY | [topgadalkin](review/topgadalkin.html) |
| 30 | B2B Lead Generator | READY | [maps-lead-generator](review/maps-lead-generator.html) |
| 31 | Личный AI-ассистент | BLOCKED | [personal-assistant](review/personal-assistant.html) |
| 32 | Telegram News · две версии | BLOCKED | [news-aggregator-archive](review/news-aggregator-archive.html) |
| 33 | n8n Copilot | BLOCKED | [copilot](review/copilot.html) |
| 34 | Университетские проекты | BLOCKED | [university-projects](review/university-projects.html) |
| 35 | AI Sales Assistant · NDA (внутренние продукты — контекст) | PRIVATE/NDA | [legal-automation](site/case-legal-automation.html) |

## Ограничения и непубличные кандидаты

- **ИИ-агент (RAG) — BLOCKED**: В Шаблоны для n8n найдены SuperRAG (42 узла) и Обновленный Ультимативный RAG (54). В последнем прямо указан автор Cole Medin. Обложка старого кейса — иллюстрация, не запись workflow. Нельзя доказать, какой экспорт и какие изменения принадлежат Никите. См. projects/rag-agent/case.md.
- **ИИ-агент (универсальный) — BLOCKED**: Найдены Ai sekretar (43 узла) и GPT/интернет (10 узлов). Есть Telegram, memory, routing и модели; нет Google Calendar nodes. Старый кейс обещает слоты, CRM и no-show, но точный экспорт этих сценариев не найден. Общих тегов недостаточно для идентификации. См. projects/universal-agent/case.md.
- **Поддержка и развитие коммерческих web-продуктов — PRIVATE/NDA**: NDA указан в исходном портфолио. Допустимо только согласованное обезличенное описание; исходники не раскрывать.
- **Бот подготовки к ЕГЭ и ОГЭ — BLOCKED**: Старый кандидат бота подготовки к ЕГЭ/ОГЭ сохранён в очереди. В scoped inventory рабочих папок и репозиториев не найден исполняемый код или запись учебного сценария. Другие Telegram-боты не подставляются вместо него. См. projects/exam-bot/case.md.

## Объединения и исключения

- `webchat` → `support-rag` (одна публичная карточка).
- `beauty-lead` → `maps-lead-generator` (одна публичная карточка).
- `protected-messages` → `university-projects` (одна публичная карточка).
- `npm-data-analysis` → `university-projects` (одна публичная карточка).
- `channel-monitor` → `university-projects` (одна публичная карточка).
- `store-builder-embedded` → `shopify-store-builder` (одна публичная карточка).
- `store-builder-demo` → `shopify-store-builder` (одна публичная карточка).
- `contactcard` — исключён из публичного портфолио.
- `nikita-chat` — исключён из публичного портфолио.
- `attendance` — исключён из публичного портфолио.
- `keys4` — исключён из публичного портфолио.
- `contentfactory` — исключён из публичного портфолио.
- `content-factory-marek` — исключён из публичного портфолио.
- `autoposting` — исключён из публичного портфолио.
- `business-cards` — исключён из публичного портфолио.
- `tarot-archive` → `topgadalkin` (одна публичная карточка).
- `portfolio-archive` и `photo-animation`: исторические имена/версии объединены внутри своих карточек.
- `telegram-leads` отдельный от B2B Lead Generator; MTProto — часть Telegram lead case.
- `autoposting` отдельно не публикуется; связь с юридической системой не подтверждена.

Статусы `BLOCKED` в публичной сетке означают честно показанный архивный кейс с недостающим исходным визуальным доказательством. Это не означает проверенный production runtime.
