"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { isRTL, type Locale } from "@/lib/i18n"

type LocaleContextValue = { locale: Locale; rtl: boolean }

const LocaleContext = createContext<LocaleContextValue>({ locale: "en" as Locale, rtl: false })

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = locale
    document.documentElement.dir = isRTL(locale) ? "rtl" : "ltr"
  }, [locale])

  const value: LocaleContextValue = { locale, rtl: isRTL(locale) }
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}

export function useIsRTL(): boolean {
  return useContext(LocaleContext).rtl
}
