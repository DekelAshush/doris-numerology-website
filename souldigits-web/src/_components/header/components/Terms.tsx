"use client";

import { useTranslations } from "next-intl";

function Terms() {
  const t = useTranslations("Terms");
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <div className="min-h-screen py-8 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-sm text-white/70">{t("lastUpdated")}</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
          {t("intro")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-8 px-4">
        {sections.map((section) => (
          <section key={section.title} className="glass-card p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white/95">
              {section.title}
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-white/85">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Terms;
