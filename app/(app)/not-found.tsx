import { cookies, headers } from "next/headers"
import { AccentProvider } from "@/components/accent-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { NotFoundPage } from "@/components/not-found-page"
import { detectLocale, LOCALE_COOKIE, readCountryFromHeaders } from "@/lib/locale-from-geo"
import type { Locale } from "@/lib/i18n"
import { formatSeoTitle, getPageTopic } from "@/lib/metadata"

async function resolveLocale() {
  const cookieStore = await cookies()
  const headerStore = await headers()
  return detectLocale({
    preferred: cookieStore.get(LOCALE_COOKIE)?.value,
    country: readCountryFromHeaders(headerStore),
    acceptLanguage: headerStore.get("accept-language"),
  })
}

export async function generateMetadata() {
  const locale = await resolveLocale()
  return {
    title: { absolute: formatSeoTitle(getPageTopic("notFound", locale), locale) },
    robots: { index: false, follow: true },
  }
}

export default async function GlobalNotFound() {
  const locale: Locale = await resolveLocale()

  return (
    <AccentProvider>
      <LocaleProvider locale={locale}>
        <NotFoundPage locale={locale} />
      </LocaleProvider>
    </AccentProvider>
  )
}
