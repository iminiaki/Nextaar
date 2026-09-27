import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"

const SITE_URL = "https://lastaar.com"

/** Sync copy for early <head> metadata (avoids streaming description after body). */
const SITE_SEO: Record<
  Locale,
  { brand: string; description: string; ogLocale: string }
> = {
  en: {
    brand: "Lastaar",
    description:
      "Lastaar combines branding, UX, and modern engineering to launch high-performing websites and web apps for ambitious brands.",
    ogLocale: "en_US",
  },
  fa: {
    brand: "لستار",
    description:
      "لستار با ترکیب برندینگ، تجربه کاربری و مهندسی مدرن، وب‌سایت‌ و وب‌اپ‌های سریع و نتیجه‌محور برای برندهای بلندپرواز می‌سازد.",
    ogLocale: "fa_IR",
  },
  ar: {
    brand: "لستار",
    description:
      "تجمع لستار بين الهوية البصرية وتجربة المستخدم والهندسة الحديثة لإطلاق مواقع وتطبيقات ويب عالية الأداء للعلامات الطموحة.",
    ogLocale: "ar_SA",
  },
}

/** Keyword-first homepage titles. Brand stays at the end, under a typical SERP width. */
const HOME_TITLES: Record<Locale, string> = {
  en: "Web Design, Development, SEO & Ads | Lastaar",
  fa: "طراحی سایت، توسعه وب، سئو و تبلیغات | لستار",
  ar: "تصميم مواقع، تطوير ويب، SEO وإعلانات | لستار",
}

/** Page topic only. `formatSeoTitle` adds the brand once. */
const PAGE_TOPICS: Record<string, Record<Locale, string>> = {
  about: {
    en: "About Us",
    fa: "درباره ما",
    ar: "من نحن",
  },
  services: {
    en: "Web Design & Development Services",
    fa: "خدمات طراحی سایت و توسعه وب",
    ar: "خدمات تصميم وتطوير المواقع",
  },
  "web-development": {
    en: "Web Development Services",
    fa: "خدمات توسعه وب‌سایت و وب‌اپ",
    ar: "خدمات تطوير الويب",
  },
  design: {
    en: "UI/UX and Brand Design",
    fa: "طراحی UI/UX و هویت بصری",
    ar: "تصميم UI/UX والهوية البصرية",
  },
  "seo-aeo-geo": {
    en: "SEO, AEO and GEO Services",
    fa: "خدمات سئو، AEO و GEO",
    ar: "خدمات SEO و AEO و GEO",
  },
  "ad-campaigns": {
    en: "Google and Meta Ad Campaigns",
    fa: "کمپین تبلیغاتی گوگل و متا",
    ar: "حملات إعلانية في جوجل وميتا",
  },
  portfolio: {
    en: "Web Design Portfolio",
    fa: "نمونه کارهای طراحی سایت",
    ar: "أعمال تصميم المواقع",
  },
  blog: {
    en: "Web Design and SEO Blog",
    fa: "بلاگ طراحی سایت و سئو",
    ar: "مدونة تصميم المواقع",
  },
  contact: {
    en: "Contact Us",
    fa: "تماس با ما",
    ar: "اتصل بنا",
  },
  terms: {
    en: "Terms and Conditions",
    fa: "شرایط و قوانین",
    ar: "الشروط والأحكام",
  },
  dataProtection: {
    en: "Data Protection Policy",
    fa: "سیاست حفاظت از داده‌ها",
    ar: "سياسة حماية البيانات",
  },
  notFound: {
    en: "Page Not Found",
    fa: "صفحه پیدا نشد",
    ar: "الصفحة غير موجودة",
  },
}

function clipTitle(text: string, max: number) {
  if (text.length <= max) return text
  const sliced = text.slice(0, Math.max(0, max - 1))
  const lastSpace = sliced.lastIndexOf(" ")
  const base = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced
  return `${base.trimEnd()}…`
}

/** `Topic | Brand`, unique, with the keyword first and the brand once at the end. */
export function formatSeoTitle(label: string, locale: Locale) {
  const site = SITE_SEO[locale] ?? SITE_SEO.en
  const suffix = ` | ${site.brand}`
  const name = label
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s*\|\s*(Lastaar|لستار)\s*$/i, "")
    .trim()
  const max = locale === "en" ? 60 : 50
  return `${clipTitle(name, max - suffix.length)}${suffix}`
}

export function getPageTopic(page: keyof typeof PAGE_TOPICS, locale: Locale) {
  return PAGE_TOPICS[page][locale]
}

type PageMetadataInput = {
  locale: Locale
  title: string
  description: string
  path?: string
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

function absoluteUrl(path = "") {
  if (!path) return SITE_URL
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

/** Site-wide defaults — sync so meta description is in the initial HTML head. */
export function getSiteMetadata(locale: Locale = "en"): Metadata {
  const site = SITE_SEO[locale] ?? SITE_SEO.en
  const title = HOME_TITLES[locale] ?? HOME_TITLES.en
  const imageUrl = absoluteUrl("/Nextaar.png")

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${site.brand}`,
    },
    description: site.description,
    applicationName: site.brand,
    authors: [{ name: site.brand, url: SITE_URL }],
    creator: site.brand,
    publisher: site.brand,
    keywords: [
      "web design",
      "web development",
      "UX",
      "branding",
      "Lastaar",
      "digital agency",
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: site.ogLocale,
      url: SITE_URL,
      siteName: site.brand,
      title,
      description: site.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: site.brand,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      images: [imageUrl],
    },
  }
}

/** Build metadata for a specific page, extending site defaults. */
export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetadataInput): Metadata {
  const site = getSiteMetadata(locale)
  const seo = SITE_SEO[locale] ?? SITE_SEO.en
  const titleText = formatSeoTitle(title, locale)
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image || "/Nextaar.png")

  return {
    ...site,
    title: { absolute: titleText },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(path.replace(/^\/(en|fa|ar)/, "/en") || "/en"),
        fa: absoluteUrl(path.replace(/^\/(en|fa|ar)/, "/fa") || "/fa"),
        ar: absoluteUrl(path.replace(/^\/(en|fa|ar)/, "/ar") || "/ar"),
      },
    },
    openGraph: {
      ...site.openGraph,
      type,
      url,
      title: titleText,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [seo.brand],
        tags,
      }),
    },
    twitter: {
      ...site.twitter,
      title: titleText,
      description,
      images: [imageUrl],
    },
  }
}
