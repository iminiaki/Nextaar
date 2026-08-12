import type { MetadataRoute } from "next"
import type { Locale } from "@/lib/i18n"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextaar.com"
const locales: Locale[] = ["en", "fa", "ar"]

const staticPaths = [
  "",
  "/about",
  "/services",
  "/services/web-development",
  "/services/design",
  "/services/seo-aeo-geo",
  "/services/ad-campaigns",
  "/portfolio",
  "/blog",
  "/contact",
  "/terms",
  "/data-protection",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  )
}
