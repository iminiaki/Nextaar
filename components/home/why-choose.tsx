"use client"

import { useLayoutEffect, useRef } from "react"
import { Check } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function WhyChoose({
  title,
  bullets,
}: {
  title: string
  bullets: string[]
}) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const titleElement = section.querySelector("[data-why-title]")
      const items = gsap.utils.toArray<HTMLElement>("[data-why-item]")

      gsap.fromTo(
        titleElement,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleElement,
            start: "top 85%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

      items.forEach((item) => {
        const icon = item.querySelector("[data-why-check]")
        const copy = item.querySelector("[data-why-copy]")

        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        })

        timeline
          .fromTo(
            item,
            { y: 34, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.58 }
          )
          .fromTo(
            icon,
            { scale: 0, rotate: -45, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.34 },
            "-=0.24"
          )
          .fromTo(copy, { x: 10, opacity: 0.65 }, { x: 0, opacity: 1, duration: 0.34 }, "-=0.28")
      })
    }, section)

    return () => ctx.revert()
  }, [bullets.length])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div data-why-title className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <ul className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bullets.map((b, i) => (
            <li
              key={i}
              data-why-item
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-card/60 p-5 opacity-0 shadow-sm backdrop-blur transition-colors hover:border-primary/35"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20"
              />
              <span
                data-why-check
                className="relative mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground opacity-0 shadow-lg shadow-primary/20"
              >
                <Check className="h-4 w-4" />
              </span>
              <span data-why-copy className="relative text-sm leading-7 text-muted-foreground">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
