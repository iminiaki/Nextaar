"use client"

import { useEffect, useMemo, useState } from "react"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isRTL, type Locale } from "@/lib/i18n"
import { Switch } from "@/components/ui/switch"
import {
  applyCookiePreferences,
  DEFAULT_COOKIE_PREFERENCES,
  type CookiePreferences,
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookiePreferences,
  saveCookiePreferences,
} from "@/lib/cookies"

const copy: Record<
  Locale,
  {
    title: string
    description: string
    accept: string
    reject: string
    customize: string
    saveSettings: string
    necessary: string
    necessaryDesc: string
    preferences: string
    preferencesDesc: string
    analytics: string
    analyticsDesc: string
    marketing: string
    marketingDesc: string
  }
> = {
  en: {
    title: "We use cookies",
    description: "We use cookies to improve your experience and analyze website traffic.",
    accept: "Accept all",
    reject: "Reject",
    customize: "Customize",
    saveSettings: "Save settings",
    necessary: "Necessary",
    necessaryDesc: "Required for basic site functionality and security.",
    preferences: "Preferences",
    preferencesDesc: "Remembers choices like theme and language settings.",
    analytics: "Analytics",
    analyticsDesc: "Helps us understand usage and improve performance.",
    marketing: "Marketing",
    marketingDesc: "Used to personalize ads and marketing campaigns.",
  },
  fa: {
    title: "ما از کوکی استفاده می کنیم",
    description: "برای بهبود تجربه کاربری و تحلیل ترافیک وب سایت از کوکی استفاده می کنیم.",
    accept: "قبول همه",
    reject: "رد",
    customize: "تنظیمات",
    saveSettings: "ذخیره تنظیمات",
    necessary: "ضروری",
    necessaryDesc: "برای عملکرد پایه سایت و امنیت لازم است.",
    preferences: "ترجیحات",
    preferencesDesc: "تنظیماتی مثل تم و زبان را ذخیره می کند.",
    analytics: "تحلیلی",
    analyticsDesc: "به ما کمک می کند استفاده سایت را بهتر تحلیل کنیم.",
    marketing: "بازاریابی",
    marketingDesc: "برای شخصی سازی تبلیغات و کمپین ها استفاده می شود.",
  },
  ar: {
    title: "نستخدم ملفات تعريف الارتباط",
    description: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور في الموقع.",
    accept: "قبول الكل",
    reject: "رفض",
    customize: "تخصيص",
    saveSettings: "حفظ الإعدادات",
    necessary: "ضرورية",
    necessaryDesc: "مطلوبة لعمل الموقع الأساسي والأمان.",
    preferences: "التفضيلات",
    preferencesDesc: "تتذكر اختيارات مثل السمة واللغة.",
    analytics: "التحليلات",
    analyticsDesc: "تساعدنا في فهم الاستخدام وتحسين الأداء.",
    marketing: "التسويق",
    marketingDesc: "تستخدم لتخصيص الإعلانات والحملات التسويقية.",
  },
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES)
  const rtl = isRTL(locale)
  const text = useMemo(() => copy[locale], [locale])

  useEffect(() => {
    const stored = readCookiePreferences()
    if (stored) {
      setPreferences(stored)
      applyCookiePreferences(stored)
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }

    const openCookieSettings = () => {
      const latest = readCookiePreferences()
      setPreferences(latest ?? DEFAULT_COOKIE_PREFERENCES)
      setIsVisible(true)
      setIsCustomizeOpen(true)
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openCookieSettings)
    setIsReady(true)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openCookieSettings)
  }, [])

  const saveChoice = (next: CookiePreferences) => {
    setPreferences(next)
    saveCookiePreferences(next)
    applyCookiePreferences(next)
    setIsVisible(false)
    setIsCustomizeOpen(false)
  }

  const togglePreference = (key: "preferences" | "analytics" | "marketing", value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  if (!isReady) return null

  return (
    <>
      {isVisible ? (
        <section
          dir={rtl ? "rtl" : "ltr"}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto w-[min(760px,calc(100vw-2rem))] rounded-2xl border border-primary/20 bg-background/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
          aria-live="polite"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-blue-500/10" />
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Cookie className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{text.title}</p>
                  <p className="text-xs leading-5 text-muted-foreground">{text.description}</p>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-3 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-full justify-center whitespace-nowrap sm:w-auto"
                  onClick={() => setIsCustomizeOpen((prev) => !prev)}
                >
                  {text.customize}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-full justify-center whitespace-nowrap sm:w-auto"
                  onClick={() => saveChoice({ ...DEFAULT_COOKIE_PREFERENCES })}
                >
                  {text.reject}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 w-full justify-center whitespace-nowrap sm:w-auto"
                  onClick={() =>
                    saveChoice({
                      necessary: true,
                      preferences: true,
                      analytics: true,
                      marketing: true,
                    })
                  }
                >
                  {text.accept}
                </Button>
              </div>
            </div>

            {isCustomizeOpen ? (
              <div className="rounded-xl border border-border/70 bg-background/70 p-3">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.necessary}</p>
                      <p className="text-xs text-muted-foreground">{text.necessaryDesc}</p>
                    </div>
                    <Switch checked disabled aria-label={text.necessary} />
                  </div>

                  <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.preferences}</p>
                      <p className="text-xs text-muted-foreground">{text.preferencesDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.preferences}
                      onCheckedChange={(checked) => togglePreference("preferences", checked)}
                      aria-label={text.preferences}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.analytics}</p>
                      <p className="text-xs text-muted-foreground">{text.analyticsDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => togglePreference("analytics", checked)}
                      aria-label={text.analytics}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.marketing}</p>
                      <p className="text-xs text-muted-foreground">{text.marketingDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => togglePreference("marketing", checked)}
                      aria-label={text.marketing}
                    />
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button type="button" size="sm" onClick={() => saveChoice(preferences)}>
                    {text.saveSettings}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

    </>
  )
}
