import type { Locale } from "@/lib/i18n"

export const SITE_URL = "https://lastaar.com"
export const SITE_BRAND = "Lastaar"
/** Used for sitemap / JSON-LD freshness when a page has no CMS updatedAt. */
export const SITE_LAST_MODIFIED = "2026-10-05T12:00:00.000Z"

const ORG_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
} as const

export function buildOrganizationSchema(locale: Locale) {
  const names: Record<Locale, string> = {
    en: "Lastaar",
    fa: "لستار",
    ar: "لستار",
  }
  const descriptions: Record<Locale, string> = {
    en: "Lastaar combines branding, UX, and modern engineering to launch high-performing websites and web apps for ambitious brands.",
    fa: "لستار با ترکیب برندینگ، تجربه کاربری و مهندسی مدرن، وب‌سایت‌ و وب‌اپ‌های سریع و نتیجه‌محور برای برندهای بلندپرواز می‌سازد.",
    ar: "تجمع لستار بين الهوية البصرية وتجربة المستخدم والهندسة الحديثة لإطلاق مواقع وتطبيقات ويب عالية الأداء للعلامات الطموحة.",
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_IDS.organization,
    name: names[locale] ?? names.en,
    url: SITE_URL,
    logo: `${SITE_URL}/Nextaar.png`,
    image: `${SITE_URL}/Nextaar.png`,
    description: descriptions[locale] ?? descriptions.en,
    email: "info@lastaar.com",
    telephone: ["+98-21-22954114", "+98-919-9274196"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 50, Mousavi, Heravi",
      addressLocality: "Tehran",
      addressCountry: "IR",
    },
    sameAs: [
      "https://www.linkedin.com/company/lastaar",
      "https://www.instagram.com/lastaar",
    ],
    dateModified: SITE_LAST_MODIFIED,
  }
}

export function buildWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ORG_IDS.website,
    url: `${SITE_URL}/${locale}`,
    name: SITE_BRAND,
    inLanguage: locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-SA" : "en-US",
    publisher: { "@id": ORG_IDS.organization },
    dateModified: SITE_LAST_MODIFIED,
  }
}

export function buildWebPageSchema({
  locale,
  path,
  title,
  description,
  dateModified = SITE_LAST_MODIFIED,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  dateModified?: string
}) {
  const url = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-SA" : "en-US",
    isPartOf: { "@id": ORG_IDS.website },
    about: { "@id": ORG_IDS.organization },
    dateModified,
  }
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
