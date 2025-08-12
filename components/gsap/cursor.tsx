"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function FancyCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Decide whether to enable the custom cursor (pointer: fine only)
  useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const isCoarsePointer = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches
    setEnabled(!(isTouch || isCoarsePointer))
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const inner = innerRef.current
    if (!dot || !inner) return

    // Outer circle movement
    const qxOuter = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3.out" })
    const qyOuter = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3.out" })

    // Inner circle movement (slower for a trailing effect)
    const qxInner = gsap.quickTo(inner, "x", { duration: 0.35, ease: "power3.out" })
    const qyInner = gsap.quickTo(inner, "y", { duration: 0.35, ease: "power3.out" })

    const move = (e: MouseEvent) => {
      qxOuter(e.clientX)
      qyOuter(e.clientY)
      qxInner(e.clientX)
      qyInner(e.clientY)
    }

    // Click animations for outer and inner
    const down = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.2, ease: "power3.out" })
      gsap.to(inner, { scale: 0.5, duration: 0.2, ease: "power3.out" })
    }
    const up = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power3.out" })
      gsap.to(inner, { scale: 1, duration: 0.2, ease: "power3.out" })
    }

    const enterInteractive = () => {
      gsap.to(dot, { scale: 2, duration: 0.2, ease: "power3.out" })
      gsap.to(inner, { scale: 0, duration: 0.2, ease: "power3.out" })
    }
    const leaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power3.out" })
      gsap.to(inner, { scale: 1, duration: 0.2, ease: "power3.out" })
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)

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
  }, [enabled])

  return (
    enabled ? (
      <>
        {/* Outer Circle */}
        <div
          ref={dotRef}
          aria-hidden="true"
          className="fancy-cursor pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
        />
        {/* Inner Circle */}
        <div
          ref={innerRef}
          aria-hidden="true"
          className="fancy-cursor pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        />
      </>
    ) : null
  )
}
