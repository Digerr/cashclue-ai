// BrainBolt i18n — quiz platform

export type Lang = 'en' | 'ru' | 'es' | 'de' | 'fr';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export interface Dict {
  nav_quizzes: string;
  nav_leaderboard: string;
  nav_faq: string;
  nav_pricing: string;
  cta_play: string;

  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_sub: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_stat_players: string;
  hero_stat_quizzes: string;
  hero_stat_questions: string;

  daily_title: string;
  daily_sub: string;
  daily_play: string;
  daily_done: string;
  daily_streak: string;

  quizzes_title: string;
  quizzes_sub: string;
  quizzes_search: string;
  quizzes_all: string;
  quizzes_empty: string;
  quiz_questions: string;
  quiz_plays: string;
  quiz_play: string;

  // Player
  player_question: string;
  player_of: string;
  player_skip: string;
  player_time_left: string;
  player_correct: string;
  player_wrong: string;
  player_combo: string;
  player_combo_x2: string;
  player_score: string;
  player_streak: string;
  player_next: string;
  player_finish: string;
  player_explanation: string;

  // Results
  results_title: string;
  results_score: string;
  results_correct: string;
  results_correct_of: string;
  results_time: string;
  results_max_streak: string;
  results_xp_earned: string;
  results_perfect: string;
  results_great: string;
  results_good: string;
  results_keep_trying: string;
  results_share: string;
  results_share_text: string;
  results_play_again: string;
  results_try_another: string;
  results_review_answers: string;
  results_your_answer: string;
  results_correct_answer: string;

  // Leaderboard
  lb_title: string;
  lb_sub: string;
  lb_rank: string;
  lb_player: string;
  lb_xp: string;
  lb_level: string;
  lb_quizzes: string;
  lb_you: string;
  lb_empty: string;

  // Profile
  profile_title: string;
  profile_sub: string;
  profile_edit: string;
  profile_name: string;
  profile_avatar: string;
  profile_save: string;
  profile_level: string;
  profile_xp: string;
  profile_to_next: string;
  profile_total_quizzes: string;
  profile_total_correct: string;
  profile_best_streak: string;
  profile_daily_streak: string;
  profile_achievements: string;
  profile_recent: string;
  profile_no_recent: string;

  // Features
  features_title: string;
  features_sub: string;
  feat_1_t: string; feat_1_d: string;
  feat_2_t: string; feat_2_d: string;
  feat_3_t: string; feat_3_d: string;
  feat_4_t: string; feat_4_d: string;
  feat_5_t: string; feat_5_d: string;
  feat_6_t: string; feat_6_d: string;

  // Pricing
  price_badge: string;
  price_title: string;
  price_sub: string;
  price_starter: string;
  price_starter_tag: string;
  price_pro: string;
  price_pro_tag: string;
  price_forever: string;
  price_month: string;
  price_popular: string;
  price_cta_free: string;
  price_cta_pro: string;
  price_guarantee: string;
  feat_starter: string[];
  feat_pro: string[];

  // FAQ
  faq_title: string;
  faq_sub: string;
  faq_q1: string; faq_a1: string;
  faq_q2: string; faq_a2: string;
  faq_q3: string; faq_a3: string;
  faq_q4: string; faq_a4: string;
  faq_q5: string; faq_a5: string;
  faq_q6: string; faq_a6: string;

  footer_tagline: string;
  footer_rights: string;
  footer_made: string;
  footer_product: string;
  footer_company: string;
  footer_about: string;
  footer_blog: string;
  footer_privacy: string;
  footer_terms: string;

  difficulty_easy: string;
  difficulty_medium: string;
  difficulty_hard: string;
}

