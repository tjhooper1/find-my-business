import Link from "next/link";
import { coursesForSkills, type Match, type MatchMode } from "find-my-business-engine";
import { ResourceLink } from "@/components/resource-link";
import { formatCostRange, MODE_LABEL, skillName } from "@/lib/format";

export function MatchCard({ match, rank, mode }: { match: Match; rank: number; mode: MatchMode }) {
  const { business: b, fit, readiness, reasons, watchOuts, warnings, skillGaps } = match;

  return (
    <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            #{rank} · {b.category} · {MODE_LABEL[b.mode]}
          </p>
          <h3 className="mt-1 text-xl font-bold">{b.name}</h3>
          <p className="mt-1 text-muted">{b.summary}</p>
        </div>
        <div className="w-36 shrink-0">
          <Meter label="Fit" value={fit} />
          {readiness !== null && mode !== "fit" && <Meter label="Readiness" value={Math.round(readiness * 100)} accent />}
        </div>
      </div>

      {reasons.length > 0 && (
        <ul className="mt-4 space-y-1">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span aria-hidden className="font-bold text-accent-ink">✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}

      {(watchOuts.length > 0 || warnings.length > 0) && (
        <ul className="mt-3 space-y-1 text-sm">
          {[...watchOuts, ...warnings].map((w) => (
            <li key={w} className="flex gap-2 rounded-lg bg-warn-soft px-3 py-2 text-warn-ink">
              <span aria-hidden>!</span>
              <span>
                <span className="sr-only">Heads up: </span>
                {w}
              </span>
            </li>
          ))}
        </ul>
      )}

      {mode === "fit+learn" && skillGaps.length > 0 && (
        <div className="mt-3 text-sm">
          <span className="font-semibold">Skills to pick up:</span>{" "}
          {coursesForSkills(skillGaps).map((course, i) => (
            <span key={course.id}>
              {i > 0 && ", "}
              <ResourceLink resource={course} className="text-accent-ink underline hover:no-underline">
                {skillName(skillGaps[i]!)}
              </ResourceLink>
            </span>
          ))}
          <span className="text-muted"> (links to beginner courses)</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="text-muted">
          Start-up: {formatCostRange(b.startupCost)} · First revenue in ~{b.monthsToRevenue} mo
        </span>
        <Link href={`/businesses/${b.id}`} className="font-semibold text-brand-strong hover:underline">
          How to get started →
        </Link>
      </div>
    </article>
  );
}

function Meter({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div
        className={`mt-1 h-2 rounded-full ${accent ? "bg-accent-soft" : "bg-brand-soft"}`}
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${accent ? "bg-accent" : "bg-brand"}`}
          style={{ width: `${Math.max(value, 2)}%` }}
        />
      </div>
    </div>
  );
}
