import {
  getSitemapIndexEntries,
  htmlHeaders,
  renderSitemapHtml,
  renderSitemapIndex,
  sitemapHeaders,
  wantsHtml,
} from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const entries = await getSitemapIndexEntries()

  if (wantsHtml(request)) {
    return new Response(
      renderSitemapHtml({
        title: "XML Sitemap Index",
        description: `This XML Sitemap Index contains <strong>${entries.length}</strong> sitemaps. This is the index file — open a child sitemap for individual URLs.`,
        rows: entries.map((entry) => {
          const path = new URL(entry.loc).pathname
          return {
            href: path,
            label: entry.loc,
            lastmod: entry.lastmod,
            meta: "Sitemap",
          }
        }),
      }),
      { headers: htmlHeaders() }
    )
  }

  return new Response(renderSitemapIndex(entries), { headers: sitemapHeaders })
}
