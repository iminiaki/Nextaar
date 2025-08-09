import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary, type Locale } from "@/lib/i18n"
import { services } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.services
  const base = `/${params.locale}`

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.subtitle}</p>
      </RevealOnScroll>

      <RevealOnScroll staggerChildren className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`${base}/services/${s.slug}`} data-animate>
              <Card className="h-full transition-transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg">{s.title[params.locale]}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <img
                    src={s.image || "/placeholder.svg"}
                    alt={s.title[params.locale]}
                    className="mb-3 w-full rounded-md border"
                  />
                  <p>{s.excerpt[params.locale]}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}
