import Link from "next/link"
import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import { draftMode } from "next/headers"
import { RevealOnScroll } from "@/components/gsap/reveal"

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
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled } = await draftMode()
  const { docs: items } = await payload.find({
    collection: "portfolio" as any,
    limit: 3,
    sort: "-createdAt" as any,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 2,
  })
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
          </div>
          <Link href={`${baseHref}/portfolio`}>
            <Button variant="outline">{viewAll}</Button>
          </Link>
        </div>

        <RevealOnScroll staggerChildren className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it: any) => (
              <PortfolioCard
                key={it.slug}
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
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
