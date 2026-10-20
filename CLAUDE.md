# Карта портфолио Никиты Солонухи: что где лежит

Три разных варианта сайта. Не путать.

| # | Вариант | Технологии | Папка на ПК | GitHub | Vercel-проект | Адрес |
|---|---|---|---|---|---|---|
| 1 | **ОСНОВНОЙ** (продакшен) | статический HTML | `Рабочий стол\мой новый сайт` | `nikitasolonukha/nikita-solonukha-portfolio` | `nikita-solonukha-portfolio` | **solonflowai.ru** и nikita-solonukha-portfolio.vercel.app |
| 2 | Старый React | React + Vite | папка `nikita-solonukha---digital-transformation (2)` на рабочем столе, ветка `master` | `nikitasolonukha/solonflowai-portfolio` | `solonflowai-portfolio` | только vercel.app-адрес проекта (домен перенесён на вариант 1) |
| 3 | Эксперимент Jack-style | React + Vite | папка `nikita-solonukha---digital-transformation (2)` на рабочем столе, ветка `experiment/jack-style` | `nikitasolonukha/portfolio-v3-react-jack-style` (ветка `main` = эта ветка) | не задеплоен | только локально (`npm run dev`) |

## Правила
- Правки основного сайта делать ТОЛЬКО в `Рабочий стол\мой новый сайт`. Деплой: `vercel --prod` из этой папки (проект `nikita-solonukha-portfolio`).
- Эта папка (`nikita-solonukha---digital-transformation (2)`) — React-версии (2 и 3). На прод-домен они НЕ влияют.
- `.vercel/project.json` здесь привязан к `solonflowai-portfolio` (вариант 2). Не деплоить отсюда, ожидая обновить основной сайт.
- Откат эксперимента: `git checkout master` (см. EXPERIMENT_RESTORE.md).
- Домен solonflowai.ru куплен на Beget, DNS управляется там.
- Исходная копия статики осталась в `Documents\Codex\2026-09-20\files-pasted-by-the-user-full\outputs\nikita-solonukha-portfolio-public` — не использовать, рабочая версия теперь в «мой новый сайт».
