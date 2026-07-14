import { redirect } from "next/navigation"
import { headers, cookies } from "next/headers"
import { detectLocale, LOCALE_COOKIE, readCountryFromHeaders } from "@/lib/locale-from-geo"

export default function Page() {
  const cookieStore = cookies()
  const headerStore = headers()
  const locale = detectLocale({
    preferred: cookieStore.get(LOCALE_COOKIE)?.value,
    country: readCountryFromHeaders(headerStore),
    acceptLanguage: headerStore.get("accept-language"),
  })

  redirect(`/${locale}`)
}
