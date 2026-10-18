import { describe, expect, it } from "vitest";
import { archetypeGuide, assignArchetype } from "../src/archetype";
import { ARCHETYPES } from "../src/data/archetypes";
import { DIMENSION_IDS, type Profile } from "../src/types";
import { PERSONAS } from "./personas";

describe("archetypes", () => {
  it("have unique ids and at least 3 traits each", () => {
    expect(new Set(ARCHETYPES.map((a) => a.id)).size).toBe(ARCHETYPES.length);
    for (const a of ARCHETYPES) expect(Object.keys(a.traits).length).toBeGreaterThanOrEqual(3);
  });

  it.each(ARCHETYPES.map((a) => [a.id, a] as const))("%s is reachable from its own prototype", (_, a) => {
    const profile = Object.fromEntries(DIMENSION_IDS.map((d) => [d, a.traits[d]?.[0] ?? 0.5])) as Profile;
    expect(assignArchetype(profile).primary.id).toBe(a.id);
  });

  it.each(PERSONAS.map((p) => [p.name, p] as const))("%s gets the expected archetype", (_, persona) => {
    const { primary, ranked } = assignArchetype(persona.profile);
    expect(primary.id, ranked.slice(0, 3).map((r) => `${r.archetype.id} ${r.fit}`).join(", ")).toBe(persona.archetype);
  });

  it("returns a different secondary archetype", () => {
    for (const persona of PERSONAS) {
      const { primary, secondary } = assignArchetype(persona.profile);
      expect(secondary.id).not.toBe(primary.id);
    }
  });
});

describe("archetypeGuide", () => {
  it.each(ARCHETYPES.map((a) => [a.id, a] as const))("%s has a full, explainable page", (_, a) => {
    const g = archetypeGuide(a);
    expect(a.blindSpots).toHaveLength(3);
    expect(a.advice.length).toBeGreaterThan(40);
    expect(g.strengths.length).toBeGreaterThanOrEqual(3);
    expect(g.bestFits.length).toBeGreaterThanOrEqual(4);
    for (const m of g.bestFits) expect(m.reasons.length).toBeGreaterThan(0);
    expect(g.toughFits.length).toBeGreaterThanOrEqual(3);
    for (const t of g.toughFits) expect(t.clashes.length).toBeGreaterThan(0);
    expect(new Set(g.toughFits.map((t) => t.business.category)).size).toBe(g.toughFits.length);
    // Best and tough fits never overlap, and best fits clearly outscore tough ones.
    expect(Math.min(...g.bestFits.map((m) => m.fit))).toBeGreaterThan(Math.max(...g.toughFits.map((t) => t.fit)));
    expect(g.cousins.map((c) => c.archetype.id)).not.toContain(a.id);
  });
});
