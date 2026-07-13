import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import type { Locale } from "@/lib/i18n"
import { findPortfolio } from "@/lib/payload-queries"
import { PortfolioPreviewSection } from "@/components/home/portfolio-preview-section"

export async function PortfolioPreview({
  locale,
  title,
  subtitle,
  viewAll,
  baseHref,
}: {
  locale: Locale
  title: string
  subtitle: string
  viewAll: string
  baseHref: string
}) {
  const { docs: items } = await findPortfolio({ locale, limit: 8, depth: 1 })

  return (
    <PortfolioPreviewSection
      locale={locale}
      title={title}
      subtitle={subtitle}
      viewAll={viewAll}
      baseHref={baseHref}
    >
      {items.map((it: any) => (
        <div key={it.slug} data-portfolio-card className="min-h-0 opacity-0">
          <PortfolioCard
            href={`${baseHref}/portfolio/${it.slug}`}
            title={it.title}
            categories={Array.isArray(it.categories)
              ? it.categories
                  .map((c: any) => {
                    if (c && typeof c === "object") {
                      const name = c.name
                      if (name && typeof name === "object" && name[locale]) return name[locale]
                      if (typeof name === "string") return name
                    }
                    return undefined
                  })
                  .filter(Boolean)
              : undefined}
            image={it.image?.url}
            imageAlt={it.title}
          />
        </div>
      ))}
    </PortfolioPreviewSection>
  )
}
