"""Apply the editorial content source to portfolio entry pages and standalone reviews."""
from pathlib import Path
import json
import html
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://nikitasolonukha.github.io/nikita-solonukha-portfolio'
data = {p['id']:p for p in json.loads((ROOT/'portfolio/data.json').read_text(encoding='utf-8'))}
app_js=(ROOT/'site/app.js').read_text(encoding='utf-8')
selected_ids=re.findall(r"'([^']+)'",re.search(r'const selectedIds = \[(.*?)\];',app_js).group(1))
work_ids=re.findall(r"'([^']+)'",re.search(r'const workIds = \[(.*?)\];',app_js).group(1))
archive_ids=[id for id in data if id not in work_ids]

def esc(s): return html.escape(s, quote=True)

def clear_generated_meta(page):
    page = re.sub(r'<link rel="canonical" href="[^"]*">', '', page)
    page = re.sub(r'<meta property="og:[^"]+" content="[^"]*">', '', page)
    page = re.sub(r'<meta name="twitter:[^"]+" content="[^"]*">', '', page)
    return page

def project_url(id):
    if id in ('roulette','photo-animation','ep-beauty','trekpodarok','skazka','topgadalkin'):
        return f'../review/{id}.html'
    return f'case-{id}.html'

def static_rows(ids):
    return ''.join(f'<a class="project-row" href="{project_url(id)}" aria-label="Открыть кейс {esc(data[id]["name"])}"><span class="project-row-name"><strong>{esc(data[id]["shortTitle"])}</strong><small>{esc(data[id]["shortDescription"])}</small></span><span class="project-row-category">{esc(data[id]["category"])}</span><span class="project-row-type">Разработка</span><span class="project-row-evidence">Кейс</span></a>' for id in ids)

def static_selected(ids):
    result=[]
    for n,id in enumerate(ids,1):
        p=data[id]; image='../portfolio/'+p['desktop']
        result.append(f'<article class="featured"><a class="featured-image" href="{project_url(id)}" aria-label="Открыть кейс {esc(p["name"])}"><img src="{esc(image)}" alt="{esc(p["shortDescription"])}" loading="lazy"></a><div class="featured-copy"><div><span class="featured-index">{n:02d} / {len(ids):02d}</span><span>{esc(p["category"])}</span></div><h3><a href="{project_url(id)}">{esc(p["name"])} <span aria-hidden="true">↗</span></a></h3><p>{esc(p["shortDescription"])}</p></div></article>')
    return ''.join(result)

def add_fallback(page, opening_tag, markup):
    start='<!-- STATIC_CONTENT_START -->'; end='<!-- STATIC_CONTENT_END -->'
    if start in page:
        return re.sub(re.escape(start)+r'.*?'+re.escape(end),start+markup+end,page,count=1,flags=re.S)
    return page.replace(opening_tag+'</div>',opening_tag+start+markup+end+'</div>',1)

PAGES = {
    'index.html': ('Никита Солонуха — Full-stack разработчик | AI-автоматизация и веб-продукты', 'Разрабатываю веб-сервисы, AI-агентов, RAG-системы, Telegram-ботов и автоматизации на Python, React и n8n. От интерфейса до API и запуска.', '/site/'),
    'about.html': ('Обо мне — Full-stack и AI-разработка | Никита Солонуха', 'Разрабатываю веб-сервисы, AI-агентов, RAG и Telegram-ботов. Проектирую интерфейс, backend, API и интеграции, затем проверяю результат.', '/site/about.html'),
    'work.html': ('Работы — веб-сервисы, AI и автоматизация | Никита Солонуха', 'Кейсы веб-продуктов, AI-систем, Telegram-ботов и автоматизаций: задача, вклад разработчика, работающий результат и реальные интерфейсы.', '/site/work.html'),
    'archive.html': ('Архив проектов — сайты и автоматизация | Никита Солонуха', 'Ранние и специализированные проекты Никиты Солонухи: сайты, Telegram-боты, инструменты для бизнеса и учебные разработки.', '/site/archive.html'),
    'contact.html': ('Контакт — обсудить разработку | Никита Солонуха', 'Связаться с Никитой Солонухой по поводу веб-сервиса, AI-автоматизации, Telegram-бота или разработки сайта.', '/site/contact.html'),
}

