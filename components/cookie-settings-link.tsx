"use client"

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/cookies"
import type { Locale } from "@/lib/i18n"

const copy: Record<Locale, string> = {
  en: "Open cookie settings",
  fa: "باز کردن تنظیمات کوکی",
  ar: "فتح إعدادات ملفات الارتباط",
}

export function CookieSettingsLink({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      className="w-fit text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {copy[locale]}
    </button>
  )
}
