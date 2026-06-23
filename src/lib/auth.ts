import { db } from './db';

export const ANON_COOKIE_NAME = 'brainbolt_uid';
export const ANON_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function hashIp(ip: string): string {
  const salt = process.env.CASHCLUE_SALT || process.env.BRAINBOLT_SALT || 'brainbolt-default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').slice(0, 32);
}

function getClientIp(req: any): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

export async function resolveAnonUser(req: any) {
  const existingCookie = req.cookies.get(ANON_COOKIE_NAME)?.value;
  const ipHash = hashIp(getClientIp(req));
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null;

  if (existingCookie) {
    const user = await db.user.findUnique({ where: { cookie: existingCookie } });
    if (user) {
      db.user.update({ where: { id: user.id }, data: { lastSeenAt: new Date() } }).catch(() => {});
      return user;
    }
  }

  const newCookie = crypto.randomBytes(16).toString('hex');
  const user = await db.user.create({ data: { cookie: newCookie } });
  return user;
}

export function setAnonCookieIfNeeded(req: any, res: any, user: { cookie: string }) {
  const existing = req.cookies.get(ANON_COOKIE_NAME)?.value;
  if (existing !== user.cookie) {
    res.cookies.set(ANON_COOKIE_NAME, user.cookie, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: ANON_COOKIE_MAX_AGE,
      path: '/',
    });
  }
}

export async function trackEvent(userId: string | null, name: string, properties?: Record<string, unknown>) {
  try {
    await db.analyticsEvent.create({
      data: { userId, name, properties: properties ? JSON.stringify(properties) : null },
    });
  } catch (e) {
    console.error('Analytics track failed:', e);
  }
}

export const XP_PER_LEVEL = 500;
export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function calcQuestionScore(correct: boolean, timeMs: number, timeLimitSec: number, currentStreak: number): number {
  if (!correct) return 0;
  const base = 10;
  const timeRatio = 1 - Math.min(timeMs / (timeLimitSec * 1000), 1);
  const speedBonus = Math.round(timeRatio * 5);
  let comboMultiplier = 1;
  if (currentStreak > 0 && currentStreak % 3 === 0) {
    comboMultiplier = 2;
  }
  return (base + speedBonus) * comboMultiplier;
}

