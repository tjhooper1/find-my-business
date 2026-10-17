import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: {
    default: "Find My Business: what business should you start?",
    template: "%s | Find My Business",
  },
  description:
    "A free 10-minute quiz that matches your personality, habits and goals to businesses you'd actually enjoy running.",
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
              Find My <span className="text-brand">Business</span>
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
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
            For self-reflection and inspiration, not professional, financial or legal advice. Cost
            and timing figures are rough estimates.
          </div>
        </footer>
      </body>
    </html>
  );
}
