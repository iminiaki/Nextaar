"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Star } from "lucide-react"
import { isRTL, type Locale } from "@/lib/i18n"
import {
  loadPreferredSourceApi,
  preferredSourceLang,
  PREFERRED_SOURCE_DEEPLINK,
  type PreferredSourceTheme,
} from "@/lib/preferred-source"

export type PreferredSourceLabels = {
  title: string
  help: string
  fallbackLabel: string
  fallbackAria: string
}

type Props = {
  locale: Locale
  labels: PreferredSourceLabels
  className?: string
}

/**
 * Google Preferred Sources — official embed + Next.js-safe re-init.
 * @see https://developers.google.com/search/docs/appearance/preferred-sources
 */
export function PreferredSource({ locale, labels, className }: Props) {
  const { resolvedTheme } = useTheme()
  const hostRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const reactId = useId()
  const rtl = isRTL(locale)
  const lang = preferredSourceLang(locale)
  const theme: PreferredSourceTheme =
    mounted && resolvedTheme === "dark" ? "dark" : "light"
  const hostKey = `${theme}-${lang}`

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const host = hostRef.current
    if (!host) return

    setShowFallback(false)

    // Official mount attribute (must be present before init scans the DOM).
    host.setAttribute("google-add-preferred-source-btn", "")
    host.setAttribute("data-theme", theme)
    host.setAttribute("data-lang", lang)
    host.removeAttribute("data-initialized")

    let cancelled = false
    let fallbackTimer = 0

    loadPreferredSourceApi()
      .then((api) => {
        if (cancelled) return
        // init() finds hosts without data-initialized and inflates Google's button.
        // Calling again after client navigations / remounts is supported by the SDK.
        api.init({ theme, lang })

        fallbackTimer = window.setTimeout(() => {
          if (cancelled) return
          // Google renders the official badge inside a shadow root.
          const inflated =
            host.shadowRoot?.childElementCount ||
            host.childElementCount ||
            host.hasAttribute("data-initialized")
          if (!inflated) setShowFallback(true)
        }, 2800)
      })
      .catch(() => {
        if (!cancelled) setShowFallback(true)
      })

    return () => {
      cancelled = true
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
    }
  }, [mounted, hostKey, theme, lang])

  return (
    <aside
      className={
        className ??
        "rounded-xl border border-border/80 bg-card/40 p-4 shadow-sm"
      }
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Star className="size-4 fill-current" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {labels.title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {labels.help}
          </p>
        </div>
      </div>

      {/* Reserved height avoids layout shift while Google injects the badge */}
      <div className="flex min-h-10 items-center" data-preferred-source-slot="">
        {mounted ? (
          <div
            key={hostKey}
            ref={hostRef}
            id={`gps-host-${reactId}`}
            className="inline-flex min-h-10 min-w-[180px] items-center"
          />
        ) : (
          <div
            className="h-10 w-[200px] animate-pulse rounded-md bg-muted/60"
            aria-hidden
          />
        )}
      </div>

      {showFallback ? (
        <a
          href={PREFERRED_SOURCE_DEEPLINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.fallbackAria}
          className="mt-3 inline-flex text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          {labels.fallbackLabel}
        </a>
      ) : null}

      <noscript>
        <a
          href={PREFERRED_SOURCE_DEEPLINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          {labels.fallbackLabel}
        </a>
      </noscript>
    </aside>
  )
}
