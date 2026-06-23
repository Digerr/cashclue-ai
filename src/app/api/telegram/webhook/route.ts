import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export const runtime = 'nodejs';
export const maxDuration = 30;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8831422339:AAHDirBrnpawuMjfxXJuMxVWvZ67vOe-fwU';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashclue-ai.vercel.app';

interface TgUpdate {
  update_id: number;
  message?: {
    chat: { id: number; type: string; first_name?: string; last_name?: string; username?: string };
    text?: string;
    from: { id: number; first_name?: string; username?: string; language_code?: string };
  };
  callback_query?: {
    id: string;
    from: { id: number; first_name?: string; username?: string };
    message: { chat: { id: number } };
    data: string;
  };
}

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error('Telegram send failed:', e);
  }
}

async function answerCallback(callbackId: string) {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: callbackId }),
    });
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const update: TgUpdate = await req.json();

    // Handle callback query (inline button press)
    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message.chat.id;
      const data = cb.data || '';

      await answerCallback(cb.id);

      if (data.startsWith('play:')) {
        const slug = data.slice(5);
        const quiz = SEED_QUIZZES.find(q => q.slug === slug);
        if (quiz) {
          const lang = cb.from.language_code === 'ru' ? 'ru' : 'en';
          const title = getLocalized(quiz.title, lang as any);
          const desc = getLocalized(quiz.description, lang as any);
          const url = `${SITE_URL}/quiz/${slug}?mode=classic`;
          await sendTelegramMessage(chatId,
            `🎮 <b>${title}</b>\n\n${desc}\n\n👉 <a href="${url}">Click to play in Mini App</a>`,
            {
              inline_keyboard: [[{ text: '▶️ Play now', web_app: { url } }]],
              remove_keyboard: true,
            }
          );
        }
      } else if (data === 'daily') {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
        const daily = SEED_QUIZZES[dayOfYear % SEED_QUIZZES.length];
        const lang = cb.from.language_code === 'ru' ? 'ru' : 'en';
        const title = getLocalized(daily.title, lang as any);
        const url = `${SITE_URL}/quiz/${daily.slug}?mode=classic&daily=1`;
        await sendTelegramMessage(chatId,
          `🔥 <b>Daily Challenge</b>\n\n${title}\n\nSame quiz for everyone today. Build your streak!`,
          { inline_keyboard: [[{ text: '▶️ Play daily', web_app: { url } }]] }
        );
      } else if (data === 'leaderboard') {
        const url = `${SITE_URL}/leaderboard`;
        await sendTelegramMessage(chatId,
          `🏆 <b>Leaderboard</b>\n\nSee who's on top!`,
          { inline_keyboard: [[{ text: '🏆 View leaderboard', web_app: { url } }]] }
        );
      } else if (data === 'random') {
        const random = SEED_QUIZZES[Math.floor(Math.random() * SEED_QUIZZES.length)];
        const lang = cb.from.language_code === 'ru' ? 'ru' : 'en';
        const title = getLocalized(random.title, lang as any);
        const url = `${SITE_URL}/quiz/${random.slug}?mode=classic`;
        await sendTelegramMessage(chatId,
          `🎲 <b>Random Quiz</b>\n\n${title}`,
          { inline_keyboard: [[{ text: '▶️ Play', web_app: { url } }]] }
        );
      }
      return NextResponse.json({ ok: true });
    }

    // Handle regular message
    if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const lang = update.message.from.language_code === 'ru' ? 'ru' : 'en';
      const isRu = lang === 'ru';

      if (text === '/start') {
        const name = update.message.from.first_name || 'there';
        await sendTelegramMessage(chatId,
          isRu
            ? `👋 Привет, <b>${name}</b>!\n\n🧠 BrainBolt — викторина с XP, уровнями и сериями.\n\nВыбери действие:`
            : `👋 Hi <b>${name}</b>!\n\n🧠 BrainBolt is a fast-paced quiz game with XP, levels, streaks, and achievements.\n\nPick an option:`,
          {
            inline_keyboard: [
              [{ text: isRu ? '🎮 Все квизы' : '🎮 All quizzes', web_app: { url: `${SITE_URL}/categories` } }],
              [
                { text: isRu ? '🔥 Челлендж дня' : '🔥 Daily challenge', callback_data: 'daily' },
                { text: isRu ? '🎲 Случайный' : '🎲 Random', callback_data: 'random' },
              ],
              [{ text: isRu ? '🏆 Рейтинг' : '🏆 Leaderboard', callback_data: 'leaderboard' }],
            ],
          }
        );
      } else if (text === '/quiz' || text === '/quizzes') {
        // Show category selection
        const buttons = SEED_QUIZZES.slice(0, 8).map(q => [{
          text: `${q.icon} ${getLocalized(q.title, lang as any)}`,
          callback_data: `play:${q.slug}`,
        }]);
        // Add "view all" button
        buttons.push([{ text: isRu ? '📋 Все квизы' : '📋 All quizzes', web_app: { url: `${SITE_URL}/categories` } }]);
        await sendTelegramMessage(chatId,
          isRu ? '🎮 Выбери квиз:' : '🎮 Pick a quiz:',
          { inline_keyboard: buttons }
        );
      } else if (text === '/daily') {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
        const daily = SEED_QUIZZES[dayOfYear % SEED_QUIZZES.length];
        const title = getLocalized(daily.title, lang as any);
        const url = `${SITE_URL}/quiz/${daily.slug}?mode=classic&daily=1`;
        await sendTelegramMessage(chatId,
          isRu ? `🔥 <b>Челлендж дня</b>\n\n${title}\n\nОдин квиз для всех сегодня!` : `🔥 <b>Daily Challenge</b>\n\n${title}\n\nSame quiz for everyone today!`,
          { inline_keyboard: [[{ text: isRu ? '▶️ Играть' : '▶️ Play', web_app: { url } }]] }
        );
      } else if (text === '/leaderboard') {
        const url = `${SITE_URL}/leaderboard`;
        await sendTelegramMessage(chatId,
          isRu ? '🏆 <b>Рейтинг</b>\n\nСмотри кто на вершине!' : '🏆 <b>Leaderboard</b>\n\nSee who is on top!',
          { inline_keyboard: [[{ text: isRu ? '🏆 Открыть рейтинг' : '🏆 View leaderboard', web_app: { url } }]] }
        );
      } else if (text === '/help') {
        await sendTelegramMessage(chatId,
          isRu
            ? '<b>Команды:</b>\n/start — главное меню\n/quiz — выбрать квиз\n/daily — челлендж дня\n/leaderboard — рейтинг\n\nИли открой Mini App для полной версии!'
            : '<b>Commands:</b>\n/start — main menu\n/quiz — pick a quiz\n/daily — daily challenge\n/leaderboard — leaderboard\n\nOr open Mini App for the full experience!'
        );
      } else {
        // Unknown — show main menu
        await sendTelegramMessage(chatId,
          isRu ? '🤔 Не понял. Используй /help для списка команд.' : '🤔 Not sure what you mean. Use /help for commands.',
          { inline_keyboard: [[{ text: isRu ? '🎮 Все квизы' : '🎮 All quizzes', web_app: { url: `${SITE_URL}/categories` } }]] }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Telegram webhook error:', e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

// GET endpoint to set the webhook
export async function GET() {
  const webhookUrl = `${SITE_URL}/api/telegram/webhook`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${webhookUrl}&drop_pending_updates=true`, { method: 'POST' });
    const data = await res.json();
    return NextResponse.json({
      ok: data.ok,
      webhookUrl,
      description: data.description,
      bot: 'BrainBolt Bot',
      username: (await (await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)).json()).result?.username,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
