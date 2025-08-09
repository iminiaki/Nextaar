"use client"

import type React from "react"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  y?: number
  duration?: number
  staggerChildren?: boolean
  className?: string
}

export function RevealOnScroll({ children, y = 24, duration = 0.8, staggerChildren = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = staggerChildren ? Array.from(el.querySelectorAll("[data-animate]")) : [el]
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger: staggerChildren ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [y, duration, staggerChildren])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
