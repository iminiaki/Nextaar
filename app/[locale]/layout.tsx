import type React from "react"
import { redirect } from "next/navigation"
import { AccentProvider } from "@/components/accent-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"
import { SmoothScroll } from "@/components/gsap/smooth-scroll"
import { FancyCursor } from "@/components/gsap/cursor"
import { getDictionary } from "@/lib/i18n"
import { isLocale, type Locale } from "@/lib/i18n"

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fa" }, { locale: "ar" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const urlLocale = params.locale
  if (!isLocale(urlLocale)) {
    redirect("/en")
  }
  const locale: Locale = urlLocale
  const dict = await getDictionary(locale)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AccentProvider>
        <LocaleProvider locale={locale} />
        <SmoothScroll />
        <FancyCursor />
        <Navbar locale={locale} nav={dict.nav} />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <SiteFooter
          locale={locale}
          office={dict.footer.office}
          quickLinks={dict.footer.quickLinks}
          latestPosts={{
            title: dict.footer.latest.title,
            posts: [
              // Dynamic map can be added; we’ll use generic links to blog root
              { label: "تفاوت سایت وردپرسی با سایت کدنویسی‌شده", href: `/${locale}/blog` },
              { label: "تفاوت وب‌سایت و وب‌اپ", href: `/${locale}/blog` },
              { label: "پروکسی تلگرام چیست؟", href: `/${locale}/blog` },
              { label: "آپدیت جدید tailwind", href: `/${locale}/blog` },
            ],
          }}
          newsletter={{
            title: dict.footer.newsletter.title,
            placeholder: dict.footer.newsletter.placeholder,
            button: dict.footer.newsletter.button,
            success: dict.footer.newsletter.success,
          }}
          rights={dict.footer.rights}
        />
      </AccentProvider>
    </ThemeProvider>
  )
}
