"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Spline from "@splinetool/react-spline"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  scroll,
  baseHref = "/en",
}: {
  eyebrow: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  stats: { value: string; label: string }[]
  scroll: string
  baseHref?: string
  align?: "start" | "center" | "end"
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo("[data-hero-eyebrow]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 })
        .fromTo("[data-hero-title]",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, "-=0.4")
        .fromTo("[data-hero-subtitle]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
        .fromTo("[data-hero-ctas] > *",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 }, "-=0.45")
        .fromTo("[data-hero-stats] > *",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 }, "-=0.35")
        .fromTo("[data-hero-visual]",
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, "<-=1.1")
    }, rootRef)

    const onMove = (e: MouseEvent) => {
      if (!rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      const rx = (e.clientX - rect.left) / rect.width
      const ry = (e.clientY - rect.top) / rect.height

      gsap.to(blob1Ref.current, {
        x: rx * 40 - 20,
        y: ry * 40 - 20,
        duration: 1.4,
        ease: "power2.out",
      })
      gsap.to(blob2Ref.current, {
        x: -(rx * 30 - 15),
        y: -(ry * 30 - 15),
        duration: 1.8,
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
    <section ref={rootRef} className="relative flex min-h-[92vh] items-center overflow-hidden">

      {/* ── Background layers ─────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Top radial glow: #a30098 → medium blue sweep */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% -5%, rgb(163 0 152 / 0.14), rgb(37 99 235 / 0.08) 55%, transparent 80%)",
          }}
        />
      </div>

      {/* Floating blobs (parallax on mouse) */}
      <div
        ref={blob1Ref}
        aria-hidden
        className="pointer-events-none absolute -left-48 -top-48 h-[680px] w-[680px] rounded-full blur-[130px]"
        style={{ background: "rgb(163 0 152 / 0.18)" }}
      />
      <div
        ref={blob2Ref}
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full blur-[120px]"
        style={{ background: "rgb(37 99 235 / 0.16)" }}
      />

      {/* ── Main grid ─────────────────────────────────────────── */}
      <div className="container relative mx-auto grid items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-40 lg:pb-28">

        {/* Left column — copy */}
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-start">

          {/* Eyebrow badge */}
          <span
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{
              borderColor: "rgb(163 0 152 / 0.3)",
              background: "rgb(163 0 152 / 0.08)",
              color: "#a30098",
            }}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {eyebrow}
          </span>

          {/* Headline */}
          <h1
            data-hero-title
            className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            data-hero-subtitle
            className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {subtitle}
          </p>

          {/* CTA buttons */}
          <div data-hero-ctas className="flex flex-col gap-3 sm:flex-row">
            <Link href={`${baseHref}/contact`}>
              <Button size="lg" className="group w-full gap-2 sm:w-auto">
                {ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href={`${baseHref}/services`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {ctaSecondary}
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div
            data-hero-stats
            className="mt-1 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border/40 pt-6 lg:justify-start"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5 lg:items-start">
                <span className="text-2xl font-bold tracking-tight">{s.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Spline visual */}
        <div data-hero-visual className="relative flex items-center justify-center">
          {/* Glow behind card: #a30098 → blue */}
          <div
            aria-hidden
            className="absolute inset-4 -z-10 blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgb(163 0 152 / 0.22) 0%, rgb(37 99 235 / 0.14) 55%, transparent 80%)",
            }}
          />

          {/* Card frame */}
          <div className="w-full overflow-hidden border border-border/50 bg-background/40 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-border/30 dark:shadow-black/30" style={{
    borderRadius: "88% 12% 86% 14% / 24% 78% 22% 76%",
  }}>
            {/* Thin inner highlight */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"  style={{
    borderRadius: "88% 12% 86% 14% / 24% 78% 22% 76%",
  }}/>

            <div className="aspect-[4/3] w-full lg:aspect-square">
              <Spline
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none opacity-35">
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{scroll}</span>
        <div className="h-7 w-px animate-pulse bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  )
}
