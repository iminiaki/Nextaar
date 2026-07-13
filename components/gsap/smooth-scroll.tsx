"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on("scroll", onScroll)
    requestAnimationFrame(raf)

    // Bottom sections (reviews, partners) sit below async content and
    // lazy-loaded images, so the page keeps growing after ScrollTrigger
    // measured its positions. Refresh once everything settles, and whenever
    // the document height changes, so their reveal triggers stay accurate.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)

    const initialRefresh = window.setTimeout(refresh, 500)

    return () => {
      window.removeEventListener("load", refresh)
      resizeObserver.disconnect()
      window.clearTimeout(initialRefresh)
      lenis.off("scroll", onScroll)
      lenis.destroy()
    }
  }, [])

  return null
}
