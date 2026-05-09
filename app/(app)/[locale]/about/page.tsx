import { getDictionary, type Locale } from "@/lib/i18n"
import { AboutPageContent } from "@/components/about/about-page-content"

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return <AboutPageContent locale={params.locale} content={dict.pages.about} />
}
