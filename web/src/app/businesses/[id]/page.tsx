import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BUSINESSES, DIMENSION_BY_ID, SKILLS, type DimensionId, type TraitTarget } from "find-my-business-engine";
import { formatCostRange, MODE_LABEL } from "@/lib/format";

const SKILL_NAME = Object.fromEntries(SKILLS.map((s) => [s.id, s.name]));

// SEO pages: every business is prerendered at build time.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ id: b.id }));
}

function getBusiness(id: string) {
  const business = BUSINESSES.find((b) => b.id === id);
  if (!business) notFound();
  return business;
}

export async function generateMetadata({ params }: PageProps<"/businesses/[id]">): Promise<Metadata> {
  const b = getBusiness((await params).id);
  return {
    title: `${b.name}: is it the right business for you?`,
    description: b.summary,
  };
}

// The App Shell is shared by every business URL, so only the frame lives
// outside Suspense; the params-dependent body streams in (or is prerendered).
export default function BusinessPage({ params }: PageProps<"/businesses/[id]">) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Link href="/businesses" className="text-sm text-muted hover:text-ink">
        ← All business ideas
      </Link>
      <Suspense fallback={<div className="mt-6 h-96" aria-busy="true" />}>
        <BusinessDetails params={params} />
      </Suspense>
    </article>
  );
}

async function BusinessDetails({ params }: { params: PageProps<"/businesses/[id]">["params"] }) {
  const b = getBusiness((await params).id);

  const traits = (Object.entries(b.traits) as [DimensionId, TraitTarget][])
    .sort(([, [, wa]], [, [, wb]]) => wb - wa)
    .slice(0, 5);

  const facts = [
    { label: "Start-up cost", value: formatCostRange(b.startupCost) },
    { label: "First revenue", value: `~${b.monthsToRevenue} month${b.monthsToRevenue === 1 ? "" : "s"}` },
    { label: "Time needed", value: `${b.minHours}+ hrs/week` },
    { label: "Where", value: MODE_LABEL[b.mode] },
  ];

  return (
    <>
      <p className="mt-6 text-sm font-medium uppercase tracking-wide text-muted">{b.category}</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{b.name}</h1>
      <p className="mt-3 text-lg text-muted">{b.summary}</p>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-line bg-surface p-4">
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="mt-1 font-semibold">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted">Rough estimates. Costs and timelines vary a lot by location and niche.</p>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Who thrives at this</h2>
        <ul className="mt-3 space-y-2">
          {traits.map(([dim, [target]]) => {
            const d = DIMENSION_BY_ID[dim];
            return (
              <li key={dim} className="flex gap-2">
                <span aria-hidden className="font-bold text-accent-ink">✓</span>
                <span>
                  People who <strong>{target >= 0.5 ? d.high : d.low}</strong>
                </span>
              </li>
            );
          })}
        </ul>
        {(b.physical || b.inPerson) && (
          <p className="mt-3 text-sm text-muted">
            {[b.inPerson && "Involves face-to-face work with customers.", b.physical && "Physically demanding."]
              .filter(Boolean)
              .join(" ")}
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Skills that help</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {b.skills.map((s) => (
            <li key={s} className="rounded-full bg-accent-soft px-3 py-1 text-sm">
              {SKILL_NAME[s] ?? s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-brand-soft p-6">
        <h2 className="text-xl font-bold">Is this the one for you?</h2>
        <p className="mt-2">
          Take the free quiz to see how well {b.name.toLowerCase()} fits your personality, and what
          else might fit even better.
        </p>
        <Link
          href="/quiz"
          className="mt-4 inline-block rounded-full bg-brand-strong px-5 py-2.5 font-semibold text-brand-ink hover:opacity-90"
        >
          Take the quiz →
        </Link>
      </section>
    </>
  );
}
