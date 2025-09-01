import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolio } from "@/lib/portfolio"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"

export default async function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{"Portfolio"}</h1>
      <RevealOnScroll staggerChildren className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((it) => (
            <Link key={it.slug} href={`${base}/portfolio/${it.slug}`} data-animate>
              <Card className="h-full transition-transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg">{it.title[params.locale]}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <img
                    src={it.image || "/placeholder.svg"}
                    alt={it.title[params.locale]}
                    className="mb-3 w-full rounded-md border object-cover"
                  />
                  <p>{it.excerpt[params.locale]}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}
