"use client"

import type React from "react"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_START = "top 78%"
const DEFAULT_END = "bottom 28%"

type Props = {
  children: React.ReactNode
  y?: number
  duration?: number
  /** When true, animates each `[data-animate]` descendant with stagger (same trigger = container). */
  staggerChildren?: boolean
  stagger?: number
  className?: string
  /** ScrollTrigger start (default matches portfolio / services sections). */
  start?: string
  end?: string
  /**
   * ScrollTrigger toggleActions (onEnter, onLeave, onEnterBack, onLeaveBack).
   * Default re-hides when scrolling past; use `"play none none none"` for one-shot reveal
   * (e.g. forms with expanding UI so leave-back does not reset opacity).
   */
  toggleActions?: string
}

export function RevealOnScroll({
  children,
  y = 18,
  duration = 0.45,
  staggerChildren = false,
  stagger = 0.08,
  className,
  start = DEFAULT_START,
  end = DEFAULT_END,
  toggleActions = "play reverse play reverse",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const targets: Element[] = staggerChildren
      ? Array.from(el.querySelectorAll("[data-animate]"))
      : [el]

    if (staggerChildren && targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { y, opacity: 0 })
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.out",
          stagger: staggerChildren ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            toggleActions,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y, duration, staggerChildren, stagger, start, end, toggleActions])

  return (
    <div ref={ref} className={cn(!staggerChildren && "opacity-0", className)}>
      {children}
    </div>
  )
}