const en: Dict = {
  nav_quizzes: 'Quizzes',
  nav_leaderboard: 'Leaderboard',
  nav_faq: 'FAQ',
  nav_pricing: 'Pricing',
  cta_play: 'Play now',

  hero_badge: 'No signup · 80+ questions · Daily challenges',
  hero_title_1: 'Train your brain.',
  hero_title_2: 'Beat the leaderboard.',
  hero_sub: 'BrainBolt is a fast-paced quiz game with XP, levels, streaks, and achievements. Pick a category, answer fast, build combos, and climb the global leaderboard. No account needed to start.',
  hero_cta_primary: 'Play now',
  hero_cta_secondary: 'See quizzes',
  hero_stat_players: 'players',
  hero_stat_quizzes: 'quizzes',
  hero_stat_questions: 'questions',

  daily_title: 'Daily Challenge',
  daily_sub: 'Same quiz for everyone today. Beat it to extend your streak.',
  daily_play: 'Play daily',
  daily_done: 'Completed today',
  daily_streak: 'day streak',

  quizzes_title: 'All quizzes',
  quizzes_sub: 'Pick a category and test your knowledge. New quizzes added weekly.',
  quizzes_search: 'Search quizzes...',
  quizzes_all: 'All',
  quizzes_empty: 'No quizzes found',
  quiz_questions: 'questions',
  quiz_plays: 'plays',
  quiz_play: 'Play',

  player_question: 'Question',
  player_of: 'of',
  player_skip: 'Skip',
  player_time_left: 'seconds left',
  player_correct: 'Correct!',
  player_wrong: 'Wrong!',
  player_combo: 'Combo',
  player_combo_x2: 'x2 combo!',
  player_score: 'Score',
  player_streak: 'Streak',
  player_next: 'Next question',
  player_finish: 'See results',
  player_explanation: 'Explanation',

  results_title: 'Quiz complete!',
  results_score: 'Total score',
  results_correct: 'Correct',
  results_correct_of: 'of',
  results_time: 'Time',
  results_max_streak: 'Max streak',
  results_xp_earned: 'XP earned',
  results_perfect: 'Perfect score! 🏆',
  results_great: 'Great job! 🎉',
  results_good: 'Not bad! 👍',
  results_keep_trying: 'Keep practicing! 💪',
  results_share: 'Share result',
  results_share_text: 'I scored {score} XP on BrainBolt! Can you beat me?',
  results_play_again: 'Play again',
  results_try_another: 'Try another quiz',
  results_review_answers: 'Review answers',
  results_your_answer: 'Your answer',
  results_correct_answer: 'Correct answer',

  lb_title: 'Leaderboard',
  lb_sub: 'Top players by XP. Climb the ranks by playing more quizzes.',
  lb_rank: 'Rank',
  lb_player: 'Player',
  lb_xp: 'XP',
  lb_level: 'Level',
  lb_quizzes: 'Quizzes',
  lb_you: 'You',
  lb_empty: 'No players yet. Be the first!',

  profile_title: 'Your profile',
  profile_sub: 'Track your progress, achievements, and recent quizzes.',
  profile_edit: 'Edit profile',
  profile_name: 'Display name',
  profile_avatar: 'Avatar (emoji)',
  profile_save: 'Save',
  profile_level: 'Level',
  profile_xp: 'Total XP',
  profile_to_next: 'to next level',
  profile_total_quizzes: 'Quizzes played',
  profile_total_correct: 'Correct answers',
  profile_best_streak: 'Best streak',
  profile_daily_streak: 'Daily streak',
  profile_achievements: 'Achievements',
  profile_recent: 'Recent quizzes',
  profile_no_recent: 'No quizzes played yet',

  features_title: 'Why BrainBolt?',
  features_sub: 'Fast, fun, and addictive. Built for quick sessions and long-term progression.',
  feat_1_t: 'Speed bonus',
  feat_1_d: 'Answer fast for up to 5x bonus XP. The faster you think, the more you earn.',
  feat_2_t: 'Combo system',
  feat_2_d: 'Get 3 correct in a row to activate x2 multiplier. Chain longer for bigger scores.',
  feat_3_t: 'Daily challenges',
  feat_3_d: 'Same quiz for everyone each day. Build a daily streak and unlock achievements.',
  feat_4_t: 'Global leaderboard',
  feat_4_d: 'Compete with players worldwide. Climb the ranks by earning XP from every quiz.',
  feat_5_t: '12 achievements',
  feat_5_d: 'Unlock badges for streaks, perfect scores, daily habits, and milestones.',
  feat_6_t: 'Privacy first',
  feat_6_d: 'No signup required. Your profile is tied to an anonymous cookie. Pro adds cloud sync.',

  price_badge: 'Pricing',
  price_title: 'Free forever. Pro for power players.',
  price_sub: 'Start free, no signup. Upgrade when you want unlimited quizzes and cloud sync.',
  price_starter: 'Starter',
  price_starter_tag: 'For casual players',
  price_pro: 'Pro',
  price_pro_tag: 'For quiz addicts',
  price_forever: 'forever',
  price_month: 'month',
  price_popular: 'Most popular',
  price_cta_free: 'Start free',
  price_cta_pro: 'Go Pro',
  price_guarantee: 'Cancel anytime. 14-day money-back guarantee on Pro.',
  feat_starter: ['8 base quizzes (80 questions)', 'Daily challenge', 'Global leaderboard', 'All 5 color themes', 'All 5 languages', '12 achievements'],
  feat_pro: ['Everything in Starter', 'Unlimited premium quizzes', 'Cloud sync across devices', 'Custom avatar & name', 'Advanced statistics', 'No ads, ever', 'Priority new content'],

  faq_title: 'Frequently asked questions',
  faq_sub: 'Everything you wanted to know about BrainBolt.',
  faq_q1: 'What is BrainBolt?',
  faq_a1: 'A fast-paced quiz game with XP, levels, streaks, and achievements. Pick a category, answer questions against the clock, build combos, and climb the global leaderboard. No account needed to start playing.',
  faq_q2: 'Do I need to sign up?',
  faq_a2: 'No. We set an anonymous cookie in your browser to track your progress. Sign up is only required for Pro (cloud sync across devices).',
  faq_q3: 'How is the score calculated?',
  faq_a3: 'Each correct answer gives 10 base XP + speed bonus (up to 5, faster = more) + combo multiplier (x2 for every 3rd correct in a row). Wrong answers give 0 XP and break your combo.',
  faq_q4: 'What languages are supported?',
  faq_a4: 'Five: English, Русский, Español, Deutsch, Français. Switch from the globe icon in the header. The whole UI localizes. (Quiz questions themselves are in English.)',
  faq_q5: 'How does the daily challenge work?',
  faq_a5: 'Every day, one quiz is marked as the daily challenge — same for everyone. Complete it to extend your daily streak. Miss a day and your streak resets. Daily streaks unlock achievements.',
  faq_q6: 'Can I create my own quizzes?',
  faq_a6: 'Not yet. Custom quiz creation is on the roadmap for Pro users in Q3 2026. For now, enjoy our curated 80+ questions across 8 categories, with new quizzes added weekly.',

  footer_tagline: 'Fast-paced quiz game with XP, levels, streaks, and achievements. Train your brain, beat the leaderboard. No signup needed.',
  footer_rights: 'BrainBolt. Built for brains.',
  footer_made: 'Made with curiosity, caffeine, and zero distractions.',
  footer_product: 'Product',
  footer_company: 'Company',
  footer_about: 'About',
  footer_blog: 'Blog',
  footer_privacy: 'Privacy',
  footer_terms: 'Terms',

  difficulty_easy: 'Easy',
  difficulty_medium: 'Medium',
  difficulty_hard: 'Hard',
};

