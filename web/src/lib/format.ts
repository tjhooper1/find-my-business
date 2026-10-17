import type { BusinessMode } from "find-my-business-engine";

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
