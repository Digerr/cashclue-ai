import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/cashclue/language-context";
import { ColorThemeProvider } from "@/components/cashclue/color-theme-context";
import { TelegramIntegration } from "@/components/cashclue/telegram-integration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cashclue.ai";
const title = "CashClue AI — Your AI Side-Hustle Strategist";
const description =
  "Turn your skills, time, and budget into a personalized money-making plan. AI-generated side hustles, startup ideas, content strategies, career pivots, and passive income plays — with real roadmaps, income projections, and step-by-step playbooks. Available in English, Русский, Español, Deutsch, Français.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · CashClue AI",
  },
  description,
  keywords: [
    "side hustle",
    "AI money",
    "passive income",
    "make money online",
    "micro-business",
    "solopreneur",
    "startup idea generator",
    "career pivot",
    "content creator",
    "business plan AI",
    "hustle idea",
    "AI strategist",
  ],
  authors: [{ name: "SKUFI4", url: "https://github.com/Digerr/cashclue-ai" }],
  creator: "SKUFI4",
  publisher: "SKUFI4",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      ru: siteUrl,
      es: siteUrl,
      de: siteUrl,
      fr: siteUrl,
    },
  },
  manifest: "/manifest.webmanifest",
  applicationName: "CashClue AI",
  appleWebApp: {
    capable: true,
    title: "CashClue AI",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "es_ES", "de_DE", "fr_FR"],
    url: siteUrl,
    siteName: "CashClue AI",
    title,
    description:
      "AI-generated side hustles, startup ideas, content strategies, career pivots, and passive income plays — with roadmaps and income projections. 5 languages.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CashClue AI — Turn your skills into cold hard cash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "AI-generated money-making plans. 5 themes, 5 languages, real roadmaps.",
    images: ["/og-image.png"],
    creator: "@cashclue",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1410" },
    { media: "(prefers-color-scheme: light)", color: "#0a1410" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CashClue AI",
  url: siteUrl,
  description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  author: { "@type": "Person", name: "SKUFI4", url: "https://github.com/Digerr/cashclue-ai" },
  creator: { "@type": "Person", name: "SKUFI4" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "49",
    offerCount: "3",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "12847",
  },
  featureList: [
    "AI-generated side hustle ideas",
    "AI-generated startup ideas",
    "Content creator business plans",
    "Career pivot roadmaps",
    "Passive income strategies",
    "Multi-language: EN, RU, ES, DE, FR",
    "Income projections and roadmaps",
    "Risk analysis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Apply theme before hydration to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cashclue:theme')||'emerald';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','emerald');}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          <ColorThemeProvider>
            <TelegramIntegration />
            {children}
            <Toaster />
          </ColorThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
