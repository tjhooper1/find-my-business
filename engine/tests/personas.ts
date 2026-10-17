import { DIMENSION_IDS, type DimensionId, type Profile } from "../src/types";

// Hand-written archetypes used as a regression suite: if tuning the catalog or
// engine pushes an obvious match out of a persona's top 10, a test fails.

export interface Persona {
  name: string;
  profile: Profile;
  /** At least one of these should land in the top 10. */
  expectSome: string[];
  /** None of these should land in the top 10. */
  expectNone: string[];
}

function p(partial: Partial<Record<DimensionId, number>>): Profile {
  return Object.fromEntries(DIMENSION_IDS.map((d) => [d, partial[d] ?? 0.5])) as Profile;
}

export const PERSONAS: Persona[] = [
  {
    name: "Introverted analyst",
    profile: p({ extra: 0.15, analyt: 0.9, consc: 0.75, hands: 0.1, creat: 0.4, sales: 0.3, visib: 0.15, help: 0.35, risk: 0.35 }),
    expectSome: ["data-consultant", "freelance-developer", "bookkeeper", "technical-writer", "cybersecurity-consultant"],
    expectNone: ["real-estate-agent", "dj", "tour-guide"],
  },
  {
    name: "Outgoing seller",
    profile: p({ extra: 0.9, sales: 0.9, risk: 0.75, persist: 0.8, visib: 0.75, stab: 0.75, auton: 0.8, analyt: 0.4, hands: 0.3 }),
    expectSome: ["real-estate-agent", "recruiter", "marketing-agency"],
    expectNone: ["bookkeeper", "translator", "ghostwriter"],
  },
  {
    name: "Hands-on fixer",
    profile: p({ hands: 0.95, analyt: 0.7, extra: 0.4, auton: 0.8, creat: 0.4, struct: 0.5, visib: 0.2, sales: 0.4 }),
    expectSome: ["handyman", "mobile-mechanic", "appliance-repair", "licensed-trade", "bike-repair"],
    expectNone: ["life-coach", "newsletter", "youtuber"],
  },
  {
    name: "Creative performer",
    profile: p({ visib: 0.9, creat: 0.9, open: 0.85, extra: 0.75, persist: 0.8, risk: 0.65, struct: 0.3 }),
    expectSome: ["youtuber", "ugc-creator", "podcast-host", "dj"],
    expectNone: ["bookkeeper", "lawn-care", "vending"],
  },
  {
    name: "Nurturer",
    profile: p({ help: 0.95, agree: 0.85, stab: 0.75, struct: 0.7, consc: 0.75, risk: 0.2, scale: 0.2, sales: 0.3 }),
    expectSome: ["home-daycare", "senior-companion", "pet-sitter", "online-tutor"],
    expectNone: ["marketing-agency", "amazon-fba", "dtc-brand"],
  },
  {
    name: "Quiet maker",
    profile: p({ creat: 0.85, hands: 0.85, extra: 0.25, consc: 0.7, scale: 0.3, visib: 0.2 }),
    expectSome: ["etsy-handmade", "woodworker", "candle-soap-maker", "furniture-flipping", "tailoring"],
    expectNone: ["real-estate-agent", "recruiter"],
  },
  {
    name: "Ambitious online builder",
    profile: p({ scale: 0.9, risk: 0.85, analyt: 0.8, persist: 0.85, auton: 0.9, extra: 0.3, hands: 0.1 }),
    expectSome: ["micro-saas", "amazon-fba", "dtc-brand"],
    expectNone: ["pet-sitter", "house-cleaning"],
  },
  {
    name: "Routine-loving organizer",
    profile: p({ struct: 0.9, consc: 0.9, analyt: 0.65, risk: 0.2, extra: 0.3, creat: 0.25, scale: 0.3 }),
    expectSome: ["bookkeeper", "virtual-assistant", "mobile-notary", "tax-preparer"],
    expectNone: ["youtuber", "food-truck", "escape-room"],
  },
];
