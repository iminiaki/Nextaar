import { SITE_URL } from "@/lib/seo-schema"

/**
 * AI Catalog 1.0 / ARD manifest.
 * Lighthouse's agentic-browsing audit accepts only `specVersion`, `host`,
 * and `entries` at the root, and only these host keys.
 */
export const aiCatalog = {
  specVersion: "1.0",
  host: {
    displayName: "Lastaar",
    identifier: "lastaar.com",
    documentationUrl: `${SITE_URL}/llms.txt`,
    logoUrl: `${SITE_URL}/Nextaar.png`,
  },
  entries: [
    {
      identifier: "urn:air:lastaar.com:context:llms-txt",
      displayName: "Site summary for language models",
      description:
        "Curated index of Lastaar pages, services, and locales for AI agents.",
      type: "text/plain",
      url: `${SITE_URL}/llms.txt`,
      representativeQueries: [
        "What does Lastaar do?",
        "Which services does Lastaar offer?",
        "How do I contact Lastaar?",
      ],
    },
    {
      identifier: "urn:air:lastaar.com:sitemap:index",
      displayName: "XML sitemap",
      description: "Crawlable list of public Lastaar URLs.",
      type: "application/xml",
      url: `${SITE_URL}/sitemap.xml`,
      representativeQueries: [
        "List the public pages on lastaar.com",
        "What blog posts and portfolio projects does Lastaar publish?",
      ],
    },
  ],
} as const

export const aiCatalogHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600",
} as const

export function aiCatalogResponse() {
  return Response.json(aiCatalog, { headers: aiCatalogHeaders })
}
