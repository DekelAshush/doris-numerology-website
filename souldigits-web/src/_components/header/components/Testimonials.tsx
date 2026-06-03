"use client";

import { useTranslations } from "next-intl";
import WhatsAppTestimonialBubble from "./WhatsAppTestimonialBubble";

type TestimonialItem = {
  text: string;
};

function Testimonials() {
  const t = useTranslations("Testimonials");
  const items = t.raw("items") as TestimonialItem[];
  const sender = t("anonymousSender");

  return (
    <div className="mx-auto min-h-[60vh] max-w-4xl px-4 py-8 text-white">
      <h1 className="gradient-text mb-4 text-center text-4xl font-bold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mb-8 text-center text-lg leading-relaxed text-white/85">
        {t("body")}
      </p>

      <div
        className="overflow-hidden rounded-2xl border border-[#2a3942] bg-[#0b141a] shadow-xl"
        aria-label={t("chatAriaLabel")}
      >
        <div
          className="flex items-center gap-3 border-b border-[#2a3942] bg-[#1f2c34] px-4 py-3"
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-lg font-bold text-white"
            aria-hidden="true"
          >
            D
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#e9edef]">
              {t("chatTitle")}
            </p>
            <p className="text-xs text-[#8696a0]">{t("chatSubtitle")}</p>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 p-3 md:gap-4 md:p-4"
          style={{
            backgroundColor: "#0b141a",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {items.map((item, index) => (
            <WhatsAppTestimonialBubble
              key={index}
              text={item.text}
              sender={sender}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
