"use client"

import { useEffect } from "react"
import Script from "next/script"
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookies"

const GA_ID = "G-F9R1NNXV7T"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function analyticsGranted() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) || "null") as {
      analytics?: boolean
    } | null
    return Boolean(saved?.analytics)
  } catch {
    return false
  }
}

function updateAnalyticsConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  })
}

export function GoogleTag() {
  useEffect(() => {
    updateAnalyticsConsent(analyticsGranted())

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<{ analytics?: boolean }>).detail
      updateAnalyticsConsent(Boolean(detail?.analytics))
    }

    window.addEventListener("cookie-preferences-changed", onChange)
    return () => window.removeEventListener("cookie-preferences-changed", onChange)
  }, [])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var granted = false;
          try {
            var saved = JSON.parse(localStorage.getItem("${COOKIE_CONSENT_STORAGE_KEY}") || "null");
            granted = !!(saved && saved.analytics);
          } catch (e) {}
          gtag('consent', 'default', {
            analytics_storage: granted ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
