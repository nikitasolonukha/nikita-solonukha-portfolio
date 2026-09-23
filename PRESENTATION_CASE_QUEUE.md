# Presentation-first case pass

Closed scope from the author's 2026-09-23 direction. A READY project in `MASTER_CASE_QUEUE.md` means source/research readiness, not completion of this visual pass. Other projects retain their real product interfaces as the primary visual.

| # | Project | Status | Public case |
|---:|---|---|---|
| 01 | AI Sales Assistant | READY | [case](site/case-legal-automation.html) |
| 02 | AI Support | READY | [case](site/case-support-rag.html) |
| 03 | Telegram AI Lead Hunter | READY | [case](site/case-telegram-leads.html) |
| 04 | Telegram Schedule | READY | [case](site/case-telegram-schedule.html) |
| 05 | Twitter / X Automation | READY | [case](site/case-twitter-automation.html) |
| 06 | Telegram Intel | READY | [case](site/case-telegram-intel.html) |
| 07 | Vibe AutoRouter | READY | [case](site/case-vibe-autorouter.html) |
| 08 | GIGANT | READY | [case](site/case-gigant.html) |
| 09 | Internal Products / Legal NDA | READY | [case](site/case-internal-legal.html) |
| 10 | Personal AI Assistant | READY | [case](site/case-personal-assistant.html) |
| 11 | Telegram News · two versions | READY | [case](site/case-news-aggregator-archive.html) |
| 12 | n8n Copilot | READY | [case](site/case-copilot.html) |
| 13 | University Projects | READY | [case](site/case-university-projects.html) |
| 14 | Linux Lab | READY | [case](site/case-linux-lab.html) |

READY requires truthful DOM narrative, distinct cover, removal of reconstructed public media, desktop/mobile visual QA and evidence/limits review. Video is optional and is not a completion gate. Do not restore deleted projects or apply this pass to UI-led projects.

Calibration QA: 5 first screens compared in [contact sheet](site/qa/presentation/calibration-contact-sheet.png). All five public cases passed a 1440/768/390 check for page errors, broken images, horizontal overflow, and public video count (zero); see [machine-readable report](site/qa/presentation/qa.json). Remaining project-specific cases are still TODO.

Second group: Telegram Intel, Vibe AutoRouter, and GIGANT also passed those same three viewport checks. The report now covers eight cases. Vibe's original frontend remains lower on the page as technical evidence; Telegram Intel's fabricated chat replay is removed from its public case; GIGANT is presented as a human approval mechanism rather than a demo panel.

Final group: six distinct editorial pages and typographic covers were added, including a separate NDA umbrella case. The 14-case browser pass checks 42 combinations at 1440/768/390: one H1 per page, no page errors, broken images or horizontal overflow. Public video appears only as the optional **real Notion recording** in n8n Copilot. The underlying Personal Assistant, Telegram News, Copilot and University source-evidence gaps remain documented as BLOCKED in `MASTER_CASE_QUEUE.md`; READY here means the honest presentation is complete, not that missing historical artifacts have been recovered. [Comparison](site/qa/presentation/archive-contact-sheet.png) · [QA report](site/qa/presentation/qa.json).

Process reveal motion was checked with reduced motion disabled on six different cases and respects `prefers-reduced-motion`. The main Work page shows 14 featured rows including the separate NDA case at 1440 and 390 px; [shell QA](site/qa/presentation/shell-qa.json).
