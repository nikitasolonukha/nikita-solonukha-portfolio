# Meta Ads Library Collector · master walkthrough

00:00 — product overview и проверенный live run.
00:04 — advertiser, country, status и limit.
00:07 — POST /jobs → queued → GraphQL worker.
00:11 — normalized results list.
00:15 — creative preview и поля AdRecord.
00:20 — переключение между объявлениями.
00:24 — session job registry.
00:28 — API contract и GET result schema.
00:33 — возврат к выдаче.

ORIGINAL / VERIFIED: JobService, queue, parser, API contract, live result schema.
PORTFOLIO POLISH: results-first web UI.
DEMO / REPLAY: сохранённый результат вместо нового обращения к Meta.
