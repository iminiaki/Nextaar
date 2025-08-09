"use client"

import { useEffect } from "react"
import { isRTL, type Locale } from "@/lib/i18n"

export function LocaleProvider({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = locale
    document.documentElement.dir = isRTL(locale) ? "rtl" : "ltr"
  }, [locale])

  return null
}
