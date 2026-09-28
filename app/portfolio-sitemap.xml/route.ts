import {
  getPortfolioSitemapUrls,
  htmlHeaders,
  renderSitemapHtml,
  renderUrlSet,
  sitemapHeaders,
  wantsHtml,
} from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const urls = await getPortfolioSitemapUrls()

  if (wantsHtml(request)) {
    return new Response(
      renderSitemapHtml({
        title: "Portfolio Sitemap",
        description: `This XML Sitemap contains <strong>${urls.length}</strong> portfolio URLs across English, Persian, and Arabic.`,
        rows: urls.map((url) => ({
          href: url.loc,
          label: url.loc,
          lastmod: url.lastmod,
          meta: "Portfolio",
        })),
      }),
      { headers: htmlHeaders() }
    )
  }

  return new Response(renderUrlSet(urls), { headers: sitemapHeaders })
}
