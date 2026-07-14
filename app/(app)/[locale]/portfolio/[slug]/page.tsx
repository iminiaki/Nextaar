import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, BriefcaseBusiness, Layers3, Sparkles } from "lucide-react"
import { getDictionary, isRTL, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { findPortfolioBySlug } from "@/lib/payload-queries"
import { buildPageMetadata } from "@/lib/metadata"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"

export const revalidate = 3600

const labels: Record<
  Locale,
  {
    back: string
    client: string
    services: string
    caseStudy: string
    startProject: string
    viewPortfolio: string
    ctaTitle: string
    ctaBody: string
  }
> = {
  en: {
    back: "Back to portfolio",
    client: "Client",
    services: "Services",
    caseStudy: "Case study",
    startProject: "Start a project",
    viewPortfolio: "View all work",
    ctaTitle: "Want a result like this?",
    ctaBody: "Tell us about your product, audience, and goals. We will map the right design and development path for your project.",
  },
  fa: {
    back: "بازگشت به نمونه‌کارها",
    client: "کارفرما",
    services: "خدمات",
    caseStudy: "مطالعه موردی",
    startProject: "شروع پروژه",
    viewPortfolio: "مشاهده همه پروژه‌ها",
    ctaTitle: "چنین نتیجه‌ای می‌خواهید؟",
    ctaBody: "درباره محصول، مخاطب و اهداف خود بگویید تا مسیر مناسب طراحی و توسعه را برای پروژه‌تان مشخص کنیم.",
  },
  ar: {
    back: "العودة إلى الأعمال",
    client: "العميل",
    services: "الخدمات",
    caseStudy: "دراسة حالة",
    startProject: "ابدأ مشروعا",
    viewPortfolio: "عرض جميع الأعمال",
    ctaTitle: "تريد نتيجة مثل هذه؟",
    ctaBody: "أخبرنا عن منتجك وجمهورك وأهدافك لنحدد مسار التصميم والتطوير المناسب لمشروعك.",
  },
}

function getCategoryName(category: any, locale: Locale) {
  const name = category?.name
  if (name && typeof name === "object" && typeof name[locale] === "string") return name[locale]
  if (typeof name === "string") return name
  return undefined
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({ collection: "portfolio" as any, limit: 1000, depth: 0 })
  const slugs = docs.map((d: any) => d.slug).filter(Boolean)
  return ["en", "fa", "ar"].flatMap((loc) => slugs.map((slug: string) => ({ locale: loc, slug })))
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const item: any = await findPortfolioBySlug(params.locale, params.slug)

  if (!item) {
    return { title: "Portfolio" }
  }

  return buildPageMetadata({
    locale: params.locale,
    title: item.title,
    description: item.excerpt ?? item.title,
    path: `/portfolio/${params.slug}`,
  })
}

export default async function PortfolioDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const item: any | undefined = await findPortfolioBySlug(params.locale, params.slug)
  if (!item) return notFound()

  const locale = params.locale
  const rtl = isRTL(locale)
  const t = labels[locale]
  const dict = await getDictionary(locale)
  const categories = Array.isArray(item.categories)
    ? item.categories
        .map((category: any) => getCategoryName(category, locale))
        .filter(Boolean)
    : []
  const eyebrow = categories[0] ?? t.caseStudy

  return (
    <main className="container mx-auto px-4 py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <RevealOnScroll>
        <section className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_260px_at_20%_-80px,hsl(var(--primary)/0.18),transparent_60%)]"
          />
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Link
                href={`/${locale}/portfolio`}
                className="mb-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.back}
              </Link>
              <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{item.title}</h1>
              {item.excerpt ? (
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{item.excerpt}</p>
              ) : null}
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/${locale}/contact`}>
                    {t.startProject}
                    <ArrowRight className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/${locale}/portfolio`}>{t.viewPortfolio}</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border bg-background/80 p-5 shadow-sm backdrop-blur">
                {item.client ? (
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-primary/10 text-primary">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.client}</p>
                      <p className="font-semibold">{item.client}</p>
                    </div>
                  </div>
                ) : null}
                {categories.length > 0 ? (
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">{t.services}</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge key={category} variant="secondary" className="rounded-full px-3 py-1">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll className="mt-10">
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border bg-background/70 shadow-sm">
          <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <Image
            src={item.image?.url || "/placeholder.svg"}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      </RevealOnScroll>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <RevealOnScroll className="lg:col-span-8">
          <section className="rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <Layers3 className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-semibold">{t.caseStudy}</h2>
            </div>
            {item.body ? (
              <div className="prose max-w-none dark:prose-invert prose-p:leading-8 prose-p:text-muted-foreground">
                <RichText data={item.body} />
              </div>
            ) : (
              <p className="text-sm leading-7 text-muted-foreground">{item.excerpt}</p>
            )}
          </section>
        </RevealOnScroll>

        <RevealOnScroll className="lg:col-span-4">
          <aside className="sticky top-28 space-y-4">
            <div className="rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{dict.brand.name}</h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{dict.home.why.subtitle}</p>
              <Button asChild className="mt-5 w-full">
                <Link href={`/${locale}/contact`}>{t.startProject}</Link>
              </Button>
            </div>

            <div className="rounded-2xl border bg-background/70 p-5">
              <p className="text-sm font-medium">{dict.nav.services}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {dict.home.servicesFeatures.items.slice(0, 4).map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="transition-colors hover:text-foreground">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-10">
        <section className="relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur md:p-8">
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{t.ctaBody}</p>
            <Button asChild className="mt-6">
              <Link href={`/${locale}/contact`}>
                {dict.hero.ctaPrimary}
                <ArrowRight className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  )
}
