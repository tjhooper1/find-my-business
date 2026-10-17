"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DIMENSIONS,
  QUESTIONS,
  computeProfile,
  matchBusinesses,
  type Constraints,
  type MatchMode,
  type Profile,
} from "find-my-business-engine";
import { EMPTY_QUIZ, quizStore, skillsStore, useHydrated, useStore } from "@/lib/storage";
import { MatchCard } from "./match-card";
import { SkillsPicker } from "./skills-picker";

/** Used for any constraint the user skipped: don't filter anything out. */
const NO_CONSTRAINTS: Constraints = {
  budget: Infinity,
  hoursPerWeek: Infinity,
  monthsUntilIncomeNeeded: Infinity,
  inPersonOk: true,
  physicalOk: true,
};

const MODES: { id: MatchMode; label: string; description: string }[] = [
  { id: "fit", label: "Best fit for me", description: "Ranked purely on your personality. The out-of-the-box option." },
  { id: "fit+skills", label: "Fit + what I can do", description: "Boosts businesses where your current skills give you a head start." },
  { id: "fit+learn", label: "Fit + willing to learn", description: "Your best personality fits, with the skills you'd need to pick up." },
];

export function Results() {
  const hydrated = useHydrated();
  const [quiz, setQuiz] = useStore(quizStore);
  const [skills, setSkills] = useStore(skillsStore);
  const [mode, setMode] = useState<MatchMode>("fit");
  const [showExcluded, setShowExcluded] = useState(false);

  const profile = useMemo(() => computeProfile(QUESTIONS, quiz.answers).profile, [quiz.answers]);
  const constraints = useMemo(() => ({ ...NO_CONSTRAINTS, ...quiz.constraints }), [quiz.constraints]);
  const result = useMemo(
    () => matchBusinesses(profile, constraints, { mode, skills: mode === "fit" ? undefined : skills }),
    [profile, constraints, mode, skills],
  );

  if (!hydrated) return <div className="h-96" aria-busy="true" />;

  if (!quiz.completed) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold">No results yet</h1>
        <p className="mt-3 text-muted">Take the quiz first. It takes about 10 minutes and you can pause any time.</p>
        <Link href="/quiz" className="mt-6 inline-block rounded-full bg-brand-strong px-6 py-3 font-semibold text-brand-ink">
          {Object.keys(quiz.answers).length > 0 ? "Pick up where you left off" : "Start the quiz"} →
        </Link>
      </div>
    );
  }

  const hasSkills = Object.values(skills).some((v) => v > 0);

  return (
    <div className="space-y-12">
      <ProfileSummary profile={profile} />

      <section>
        <h2 className="text-2xl font-bold">Your top matches</h2>
        <div role="radiogroup" aria-label="Match mode" className="mt-4 grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-2xl border-2 px-4 py-3 text-left ${
                mode === m.id ? "border-brand bg-brand-soft" : "border-line bg-surface hover:border-brand"
              }`}
            >
              <div className="font-semibold">{m.label}</div>
              <div className="mt-1 text-sm text-muted">{m.description}</div>
            </button>
          ))}
        </div>

        {mode !== "fit" && (
          <SkillsPicker skills={skills} onChange={setSkills} prompt={!hasSkills} />
        )}

        <ol className="mt-6 space-y-4">
          {result.top.map((m, i) => (
            <li key={m.business.id}>
              <MatchCard match={m} rank={i + 1} mode={mode} />
            </li>
          ))}
        </ol>
      </section>

      {result.alsoConsider.length > 0 && (
        <section>
          <h2 className="text-xl font-bold">Also worth a look</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {result.alsoConsider.map((m) => (
              <li key={m.business.id}>
                <Link
                  href={`/businesses/${m.business.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 hover:border-brand"
                >
                  <span>
                    <span className="font-medium">{m.business.name}</span>
                    <span className="block text-sm text-muted">{m.business.category}</span>
                  </span>
                  <span className="text-sm font-semibold">{m.fit}% fit</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.notRightNow.length > 0 && (
        <section>
          <button
            type="button"
            onClick={() => setShowExcluded(!showExcluded)}
            aria-expanded={showExcluded}
            className="text-left"
          >
            <h2 className="text-xl font-bold">
              Not right now <span className="text-base font-normal text-muted">({result.notRightNow.length}) {showExcluded ? "▲" : "▼"}</span>
            </h2>
            <p className="text-sm text-muted">Good fits that don&apos;t match your budget, time or preferences today.</p>
          </button>
          {showExcluded && (
            <ul className="mt-4 space-y-2">
              {result.notRightNow.slice(0, 15).map((e) => (
                <li key={e.business.id} className="rounded-xl border border-line px-4 py-3">
                  <div className="flex justify-between gap-3">
                    <Link href={`/businesses/${e.business.id}`} className="font-medium hover:underline">
                      {e.business.name}
                    </Link>
                    <span className="text-sm text-muted">{e.fit}% fit</span>
                  </div>
                  <p className="text-sm text-muted">{e.reasons.join(" · ")}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <div className="border-t border-line pt-8">
        <Link
          href="/quiz"
          onClick={() => setQuiz(EMPTY_QUIZ)}
          className="text-sm text-muted underline hover:text-ink"
        >
          Retake the quiz
        </Link>
      </div>
    </div>
  );
}

function ProfileSummary({ profile }: { profile: Profile }) {
  const standouts = [...DIMENSIONS]
    .sort((a, b) => Math.abs(profile[b.id] - 0.5) - Math.abs(profile[a.id] - 0.5))
    .slice(0, 3);

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-wide text-muted">Your business personality</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Here&apos;s what makes you tick</h1>
      <ul className="mt-4 space-y-1 text-lg">
        {standouts.map((d) => (
          <li key={d.id}>
            You <strong>{profile[d.id] >= 0.5 ? d.high : d.low}</strong>.
          </li>
        ))}
      </ul>

      <details className="mt-6 rounded-2xl border border-line bg-surface p-4">
        <summary className="cursor-pointer font-medium">See all 16 traits</summary>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {DIMENSIONS.map((d) => {
            const pct = Math.round(profile[d.id] * 100);
            return (
              <div key={d.id}>
                <div className="flex justify-between text-sm">
                  <dt className="font-medium">{d.name}</dt>
                  <dd className="text-muted">{pct}</dd>
                </div>
                <div
                  className="mt-1 h-2 rounded-full bg-brand-soft"
                  role="meter"
                  aria-label={d.name}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(pct, 2)}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted">{d.description}</p>
              </div>
            );
          })}
        </dl>
      </details>
    </section>
  );
}
