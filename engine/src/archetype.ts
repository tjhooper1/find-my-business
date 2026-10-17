import { ARCHETYPES } from "./data/archetypes";
import { traitFit } from "./match";
import type { Archetype, ArchetypeResult, Profile } from "./types";

/** Best-fitting founder type plus the runner-up for "with a dash of…". */
export function assignArchetype(profile: Profile, archetypes: Archetype[] = ARCHETYPES): ArchetypeResult {
  const ranked = archetypes
    .map((archetype) => ({ archetype, fit: traitFit(profile, archetype.traits).fit }))
    .sort((a, b) => b.fit - a.fit);
  return { primary: ranked[0]!.archetype, secondary: ranked[1]!.archetype, ranked };
}
