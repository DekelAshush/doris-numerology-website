export const allLocales = ["he", "en"] as const;
export type AppLocale = (typeof allLocales)[number];

/** English is available locally; hidden from production until ready. */
export function isEnglishEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function getActiveLocales(): AppLocale[] {
  return isEnglishEnabled() ? [...allLocales] : ["he"];
}
