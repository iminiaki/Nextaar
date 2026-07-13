import { getDictionary, type Locale } from "@/lib/i18n";
import { services } from "@/lib/content";
import { ServicesFeatures } from "@/components/home/services-features";
import { buildPageMetadata } from "@/lib/metadata";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const c = dict.pages.services;

  return buildPageMetadata({
    locale: params.locale,
    title: c.title,
    description: c.subtitle,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const c = dict.pages.services;
  const base = `/${params.locale}`;
  const defaultCta = dict.home.servicesFeatures.items[0]?.cta ?? "Learn more";
  const items = services.map((service) => ({
    title: service.title[params.locale],
    desc: service.excerpt[params.locale],
    href: `${base}/services/${service.slug}`,
    cta: defaultCta,
  }));

  return (
    <ServicesFeatures locale={params.locale} title={c.title} subtitle={c.subtitle} items={items} />
  );
}
