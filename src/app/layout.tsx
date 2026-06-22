import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/cashclue/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashClue AI — Your AI Side-Hustle Strategist",
  description: "Turn your skills, time, and budget into a personalized money-making plan. AI-generated side hustles with real roadmaps, income projections, and step-by-step playbooks.",
  keywords: ["side hustle", "AI money", "passive income", "make money online", "micro-business", "solopreneur"],
  authors: [{ name: "CashClue AI" }],
  openGraph: {
    title: "CashClue AI — Your AI Side-Hustle Strategist",
    description: "Turn your skills into a money-making plan. AI-generated side hustles with roadmaps, income projections, and playbooks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CashClue AI",
    description: "Your AI Side-Hustle Strategist",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
