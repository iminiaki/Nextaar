"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Locale, locales } from "@/lib/i18n"
import { Globe } from "lucide-react"
import { getDictionary } from "@/lib/i18n"

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname() || "/en"

  function switchTo(target: Locale) {
    const parts = pathname.split("/")
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
      parts[1] = target
      router.push(parts.join("/") || `/${target}`)
    } else {
      router.push(`/${target}`)
    }
  }

  const label = locale === "en" ? "English" : locale === "fa" ? "فارسی" : "العربية"
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    getDictionary(locale).then(setDict)
  }, [locale])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shrink-0 bg-transparent">
          <Globe className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchTo("en")}>
          {dict ? dict.nav.enLangName : "English"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTo("fa")}>
          {dict ? dict.nav.faLangName : "فارسی"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTo("ar")}>
          {dict ? dict.nav.arLangName : "العربية"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}