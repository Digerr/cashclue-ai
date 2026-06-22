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
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name ?? '');
    if (!name || !VALID_EVENTS.has(name)) {
      return NextResponse.json({ ok: false, error: 'Invalid event' }, { status: 400 });
    }

    const res = NextResponse.json({});
    const user = await resolveAnonUser(req, res);
    setAnonCookieIfNeeded(req, res, user);

    await trackEvent(user.id, name, body.properties);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
