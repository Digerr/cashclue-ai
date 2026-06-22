// Lightweight i18n dictionary — no external deps, just typed objects.

export type Lang = 'en' | 'ru' | 'es' | 'de' | 'fr';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export interface Dict {
  // Header
  nav_how: string;
  nav_examples: string;
  nav_pricing: string;
  cta_getPlan: string;

  // Hero
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string; // highlighted
  hero_sub: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_stat_plans: string;
  hero_stat_income: string;
  hero_stat_rating: string;

  // Theme picker
  theme_label: string;
  theme_sideHustle: string;
  theme_sideHustle_desc: string;
  theme_startup: string;
  theme_startup_desc: string;
  theme_content: string;
  theme_content_desc: string;
  theme_career: string;
  theme_career_desc: string;
  theme_passive: string;
  theme_passive_desc: string;

  // Wizard
  wiz_title: string;
  wiz_sub: string;
  wiz_credits: string;
  wiz_skills_label: string;
  wiz_skills_hint: string;
  wiz_skills_placeholder: string;
  wiz_hours_label: string;
  wiz_hours_casual: string;
  wiz_hours_side: string;
  wiz_hours_grind: string;
  wiz_budget_label: string;
  wiz_budget_broke: string;
  wiz_budget_boot: string;
  wiz_budget_funded: string;
  wiz_goal_label: string;
  wiz_goal_hint: string;
  wiz_goal_placeholder: string;
  wiz_risk_label: string;
  wiz_risk_low: string;
  wiz_risk_low_desc: string;
  wiz_risk_med: string;
  wiz_risk_med_desc: string;
  wiz_risk_high: string;
  wiz_risk_high_desc: string;
  wiz_generate: string;
  wiz_generate_hint: string;
  wiz_loading_1: string;
  wiz_loading_2: string;
  wiz_loading_3: string;
  wiz_loading_4: string;
  wiz_loading_5: string;
  wiz_loading_6: string;
  wiz_error_empty: string;
  wiz_error_empty_desc: string;
  wiz_error_failed: string;
  wiz_error_failed_desc: string;
  wiz_success_title: string;
  wiz_success_desc: string;

  // Results
  res_strategy_title: string;
  res_recommended: string;
  res_monthlyIncome: string;
  res_startupCost: string;
  res_firstDollar: string;
  res_profitable: string;
  res_unfair: string;
  res_howPaid: string;
  res_roadmap: string;
  res_tools: string;
  res_risks: string;
  res_quickWins: string;
  res_longTerm: string;
  res_regenerate: string;
  res_unlock: string;
  res_left: string;

  // How it works
  how_title: string;
  how_sub: string;
  how_step1_title: string;
  how_step1_desc: string;
  how_step2_title: string;
  how_step2_desc: string;
  how_step3_title: string;
  how_step3_desc: string;

  // Examples
  ex_title: string;
  ex_sub: string;
  ex_disclaimer: string;
  ex_1_quote: string;
  ex_1_author: string;
  ex_1_role: string;
  ex_1_stat: string;
  ex_2_quote: string;
  ex_2_author: string;
  ex_2_role: string;
  ex_2_stat: string;
  ex_3_quote: string;
  ex_3_author: string;
  ex_3_role: string;
  ex_3_stat: string;
  ex_in_90: string;

  // Pricing
  price_badge: string;
  price_title: string;
  price_sub: string;
  price_starter: string;
  price_starter_tag: string;
  price_pro: string;
  price_pro_tag: string;
  price_empire: string;
  price_empire_tag: string;
  price_forever: string;
  price_month: string;
  price_popular: string;
  price_cta_free: string;
  price_cta_pro: string;
  price_cta_empire: string;
  price_guarantee: string;
  feat_starter: string[];
  feat_pro: string[];
  feat_empire: string[];

  // Footer
  footer_about: string;
  footer_blog: string;
  footer_privacy: string;
  footer_terms: string;
  footer_tagline: string;
  footer_rights: string;
  footer_made: string;
  footer_product: string;
  footer_company: string;
}

