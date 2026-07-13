import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/i18n"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextaar.com"

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: Locale
  title: string
  description: string
  path?: string
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        fa: `${SITE_URL}/fa${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale,
      type: "website",
    },
  }
}

export async function getSiteMetadata(locale: Locale, path = ""): Promise<Metadata> {
  const dict = await getDictionary(locale)
  const title = dict.brand.name
  const description = dict.hero.subtitle

  return buildPageMetadata({ locale, title, description, path })
}
