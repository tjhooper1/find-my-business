export const SITE_NAME = "Sidequest Biz";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sidequestbiz.com";

// Forwarded to the owner's inbox via ImprovMX (MX records in Vercel DNS).
export const CONTACT_EMAIL = "support@sidequestbiz.com";
export const GOVERNING_STATE = "North Carolina";

export const LEGAL_UPDATED = "October 17, 2026";

// AdSense. The publisher id is public (it's in ads.txt). Each placement stays
// empty until its ad unit's slot id is set as an env var in Vercel.
export const ADSENSE_CLIENT = "ca-pub-9843431103518753";
export const AD_SLOTS = {
  business: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BUSINESS,
  results: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULTS,
};
