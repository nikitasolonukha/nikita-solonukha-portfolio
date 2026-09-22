const $ = (selector, root=document) => root.querySelector(selector);
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const projectUrl = id => `case.html?id=${encodeURIComponent(id)}`;
const portfolioBase = new URL('../portfolio/', location.href);
const asset = path => new URL(path, portfolioBase).href;
function magnumFeature(){return `<section class="case-feature case-feature-magnum"><div class="shell"><p class="eyebrow">MAGNUM / ВЕРСИЯ ИЗ АВТОРСКОЙ ЗАПИСИ</p><div class="magnum-feature-heading"><h2>Форматы игры.<br><em>Атмосфера клуба.</em></h2><p>Карточка формата раскрывается прямо на сайте. Дальше посетитель видит галерею пространства и путь к записи.</p></div><figure class="magnum-formats"><img src="${asset('../projects/magnum/assets/export/video-desktop-formats-open.webp')}" alt="MAGNUM: открытая карточка формата игры в авторской записи" loading="lazy"><figcaption>01 / Открытие формата · кадр из авторского видео</figcaption></figure><figure class="magnum-gallery"><img src="${asset('../projects/magnum/assets/export/video-desktop-gallery.webp')}" alt="MAGNUM: галерея клуба в авторской записи" loading="lazy"><figcaption>02 / Галерея клуба · кадр из авторского видео</figcaption></figure><p class="magnum-proof">Показанная версия подтверждена авторскими desktop и mobile записями. Точный исходник именно этой версии не найден; код другой версии не используется как доказательство её поведения.</p></div></section>`;}
function pifpafFeature(){return `<section class="case-feature case-feature-pifpaf"><div class="shell"><p class="eyebrow">REELS / СЦЕНАРИЙ</p><div class="pifpaf-heading"><h2>От ссылки к <em>динамике.</em></h2><p>Ролик добавляется в кабинет, появляется в ленте и попадает в аналитику выбранного периода.</p></div><div class="pifpaf-pair"><figure><img src="${asset('../projects/pifpaf/assets/add-1440.png')}" alt="Пифпаф: добавление Reel по ссылке в локальной демонстрации" loading="lazy"><figcaption>01 / Добавить Reel</figcaption></figure><figure><img src="${asset('../projects/pifpaf/assets/analytics-30-1440.png')}" alt="Пифпаф: аналитика Reels за 30 дней в локальной демонстрации" loading="lazy"><figcaption>02 / Увидеть результат в аналитике</figcaption></figure></div><p class="pifpaf-proof">Данные и ролики вымышлены. В записи показан локальный API-сценарий; Instagram, Apify и Supabase не подключались.</p></div></section>`;}
function autorouterFeature(){return `<section class="case-feature case-feature-autorouter"><div class="shell"><p class="eyebrow">ROUTING / РЕШЕНИЕ</p><div class="autorouter-heading"><h2>Модель выбрана.<br><em>Причина видна.</em></h2><p>Система сопоставляет совместимость и смету. При нехватке бюджета она оставляет расчёт, но не запускает операцию.</p></div><div class="autorouter-facts"><div><span>01 / ВЫБОР</span><strong>z-image</strong><p>Подходит для image-запроса и проходит проверку параметров.</p></div><div><span>02 / СМЕТА</span><strong>1,20 ₽</strong><p>Демонстрационная цена исходного fake-каталога, не тариф провайдера.</p></div><div><span>03 / ЗАЩИТА</span><strong>Budget guard</strong><p>Если лимита не хватает, запуск недоступен.</p></div></div><figure><img src="${asset('../projects/vibe-autorouter/assets/estimate-1440.png')}" alt="Vibe AutoRouter: реальный экран локального расчёта модели и стоимости" loading="lazy"><figcaption>Расчёт и причины выбора · интерфейс локального demo</figcaption></figure><figure class="autorouter-budget"><img src="${asset('../projects/vibe-autorouter/assets/budget-1440.png')}" alt="Vibe AutoRouter: отказ в запуске из-за лимита бюджета" loading="lazy"><figcaption>Ограничение бюджета · тот же продукт, другое состояние</figcaption></figure><p class="autorouter-proof">Внешние модели не вызывались и деньги не списывались. Экран использует исходные classifier, ranking и FakeVibeClient через локальный adapter.</p></div></section>`;}
function b2bFeature(){return `<section class="case-feature case-feature-b2b"><div class="shell"><p class="eyebrow">ДВА ПОДХОДА / ОДИН B2B-КЕЙС</p><h2>От поиска <em>к приоритету.</em></h2><p class="b2b-lead">Atlas / Leads собирает и обогащает компании через n8n. Beauty Lead Hunter отдельно оценивает найденные компании и выделяет приоритетные.</p><div class="b2b-implementations"><figure><div class="b2b-label"><span>01 / n8n + таблица</span><strong>Atlas / Leads</strong></div><img src="${asset('../projects/maps-lead-generator/assets/workflow-detail-1440-v2.png')}" alt="Atlas / Leads: проверенная топология workflow в локальном интерфейсе" loading="lazy"><figcaption>15 узлов, два прохода; скрин локального показа структуры.</figcaption></figure><figure><div class="b2b-label"><span>02 / Python + scoring</span><strong>Beauty Lead Hunter</strong></div><img src="${asset('../projects/beauty-lead/assets/detail-1440.png')}" alt="Beauty Lead Hunter: реальные поля и скоринг в локальном интерфейсе" loading="lazy"><figcaption>Фильтр и приоритетная компания; данные демонстрационные.</figcaption></figure></div><p class="b2b-proof">Это две реализации одного направления, а не один общий backend. Внешний сбор, Google Sheets и outreach в записи отключены; компании и контакты вымышлены.</p></div></section>`;}
const archivalIds = new Set(['personal-assistant','news-aggregator-archive','copilot','university-projects']);
const selectedIds = ['shopify-store-builder','meta-ads','protective-structures','magnum','pifpaf'];
const caseTitles = {'meta-ads':'Meta Ads','shopify-store-builder':'Shopify Store Builder'};
const workIds = ['shopify-store-builder','meta-ads','protective-structures','magnum','pifpaf','portnoy','support-rag','vibe-autorouter','maps-lead-generator','ritm','photo-animation','garmony'];
const caseDetails = {
  'shopify-store-builder': {role:'Builder, генерация и storefront', outcome:'Исходные данные проходят через builder и превращаются в магазин Lumina Form: главная, каталог, карточка товара и корзина.', technical:'Генерация структуры магазина и storefront проверяются как один сценарий. Shopify preview и локальный builder показаны отдельно там, где они действительно разные среды.'},
  'meta-ads': {role:'Сбор, обработка и представление объявлений', outcome:'Задача проходит очередь и обработку; результатом становится список объявлений с креативами, рекламодателями, датами и ссылками.', technical:'Кейс показывает информационно плотную выдачу объявлений, а не сводку из нескольких декоративных метрик.'},
  'portnoy': {role:'Сайт, каталог и конфигуратор', outcome:'Посетитель изучает ткани и модель, меняет материал в 3D и сравнивает варианты.', technical:'Отдельный момент посвящён реальной 3D-модели и изменению материала. Сцена не заменена нарисованным изображением.'},
  'support-rag': {role:'Webchat, Telegram и AI-помощь оператору', outcome:'Сообщение посетителя попадает в Telegram topic; оператор получает RAG/AI-черновик и выбирает Edit, Regen или Send.', technical:'Webchat и Telegram — две стороны одного проекта. Обезличенная запись Telegram и локальная демонстрация webchat собраны в один кейс; сквозная production-запись не утверждается.'},
  'pifpaf': {role:'Веб-продукт и интерфейс кабинета', outcome:'Кабинет соединяет ролики, показатели и динамику просмотров в одном рабочем сценарии.', technical:'Для демонстрации используются локальные данные; они не выдаются за результаты реальных пользователей.'},
  'protective-structures': {role:'Сайт и интерфейс презентации продукта', outcome:'Сайт последовательно объясняет устройство защитной системы, сферы применения и контактный сценарий.', technical:'Визуальная презентация не является свидетельством реально построенных объектов или инженерных расчётов.'},
  'magnum': {role:'Сайт и адаптивная презентация', outcome:'Сайт проводит посетителя через клуб, форматы, галерею, отзывы и контакт.', technical:'Приоритетная версия подтверждена авторскими видео; точный исходник этого среза не найден.'},
  'maps-lead-generator': {role:'Сбор и квалификация B2B-лидов', outcome:'N8n-сбор и enrichment компаний дополняются Python/Streamlit-поиском, оценкой и таблицей результата.', technical:'Beauty Lead Hunter и Atlas / Leads показаны как две реализации одного направления. Telegram AI Lead Hunter остаётся отдельным проектом.'},
  'telegram-leads': {role:'Telegram automation и MTProto', outcome:'Найденные лиды попадают в Telegram topics с источником и подготовленным ответом для менеджера.', technical:'Скриншот поддержки и скриншот лида проверены отдельно; общая операторская оболочка не означает общую задачу.'},
  'legal-automation': {role:'Внутренние сервисы и интеграции', outcome:'Обезличенное описание работы с AI-анализом продаж, CRM, телефонией, отчётами, документами и контентными процессами.', technical:'NDA-кейс не раскрывает компанию и клиентов. Вымышленный интерфейс внутреннего продукта не используется.'},
  'university-projects': {role:'Три отдельные учебные работы', outcome:'Защищённые сообщения, анализ NPM и Telegram parser/search сведены под одну редакционную обложку.', technical:'Это не один технический продукт. Сохранившийся код parser отделён от архивных описаний первых двух работ.'}
};

