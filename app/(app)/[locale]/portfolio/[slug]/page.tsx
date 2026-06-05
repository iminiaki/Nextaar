import { notFound } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import { draftMode } from "next/headers"

export async function generateStaticParams() {
  // Build-time: fetch slugs from Payload for static params
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({ collection: "portfolio" as any, limit: 1000, depth: 0 })
  const slugs = docs.map((d: any) => d.slug).filter(Boolean)
  return ["en", "fa", "ar"].flatMap((loc) => slugs.map((slug: string) => ({ locale: loc, slug })))
}

export default async function PortfolioDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: "portfolio" as any,
    where: { slug: { equals: params.slug } },
    limit: 1,
    locale: params.locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 2,
  })
  const item: any | undefined = docs?.[0]
  if (!item) return notFound()

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{item.title}</h1>
      </RevealOnScroll>
      <RevealOnScroll className="mt-3">
        <p className="max-w-2xl text-muted-foreground">{item.excerpt}</p>
      </RevealOnScroll>
      <RevealOnScroll className="mt-8">
        <img
          src={item.image?.url || "/placeholder.svg"}
          alt={item.title}
          className="w-full max-w-3xl rounded-lg border"
        />
      </RevealOnScroll>
      <RevealOnScroll className="prose mt-8 max-w-3xl dark:prose-invert">
        <p>{item.body}</p>
      </RevealOnScroll>
    </article>
  )
}
