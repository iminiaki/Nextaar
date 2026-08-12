import type React from "react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { AccentProvider } from "@/components/accent-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DeferredChrome } from "@/components/deferred-chrome"
// import { SupportChatbot } from "@/components/support-chatbot"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getDictionary } from "@/lib/i18n"
import { isLocale, isRTL, type Locale } from "@/lib/i18n"
import { getLatestPostLinks } from "@/lib/latest-posts"
import { getSiteMetadata } from "@/lib/metadata"

// Railway (and other hosts) cannot reach private Postgres during `next build`.
// Render on demand so Payload queries run only at request time.
export const dynamic = "force-dynamic"

/** Sync metadata so <meta name="description"> is present in the initial HTML head. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  return getSiteMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: urlLocale } = await params
  if (!isLocale(urlLocale)) {
    redirect("/en")
  }
  const locale: Locale = urlLocale
  const [dict, latestPostLinks] = await Promise.all([
    getDictionary(locale),
    getLatestPostLinks(locale),
  ])

  return (
    <AccentProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${locale}';document.documentElement.dir='${isRTL(locale) ? "rtl" : "ltr"}';`,
        }}
      />
      <LocaleProvider locale={locale}>
        <DeferredChrome />
        <div className="relative">
          <Navbar locale={locale} nav={dict.nav} servicesMenu={dict.home.servicesFeatures.items} />
          <main className="relative overflow-x-hidden">
            <Suspense fallback={null}>
              <Breadcrumbs locale={locale} />
            </Suspense>
            {children}
          </main>
        </div>
        <SiteFooter
          locale={locale}
          office={dict.footer.office}
          quickLinks={dict.footer.quickLinks}
          latestPosts={{
            title: dict.footer.latest.title,
            posts: latestPostLinks,
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
        {/* <SupportChatbot locale={locale} services={dict.home.servicesFeatures.items} office={dict.footer.office} /> */}
        <WhatsAppButton locale={locale} />
      </LocaleProvider>
    </AccentProvider>
  )
}
