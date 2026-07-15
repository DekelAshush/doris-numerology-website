import { absoluteUrl } from "@/lib/site";

type Props = {
  locale: string;
  description: string;
};

export default function JsonLd({ locale, description }: Props) {
  const isHe = locale === "he";
  const siteUrl = absoluteUrl(locale, "");
  const personName = isHe ? "דוריס צדוק" : "Doris Tzadok";
  const serviceName = isHe
    ? "דוריס צדוק – נומרולוגיה"
    : "Doris Tzadok Numerology";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: personName,
        alternateName: isHe ? "Doris Tzadok" : "דוריס צדוק",
        jobTitle: isHe ? "נומרולוגית מקצועית" : "Professional Numerologist",
        url: siteUrl,
        knowsAbout: isHe
          ? ["נומרולוגיה", "ייעוץ אישי", "הדרכה רוחנית"]
          : ["Numerology", "Personal guidance", "Spiritual coaching"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: serviceName,
        url: siteUrl,
        description,
        inLanguage: isHe ? "he-IL" : "en-US",
        publisher: { "@id": `${siteUrl}#person` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#service`,
        name: serviceName,
        description,
        url: siteUrl,
        provider: { "@id": `${siteUrl}#person` },
        areaServed: {
          "@type": "Country",
          name: "Israel",
        },
        inLanguage: isHe ? "he-IL" : "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