// Case presentation changes with the product's actual surface; the shared shell stays quiet.
const caseArt = {
 'shopify-store-builder':['commerce','#ffdc15','../projects/shopify-store-builder/assets/live-home-1440.png','Готовый магазин — главный результат.'],
 'meta-ads':['results','#bce4c3','../projects/meta-ads/assets/results-1440-v3.png','Объявления, креативы и данные — на первом плане.'],
 'protective-structures':['story','#e5be73',null,'Сайт объясняет систему от первого экрана до контакта.'],
 'lexlegal':['story','#c2baa8',null,'Юридический сайт с собственной визуальной иерархией.'],
 'magnum':['story','#e9ac69',null,'Клуб и его атмосфера — через настоящий сайт.'],
 'photo-animation':['story','#d794ed',null,'Видео и путь от фотографии к результату.'],
 'roulette':['product','#f3a4a6',null,'Интерфейс игры и его состояния.'],
 'tatiana':['story','#dbb5a3',null,'Сайт и его повествование.'],
 'ppbot':['telegram','#cdd8b5',null,'Рецепты и выбор еды внутри Telegram.'],
 'gigant':['product','#ebdfaa',null,'Автоматизация в её рабочей среде.'],
 'desert-wheels':['product','#e2aa77',null,'Продукт и пользовательский маршрут.'],
 'women-strange':['story','#f0bfa5',null,'Визуальный характер сайта и детали взаимодействия.'],
 'linux-lab':['archive','#b9c5d0',null,'Исследовательская работа и сохранившиеся материалы.'],
 'pifpaf':['media','#ff9d5f',null,'Контент и ролики задают ритм кейса.'],
 'ritm':['product','#b6ff00',null,'Привычки, действие и прогресс в собственном интерфейсе.'],
 'portnoy':['fashion','#d6c1ab','../projects/portnoy/assets/technical-3d.png','Ткани, конфигуратор и настоящая 3D-модель.'],
 'vibe-autorouter':['product','#edba82',null,'Модельный роутинг и детали решения.'],
 'support-rag':['telegram','#88b9dd','../projects/support-rag/assets/telegram-support-sanitized.png','Webchat и Telegram — одна система поддержки.'],
 'trekpodarok':['story','#d9a79b',null,'Личный продукт и его путь к заказу.'],
 'garmony':['story','#e2c7aa',null,'Сайт, пространство и движение.'],
 'ep-beauty':['story','#e6c2b5',null,'Редакционная подача сайта студии.'],
 'portfolio-archive':['archive','#cfc7bc',null,'Сохранившийся интерфейс старого портфолио.'],
 'stepbystep':['product','#a7d6df',null,'Приложение и его основные экраны.'],
 'skazka':['story','#e6c7c2',null,'История продукта через настоящий сайт.'],
 'twitter-automation':['telegram','#a5bacc',null,'Twitter/X как площадка результата.'],
 'telegram-schedule':['telegram','#9fbbd9',null,'Публикация и расписание внутри Telegram.'],
 'telegram-intel':['telegram','#a5c3df',null,'Бот и его ответы.'],
 'telegram-leads':['telegram','#91b8d0','../projects/telegram-leads/assets/telegram-leads-sanitized.png','Найденный лид и работа с ним в Telegram topics.'],
 'topgadalkin':['story','#d5a6a0',null,'Лендинг и пользовательский сценарий.'],
 'maps-lead-generator':['results','#b4d3c7','../projects/maps-lead-generator/assets/company-table-1440-v2.png','Pipeline и таблица компаний — результат B2B-поиска.'],
 'personal-assistant':['archive','#b8afd0',null,'Архивные свидетельства без подмены n8n workflow.'],
 'news-aggregator-archive':['archive','#a8bdc8',null,'Две версии Telegram News обозначены отдельно.'],
 'copilot':['archive','#c1afd4',null,'Доступные материалы workflow без вымышленной схемы.'],
 'university-projects':['archive','#b0bec8',null,'Отдельные университетские работы в одной редакционной обложке.'],
 'legal-automation':['archive','#b8aea8',null,'Обезличенный NDA-кейс без вымышленного UI.']
};
function setupMenu(){const toggle=$('.menu-toggle');if(!toggle)return;const menu=$('#mobile-nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Открыть меню':'Закрыть меню');menu.hidden=open});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню')}));}
async function loadProjects(){const response=await fetch(new URL('../portfolio/data.json?v=20260922-k',location.href),{cache:'no-store'});if(!response.ok)throw new Error('Не удалось загрузить список проектов');return (await response.json()).filter(item=>item.published!==false);}

