# Autopost · API-first master

00:00 `POST /autopost/jobs` и пустая очередь.
00:03 Создание Instagram job с network retry сценарием.
00:07 Worker: pending → retry, JSON показывает attempt и ошибку.
00:11 Transport online: повтор → success + published_post_id.
00:14 YouTube job с validation error.
00:18 Failed response и завершённый lifecycle trace.

ENTRY → ACTION → CORE FUNCTION → RESULT: API request → queue → original worker → retry/success/failed JSON response.
