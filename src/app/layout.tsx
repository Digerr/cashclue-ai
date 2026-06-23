import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/brainbolt/language-context";
import { ColorThemeProvider } from "@/components/brainbolt/color-theme-context";
import { TelegramIntegration } from "@/components/brainbolt/telegram-integration";
import { AppShell } from "@/components/brainbolt/app-shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cashclue-ai.vercel.app";
const title = "BrainBolt — Train your brain. Beat the leaderboard.";
const description = "Fast-paced quiz game with XP, levels, streaks, and achievements. 160+ questions, 16 categories, daily challenges, 3 game modes. No signup.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · BrainBolt" },
  description,
  keywords: ["quiz", "trivia", "brain training", "quiz game", "knowledge test", "leaderboard", "achievements", "daily challenge"],
  authors: [{ name: "SKUFI4", url: "https://github.com/Digerr/cashclue-ai" }],
  creator: "SKUFI4",
  publisher: "SKUFI4",
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl, languages: { en: siteUrl, ru: siteUrl } },
  manifest: "/manifest.webmanifest",
  applicationName: "BrainBolt",
  appleWebApp: { capable: true, title: "BrainBolt", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website", locale: "en_US", url: siteUrl, siteName: "BrainBolt",
    title, description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BrainBolt" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  category: "games",
};

export const viewport: Viewport = {
  themeColor: "#0a1410",
  width: "device-width", initialScale: 1, maximumScale: 5, viewportFit: "cover", userScalable: true,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BrainBolt", url: siteUrl, description,
  applicationCategory: "GameApplication", operatingSystem: "Web",
  author: { "@type": "Person", name: "SKUFI4" },
  offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: "0", highPrice: "5", offerCount: "2" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <LanguageProvider>
          <ColorThemeProvider>
            <TelegramIntegration />
            <AppShell>{children}</AppShell>
            <Toaster />
          </ColorThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
