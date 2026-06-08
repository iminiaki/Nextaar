"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Compass,
  Home,
  Mail,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { getNotFoundCopy, isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function format404(locale: Locale) {
  if (locale === "fa") return "۴۰۴"
  if (locale === "ar") return "٤٠٤"
  return "404"
}

function getQuickLinks(locale: Locale) {
  const labels = {
    en: { services: "Services", portfolio: "Portfolio", blog: "Blog", contact: "Contact" },
    fa: { services: "خدمات", portfolio: "نمونه کارها", blog: "بلاگ", contact: "تماس" },
    ar: { services: "الخدمات", portfolio: "الأعمال", blog: "المدونة", contact: "اتصل" },
  }[locale]

  return [
    { label: labels.services, href: `/${locale}/services` },
    { label: labels.portfolio, href: `/${locale}/portfolio` },
    { label: labels.blog, href: `/${locale}/blog` },
    { label: labels.contact, href: `/${locale}/contact` },
  ]
}

export function NotFoundPage({ locale: localeProp }: { locale?: Locale }) {
  const { locale: contextLocale } = useLocale()
  const locale = localeProp ?? contextLocale
  const rtl = isRTL(locale)
  const copy = getNotFoundCopy(locale)
  const quickLinks = useMemo(() => getQuickLinks(locale), [locale])
  const rootRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const displayCode = format404(locale)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(
        "[data-nf-code]",
        { y: 48, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 },
      )
        .fromTo(
          "[data-nf-eyebrow]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.55",
        )
        .fromTo(
          "[data-nf-title]",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.4",
        )
        .fromTo(
          "[data-nf-subtitle]",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.45",
        )
        .fromTo(
          "[data-nf-actions] > *",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          "[data-nf-link]",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.45 },
          "-=0.25",
        )

      gsap.to(codeRef.current, {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, rootRef)

    const onMove = (e: MouseEvent) => {
      if (!rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      const rx = (e.clientX - rect.left) / rect.width
      const ry = (e.clientY - rect.top) / rect.height

      gsap.to(blob1Ref.current, {
        x: rx * 36 - 18,
        y: ry * 36 - 18,
        duration: 1.5,
        ease: "power2.out",
      })
      gsap.to(blob2Ref.current, {
        x: -(rx * 28 - 14),
        y: -(ry * 28 - 14),
        duration: 1.7,
        ease: "power2.out",
      })
    }

    const node = rootRef.current
    node?.addEventListener("mousemove", onMove)
    return () => {
      node?.removeEventListener("mousemove", onMove)
      ctx.revert()
    }
  }, [])

  return (
    <div data-not-found-page>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 60% at 50% 0%, rgb(163 0 152 / 0.16), rgb(37 99 235 / 0.08) 52%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(163 0 152 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(37 99 235 / 0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
        <div
          ref={blob1Ref}
          className="absolute -start-40 -top-32 h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ background: "rgb(163 0 152 / 0.2)" }}
        />
        <div
          ref={blob2Ref}
          className="absolute -bottom-40 -end-24 h-[480px] w-[480px] rounded-full blur-[110px]"
          style={{ background: "rgb(37 99 235 / 0.18)" }}
        />
      </div>

      <section
        ref={rootRef}
        dir={rtl ? "rtl" : "ltr"}
        className="relative z-10 flex min-h-screen items-center overflow-hidden py-20 md:py-28"
      >
        <div className="container relative mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div ref={codeRef} data-nf-code className="relative mb-8 select-none">
            <motion.div
              aria-hidden
              className="absolute inset-0 blur-3xl"
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgb(163 0 152 / 0.45) 0%, rgb(37 99 235 / 0.25) 45%, transparent 72%)",
              }}
            />

            <div className="relative flex items-center justify-center gap-1 sm:gap-2">
              {displayCode.split("").map((digit, index) => (
                <motion.span
                  key={`${digit}-${index}`}
                  className={cn(
                    "relative font-black leading-none tracking-tighter",
                    index === 1 ? "text-[clamp(7rem,24vw,13rem)]" : "text-[clamp(6rem,20vw,11rem)]",
                  )}
                  animate={{ y: index === 1 ? [0, -8, 0] : [0, 6, 0] }}
                  transition={{
                    duration: 2.6 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                  style={{
                    background: "linear-gradient(135deg, #a30098 0%, #6366f1 45%, #2563eb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 80px rgb(163 0 152 / 0.25)",
                  }}
                >
                  {digit}
                </motion.span>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-[0.14]"
            >
              <Compass className="h-[clamp(8rem,22vw,12rem)] w-[clamp(8rem,22vw,12rem)] text-primary" />
            </div>
          </div>

          <span
            data-nf-eyebrow
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
            style={{
              borderColor: "rgb(163 0 152 / 0.28)",
              background: "rgb(163 0 152 / 0.08)",
              color: "#a30098",
            }}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {copy.eyebrow}
          </span>

          <h1
            data-nf-title
            className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl rtl:leading-normal"
          >
            {copy.title}
          </h1>

          <p
            data-nf-subtitle
            className="mt-4 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
          >
            {copy.subtitle}
          </p>

          <div data-nf-actions className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${locale}`}>
              <Button size="lg" className="group rounded-full px-7">
                <Home className="me-2 h-4 w-4" />
                {copy.homeCta}
                <ArrowRight
                  className={cn(
                    "ms-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1",
                    rtl && "rotate-180 group-hover:-translate-x-1",
                  )}
                />
              </Button>
            </Link>
            <Link href={`/${locale}/services`}>
              <Button size="lg" variant="outline" className="rounded-full bg-background/70 px-7 backdrop-blur-sm">
                {copy.exploreCta}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="ghost" className="rounded-full px-6">
                <Mail className="me-2 h-4 w-4" />
                {copy.contactCta}
              </Button>
            </Link>
          </div>

          <div className="mt-12 w-full max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {copy.quickLinksTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nf-link
                  className="rounded-full border border-border/70 bg-background/75 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
