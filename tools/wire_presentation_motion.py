from pathlib import Path

site=Path(__file__).resolve().parents[1]/'site'
slugs=('legal-automation','support-rag','telegram-leads','telegram-schedule','twitter-automation','telegram-intel','vibe-autorouter','gigant')
addition='<link rel="stylesheet" href="presentation-motion.css?v=1"><script src="presentation-motion.js?v=1" defer></script>'
for slug in slugs:
    path=site/f'case-{slug}.html'
    page=path.read_text(encoding='utf-8')
    if 'presentation-motion.js' not in page:
        page=page.replace('</head>',addition+'</head>',1)
        path.write_text(page,encoding='utf-8')
