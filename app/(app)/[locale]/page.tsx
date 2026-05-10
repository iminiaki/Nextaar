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

      <CallToAction
        locale={params.locale}
        badge={dict.home.cta.badge}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
        button={{ label: dict.home.cta.button.label, href: `${base}/contact` }}
      />

      <PortfolioPreview
        locale={params.locale}
        title={dict.home.portfolio.title}
        subtitle={dict.home.portfolio.subtitle}
        viewAll={dict.home.portfolio.viewAll}
        baseHref={base}
      />

      <WhyChoose title={dict.home.why.title} bullets={dict.home.why.bullets} />

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

      <LatestPosts
        locale={params.locale}
        title={dict.home.latestPosts.title}
        subtitle={dict.home.latestPosts.subtitle}
        baseHref={base}
      />

      <GoogleReviews locale={params.locale} />

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
