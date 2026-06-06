import { getDictionary, type Locale } from "@/lib/i18n";
import { Hero } from "@/components/hero";
import { ServicesFeatures } from "@/components/home/services-features";
import { CallToAction } from "@/components/home/cta";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { WhyChoose } from "@/components/home/why-choose";
import { ProcessSection } from "@/components/home/process-section";
import { LatestPosts } from "@/components/home/latest-posts";
import { Partners } from "@/components/home/partners";
import { GoogleReviews } from "@/components/home/google-reviews";
import { CodingVideoSection } from "@/components/home/coding-video-section";

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("searchParams", searchParams);
  const dict = await getDictionary(params.locale);
  const base = `/${params.locale}`;
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
  }[params.locale];

  return (
    <>
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

      <ServicesFeatures
        locale={params.locale}
        title={dict.home.servicesFeatures.title}
        subtitle={dict.home.servicesFeatures.subtitle}
        items={dict.home.servicesFeatures.items}
      />

      <CodingVideoSection {...codingVideoText} />

      <PortfolioPreview
        locale={params.locale}
        title={dict.home.portfolio.title}
        subtitle={dict.home.portfolio.subtitle}
        viewAll={dict.home.portfolio.viewAll}
        baseHref={base}
      />

      <GoogleReviews locale={params.locale} />

      <WhyChoose
        locale={params.locale}
        eyebrow={dict.home.why.eyebrow}
        title={dict.home.why.title}
        subtitle={dict.home.why.subtitle}
        swipeHint={dict.home.why.swipeHint}
        bullets={dict.home.why.bullets}
      />

      <ProcessSection
        locale={params.locale}
        eyebrow={dict.home.process.eyebrow}
        title={dict.home.process.title}
        subtitle={dict.home.process.subtitle}
        steps={dict.home.process.steps}
        primaryCta={dict.home.process.primaryCta}
        secondaryCta={dict.home.process.secondaryCta}
        baseHref={base}
      />

      <CallToAction
        locale={params.locale}
        badge={dict.home.cta.badge}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
        button={{ label: dict.home.cta.button.label, href: `${base}/contact` }}
      />

      <LatestPosts
        locale={params.locale}
        title={dict.home.latestPosts.title}
        subtitle={dict.home.latestPosts.subtitle}
        baseHref={base}
      />

      <Partners title={dict.home.partners.title} />

      {/* Keep a contact prompt on home */}
      {/* <ContactForm
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        emailLabel={dict.contact.emailLabel}
        messageLabel={dict.contact.messageLabel}
        send={dict.contact.send}
        success={dict.contact.success}
      /> */}
    </>
  );
}
