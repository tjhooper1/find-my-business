import { describe, expect, it } from "vitest";
import { BUSINESSES } from "../src/data/businesses";
import { QUESTIONS } from "../src/data/questions";
import { fitScore, matchBusinesses } from "../src/match";
import { computeProfile } from "../src/profile";
import { DIMENSION_IDS, type Answers, type Constraints, type Profile } from "../src/types";
import { PERSONAS } from "./personas";

const OPEN_CONSTRAINTS: Constraints = {
  budget: 250000,
  hoursPerWeek: 60,
  monthsUntilIncomeNeeded: 36,
  inPersonOk: true,
  physicalOk: true,
};

/** Answer the quiz the way someone with `profile` would. */
function answersFor(profile: Profile): Answers {
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    if (q.kind === "likert") {
      const v = q.reverse ? 1 - profile[q.dimension] : profile[q.dimension];
      answers[q.id] = Math.round(1 + 4 * v);
    } else {
      let best = q.options[0]!;
      let bestDist = Infinity;
      for (const o of q.options) {
        const entries = Object.entries(o.signals) as [keyof Profile, number][];
        const dist = entries.reduce((s, [d, v]) => s + (profile[d] - v) ** 2, 0) / entries.length;
        if (dist < bestDist) [best, bestDist] = [o, dist];
      }
      answers[q.id] = best.id;
    }
  }
  return answers;
}

describe("computeProfile", () => {
  it("defaults to neutral with no answers", () => {
    const { profile, confidence } = computeProfile(QUESTIONS, {});
    for (const d of DIMENSION_IDS) {
      expect(profile[d]).toBe(0.5);
      expect(confidence[d]).toBe(0);
    }
  });

  it("applies reverse keying", () => {
    const allAgree = Object.fromEntries(QUESTIONS.filter((q) => q.kind === "likert").map((q) => [q.id, 5]));
    const { profile } = computeProfile(QUESTIONS, allAgree);
    // Two forward items (1.0) and one reverse item (0.0) per dimension.
    for (const d of DIMENSION_IDS) expect(profile[d]).toBeCloseTo(2 / 3, 5);
  });

  it("rejects invalid answers", () => {
    expect(() => computeProfile(QUESTIONS, { open1: 7 })).toThrow();
    expect(() => computeProfile(QUESTIONS, { sc_saturday: "z" })).toThrow();
  });

  it.each(PERSONAS.map((p) => [p.name, p] as const))("recovers the %s profile from quiz answers", (_, persona) => {
    const { profile } = computeProfile(QUESTIONS, answersFor(persona.profile));
    for (const d of DIMENSION_IDS) expect(Math.abs(profile[d] - persona.profile[d])).toBeLessThan(0.2);
  });
});

describe("fitScore", () => {
  it("is 100 when the profile matches every target", () => {
    const b = BUSINESSES[0]!;
    const profile = Object.fromEntries(DIMENSION_IDS.map((d) => [d, b.traits[d]?.[0] ?? 0.5])) as Profile;
    expect(fitScore(profile, b).fit).toBe(100);
  });

  it("penalizes overshooting a capacity trait less than falling short", () => {
    const b = BUSINESSES.find((x) => x.id === "real-estate-agent")!;
    const base = Object.fromEntries(DIMENSION_IDS.map((d) => [d, b.traits[d]?.[0] ?? 0.5])) as Profile;
    const target = b.traits.persist![0];
    const over = fitScore({ ...base, persist: target + 0.15 }, b).fit;
    const under = fitScore({ ...base, persist: target - 0.15 }, b).fit;
    expect(over).toBeGreaterThan(under);
  });
});

