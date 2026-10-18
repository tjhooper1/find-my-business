import Link from "next/link";
import { ARCHETYPES, BUSINESSES, QUESTIONS, CONSTRAINT_QUESTIONS } from "find-my-business-engine";
import { ArchetypeGrid } from "@/components/archetype-grid";

const QUESTION_COUNT = QUESTIONS.length + CONSTRAINT_QUESTIONS.length;
const CATEGORY_COUNT = new Set(BUSINESSES.map((b) => b.category)).size;

const STEPS = [
  {
    title: "Answer honestly",
    body: `${QUESTION_COUNT} quick questions about how you work, what drains you and what lights you up. No right answers.`,
  },
  {
    title: "Meet your founder type",
    body: `Discover which of ${ARCHETYPES.length} founder types you are, plus where you land on 16 traits, from risk appetite to love of routine.`,
  },
  {
    title: "Get matched",
    body: `We score ${BUSINESSES.length} business types against your profile and explain every match, good and bad.`,
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pt-24">
        <p className="mb-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-ink">
          Free · about 10 minutes · no signup
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Stop guessing. Find the business that fits <span className="text-brand">who you are.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Most &ldquo;business idea&rdquo; lists ignore the most important part: you. Our quiz looks
          at your personality, temperament and goals, then matches you with businesses you&apos;d
          actually enjoy running.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="rounded-full bg-brand-strong px-6 py-3 text-lg font-semibold text-brand-ink hover:opacity-90"
          >
            Find my business →
          </Link>
          <Link
            href="/businesses"
            className="rounded-full border border-line px-6 py-3 text-lg font-semibold hover:bg-surface"
          >
            Browse {BUSINESSES.length} ideas
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-bold">
                {i + 1}
              </div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold">Which founder type are you?</h2>
        <div className="mt-6">
          <ArchetypeGrid />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-bold">Not just the usual side hustles</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Online and local, laptop and toolbox: {CATEGORY_COUNT} categories, from freelance
          design and micro-SaaS to dog training, food trucks and licensed trades. Want something
          outside your comfort zone? Match on personality alone and we&apos;ll show you what
          you&apos;d need to learn.
        </p>
      </section>
    </>
  );
}
