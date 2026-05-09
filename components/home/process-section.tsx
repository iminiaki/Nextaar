"use client"

import Link from "next/link"
import { useLayoutEffect, useRef } from "react"
import { ArrowRight, ClipboardList, Compass, Rocket, Sparkles } from "lucide-react"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Button } from "@/components/ui/button"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const icons = [Compass, ClipboardList, Sparkles, Rocket] as const

type ProcessStep = {
  title: string
  body: string
}

export function ProcessSection({
  locale,
  eyebrow,
  title,
  subtitle,
  steps,
  primaryCta,
  secondaryCta,
  baseHref,
}: {
  locale: Locale
  eyebrow: string
  title: string
  subtitle: string
  steps: ProcessStep[]
  primaryCta: string
  secondaryCta: string
  baseHref: string
}) {
  const rtl = isRTL(locale)
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const textItems = gsap.utils.toArray<HTMLElement>("[data-process-text]")
      const cards = gsap.utils.toArray<HTMLElement>("[data-process-card]")
      const icons = gsap.utils.toArray<HTMLElement>("[data-process-icon]")
      const numbers = gsap.utils.toArray<HTMLElement>("[data-process-number]")
      const cardCopy = gsap.utils.toArray<HTMLElement>("[data-process-copy]")

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-process-copy-wrap]",
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse",
          },
        })
        .fromTo(
          textItems,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }
        )

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        })
        .fromTo(
          cards,
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08 }
        )
        .fromTo(icons, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, stagger: 0.08 }, "-=0.28")
        .fromTo(numbers, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }, "-=0.24")
        .fromTo(cardCopy, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, stagger: 0.03 }, "-=0.2")
    }, section)

    return () => ctx.revert()
  }, [steps.length])

  return (
    <section ref={sectionRef} className="py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-8 lg:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div data-process-copy-wrap className="lg:col-span-5">
                <p data-process-text className="text-sm font-medium text-primary opacity-0">{eyebrow}</p>
                <h2 data-process-text className="mt-3 text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl">{title}</h2>
                <p data-process-text className="mt-4 text-sm leading-7 text-muted-foreground opacity-0 md:text-base">{subtitle}</p>
                <div data-process-text className="mt-7 flex flex-wrap gap-3 opacity-0">
                  <Button asChild>
                    <Link href={`${baseHref}/contact`}>
                      {primaryCta}
                      <ArrowRight className={cn("h-4 w-4", rtl && "rotate-180")} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`${baseHref}/services`}>{secondaryCta}</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div data-process-grid className="grid gap-4 sm:grid-cols-2">
                  {steps.map((step, index) => {
                    const Icon = icons[index % icons.length]

                    return (
                      <article
                        key={step.title}
                        data-process-card
                        className="group relative overflow-hidden rounded-2xl border bg-background/70 p-5 opacity-0 shadow-sm backdrop-blur transition-colors duration-300 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div aria-hidden className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                        <div className="relative mb-5 flex items-center justify-between">
                          <span data-process-icon className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span data-process-number className="text-4xl font-bold tracking-tight text-primary/10">0{index + 1}</span>
                        </div>
                        <h3 data-process-copy className="relative text-lg font-semibold">{step.title}</h3>
                        <p data-process-copy className="relative mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
