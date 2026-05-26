"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const features = [
  { badge: "1", titleKey: "feature1Title" as const, bodyKey: "feature1Body" as const },
  { badge: "7", titleKey: "feature2Title" as const, bodyKey: "feature2Body" as const },
  { badge: "9", titleKey: "feature3Title" as const, bodyKey: "feature3Body" as const },
];

function Home() {
  const t = useTranslations("Home");
  const router = useRouter();

  return (
    <div className="min-h-screen py-8">
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-[90rem] items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="z-[2] text-center text-white md:text-start">
            <h1 className="gradient-text mb-4 text-3xl font-bold leading-tight md:text-5xl">
              {t("title")}
            </h1>
            <h2 className="mb-6 text-lg italic text-white/90 md:text-2xl">
              {t("subtitle")}
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <button
                type="button"
                className="btn-primary transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_35px_rgba(212,168,83,0.35)]"
                onClick={() => router.push("/services")}
              >
                {t("services")}
              </button>
              <button
                type="button"
                className="btn-secondary transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/15"
                onClick={() => router.push("/about")}
              >
                {t("about")}
              </button>
            </div>
            <p className="mt-6 text-sm text-gold/90 md:text-base">{t("trustLine")}</p>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[720px]">
              <div className="relative aspect-[5/3.5] w-full overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[2.5rem]">
                <Image
                  src="/Doris.JPG"
                  alt={t("dorisAlt")}
                  fill
                  unoptimized
                  className="z-[2] origin-top scale-[1.03] object-cover object-top"
                  sizes="(max-width: 640px) 420px, (max-width: 768px) 520px, (max-width: 1024px) 620px, 720px"
                  priority
                />
              </div>
              <div
                className="absolute -inset-4 -z-10 rounded-[2.25rem] blur-xl md:rounded-[2.75rem]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212, 168, 83, 0.25) 0%, rgba(118, 75, 162, 0.3) 100%)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        {features.map(({ badge, titleKey, bodyKey }) => (
          <div
            key={titleKey}
            className="glass-card p-8 text-center text-white transition-all duration-300 hover:-translate-y-2 hover:border-gold/35 hover:bg-white/12 hover:shadow-xl"
          >
            <span className="number-badge">{badge}</span>
            <h3 className="mb-4 text-xl font-semibold text-white/95">
              {t(titleKey)}
            </h3>
            <p className="text-white/80">{t(bodyKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
