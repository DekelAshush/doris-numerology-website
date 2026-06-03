"use client";

import { useTranslations } from "next-intl";

function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="mx-auto min-h-[40vh] max-w-3xl px-4 py-8 text-center text-white">
      <h1 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mb-2 text-lg leading-relaxed text-white/85">{t("body")}</p>
      <p className="text-base text-gold/90">{t("trustLine")}</p>
    </div>
  );
}

export default Contact;
