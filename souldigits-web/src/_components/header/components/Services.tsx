"use client";

import { useTranslations } from "next-intl";

function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen py-8 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
          {t("title")}
        </h1>
        <h2 className="mb-8 text-xl italic text-white/90 md:text-2xl">
          {t("subtitle")}
        </h2>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="glass-card mb-12 p-8">
          <p className="text-center text-lg leading-relaxed text-white/85">
            {t("description")}
          </p>
        </div>

        <div className="glass-card p-8">
          <h3 className="mb-8 text-center text-2xl font-semibold text-white/95">
            {t("servicesTitle")}
          </h3>

          <div className="grid gap-8 md:grid-cols-2">
            {items.map((service, index) => (
              <div key={index}>
                <h4 className="mb-2 text-xl font-semibold text-white/95">
                  {service.title}
                </h4>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
