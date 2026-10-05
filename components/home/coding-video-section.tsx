"use client"

import { RevealOnScroll } from "@/components/gsap/reveal"
import { useEffect, useRef } from "react"

export function CodingVideoSection({
  eyebrow,
  title,
  subtitle,
  stats,
}: {
  eyebrow: string
  title: string
  subtitle: string
  stats: { value: string; label: string }[]
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      video.removeAttribute("autoplay")
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "80px", threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/60 p-1.5 shadow-2xl shadow-black/10 backdrop-blur sm:rounded-[2rem] sm:p-2 dark:shadow-black/40">
            <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
              <video
                ref={videoRef}
                src="/media/coding.mp4"
                aria-hidden="true"
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.62] saturate-125"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,24,147,0.18),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.78))]" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px] opacity-20"
              />

              <div className="relative z-10 flex flex-col gap-8 px-4 py-8 text-center text-white sm:min-h-[26rem] sm:justify-center sm:gap-0 sm:px-6 sm:py-12 md:aspect-video md:min-h-0">
                <div className="mx-auto w-full max-w-3xl">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-100 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.25em]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.9)] animate-pulse" />
                    <span className="truncate">{eyebrow}</span>
                  </span>
                  <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:mt-5 sm:text-5xl md:text-6xl">
                    {title}
                  </h2>
                  <p className="mx-auto my-4 max-w-2xl text-pretty text-sm leading-6 text-white/80 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
                    {subtitle}
                  </p>
                </div>

                <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="grid grid-cols-1 sm:grid-cols-3">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className={[
                          "flex min-h-[4.25rem] flex-col items-center justify-center px-4 py-3 sm:min-h-0 sm:px-5 sm:py-4",
                          index > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-s" : "",
                        ].join(" ")}
                      >
                        <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</div>
                        <div className="mt-1 text-balance text-xs leading-snug text-white/70 sm:text-sm sm:leading-5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
