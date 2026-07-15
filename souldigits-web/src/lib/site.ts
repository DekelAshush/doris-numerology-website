/** Public site paths included in sitemap and SEO. */
export const publicPaths = [
  "",
  "/about",
  "/services",
  "/testimonials",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export function localePath(locale: string, path: string): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string): string {
  return `${getSiteUrl()}${localePath(locale, path)}`;
}
