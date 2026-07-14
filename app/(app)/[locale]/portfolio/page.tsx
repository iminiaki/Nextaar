import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { findPortfolio } from "@/lib/payload-queries"
import { buildPageMetadata } from "@/lib/metadata"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.portfolio

  return buildPageMetadata({
    locale: params.locale,
    title: c.title,
    description: c.subtitle,
    path: "/portfolio",
  })
}

export default async function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.portfolio
  const base = `/${params.locale}`
  const { docs: items } = await findPortfolio({ locale: params.locale, limit: 100, depth: 1 })

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
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
