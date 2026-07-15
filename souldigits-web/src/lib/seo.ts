import type { Metadata } from "next";
import { getActiveLocales } from "@/i18n/locales";
import { absoluteUrl } from "./site";

type PageMetadataInput = {
  locale: string;
  path?: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(locale, path);
  const languages: Record<string, string> = {};

  for (const loc of getActiveLocales()) {
    languages[loc] = absoluteUrl(loc, path);
  }

  const siteName =
    locale === "he" ? "דוריס צדוק – נומרולוגיה" : "Doris Tzadok Numerology";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
