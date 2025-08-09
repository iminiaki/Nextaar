import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { portfolio } from "@/lib/portfolio"
import { RevealOnScroll } from "@/components/gsap/reveal"

export function PortfolioPreview({
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
  const items = portfolio.slice(0, 3)
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
            {items.map((it) => (
              <Link key={it.slug} href={`${baseHref}/portfolio/${it.slug}`} data-animate>
                <Card className="h-full transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{it.title[locale]}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <img
                      src={it.image || "/placeholder.svg"}
                      alt={it.title[locale]}
                      className="mb-3 w-full rounded-md border object-cover"
                    />
                    <p>{it.excerpt[locale]}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
