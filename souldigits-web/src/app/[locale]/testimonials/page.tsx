import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Testimonials" });
  const metaTitle = t("metaTitle");
  const metaDescription = t("metaDescription");

  return {
    ...buildPageMetadata({
      locale,
      path: "/testimonials",
      title: metaTitle,
      description: metaDescription,
    }),
    title: { absolute: metaTitle },
  };
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return null;
}