export const DICT: Record<Lang, Dict> = {
  en: {
    nav_how: 'How it works',
    nav_examples: 'Examples',
    nav_pricing: 'Pricing',
    cta_getPlan: 'Get my plan',

    hero_badge: 'New: AI-generated roadmaps now include 2026 market data',
    hero_title_1: 'Turn your skills',
    hero_title_2: 'into cold hard cash.',
    hero_sub: 'CashClue AI reads your skills, time, budget, and goals — then builds you a personalized money-making playbook with real numbers, real steps, and real income projections. No hustle-bro fluff. Just a plan you can start today.',
    hero_cta_primary: 'Generate my plan',
    hero_cta_secondary: 'See examples',
    hero_stat_plans: 'plans generated',
    hero_stat_income: 'projected income',
    hero_stat_rating: 'avg rating',

    theme_label: 'What do you want a plan for?',
    theme_sideHustle: 'Side Hustle',
    theme_sideHustle_desc: 'Extra income on the side of your job',
    theme_startup: 'Startup Idea',
    theme_startup_desc: 'A real business you could raise money for',
    theme_content: 'Content Creator',
    theme_content_desc: 'YouTube / TikTok / Newsletter / Blog',
    theme_career: 'Career Pivot',
    theme_career_desc: 'Switch to a higher-paying path',
    theme_passive: 'Passive Income',
    theme_passive_desc: 'Assets that earn while you sleep',

    wiz_title: 'Build your hustle plan',
    wiz_sub: 'Fill this out honestly. The better the input, the sharper the plan.',
    wiz_credits: 'free credits',
    wiz_skills_label: 'What are you good at?',
    wiz_skills_hint: '(skills, hobbies, past jobs)',
    wiz_skills_placeholder: 'e.g. I write Python for a fintech, I\'m decent at Figma, I love dogs, I used to tutor math in college...',
    wiz_hours_label: 'Hours per week you can commit',
    wiz_hours_casual: 'Casual (1h)',
    wiz_hours_side: 'Side-gig (10h)',
    wiz_hours_grind: 'Grinding (40h)',
    wiz_budget_label: 'Starting capital',
    wiz_budget_broke: 'Broke ($0)',
    wiz_budget_boot: 'Bootstrapped ($1k)',
    wiz_budget_funded: 'Funded ($10k)',
    wiz_goal_label: 'What\'s the goal?',
    wiz_goal_hint: '(optional but helpful)',
    wiz_goal_placeholder: 'e.g. Replace my $4k/mo salary in 6 months',
    wiz_risk_label: 'Risk tolerance',
    wiz_risk_low: 'Safe',
    wiz_risk_low_desc: 'Slow & steady',
    wiz_risk_med: 'Balanced',
    wiz_risk_med_desc: 'Some risk',
    wiz_risk_high: 'Aggressive',
    wiz_risk_high_desc: 'High upside',
    wiz_generate: 'Generate my money plan',
    wiz_generate_hint: 'Takes ~30 seconds. No signup required for your first 3 plans.',
    wiz_loading_1: 'Analyzing your skills...',
    wiz_loading_2: 'Scanning 2026 market trends...',
    wiz_loading_3: 'Crunching income projections...',
    wiz_loading_4: 'Comparing 50+ business models...',
    wiz_loading_5: 'Building your roadmap...',
    wiz_loading_6: 'Stress-testing for risks...',
    wiz_error_empty: 'Tell us about you first',
    wiz_error_empty_desc: 'Add your skills or your goal so the AI has something to work with.',
    wiz_error_failed: 'Generation failed',
    wiz_error_failed_desc: 'Please try again in a moment.',
    wiz_success_title: 'Your plan is ready',
    wiz_success_desc: '3 personalized ideas generated.',

    res_strategy_title: 'Your AI-generated strategy',
    res_recommended: 'RECOMMENDED',
    res_monthlyIncome: 'Monthly income',
    res_startupCost: 'Startup cost',
    res_firstDollar: 'First $',
    res_profitable: 'Profitable',
    res_unfair: 'Your unfair advantage',
    res_howPaid: 'How you get paid',
    res_roadmap: 'Roadmap',
    res_tools: 'Tools & Resources',
    res_risks: 'Honest risks',
    res_quickWins: 'Quick wins — do these THIS WEEK',
    res_longTerm: 'Long-term plays — 6+ month wealth bets',
    res_regenerate: 'Generate another plan',
    res_unlock: 'Unlock unlimited plans',
    res_left: 'free credits left',

    how_title: 'From zero to plan in 30 seconds.',
    how_sub: 'Three steps. No fluff. No 47-page PDF you\'ll never read.',
    how_step1_title: '1. Describe yourself',
    how_step1_desc: 'Tell the AI your skills, available hours, budget, and goal. Be honest — garbage in, garbage out.',
    how_step2_title: '2. AI builds your plan',
    how_step2_desc: 'CashClue analyzes 50+ business models against your profile, runs income projections, and stress-tests for risks.',
    how_step3_title: '3. Execute the roadmap',
    how_step3_desc: 'Get 3 personalized ideas with step-by-step roadmaps, real tools, and quick wins you can do this week.',

    ex_title: 'Real plans. Real cash.',
    ex_sub: 'A few of the plays CashClue AI has generated for users who actually executed.',
    ex_disclaimer: 'Results are illustrative and based on user-reported outcomes. Individual results vary based on effort, market, and execution.',
    ex_1_quote: 'CashClue told me to launch a Notion template store. Made $1,200 in month one. Wild.',
    ex_1_author: 'Maya R.',
    ex_1_role: 'Designer, Berlin',
    ex_1_stat: '$1,200/mo',
    ex_2_quote: 'I asked for a plan with $0 budget. It gave me a Twitter ghostwriting play. Three clients in 6 weeks.',
    ex_2_author: 'Devon K.',
    ex_2_role: 'Engineer, Austin',
    ex_2_stat: '3 clients',
    ex_3_quote: 'The AI called out my "unfair advantage" — I used to be a chef. Now I run a paid Substack on home cooking.',
    ex_3_author: 'Lina S.',
    ex_3_role: 'Writer, Lisbon',
    ex_3_stat: '800 subs',
    ex_in_90: 'in 90 days',

    price_badge: 'Pricing',
    price_title: 'One good idea pays for the year.',
    price_sub: 'Start free. Upgrade when a plan actually starts making you money.',
    price_starter: 'Starter',
    price_starter_tag: 'Test the waters',
    price_pro: 'Pro',
    price_pro_tag: 'For serious builders',
    price_empire: 'Empire',
    price_empire_tag: 'Build a portfolio of hustles',
    price_forever: 'forever',
    price_month: 'month',
    price_popular: 'Most popular',
    price_cta_free: 'Start free',
    price_cta_pro: 'Go Pro',
    price_cta_empire: 'Build my empire',
    price_guarantee: 'Cancel anytime. 14-day money-back guarantee on all paid plans.',
    feat_starter: ['3 AI-generated plans', 'Basic categories', '7-day idea history', 'Community Discord access'],
    feat_pro: ['Unlimited plan generations', 'Advanced niche categories', 'Income projection charts', 'Saved & tagged idea vault', 'Weekly 2026 market trend reports', 'Priority AI (faster + smarter)', 'Export to PDF / Notion'],
    feat_empire: ['Everything in Pro', 'AI Coach (chat 24/7)', 'Weekly accountability check-ins', 'Tax & legal structure playbook', 'Quarterly strategy reviews', 'Private mastermind group', 'Early access to new features'],

    footer_about: 'About',
    footer_blog: 'Blog',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_tagline: 'The AI strategist that turns your skills into a real money-making plan. Built for solopreneurs, side-hustlers, and anyone who\'d rather build than scroll.',
    footer_rights: 'CashClue AI. Built for builders.',
    footer_made: 'Made with grit, caffeine, and an unhealthy obsession with side hustles.',
    footer_product: 'Product',
    footer_company: 'Company',
  },

  ru: {
    nav_how: 'Как работает',
    nav_examples: 'Примеры',
    nav_pricing: 'Цены',
    cta_getPlan: 'Получить план',

    hero_badge: 'Новое: AI-дорожные карты теперь с данными рынка 2026',
    hero_title_1: 'Преврати свои навыки',
    hero_title_2: 'в реальные деньги.',
    hero_sub: 'CashClue AI изучает твои навыки, время, бюджет и цели — и строит персонализированный план заработка с реальными цифрами, шагами и прогнозами доходов. Никакой воды от гуру. Просто план, который можно начать выполнять сегодня.',
    hero_cta_primary: 'Сгенерировать мой план',
    hero_cta_secondary: 'Смотреть примеры',
    hero_stat_plans: 'планов создано',
    hero_stat_income: 'прогноз доходов',
    hero_stat_rating: 'средний рейтинг',

    theme_label: 'План для чего?',
    theme_sideHustle: 'Побочный заработок',
    theme_sideHustle_desc: 'Доп. доход поверх основной работы',
    theme_startup: 'Стартап-идея',
    theme_startup_desc: 'Реальный бизнес, под который можно поднять деньги',
    theme_content: 'Контент-креатор',
    theme_content_desc: 'YouTube / TikTok / рассылка / блог',
    theme_career: 'Смена карьеры',
    theme_career_desc: 'Перейти на более оплачиваемый путь',
    theme_passive: 'Пассивный доход',
    theme_passive_desc: 'Активы, приносящие доход, пока ты спишь',

    wiz_title: 'Построй свой план заработка',
    wiz_sub: 'Заполни честно. Чем лучше вводные, тем точнее план.',
    wiz_credits: 'бесплатных попыток',
    wiz_skills_label: 'Что ты умеешь?',
    wiz_skills_hint: '(навыки, хобби, прошлые работы)',
    wiz_skills_placeholder: 'напр. пишу на Python для финтеха, разбираюсь в Figma, люблю собак, репетиторствовал по математике...',
    wiz_hours_label: 'Часов в неделю готов уделять',
    wiz_hours_casual: 'Подручный (1ч)',
    wiz_hours_side: 'Подработка (10ч)',
    wiz_hours_grind: 'Вкалываю (40ч)',
    wiz_budget_label: 'Стартовый капитал',
    wiz_budget_broke: 'На мели ($0)',
    wiz_budget_boot: 'Бутстрэп ($1k)',
    wiz_budget_funded: 'С деньгами ($10k)',
    wiz_goal_label: 'Какая цель?',
    wiz_goal_hint: '(необязательно, но полезно)',
    wiz_goal_placeholder: 'напр. Заменить зарплату $4k/мес за 6 месяцев',
    wiz_risk_label: 'Готовность к риску',
    wiz_risk_low: 'Осторожный',
    wiz_risk_low_desc: 'Медленно и верно',
    wiz_risk_med: 'Баланс',
    wiz_risk_med_desc: 'Немного риска',
    wiz_risk_high: 'Агрессивный',
    wiz_risk_high_desc: 'Высокий потенциал',
    wiz_generate: 'Сгенерировать мой план',
    wiz_generate_hint: 'Занимает ~30 секунд. Без регистрации для первых 3 планов.',
    wiz_loading_1: 'Анализирую твои навыки...',
    wiz_loading_2: 'Сканирую тренды рынка 2026...',
    wiz_loading_3: 'Считаю прогнозы доходов...',
    wiz_loading_4: 'Сравниваю 50+ моделей бизнеса...',
    wiz_loading_5: 'Строю твою дорожную карту...',
    wiz_loading_6: 'Проверяю на риски...',
    wiz_error_empty: 'Сначала расскажи о себе',
    wiz_error_empty_desc: 'Добавь навыки или цель, чтобы AI было с чем работать.',
    wiz_error_failed: 'Генерация не удалась',
    wiz_error_failed_desc: 'Попробуй ещё раз через мгновение.',
    wiz_success_title: 'Твой план готов',
    wiz_success_desc: 'Сгенерировано 3 персональные идеи.',

    res_strategy_title: 'Твоя AI-стратегия',
    res_recommended: 'РЕКОМЕНДОВАНО',
    res_monthlyIncome: 'Доход в месяц',
    res_startupCost: 'Стартовые затраты',
    res_firstDollar: 'Первые $',
    res_profitable: 'Окупаемость',
    res_unfair: 'Твоё нечестное преимущество',
    res_howPaid: 'Как ты получаешь деньги',
    res_roadmap: 'Дорожная карта',
    res_tools: 'Инструменты и ресурсы',
    res_risks: 'Честные риски',
    res_quickWins: 'Быстрые победы — сделай на ЭТОЙ НЕДЕЛЕ',
    res_longTerm: 'Долгосрочные ходы — ставки на 6+ месяцев',
    res_regenerate: 'Сгенерировать ещё план',
    res_unlock: 'Открыть безлимит',
    res_left: 'бесплатных попыток осталось',

    how_title: 'От нуля до плана за 30 секунд.',
    how_sub: 'Три шага. Без воды. Без 47-страничного PDF, который ты не прочитаешь.',
    how_step1_title: '1. Опиши себя',
    how_step1_desc: 'Назови AI свои навыки, часы, бюджет и цель. Будь честен — мусор на входе, мусор на выходе.',
    how_step2_title: '2. AI строит план',
    how_step2_desc: 'CashClue анализирует 50+ моделей бизнеса под твой профиль, считает доходы и проверяет риски.',
    how_step3_title: '3. Выполняй дорожную карту',
    how_step3_desc: 'Получи 3 персональные идеи с пошаговым планом, реальными инструментами и быстрыми победами.',

    ex_title: 'Реальные планы. Реальные деньги.',
    ex_sub: 'Парочка идей, которые CashClue AI сгенерировал для людей, реально их выполнивших.',
    ex_disclaimer: 'Результаты иллюстративны и основаны на отчётах пользователей. Индивидуальные итоги зависят от усилий, рынка и исполнения.',
    ex_1_quote: 'CashClue посоветовал открыть магазин шаблонов для Notion. В первый месяц заработал $1 200. Дикий случай.',
    ex_1_author: 'Майя Р.',
    ex_1_role: 'Дизайнер, Берлин',
    ex_1_stat: '$1 200/мес',
    ex_2_quote: 'Просил план с бюджетом $0. Выдал Twitter-ghostwriting. Трое клиентов за 6 недель.',
    ex_2_author: 'Девон К.',
    ex_2_role: 'Инженер, Остин',
    ex_2_stat: '3 клиента',
    ex_3_quote: 'AI указал на моё "нечестное преимущество" — раньше был поваром. Теперь веду платную рассылку о домашней кухне.',
    ex_3_author: 'Лина С.',
    ex_3_role: 'Писатель, Лиссабон',
    ex_3_stat: '800 подписчиков',
    ex_in_90: 'за 90 дней',

    price_badge: 'Цены',
    price_title: 'Одна хорошая идея окупает весь год.',
    price_sub: 'Начни бесплатно. Переходи на платный, когда план реально начнёт приносить деньги.',
    price_starter: 'Старт',
    price_starter_tag: 'Присмотреться',
    price_pro: 'Pro',
    price_pro_tag: 'Для серьёзных билдеров',
    price_empire: 'Empire',
    price_empire_tag: 'Строить портфель проектов',
    price_forever: 'навсегда',
    price_month: 'мес',
    price_popular: 'Популярный',
    price_cta_free: 'Начать бесплатно',
    price_cta_pro: 'Взять Pro',
    price_cta_empire: 'Строить империю',
    price_guarantee: 'Отмена в любой момент. Гарантия возврата 14 дней на все платные тарифы.',
    feat_starter: ['3 AI-плана', 'Базовые категории', 'История идей на 7 дней', 'Доступ в Discord-сообщество'],
    feat_pro: ['Безлимитная генерация', 'Продвинутые ниши', 'Графики прогноза доходов', 'Архив с тегами', 'Еженедельные отчёты о трендах 2026', 'Приоритетный AI (быстрее и умнее)', 'Экспорт в PDF / Notion'],
    feat_empire: ['Всё из Pro', 'AI-коуч (чат 24/7)', 'Еженедельные чек-ины', 'Playbook по налогам и юр. структуре', 'Ежеквартальные обзоры стратегии', 'Закрытая mastermind-группа', 'Ранний доступ к фичам'],

    footer_about: 'О нас',
    footer_blog: 'Блог',
    footer_privacy: 'Конфиденциальность',
    footer_terms: 'Условия',
    footer_tagline: 'AI-стратег, который превращает твои навыки в реальный план заработка. Для солопредпринимателей, хаслеров и всех, кто предпочитает строить, а не скроллить.',
    footer_rights: 'CashClue AI. Создано для билдеров.',
    footer_made: 'Сделано со злобой, кофеином и нездоровой одержимостью side-hustle-ами.',
    footer_product: 'Продукт',
    footer_company: 'Компания',
  },

  es: {
    nav_how: 'Cómo funciona',
    nav_examples: 'Ejemplos',
    nav_pricing: 'Precios',
    cta_getPlan: 'Mi plan',

    hero_badge: 'Nuevo: las hojas de ruta generadas por IA ahora incluyen datos de mercado 2026',
    hero_title_1: 'Convierte tus habilidades',
    hero_title_2: 'en dinero real.',
    hero_sub: 'CashClue AI lee tus habilidades, tiempo, presupuesto y objetivos — y construye un plan personalizado para ganar dinero con cifras reales, pasos reales y proyecciones reales. Sin humo de gurú. Solo un plan que puedes empezar hoy.',
    hero_cta_primary: 'Generar mi plan',
    hero_cta_secondary: 'Ver ejemplos',
    hero_stat_plans: 'planes generados',
    hero_stat_income: 'ingresos proyectados',
    hero_stat_rating: 'valoración media',

    theme_label: '¿Para qué quieres un plan?',
    theme_sideHustle: 'Side Hustle',
    theme_sideHustle_desc: 'Ingresos extra además de tu trabajo',
    theme_startup: 'Idea de Startup',
    theme_startup_desc: 'Un negocio real para levantar capital',
    theme_content: 'Creador de Contenido',
    theme_content_desc: 'YouTube / TikTok / Newsletter / Blog',
    theme_career: 'Cambio de Carrera',
    theme_career_desc: 'Pasar a algo mejor pagado',
    theme_passive: 'Ingresos Pasivos',
    theme_passive_desc: 'Activos que generan mientras duermes',

    wiz_title: 'Crea tu plan',
    wiz_sub: 'Rellena con honestidad. Cuanto mejor sea la entrada, más afilado será el plan.',
    wiz_credits: 'créditos gratis',
    wiz_skills_label: '¿En qué eres bueno?',
    wiz_skills_hint: '(habilidades, hobbies, trabajos anteriores)',
    wiz_skills_placeholder: 'ej. escribo Python para un fintech, soy decente en Figma, amo los perros, antes daba clases de matemáticas...',
    wiz_hours_label: 'Horas por semana que puedes dedicar',
    wiz_hours_casual: 'Casual (1h)',
    wiz_hours_side: 'Side-gig (10h)',
    wiz_hours_grind: 'A tope (40h)',
    wiz_budget_label: 'Capital inicial',
    wiz_budget_broke: 'Sin nada ($0)',
    wiz_budget_boot: 'Bootstrapped ($1k)',
    wiz_budget_funded: 'Con fondos ($10k)',
    wiz_goal_label: '¿Cuál es tu meta?',
    wiz_goal_hint: '(opcional pero útil)',
    wiz_goal_placeholder: 'ej. Reemplazar mi salario de $4k/mes en 6 meses',
    wiz_risk_label: 'Tolerancia al riesgo',
    wiz_risk_low: 'Cauteloso',
    wiz_risk_low_desc: 'Lento y estable',
    wiz_risk_med: 'Equilibrado',
    wiz_risk_med_desc: 'Algo de riesgo',
    wiz_risk_high: 'Agresivo',
    wiz_risk_high_desc: 'Mucho potencial',
    wiz_generate: 'Generar mi plan',
    wiz_generate_hint: 'Tarda ~30 segundos. Sin registro para los primeros 3 planes.',
    wiz_loading_1: 'Analizando tus habilidades...',
    wiz_loading_2: 'Escaneando tendencias de mercado 2026...',
    wiz_loading_3: 'Calculando proyecciones de ingresos...',
    wiz_loading_4: 'Comparando +50 modelos de negocio...',
    wiz_loading_5: 'Construyendo tu hoja de ruta...',
    wiz_loading_6: 'Evaluando riesgos...',
    wiz_error_empty: 'Primero cuéntanos sobre ti',
    wiz_error_empty_desc: 'Añade tus habilidades o tu meta para que la IA tenga algo con qué trabajar.',
    wiz_error_failed: 'Generación fallida',
    wiz_error_failed_desc: 'Inténtalo de nuevo en un momento.',
    wiz_success_title: 'Tu plan está listo',
    wiz_success_desc: '3 ideas personalizadas generadas.',

    res_strategy_title: 'Tu estrategia generada por IA',
    res_recommended: 'RECOMENDADO',
    res_monthlyIncome: 'Ingresos mensuales',
    res_startupCost: 'Coste de arranque',
    res_firstDollar: 'Primer $',
    res_profitable: 'Rentable',
    res_unfair: 'Tu ventaja injusta',
    res_howPaid: 'Cómo cobras',
    res_roadmap: 'Hoja de ruta',
    res_tools: 'Herramientas y recursos',
    res_risks: 'Riesgos honestos',
    res_quickWins: 'Victorias rápidas — hazlas ESTA SEMANA',
    res_longTerm: 'Jugadas a largo plazo — apuestas de 6+ meses',
    res_regenerate: 'Generar otro plan',
    res_unlock: 'Desbloquear planes ilimitados',
    res_left: 'créditos gratis restantes',

    how_title: 'De cero a plan en 30 segundos.',
    how_sub: 'Tres pasos. Sin humo. Sin un PDF de 47 páginas que nunca leerás.',
    how_step1_title: '1. Descríbete',
    how_step1_desc: 'Dile a la IA tus habilidades, horas, presupuesto y meta. Sé honesto — si entra basura, sale basura.',
    how_step2_title: '2. La IA construye tu plan',
    how_step2_desc: 'CashClue analiza +50 modelos de negocio contra tu perfil, calcula ingresos y evalúa riesgos.',
    how_step3_title: '3. Ejecuta la hoja de ruta',
    how_step3_desc: 'Recibe 3 ideas personalizadas con pasos, herramientas reales y victorias rápidas para esta semana.',

    ex_title: 'Planes reales. Dinero real.',
    ex_sub: 'Algunas jugadas que CashClue AI generó para usuarios que las ejecutaron.',
    ex_disclaimer: 'Los resultados son ilustrativos y basados en lo reportado por usuarios. Los resultados individuales varían según esfuerzo, mercado y ejecución.',
    ex_1_quote: 'CashClue me dijo que abriera una tienda de plantillas Notion. Saqué $1.200 en el primer mes. Una locura.',
    ex_1_author: 'Maya R.',
    ex_1_role: 'Diseñadora, Berlín',
    ex_1_stat: '$1.200/mes',
    ex_2_quote: 'Pedí un plan con $0 de presupuesto. Me dio ghostwriting en Twitter. Tres clientes en 6 semanas.',
    ex_2_author: 'Devon K.',
    ex_2_role: 'Ingeniero, Austin',
    ex_2_stat: '3 clientes',
    ex_3_quote: 'La IA señaló mi "ventaja injusta" — fui chef. Ahora tengo un Substack de pago sobre cocina casera.',
    ex_3_author: 'Lina S.',
    ex_3_role: 'Escritora, Lisboa',
    ex_3_stat: '800 suscriptores',
    ex_in_90: 'en 90 días',

    price_badge: 'Precios',
    price_title: 'Una buena idea paga el año entero.',
    price_sub: 'Empieza gratis. Mejora cuando un plan realmente te empiece a generar dinero.',
    price_starter: 'Starter',
    price_starter_tag: 'Para probar',
    price_pro: 'Pro',
    price_pro_tag: 'Para creadores serios',
    price_empire: 'Empire',
    price_empire_tag: 'Construye un portafolio de proyectos',
    price_forever: 'para siempre',
    price_month: 'mes',
    price_popular: 'Más popular',
    price_cta_free: 'Empezar gratis',
    price_cta_pro: 'Pasar a Pro',
    price_cta_empire: 'Construir imperio',
    price_guarantee: 'Cancela cuando quieras. Garantía de devolución de 14 días en todos los planes de pago.',
    feat_starter: ['3 planes generados por IA', 'Categorías básicas', 'Historial de 7 días', 'Acceso a Discord'],
    feat_pro: ['Generación ilimitada', 'Nichos avanzados', 'Gráficas de proyección', 'Archivo con etiquetas', 'Informes semanales de tendencias 2026', 'IA prioritaria (más rápida e inteligente)', 'Exportar a PDF / Notion'],
    feat_empire: ['Todo de Pro', 'AI Coach (chat 24/7)', 'Check-ins semanales', 'Playbook fiscal y legal', 'Revisiones trimestrales', 'Mastermind privada', 'Acceso anticipado'],

    footer_about: 'Acerca',
    footer_blog: 'Blog',
    footer_privacy: 'Privacidad',
    footer_terms: 'Términos',
    footer_tagline: 'El estratega de IA que convierte tus habilidades en un plan real para ganar dinero. Hecho para solopreneurs y quienes prefieren construir a hacer scroll.',
    footer_rights: 'CashClue AI. Hecho para creadores.',
    footer_made: 'Hecho con agallas, cafeína y una obsesión poco sana con los side hustles.',
    footer_product: 'Producto',
    footer_company: 'Empresa',
  },

  de: {
    nav_how: 'So funktioniert\'s',
    nav_examples: 'Beispiele',
    nav_pricing: 'Preise',
    cta_getPlan: 'Mein Plan',

    hero_badge: 'Neu: KI-generierte Roadmaps enthalten jetzt Marktdaten 2026',
    hero_title_1: 'Mach aus deinen Skills',
    hero_title_2: 'hartes Geld.',
    hero_sub: 'CashClue AI liest deine Skills, Zeit, Budget und Ziele — und baut dir einen personalisierten Geld-Verdienstplan mit echten Zahlen, echten Schritten und echten Einkommensprognosen. Kein Guru-Geschwätz. Nur ein Plan, den du heute starten kannst.',
    hero_cta_primary: 'Plan generieren',
    hero_cta_secondary: 'Beispiele ansehen',
    hero_stat_plans: 'Pläne generiert',
    hero_stat_income: 'projiziertes Einkommen',
    hero_stat_rating: 'ø Bewertung',

    theme_label: 'Wofür willst du einen Plan?',
    theme_sideHustle: 'Side Hustle',
    theme_sideHustle_desc: 'Zusätzliches Einkommen neben dem Job',
    theme_startup: 'Startup-Idee',
    theme_startup_desc: 'Ein echtes Business für Investoren',
    theme_content: 'Content Creator',
    theme_content_desc: 'YouTube / TikTok / Newsletter / Blog',
    theme_career: 'Karriere-Pivot',
    theme_career_desc: 'Auf besser bezahlten Pfad wechseln',
    theme_passive: 'Passives Einkommen',
    theme_passive_desc: 'Assets, die im Schlaf verdienen',

    wiz_title: 'Baue deinen Plan',
    wiz_sub: 'Füll das ehrlich aus. Je besser die Eingabe, desto schärfer der Plan.',
    wiz_credits: 'Frei-Credits',
    wiz_skills_label: 'Was kannst du gut?',
    wiz_skills_hint: '(Skills, Hobbys, frühere Jobs)',
    wiz_skills_placeholder: 'z. B. ich schreibe Python für ein Fintech, bin decent in Figma, liebe Hunde, habe früher Mathe-Nachhilfe gegeben...',
    wiz_hours_label: 'Stunden pro Woche',
    wiz_hours_casual: 'Gelegenheit (1h)',
    wiz_hours_side: 'Nebenjob (10h)',
    wiz_hours_grind: 'Vollgas (40h)',
    wiz_budget_label: 'Startkapital',
    wiz_budget_broke: 'Pleite ($0)',
    wiz_budget_boot: 'Bootstrapped ($1k)',
    wiz_budget_funded: 'Mit Budget ($10k)',
    wiz_goal_label: 'Was ist dein Ziel?',
    wiz_goal_hint: '(optional, aber hilfreich)',
    wiz_goal_placeholder: 'z. B. Mein $4k/Mon-Gehalt in 6 Monaten ersetzen',
    wiz_risk_label: 'Risikobereitschaft',
    wiz_risk_low: 'Sicher',
    wiz_risk_low_desc: 'Langsam & stabil',
    wiz_risk_med: 'Ausgewogen',
    wiz_risk_med_desc: 'Etwas Risiko',
    wiz_risk_high: 'Aggressiv',
    wiz_risk_high_desc: 'Hohes Potenzial',
    wiz_generate: 'Plan generieren',
    wiz_generate_hint: 'Dauert ~30 Sekunden. Keine Anmeldung nötig für die ersten 3 Pläne.',
    wiz_loading_1: 'Analysiere deine Skills...',
    wiz_loading_2: 'Scanne Markttrends 2026...',
    wiz_loading_3: 'Berechne Einkommensprognosen...',
    wiz_loading_4: 'Vergleiche 50+ Geschäftsmodelle...',
    wiz_loading_5: 'Baue deine Roadmap...',
    wiz_loading_6: 'Stresstest auf Risiken...',
    wiz_error_empty: 'Erzähl uns erst von dir',
    wiz_error_empty_desc: 'Füg deine Skills oder dein Ziel hinzu, damit die KI etwas zum Arbeiten hat.',
    wiz_error_failed: 'Generierung fehlgeschlagen',
    wiz_error_failed_desc: 'Versuch\'s in einem Moment nochmal.',
    wiz_success_title: 'Dein Plan ist fertig',
    wiz_success_desc: '3 personalisierte Ideen generiert.',

    res_strategy_title: 'Deine KI-Strategie',
    res_recommended: 'EMPFOHLEN',
    res_monthlyIncome: 'Monatseinkommen',
    res_startupCost: 'Startkosten',
    res_firstDollar: 'Erster $',
    res_profitable: 'Profitabel',
    res_unfair: 'Dein unfairer Vorteil',
    res_howPaid: 'Wie du Geld verdienst',
    res_roadmap: 'Roadmap',
    res_tools: 'Tools & Ressourcen',
    res_risks: 'Ehrliche Risiken',
    res_quickWins: 'Schnelle Wins — diese WOCHE machen',
    res_longTerm: 'Langfristige Plays — 6+ Monats-Wetten',
    res_regenerate: 'Weiteren Plan generieren',
    res_unlock: 'Unbegrenzt freischalten',
    res_left: 'Frei-Credits übrig',

    how_title: 'Von null zum Plan in 30 Sekunden.',
    how_sub: 'Drei Schritte. Kein Bullshit. Kein 47-Seiten-PDF, das du nie liest.',
    how_step1_title: '1. Beschreib dich',
    how_step1_desc: 'Sag der KI deine Skills, Stunden, Budget und Ziel. Sei ehrlich — garbage in, garbage out.',
    how_step2_title: '2. KI baut deinen Plan',
    how_step2_desc: 'CashClue analysiert 50+ Geschäftsmodelle gegen dein Profil, rechnet Einkommen und testet Risiken.',
    how_step3_title: '3. Führ die Roadmap aus',
    how_step3_desc: 'Krieg 3 personalisierte Ideen mit Schritt-für-Schritt-Roadmap, echten Tools und schnellen Wins.',

    ex_title: 'Echte Pläne. Echtes Geld.',
    ex_sub: 'Ein paar Plays, die CashClue AI für Nutzer generiert hat, die sie wirklich umgesetzt haben.',
    ex_disclaimer: 'Ergebnisse sind illustrativ und basieren auf Nutzerangaben. Individuelle Ergebnisse variieren je nach Einsatz, Markt und Umsetzung.',
    ex_1_quote: 'CashClue hat mir geraten, einen Notion-Template-Store zu eröffnen. $1.200 im ersten Monat. Verrückt.',
    ex_1_author: 'Maya R.',
    ex_1_role: 'Designerin, Berlin',
    ex_1_stat: '$1.200/Mon',
    ex_2_quote: 'Ich wollte einen Plan mit $0 Budget. Hat mir Twitter-Ghostwriting gegeben. Drei Kunden in 6 Wochen.',
    ex_2_author: 'Devon K.',
    ex_2_role: 'Engineer, Austin',
    ex_2_stat: '3 Kunden',
    ex_3_quote: 'Die KI nannte meinen "unfairen Vorteil" — ich war früher Koch. Jetzt betreibe ich einen kostenpflichtigen Substack über Home Cooking.',
    ex_3_author: 'Lina S.',
    ex_3_role: 'Autorin, Lissabon',
    ex_3_stat: '800 Abos',
    ex_in_90: 'in 90 Tagen',

    price_badge: 'Preise',
    price_title: 'Eine gute Idee zahlt das ganze Jahr.',
    price_sub: 'Start kostenlos. Upgrade, wenn ein Plan wirklich Geld bringt.',
    price_starter: 'Starter',
    price_starter_tag: 'Reinschnuppern',
    price_pro: 'Pro',
    price_pro_tag: 'Für ernsthafte Builder',
    price_empire: 'Empire',
    price_empire_tag: 'Portfolio aus Hustles aufbauen',
    price_forever: 'für immer',
    price_month: 'Monat',
    price_popular: 'Am beliebtesten',
    price_cta_free: 'Kostenlos starten',
    price_cta_pro: 'Pro holen',
    price_cta_empire: 'Imperium bauen',
    price_guarantee: 'Jederzeit kündbar. 14-Tage-Geld-zurück-Garantie auf alle bezahlten Pläne.',
    feat_starter: ['3 KI-Pläne', 'Basis-Kategorien', '7-Tage-Ideenverlauf', 'Discord-Community'],
    feat_pro: ['Unbegrenzte Generierung', 'Erweiterte Nischen', 'Einkommens-Prognose-Charts', 'Archiv mit Tags', 'Wöchentliche 2026-Trend-Reports', 'Priority-KI (schneller & smarter)', 'Export zu PDF / Notion'],
    feat_empire: ['Alles aus Pro', 'KI-Coach (24/7 Chat)', 'Wöchentliche Check-ins', 'Steuer- & Rechts-Playbook', 'Quartals-Strategie-Reviews', 'Private Mastermind', 'Early Access auf Features'],

    footer_about: 'Über',
    footer_blog: 'Blog',
    footer_privacy: 'Datenschutz',
    footer_terms: 'AGB',
    footer_tagline: 'Der KI-Stratege, der deine Skills in einen echten Geld-Verdienstplan verwandelt. Für Solopreneurs und alle, die lieber bauen als scrollen.',
    footer_rights: 'CashClue AI. Für Builder gemacht.',
    footer_made: 'Mit Biss, Koffein und einer ungesunden Side-Hustle-Obsession gemacht.',
    footer_product: 'Produkt',
    footer_company: 'Firma',
  },

  fr: {
    nav_how: 'Comment ça marche',
    nav_examples: 'Exemples',
    nav_pricing: 'Tarifs',
    cta_getPlan: 'Mon plan',

    hero_badge: 'Nouveau : les feuilles de route IA incluent les données marché 2026',
    hero_title_1: 'Transforme tes compétences',
    hero_title_2: 'en argent sonnant.',
    hero_sub: 'CashClue AI lit tes compétences, ton temps, ton budget et tes objectifs — puis construit un plan personnalisé pour gagner de l\'argent avec de vrais chiffres, de vraies étapes et de vraies projections. Pas de blabbe de gourou. Juste un plan que tu peux démarrer aujourd\'hui.',
    hero_cta_primary: 'Générer mon plan',
    hero_cta_secondary: 'Voir des exemples',
    hero_stat_plans: 'plans générés',
    hero_stat_income: 'revenus projetés',
    hero_stat_rating: 'note moyenne',

    theme_label: 'Pour quoi veux-tu un plan ?',
    theme_sideHustle: 'Side Hustle',
    theme_sideHustle_desc: 'Revenus en plus de ton job',
    theme_startup: 'Idée de Startup',
    theme_startup_desc: 'Un vrai business pour lever des fonds',
    theme_content: 'Créateur de Contenu',
    theme_content_desc: 'YouTube / TikTok / Newsletter / Blog',
    theme_career: 'Reconversion',
    theme_career_desc: 'Passer à un chemin mieux payé',
    theme_passive: 'Revenus Passifs',
    theme_passive_desc: 'Des actifs qui rapportent pendant ton sommeil',

    wiz_title: 'Construis ton plan',
    wiz_sub: 'Remplis honnêtement. Meilleure l\'entrée, plus net le plan.',
    wiz_credits: 'crédits gratuits',
    wiz_skills_label: 'Dans quoi es-tu bon ?',
    wiz_skills_hint: '(compétences, hobbies, anciens jobs)',
    wiz_skills_placeholder: 'ex. j\'écris du Python pour un fintech, je suis correct en Figma, j\'aime les chiens, je donnais des cours de maths...',
    wiz_hours_label: 'Heures par semaine',
    wiz_hours_casual: 'Occasionnel (1h)',
    wiz_hours_side: 'Side-gig (10h)',
    wiz_hours_grind: 'À fond (40h)',
    wiz_budget_label: 'Capital de départ',
    wiz_budget_broke: 'Sans le sou ($0)',
    wiz_budget_boot: 'Bootstrappé ($1k)',
    wiz_budget_funded: 'Avec budget ($10k)',
    wiz_goal_label: 'Quel est ton objectif ?',
    wiz_goal_hint: '(optionnel mais utile)',
    wiz_goal_placeholder: 'ex. Remplacer mon salaire de 4k$/mois en 6 mois',
    wiz_risk_label: 'Tolérance au risque',
    wiz_risk_low: 'Prudent',
    wiz_risk_low_desc: 'Lent et stable',
    wiz_risk_med: 'Équilibré',
    wiz_risk_med_desc: 'Un peu de risque',
    wiz_risk_high: 'Agressif',
    wiz_risk_high_desc: 'Haut potentiel',
    wiz_generate: 'Générer mon plan',
    wiz_generate_hint: 'Prend ~30 secondes. Sans inscription pour les 3 premiers plans.',
    wiz_loading_1: 'Analyse de tes compétences...',
    wiz_loading_2: 'Scan des tendances marché 2026...',
    wiz_loading_3: 'Calcul des projections de revenus...',
    wiz_loading_4: 'Comparaison de 50+ modèles...',
    wiz_loading_5: 'Construction de ta feuille de route...',
    wiz_loading_6: 'Test de résistance des risques...',
    wiz_error_empty: 'Parle-nous de toi d\'abord',
    wiz_error_empty_desc: 'Ajoute tes compétences ou ton objectif pour que l\'IA ait de la matière.',
    wiz_error_failed: 'Génération échouée',
    wiz_error_failed_desc: 'Réessaie dans un instant.',
    wiz_success_title: 'Ton plan est prêt',
    wiz_success_desc: '3 idées personnalisées générées.',

    res_strategy_title: 'Ta stratégie IA',
    res_recommended: 'RECOMMANDÉ',
    res_monthlyIncome: 'Revenus mensuels',
    res_startupCost: 'Coût de lancement',
    res_firstDollar: 'Premier $',
    res_profitable: 'Rentable',
    res_unfair: 'Ton avantage déloyal',
    res_howPaid: 'Comment tu encaisses',
    res_roadmap: 'Feuille de route',
    res_tools: 'Outils & ressources',
    res_risks: 'Risques honnêtes',
    res_quickWins: 'Wins rapides — à faire CETTE SEMAINE',
    res_longTerm: 'Plays long terme — paris 6+ mois',
    res_regenerate: 'Générer un autre plan',
    res_unlock: 'Débloquer l\'illimité',
    res_left: 'crédits gratuits restants',

    how_title: 'De zéro à plan en 30 secondes.',
    how_sub: 'Trois étapes. Pas de blabla. Pas de PDF de 47 pages que tu liras jamais.',
    how_step1_title: '1. Décris-toi',
    how_step1_desc: 'Donne à l\'IA tes compétences, tes heures, ton budget et ton objectif. Sois honnête — entrée poubelle, sortie poubelle.',
    how_step2_title: '2. L\'IA construit ton plan',
    how_step2_desc: 'CashClue analyse 50+ modèles de business face à ton profil, projette les revenus et teste les risques.',
    how_step3_title: '3. Exécute la feuille de route',
    how_step3_desc: 'Reçois 3 idées personnalisées avec étapes, outils réels et wins rapides pour cette semaine.',

    ex_title: 'Vrais plans. Vrai cash.',
    ex_sub: 'Quelques plays que CashClue AI a générés pour des utilisateurs qui les ont exécutés.',
    ex_disclaimer: 'Les résultats sont illustratifs et basés sur les retours utilisateurs. Les résultats individuels varient selon l\'effort, le marché et l\'exécution.',
    ex_1_quote: 'CashClue m\'a dit de lancer une boutique de templates Notion. J\'ai fait 1 200 $ le premier mois. Une dinguerie.',
    ex_1_author: 'Maya R.',
    ex_1_role: 'Designer, Berlin',
    ex_1_stat: '1 200 $/mois',
    ex_2_quote: 'J\'ai demandé un plan avec 0 $ de budget. Il m\'a donné du ghostwriting Twitter. Trois clients en 6 semaines.',
    ex_2_author: 'Devon K.',
    ex_2_role: 'Ingénieur, Austin',
    ex_2_stat: '3 clients',
    ex_3_quote: 'L\'IA a pointé mon "avantage déloyal" — j\'étais chef. Maintenant j\'ai un Substack payant sur la cuisine maison.',
    ex_3_author: 'Lina S.',
    ex_3_role: 'Écrivaine, Lisbonne',
    ex_3_stat: '800 abonnés',
    ex_in_90: 'en 90 jours',

    price_badge: 'Tarifs',
    price_title: 'Une bonne idée paie l\'année.',
    price_sub: 'Commence gratuitement. Passe au payant quand un plan te rapporte vraiment.',
    price_starter: 'Starter',
    price_starter_tag: 'Pour tester',
    price_pro: 'Pro',
    price_pro_tag: 'Pour les builders sérieux',
    price_empire: 'Empire',
    price_empire_tag: 'Construire un portefeuille de projets',
    price_forever: 'à vie',
    price_month: 'mois',
    price_popular: 'Le plus populaire',
    price_cta_free: 'Commencer gratuit',
    price_cta_pro: 'Passer Pro',
    price_cta_empire: 'Bâtir mon empire',
    price_guarantee: 'Annule à tout moment. Garantie remboursé 14 jours sur tous les forfaits payants.',
    feat_starter: ['3 plans IA', 'Catégories de base', 'Historique 7 jours', 'Accès Discord'],
    feat_pro: ['Génération illimitée', 'Niches avancées', 'Graphiques de projection', 'Archives avec tags', 'Rapports hebdo tendances 2026', 'IA prioritaire (plus rapide et smart)', 'Export PDF / Notion'],
    feat_empire: ['Tout Pro', 'Coach IA (chat 24/7)', 'Check-ins hebdo', 'Playbook fiscal & juridique', 'Revue stratégique trimestrielle', 'Mastermind privée', 'Accès anticipé aux features'],

    footer_about: 'À propos',
    footer_blog: 'Blog',
    footer_privacy: 'Confidentialité',
    footer_terms: 'Conditions',
    footer_tagline: 'Le stratège IA qui transforme tes compétences en un vrai plan pour gagner de l\'argent. Pour les solopreneurs et ceux qui préfèrent bâtir que scroller.',
    footer_rights: 'CashClue AI. Construit pour les builders.',
    footer_made: 'Fait avec du guts, de la caféine et une obsession malsaine des side hustles.',
    footer_product: 'Produit',
    footer_company: 'Société',
  },
};

export const DEFAULT_LANG: Lang = 'en';

const LANG_KEY = 'cashclue:lang';

export function loadLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = window.localStorage.getItem(LANG_KEY) as Lang | null;
  if (stored && DICT[stored]) return stored;
  // Try to detect browser language
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  if (nav && (DICT as Record<string, Dict>)[nav]) return nav as Lang;
  return DEFAULT_LANG;
}

export function saveLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANG_KEY, lang);
}
