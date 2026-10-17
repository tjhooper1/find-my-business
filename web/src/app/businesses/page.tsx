import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESSES, type Business } from "find-my-business-engine";
import { formatCostRange, MODE_LABEL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Business ideas",
  description: `${BUSINESSES.length} business ideas, online and local, with start-up costs and who they suit.`,
};

export default function BusinessesPage() {
  const byCategory = new Map<string, Business[]>();
  for (const b of BUSINESSES) byCategory.set(b.category, [...(byCategory.get(b.category) ?? []), b]);
  const categories = [...byCategory.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">{BUSINESSES.length} business ideas</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Browse everything, or{" "}
        <Link href="/quiz" className="font-semibold text-brand-strong hover:underline">
          take the quiz
        </Link>{" "}
        to see which ones fit you.
      </p>

      <div className="mt-10 space-y-10">
        {categories.map(([category, list]) => (
          <section key={category}>
            <h2 className="text-xl font-bold">{category}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/businesses/${b.id}`}
                    className="block h-full rounded-xl border border-line bg-surface px-4 py-3 hover:border-brand"
                  >
                    <span className="font-medium">{b.name}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {MODE_LABEL[b.mode]} · {formatCostRange(b.startupCost)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
