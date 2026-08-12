import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"

const SITE_URL = "https://lastaar.com"

/** Sync copy for early <head> metadata (avoids streaming description after body). */
const SITE_SEO: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: "Lastaar",
    description:
      "Lastaar combines branding, UX, and modern engineering to launch high-performing websites and web apps for ambitious brands.",
    ogLocale: "en_US",
  },
  fa: {
    title: "لستار",
    description:
      "لستار با ترکیب برندینگ، تجربه کاربری و مهندسی مدرن، وب‌سایت‌ و وب‌اپ‌های سریع و نتیجه‌محور برای برندهای بلندپرواز می‌سازد.",
    ogLocale: "fa_IR",
  },
  ar: {
    title: "لستار",
    description:
      "تجمع لستار بين الهوية البصرية وتجربة المستخدم والهندسة الحديثة لإطلاق مواقع وتطبيقات ويب عالية الأداء للعلامات الطموحة.",
    ogLocale: "ar_SA",
  },
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
  const imageUrl = absoluteUrl("/nextaar.png")

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    applicationName: site.title,
    authors: [{ name: site.title, url: SITE_URL }],
    creator: site.title,
    publisher: site.title,
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
      siteName: site.title,
      title: site.title,
      description: site.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
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
  const siteName =
    typeof site.title === "object" && site.title && "default" in site.title
      ? String(site.title.default)
      : String(site.title ?? "Lastaar")
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image || "/nextaar.png")

  return {
    ...site,
    title,
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
      title,
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
        authors: authors || [siteName],
        tags,
      }),
    },
    twitter: {
      ...site.twitter,
      title,
      description,
      images: [imageUrl],
    },
  }
}
