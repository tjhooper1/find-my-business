import { RESOURCES } from "./data/resources";
import type { Business, Resource, ResourceStage } from "./types";

// Resources are attached to a business AFTER matching and never affect it
// (SPEC §9.4). Selection uses only fit-to-business and `priority`.

export const STAGES: { id: ResourceStage; label: string }[] = [
  { id: "validate", label: "Test the idea" },
  { id: "launch", label: "Launch" },
  { id: "grow", label: "Grow" },
];

const STAGE_ORDER: Record<ResourceStage, number> = { validate: 0, launch: 1, grow: 2 };

function appliesToBusiness(r: Resource, b: Business): boolean {
  const a = r.appliesTo;
  if (!a) return true;
  return Boolean(a.modes?.includes(b.mode) || a.categories?.includes(b.category) || a.businesses?.includes(b.id));
}

/** The starter kit for a business: at most one resource per need, in journey order. */
export function starterKit(business: Business, catalog: Resource[] = RESOURCES): Resource[] {
  const best = new Map<string, Resource>();
  for (const r of catalog) {
    if (r.need === "learning" || !appliesToBusiness(r, business)) continue;
    const current = best.get(r.need);
    if (!current || r.priority < current.priority) best.set(r.need, r);
  }
  return [...best.values()].sort((a, b) => STAGE_ORDER[a.stage] - STAGE_ORDER[b.stage] || a.priority - b.priority);
}

/** One learning resource per skill id, in the order given. */
export function coursesForSkills(skillIds: string[], catalog: Resource[] = RESOURCES): Resource[] {
  return skillIds.flatMap((id) => {
    const course = catalog.find((r) => r.need === "learning" && r.appliesTo?.skills?.includes(id));
    return course ? [course] : [];
  });
}

export function resourceById(id: string, catalog: Resource[] = RESOURCES): Resource | undefined {
  return catalog.find((r) => r.id === id);
}
