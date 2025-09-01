import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary, type Locale } from "@/lib/i18n"
import { posts } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.blog
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
          {posts
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((p) => (
              <Link key={p.slug} href={`${base}/blog/${p.slug}`} data-animate>
                <Card className="h-full transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title[params.locale]}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.title[params.locale]}
                      className="mb-3 w-full rounded-md border"
                    />
                    <p className="mb-2">{p.excerpt[params.locale]}</p>
                    <p className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}
