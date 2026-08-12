"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const SmoothScroll = dynamic(
  () => import("@/components/gsap/smooth-scroll").then((m) => ({ default: m.SmoothScroll })),
  { ssr: false },
)

const FancyCursor = dynamic(
  () => import("@/components/gsap/cursor").then((m) => ({ default: m.FancyCursor })),
  { ssr: false },
)

/** Load Lenis/GSAP cursor after first paint so they don't compete with LCP. */
export function DeferredChrome() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 1800 })
      return () => w.cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(start, 1)
    return () => window.clearTimeout(id)
  }, [])

  if (!ready) return null

  return (
    <>
      <SmoothScroll />
      <FancyCursor />
    </>
  )
}
