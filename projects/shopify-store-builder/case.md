# Shopify Store Builder → Lumina Form

**READY — единый кейс builder и созданного Shopify-магазина.**

## ORIGINAL
Embedded Shopify app принимает данные товара и изображения, формирует валидированный результат, создаёт продукт и app-owned данные через Shopify Admin GraphQL и публикует storefront через Theme App Extension. `Lumina Form` — созданная Shopify-витрина продукта Sculptural Table Lamp.

## VERIFIED
Builder пройден локально с безопасными адаптерами; для embedded app ранее прошли 132 локальных теста. Переданный password-protected Shopify preview повторно проверен на desktop и iPhone: home, catalog, PDP, gallery, product storytelling, FAQ/reviews и cart. Checkout ранее проверялся до формы, без оплаты.

## PORTFOLIO PRESENTATION
Master walkthrough теперь показывает один полный flow: каталог builder → выбор/ввод товара → подготовленный generation result → переход в Lumina Form → главная → каталог → PDP → дополнительные продуктовые сцены → cart. Реальный storefront не заменён вымышленным dashboard.

## DEMO / MOCK
Локальный builder использует подготовленный ответ и не выполняет новые AI/Shopify вызовы. Storefront относится к реальному dev-store preview. Товар, отзывы и тексты демонстрационные; реальные продажи и покупатели не заявляются.

## Ограничения
Shopify preview может запросить пароль или перестать открываться. Credentials, authenticated state, платёж и создание заказа не публикуются и не выполняются.
