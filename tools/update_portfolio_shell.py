"""Keep static Work fallback aligned with the runtime catalog after NDA case split."""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
site=ROOT/'site'
for name in ('index.html','work.html','archive.html'):
    path=site/name
    text=path.read_text(encoding='utf-8').replace('app.js?v=20260923-copy-v1','app.js?v=20260923-presentation-v1')
    if name=='work.html':
        if 'href="case-internal-legal.html"' not in text:
            new='<a class="project-row" href="case-internal-legal.html" aria-label="Открыть кейс Внутренние продукты NDA"><span class="project-row-name"><strong>Внутренние продукты · NDA</strong><small>CRM, телефония, web-инструменты, документы и интеграции — обезличенный кейс.</small></span><span class="project-row-category">Автоматизация</span><span class="project-row-type">Архитектура и интеграции</span><span class="project-row-evidence">NDA</span></a>'
            text,count=re.subn(r'(<a class="project-row" href="case-legal-automation\.html".*?</a>)',lambda m:m.group(1)+new,text,count=1,flags=re.S)
            if count!=1: raise ValueError('AI Sales static work row not found')
        text=text.replace('Архив <small>23 проекта</small>','Архив <small>22 проекта</small>')
    path.write_text(text,encoding='utf-8')