const ru: Dict = {
  nav_quizzes: 'Квизы',
  nav_leaderboard: 'Рейтинг',
  nav_faq: 'FAQ',
  nav_pricing: 'Цены',
  cta_play: 'Играть',

  hero_badge: 'Без регистрации · 80+ вопросов · Ежедневные челленджи',
  hero_title_1: 'Тренируй мозг.',
  hero_title_2: 'Бей рекорды.',
  hero_sub: 'BrainBolt — динамичная квиз-игра с XP, уровнями, сериями и достижениями. Выбери категорию, отвечай быстро, собирай комбо и поднимайся в глобальном рейтинге. Без регистрации.',
  hero_cta_primary: 'Играть',
  hero_cta_secondary: 'Смотреть квизы',
  hero_stat_players: 'игроков',
  hero_stat_quizzes: 'квизов',
  hero_stat_questions: 'вопросов',

  daily_title: 'Челлендж дня',
  daily_sub: 'Один квиз для всех сегодня. Пройди чтобы продолжить серию.',
  daily_play: 'Играть челлендж',
  daily_done: 'Пройдено сегодня',
  daily_streak: 'дней подряд',

  quizzes_title: 'Все квизы',
  quizzes_sub: 'Выбери категорию и проверь свои знания. Новые квизы каждую неделю.',
  quizzes_search: 'Поиск квизов...',
  quizzes_all: 'Все',
  quizzes_empty: 'Квизы не найдены',
  quiz_questions: 'вопросов',
  quiz_plays: 'игр',
  quiz_play: 'Играть',

  player_question: 'Вопрос',
  player_of: 'из',
  player_skip: 'Пропустить',
  player_time_left: 'сек осталось',
  player_correct: 'Верно!',
  player_wrong: 'Неверно!',
  player_combo: 'Комбо',
  player_combo_x2: 'x2 комбо!',
  player_score: 'Очки',
  player_streak: 'Серия',
  player_next: 'Следующий вопрос',
  player_finish: 'Результаты',
  player_explanation: 'Объяснение',

  results_title: 'Квиз завершён!',
  results_score: 'Итоговый счёт',
  results_correct: 'Верно',
  results_correct_of: 'из',
  results_time: 'Время',
  results_max_streak: 'Макс. серия',
  results_xp_earned: 'XP получено',
  results_perfect: 'Идеальный счёт! 🏆',
  results_great: 'Отлично! 🎉',
  results_good: 'Неплохо! 👍',
  results_keep_trying: 'Продолжай тренироваться! 💪',
  results_share: 'Поделиться',
  results_share_text: 'Я набрал {score} XP в BrainBolt! Побьёшь?',
  results_play_again: 'Играть снова',
  results_try_another: 'Другой квиз',
  results_review_answers: 'Посмотреть ответы',
  results_your_answer: 'Твой ответ',
  results_correct_answer: 'Правильный ответ',

  lb_title: 'Таблица лидеров',
  lb_sub: 'Топ игроков по XP. Поднимайся по рангам, играя больше квизов.',
  lb_rank: 'Ранг',
  lb_player: 'Игрок',
  lb_xp: 'XP',
  lb_level: 'Уровень',
  lb_quizzes: 'Квизов',
  lb_you: 'Ты',
  lb_empty: 'Пока нет игроков. Будь первым!',

  profile_title: 'Твой профиль',
  profile_sub: 'Отслеживай прогресс, достижения и недавние квизы.',
  profile_edit: 'Редактировать',
  profile_name: 'Имя',
  profile_avatar: 'Аватар (эмодзи)',
  profile_save: 'Сохранить',
  profile_level: 'Уровень',
  profile_xp: 'Всего XP',
  profile_to_next: 'до след. уровня',
  profile_total_quizzes: 'Квизов сыграно',
  profile_total_correct: 'Правильных ответов',
  profile_best_streak: 'Лучшая серия',
  profile_daily_streak: 'Серия дней',
  profile_achievements: 'Достижения',
  profile_recent: 'Недавние квизы',
  profile_no_recent: 'Квизов пока не было',

  features_title: 'Почему BrainBolt?',
  features_sub: 'Быстро, весело, затягивает. Для коротких сессий и долгого прогресса.',
  feat_1_t: 'Бонус за скорость',
  feat_1_d: 'Отвечай быстро и получи до 5x бонусного XP. Чем быстрее думаешь — тем больше зарабатываешь.',
  feat_2_t: 'Система комбо',
  feat_2_d: '3 правильных подряд активируют множитель x2. Длинные серии дают больше очков.',
  feat_3_t: 'Ежедневные челленджи',
  feat_3_d: 'Один квиз для всех каждый день. Строй серию и открывай достижения.',
  feat_4_t: 'Глобальный рейтинг',
  feat_4_d: 'Соревнуйся с игроками со всего мира. Поднимайся по рангам за XP с каждого квиза.',
  feat_5_t: '12 достижений',
  feat_5_d: 'Открывай бейджи за серии, идеальные счёты, ежедневные привычки и вехи.',
  feat_6_t: 'Приватность',
  feat_6_d: 'Без регистрации. Профиль привязан к анонимной куке. Pro добавляет облачный синк.',

  price_badge: 'Цены',
  price_title: 'Бесплатно навсегда. Pro для профи.',
  price_sub: 'Начни бесплатно, без регистрации. Переходи на Pro для безлимита и синка.',
  price_starter: 'Старт',
  price_starter_tag: 'Для любителей',
  price_pro: 'Pro',
  price_pro_tag: 'Для фанатов',
  price_forever: 'навсегда',
  price_month: 'мес',
  price_popular: 'Популярный',
  price_cta_free: 'Начать бесплатно',
  price_cta_pro: 'Взять Pro',
  price_guarantee: 'Отмена в любой момент. Гарантия возврата 14 дней на Pro.',
  feat_starter: ['8 базовых квизов (80 вопросов)', 'Челлендж дня', 'Глобальный рейтинг', '5 цветовых тем', '5 языков', '12 достижений'],
  feat_pro: ['Всё из Старт', 'Безлимит премиум-квизов', 'Облачный синк', 'Свой аватар и имя', 'Расширенная статистика', 'Без рекламы', 'Приоритетный контент'],

  faq_title: 'Частые вопросы',
  faq_sub: 'Всё что хотел узнать о BrainBolt.',
  faq_q1: 'Что такое BrainBolt?',
  faq_a1: 'Динамичная квиз-игра с XP, уровнями, сериями и достижениями. Выбери категорию, отвечай на время, собирай комбо и поднимайся в глобальном рейтинге. Без регистрации.',
  faq_q2: 'Нужна ли регистрация?',
  faq_a2: 'Нет. Мы ставим анонимную куку в браузере для отслеживания прогресса. Регистрация нужна только для Pro (облачный синк между устройствами).',
  faq_q3: 'Как считается счёт?',
  faq_a3: 'Каждый правильный ответ даёт 10 базовых XP + бонус за скорость (до 5, быстрее = больше) + множитель комбо (x2 за каждый 3-й правильный подряд). Неправильные ответы дают 0 XP и сбрасывают комбо.',
  faq_q4: 'Какие языки поддерживаются?',
  faq_a4: 'Пять: English, Русский, Español, Deutsch, Français. Переключай через иконку глобуса в шапке. Весь UI локализован. (Сами вопросы — на английском.)',
  faq_q5: 'Как работает челлендж дня?',
  faq_a5: 'Каждый день один квиз отмечается как челлендж дня — одинаковый для всех. Пройди его чтобы продолжить серию. Пропустишь день — серия обнулится. Серии открывают достижения.',
  faq_q6: 'Можно создавать свои квизы?',
  faq_a6: 'Пока нет. Создание своих квизов в roadmap для Pro-юзеров на Q3 2026. Пока — 80+ курируемых вопросов в 8 категориях, новые квизы каждую неделю.',

  footer_tagline: 'Динамичная квиз-игра с XP, уровнями, сериями и достижениями. Тренируй мозг, бей рекорды. Без регистрации.',
  footer_rights: 'BrainBolt. Создано для мозгов.',
  footer_made: 'Сделано с любопытством, кофеином и нулём отвлечений.',
  footer_product: 'Продукт',
  footer_company: 'Компания',
  footer_about: 'О нас',
  footer_blog: 'Блог',
  footer_privacy: 'Конфиденциальность',
  footer_terms: 'Условия',

  difficulty_easy: 'Лёгкий',
  difficulty_medium: 'Средний',
  difficulty_hard: 'Сложный',
};

