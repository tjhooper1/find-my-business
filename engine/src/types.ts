// Core types shared by the question bank, business catalog and scoring engine.

export const DIMENSION_IDS = [
  "open", // openness to new ideas and experiences
  "consc", // conscientiousness: organized, follows through
  "extra", // extraversion: energized by people
  "agree", // agreeableness: warm, accommodating
  "stab", // emotional stability: calm under pressure
  "risk", // risk tolerance
  "auton", // need for autonomy
  "struct", // preference for structure and routine (low = improviser)
  "sales", // comfort selling and self-promoting
  "persist", // persistence and delayed gratification
  "hands", // interest in hands-on, physical, practical work
  "analyt", // interest in data, systems and problem solving
  "creat", // interest in creative and aesthetic work
  "help", // interest in helping, teaching and caring for people
  "scale", // growth ambition (low = lifestyle business)
  "visib", // comfort being the public face (camera, stage, audience)
] as const;

export type DimensionId = (typeof DIMENSION_IDS)[number];

export interface Dimension {
  id: DimensionId;
  name: string;
  description: string;
  /**
   * How much to penalize a user scoring ABOVE a business's target, relative to
   * scoring below it. 1 = symmetric (a preference: too much is as bad as too
   * little). <1 = a capacity (having more than needed rarely hurts).
   */
  overFactor: number;
  /** Phrases used to explain matches: "you ___". */
  high: string;
  low: string;
}

export type Profile = Record<DimensionId, number>;

// ---------- Questions ----------

export interface LikertQuestion {
  id: string;
  kind: "likert";
  text: string;
  dimension: DimensionId;
  /** If true, agreeing indicates a LOW score on the dimension. */
  reverse?: boolean;
  weight?: number;
}

export interface ScenarioOption {
  id: string;
  text: string;
  /** Implied position (0–1) on each dimension this answer tells us about. */
  signals: Partial<Record<DimensionId, number>>;
}

export interface ScenarioQuestion {
  id: string;
  kind: "scenario";
  text: string;
  options: ScenarioOption[];
  weight?: number;
}

export type Question = LikertQuestion | ScenarioQuestion;

/** Likert answers are 1–5; scenario answers are an option id. */
export type Answers = Record<string, number | string>;

// ---------- Practical constraints ----------

export interface Constraints {
  /** Max dollars the user is willing to invest to start. */
  budget: number;
  /** Hours per week available. */
  hoursPerWeek: number;
  /** Months the user can wait before the business must earn something. */
  monthsUntilIncomeNeeded: number;
  /** Willing to work in person with local customers. */
  inPersonOk: boolean;
  /** Willing to do physically demanding work. */
  physicalOk: boolean;
}

// ---------- Skills ----------

export interface Skill {
  id: string;
  name: string;
}

/** 0 = none, 1 = some, 2 = strong. */
export type SkillLevels = Record<string, 0 | 1 | 2>;

// ---------- Business catalog ----------

export type BusinessMode = "online" | "local" | "hybrid";

/** [target 0–1, importance weight]. Dimensions not listed are ignored. */
export type TraitTarget = [target: number, weight: number];

export interface Business {
  id: string;
  name: string;
  category: string;
  mode: BusinessMode;
  summary: string;
  traits: Partial<Record<DimensionId, TraitTarget>>;
  /** Rough draft USD range to get started. Needs sourcing before publishing. */
  startupCost: [min: number, max: number];
  /** Minimum hours/week to make meaningful progress. */
  minHours: number;
  /** Typical months until first revenue. */
  monthsToRevenue: number;
  inPerson: boolean;
  physical: boolean;
  /** Core skill ids from the skills taxonomy. */
  skills: string[];
}

// ---------- Results ----------

export type MatchMode = "fit" | "fit+skills" | "fit+learn";

export interface Match {
  business: Business;
  /** 0–100, personality fit. */
  fit: number;
  /** 0–1, how much of the required skill set the user already has. Null if skills unknown. */
  readiness: number | null;
  /** Score used for ordering in the current mode. */
  rankScore: number;
  reasons: string[];
  watchOuts: string[];
  warnings: string[];
  skillGaps: string[];
}

export interface Excluded {
  business: Business;
  fit: number;
  reasons: string[];
}

export interface MatchResult {
  top: Match[];
  alsoConsider: Match[];
  notRightNow: Excluded[];
}
