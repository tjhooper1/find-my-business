// Print each persona's top matches for eyeballing during tuning:  npm run personas
import { matchBusinesses } from "../src/match";
import { PERSONAS } from "../tests/personas";

for (const persona of PERSONAS) {
  const { top, alsoConsider } = matchBusinesses(persona.profile);
  console.log(`\n=== ${persona.name} ===`);
  for (const m of top) {
    console.log(`  ${String(m.fit).padStart(3)}  ${m.business.name}  [${m.business.category}]`);
    for (const r of m.reasons) console.log(`         + ${r}`);
    for (const w of m.watchOuts) console.log(`         ! ${w}`);
  }
  console.log(`  also: ${alsoConsider.slice(0, 5).map((m) => `${m.business.name} (${m.fit})`).join(", ")}`);
}
