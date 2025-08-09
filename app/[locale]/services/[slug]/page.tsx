import { notFound } from "next/navigation"
import { getDictionary, type Locale } from "@/lib/i18n"
import { services } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"

type Params = { params: { locale: Locale; slug: string } }

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) => services.map((s) => ({ locale: loc, slug: s.slug })))
}

export default async function ServiceDetail({ params }: Params) {
  const dict = await getDictionary(params.locale)
  const svc = services.find((s) => s.slug === params.slug)
  if (!svc) return notFound()

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{svc.title[params.locale]}</h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{svc.excerpt[params.locale]}</p>
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <img
          src={svc.image || "/placeholder.svg"}
          alt={svc.title[params.locale]}
          className="w-full max-w-3xl rounded-lg border"
        />
      </RevealOnScroll>

      <RevealOnScroll className="prose mt-8 max-w-3xl dark:prose-invert">
        <p>{svc.body[params.locale]}</p>
      </RevealOnScroll>
    </div>
  )
}
