import { SKILLS, type BusinessMode } from "find-my-business-engine";

const SKILL_NAME = Object.fromEntries(SKILLS.map((s) => [s.id, s.name]));

export function skillName(id: string): string {
  return SKILL_NAME[id] ?? id;
}

export const MODE_LABEL: Record<BusinessMode, string> = {
  online: "Online",
  local: "Local",
  hybrid: "Online + local",
};

function formatUsd(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000).toLocaleString("en-US")}k`;
  return `$${n}`;
}

export function formatCostRange([min, max]: [number, number]): string {
  return min === 0 ? `under ${formatUsd(max)}` : `${formatUsd(min)}–${formatUsd(max)}`;
}
