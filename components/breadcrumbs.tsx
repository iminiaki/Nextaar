"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const routeLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    portfolio: "Portfolio",
    services: "Services",
    terms: "Terms and Conditions",
    "data-protection": "Data Protection",
    "web-development": "Web Development",
    design: "Design",
    "seo-aeo-geo": "SEO, AEO and GEO",
    "ad-campaigns": "Ad Campaigns",
  },
  fa: {
    home: "خانه",
    about: "درباره",
    blog: "بلاگ",
    contact: "تماس",
    portfolio: "نمونه کارها",
    services: "خدمات",
    terms: "شرایط و قوانین",
    "data-protection": "حفاظت از داده ها",
    "web-development": "توسعه وب",
    design: "طراحی",
    "seo-aeo-geo": "خدمات SEO، AEO و GEO",
    "ad-campaigns": "کمپین تبلیغاتی",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    blog: "المدونة",
    contact: "اتصل",
    portfolio: "الأعمال",
    services: "الخدمات",
    terms: "الشروط والأحكام",
    "data-protection": "حماية البيانات",
    "web-development": "تطوير الويب",
    design: "التصميم",
    "seo-aeo-geo": "خدمات SEO وAEO وGEO",
    "ad-campaigns": "حملات إعلانية",
  },
}

function toTitleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getSegmentLabel(segment: string, locale: Locale) {
  return routeLabels[locale][segment] ?? toTitleCase(decodeURIComponent(segment))
}

export function Breadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const rtl = isRTL(locale)
  const segments = pathname.split("/").filter(Boolean)
  const pathLocale = segments[0]
  const routeSegments = pathLocale === locale ? segments.slice(1) : segments

  if (routeSegments.length === 0) return null

  const items = [
    {
      label: routeLabels[locale].home,
      href: `/${locale}`,
    },
    ...routeSegments.map((segment, index) => ({
      label: getSegmentLabel(segment, locale),
      href: `/${locale}/${routeSegments.slice(0, index + 1).join("/")}`,
    })),
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      dir={rtl ? "rtl" : "ltr"}
      className="container mx-auto px-4 pt-20 md:pt-24"
    >
      <ol className="inline-flex max-w-full items-center gap-1 rounded-full border bg-background/75 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex min-w-0 items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 opacity-60", rtl && "rotate-180")} />
              ) : null}
              {isLast ? (
                <span className="max-w-[13rem] truncate font-medium text-foreground md:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex max-w-[10rem] items-center gap-1.5 truncate transition-colors hover:text-foreground md:max-w-xs"
                >
                  {index === 0 ? <Home className="h-3.5 w-3.5 shrink-0" /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
