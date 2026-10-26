import type { MetadataRoute } from "next";
import { ARCHETYPES, BUSINESSES, GUIDES } from "find-my-business-engine";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/quiz", "/types", "/businesses", "/about", "/privacy", "/terms", "/disclosure"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...ARCHETYPES.map((a) => ({ url: `${SITE_URL}/types/${a.id}` })),
    // Business pages without a write-up are noindex, so they're left out here too.
    ...BUSINESSES.filter((b) => GUIDES[b.id]).map((b) => ({ url: `${SITE_URL}/businesses/${b.id}` })),
  ];
}
