import { describe, expect, it } from "vitest";
import { BUSINESSES } from "../src/data/businesses";
import { DIMENSIONS, SKILL_IDS } from "../src/data/dimensions";
import { LIKERT, QUESTIONS, SCENARIOS } from "../src/data/questions";
import { DIMENSION_IDS } from "../src/types";

describe("dimensions", () => {
  it("defines every dimension id exactly once", () => {
    expect(DIMENSIONS.map((d) => d.id).sort()).toEqual([...DIMENSION_IDS].sort());
  });
});

describe("question bank", () => {
  it("has unique ids", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes every question once after interleaving", () => {
    expect(QUESTIONS.length).toBe(LIKERT.length + SCENARIOS.length);
  });

  it.each(DIMENSION_IDS)("measures %s with 3+ Likert items, one reverse-keyed", (dim) => {
    const items = LIKERT.filter((q) => q.dimension === dim);
    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(items.some((q) => q.reverse)).toBe(true);
  });

  it("keeps scenario signals within 0–1", () => {
    for (const q of SCENARIOS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      for (const o of q.options) {
        for (const v of Object.values(o.signals)) {
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(1);
        }
      }
    }
  });
});

describe("business catalog", () => {
  it("has ~100 businesses with unique ids", () => {
    const ids = BUSINESSES.map((b) => b.id);
    expect(ids.length).toBeGreaterThanOrEqual(100);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(BUSINESSES.map((b) => [b.id, b] as const))("%s is well-formed", (_, b) => {
    const traits = Object.entries(b.traits);
    expect(traits.length).toBeGreaterThanOrEqual(4);
    for (const [dim, [target, weight]] of traits) {
      expect(DIMENSION_IDS).toContain(dim);
      expect(target).toBeGreaterThanOrEqual(0);
      expect(target).toBeLessThanOrEqual(1);
      expect(weight).toBeGreaterThan(0);
    }
    expect(b.startupCost[0]).toBeLessThanOrEqual(b.startupCost[1]);
    expect(b.skills.length).toBeGreaterThan(0);
    for (const s of b.skills) expect(SKILL_IDS.has(s), `unknown skill ${s}`).toBe(true);
  });
});