def meta_tags(title, description, canonical, image, kind='website'):
    return ''.join([
        f'<link rel="canonical" href="{esc(canonical)}">',
        f'<meta property="og:type" content="{kind}">',
        f'<meta property="og:title" content="{esc(title)}">',
        f'<meta property="og:description" content="{esc(description)}">',
        f'<meta property="og:url" content="{esc(canonical)}">',
        f'<meta property="og:image" content="{esc(image)}">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{esc(title)}">',
        f'<meta name="twitter:description" content="{esc(description)}">',
        f'<meta name="twitter:image" content="{esc(image)}">',
    ])

for filename, (title, desc, path) in PAGES.items():
    file = ROOT/'site'/filename
    page = clear_generated_meta(file.read_text(encoding='utf-8'))
    page = re.sub(r'<title>.*?</title>', f'<title>{esc(title)}</title>', page, count=1)
    page = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(desc)}">', page, count=1)
    page = page.replace('</head>', meta_tags(title, desc, BASE+path, BASE+'/site/media/nikita.webp')+'</head>', 1)
    page = page.replace('app.js?v=20260923-roulette-v3', 'app.js?v=20260923-copy-v1')
    page = page.replace('editorial.css?v=20260922-d', 'editorial.css?v=20260923-copy-v1')
    if filename == 'index.html':
        page = re.sub(r'(class="all-work-link"[^>]*>.*?<span>)\d+ проекта?ов?', rf'\g<1>{len(work_ids)} проектов', page, count=1, flags=re.S)
        page = page.replace('<h1 id="hero-title" class="sr-only">Никита Солонуха</h1>', '<h1 id="hero-title" class="sr-only">Никита Солонуха — Full-stack разработчик и специалист по AI-автоматизации</h1>')
        page = page.replace('Создаю цифровые продукты — от первого сценария до рабочего запуска.', 'Разрабатываю веб-продукты, AI-системы и автоматизации под реальные задачи бизнеса.')
        page = page.replace('Сайты, веб-сервисы, AI-системы, backend и интеграции.', 'Собираю интерфейс, backend, базы данных и интеграции в один работающий продукт — от Telegram-ботов и RAG-поддержки до внутренних сервисов, аналитики и ecommerce.')
        schema = {'@context':'https://schema.org','@graph':[
            {'@type':'Person','name':'Никита Солонуха','jobTitle':['Full-stack Developer','AI Automation Developer'],'url':BASE+'/site/','sameAs':['https://github.com/nikitasolonukha','https://t.me/solonflowai'],'knowsAbout':['Веб-сервисы','AI-автоматизация','Telegram-боты','RAG']},
            {'@type':'WebSite','name':'Никита Солонуха — портфолио','url':BASE+'/site/','inLanguage':'ru-RU'}]}
        page = re.sub(r'<script type="application/ld\+json">.*?</script>', '', page, count=1)
        page = page.replace('</head>', '<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False,separators=(',',':'))+'</script></head>',1)
        page=add_fallback(page,'<div id="selected-list" class="selected-list" aria-live="polite">',static_selected(selected_ids))
    elif filename == 'about.html':
        page = page.replace('Я собираю цифровые продукты целиком: разбираюсь в задаче, проектирую сценарий, создаю интерфейс, backend и интеграции — затем проверяю результат в использовании.', 'Я full-stack разработчик: могу взять задачу от идеи или неполного ТЗ и довести её до работающего продукта. Проектирую сценарий, собираю интерфейс и backend, подключаю базы данных, AI-модели и внешние API, затем проверяю результат тестами.')
        page = page.replace('Мне интересна работа, в которой за красивым экраном стоит настоящая система: бот помогает человеку, магазин вырастает из данных товара, а внутренний процесс становится проще.', 'Чаще всего работаю с веб-сервисами, AI-автоматизацией, Telegram, RAG, n8n и внутренними инструментами бизнеса. Мне интересны задачи, где интерфейс, данные и бизнес-логика работают вместе.')
        page = page.replace('Показываю интерфейсы самих продуктов. Если запись оригинала недоступна, это отмечено; демо и полировка для портфолио не выдаются за production.', 'Работаю и с MVP, и с существующими продуктами: разбираю код, исправляю слабые места, подключаю интеграции и довожу интерфейс до рабочего состояния.')
    elif filename == 'work.html':
        page = re.sub(r'(<button type="button" data-kind="all" aria-pressed="true">Все <span>)\d+', rf'\g<1>{len(work_ids)}', page, count=1)
        page = re.sub(r'(<span>Архив <small>)\d+ проекта?ов?', rf'\g<1>{len(archive_ids)} проекта', page, count=1)
        page = page.replace('Сайты, сервисы и автоматизации. Внутри — настоящий интерфейс и сценарий, а не символическая картинка проекта.', 'Веб-продукты, AI-системы, автоматизация и сайты. В каждом кейсе показываю задачу, свою работу и результат — от интерфейса до backend и интеграций.')
        page=add_fallback(page,'<div id="work-grid" class="work-rows">',static_rows(work_ids))
    elif filename == 'archive.html':
        page = re.sub(r'(<h1>Архив <small>\()\d+', rf'\g<1>{len(archive_ids)}', page, count=1)
        page = page.replace('Более ранние и специализированные проекты. Там, где оригинальные материалы сохранились не полностью, это обозначено в кейсе.', 'Ранние и специализированные работы: сайты, боты, автоматизации и учебные проекты. В каждом кейсе указано, что удалось подтвердить.')
        page=add_fallback(page,'<div id="archive-list" class="archive-rows">',static_rows(archive_ids))
    file.write_text(page, encoding='utf-8')

for id in ('roulette','photo-animation','ep-beauty','trekpodarok','skazka','topgadalkin'):
    p=data[id]
    file=ROOT/'review'/f'{id}.html'
    page=clear_generated_meta(file.read_text(encoding='utf-8'))
    page=re.sub(r'<meta name="description" content="[^"]*">','',page)
    title=p['seoTitle']+' | Никита Солонуха'
    canonical=f'{BASE}/review/{id}.html'
    image=f'{BASE}/{p["desktop"][3:]}' if p['desktop'].startswith('../') else f'{BASE}/portfolio/{p["desktop"]}'
    page=re.sub(r'<title>.*?</title>',f'<title>{esc(title)}</title>',page,count=1)
    tags=f'<meta name="description" content="{esc(p["seoDescription"])}">'+meta_tags(title,p['seoDescription'],canonical,image,'article')
    page=page.replace('</head>',tags+'</head>',1)
    # The original visual composition is preserved; add a concise content block near the end.
    facts=f'<section class="copy-facts" style="padding:5rem max(16px,calc((100vw - 1320px)/2));background:#151519;color:#f1eee9"><div style="max-width:900px;margin:auto"><p style="font-size:1.1rem;line-height:1.6">{esc(p["caseIntro"])}</p><h2 style="font-size:1.6rem;margin-top:2rem">Задача</h2><p>{esc(p["problem"])}</p><h2 style="font-size:1.6rem;margin-top:2rem">Что я сделал</h2><p>{esc(p["built"])}</p><h2 style="font-size:1.6rem;margin-top:2rem">Результат</h2><p>{esc(p["result"])}</p><p style="opacity:.72;font-size:.9rem">{esc(p["proof"])}</p></div></section>'
    if 'class="copy-facts"' not in page:
        page=page.replace('</main>',facts+'</main>',1)
    file.write_text(page,encoding='utf-8')

print('Updated 5 portfolio entry pages and 6 visual-first review cases.')
