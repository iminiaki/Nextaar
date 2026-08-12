"use client"

import { Suspense, lazy, useEffect, useRef } from "react"
import type { Application } from "@splinetool/runtime"

const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const app = appRef.current
        if (!app) return
        if (entry?.isIntersecting) {
          app.play()
        } else {
          app.stop()
        }
      },
      { rootMargin: "120px", threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        }
      >
        <Spline
          scene={scene}
          className="h-full w-full"
          onLoad={(spline) => {
            appRef.current = spline
            const visible =
              containerRef.current &&
              containerRef.current.getBoundingClientRect().bottom > 0 &&
              containerRef.current.getBoundingClientRect().top < window.innerHeight
            if (!visible) spline.stop()
          }}
        />
      </Suspense>
    </div>
  )
}
