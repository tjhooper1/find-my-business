import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sidequest Biz: what business should you start?",
    template: "%s | Sidequest Biz",
  },
  description:
    "A free 10-minute quiz that finds your founder type and matches you to businesses you'd actually enjoy running.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-line">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Sidequest <span className="text-brand">Biz</span>
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/businesses" className="text-muted hover:text-ink">
                Browse ideas
              </Link>
              <Link
                href="/quiz"
                className="rounded-full bg-brand-strong px-4 py-2 font-semibold text-brand-ink hover:opacity-90"
              >
                Take the quiz
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-muted">
            <p>
              For self-reflection and inspiration, not professional, financial or legal advice. Cost and timing
              figures are rough estimates. Some links are affiliate links.
            </p>
            <nav className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-ink">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-ink">
                Terms
              </Link>
              <Link href="/disclosure" className="hover:text-ink">
                Affiliate disclosure
              </Link>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
