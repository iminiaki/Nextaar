import {
  getPageSitemapUrls,
  htmlHeaders,
  renderSitemapHtml,
  renderUrlSet,
  sitemapHeaders,
  wantsHtml,
} from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const urls = getPageSitemapUrls()

  if (wantsHtml(request)) {
    return new Response(
      renderSitemapHtml({
        title: "Page Sitemap",
        description: `This XML Sitemap contains <strong>${urls.length}</strong> page URLs across English, Persian, and Arabic.`,
        rows: urls.map((url) => ({
          href: url.loc,
          label: url.loc,
          lastmod: url.lastmod,
          meta: "Page",
        })),
      }),
      { headers: htmlHeaders() }
    )
  }

  return new Response(renderUrlSet(urls), { headers: sitemapHeaders })
}