const es: Dict = {
  nav_quizzes: 'Quizzes',
  nav_leaderboard: 'Ranking',
  nav_faq: 'FAQ',
  nav_pricing: 'Precios',
  cta_play: 'Jugar',

  hero_badge: 'Sin registro · 80+ preguntas · Retos diarios',
  hero_title_1: 'Entrena tu mente.',
  hero_title_2: 'Supera el ranking.',
  hero_sub: 'BrainBolt es un juego de quiz rápido con XP, niveles, rachas y logros. Elige categoría, responde rápido, haz combos y sube en el ranking global. Sin cuenta para empezar.',
  hero_cta_primary: 'Jugar',
  hero_cta_secondary: 'Ver quizzes',
  hero_stat_players: 'jugadores',
  hero_stat_quizzes: 'quizzes',
  hero_stat_questions: 'preguntas',

  daily_title: 'Reto diario',
  daily_sub: 'Mismo quiz para todos hoy. Supéralo para extender tu racha.',
  daily_play: 'Jugar reto',
  daily_done: 'Completado hoy',
  daily_streak: 'días seguidos',

  quizzes_title: 'Todos los quizzes',
  quizzes_sub: 'Elige categoría y pon a prueba tu conocimiento. Nuevos quizzes cada semana.',
  quizzes_search: 'Buscar quizzes...',
  quizzes_all: 'Todos',
  quizzes_empty: 'No se encontraron quizzes',
  quiz_questions: 'preguntas',
  quiz_plays: 'partidas',
  quiz_play: 'Jugar',

  player_question: 'Pregunta',
  player_of: 'de',
  player_skip: 'Saltar',
  player_time_left: 'seg restantes',
  player_correct: '¡Correcto!',
  player_wrong: '¡Incorrecto!',
  player_combo: 'Combo',
  player_combo_x2: '¡x2 combo!',
  player_score: 'Puntos',
  player_streak: 'Racha',
  player_next: 'Siguiente',
  player_finish: 'Ver resultados',
  player_explanation: 'Explicación',

  results_title: '¡Quiz completado!',
  results_score: 'Puntuación total',
  results_correct: 'Correctas',
  results_correct_of: 'de',
  results_time: 'Tiempo',
  results_max_streak: 'Mejor racha',
  results_xp_earned: 'XP ganado',
  results_perfect: '¡Perfecto! 🏆',
  results_great: '¡Genial! 🎉',
  results_good: '¡Nada mal! 👍',
  results_keep_trying: '¡Sigue practicando! 💪',
  results_share: 'Compartir',
  results_share_text: '¡Logré {score} XP en BrainBolt! ¿Me superas?',
  results_play_again: 'Jugar de nuevo',
  results_try_another: 'Otro quiz',
  results_review_answers: 'Ver respuestas',
  results_your_answer: 'Tu respuesta',
  results_correct_answer: 'Respuesta correcta',

  lb_title: 'Ranking',
  lb_sub: 'Top jugadores por XP. Sube jugando más quizzes.',
  lb_rank: 'Pos',
  lb_player: 'Jugador',
  lb_xp: 'XP',
  lb_level: 'Nivel',
  lb_quizzes: 'Quizzes',
  lb_you: 'Tú',
  lb_empty: 'Sin jugadores aún. ¡Sé el primero!',

  profile_title: 'Tu perfil',
  profile_sub: 'Sigue tu progreso, logros y quizzes recientes.',
  profile_edit: 'Editar',
  profile_name: 'Nombre',
  profile_avatar: 'Avatar (emoji)',
  profile_save: 'Guardar',
  profile_level: 'Nivel',
  profile_xp: 'XP total',
  profile_to_next: 'al siguiente nivel',
  profile_total_quizzes: 'Quizzes jugados',
  profile_total_correct: 'Respuestas correctas',
  profile_best_streak: 'Mejor racha',
  profile_daily_streak: 'Racha diaria',
  profile_achievements: 'Logros',
  profile_recent: 'Quizzes recientes',
  profile_no_recent: 'Sin quizzes aún',

  features_title: '¿Por qué BrainBolt?',
  features_sub: 'Rápido, divertido y adictivo. Para sesiones cortas y progresión larga.',
  feat_1_t: 'Bonus por velocidad',
  feat_1_d: 'Responde rápido para hasta 5x bonus XP. Más rápido = más ganas.',
  feat_2_t: 'Sistema de combo',
  feat_2_d: '3 correctas seguidas activan multiplicador x2. Cadenas más largas = más puntos.',
  feat_3_t: 'Retos diarios',
  feat_3_d: 'Un quiz para todos cada día. Construye racha y desbloquea logros.',
  feat_4_t: 'Ranking global',
  feat_4_d: 'Compite con jugadores de todo el mundo. Sube ganando XP.',
  feat_5_t: '12 logros',
  feat_5_d: 'Desbloquea badges por rachas, scores perfectos, hábitos diarios y metas.',
  feat_6_t: 'Privacidad primero',
  feat_6_d: 'Sin registro. Tu perfil se vincula a cookie anónima. Pro añade sync en nube.',

  price_badge: 'Precios',
  price_title: 'Gratis para siempre. Pro para jugadores serios.',
  price_sub: 'Empieza gratis, sin registro. Mejora a Pro para quizzes ilimitados y sync.',
  price_starter: 'Starter',
  price_starter_tag: 'Para casuales',
  price_pro: 'Pro',
  price_pro_tag: 'Para adictos',
  price_forever: 'para siempre',
  price_month: 'mes',
  price_popular: 'Más popular',
  price_cta_free: 'Empezar gratis',
  price_cta_pro: 'Pasar a Pro',
  price_guarantee: 'Cancela cuando quieras. Garantía de 14 días en Pro.',
  feat_starter: ['8 quizzes base (80 preguntas)', 'Reto diario', 'Ranking global', '5 temas de color', '5 idiomas', '12 logros'],
  feat_pro: ['Todo de Starter', 'Quizzes premium ilimitados', 'Sync en la nube', 'Avatar y nombre propio', 'Estadísticas avanzadas', 'Sin anuncios', 'Contenido prioritario'],

  faq_title: 'Preguntas frecuentes',
  faq_sub: 'Todo lo que querías saber sobre BrainBolt.',
  faq_q1: '¿Qué es BrainBolt?',
  faq_a1: 'Un juego de quiz rápido con XP, niveles, rachas y logros. Elige categoría, responde contra el reloj, haz combos y sube al ranking global. Sin cuenta para empezar.',
  faq_q2: '¿Necesito registrarme?',
  faq_a2: 'No. Ponemos una cookie anónima en tu navegador para seguir tu progreso. Solo Pro requiere cuenta (sync entre dispositivos).',
  faq_q3: '¿Cómo se calcula la puntuación?',
  faq_a3: 'Cada respuesta correcta da 10 XP base + bonus por velocidad (hasta 5, más rápido = más) + multiplicador combo (x2 por cada 3ª correcta seguida). Incorrectas dan 0 y rompen combo.',
  faq_q4: '¿Qué idiomas se soportan?',
  faq_a4: 'Cinco: English, Русский, Español, Deutsch, Français. Cambia desde el icono del globo. Toda la UI se localiza. (Las preguntas están en inglés.)',
  faq_q5: '¿Cómo funciona el reto diario?',
  faq_a5: 'Cada día un quiz se marca como reto — el mismo para todos. Complétalo para extender tu racha. Si fallas un día, la racha se reinicia. Las rachas desbloquean logros.',
  faq_q6: '¿Puedo crear mis quizzes?',
  faq_a6: 'Aún no. La creación de quizzes está en la roadmap para Pro en Q3 2026. Por ahora, disfruta 80+ preguntas curadas en 8 categorías, con nuevos quizzes cada semana.',

  footer_tagline: 'Juego de quiz rápido con XP, niveles, rachas y logros. Entrena tu mente, supera el ranking. Sin registro.',
  footer_rights: 'BrainBolt. Hecho para mentes.',
  footer_made: 'Hecho con curiosidad, cafeína y cero distracciones.',
  footer_product: 'Producto',
  footer_company: 'Empresa',
  footer_about: 'Acerca',
  footer_blog: 'Blog',
  footer_privacy: 'Privacidad',
  footer_terms: 'Términos',

  difficulty_easy: 'Fácil',
  difficulty_medium: 'Medio',
  difficulty_hard: 'Difícil',
};

