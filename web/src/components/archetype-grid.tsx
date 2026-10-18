import Link from "next/link";
import { ARCHETYPES } from "find-my-business-engine";

export function ArchetypeGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {ARCHETYPES.map((a) => (
        <li key={a.id}>
          <Link
            href={`/types/${a.id}`}
            className="block h-full rounded-xl border border-line bg-surface p-4 hover:border-brand"
          >
            <div className="text-2xl" aria-hidden>
              {a.emoji}
            </div>
            <div className="mt-2 font-semibold">{a.name}</div>
            <div className="mt-1 text-sm text-muted">{a.tagline}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
