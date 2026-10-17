"use client";

import { useEffect } from "react";
import { AD_SLOTS, ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** One manually placed AdSense unit. Renders nothing until its slot id is configured. */
export function AdSlot({ placement, className = "" }: { placement: keyof typeof AD_SLOTS; className?: string }) {
  const slot = AD_SLOTS[placement];

  useEffect(() => {
    if (!slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // Already filled (e.g. effects run twice in dev) or blocked by an ad blocker.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside aria-label="Advertisement" className={`border-y border-line py-4 ${className}`}>
      <p className="mb-2 text-xs uppercase tracking-wide text-muted">Advertisement</p>
      {/* Reserve space so the page doesn't jump when the ad loads. */}
      <ins
        className="adsbygoogle block min-h-[250px]"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