function home(projects) {
  const selected = selectedIds.map(id => projects.find(project => project.id === id)).filter(Boolean);
  $('#selected-list').innerHTML = selected.map((project, index) => `
    <article class="featured">
      <a class="featured-image" href="${projectUrl(project.id)}" aria-label="Открыть кейс ${escapeHtml(project.name)}">
        <img src="${asset(project.desktop)}" alt="${escapeHtml(project.name)} — настоящий интерфейс" loading="${index ? 'lazy' : 'eager'}">
        <video class="featured-loop" muted loop playsinline preload="none" aria-hidden="true"><source src="media/${project.id}-loop.mp4" type="video/mp4"></video>
      </a>
      <div class="featured-copy"><div><span class="featured-index">${String(index + 1).padStart(2, '0')} / 05</span><span>${escapeHtml(project.category)}</span></div>
        <h3><a href="${projectUrl(project.id)}">${escapeHtml(project.name)} <span aria-hidden="true">↗</span></a></h3>
        <p>${escapeHtml(project.subtitle)}</p>
      </div>
    </article>`).join('');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.featured-image').forEach(link => {
    const video = link.querySelector('video');
    video.addEventListener('playing', () => link.classList.add('is-playing'));
    video.addEventListener('pause', () => link.classList.remove('is-playing'));
    link.addEventListener('pointerenter', () => { if (matchMedia('(hover:hover)').matches) video.play().catch(() => {}); });
    link.addEventListener('pointerleave', () => { video.pause(); video.currentTime = 0; });
    link.addEventListener('focusin', () => video.play().catch(() => {}));
    link.addEventListener('focusout', () => { video.pause(); video.currentTime = 0; });
  });
}
const roleByCategory = { 'Сайты': 'Дизайн и разработка', 'Продукты': 'Продукт и разработка', 'Автоматизация': 'Архитектура и интеграции', 'AI': 'AI и интеграции', 'Исследования': 'Исследование' };
function workRow(item, index, archive = false) {
  const evidence = archivalIds.has(item.id) ? 'Частично' : item.id === 'legal-automation' ? 'NDA' : (item.media || []).length ? 'Видео и экраны' : 'Экраны';
  const role = roleByCategory[item.category] || 'Разработка';
  return `<a class="project-row" href="${projectUrl(item.id)}" aria-label="Открыть кейс ${escapeHtml(item.name)}">
    <span class="project-row-name"><strong>${escapeHtml(item.name)}</strong></span>
    <span class="project-row-category">${escapeHtml(item.category)}</span>
    <span class="project-row-type">${escapeHtml(role)}</span>
    <span class="project-row-evidence">${escapeHtml(evidence)}</span>
    <img class="row-preview" src="${asset(item.desktop)}" alt="" loading="lazy"></a>`;
}
function work(projects){
  const featured=workIds.map(id=>projects.find(item=>item.id===id)).filter(Boolean);
  const wrap=$('#work-filters');let kind='all';
  function render(){
    const shown=featured.filter(item=>kind==='all'||kind==='product'&&item.category==='Продукты'||kind==='site'&&item.category==='Сайты'||kind==='automation'&&item.category!=='Продукты'&&item.category!=='Сайты');
    $('#work-grid').innerHTML=shown.map((item,index)=>workRow(item,index)).join('');
  }
  wrap.addEventListener('click',event=>{
    const button=event.target.closest('button[data-kind]');if(!button)return;
    kind=button.dataset.kind;
    wrap.querySelectorAll('button').forEach(entry=>entry.setAttribute('aria-pressed',String(entry===button)));
    render();
  });
  $('#work-grid').addEventListener('pointermove',event=>{
    if(!matchMedia('(hover:hover)').matches)return;
    const row=event.target.closest('.project-row');if(!row)return;
    const rect=row.getBoundingClientRect();
    row.style.setProperty('--preview-x',Math.min(rect.width-260,Math.max(180,event.clientX-rect.left+85))+'px');
    row.style.setProperty('--preview-y',Math.min(rect.height-15,Math.max(15,event.clientY-rect.top))+'px');
  });
  render();
}
function archive(projects){const rest=projects.filter(item=>!workIds.includes(item.id));$('#archive-list').innerHTML=rest.map((item,index)=>workRow(item,index,true)).join('');}
function videoFigure(entry,index,name){const phone=entry.mobile;const src=asset(entry.src);const poster=asset(entry.poster);return `<figure class="${phone?'video-phone':'video-desktop'}"><div class="case-video"><video controls playsinline preload="${index===0?'metadata':'none'}" poster="${poster}" aria-label="${escapeHtml(name)} — ${phone?'мобильный':'десктопный'} walkthrough ${index+1}"><source src="${src}" type="${src.toLowerCase().includes('.webm')?'video/webm':'video/mp4'}">Ваш браузер не поддерживает видео.</video></div><figcaption>${phone?'Мобильный сценарий':'Основной сценарий'}${index>0?' · дополнительная запись':''}</figcaption></figure>`;}
function projectFeature(id){if(id!=='protective-structures')return '';return `<section class="case-feature case-feature-kontur"><div class="shell"><p class="eyebrow">СИСТЕМА / САЙТ</p><div class="kontur-intro"><h2>Сложная система.<br><em>Ясное объяснение.</em></h2><p>Сайт раскрывает устройство защитной конструкции, затем показывает сферы применения и приводит к запросу расчёта.</p></div><figure class="kontur-main"><img src="${asset('../projects/protective-structures/assets/1440-how.png')}" alt="Реальный экран KONTUR: схема опорной конструкции, каркаса и защитного полотна" loading="lazy"><figcaption>01 / Состав системы · экран сайта</figcaption></figure><div class="kontur-detail"><div><span>01</span><strong>Конструкция</strong><p>Три элемента объясняются на одном экране: опоры, каркас, сетчатое полотно.</p></div><div><span>02</span><strong>Применение</strong><p>От устройства системы — к энергетике, промышленности и другим объектам.</p></div><div><span>03</span><strong>Действие</strong><p>Посетитель может открыть контактную форму и запросить обсуждение объекта.</p></div></div><figure class="kontur-secondary"><img src="${asset('../projects/protective-structures/assets/1440-industries.png')}" alt="Реальный экран KONTUR: отрасли применения" loading="lazy"><figcaption>02 / Области применения · экран сайта</figcaption></figure><p class="kontur-caveat">Изображения объектов в демонстрационном сайте — иллюстративный материал. Они не подтверждают построенные сооружения.</p></div></section>`;}

