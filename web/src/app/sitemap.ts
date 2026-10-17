import type { MetadataRoute } from "next";
import { BUSINESSES } from "find-my-business-engine";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/quiz", "/businesses", "/privacy", "/terms", "/disclosure"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...BUSINESSES.map((b) => ({ url: `${SITE_URL}/businesses/${b.id}` })),
  ];
}
