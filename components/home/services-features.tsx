import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"

type Item = {
  title: string
  desc: string
  href: string
  cta: string
}

export function ServicesFeatures({
  locale,
  title,
  subtitle,
  items,
}: {
  locale: Locale
  title: string
  subtitle: string
  items: Item[]
}) {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it, i) => (
              <Card key={i} className="h-full" data-animate>
                <CardHeader>
                  <CardTitle className="text-lg">{it.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>{it.desc}</p>
                  <Link href={it.href}>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      {it.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
