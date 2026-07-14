import { isLocale, type Locale } from "@/lib/i18n"

/** Persian / Dari / related locales for these countries. */
export const FA_COUNTRIES = new Set(["IR", "AF", "PK", "TJ"])

/** Arabic-speaking countries (ISO 3166-1 alpha-2). Pakistan uses FA above. */
export const AR_COUNTRIES = new Set([
  "DZ",
  "BH",
  "KM",
  "DJ",
  "EG",
  "IQ",
  "JO",
  "KW",
  "LB",
  "LY",
  "MR",
  "MA",
  "OM",
  "PS",
  "QA",
  "SA",
  "SO",
  "SD",
  "SY",
  "TN",
  "AE",
  "YE",
  "EH",
])

export const LOCALE_COOKIE = "NEXT_LOCALE"

export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null

  const code = country.toUpperCase()

  if (FA_COUNTRIES.has(code)) return "fa"
  if (AR_COUNTRIES.has(code)) return "ar"

  return null
}

export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null

  const tags = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean)

  for (const tag of tags) {
    if (tag.startsWith("fa") || tag.startsWith("prs") || tag.startsWith("ps") || tag.startsWith("tg")) {
      return "fa"
    }

    if (tag.startsWith("ar")) {
      return "ar"
    }
  }

  return null
}

export function detectLocale(options: {
  country?: string | null
  acceptLanguage?: string | null
  preferred?: string | null
}): Locale {
  if (options.preferred && isLocale(options.preferred)) {
    return options.preferred
  }

  const fromCountry = localeFromCountry(options.country)
  if (fromCountry) return fromCountry

  const fromLanguage = localeFromAcceptLanguage(options.acceptLanguage)
  if (fromLanguage) return fromLanguage

  return "en"
}

export function readCountryFromHeaders(headers: Headers): string | null {
  return (
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-country-code") ??
    null
  )
}
