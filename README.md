# 💰 CashClue AI

**AI-powered side-hustle strategist** — turn your skills, time, and budget into a personalized money-making plan. 5 themes, 5 languages, real roadmaps, income projections, and risk analysis.

🟢 **Live demo**: replace with your Vercel URL after deploy
🛠 **Stack**: Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Prisma · z-ai-web-dev-sdk

---

## ✨ Features

- **AI-generated plans** in 5 modes: Side Hustle, Startup Idea, Content Creator, Career Pivot, Passive Income
- **5 languages**: English, Русский, Español, Deutsch, Français — UI and AI output both localized
- **Real roadmaps**: 3-step execution plan per idea, with duration, tools, and risk analysis
- **Income projections**: monthly income range, startup cost, time to first $, time to profitable
- **Quick wins + long-term plays** so the user knows what to do this week and in 6 months
- **Queue with progress UI** — handles 5 concurrent AI calls, queues the rest with position tracking
- **Rate limiting + credits** — 3 free plans per browser, 10/hour rate cap, server-side enforcement
- **Auto-retry + credit refund** on transient AI failures
- **Analytics built-in** — every funnel event tracked server-side
- **SEO-ready**: sitemap, robots, JSON-LD, OG image, hreflang alternates
- **PWA**: installable on iOS/Android with custom icons
- **Security headers**: CSP, HSTS, X-Frame-Options, Permissions-Policy

---

## 🚀 Deploy to Vercel (recommended)

### Step 1 — Push to GitHub (already done if you're reading this on GitHub)

### Step 2 — Import on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Authorize Vercel to access your GitHub (if prompted)
4. Pick this repo → click **Import**

### Step 3 — Configure environment variables
In the "Configure Project" step, expand **Environment Variables** and add:

| Name | Value | Required |
|------|-------|----------|
| `DATABASE_URL` | see below | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` (your Vercel URL after first deploy) | ✅ |
| `CASHCLUE_SALT` | run `openssl rand -hex 32` locally, paste the result | ✅ |

**For `DATABASE_URL`:**

The default SQLite won't survive Vercel's serverless filesystem (it's read-only + ephemeral). You need a real hosted DB. Two options:

**Option A — Vercel Postgres (easiest, free tier)**:
1. In Vercel project → **Storage** tab → **Create Database** → **Postgres** (Neon)
2. Pick the free tier → Connect to project
3. Vercel auto-injects `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`
4. Set `DATABASE_URL` = the value of `POSTGRES_PRISMA_URL` from Vercel's `.env` tab
5. Change Prisma provider in `prisma/schema.prisma` from `sqlite` to `postgresql`
6. Run `bun run db:push` locally (with `DATABASE_URL` set to the Neon URL) to create tables

**Option B — any external Postgres/MySQL** (Supabase, Railway, Neon directly):
1. Create a free Postgres instance
2. Copy the connection string
3. Set it as `DATABASE_URL`
4. Change Prisma provider in `prisma/schema.prisma` from `sqlite` to `postgresql`
5. Run `bun run db:push` locally to create tables

### Step 4 — Deploy
Click **Deploy**. First deploy takes ~2 min.

### Step 5 — Post-deploy
1. After deploy, copy your Vercel URL (e.g. `cashclue-ai.vercel.app`)
2. Go to Project Settings → Environment Variables → update `NEXT_PUBLIC_SITE_URL` to that URL
3. Trigger a redeploy (Deployments tab → ⋯ → Redeploy)
4. (Optional) Add a custom domain in Project Settings → Domains

---

## 🛠 Local development

```bash
# 1. Install deps
bun install

# 2. Copy env example
cp .env.example .env
# Edit .env: set CASHCLUE_SALT to a random 32-char hex string

# 3. Push DB schema
bun run db:push

# 4. Run dev server
bun run dev
# Open http://localhost:3000
```

---

## 📁 Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts      # POST — enqueue AI job (rate-limited, credit-decremented)
│   │   ├── status/[jobId]/route.ts # GET — poll job status, persist on completion
│   │   ├── credits/route.ts       # GET — read server-side credits
│   │   ├── track/route.ts         # POST — analytics events
│   │   └── health/route.ts        # GET — queue stats + uptime
│   ├── error.tsx                  # route error boundary
│   ├── global-error.tsx           # root error boundary
│   ├── not-found.tsx              # 404 page
│   ├── layout.tsx                 # SEO metadata + JSON-LD + LanguageProvider
│   ├── page.tsx                   # homepage
│   ├── sitemap.ts                 # dynamic sitemap
│   └── robots.ts                  # robots.txt
├── components/
│   ├── cashclue/
│   │   ├── language-context.tsx   # i18n provider
│   │   ├── language-switcher.tsx  # 🇬🇧🇷🇺🇪🇸🇩🇪🇫🇷 dropdown
│   │   ├── wizard.tsx             # main form + results + queue polling
│   │   ├── hero.tsx, header.tsx, pricing.tsx, ...
│   └── ui/                        # shadcn/ui components
└── lib/
    ├── ai.ts                      # AI client + 5 themes + lenient JSON parser
    ├── auth.ts                    # anonymous user identity (cookie + DB)
    ├── i18n.ts                    # 5-language dictionary
    ├── rate-limit.ts              # in-memory sliding window
    ├── queue.ts                   # job queue with concurrency cap
    ├── queue-worker.ts            # AI executor with retry
    └── db.ts                      # Prisma client
prisma/
└── schema.prisma                  # AnonymousUser, GeneratedPlan, AnalyticsEvent
public/
├── manifest.webmanifest           # PWA
├── og-image.png                   # 1200x630 social card
└── icon-{192,512}.png, favicon.svg
```

---

## 📊 Capacity (current single-instance setup)

- **5 concurrent AI calls** (hard cap, rest queued)
- **~20 concurrent active generations** with progress UI
- **100-200 active users** on site = smooth (most are reading, not generating)
- **Auto-retry** on transient AI failures (429 / timeout / parse errors)
- **Credit refunds** on errors so users aren't penalized for AI hiccups

To scale beyond: replace in-memory `queue.ts` and `rate-limit.ts` with Redis-backed equivalents (BullMQ + Upstash Redis).

---

## 🗺 Roadmap (what's NOT done yet)

- [ ] **Stripe Checkout** — pricing buttons don't charge yet (~4 hours of work)
- [ ] **NextAuth email login** — to save plan history across devices
- [ ] **AI Coach chat** for Empire tier
- [ ] **Redis queue** for multi-instance scaling
- [ ] **PostHog** for visual funnel analytics

---

## 📝 License

MIT — do whatever, just don't blame me if your side hustle loses money.

---

## 🤝 Contributing

Built in a weekend by a human + AI pair. PRs welcome.