describe("matchBusinesses: personas", () => {
  it.each(PERSONAS.map((p) => [p.name, p] as const))("%s gets sensible matches", (_, persona) => {
    const { top, alsoConsider } = matchBusinesses(persona.profile, OPEN_CONSTRAINTS);
    const top10 = [...top, ...alsoConsider].slice(0, 10).map((m) => m.business.id);
    expect(top10.some((id) => persona.expectSome.includes(id)), `top 10: ${top10.join(", ")}`).toBe(true);
    for (const id of persona.expectNone) expect(top10, `top 10: ${top10.join(", ")}`).not.toContain(id);
  });

  it("explains every top match", () => {
    for (const persona of PERSONAS) {
      for (const m of matchBusinesses(persona.profile).top) expect(m.reasons.length).toBeGreaterThan(0);
    }
  });
});

describe("matchBusinesses: constraints", () => {
  const fixer = PERSONAS.find((p) => p.name === "Hands-on fixer")!.profile;

  it("moves businesses that break hard constraints to notRightNow", () => {
    const c: Constraints = { ...OPEN_CONSTRAINTS, budget: 500, inPersonOk: false, physicalOk: false };
    const { top, alsoConsider, notRightNow } = matchBusinesses(fixer, c);
    for (const m of [...top, ...alsoConsider]) {
      expect(m.business.startupCost[0]).toBeLessThanOrEqual(500);
      expect(m.business.inPerson).toBe(false);
      expect(m.business.physical).toBe(false);
    }
    const handyman = notRightNow.find((e) => e.business.id === "handyman");
    expect(handyman?.reasons.length).toBeGreaterThan(0);
  });

  it("warns and down-ranks slow-to-revenue businesses", () => {
    const creator = PERSONAS.find((p) => p.name === "Creative performer")!.profile;
    const patient = matchBusinesses(creator, OPEN_CONSTRAINTS, { topN: 200, maxPerCategory: 200 });
    const urgent = matchBusinesses(creator, { ...OPEN_CONSTRAINTS, monthsUntilIncomeNeeded: 1 }, { topN: 200, maxPerCategory: 200 });
    const yt = (r: typeof patient) => r.top.find((m) => m.business.id === "youtuber")!;
    expect(yt(urgent).warnings.length).toBe(1);
    expect(yt(urgent).rankScore).toBeLessThan(yt(patient).rankScore);
  });
});

describe("matchBusinesses: modes and diversity", () => {
  const analyst = PERSONAS.find((p) => p.name === "Introverted analyst")!.profile;

  it("caps how many top slots a category can take", () => {
    for (const persona of PERSONAS) {
      const counts = new Map<string, number>();
      for (const m of matchBusinesses(persona.profile).top) {
        counts.set(m.business.category, (counts.get(m.business.category) ?? 0) + 1);
      }
      for (const n of counts.values()) expect(n).toBeLessThanOrEqual(2);
    }
  });

  it("fit+skills boosts businesses the user already has skills for", () => {
    const all = { topN: 200, maxPerCategory: 200 };
    const rank = (r: ReturnType<typeof matchBusinesses>, id: string) => r.top.findIndex((m) => m.business.id === id);
    const fitOnly = matchBusinesses(analyst, OPEN_CONSTRAINTS, { ...all, skills: { finance: 2 } });
    const withSkills = matchBusinesses(analyst, OPEN_CONSTRAINTS, { ...all, mode: "fit+skills", skills: { finance: 2 } });
    expect(rank(withSkills, "bookkeeper")).toBeLessThanOrEqual(rank(fitOnly, "bookkeeper"));
    expect(withSkills.top.find((m) => m.business.id === "bookkeeper")!.readiness).toBe(1);
  });

  it("fit+learn keeps fit order but lists skill gaps", () => {
    const fit = matchBusinesses(analyst, OPEN_CONSTRAINTS, { skills: {} });
    const learn = matchBusinesses(analyst, OPEN_CONSTRAINTS, { mode: "fit+learn", skills: {} });
    expect(learn.top.map((m) => m.business.id)).toEqual(fit.top.map((m) => m.business.id));
    expect(learn.top.every((m) => m.skillGaps.length > 0)).toBe(true);
  });
});
