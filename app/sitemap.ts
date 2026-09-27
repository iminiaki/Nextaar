import type { MetadataRoute } from "next"
import type { Locale } from "@/lib/i18n"
import { findPosts, findPortfolio } from "@/lib/payload-queries"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lastaar.com"
const locales: Locale[] = ["en", "fa", "ar"]

const staticPaths: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/web-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/seo-aeo-geo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/ad-campaigns", changeFrequency: "monthly", priority: 0.8 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/data-protection", changeFrequency: "yearly", priority: 0.3 },
]

function localeEntry(
  path: string,
  options: {
    lastModified?: Date
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }
): MetadataRoute.Sitemap[number][] {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
      ),
    },
  }))
}

async function dynamicEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, portfolio] = await Promise.all([
      findPosts({ locale: "en", limit: 500, page: 1, depth: 0 }),
      findPortfolio({ locale: "en", limit: 500, page: 1, depth: 0 }),
    ])

    const postEntries = (posts.docs ?? []).flatMap((post: any) => {
      if (typeof post.slug !== "string" || !post.slug) return []
      const lastModified = post.updatedAt ? new Date(post.updatedAt) : new Date()
      return localeEntry(`/blog/${post.slug}`, {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    })

    const portfolioEntries = (portfolio.docs ?? []).flatMap((item: any) => {
      if (typeof item.slug !== "string" || !item.slug) return []
      const lastModified = item.updatedAt ? new Date(item.updatedAt) : new Date()
      return localeEntry(`/portfolio/${item.slug}`, {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      })
    })

    return [...postEntries, ...portfolioEntries]
  } catch {
    // Build / offline environments may not reach Postgres.
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticPaths.flatMap(({ path, changeFrequency, priority }) =>
    localeEntry(path, { changeFrequency, priority })
  )

  const dynamic = await dynamicEntries()
  return [...staticEntries, ...dynamic]
}
