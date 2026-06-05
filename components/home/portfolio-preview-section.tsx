"use client"

import Link from "next/link"
import { useLayoutEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  title: string
  subtitle: string
  viewAll: string
  baseHref: string
  itemsCount: number
  children: ReactNode
}

export function PortfolioPreviewSection({
  title,
  subtitle,
  viewAll,
  baseHref,
  itemsCount,
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || itemsCount === 0) return

    const ctx = gsap.context(() => {
      const headerEls = gsap.utils.toArray<HTMLElement>("[data-portfolio-header]")
      const grid = section.querySelector<HTMLElement>("[data-portfolio-grid]")
      const cards = gsap.utils.toArray<HTMLElement>("[data-portfolio-card]")

      if (!grid || cards.length === 0) return

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 28%",
            toggleActions: "play reverse play reverse",
          },
        })
        .fromTo(headerEls, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.06 })
        .fromTo(
          cards,
          {
            y: 36,
            opacity: 0,
            scale: 0.88,
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.52,
            stagger: 0.11,
            ease: "power2.out",
          },
          "-=0.2"
        )
    }, section)

    return () => ctx.revert()
  }, [itemsCount])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-start">
            <h2
              data-portfolio-header
              className="text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl"
            >
              {title}
            </h2>
            <p data-portfolio-header className="mt-3 text-muted-foreground opacity-0">
              {subtitle}
            </p>
          </div>
          <Link href={`${baseHref}/portfolio`} data-portfolio-header className="opacity-0">
            <Button variant="outline">{viewAll}</Button>
          </Link>
        </div>

        <div
          data-portfolio-grid
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {children}
        </div>
      </div>
    </section>
  )
}
