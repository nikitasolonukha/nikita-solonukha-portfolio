"""Validate public portfolio copy and write SEO_AUDIT.md."""
from pathlib import Path
from html.parser import HTMLParser
import json
import re
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
projects=json.loads((ROOT/'portfolio/data.json').read_text(encoding='utf-8'))
custom={'roulette','photo-animation','ep-beauty','trekpodarok','skazka','topgadalkin'}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=''; self.in_title=False; self.h1=0; self.description=''; self.canonical=''; self.og={}; self.twitter={}; self.images=[]; self.lang=''; self.robots=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang','')
        if tag=='title': self.in_title=True
        if tag=='h1': self.h1+=1
        if tag=='img': self.images.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='meta':
            if a.get('name')=='description': self.description=a.get('content','')
            if a.get('name')=='robots': self.robots=a.get('content','')
            if a.get('property','').startswith('og:'): self.og[a['property']]=a.get('content','')
            if a.get('name','').startswith('twitter:'): self.twitter[a['name']]=a.get('content','')
    def handle_endtag(self, tag):
        if tag=='title': self.in_title=False
    def handle_data(self, text):
        if self.in_title: self.title+=text

pages=[ROOT/'site'/name for name in ('index.html','about.html','work.html','archive.html','contact.html')]
pages += [ROOT/'review'/f'{p["id"]}.html' if p['id'] in custom else ROOT/'site'/f'case-{p["id"]}.html' for p in projects]
errors=[]; titles={}; descriptions={}; image_count=0
for path in pages:
    if not path.exists(): errors.append(f'Missing page: {path.relative_to(ROOT)}'); continue
    info=Page(); info.feed(path.read_text(encoding='utf-8'))
    label=path.relative_to(ROOT).as_posix()
    if not info.title: errors.append(f'{label}: no title')
    if not info.description: errors.append(f'{label}: no meta description')
    if info.title in titles: errors.append(f'{label}: duplicate title with {titles[info.title]}')
    if info.description in descriptions: errors.append(f'{label}: duplicate description with {descriptions[info.description]}')
    titles[info.title]=label; descriptions[info.description]=label
    if info.h1!=1: errors.append(f'{label}: {info.h1} H1 elements')
    if info.lang!='ru': errors.append(f'{label}: lang={info.lang}')
    if not info.canonical: errors.append(f'{label}: no canonical')
    if 'noindex' in info.robots: errors.append(f'{label}: noindex')
    if not all(info.og.get('og:'+k) for k in ('title','description','image')): errors.append(f'{label}: incomplete Open Graph')
    if not all(info.twitter.get('twitter:'+k) for k in ('card','title','description','image')): errors.append(f'{label}: incomplete Twitter card')
    for image in info.images:
        image_count+=1
        if 'alt' not in image: errors.append(f'{label}: img without alt: {image.get("src","")}')
for p in projects:
    for field in ('seoTitle','seoDescription','shortTitle','shortDescription','problem','built','result','proof','keywords','caseIntro'):
        if not p.get(field): errors.append(f'{p["id"]}: missing {field}')
    if len(p['seoTitle']+' | Никита Солонуха')>(75 if p['id']=='legal-automation' else 65): errors.append(f'{p["id"]}: SEO title too long')
    if len(p['seoDescription'])>165: errors.append(f'{p["id"]}: SEO description >165')
    public=' '.join(str(p.get(field,'')) for field in ('shortDescription','problem','built','result','proof','caseIntro'))
    if re.search(r'lorem|инновационн|революционн', public, re.I): errors.append(f'{p["id"]}: banned copy')
    if re.search(r'\b\d+[.,]?\d*\s*%', public): errors.append(f'{p["id"]}: percentage requires evidence review')
urls=ET.parse(ROOT/'sitemap.xml').getroot().findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
expected_urls=len(projects)+5
if len(urls)!=expected_urls: errors.append(f'Sitemap URLs: {len(urls)}, expected {expected_urls}')
if not (ROOT/'robots.txt').exists(): errors.append('robots.txt missing')
for filename, marker, expected in [('index.html','class="featured"',6),('work.html','class="project-row"',14),('archive.html','class="project-row"',22)]:
    count=(ROOT/'site'/filename).read_text(encoding='utf-8').count(marker)
    if count!=expected: errors.append(f'{filename}: {count} static project links, expected {expected}')

lines=['# SEO audit','',f'- Canonical projects: **{len(projects)}**',f'- Indexable HTML pages audited: **{len(pages)}**',f'- Unique page titles: **{len(titles)}**',f'- Unique meta descriptions: **{len(descriptions)}**',f'- Projects with Result: **{sum(bool(p.get("result")) for p in projects)}**',f'- Projects with Proof: **{sum(bool(p.get("proof")) for p in projects)}**',f'- Parsed image tags: **{image_count}**',f'- Sitemap URLs: **{len(urls)}**','',
'Canonical URLs use the current GitHub Pages project address. They should be revised when a final domain is chosen. For cases with limited source material, “Proof” describes the surviving evidence and its limits rather than a fabricated performance metric. The legal report figures are provided directly by the author; the NDA report is not published.','',
'## Home / About / Work metadata','',
'| Page | Title | Description |','|---|---|---|']
for page in pages[:3]:
    info=Page();info.feed(page.read_text(encoding='utf-8'))
    lines.append(f'| {page.stem} | {info.title} | {info.description} |')
lines += ['', '## Project SEO and evidence','', '| Project | SEO title | Result | Proof | Keywords |', '|---|---|---|---|---|']
for p in projects:
    clean=lambda x:str(x).replace('|','/').replace('\n',' ')
    lines.append('| '+' | '.join(map(clean,(p['name'],p['seoTitle']+' / Никита Солонуха',p['result'],p['proof'],', '.join(p['keywords']))))+' |')
lines += ['', '## Validation','']
lines += ['- '+e for e in errors] if errors else ['No automated content or metadata failures.']
lines += ['',f'Browser check: the earlier 35-case browser pass covered the original catalog. The added NDA umbrella is separately checked in the 14-case presentation QA at 1440/768/390. This is a copy/layout check, not a revalidation of product integrations.']
lines += ['', 'Static HTML case pages contain a readable fallback for search crawlers and render the full visual case after JavaScript loads. The six custom visual-first review cases keep their original composition and include project-specific facts.','']
(ROOT/'SEO_AUDIT.md').write_text('\n'.join(lines),encoding='utf-8')
print(f'{len(projects)} projects; {len(pages)} pages; {len(titles)} titles; {len(descriptions)} descriptions; {len(errors)} issues')
for e in errors: print('ISSUE:',e)
if errors: raise SystemExit(1)
