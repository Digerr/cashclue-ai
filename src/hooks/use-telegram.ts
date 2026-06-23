'use client';

import { useEffect, useState } from 'react';

/**
 * Detects if the app is running inside a Telegram Mini App WebView.
 * Also injects the Telegram WebApp SDK script if available.
 *
 * Usage:
 *   const tg = useTelegram();
 *   if (tg.isTelegram) {
 *     tg.webApp?.HapticFeedback?.impactOccurred('light');
 *   }
 *
 * When ready to fully integrate with Telegram:
 *   1. Set @BotFather → Bot Settings → Menu Button → Configure Mini App
 *   2. Set the bot's menu button URL to your Vercel domain
 *   3. Use tg.webApp.initDataUnsafe.user.id to identify Telegram users
 *   4. Use tg.webApp.themeParams to apply Telegram's color scheme
 */

interface TgWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    };
    start_param?: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  MainButton?: {
    text: string;
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
  };
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

interface TgState {
  isTelegram: boolean;
  webApp: TgWebApp | null;
  tgUser: TgWebApp['initDataUnsafe']['user'] | null;
}

const DEFAULT_STATE: TgState = {
  isTelegram: false,
  webApp: null,
  tgUser: null,
};

export function useTelegram(): TgState {
  const [state, setState] = useState<TgState>(DEFAULT_STATE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inject Telegram WebApp SDK
    const existingScript = document.getElementById('tg-webapp-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'tg-webapp-script';
      script.src = 'https://telegram.org/js/telegram-web-apps.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Detect Telegram WebView via User-Agent
    const ua = window.navigator.userAgent || '';
    const isTg = /Telegram/i.test(ua) || /TelegramWebApp/i.test(ua);

    if (!isTg) return;

    // Wait for SDK to load, then initialize in a single setState
    let cancelled = false;
    const checkReady = () => {
      if (cancelled) return;
      const wa = window.Telegram?.WebApp;
      if (wa) {
        try {
          wa.ready?.();
          wa.expand?.();
          try {
            wa.setHeaderColor?.('#0a1410');
            wa.setBackgroundColor?.('#0a1410');
          } catch {}
        } catch {}
        setState({
          isTelegram: true,
          webApp: wa,
          tgUser: wa.initDataUnsafe?.user ?? null,
        });
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
