import type { MetadataRoute } from "next";
import { ARCHETYPES, BUSINESSES } from "find-my-business-engine";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/quiz", "/types", "/businesses", "/privacy", "/terms", "/disclosure"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...ARCHETYPES.map((a) => ({ url: `${SITE_URL}/types/${a.id}` })),
    ...BUSINESSES.map((b) => ({ url: `${SITE_URL}/businesses/${b.id}` })),
  ];
}
