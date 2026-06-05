"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Globe } from "@/components/ui/cobe-globe"
import { ArrowRight } from "lucide-react"

const markerPoints = [
  { id: "tehran", location: [35.6892, 51.389] as [number, number] },
  { id: "sf", location: [37.7595, -122.4367] as [number, number] },
  { id: "nyc", location: [40.7128, -74.006] as [number, number] },
  { id: "london", location: [51.5074, -0.1278] as [number, number] },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number] },
  { id: "rome", location: [41.9028, 12.4964] as [number, number] },
  { id: "muscat", location: [23.588, 58.3829] as [number, number] },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number] },
  { id: "paris", location: [48.8566, 2.3522] as [number, number] },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number] },
  { id: "moscow", location: [55.7558, 37.6173] as [number, number] },
  { id: "amsterdam", location: [52.3676, 4.9041] as [number, number] },
  { id: "berlin", location: [52.52, 13.405] as [number, number] },
  { id: "brussels", location: [50.8503, 4.3517] as [number, number] },
  { id: "seoul", location: [37.5665, 126.978] as [number, number] },
] as const

const arcPoints = [
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    fromId: "sf",
    toId: "tokyo",
  },
  {
    id: "nyc-london",
    from: [40.7128, -74.006] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    fromId: "nyc",
    toId: "london",
  },
  {
    id: "sydney-muscat",
    from: [-33.8688, 151.2093] as [number, number],
    to: [23.588, 58.3829] as [number, number],
    fromId: "sydney",
    toId: "muscat",
  },
  {
    id: "berlin-dubai",
    from: [52.52, 13.405] as [number, number],
    to: [25.2048, 55.2708] as [number, number],
    fromId: "berlin",
    toId: "dubai",
  },
  {
    id: "seoul-paris",
    from: [37.5665, 126.978] as [number, number],
    to: [48.8566, 2.3522] as [number, number],
    fromId: "seoul",
    toId: "paris",
  },
  {
    id: "amsterdam-moscow",
    from: [52.3676, 4.9041] as [number, number],
    to: [55.7558, 37.6173] as [number, number],
    fromId: "amsterdam",
    toId: "moscow",
  },
] as const

const cityLabels: Record<
  Locale,
  Record<(typeof markerPoints)[number]["id"], string>
> = {
  en: {
    tehran: "Tehran",
    sf: "San Francisco",
    nyc: "New York",
    london: "London",
    sydney: "Sydney",
    rome: "Rome",
    muscat: "Muscat",
    tokyo: "Tokyo",
    paris: "Paris",
    dubai: "Dubai",
    moscow: "Moscow",
    amsterdam: "Amsterdam",
    berlin: "Berlin",
    brussels: "Brussels",
    seoul: "Seoul",
  },
  fa: {
    tehran: "تهران",
    sf: "سن فرانسیسکو",
    nyc: "نیویورک",
    london: "لندن",
    sydney: "سیدنی",
    rome: "رم",
    muscat: "مسقط",
    tokyo: "توکیو",
    paris: "پاریس",
    dubai: "دبی",
    moscow: "مسکو",
    amsterdam: "آمستردام",
    berlin: "برلین",
    brussels: "بروکسل",
    seoul: "سئول",
  },
  ar: {
    tehran: "طهران",
    sf: "سان فرانسيسكو",
    nyc: "نيويورك",
    london: "لندن",
    sydney: "سيدني",
    rome: "روما",
    muscat: "مسقط",
    tokyo: "طوكيو",
    paris: "باريس",
    dubai: "دبي",
    moscow: "موسكو",
    amsterdam: "أمستردام",
    berlin: "برلين",
    brussels: "بروكسل",
    seoul: "سول",
  },
}

export function CallToAction({
  locale,
  badge,
  title,
  subtitle,
  button,
}: {
  locale: Locale
  badge: string
  title: string
  subtitle: string
  button: { label: string; href: string }
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const globeTheme = useMemo(() => {
    const isDark = mounted && resolvedTheme === "dark"

    return isDark
      ? {
          markerColor: [0.58, 0.68, 1] as [number, number, number],
          baseColor: [0.15, 0.15, 0.15] as [number, number, number],
          arcColor: [0.78, 0.56, 1] as [number, number, number],
          glowColor: [0.2, 0.2, 0.2] as [number, number, number],
          dark: 0.95,
          mapBrightness: 6.5,
          diffuse: 2,
        }
      : {
          markerColor: [0.3, 0.45, 0.85] as [number, number, number],
          baseColor: [1, 1, 1] as [number, number, number],
          arcColor: [0.3, 0.45, 0.85] as [number, number, number],
          glowColor: [0.94, 0.93, 0.91] as [number, number, number],
          dark: 0,
          mapBrightness: 10,
          diffuse: 1.5,
        }
  }, [mounted, resolvedTheme])

  const localizedMarkers = useMemo(() => {
    return markerPoints.map((marker) => ({
      ...marker,
      label: cityLabels[locale][marker.id],
    }))
  }, [locale])

  const localizedArcs = useMemo(() => {
    return arcPoints.map((arc) => ({
      ...arc,
      label: `${cityLabels[locale][arc.fromId]} -> ${cityLabels[locale][arc.toId]}`,
    }))
  }, [locale])

  return (
    <section className="py-8 md:py-24">
      <div className="relative container mx-auto px-4">
      
        <div className="container overflow-visible mx-auto px-4 py-8 rounded-2xl bg-background flex flex-col lg:flex-row items-center justify-center ">
        <div className="w-full max-w-lg">
          <Globe
            markers={localizedMarkers}
            arcs={localizedArcs}
            markerColor={globeTheme.markerColor}
            baseColor={globeTheme.baseColor}
            arcColor={globeTheme.arcColor}
            glowColor={globeTheme.glowColor}
            dark={globeTheme.dark}
            mapBrightness={globeTheme.mapBrightness}
            diffuse={globeTheme.diffuse}
            markerSize={0.025}
            markerElevation={0.01}
          />
        </div>
        <RevealOnScroll className="mx-auto w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-6 text-center shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgb(163 0 152 / 0.25) 0%, rgb(59 130 246 / 0.2) 55%, transparent 80%)",
              }}
            />
            <span className="relative inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
              {badge}
            </span>
            <h3 className="relative mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
              {title}
            </h3>
            <p className="relative mx-auto mt-3 max-w-xl text-pretty text-muted-foreground md:text-base">{subtitle}</p>
            <div className="relative mt-7">
              <Link href={button.href}>
                <Button size="lg" className="group rounded-full px-7">
                  {button.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
      </div>
      
    </section>
  )
}