// 22 achievements
export const ACHIEVEMENTS = [
  // Existing
  { id: 'first_quiz', icon: '🎯', title: 'First Quiz', desc: 'Complete your first quiz', check: (s: any) => s.totalQuizzes >= 1 },
  { id: 'quiz_10', icon: '🏅', title: 'Quiz Novice', desc: 'Complete 10 quizzes', check: (s: any) => s.totalQuizzes >= 10 },
  { id: 'quiz_50', icon: '🏆', title: 'Quiz Master', desc: 'Complete 50 quizzes', check: (s: any) => s.totalQuizzes >= 50 },
  { id: 'quiz_100', icon: '👑', title: 'Quiz Legend', desc: 'Complete 100 quizzes', check: (s: any) => s.totalQuizzes >= 100 },
  { id: 'streak_5', icon: '🔥', title: 'On Fire', desc: '5 correct in a row', check: (s: any) => s.bestStreak >= 5 },
  { id: 'streak_10', icon: '⚡', title: 'Lightning', desc: '10 correct in a row', check: (s: any) => s.bestStreak >= 10 },
  { id: 'streak_20', icon: '🌟', title: 'Unstoppable', desc: '20 correct in a row', check: (s: any) => s.bestStreak >= 20 },
  { id: 'perfect', icon: '💯', title: 'Perfectionist', desc: 'Get a perfect score', check: (s: any) => s.perfectScores >= 1 },
  { id: 'perfect_5', icon: '✨', title: 'Flawless', desc: '5 perfect scores', check: (s: any) => s.perfectScores >= 5 },
  { id: 'perfect_10', icon: '🏆', title: 'Untouchable', desc: '10 perfect scores', check: (s: any) => s.perfectScores >= 10 },
  { id: 'daily_3', icon: '📅', title: 'Daily Habit', desc: '3-day daily streak', check: (s: any) => s.dailyStreak >= 3 },
  { id: 'daily_7', icon: '🗓️', title: 'Week Warrior', desc: '7-day daily streak', check: (s: any) => s.dailyStreak >= 7 },
  { id: 'daily_30', icon: '📆', title: 'Monthly Devotion', desc: '30-day daily streak', check: (s: any) => s.dailyStreak >= 30 },
  { id: 'daily_100', icon: '🔥', title: 'Unbreakable', desc: '100-day daily streak', check: (s: any) => s.dailyStreak >= 100 },
  { id: 'xp_1000', icon: '⭐', title: 'Rising Star', desc: 'Earn 1,000 XP', check: (s: any) => s.xp >= 1000 },
  { id: 'xp_5000', icon: '🌟', title: 'Superstar', desc: 'Earn 5,000 XP', check: (s: any) => s.xp >= 5000 },
  { id: 'xp_25000', icon: '💫', title: 'Galaxy Brain', desc: 'Earn 25,000 XP', check: (s: any) => s.xp >= 25000 },
  { id: 'xp_100000', icon: '👑', title: 'Brain Emperor', desc: 'Earn 100,000 XP', check: (s: any) => s.xp >= 100000 },
  { id: 'correct_100', icon: '✅', title: 'Sharp Mind', desc: '100 correct answers', check: (s: any) => s.totalCorrect >= 100 },
  { id: 'correct_500', icon: '🧠', title: 'Big Brain', desc: '500 correct answers', check: (s: any) => s.totalCorrect >= 500 },
  { id: 'correct_1000', icon: '🎓', title: 'Scholar', desc: '1,000 correct answers', check: (s: any) => s.totalCorrect >= 1000 },
  { id: 'level_5', icon: '📦', title: 'Level 5', desc: 'Reach level 5', check: (s: any) => s.level >= 5 },
  { id: 'level_10', icon: '🎖️', title: 'Level 10', desc: 'Reach level 10', check: (s: any) => s.level >= 10 },
  { id: 'level_25', icon: '🥇', title: 'Level 25', desc: 'Reach level 25', check: (s: any) => s.level >= 25 },
  { id: 'level_50', icon: '💎', title: 'Level 50', desc: 'Reach level 50', check: (s: any) => s.level >= 50 },
  { id: 'explorer', icon: '🧭', title: 'Explorer', desc: 'Play 5 categories', check: (s: any) => s.categoriesPlayed >= 5 },
  { id: 'explorer_10', icon: '🗺️', title: 'Globetrotter', desc: 'Play 10 categories', check: (s: any) => s.categoriesPlayed >= 10 },
  { id: 'polyglot', icon: '🌐', title: 'Polyglot', desc: 'Play in 3+ languages', check: (s: any) => s.languagesUsed >= 3 },
  { id: 'night_owl', icon: '🦉', title: 'Night Owl', desc: 'Play after midnight', check: (s: any) => s.playedAfterMidnight === true },
  { id: 'early_bird', icon: '🐦', title: 'Early Bird', desc: 'Play before 7 AM', check: (s: any) => s.playedBefore7am === true },
  { id: 'comeback', icon: '🔄', title: 'Comeback Kid', desc: '5 correct after a wrong answer', check: (s: any) => s.bestStreak >= 5 },
  { id: 'speed_demon', icon: '⚡', title: 'Speed Demon', desc: 'Answer in under 3 seconds', check: (s: any) => s.fastAnswers >= 1 },
  { id: 'marathon', icon: '🏃', title: 'Marathon Runner', desc: 'Play 10 quizzes in one day', check: (s: any) => s.quizzesInDay >= 10 },
  { id: 'all_categories', icon: '🎯', title: 'Know-It-All', desc: 'Play all categories', check: (s: any) => s.categoriesPlayed >= 8 },
  { id: 'no_hints', icon: '🚫', title: 'No Help Needed', desc: 'Perfect score without hints', check: (s: any) => s.perfectNoHints >= 1 },
  { id: 'weekend_warrior', icon: '🎉', title: 'Weekend Warrior', desc: 'Play on Saturday or Sunday', check: (s: any) => s.playedWeekend === true },
  { id: 'first_friend', icon: '🤝', title: 'Social Butterfly', desc: 'Share a result', check: (s: any) => s.sharedResult === true },
];

export interface AchievementStats {
  totalQuizzes: number;
  bestStreak: number;
  perfectScores: number;
  dailyStreak: number;
  xp: number;
  totalCorrect: number;
  level: number;
  categoriesPlayed?: number;
  languagesUsed?: number;
  playedAfterMidnight?: boolean;
  playedBefore7am?: boolean;
  playedWeekend?: boolean;
  fastAnswers?: number;
  quizzesInDay?: number;
  perfectNoHints?: number;
  sharedResult?: boolean;
}

// Player rank system
export const RANKS = [
  { name: 'Rookie', icon: '🌱', minLevel: 1, color: '#888' },
  { name: 'Beginner', icon: '🔰', minLevel: 3, color: '#8bc34a' },
  { name: 'Learner', icon: '📚', minLevel: 5, color: '#4caf50' },
  { name: 'Scholar', icon: '🎓', minLevel: 8, color: '#00bcd4' },
  { name: 'Expert', icon: '🧠', minLevel: 12, color: '#2196f3' },
  { name: 'Master', icon: '🏆', minLevel: 16, color: '#9c27b0' },
  { name: 'Grandmaster', icon: '👑', minLevel: 22, color: '#e91e63' },
  { name: 'Legend', icon: '💎', minLevel: 30, color: '#ffd60a' },
  { name: 'Mythic', icon: '🔥', minLevel: 45, color: '#ff4757' },
];

export function getRank(level: number) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r;
  }
  return rank;
}

export function getNextRank(level: number) {
  for (const r of RANKS) {
    if (r.minLevel > level) return r;
  }
  return null; // max rank
}

export function checkAchievements(stats: AchievementStats): string[] {
  return ACHIEVEMENTS.filter((a) => a.check(stats)).map((a) => a.id);
}
