import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "pickleball.ai — Every match has a story",
  description: "Log pickleball matches with your crew, track your win rate and rivalries, and keep every session in one place. Now in private beta on iOS.",
  keywords: [
    "pickleball app",
    "pickleball score tracker",
    "pickleball stats app",
    "log pickleball matches",
    "pickleball app for friends",
    "track pickleball win rate",
  ],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "pickleball.ai",
    title: "pickleball.ai — Every match has a story",
    description: "Log pickleball matches with your crew, track your win rate and rivalries, and keep every session in one place. Now in private beta on iOS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "pickleball.ai — Every match has a story",
    description: "Log pickleball matches with your crew and track the rivalries that keep you coming back. Private beta on iOS.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
