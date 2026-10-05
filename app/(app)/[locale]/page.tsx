import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import { getDictionary, isLocale, type Locale } from "@/lib/i18n"
import { Hero } from "@/components/hero"
import { ServicesFeatures } from "@/components/home/services-features"
import { PortfolioPreview } from "@/components/home/portfolio-preview"
import { LatestPosts } from "@/components/home/latest-posts"
import { Partners } from "@/components/home/partners"
import {
  buildPageMetadata,
  getHomeTitle,
  getSiteDescription,
} from "@/lib/metadata"
import {
  buildWebPageSchema,
  JsonLd,
  SITE_LAST_MODIFIED,
} from "@/lib/seo-schema"
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  return buildPageMetadata({
    locale,
    title: getHomeTitle(locale).replace(/\s*\|\s*(Lastaar|لستار)\s*$/i, ""),
    description: getSiteDescription(locale),
    path: `/${locale}`,
    modifiedTime: SITE_LAST_MODIFIED,
  })
}

const CodingVideoSection = dynamic(
  () => import("@/components/home/coding-video-section").then((m) => ({ default: m.CodingVideoSection })),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
)

const GoogleReviews = dynamic(
  () => import("@/components/home/google-reviews").then((m) => ({ default: m.GoogleReviews })),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
)

const WhyChoose = dynamic(
  () => import("@/components/home/why-choose").then((m) => ({ default: m.WhyChoose })),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
)

const ProcessSection = dynamic(
  () => import("@/components/home/process-section").then((m) => ({ default: m.ProcessSection })),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
)

const CallToAction = dynamic(
  () => import("@/components/home/cta").then((m) => ({ default: m.CallToAction })),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
)

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const dict = await getDictionary(locale)
  const base = `/${locale}`
  const codingVideoText = {
    en: {
      eyebrow: "Engineering in motion",
      title: "Clean code behind every digital experience",
      subtitle: "From strategy to production, we build reliable web products with modern tools, thoughtful architecture, and performance in mind.",
      stats: [
        { value: "95+", label: "Projects shipped" },
        { value: "3x", label: "Faster delivery cycles" },
        { value: "24/7", label: "Reliable support" },
      ],
    },
    fa: {
      eyebrow: "مهندسی در جریان",
      title: "کد تمیز پشت هر تجربه دیجیتال",
      subtitle: "از استراتژی تا اجرا، محصولاتی قابل اعتماد با ابزارهای مدرن، معماری دقیق و تمرکز بر عملکرد می‌سازیم.",
      stats: [
        { value: "+۹۵", label: "پروژه اجرا شده" },
        { value: "۳x", label: "چرخه تحویل سریع‌تر" },
        { value: "۲۴/۷", label: "پشتیبانی مطمئن" },
      ],
    },
    ar: {
      eyebrow: "هندسة تتحرك",
      title: "كود نظيف خلف كل تجربة رقمية",
      subtitle: "من الاستراتيجية إلى الإنتاج، نبني منتجات ويب موثوقة بأدوات حديثة ومعمارية مدروسة وتركيز على الأداء.",
      stats: [
        { value: "+95", label: "مشروعا تم إطلاقه" },
        { value: "3x", label: "دورات تسليم أسرع" },
        { value: "24/7", label: "دعم موثوق" },
      ],
    },
  }[locale]

  const linkClass =
    "font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: `/${locale}`,
          title: getHomeTitle(locale),
          description: getSiteDescription(locale),
          dateModified: SITE_LAST_MODIFIED,
        })}
      />

      <Hero
        eyebrow={dict.hero.eyebrow}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        ctaPrimary={dict.hero.ctaPrimary}
        ctaSecondary={dict.hero.ctaSecondary}
        stats={dict.hero.stats}
        scroll={dict.hero.scroll}
        baseHref={base}
      />

      {/* Contextual body links (not nav/footer) for SEO / AI crawlers */}
      <section className="container mx-auto px-4 py-8 md:py-10">
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
          {locale === "fa" ? (
            <>
              لستار به برندها کمک می‌کند با{" "}
              <Link href={`${base}/services`} className={linkClass}>
                خدمات طراحی و توسعه وب
              </Link>
              ، مشاهده{" "}
              <Link href={`${base}/portfolio`} className={linkClass}>
                نمونه‌کارهای واقعی
              </Link>
              {" "}و مطالعه راهنماهای{" "}
              <Link href={`${base}/blog`} className={linkClass}>
                بلاگ
              </Link>
              {" "}رشد کنند. برای شروع مسیر، از صفحه{" "}
              <Link href={`${base}/contact`} className={linkClass}>
                تماس با ما
              </Link>{" "}
              اقدام کنید.
            </>
          ) : locale === "ar" ? (
            <>
              تساعد لستار العلامات على النمو عبر{" "}
              <Link href={`${base}/services`} className={linkClass}>
                خدمات تصميم وتطوير الويب
              </Link>
              ، واستعراض{" "}
              <Link href={`${base}/portfolio`} className={linkClass}>
                أعمالنا المنجزة
              </Link>
              ، وقراءة أدلة{" "}
              <Link href={`${base}/blog`} className={linkClass}>
                المدونة
              </Link>
              . ابدأ من صفحة{" "}
              <Link href={`${base}/contact`} className={linkClass}>
                اتصل بنا
              </Link>
              .
            </>
          ) : (
            <>
              Lastaar helps brands grow with{" "}
              <Link href={`${base}/services`} className={linkClass}>
                web design and development services
              </Link>
              , a proven{" "}
              <Link href={`${base}/portfolio`} className={linkClass}>
                portfolio of shipped products
              </Link>
              , and practical guides on our{" "}
              <Link href={`${base}/blog`} className={linkClass}>
                blog
              </Link>
              . Ready to talk?{" "}
              <Link href={`${base}/contact`} className={linkClass}>
                Contact us
              </Link>
              .
            </>
          )}
        </p>
      </section>

      <ServicesFeatures
        locale={locale}
        title={dict.home.servicesFeatures.title}
        subtitle={dict.home.servicesFeatures.subtitle}
        items={dict.home.servicesFeatures.items}
      />

      <CodingVideoSection {...codingVideoText} />

      <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
        <PortfolioPreview
          locale={locale}
          title={dict.home.portfolio.title}
          subtitle={dict.home.portfolio.subtitle}
          viewAll={dict.home.portfolio.viewAll}
          baseHref={base}
        />
      </Suspense>

      <GoogleReviews locale={locale} />

      <WhyChoose
        locale={locale}
        eyebrow={dict.home.why.eyebrow}
        title={dict.home.why.title}
        subtitle={dict.home.why.subtitle}
        swipeHint={dict.home.why.swipeHint}
        bullets={dict.home.why.bullets}
      />

      <ProcessSection
        locale={locale}
        eyebrow={dict.home.process.eyebrow}
        title={dict.home.process.title}
        subtitle={dict.home.process.subtitle}
        steps={dict.home.process.steps}
        primaryCta={dict.home.process.primaryCta}
        secondaryCta={dict.home.process.secondaryCta}
        baseHref={base}
      />

      <CallToAction
        locale={locale}
        badge={dict.home.cta.badge}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
        button={{ label: dict.home.cta.button.label, href: `${base}/contact` }}
      />

      <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
        <LatestPosts
          locale={locale}
          title={dict.home.latestPosts.title}
          subtitle={dict.home.latestPosts.subtitle}
          baseHref={base}
        />
      </Suspense>

      <Partners locale={locale} title={dict.home.partners.title} />
    </>
  )
}
