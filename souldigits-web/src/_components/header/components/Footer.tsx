"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative z-[1] border-t border-gold/20 px-4 py-6 text-center text-sm text-white/70">
      <Link
        href="/privacy"
        className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
      >
        {t("privacyLink")}
      </Link>
      <span className="mx-2 text-white/40">·</span>
      <Link
        href="/terms"
        className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
      >
        {t("termsLink")}
      </Link>
    </footer>
  );
}

export default Footer;
