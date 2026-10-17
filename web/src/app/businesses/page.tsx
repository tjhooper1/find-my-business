import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESSES } from "find-my-business-engine";
import { BusinessBrowser } from "./business-browser";

export const metadata: Metadata = {
  title: "Business ideas",
  description: `${BUSINESSES.length} business ideas, online and local, with start-up costs and who they suit.`,
};

export default function BusinessesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">{BUSINESSES.length} business ideas</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Filter to what fits your life, or{" "}
        <Link href="/quiz" className="font-semibold text-brand-strong hover:underline">
          take the quiz
        </Link>{" "}
        to see which ones fit you.
      </p>
      <BusinessBrowser />
    </div>
  );
}
