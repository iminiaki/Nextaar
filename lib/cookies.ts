export const COOKIE_CONSENT_STORAGE_KEY = "nextaar-cookie-consent"
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings"

export type CookiePreferences = {
  necessary: true
  preferences: boolean
  analytics: boolean
  marketing: boolean
}

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
}

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

const NON_ESSENTIAL_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_fbp", "_fbc"]

function setCookie(name: string, value: string, maxAgeSeconds = ONE_YEAR_SECONDS) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

function removeKnownNonEssentialCookies() {
  if (typeof document === "undefined") return
  const names = document.cookie
    .split(";")
    .map((entry) => entry.trim().split("=")[0])
    .filter(Boolean)

  for (const name of names) {
    if (NON_ESSENTIAL_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      deleteCookie(name)
    }
  }
}

export function saveCookiePreferences(preferences: CookiePreferences) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(preferences))
}

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    }
  } catch {
    return null
  }
}

export function applyCookiePreferences(preferences: CookiePreferences) {
  setCookie("cookie_consent_necessary", "true")
  setCookie("cookie_consent_preferences", String(preferences.preferences))
  setCookie("cookie_consent_analytics", String(preferences.analytics))
  setCookie("cookie_consent_marketing", String(preferences.marketing))

  if (!preferences.analytics || !preferences.marketing) {
    removeKnownNonEssentialCookies()
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cookie-preferences-changed", {
        detail: preferences,
      })
    )
  }
}

export function canUseCookieCategory(
  category: Exclude<keyof CookiePreferences, "necessary">,
  preferences: CookiePreferences | null
) {
  if (!preferences) return false
  return preferences[category]
}
