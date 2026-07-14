import { LOCALE_COOKIE } from "@/lib/locale-from-geo"
import type { Locale } from "@/lib/i18n"

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function setLocalePreference(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${ONE_YEAR_SECONDS};samesite=lax`
}
