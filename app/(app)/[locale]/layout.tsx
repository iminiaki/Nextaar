import type React from "react"
import { redirect } from "next/navigation"
import { AccentProvider } from "@/components/accent-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SmoothScroll } from "@/components/gsap/smooth-scroll"
import { FancyCursor } from "@/components/gsap/cursor"
import { SupportChatbot } from "@/components/support-chatbot"
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
    <AccentProvider>
      <LocaleProvider locale={locale}>
        <SmoothScroll />
        <FancyCursor />
        <div className="relative">
          <Navbar locale={locale} nav={dict.nav} servicesMenu={dict.home.servicesFeatures.items} />
          <main>
            <Breadcrumbs locale={locale} />
            {children}
          </main>
        </div>
        <SiteFooter
          locale={locale}
          office={dict.footer.office}
          quickLinks={dict.footer.quickLinks}
          latestPosts={{
            title: dict.footer.latest.title,
            posts: [
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
        <CookieConsent locale={locale} />
        <SupportChatbot locale={locale} services={dict.home.servicesFeatures.items} office={dict.footer.office} />
      </LocaleProvider>
    </AccentProvider>
  )
}
