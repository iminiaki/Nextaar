import { notFound } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { portfolio } from "@/lib/portfolio"
import { RevealOnScroll } from "@/components/gsap/reveal"

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) => portfolio.map((p) => ({ locale: loc, slug: p.slug })))
}

export default async function PortfolioDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const item = portfolio.find((p) => p.slug === params.slug)
  if (!item) return notFound()

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{item.title[params.locale]}</h1>
      </RevealOnScroll>
      <RevealOnScroll className="mt-3">
        <p className="max-w-2xl text-muted-foreground">{item.excerpt[params.locale]}</p>
      </RevealOnScroll>
      <RevealOnScroll className="mt-8">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title[params.locale]}
          className="w-full max-w-3xl rounded-lg border"
        />
      </RevealOnScroll>
      <RevealOnScroll className="prose mt-8 max-w-3xl dark:prose-invert">
        <p>{item.body[params.locale]}</p>
      </RevealOnScroll>
    </article>
  )
}
