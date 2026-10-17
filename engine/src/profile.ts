import { DIMENSION_IDS, type Answers, type DimensionId, type Profile, type Question } from "./types";

export interface ProfileResult {
  profile: Profile;
  /** 0–1 per dimension: how much evidence we have (1 = plenty). */
  confidence: Record<DimensionId, number>;
}

/** Evidence weight at which a dimension counts as fully measured. */
const FULL_CONFIDENCE_WEIGHT = 4;

/**
 * Turn quiz answers into a 0–1 score per dimension. Each Likert answer and
 * each scenario signal is one piece of evidence; a dimension's score is the
 * weighted mean of its evidence, or 0.5 (neutral) when there is none.
 */
export function computeProfile(questions: Question[], answers: Answers): ProfileResult {
  const sum = zeros();
  const weight = zeros();

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;
    const w = q.weight ?? 1;

    if (q.kind === "likert") {
      if (typeof answer !== "number" || answer < 1 || answer > 5) {
        throw new Error(`Invalid Likert answer for ${q.id}: ${String(answer)}`);
      }
      const v = (answer - 1) / 4;
      sum[q.dimension] += w * (q.reverse ? 1 - v : v);
      weight[q.dimension] += w;
    } else {
      const option = q.options.find((o) => o.id === answer);
      if (!option) throw new Error(`Invalid option for ${q.id}: ${String(answer)}`);
      for (const [dim, v] of Object.entries(option.signals) as [DimensionId, number][]) {
        sum[dim] += w * v;
        weight[dim] += w;
      }
    }
  }

  const profile = zeros();
  const confidence = zeros();
  for (const d of DIMENSION_IDS) {
    profile[d] = weight[d] > 0 ? sum[d] / weight[d] : 0.5;
    confidence[d] = Math.min(1, weight[d] / FULL_CONFIDENCE_WEIGHT);
  }
  return { profile, confidence };
}

function zeros(): Record<DimensionId, number> {
  return Object.fromEntries(DIMENSION_IDS.map((d) => [d, 0])) as Record<DimensionId, number>;
}
