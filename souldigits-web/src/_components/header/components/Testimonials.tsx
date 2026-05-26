"use client";

import { useTranslations } from "next-intl";

function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <div className="mx-auto min-h-[60vh] max-w-3xl px-4 py-8 text-center text-white">
      <h1 className="gradient-text mb-6 text-4xl font-bold md:text-5xl">
        {t("title")}
      </h1>
      <p className="text-lg leading-relaxed text-white/85">{t("body")}</p>
    </div>
  );
}

export default Testimonials;