const de: Dict = {
  nav_quizzes: 'Quizzes',
  nav_leaderboard: 'Leaderboard',
  nav_faq: 'FAQ',
  nav_pricing: 'Preise',
  cta_play: 'Spielen',

  hero_badge: 'Ohne Anmeldung · 80+ Fragen · Tägliche Challenges',
  hero_title_1: 'Trainier dein Gehirn.',
  hero_title_2: 'Schlag das Leaderboard.',
  hero_sub: 'BrainBolt ist ein schnelles Quiz-Spiel mit XP, Leveln, Streaks und Achievements. Kategorie wählen, schnell antworten, Combos bauen und im globalen Leaderboard steigen. Ohne Account.',
  hero_cta_primary: 'Spielen',
  hero_cta_secondary: 'Quizzes ansehen',
  hero_stat_players: 'Spieler',
  hero_stat_quizzes: 'Quizzes',
  hero_stat_questions: 'Fragen',

  daily_title: 'Daily Challenge',
  daily_sub: 'Gleiches Quiz für alle heute. Schaff es um deine Streak zu verlängern.',
  daily_play: 'Daily spielen',
  daily_done: 'Heute erledigt',
  daily_streak: 'Tage in Folge',

  quizzes_title: 'Alle Quizzes',
  quizzes_sub: 'Wähle Kategorie und teste dein Wissen. Neue Quizzes wöchentlich.',
  quizzes_search: 'Quizzes suchen...',
  quizzes_all: 'Alle',
  quizzes_empty: 'Keine Quizzes gefunden',
  quiz_questions: 'Fragen',
  quiz_plays: 'Spiele',
  quiz_play: 'Spielen',

  player_question: 'Frage',
  player_of: 'von',
  player_skip: 'Überspringen',
  player_time_left: 'Sek übrig',
  player_correct: 'Richtig!',
  player_wrong: 'Falsch!',
  player_combo: 'Combo',
  player_combo_x2: 'x2 Combo!',
  player_score: 'Punkte',
  player_streak: 'Streak',
  player_next: 'Nächste Frage',
  player_finish: 'Ergebnisse',
  player_explanation: 'Erklärung',

  results_title: 'Quiz fertig!',
  results_score: 'Gesamtpunkte',
  results_correct: 'Richtig',
  results_correct_of: 'von',
  results_time: 'Zeit',
  results_max_streak: 'Beste Streak',
  results_xp_earned: 'XP verdient',
  results_perfect: 'Perfekt! 🏆',
  results_great: 'Super! 🎉',
  results_good: 'Nicht schlecht! 👍',
  results_keep_trying: 'Weiter üben! 💪',
  results_share: 'Teilen',
  results_share_text: 'Ich habe {score} XP in BrainBolt! Schlagst du mich?',
  results_play_again: 'Nochmal',
  results_try_another: 'Anderes Quiz',
  results_review_answers: 'Antworten ansehen',
  results_your_answer: 'Deine Antwort',
  results_correct_answer: 'Richtige Antwort',

  lb_title: 'Leaderboard',
  lb_sub: 'Top Spieler nach XP. Steige durch mehr Quizzes auf.',
  lb_rank: 'Rang',
  lb_player: 'Spieler',
  lb_xp: 'XP',
  lb_level: 'Level',
  lb_quizzes: 'Quizzes',
  lb_you: 'Du',
  lb_empty: 'Noch keine Spieler. Sei der erste!',

  profile_title: 'Dein Profil',
  profile_sub: 'Verfolge Fortschritt, Achievements und letzte Quizzes.',
  profile_edit: 'Bearbeiten',
  profile_name: 'Name',
  profile_avatar: 'Avatar (Emoji)',
  profile_save: 'Speichern',
  profile_level: 'Level',
  profile_xp: 'Gesamt XP',
  profile_to_next: 'bis nächstes Level',
  profile_total_quizzes: 'Quizzes gespielt',
  profile_total_correct: 'Richtige Antworten',
  profile_best_streak: 'Beste Streak',
  profile_daily_streak: 'Daily Streak',
  profile_achievements: 'Achievements',
  profile_recent: 'Letzte Quizzes',
  profile_no_recent: 'Noch keine Quizzes',

  features_title: 'Warum BrainBolt?',
  features_sub: 'Schnell, lustig, süchtig. Für kurze Sessions und langen Fortschritt.',
  feat_1_t: 'Speed-Bonus',
  feat_1_d: 'Antworte schnell für bis zu 5x Bonus-XP. Schneller = mehr.',
  feat_2_t: 'Combo-System',
  feat_2_d: '3 richtig in Folge aktiviert x2 Multiplikator. Längere Ketten = mehr Punkte.',
  feat_3_t: 'Daily Challenges',
  feat_3_d: 'Ein Quiz für alle pro Tag. Baue Streak auf und schalte Achievements frei.',
  feat_4_t: 'Globales Leaderboard',
  feat_4_d: 'Tritt gegen Spieler weltweit an. Steige durch XP.',
  feat_5_t: '12 Achievements',
  feat_5_d: 'Schalte Badges frei für Streaks, perfekte Scores, Gewohnheiten, Meilensteine.',
  feat_6_t: 'Privacy first',
  feat_6_d: 'Ohne Account. Profil verknüpft mit anonymem Cookie. Pro bietet Cloud-Sync.',

  price_badge: 'Preise',
  price_title: 'Für immer gratis. Pro für Power-Spieler.',
  price_sub: 'Start gratis, ohne Account. Upgrade zu Pro für unlimitierte Quizzes und Sync.',
  price_starter: 'Starter',
  price_starter_tag: 'Für Gelegenheitsspieler',
  price_pro: 'Pro',
  price_pro_tag: 'Für Quiz-Süchtige',
  price_forever: 'für immer',
  price_month: 'Monat',
  price_popular: 'Am beliebtesten',
  price_cta_free: 'Gratis starten',
  price_cta_pro: 'Pro holen',
  price_guarantee: 'Jederzeit kündbar. 14-Tage-Geld-zurück auf Pro.',
  feat_starter: ['8 Basis-Quizzes (80 Fragen)', 'Daily Challenge', 'Globales Leaderboard', '5 Farb-Themes', '5 Sprachen', '12 Achievements'],
  feat_pro: ['Alles aus Starter', 'Unlimitierte Premium-Quizzes', 'Cloud-Sync', 'Eigener Avatar & Name', 'Erweiterte Statistiken', 'Ohne Werbung', 'Prioritäts-Content'],

  faq_title: 'Häufige Fragen',
  faq_sub: 'Alles was du über BrainBolt wissen wolltest.',
  faq_q1: 'Was ist BrainBolt?',
  faq_a1: 'Ein schnelles Quiz-Spiel mit XP, Leveln, Streaks und Achievements. Kategorie wählen, gegen die Uhr antworten, Combos bauen und im Leaderboard steigen. Ohne Account.',
  faq_q2: 'Muss ich mich registrieren?',
  faq_a2: 'Nein. Wir setzen ein anonymes Cookie zum Tracken. Nur Pro braucht Account (Cloud-Sync).',
  faq_q3: 'Wie wird die Punktezahl berechnet?',
  faq_a3: 'Jede richtige Antwort gibt 10 Basis-XP + Speed-Bonus (bis 5, schneller = mehr) + Combo-Multiplikator (x2 für jede 3. richtige in Folge). Falsche geben 0 und brechen Combo.',
  faq_q4: 'Welche Sprachen werden unterstützt?',
  faq_a4: 'Fünf: English, Русский, Español, Deutsch, Français. Umschalten über Globus-Icon. Gesamte UI lokalisiert. (Fragen sind auf Englisch.)',
  faq_q5: 'Wie funktioniert die Daily Challenge?',
  faq_a5: 'Jeden Tag wird ein Quiz als Daily markiert — gleich für alle. Schaff es um Streak zu verlängern. Ein Tag verpasst = Streak reset. Streaks schalten Achievements frei.',
  faq_q6: 'Kann ich eigene Quizzes erstellen?',
  faq_a6: 'Noch nicht. Eigene Quizzes in Roadmap für Pro in Q3 2026. Bis dahin: 80+ kuratierte Fragen in 8 Kategorien, wöchentlich neue.',

  footer_tagline: 'Schnelles Quiz-Spiel mit XP, Leveln, Streaks und Achievements. Trainier dein Gehirn, schlag das Leaderboard. Ohne Account.',
  footer_rights: 'BrainBolt. Für Gehirne gebaut.',
  footer_made: 'Gemacht mit Neugier, Koffein und null Ablenkungen.',
  footer_product: 'Produkt',
  footer_company: 'Firma',
  footer_about: 'Über',
  footer_blog: 'Blog',
  footer_privacy: 'Datenschutz',
  footer_terms: 'AGB',

  difficulty_easy: 'Leicht',
  difficulty_medium: 'Mittel',
  difficulty_hard: 'Schwer',
};

