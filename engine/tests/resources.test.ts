import { describe, expect, it } from "vitest";
import { BUSINESSES } from "../src/data/businesses";
import { SKILLS, SKILL_IDS } from "../src/data/dimensions";
import { RESOURCES } from "../src/data/resources";
import { coursesForSkills, resourceById, starterKit } from "../src/resources";

const CATEGORIES = new Set(BUSINESSES.map((b) => b.category));
const BUSINESS_IDS = new Set(BUSINESSES.map((b) => b.id));

describe("resource catalog", () => {
  it("has unique, URL-safe ids and https links", () => {
    expect(new Set(RESOURCES.map((r) => r.id)).size).toBe(RESOURCES.length);
    for (const r of RESOURCES) {
      expect(r.id).toMatch(/^[a-z0-9-]+$/);
      expect(r.url).toMatch(/^https:\/\//);
    }
  });

  it("only targets categories, businesses and skills that exist", () => {
    for (const r of RESOURCES) {
      for (const c of r.appliesTo?.categories ?? []) expect(CATEGORIES.has(c), `${r.id}: ${c}`).toBe(true);
      for (const b of r.appliesTo?.businesses ?? []) expect(BUSINESS_IDS.has(b), `${r.id}: ${b}`).toBe(true);
      for (const s of r.appliesTo?.skills ?? []) expect(SKILL_IDS.has(s), `${r.id}: ${s}`).toBe(true);
    }
  });

  it("has a course for every skill", () => {
    expect(coursesForSkills(SKILLS.map((s) => s.id))).toHaveLength(SKILLS.length);
  });

  it("looks resources up by id", () => {
    expect(resourceById("irs-ein")?.name).toContain("EIN");
    expect(resourceById("nope")).toBeUndefined();
  });
});

describe("starterKit", () => {
  it.each(BUSINESSES.map((b) => [b.id, b] as const))("%s gets the core launch stack, one per need", (_, b) => {
    const kit = starterKit(b);
    const needs = kit.map((r) => r.need);
    expect(new Set(needs).size).toBe(needs.length);
    for (const need of ["guidance", "mentoring", "registration", "tax-id", "bookkeeping", "website", "payments"]) expect(needs).toContain(need);
    expect(needs).not.toContain("learning");
  });

  it("is ordered by stage", () => {
    const order = { validate: 0, launch: 1, grow: 2 };
    for (const b of BUSINESSES) {
      const stages = starterKit(b).map((r) => order[r.stage]);
      expect(stages).toEqual([...stages].sort((x, y) => x - y));
    }
  });

  it("tailors picks to the business", () => {
    const ids = (id: string) => starterKit(BUSINESSES.find((b) => b.id === id)!).map((r) => r.id);
    expect(ids("lawn-care")).toContain("google-business-profile");
    expect(ids("lawn-care")).toContain("jobber");
    expect(ids("freelance-writer")).toContain("squarespace");
    expect(ids("freelance-writer")).not.toContain("jobber");
    expect(ids("cottage-bakery")).toContain("cottage-food");
    expect(ids("print-on-demand")).toContain("printful");
  });
});
