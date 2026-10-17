export const SITE_NAME = "Sidequest Biz";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sidequestbiz.com";

// Forwarded to the owner's inbox via ImprovMX (MX records in Vercel DNS).
export const CONTACT_EMAIL = "support@sidequestbiz.com";
export const GOVERNING_STATE = "North Carolina";

export const LEGAL_UPDATED = "October 17, 2026";

// AdSense. Publisher and slot ids are public (they ship in every page). A
// placement renders nothing until it has a slot id from AdSense → Ads → By ad unit.
export const ADSENSE_CLIENT = "ca-pub-9843431103518753";
export const AD_SLOTS: Record<"business" | "results", string | undefined> = {
  business: "1803437109",
  results: undefined,
};
