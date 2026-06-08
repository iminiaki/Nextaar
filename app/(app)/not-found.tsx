import { cookies, headers } from "next/headers"
import { AccentProvider } from "@/components/accent-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { NotFoundPage } from "@/components/not-found-page"
import { detectLocale, LOCALE_COOKIE, readCountryFromHeaders } from "@/lib/locale-from-geo"
import type { Locale } from "@/lib/i18n"

export default async function GlobalNotFound() {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale: Locale = detectLocale({
    preferred: cookieStore.get(LOCALE_COOKIE)?.value,
    country: readCountryFromHeaders(headerStore),
    acceptLanguage: headerStore.get("accept-language"),
  })

  return (
    <AccentProvider>
      <LocaleProvider locale={locale}>
        <NotFoundPage locale={locale} />
      </LocaleProvider>
    </AccentProvider>
  )
}
