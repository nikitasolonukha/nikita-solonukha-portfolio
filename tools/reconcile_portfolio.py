"""Reconcile the public catalog against its queue, review card and case files."""
from pathlib import Path
import json, re
from lxml import html

ROOT=Path(__file__).resolve().parents[1]
projects=json.loads((ROOT/'portfolio/data.json').read_text(encoding='utf-8'))
queue=(ROOT/'MASTER_CASE_QUEUE.md').read_text(encoding='utf-8')
rows=re.findall(r'^\|\s*(\d+)\s*\|[^\n]+?\|\s*(READY|BLOCKED|PRIVATE/NDA|NOT PORTFOLIO)\s*\|',queue,re.M)
review=html.parse(str(ROOT/'review/index.html'))
cards=review.xpath('//article')
if len(rows)!=len(projects) or len(cards)!=len(projects):
    raise SystemExit(f'Card/queue mismatch: catalog={len(projects)}, queue={len(rows)}, review={len(cards)}')

def exists(ref):
    if not ref: return False
    return (ROOT/'portfolio'/ref.split('?',1)[0]).resolve().is_file()

table=['# Portfolio reconciliation · 23.09.2026','',
       'Each row is one public card. VIDEO and SCREENSHOTS count **publicly linked media in `portfolio/data.json`**, not archived reconstruction files. A zero is valid for presentation-first projects. Source-evidence limits remain in each case.md and MASTER_CASE_QUEUE.md.','',
       '| PROJECT | PUBLIC CARD | REVIEW | CASE.MD | VIDEO | SCREENSHOTS | STATUS |',
       '|---|---|---|---|---:|---:|---|']
issues=[]
review_urls={a.get('href') for a in review.xpath('//article//a[@class="preview"]')}
for idx,p in enumerate(projects):
    slug=p['id']
    page=ROOT/'site'/f'case-{slug}.html'
    review_page=ROOT/'review'/f'{slug}.html'
    linked=f'../site/case-{slug}.html' in review_urls or f'{slug}.html' in review_urls
    case_md=exists(p.get('document'))
    videos=p.get('media',[])
    screens=p.get('screens',[])
    video_count=sum(exists(m.get('src','')) for m in videos)
    screen_count=sum(exists(s) for s in screens)
    status=rows[idx][1]
    card='YES' if p.get('published') is not False else 'NO'
    review_ok=linked and (page.is_file() or review_page.is_file())
    table.append(f"| {p['name']} (`{slug}`) | {card} | {'YES' if review_ok else 'NO'} | {'YES' if case_md else 'NO'} | {video_count}/{len(videos)} | {screen_count}/{len(screens)} | {status} |")
    if not review_ok or not case_md or video_count!=len(videos) or screen_count!=len(screens):
        issues.append(slug)
table += ['',f'**Cards:** {len(projects)}. **Queue:** {len(rows)}. **Review entries:** {len(cards)}. **Issues:** {len(issues)}.',
          '', 'The 14 presentation-first projects are tracked separately in [PRESENTATION_CASE_QUEUE.md](PRESENTATION_CASE_QUEUE.md). Underlying historical evidence gaps in Personal Assistant, Telegram News, n8n Copilot and University Projects remain BLOCKED even though their honest case presentation is ready.',
          '', 'Issues: '+(', '.join(issues) if issues else 'none')+'.']
(ROOT/'PORTFOLIO_RECONCILIATION.md').write_text('\n'.join(table)+'\n',encoding='utf-8')
print(f'{len(projects)} catalog / {len(rows)} queue / {len(cards)} review / {len(issues)} issues')
if issues: raise SystemExit(1)
