import Link from "next/link"
import { FileText, ShieldCheck } from "lucide-react"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { getDictionary, isRTL, type Locale } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { CookieSettingsLink } from "@/components/cookie-settings-link"

export default async function DataProtectionPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const dataProtection = dict.pages.dataProtection
  const rtl = isRTL(params.locale)

  return (
    <main className="container mx-auto px-4 py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <RevealOnScroll>
        <div className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_260px_at_50%_-80px,hsl(var(--primary)/0.18),transparent_60%)]"
          />
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mb-3 text-sm font-medium text-primary">{dataProtection.lastUpdated}</p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{dataProtection.title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{dataProtection.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{dataProtection.intro}</p>
        </div>
      </RevealOnScroll>

      <div className="mt-10 grid gap-4">
        {dataProtection.sections.map((section, index) => (
          <RevealOnScroll key={section.title}>
            <section className="relative overflow-hidden rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-card text-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <div className="grid gap-3 text-sm leading-7 text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {index === 3 ? <CookieSettingsLink locale={params.locale} /> : null}
                {section.bullets ? (
                  <ul className="grid gap-2 pt-1">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className="mt-10">
        <section className="relative overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-sm backdrop-blur">
          <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <h2 className="text-xl font-semibold">{dataProtection.contactCta.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{dataProtection.contactCta.body}</p>
          <Button asChild className="mt-5">
            <Link href={`/${params.locale}/contact`}>{dataProtection.contactCta.button}</Link>
          </Button>
        </section>
      </RevealOnScroll>
    </main>
  )
}
