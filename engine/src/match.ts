import { BUSINESSES } from "./data/businesses";
import { DIMENSION_BY_ID, SKILLS } from "./data/dimensions";
import { DIMENSION_IDS } from "./types";
import type {
  Business,
  Constraints,
  DimensionId,
  Excluded,
  Match,
  MatchMode,
  MatchResult,
  Profile,
  SkillLevels,
  TraitTarget,
} from "./types";

/** Weighted RMS distance at which fit reaches 0. Lower = harsher scores. */
const ZERO_FIT_DISTANCE = 0.6;
/** Rank multiplier when a business usually pays later than the user needs. */
const SLOW_REVENUE_PENALTY = 0.85;
/**
 * Dimensions a business doesn't list are treated as "neutral, barely matters"
 * so a strong trait the business never uses still costs a little. Without this,
 * businesses with few listed traits fit almost everyone.
 */
const IMPLICIT_WEIGHT = 0.4;
/** A trait counts as a reason if the user is within this distance of the target… */
const REASON_MAX_GAP = 0.2;
/** …and the user is clearly on that side of the scale. */
const REASON_MIN_LEAN = 0.15;
/** A trait counts as a watch-out if the (adjusted) gap is at least this big. */
const WATCH_OUT_MIN_GAP = 0.25;

const SKILL_CREDIT = { 0: 0, 1: 0.6, 2: 1 } as const;
const SKILL_NAME = Object.fromEntries(SKILLS.map((s) => [s.id, s.name]));

export interface MatchOptions {
  mode?: MatchMode;
  /** User's skill levels. Omit if they skipped the skills module. */
  skills?: SkillLevels;
  topN?: number;
  alsoConsiderN?: number;
  /** Max businesses from one category in the top list. */
  maxPerCategory?: number;
  catalog?: Business[];
}

interface TraitGap {
  dim: DimensionId;
  target: number;
  weight: number;
  /** user − target */
  gap: number;
  /** gap after over-target discount */
  adjusted: number;
  user: number;
}

export interface FitDetail {
  fit: number;
  gaps: TraitGap[];
}

/** Personality fit, 0–100, from asymmetric weighted RMS distance. */
export function fitScore(profile: Profile, business: Business): FitDetail {
  return traitFit(profile, business.traits);
}

/** Fit of a profile against any set of trait targets (businesses, archetypes). */
export function traitFit(profile: Profile, traits: Partial<Record<DimensionId, TraitTarget>>): FitDetail {
  let penalty = 0;
  let totalWeight = 0;
  const gaps: TraitGap[] = [];

  for (const dim of DIMENSION_IDS) {
    const listed: TraitTarget | undefined = traits[dim];
    if (!listed) {
      const gap = profile[dim] - 0.5;
      penalty += IMPLICIT_WEIGHT * gap * gap;
      totalWeight += IMPLICIT_WEIGHT;
      continue;
    }
    const [target, weight] = listed;
    const gap = profile[dim] - target;
    const adjusted = gap > 0 ? gap * DIMENSION_BY_ID[dim].overFactor : gap;
    penalty += weight * adjusted * adjusted;
    totalWeight += weight;
    gaps.push({ dim, target, weight, gap, adjusted, user: profile[dim] });
  }

  const rms = totalWeight > 0 ? Math.sqrt(penalty / totalWeight) : 1;
  const fit = Math.round(100 * Math.max(0, 1 - rms / ZERO_FIT_DISTANCE));
  return { fit, gaps };
}

export function exclusionReasons(business: Business, c: Constraints): string[] {
  const reasons: string[] = [];
  if (c.budget < business.startupCost[0]) {
    reasons.push(`Usually needs at least $${business.startupCost[0].toLocaleString("en-US")} to start`);
  }
  if (c.hoursPerWeek < business.minHours) {
    reasons.push(`Needs about ${business.minHours}+ hours a week`);
  }
  if (!c.inPersonOk && business.inPerson) reasons.push("Involves face-to-face work with customers");
  if (!c.physicalOk && business.physical) reasons.push("Physically demanding work");
  return reasons;
}

