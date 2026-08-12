"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Locale, locales } from "@/lib/i18n"
import { setLocalePreference } from "@/lib/locale-preference"
import { Languages } from "lucide-react"

const switcherLabel: Record<Locale, string> = {
  en: "Change language",
  fa: "تغییر زبان",
  ar: "تغيير اللغة",
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname() || "/en"
  const accessibleName = switcherLabel[locale] ?? switcherLabel.en

  function switchTo(target: Locale) {
    setLocalePreference(target)

    const parts = pathname.split("/")
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
      parts[1] = target
      router.push(parts.join("/") || `/${target}`)
    } else {
      router.push(`/${target}`)
    }
  }

  const label = locale.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={accessibleName}
          className="shrink-0 bg-transparent flex gap-2 w-9 md:w-auto"
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          <span className="hidden md:inline">{label}</span>
          <span className="sr-only">{accessibleName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[105px]">
        <DropdownMenuItem onClick={() => switchTo("en")} className={locale === "en" ? "font-semibold" : undefined}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTo("fa")} className={locale === "fa" ? "font-semibold" : undefined}>
          FA
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTo("ar")} className={locale === "ar" ? "font-semibold" : undefined}>
          AR
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
