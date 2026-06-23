'use client';

import { useEffect } from 'react';
import { useTelegram } from '@/hooks/use-telegram';

/**
 * Initializes Telegram Mini App integration.
 * Mount this once at the app root — it:
 *  - Tells Telegram WebView we're ready
 *  - Expands to full viewport height
 *  - Sets the header/background color to match our dark theme
 *  - Exposes haptics via window.Telegram?.WebApp?.HapticFeedback
 *
 * When the Telegram bot is wired up later, we'll:
 *  - Use initDataUnsafe.user.id to identify the Telegram user server-side
 *  - Validate initData HMAC signature in /api/auth/telegram
 *  - Auto-link Telegram user to our AnonymousUser record
 */
export function TelegramIntegration() {
  const { isTelegram, webApp } = useTelegram();

  useEffect(() => {
    if (!isTelegram || !webApp) return;

    // Already handled in the hook — but we can do additional setup here
    // For example, override the back button behavior:
    // webApp.BackButton?.show();
    // webApp.BackButton?.onClick(() => window.history.back());

    // Apply Telegram theme params as CSS variables (when available)
    const params = webApp.themeParams;
    if (params) {
      const root = document.documentElement;
      if (params.bg_color) root.style.setProperty('--tg-bg', params.bg_color);
      if (params.text_color) root.style.setProperty('--tg-fg', params.text_color);
      if (params.button_color) root.style.setProperty('--tg-button', params.button_color);
      if (params.hint_color) root.style.setProperty('--tg-hint', params.hint_color);
    }
  }, [isTelegram, webApp]);

  return null;
}
