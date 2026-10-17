"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BUSINESSES, type Business, type BusinessMode } from "find-my-business-engine";
import { formatCostRange, MODE_LABEL } from "@/lib/format";

const CATEGORIES = [...new Set(BUSINESSES.map((b) => b.category))].sort();

const WHERE_OPTIONS: { value: BusinessMode; label: string }[] = [
  { value: "online", label: "Online / remote" },
  { value: "local", label: "Local" },
  { value: "hybrid", label: "Online + local" },
];

// "Can get started for" thresholds, compared to the low end of startupCost.
const BUDGET_OPTIONS = [
  { value: Infinity, label: "Any budget" },
  { value: 500, label: "Under $500" },
  { value: 2000, label: "Under $2k" },
  { value: 10000, label: "Under $10k" },
  { value: 50000, label: "Under $50k" },
];

const REVENUE_OPTIONS = [
  { value: Infinity, label: "Any timeline" },
  { value: 1, label: "Within a month" },
  { value: 3, label: "Within 3 months" },
  { value: 6, label: "Within 6 months" },
  { value: 12, label: "Within a year" },
];

/** Max minimum-hours for a business to count as part-time friendly. */
const PART_TIME_HOURS = 10;

interface Filters {
  query: string;
  where: BusinessMode[];
  categories: string[];
  budget: number;
  revenueWithin: number;
  partTime: boolean;
  noInPerson: boolean;
  notPhysical: boolean;
}

const NO_FILTERS: Filters = {
  query: "",
  where: [],
  categories: [],
  budget: Infinity,
  revenueWithin: Infinity,
  partTime: false,
  noInPerson: false,
  notPhysical: false,
};

function matches(b: Business, f: Filters): boolean {
  const q = f.query.trim().toLowerCase();
  if (q && !`${b.name} ${b.summary} ${b.category}`.toLowerCase().includes(q)) return false;
  if (f.where.length > 0 && !f.where.includes(b.mode)) return false;
  if (f.categories.length > 0 && !f.categories.includes(b.category)) return false;
  if (b.startupCost[0] > f.budget) return false;
  if (b.monthsToRevenue > f.revenueWithin) return false;
  if (f.partTime && b.minHours > PART_TIME_HOURS) return false;
  if (f.noInPerson && b.inPerson) return false;
  if (f.notPhysical && b.physical) return false;
  return true;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function BusinessBrowser() {
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));

  const results = useMemo(() => BUSINESSES.filter((b) => matches(b, filters)), [filters]);
  const grouped = useMemo(() => {
    const map = new Map<string, Business[]>();
    for (const b of results) map.set(b.category, [...(map.get(b.category) ?? []), b]);
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [results]);

  const activeCount =
    (filters.query.trim() ? 1 : 0) +
    filters.where.length +
    filters.categories.length +
    (filters.budget !== Infinity ? 1 : 0) +
    (filters.revenueWithin !== Infinity ? 1 : 0) +
    [filters.partTime, filters.noInPerson, filters.notPhysical].filter(Boolean).length;

  return (
    <>
      <div className="mt-8 space-y-4 rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block sm:col-span-3">
            <span className="sr-only">Search</span>
            <input
              type="search"
              value={filters.query}
              onChange={(e) => set({ query: e.target.value })}
              placeholder="Search ideas, e.g. dogs, design, food…"
              className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 placeholder:text-muted focus:border-brand focus:outline-none"
            />
          </label>
          <SelectFilter
            label="Start-up cost"
            value={filters.budget}
            options={BUDGET_OPTIONS}
            onChange={(budget) => set({ budget })}
          />
          <SelectFilter
            label="First revenue"
            value={filters.revenueWithin}
            options={REVENUE_OPTIONS}
            onChange={(revenueWithin) => set({ revenueWithin })}
          />
          <fieldset>
            <legend className="mb-1 text-sm text-muted">Where</legend>
            <div className="flex flex-wrap gap-2">
              {WHERE_OPTIONS.map((o) => (
                <Chip
                  key={o.value}
                  label={o.label}
                  active={filters.where.includes(o.value)}
                  onClick={() => set({ where: toggle(filters.where, o.value) })}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend className="mb-1 text-sm text-muted">Category</legend>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                label={c}
                active={filters.categories.includes(c)}
                onClick={() => set({ categories: toggle(filters.categories, c) })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1 text-sm text-muted">Must be</legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              label={`Part-time friendly (≤${PART_TIME_HOURS} hrs/wk)`}
              active={filters.partTime}
              onClick={() => set({ partTime: !filters.partTime })}
            />
            <Chip
              label="No face-to-face customers"
              active={filters.noInPerson}
              onClick={() => set({ noInPerson: !filters.noInPerson })}
            />
            <Chip
              label="Not physically demanding"
              active={filters.notPhysical}
              onClick={() => set({ notPhysical: !filters.notPhysical })}
            />
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm text-muted">
          Showing <strong className="text-ink">{results.length}</strong> of {BUSINESSES.length} ideas
        </p>
        {activeCount > 0 && (
          <button type="button" onClick={() => setFilters(NO_FILTERS)} className="text-sm font-medium underline">
            Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="font-medium">Nothing matches all of those.</p>
          <p className="mt-1 text-sm text-muted">Try loosening a filter or two.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {grouped.map(([category, list]) => (
            <section key={category}>
              <h2 className="text-xl font-bold">{category}</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/businesses/${b.id}`}
                      className="block h-full rounded-xl border border-line bg-surface px-4 py-3 hover:border-brand"
                    >
                      <span className="font-medium">{b.name}</span>
                      <span className="mt-1 block text-sm text-muted">
                        {MODE_LABEL[b.mode]} · {formatCostRange(b.startupCost)} · ~{b.monthsToRevenue} mo to revenue
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm ${
        active ? "border-brand bg-brand-soft font-medium" : "border-line hover:border-brand"
      }`}
    >
      {label}
    </button>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-line bg-bg px-3 py-2.5 focus:border-brand focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.label} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
