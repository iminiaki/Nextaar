"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function FancyCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    // hide on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouch) {
      dot.style.display = "none"
      return
    }

    const qx = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3.out" })
    const qy = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3.out" })
    const qs = gsap.quickTo(dot, "scale", { duration: 0.2, ease: "power3.out" })

    const move = (e: MouseEvent) => {
      qx(e.clientX)
      qy(e.clientY)
    }
    const down = () => qs(0.7)
    const up = () => qs(1)

    const enterInteractive = () => qs(1.4)
    const leaveInteractive = () => qs(1)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    // grow over links and buttons
    const sel = "a, button, [role='button'], input, textarea, select"
    const enterLeave = (el: Element) => {
      el.addEventListener("mouseenter", enterInteractive)
      el.addEventListener("mouseleave", leaveInteractive)
      return () => {
        el.removeEventListener("mouseenter", enterInteractive)
        el.removeEventListener("mouseleave", leaveInteractive)
      }
    }
    const interactive = Array.from(document.querySelectorAll(sel))
    const cleanups = interactive.map(enterLeave)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      cleanups.forEach((c) => c())
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
    />
  )
}