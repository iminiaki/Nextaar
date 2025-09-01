import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.about

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.subtitle}</p>
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <div className="prose max-w-3xl dark:prose-invert">
          <p>{c.body}</p>
          <p>
            {"At Lastaar, we align design and engineering to ship polished products with speed and quality.".split("")}
          </p>
        </div>
      </RevealOnScroll>
    </div>
  )
}
