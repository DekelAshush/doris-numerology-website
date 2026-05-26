"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

function About() {
  const t = useTranslations("About");
  const router = useRouter();

  return (
    <div className="min-h-screen py-8 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="gradient-text-about mb-4 text-4xl font-bold md:text-5xl">
          {t("title")}
        </h1>
        <h2 className="mb-6 text-xl italic text-white/90 md:text-2xl">
          {t("subtitle")}
        </h2>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/85">
          {t("introduction")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-8 px-4">
        <section className="glass-card p-8">
          <h3 className="mb-4 text-2xl font-semibold text-white/95">
            {t("storyTitle")}
          </h3>
          <p className="whitespace-pre-line leading-relaxed text-white/85">
            {t("storyContent")}
          </p>
        </section>

        <section className="glass-card p-8">
          <h3 className="mb-4 text-2xl font-semibold text-white/95">
            {t("approachTitle")}
          </h3>
          <p className="leading-relaxed text-white/85">{t("approachContent")}</p>
        </section>

        <section className="glass-card p-8">
          <h3 className="mb-4 text-2xl font-semibold text-white/95">
            {t("credentialsTitle")}
          </h3>
          <p className="whitespace-pre-line leading-relaxed text-white/85">
            {t("credentialsContent")}
          </p>
        </section>
      </div>

      <div className="mx-auto mt-12 max-w-2xl px-4 text-center">
        <h3 className="mb-4 text-2xl font-semibold text-white/95">
          {t("ctaTitle")}
        </h3>
        <p className="mb-6 text-white/85">{t("ctaBody")}</p>
        <button
          type="button"
          className="btn-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(102,126,234,0.4)]"
          onClick={() => router.push("/contact")}
        >
          {t("ctaButton")}
        </button>
      </div>
    </div>
  );
}

export default About;
