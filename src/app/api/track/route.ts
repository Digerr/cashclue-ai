import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded, trackEvent } from '@/lib/auth';

export const runtime = 'nodejs';

const VALID_EVENTS = new Set([
  'page_view',
  'generate_click',
  'theme_select',
  'lang_change',
  'pricing_click',
  'scroll_to_examples',
  'scroll_to_pricing',
  'share_click',
]);

export async function POST(req: NextRequest) {
  let user: { id: string; cookie: string } | null = null;
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name ?? '');
    if (!name || !VALID_EVENTS.has(name)) {
      return NextResponse.json({ ok: false, error: 'Invalid event' }, { status: 400 });
    }

    user = (await resolveAnonUser(req)) as { id: string; cookie: string };
    await trackEvent(user.id, name, body.properties);

    const res = NextResponse.json({ ok: true });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e: any) {
    console.error('/api/track error:', e);
    const res = NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
    if (user) setAnonCookieIfNeeded(req, res, user);
    return res;
  }
}
