export const PREFERRED_SOURCE_SCRIPT =
  "https://news.google.com/swg/js/v1/publisher.js"

export const PREFERRED_SOURCE_DOMAIN = "lastaar.com"

export const PREFERRED_SOURCE_DEEPLINK = `https://www.google.com/preferences/source?q=${PREFERRED_SOURCE_DOMAIN}`

export type PreferredSourceTheme = "light" | "dark"

export type PreferredSourceApi = {
  init: (options?: { theme?: PreferredSourceTheme; lang?: string }) => void
  addPreferredSource: () => void
}

type PreferredSourceRuntime = {
  push: (...callbacks: Array<(api: PreferredSourceApi) => void>) => void
  ready: () => Promise<PreferredSourceApi>
  api: PreferredSourceApi
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: PreferredSourceRuntime | Array<(api: PreferredSourceApi) => void>
  }
}

function readApi(): PreferredSourceApi | null {
  if (typeof window === "undefined") return null
  const slot = window.PREFERRED_SOURCE
  if (!slot || Array.isArray(slot)) return null
  return slot.api ?? null
}

/**
 * Load Google's Preferred Sources publisher.js once and resolve its API.
 * Safe for Next.js client navigations: call `api.init()` again after mounting
 * a fresh `[google-add-preferred-source-btn]` host (SDK only hydrates hosts
 * that are missing `data-initialized`).
 */
export function loadPreferredSourceApi(): Promise<PreferredSourceApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Preferred Sources requires a browser"))
  }

  const existing = readApi()
  if (existing) return Promise.resolve(existing)

  const slot = window.PREFERRED_SOURCE
  if (slot && !Array.isArray(slot) && typeof slot.ready === "function") {
    return slot.ready()
  }

  return new Promise((resolve, reject) => {
    if (!window.PREFERRED_SOURCE) {
      window.PREFERRED_SOURCE = []
    }

    const current = window.PREFERRED_SOURCE
    if (Array.isArray(current)) {
      current.push((api) => resolve(api))
    }

    if (!document.querySelector(`script[src="${PREFERRED_SOURCE_SCRIPT}"]`)) {
      const script = document.createElement("script")
      script.async = true
      script.src = PREFERRED_SOURCE_SCRIPT
      script.onerror = () =>
        reject(new Error("Failed to load Google Preferred Sources"))
      document.head.appendChild(script)
    }

    const started = Date.now()
    const poll = window.setInterval(() => {
      const api = readApi()
      if (api) {
        window.clearInterval(poll)
        resolve(api)
        return
      }
      if (Date.now() - started > 12_000) {
        window.clearInterval(poll)
        reject(new Error("Timed out loading Google Preferred Sources"))
      }
    }, 40)
  })
}

export function preferredSourceLang(locale: string): string {
  if (locale === "fa" || locale === "ar" || locale === "en") return locale
  return "en"
}
