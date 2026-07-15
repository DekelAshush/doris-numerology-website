import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Inter, Heebo } from "next/font/google";
import Header from "@/_components/header/Header";
import JsonLd from "@/_components/seo/JsonLd";
import { getActiveLocales } from "@/i18n/locales";
import { getSiteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import "@/_styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return getActiveLocales().map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#4a3f7a",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(getSiteUrl()),
    ...buildPageMetadata({
      locale,
      title: t("title"),
      description: t("description"),
    }),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(getActiveLocales(), locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`${inter.variable} ${heebo.variable} h-full min-h-full antialiased`}
    >
      <body className="flex min-h-full min-h-[100dvh] flex-col">
        <JsonLd locale={locale} description={t("description")} />
        <NextIntlClientProvider messages={messages}>
          <Header />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
