"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Skip Lenis on coarse pointers — native scroll is smoother and cheaper on touch.
    if (window.matchMedia("(pointer: coarse)").matches) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Keep ScrollTrigger in sync without forcing a full refresh every frame.
    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on("scroll", onScroll)

    // Debounce refresh — ResizeObserver used to call refresh on every layout
    // tick while images/sections loaded, which made the homepage feel laggy.
    let refreshTimer = 0
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener("load", scheduleRefresh)

    const resizeObserver = new ResizeObserver(scheduleRefresh)
    resizeObserver.observe(document.body)

    const initialRefresh = window.setTimeout(scheduleRefresh, 600)

    return () => {
      window.removeEventListener("load", scheduleRefresh)
      resizeObserver.disconnect()
      window.clearTimeout(initialRefresh)
      window.clearTimeout(refreshTimer)
      cancelAnimationFrame(rafId)
      lenis.off("scroll", onScroll)
      lenis.destroy()
    }
  }, [])

  return null
}
