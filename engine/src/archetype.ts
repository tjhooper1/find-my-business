import { ARCHETYPES } from "./data/archetypes";
import { BUSINESSES } from "./data/businesses";
import { DIMENSION_BY_ID } from "./data/dimensions";
import { fitScore, matchBusinesses, traitFit } from "./match";
import { DIMENSION_IDS, type Archetype, type ArchetypeResult, type Business, type Match, type Profile } from "./types";

/** Best-fitting founder type plus the runner-up for "with a dash of…". */
export function assignArchetype(profile: Profile, archetypes: Archetype[] = ARCHETYPES): ArchetypeResult {
  const ranked = archetypes
    .map((archetype) => ({ archetype, fit: traitFit(profile, archetype.traits).fit }))
    .sort((a, b) => b.fit - a.fit);
  return { primary: ranked[0]!.archetype, secondary: ranked[1]!.archetype, ranked };
}

/** A typical member of the archetype: its targets, neutral (0.5) everywhere else. */
export function archetypeProfile(archetype: Archetype): Profile {
  return Object.fromEntries(DIMENSION_IDS.map((d) => [d, archetype.traits[d]?.[0] ?? 0.5])) as Profile;
}

export interface ToughFit {
  business: Business;
  fit: number;
  /** Why it clashes: what the business rewards vs. how this type usually leans. */
  clashes: { needs: string; lean: string }[];
}

export interface ArchetypeGuide {
  archetype: Archetype;
  /** "You …" lines from the archetype's strongest traits. */
  strengths: string[];
  bestFits: Match[];
  toughFits: ToughFit[];
  /** Other archetypes a typical member also resembles, closest first. */
  cousins: { archetype: Archetype; fit: number }[];
}

const CLASH_MIN_GAP = 0.25;

/** Everything an archetype page shows, derived from the same scoring as the quiz. */
export function archetypeGuide(
  archetype: Archetype,
  { catalog = BUSINESSES, archetypes = ARCHETYPES }: { catalog?: Business[]; archetypes?: Archetype[] } = {},
): ArchetypeGuide {
  const profile = archetypeProfile(archetype);

  const strengths = Object.entries(archetype.traits)
    .sort(([, [, wa]], [, [, wb]]) => wb - wa)
    .slice(0, 4)
    .map(([dim, [target]]) => {
      const d = DIMENSION_BY_ID[dim as keyof typeof archetype.traits];
      return `You ${target >= 0.5 ? d.high : d.low}.`;
    });

  // Only matches we can explain; a high score with no reason reads as random.
  const bestFits = matchBusinesses(profile, undefined, { catalog, topN: 12, alsoConsiderN: 0 })
    .top.filter((m) => m.reasons.length > 0)
    .slice(0, 6);

  // Lowest fits, at most one per category so the list isn't five versions of the same job.
  const toughFits: ToughFit[] = [];
  const seen = new Set<string>();
  const ascending = catalog.map((b) => ({ business: b, ...fitScore(profile, b) })).sort((a, b) => a.fit - b.fit);
  for (const { business, fit, gaps } of ascending) {
    if (toughFits.length >= 4) break;
    if (seen.has(business.category)) continue;
    const clashes = gaps
      .filter((g) => g.weight >= 1 && Math.abs(g.adjusted) >= CLASH_MIN_GAP && g.user !== 0.5)
      .filter((g) => g.user >= 0.5 !== g.target >= 0.5)
      .sort((a, b) => b.weight * b.adjusted ** 2 - a.weight * a.adjusted ** 2)
      .slice(0, 2)
      .map((g) => {
        const d = DIMENSION_BY_ID[g.dim];
        return { needs: g.target >= 0.5 ? d.high : d.low, lean: g.user >= 0.5 ? d.high : d.low };
      });
    if (clashes.length === 0) continue;
    seen.add(business.category);
    toughFits.push({ business, fit, clashes });
  }

  const cousins = archetypes
    .filter((a) => a.id !== archetype.id)
    .map((a) => ({ archetype: a, fit: traitFit(profile, a.traits).fit }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 3);

  return { archetype, strengths, bestFits, toughFits, cousins };
}
