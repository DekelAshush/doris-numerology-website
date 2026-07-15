import type { MetadataRoute } from "next";
import { getActiveLocales } from "@/i18n/locales";
import { absoluteUrl, publicPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of getActiveLocales()) {
    for (const path of publicPaths) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