export function readiness(business: Business, skills: SkillLevels): { score: number; gaps: string[] } {
  if (business.skills.length === 0) return { score: 1, gaps: [] };
  let total = 0;
  const gaps: string[] = [];
  for (const id of business.skills) {
    const level = skills[id] ?? 0;
    total += SKILL_CREDIT[level];
    if (level === 0) gaps.push(SKILL_NAME[id] ?? id);
  }
  return { score: total / business.skills.length, gaps };
}

function explain(gaps: TraitGap[]): { reasons: string[]; watchOuts: string[] } {
  const reasons = gaps
    .filter(
      (g) =>
        g.weight >= 1 &&
        Math.abs(g.gap) <= REASON_MAX_GAP &&
        Math.abs(g.user - 0.5) >= REASON_MIN_LEAN &&
        g.user >= 0.5 === g.target >= 0.5,
    )
    .sort((a, b) => b.weight * (1 - Math.abs(b.gap)) - a.weight * (1 - Math.abs(a.gap)))
    .slice(0, 3)
    .map((g) => {
      const d = DIMENSION_BY_ID[g.dim];
      return `You ${g.target >= 0.5 ? d.high : d.low}.`;
    });

  const watchOuts = gaps
    .filter((g) => g.weight >= 1 && Math.abs(g.adjusted) >= WATCH_OUT_MIN_GAP)
    .sort((a, b) => b.weight * b.adjusted ** 2 - a.weight * a.adjusted ** 2)
    .slice(0, 2)
    .map((g) => {
      const d = DIMENSION_BY_ID[g.dim];
      const phrase = g.target >= 0.5 ? d.high : d.low;
      return `Works best for people who ${phrase}. You scored ${g.gap > 0 ? "higher" : "lower"} on ${d.name.toLowerCase()}.`;
    });

  return { reasons, watchOuts };
}

export function matchBusinesses(
  profile: Profile,
  constraints?: Constraints,
  opts: MatchOptions = {},
): MatchResult {
  const { mode = "fit", skills, topN = 5, alsoConsiderN = 10, maxPerCategory = 2, catalog = BUSINESSES } = opts;

  const matches: Match[] = [];
  const notRightNow: Excluded[] = [];

  for (const business of catalog) {
    const { fit, gaps } = fitScore(profile, business);
    const excluded = constraints ? exclusionReasons(business, constraints) : [];
    if (excluded.length > 0) {
      notRightNow.push({ business, fit, reasons: excluded });
      continue;
    }

    const warnings: string[] = [];
    let rankScore = fit;
    if (constraints && business.monthsToRevenue > constraints.monthsUntilIncomeNeeded) {
      warnings.push(`Often takes ${business.monthsToRevenue}+ months before it earns`);
      rankScore *= SLOW_REVENUE_PENALTY;
    }

    const ready = skills ? readiness(business, skills) : null;
    if (mode === "fit+skills" && ready) rankScore *= 0.6 + 0.4 * ready.score;

    matches.push({
      business,
      fit,
      readiness: ready?.score ?? null,
      rankScore,
      ...explain(gaps),
      warnings,
      skillGaps: mode === "fit" ? [] : (ready?.gaps ?? []),
    });
  }

  matches.sort((a, b) => b.rankScore - a.rankScore);
  notRightNow.sort((a, b) => b.fit - a.fit);

  // Diversity pass: cap how many top slots one category can take.
  const top: Match[] = [];
  const perCategory = new Map<string, number>();
  for (const m of matches) {
    if (top.length >= topN) break;
    const n = perCategory.get(m.business.category) ?? 0;
    if (n >= maxPerCategory) continue;
    perCategory.set(m.business.category, n + 1);
    top.push(m);
  }
  const alsoConsider = matches.filter((m) => !top.includes(m)).slice(0, alsoConsiderN);

  return { top, alsoConsider, notRightNow };
}