const fr: Dict = {
  nav_quizzes: 'Quizzes',
  nav_leaderboard: 'Classement',
  nav_faq: 'FAQ',
  nav_pricing: 'Tarifs',
  cta_play: 'Jouer',

  hero_badge: 'Sans inscription · 80+ questions · Défis quotidiens',
  hero_title_1: 'Entraîne ton cerveau.',
  hero_title_2: 'Bats le classement.',
  hero_sub: 'BrainBolt est un jeu de quiz rapide avec XP, niveaux, séries et achievements. Choisis catégorie, réponds vite, fais des combos et monte dans le classement global. Sans compte.',
  hero_cta_primary: 'Jouer',
  hero_cta_secondary: 'Voir les quizzes',
  hero_stat_players: 'joueurs',
  hero_stat_quizzes: 'quizzes',
  hero_stat_questions: 'questions',

  daily_title: 'Défi quotidien',
  daily_sub: 'Même quiz pour tout le monde aujourd\'hui. Réussis-le pour étendre ta série.',
  daily_play: 'Jouer le défi',
  daily_done: 'Fait aujourd\'hui',
  daily_streak: 'jours de suite',

  quizzes_title: 'Tous les quizzes',
  quizzes_sub: 'Choisis catégorie et teste tes connaissances. Nouveaux quizzes chaque semaine.',
  quizzes_search: 'Chercher quizzes...',
  quizzes_all: 'Tous',
  quizzes_empty: 'Aucun quiz trouvé',
  quiz_questions: 'questions',
  quiz_plays: 'parties',
  quiz_play: 'Jouer',

  player_question: 'Question',
  player_of: 'sur',
  player_skip: 'Passer',
  player_time_left: 'sec restantes',
  player_correct: 'Correct !',
  player_wrong: 'Faux !',
  player_combo: 'Combo',
  player_combo_x2: 'x2 combo !',
  player_score: 'Points',
  player_streak: 'Série',
  player_next: 'Suivante',
  player_finish: 'Résultats',
  player_explanation: 'Explication',

  results_title: 'Quiz terminé !',
  results_score: 'Score total',
  results_correct: 'Correctes',
  results_correct_of: 'sur',
  results_time: 'Temps',
  results_max_streak: 'Meilleure série',
  results_xp_earned: 'XP gagné',
  results_perfect: 'Parfait ! 🏆',
  results_great: 'Super ! 🎉',
  results_good: 'Pas mal ! 👍',
  results_keep_trying: 'Continue ! 💪',
  results_share: 'Partager',
  results_share_text: 'J\'ai eu {score} XP sur BrainBolt ! Tu me bats ?',
  results_play_again: 'Rejouer',
  results_try_another: 'Autre quiz',
  results_review_answers: 'Voir réponses',
  results_your_answer: 'Ta réponse',
  results_correct_answer: 'Bonne réponse',

  lb_title: 'Classement',
  lb_sub: 'Top joueurs par XP. Monte en jouant plus de quizzes.',
  lb_rank: 'Rang',
  lb_player: 'Joueur',
  lb_xp: 'XP',
  lb_level: 'Niveau',
  lb_quizzes: 'Quizzes',
  lb_you: 'Toi',
  lb_empty: 'Aucun joueur encore. Sois le premier !',

  profile_title: 'Ton profil',
  profile_sub: 'Suis ta progression, achievements et quizzes récents.',
  profile_edit: 'Modifier',
  profile_name: 'Nom',
  profile_avatar: 'Avatar (emoji)',
  profile_save: 'Enregistrer',
  profile_level: 'Niveau',
  profile_xp: 'XP total',
  profile_to_next: 'jusqu\'au prochain niveau',
  profile_total_quizzes: 'Quizzes joués',
  profile_total_correct: 'Bonnes réponses',
  profile_best_streak: 'Meilleure série',
  profile_daily_streak: 'Série quotidienne',
  profile_achievements: 'Achievements',
  profile_recent: 'Quizzes récents',
  profile_no_recent: 'Aucun quiz encore',

  features_title: 'Pourquoi BrainBolt ?',
  features_sub: 'Rapide, fun, addictif. Pour sessions courtes et progression longue.',
  feat_1_t: 'Bonus vitesse',
  feat_1_d: 'Réponds vite pour jusqu\'à 5x bonus XP. Plus vite = plus tu gagnes.',
  feat_2_t: 'Système de combo',
  feat_2_d: '3 bonnes d\'affilée activent x2. Chaînes plus longues = plus de points.',
  feat_3_t: 'Défis quotidiens',
  feat_3_d: 'Un quiz pour tous chaque jour. Construis ta série et débloque achievements.',
  feat_4_t: 'Classement global',
  feat_4_d: 'Compétitionne avec joueurs du monde. Monte en gagnant XP.',
  feat_5_t: '12 achievements',
  feat_5_d: 'Débloque badges pour séries, scores parfaits, habitudes, jalons.',
  feat_6_t: 'Privacy first',
  feat_6_d: 'Sans compte. Profil lié à cookie anonyme. Pro ajoute sync cloud.',

  price_badge: 'Tarifs',
  price_title: 'Gratuit pour toujours. Pro pour joueurs sérieux.',
  price_sub: 'Commence gratuit, sans compte. Passe à Pro pour quizzes illimités et sync.',
  price_starter: 'Starter',
  price_starter_tag: 'Pour casuals',
  price_pro: 'Pro',
  price_pro_tag: 'Pour accros',
  price_forever: 'à vie',
  price_month: 'mois',
  price_popular: 'Le plus populaire',
  price_cta_free: 'Commencer gratuit',
  price_cta_pro: 'Passer Pro',
  price_guarantee: 'Annule à tout moment. Remboursement 14 jours sur Pro.',
  feat_starter: ['8 quizzes de base (80 questions)', 'Défi quotidien', 'Classement global', '5 thèmes de couleur', '5 langues', '12 achievements'],
  feat_pro: ['Tout de Starter', 'Quizzes premium illimités', 'Sync cloud', 'Avatar & nom perso', 'Stats avancées', 'Sans pub', 'Contenu prioritaire'],

  faq_title: 'Questions fréquentes',
  faq_sub: 'Tout ce que tu voulais savoir sur BrainBolt.',
  faq_q1: 'Qu\'est-ce que BrainBolt ?',
  faq_a1: 'Un jeu de quiz rapide avec XP, niveaux, séries et achievements. Choisis catégorie, réponds contre la montre, fais des combos et monte au classement. Sans compte.',
  faq_q2: 'Dois-je m\'inscrire ?',
  faq_a2: 'Non. On pose un cookie anonyme pour tracker ta progression. Seul Pro nécessite un compte (sync entre appareils).',
  faq_q3: 'Comment le score est calculé ?',
  faq_a3: 'Chaque bonne réponse donne 10 XP de base + bonus vitesse (jusqu\'à 5, plus vite = plus) + multiplicateur combo (x2 pour chaque 3e bonne d\'affilée). Mauvaises = 0 et cassent le combo.',
  faq_q4: 'Quelles langues sont supportées ?',
  faq_a4: 'Cinq : English, Русский, Español, Deutsch, Français. Bascule via l\'icône globe. Toute l\'UI localisée. (Questions en anglais.)',
  faq_q5: 'Comment marche le défi quotidien ?',
  faq_a5: 'Chaque jour un quiz est marqué comme défi — le même pour tous. Réussis-le pour étendre ta série. Un jour manqué = série reset. Les séries débloquent achievements.',
  faq_q6: 'Puis-je créer mes quizzes ?',
  faq_a6: 'Pas encore. Création de quizzes dans la roadmap pour Pro en Q3 2026. Pour l\'instant : 80+ questions curées en 8 catégories, nouveaux quizzes chaque semaine.',

  footer_tagline: 'Jeu de quiz rapide avec XP, niveaux, séries et achievements. Entraîne ton cerveau, bats le classement. Sans inscription.',
  footer_rights: 'BrainBolt. Construit pour les cerveaux.',
  footer_made: 'Fait avec curiosité, caféine et zéro distraction.',
  footer_product: 'Produit',
  footer_company: 'Société',
  footer_about: 'À propos',
  footer_blog: 'Blog',
  footer_privacy: 'Confidentialité',
  footer_terms: 'Conditions',

  difficulty_easy: 'Facile',
  difficulty_medium: 'Moyen',
  difficulty_hard: 'Difficile',
};

export const DICT: Record<Lang, Dict> = { en, ru, es, de, fr };
export const DEFAULT_LANG: Lang = 'en';

const LANG_KEY = 'brainbolt:lang';

export function loadLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = window.localStorage.getItem(LANG_KEY) as Lang | null;
  if (stored && DICT[stored]) return stored;
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  if (nav && (DICT as Record<string, Dict>)[nav]) return nav as Lang;
  return DEFAULT_LANG;
}

export function saveLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANG_KEY, lang);
}
