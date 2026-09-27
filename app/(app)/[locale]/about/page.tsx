import { getDictionary, type Locale } from "@/lib/i18n"
import { AboutPageContent } from "@/components/about/about-page-content"
import { buildPageMetadata, getPageTopic } from "@/lib/metadata"
export const revalidate = 3600

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.about

  return buildPageMetadata({
    locale: params.locale,
    title: getPageTopic("about", params.locale),
    description: c.subtitle,
    path: "/about",
  })
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return <AboutPageContent locale={params.locale} content={dict.pages.about} />
}
