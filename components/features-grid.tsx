import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RevealOnScroll } from "./gsap/reveal"

export function FeaturesGrid({
  title,
  subtitle,
  items,
  id = "features",
}: {
  title: string
  subtitle: string
  items: { title: string; desc: string }[]
  id?: string
}) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <Card key={i} className="h-full" data-animate>
                <CardHeader>
                  <CardTitle className="text-lg">{it.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{it.desc}</CardContent>
              </Card>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
