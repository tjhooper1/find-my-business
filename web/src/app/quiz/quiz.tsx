"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CONSTRAINT_QUESTIONS,
  QUESTIONS,
  type Constraints,
  type Question,
} from "find-my-business-engine";
import { quizStore, useHydrated, useStore, type QuizState } from "@/lib/storage";

type ConstraintQuestion = (typeof CONSTRAINT_QUESTIONS)[number];

type Step =
  | { kind: "question"; question: Question }
  | { kind: "constraint"; question: ConstraintQuestion };

const STEPS: Step[] = [
  ...QUESTIONS.map((question): Step => ({ kind: "question", question })),
  ...CONSTRAINT_QUESTIONS.map((question): Step => ({ kind: "constraint", question })),
];

const LIKERT_LABELS = ["Not me at all", "Not really", "Depends", "Pretty much", "That's so me"];

/** Delay before auto-advancing, so the selection registers visually. */
const ADVANCE_MS = 220;

interface Choice {
  key: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function Quiz() {
  const router = useRouter();
  const hydrated = useHydrated();
  const [state, setState] = useStore(quizStore);
  /** The state just answered, waiting to advance to the next step. */
  const [pending, setPending] = useState<QuizState | null>(null);

  const index = Math.min(state.index, STEPS.length - 1);
  const step = STEPS[index]!;

  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => {
      setPending(null);
      if (pending.index >= STEPS.length - 1) {
        setState({ ...pending, completed: true });
        router.push("/results");
      } else {
        setState({ ...pending, index: pending.index + 1 });
      }
    }, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [pending, router, setState]);

  const choices = choicesFor(step, state, (next) => {
    setState(next);
    setPending(next);
  });

  // Number keys pick an answer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= choices.length) choices[n - 1]!.onSelect();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices]);

  if (!hydrated) return <div className="h-96" aria-busy="true" />;

  const progress = Math.round((index / STEPS.length) * 100);
  const isLikert = step.kind === "question" && step.question.kind === "likert";

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-muted">
          <span>{step.kind === "constraint" ? "The practical stuff" : "About you"}</span>
          <span>
            {index + 1} of {STEPS.length}
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-brand-soft"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step.kind === "constraint" && index === QUESTIONS.length && (
        <p className="mb-3 font-medium text-accent-ink">Nice! Almost done. Just a few practical questions.</p>
      )}

      <h1 className="min-h-24 text-2xl font-bold leading-snug sm:text-3xl">{step.question.text}</h1>

      <div className={isLikert ? "mt-8 grid gap-2 sm:grid-cols-5" : "mt-8 grid gap-3"} key={step.question.id}>
        {choices.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={c.onSelect}
            aria-pressed={c.selected}
            className={`rounded-2xl border-2 px-4 py-4 text-left font-medium transition-colors sm:py-3 ${
              isLikert ? "sm:text-center sm:text-sm" : ""
            } ${c.selected ? "border-brand bg-brand-soft" : "border-line bg-surface hover:border-brand"}`}
          >
            <span className="mr-2 text-xs text-muted sm:hidden">{i + 1}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setState({ ...state, index: Math.max(0, index - 1) })}
          disabled={index === 0}
          className="text-muted hover:text-ink disabled:invisible"
        >
          ← Back
        </button>
        <span className="hidden text-muted sm:inline">Tip: press 1–{choices.length} to answer</span>
      </div>
    </div>
  );
}

function choicesFor(step: Step, state: QuizState, choose: (next: QuizState) => void): Choice[] {
  const at = { ...state, index: Math.min(state.index, STEPS.length - 1) };

  if (step.kind === "constraint") {
    const id = step.question.id;
    return step.question.options.map((o) => ({
      key: o.label,
      label: o.label,
      selected: state.constraints[id] === o.value,
      onSelect: () => choose({ ...at, constraints: { ...state.constraints, [id]: o.value } as Partial<Constraints> }),
    }));
  }

  const q = step.question;
  if (q.kind === "likert") {
    return LIKERT_LABELS.map((label, i) => ({
      key: label,
      label,
      selected: state.answers[q.id] === i + 1,
      onSelect: () => choose({ ...at, answers: { ...state.answers, [q.id]: i + 1 } }),
    }));
  }
  return q.options.map((o) => ({
    key: o.id,
    label: o.text,
    selected: state.answers[q.id] === o.id,
    onSelect: () => choose({ ...at, answers: { ...state.answers, [q.id]: o.id } }),
  }));
}
