// Print each persona's top matches for eyeballing during tuning:  npm run personas
import { assignArchetype } from "../src/archetype";
import { matchBusinesses } from "../src/match";
import { PERSONAS } from "../tests/personas";

for (const persona of PERSONAS) {
  const { top, alsoConsider } = matchBusinesses(persona.profile);
  const { primary, secondary, ranked } = assignArchetype(persona.profile);
  console.log(`\n=== ${persona.name} ===`);
  console.log(`  ${primary.emoji} ${primary.name} (${ranked[0]!.fit}) with a dash of ${secondary.emoji} ${secondary.name} (${ranked[1]!.fit})`);
  for (const m of top) {
    console.log(`  ${String(m.fit).padStart(3)}  ${m.business.name}  [${m.business.category}]`);
    for (const r of m.reasons) console.log(`         + ${r}`);
    for (const w of m.watchOuts) console.log(`         ! ${w}`);
  }
  console.log(`  also: ${alsoConsider.slice(0, 5).map((m) => `${m.business.name} (${m.fit})`).join(", ")}`);
}
