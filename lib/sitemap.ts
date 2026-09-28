import type { Locale } from "@/lib/i18n"
import { getPayloadClient } from "@/lib/payload-queries"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lastaar.com"
export const LOCALES: Locale[] = ["en", "fa", "ar"]

export type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
  alternates?: Record<string, string>
}

const staticPaths: {
  path: string
  changefreq: SitemapUrl["changefreq"]
  priority: number
}[] = [
  { path: "", changefreq: "weekly", priority: 1 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/services", changefreq: "weekly", priority: 0.9 },
  { path: "/services/web-development", changefreq: "monthly", priority: 0.8 },
  { path: "/services/design", changefreq: "monthly", priority: 0.8 },
  { path: "/services/seo-aeo-geo", changefreq: "monthly", priority: 0.8 },
  { path: "/services/ad-campaigns", changefreq: "monthly", priority: 0.8 },
  { path: "/portfolio", changefreq: "weekly", priority: 0.8 },
  { path: "/blog", changefreq: "daily", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
  { path: "/terms", changefreq: "yearly", priority: 0.3 },
  { path: "/data-protection", changefreq: "yearly", priority: 0.3 },
]

function asSlug(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim()
  if (value && typeof value === "object") {
    for (const locale of LOCALES) {
      const localized = (value as Record<string, unknown>)[locale]
      if (typeof localized === "string" && localized.trim()) return localized.trim()
    }
  }
  return null
}

function toIso(value?: string | Date | null) {
  if (!value) return new Date().toISOString()
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function localeUrls(
  path: string,
  options: {
    lastmod?: string | Date | null
    changefreq?: SitemapUrl["changefreq"]
    priority?: number
  } = {}
): SitemapUrl[] {
  const lastmod = toIso(options.lastmod)
  return LOCALES.map((locale) => ({
    loc: `${SITE_URL}/${locale}${path}`,
    lastmod,
    changefreq: options.changefreq,
    priority: options.priority,
    alternates: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
  }))
}

export function getPageSitemapUrls(): SitemapUrl[] {
  return staticPaths.flatMap(({ path, changefreq, priority }) =>
    localeUrls(path, { changefreq, priority })
  )
}

export async function getPostSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: "posts" as any,
      limit: 500,
      page: 1,
      depth: 0,
      locale: "en" as any,
      fallbackLocale: false as any,
      draft: false as any,
      where: { _status: { equals: "published" } } as any,
    })

    return (posts.docs ?? []).flatMap((post: any) => {
      const slug = asSlug(post.slug)
      if (!slug) return []
      return localeUrls(`/blog/${slug}`, {
        lastmod: post.updatedAt,
        changefreq: "weekly",
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error("[sitemap] posts unavailable:", error)
    return []
  }
}

export async function getPortfolioSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const payload = await getPayloadClient()
    const portfolio = await payload.find({
      collection: "portfolio" as any,
      limit: 500,
      page: 1,
      depth: 0,
      locale: "en" as any,
      fallbackLocale: false as any,
      draft: false as any,
      where: { _status: { equals: "published" } } as any,
    })

    return (portfolio.docs ?? []).flatMap((item: any) => {
      const slug = asSlug(item.slug)
      if (!slug) return []
      return localeUrls(`/portfolio/${slug}`, {
        lastmod: item.updatedAt,
        changefreq: "monthly",
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error("[sitemap] portfolio unavailable:", error)
    return []
  }
}

export async function getSitemapIndexEntries() {
  const [posts, portfolio] = await Promise.all([
    getPostSitemapUrls(),
    getPortfolioSitemapUrls(),
  ])

  const latest = (...dates: Array<string | undefined>) => {
    const valid = dates.filter(Boolean).map((d) => new Date(d as string).getTime())
    if (!valid.length) return new Date().toISOString()
    return new Date(Math.max(...valid)).toISOString()
  }

  return [
    {
      loc: `${SITE_URL}/page-sitemap.xml`,
      lastmod: latest(...getPageSitemapUrls().map((u) => u.lastmod)),
    },
    {
      loc: `${SITE_URL}/post-sitemap.xml`,
      lastmod: latest(...posts.map((u) => u.lastmod)),
    },
    {
      loc: `${SITE_URL}/portfolio-sitemap.xml`,
      lastmod: latest(...portfolio.map((u) => u.lastmod)),
    },
  ]
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function renderUrlSet(urls: SitemapUrl[]) {
  const body = urls
    .map((url) => {
      const alternates = url.alternates
        ? Object.entries(url.alternates)
            .map(
              ([lang, href]) =>
                `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`
            )
            .join("\n")
        : ""

      return [
        "  <url>",
        `    <loc>${escapeXml(url.loc)}</loc>`,
        alternates,
        url.lastmod ? `    <lastmod>${escapeXml(url.lastmod)}</lastmod>` : "",
        url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : "",
        typeof url.priority === "number"
          ? `    <priority>${url.priority.toFixed(1)}</priority>`
          : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${SITE_URL}/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`
}

export function renderSitemapIndex(
  entries: Array<{ loc: string; lastmod?: string }>
) {
  const body = entries
    .map(
      (entry) => `  <sitemap>
    <loc>${escapeXml(entry.loc)}</loc>
    ${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""}
  </sitemap>`
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${SITE_URL}/main-sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`
}

export const sitemapHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
}

export function wantsHtml(request: Request) {
  const accept = request.headers.get("accept") || ""
  return accept.includes("text/html")
}

function formatDate(value?: string) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toISOString().replace("T", " ").slice(0, 16)
}

export function renderSitemapHtml(options: {
  title: string
  description: string
  rows: Array<{ href: string; label: string; lastmod?: string; meta?: string }>
}) {
  const rows = options.rows
    .map(
      (row) => `<tr>
  <td><a href="${escapeXml(row.href)}">${escapeXml(row.label)}</a></td>
  <td class="muted">${escapeXml(row.meta ?? "—")}</td>
  <td class="muted">${escapeXml(formatDate(row.lastmod))}</td>
</tr>`
    )
    .join("\n")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex,follow"/>
  <title>${escapeXml(options.title)} — Lastaar</title>
  <style>
    *{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;color:#444;background:#f0f0f1;line-height:1.5}a{color:#a30098;text-decoration:none}a:hover{text-decoration:underline}.wrap{max-width:980px;margin:40px auto;padding:0 20px 40px}.card{background:#fff;border:1px solid #c3c4c7;border-radius:8px;box-shadow:0 1px 1px rgba(0,0,0,.04);overflow:hidden}.header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 28px;border-bottom:1px solid #dcdcde;background:linear-gradient(180deg,#fff 0%,#fafafa 100%)}.brand{display:flex;align-items:center;gap:12px;min-width:0}.brand img{width:40px;height:40px;border-radius:8px;object-fit:contain;background:#111}.brand h1{margin:0;font-size:20px;font-weight:600;color:#1d2327}.brand p{margin:2px 0 0;font-size:13px;color:#646970}.badge{flex-shrink:0;padding:6px 10px;border-radius:999px;background:rgba(163,0,152,.08);color:#a30098;font-size:12px;font-weight:600}.intro{padding:18px 28px;border-bottom:1px solid #dcdcde;background:#fcfcfc;font-size:14px;color:#50575e}.intro strong{color:#1d2327}table{width:100%;border-collapse:collapse;font-size:14px}thead th{text-align:left;padding:12px 28px;background:#f6f7f7;border-bottom:1px solid #dcdcde;color:#1d2327;font-weight:600}tbody td{padding:12px 28px;border-bottom:1px solid #f0f0f1;vertical-align:top;word-break:break-word}tbody tr:hover td{background:#fbf7fb}tbody tr:last-child td{border-bottom:0}.muted{color:#646970;white-space:nowrap}.footer{margin-top:18px;text-align:center;font-size:12px;color:#646970}@media (max-width:720px){.header{flex-direction:column;align-items:flex-start}thead th,tbody td{padding:12px 16px}.intro{padding:16px}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="header">
        <div class="brand">
          <img src="/Nextaar.png" alt="Lastaar"/>
          <div>
            <h1>${escapeXml(options.title)}</h1>
            <p>Generated for search engines and AI crawlers</p>
          </div>
        </div>
        <div class="badge">Lastaar</div>
      </div>
      <div class="intro">${options.description}</div>
      <table>
        <thead>
          <tr>
            <th style="width:60%">URL</th>
            <th>Type</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
    <div class="footer">XML Sitemap · <a href="https://lastaar.com">lastaar.com</a></div>
  </div>
</body>
</html>`
}

export function htmlHeaders() {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  }
}
