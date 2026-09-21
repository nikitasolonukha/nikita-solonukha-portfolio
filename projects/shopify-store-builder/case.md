# AI Shopify Store Builder — от входных данных к готовому магазину

**READY — объединённый второй проход.** Два прежних кейса объединены в одну историю.

## ORIGINAL
Embedded Shopify app `ai-store-builder` принимает товар и 1–4 изображения, получает валидированный `GeneratedStore`, создаёт продукт, цену, media, SEO и app-owned данные через Admin GraphQL, затем публикует storefront через Theme App Extension. Отдельный frontend-прототип использовался как самостоятельная проверка UX витрины; он больше не является отдельным портфельным проектом.

## VERIFIED
Для embedded app пройдены 132 локальных теста. Архивный QA-отчёт подтверждает dev-store `testbogdan-ml87kqbq.myshopify.com`, продукт `Sculptural Table Lamp`, unpublished QA theme и проверенные storefront routes: home, catalog, product, contacts, cart и Shopify checkout. Cart был проверен с quantity 1→2, remove/re-add и переходом в checkout; оплата и заказ не выполнялись.

## VERSION DIFFERENCE
Первая часть master показывает локально запущенный builder с безопасными адаптерами. Вторая часть использует настоящие архивные screenshots Shopify QA storefront от 10.09.2026. Это не непрерывная текущая production-сессия: credentials и authenticated storage state намеренно не публикуются.

## PORTFOLIO POLISH
История пересобрана как INPUT → настройка → генерация → результат → Shopify home → catalog → product/gallery → quantity/cart → checkout. Desktop и mobile storefront показаны отдельно. Старые пакеты `store-builder-embedded` и `store-builder-demo` сохранены как архивные источники.

## DEMO / MOCK
Локальный builder использует prepared product/result и не выполняет новые AI/Shopify вызовы. Архивные Shopify кадры относятся к реальному dev-store QA. Продукт и demo reviews тестовые; метрики продаж и клиенты не заявляются.

## Ограничения
Живая QA preview может требовать пароль и authenticated session. Checkout проверен до формы, без оплаты. Storefront версии из builder и архивного QA могут различаться визуально; это явно показано как развитие одной системы.
