import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import { draftMode } from "next/headers"

export default async function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled } = await draftMode()
  const { docs: items } = await payload.find({
    collection: "portfolio" as any,
    limit: 100,
    sort: "-createdAt" as any,
    locale: params.locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 2,
  })

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{"Portfolio"}</h1>
      </RevealOnScroll>
      <RevealOnScroll staggerChildren className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it: any) => (
            <PortfolioCard
              key={it.slug}
              href={`${base}/portfolio/${it.slug}`}
              title={it.title}
              categories={Array.isArray(it.categories)
                ? it.categories
                    .map((c: any) => {
                      if (c && typeof c === "object") {
                        const name = c.name
                        if (name && typeof name === "object" && name[params.locale]) return name[params.locale]
                        if (typeof name === "string") return name
                      }
                      return undefined
                    })
                    .filter(Boolean)
                : undefined}
              image={it.image?.url}
              imageAlt={it.title}
            />
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}
