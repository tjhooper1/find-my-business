import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ARCHETYPES, archetypeGuide } from "find-my-business-engine";
import { MODE_LABEL } from "@/lib/format";

// SEO pages: every founder type is prerendered at build time.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return ARCHETYPES.map((a) => ({ id: a.id }));
}

function getArchetype(id: string) {
  const archetype = ARCHETYPES.find((a) => a.id === id);
  if (!archetype) notFound();
  return archetype;
}

export async function generateMetadata({ params }: PageProps<"/types/[id]">): Promise<Metadata> {
  const a = getArchetype((await params).id);
  return {
    title: `${a.name}: strengths, blind spots and the best businesses to start`,
    description: `${a.tagline} ${a.description}`,
  };
}

// Same shape as the business pages: the frame is static, the params-dependent body sits in Suspense.
export default function TypePage({ params }: PageProps<"/types/[id]">) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Link href="/types" className="text-sm text-muted hover:text-ink">
        ← All founder types
      </Link>
      <Suspense fallback={<div className="mt-6 h-96" aria-busy="true" />}>
        <TypeDetails params={params} />
      </Suspense>
    </article>
  );
}

async function TypeDetails({ params }: { params: PageProps<"/types/[id]">["params"] }) {
  const a = getArchetype((await params).id);
  const { strengths, bestFits, toughFits, cousins } = archetypeGuide(a);
  const short = a.name.replace(/^The /, "");

  return (
    <>
      <div className="mt-6 text-5xl" aria-hidden>
        {a.emoji}
      </div>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{a.name}</h1>
      <p className="mt-2 text-lg font-medium">{a.tagline}</p>
      <p className="mt-3 text-lg text-muted">{a.description}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-lg font-bold">How you work</h2>
          <ul className="mt-3 space-y-2">
            {strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden className="font-bold text-accent-ink">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-lg font-bold">Where you might trip up</h2>
          <ul className="mt-3 space-y-2">
            {a.blindSpots.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden className="font-bold text-warn-ink">!</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Businesses {short}s tend to love</h2>
        <p className="mt-1 text-sm text-muted">
          Scored with the same engine as the quiz, using a typical {short}&apos;s traits.
        </p>
        <ol className="mt-4 space-y-3">
          {bestFits.map((m) => (
            <li key={m.business.id}>
              <Link
                href={`/businesses/${m.business.id}`}
                className="block rounded-xl border border-line bg-surface p-4 hover:border-brand"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">{m.business.name}</span>
                  <span className="text-sm font-semibold text-accent-ink">{m.fit}% fit</span>
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {m.business.category} · {MODE_LABEL[m.business.mode]}
                </span>
                <span className="mt-2 block text-sm">{m.reasons.join(" ")}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Businesses that tend to be a tough fit</h2>
        <p className="mt-1 text-sm text-muted">
          Not impossible, just uphill. These reward traits that don&apos;t come naturally to most {short}s.
        </p>
        <ul className="mt-4 space-y-3">
          {toughFits.map((t) => (
            <li key={t.business.id}>
              <Link
                href={`/businesses/${t.business.id}`}
                className="block rounded-xl border border-line bg-surface p-4 hover:border-brand"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">{t.business.name}</span>
                  <span className="text-sm text-muted">{t.fit}% fit</span>
                </span>
                <span className="mt-2 block space-y-1 text-sm">
                  {t.clashes.map((c) => (
                    <span key={c.needs} className="block">
                      Rewards people who <strong>{c.needs}</strong>, while{" "}
                      {c.lean.startsWith("are ") ? `you're usually ${c.lean.slice(4)}` : `you usually ${c.lean}`}.
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-accent-soft p-6">
        <h2 className="text-lg font-bold">One piece of advice</h2>
        <p className="mt-2">{a.advice}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Close cousins</h2>
        <p className="mt-1 text-sm text-muted">The types {short}s most often share traits with.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {cousins.map(({ archetype: c }) => (
            <li key={c.id}>
              <Link
                href={`/types/${c.id}`}
                className="block h-full rounded-xl border border-line bg-surface p-4 hover:border-brand"
              >
                <span className="text-2xl" aria-hidden>
                  {c.emoji}
                </span>
                <span className="mt-1 block font-semibold">{c.name}</span>
                <span className="mt-1 block text-sm text-muted">{c.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-brand-soft p-6">
        <h2 className="text-xl font-bold">
          Are you {/^[AEIOU]/.test(short) ? "an" : "a"} {short}?
        </h2>
        <p className="mt-2">
          Take the free quiz to find your founder type and get matched with businesses you&apos;d actually enjoy
          running. Founder types are a starting point for reflection, not a verdict.
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