function casePage(projects) {
  const id = new URLSearchParams(location.search).get('id');
  const item = projects.find(project => project.id === id);
  const root = $('#case-root');
  if (!item) {
    root.innerHTML = '<div class="case-error shell"><h1>Проект не найден.</h1><a href="work.html">Все работы ↗</a></div>';
    document.title = 'Проект не найден — Никита Солонуха';
    return;
  }
  document.title = `${item.name} — Никита Солонуха`;
  const notes = caseDetails[id] || {};
  const art = caseArt[id] || ['product', '#b6ff00', null, ''];
  document.body.dataset.caseStyle = art[0];
  document.body.dataset.caseId = id;
  document.body.style.setProperty('--case-accent', art[1]);
  const next = projects[(projects.indexOf(item) + 1) % projects.length];
  const media = item.media || [];
  const screens = [...new Set((item.screens || []).slice(0, 8).filter(src =>
    (id !== 'protective-structures' || !src.includes('1440-how.png')) &&
    (id !== 'magnum' || (!src.includes('formats-open') && !src.includes('gallery'))) &&
    (id !== 'pifpaf' || (!src.includes('reels-wall') && !src.includes('add-1440') && !src.includes('analytics-30-1440'))) &&
    (id !== 'vibe-autorouter' || (!src.includes('estimate-1440') && !src.includes('budget-1440'))) &&
    (id !== 'maps-lead-generator' || (!src.includes('workflow-detail') && !src.includes('beauty-lead/assets/detail-1440')))
  ))];
  const feature = (id === 'magnum' ? magnumFeature() : id === 'pifpaf' ? pifpafFeature() : id === 'vibe-autorouter' ? autorouterFeature() : id === 'maps-lead-generator' ? b2bFeature() : projectFeature(id)) ||
    (id === 'portnoy' ? `<section class="case-feature case-feature-3d"><div class="shell"><p class="eyebrow">3D / материал на модели</p><h2>Ткань меняет <em>модель.</em></h2><video controls playsinline preload="none" poster="${asset('../projects/portnoy/assets/technical-3d.png')}" aria-label="Портной — 3D-конфигуратор"><source src="${asset('../projects/portnoy/assets/feature-3d.mp4')}" type="video/mp4"></video></div></section>` :
    id === 'support-rag' ? `<section class="case-feature case-feature-split"><div class="shell"><p class="eyebrow">Webchat → Telegram</p><h2>Две стороны <em>поддержки.</em></h2><div class="case-feature-pair"><figure><img src="${asset('../projects/webchat/assets/conversation-1440.png')}" alt="Локальная демо-версия webchat"><figcaption>01 / Webchat · демо</figcaption></figure><figure><img src="${asset('../projects/support-rag/assets/telegram-support-sanitized.png')}" alt="Обезличенный Telegram topic поддержки"><figcaption>02 / Telegram оператора</figcaption></figure></div></div></section>` : '');
  const status = archivalIds.has(id) ? 'Архив · оригинальные материалы неполны' : id === 'legal-automation' ? 'Обезличенный NDA-кейс' : item.category;
  const mainVideo = media.length ? `<section class="case-video-section"><div class="shell"><p class="eyebrow">Продукт в действии</p>${videoFigure(media[0], 0, item.name)}</div></section>` : `<section class="case-archive-section shell"><p>Полная оригинальная запись интерфейса пока не найдена. Ниже — сохранившиеся материалы.</p></section>`;
  const secondary = media.length > 1 ? `<section class="case-secondary shell"><p class="eyebrow">Другие сценарии / mobile</p><div class="case-media-secondary">${media.slice(1, 5).map((entry, index) => videoFigure(entry, index + 1, item.name)).join('')}</div></section>` : '';
  const gallery = screens.length ? `<section class="case-screens shell"><p class="eyebrow">Экраны / детали</p><div class="case-screen-grid">${screens.map((src, index) => `<figure><a href="${asset(src)}" target="_blank" rel="noopener" aria-label="Открыть экран ${index + 1} проекта ${escapeHtml(item.name)}"><img src="${asset(src)}" alt="${escapeHtml(item.name)} — экран ${index + 1}" loading="lazy"></a><figcaption>${String(index + 1).padStart(2, '0')} / ${escapeHtml(item.name)}</figcaption></figure>`).join('')}</div></section>` : '';
  root.innerHTML = `<div class="case-title shell"><a class="back-link" href="work.html">← Работы</a><p class="eyebrow">${escapeHtml(status)}</p><h1>${escapeHtml(caseTitles[id] || item.name)}</h1><div class="case-title-meta"><div><span>Роль / услуги</span><strong>${escapeHtml(notes.role || item.subtitle)}</strong></div><div><span>Проект</span><strong>${escapeHtml(item.category)}</strong></div><div><span>Сценарий</span><strong>${escapeHtml(item.flow)}</strong></div></div></div>
    <div class="case-cover"><picture><source media="(max-width:760px)" srcset="${asset(id === 'shopify-store-builder' ? item.desktop : (item.mobile || art[2] || item.desktop))}"><img src="${asset(id === 'shopify-store-builder' ? item.desktop : (art[2] || item.desktop))}" alt="${escapeHtml(item.name)} — настоящий экран проекта" fetchpriority="high"></picture></div>
    <section class="case-story shell"><span class="eyebrow">${escapeHtml(item.name)} / о проекте</span><div><h2>${escapeHtml(item.intro)}</h2><p>${escapeHtml(art[3] || item.subtitle)}</p></div></section>
    ${mainVideo}${feature}${gallery}${secondary}
    <section class="case-notes shell"><span class="eyebrow">Реализация</span><div><h2>Как это работает</h2><p>${escapeHtml(notes.outcome || item.flow)}</p><details><summary>Технологии и границы демонстрации</summary><p>${escapeHtml(item.stack)}</p><p>${escapeHtml(notes.technical || item.boundary)}</p><p>${escapeHtml(item.boundary)}</p></details></div></section>
    <div class="case-next shell"><a href="${projectUrl(next.id)}"><span><small>Следующий кейс</small><br>${escapeHtml(next.name)}</span><span aria-hidden="true">↗</span></a><a class="case-all-work" href="work.html">Все работы ↗</a></div>`;
  root.querySelectorAll('.case-screen-grid img').forEach(img => {
    const sizeImage = () => { if (img.naturalHeight > img.naturalWidth * 2) img.classList.add('is-tall'); };
    if (img.complete) sizeImage(); else img.addEventListener('load', sizeImage, {once:true});
  });
}
setupMenu();loadProjects().then(projects=>{const page=document.body.dataset.page;if(page==='home')home(projects);if(page==='work')work(projects);if(page==='archive')archive(projects);if(page==='case')casePage(projects);}).catch(error=>{const target=$('#selected-list')||$('#work-grid')||$('#archive-list')||$('#case-root');if(target)target.innerHTML='<p>Не удалось загрузить проекты. Обновите страницу.</p>';console.error(error);});
