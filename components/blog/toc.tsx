"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { isRTL, type Locale } from "@/lib/i18n"

type TocItem = { id: string; text: string; level: number }
type PathMetrics = { pathD: string; tops: number[]; bottoms: number[] }

const ITEM_H = 28
const PAD = 5
const X_A = 8.5
const X_B = 16.5
const SVG_W = 24.5
const LINE_OUTSET = 0
const TOC_EASE = "cubic-bezier(0.16, 1, 0.3, 1)"
const TOC_DURATION = "420ms"

function buildSnakePath(count: number) {
  if (count <= 0) return ""

  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = i % 2 === 0 ? X_A : X_B
    const yStart = i * ITEM_H + PAD
    const yEnd = i * ITEM_H + (ITEM_H - PAD)

    if (i === 0) parts.push(`M${x} ${yStart}`)
    parts.push(`L${x} ${yEnd}`)

    if (i < count - 1) {
      const nextX = (i + 1) % 2 === 0 ? X_A : X_B
      const nextYStart = (i + 1) * ITEM_H + PAD
      parts.push(`C ${x} ${yEnd + 8} ${nextX} ${yEnd + 3} ${nextX} ${nextYStart}`)
    }
  }

  return ` ${parts.join(" ")}`
}

function measurePathMetrics(count: number): PathMetrics {
  const pathD = buildSnakePath(count)
  const tops: number[] = []
  const bottoms: number[] = []

  if (!pathD || typeof document === "undefined") {
    return { pathD, tops, bottoms }
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", pathD)
  svg.appendChild(path)
  svg.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;width:0;height:0"
  document.body.appendChild(svg)

  const total = path.getTotalLength()

  for (let i = 0; i < count; i++) {
    const x = i % 2 === 0 ? X_A : X_B
    const yTop = i * ITEM_H + PAD
    const yBottom = i * ITEM_H + (ITEM_H - PAD)

    let bestTop = 0
    let bestBottom = 0
    let bestTopDist = Number.POSITIVE_INFINITY
    let bestBottomDist = Number.POSITIVE_INFINITY

    for (let d = 0; d <= total; d += 0.75) {
      const point = path.getPointAtLength(d)
      const topDist = Math.hypot(point.x - x, point.y - yTop)
      const bottomDist = Math.hypot(point.x - x, point.y - yBottom)
      if (topDist < bestTopDist) {
        bestTopDist = topDist
        bestTop = d
      }
      if (bottomDist < bestBottomDist) {
        bestBottomDist = bottomDist
        bestBottom = d
      }
    }

    tops.push(bestTop)
    bottoms.push(bestBottom)
  }

  document.body.removeChild(svg)
  return { pathD, tops, bottoms }
}

export function BlogTOC({ containerId, locale }: { containerId: string; locale?: Locale }) {
  const rtl = locale ? isRTL(locale) : false
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")
  const [dotAtBottom, setDotAtBottom] = useState(true)
  const [finishBurst, setFinishBurst] = useState(false)
  const [metrics, setMetrics] = useState<PathMetrics>({ pathD: "", tops: [], bottoms: [] })

  const scrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevIndexRef = useRef(0)
  const headingElsRef = useRef<HTMLElement[]>([])
  const rafRef = useRef(0)
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const noHeadingsText =
    locale === "fa" ? "عنوانی یافت نشد" : locale === "ar" ? "لا توجد عناوين" : "No headings"

  const pathD = buildSnakePath(headings.length)
  const svgH = Math.max(headings.length * ITEM_H, ITEM_H)

  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeId)
  )

  const bounds = {
    top: activeIndex * ITEM_H + PAD,
    bottom: activeIndex * ITEM_H + (ITEM_H - PAD),
  }

  const offsetDistance = dotAtBottom
    ? (metrics.bottoms[activeIndex] ?? 0)
    : (metrics.tops[activeIndex] ?? 0)

  useLayoutEffect(() => {
    if (!headings.length) {
      setMetrics({ pathD: "", tops: [], bottoms: [] })
      return
    }
    setMetrics(measurePathMetrics(headings.length))
  }, [headings.length])

  const atEnd = headings.length > 1 && activeIndex === headings.length - 1

  useEffect(() => {
    if (activeIndex === prevIndexRef.current) return
    if (activeIndex > prevIndexRef.current) {
      setDotAtBottom(true)
    } else {
      setDotAtBottom(false)
    }
    prevIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    if (!atEnd) {
      setFinishBurst(false)
      return
    }
    setFinishBurst(true)
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current)
    finishTimeoutRef.current = setTimeout(() => setFinishBurst(false), 1400)
    return () => {
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current)
    }
  }, [atEnd])

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    let cancelled = false

    const collect = () => {
      const nodes = Array.from(container.querySelectorAll<HTMLElement>("h1, h2, h3"))
      nodes.forEach((el, i) => {
        if (!el.id) el.id = `${el.tagName.toLowerCase()}-${i}`
      })
      headingElsRef.current = nodes

      const next: TocItem[] = nodes.map((el) => ({
        id: el.id,
        text: el.innerText.trim(),
        level: Number(el.tagName.substring(1)),
      }))

      if (cancelled) return
      setHeadings(next)
      if (next[0]) {
        setActiveId((prev) => (next.some((h) => h.id === prev) ? prev : next[0].id))
      }
    }

    const pickActive = () => {
      if (scrollingRef.current) return
      const nodes = headingElsRef.current
      if (!nodes.length) return

      let current = nodes[0]?.id ?? ""
      const marker = window.innerHeight * 0.28
      for (const el of nodes) {
        if (el.getBoundingClientRect().top <= marker) current = el.id
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        pickActive()
      })
    }

    collect()
    const retry = window.setTimeout(collect, 250)

    window.addEventListener("scroll", onScroll, { passive: true })
    pickActive()

    return () => {
      cancelled = true
      window.clearTimeout(retry)
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [containerId])

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    const nextIndex = headings.findIndex((heading) => heading.id === id)
    if (nextIndex >= 0) {
      if (nextIndex > prevIndexRef.current) setDotAtBottom(true)
      else if (nextIndex < prevIndexRef.current) setDotAtBottom(false)
      prevIndexRef.current = nextIndex
    }

    setActiveId(id)
    scrollingRef.current = true
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

    target.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(null, "", `#${id}`)

    scrollTimeoutRef.current = setTimeout(() => {
      scrollingRef.current = false
    }, 700)
  }

  if (headings.length === 0) {
    return <p className="text-sm text-muted-foreground">{noHeadingsText}</p>
  }

  const drawnPath = metrics.pathD || pathD

  return (
    <nav className="relative" aria-label="Table of contents">
      <div className="relative">
        <div
          className="pointer-events-none absolute top-0 z-10 origin-center"
          style={{
            [rtl ? "right" : "left"]: LINE_OUTSET,
            height: svgH,
            width: SVG_W,
            transform: rtl ? "scaleX(-1)" : undefined,
            ["--offset-distance" as string]: `${offsetDistance}px`,
            ["--opacity" as string]: 1,
            ["--toc-duration" as string]: TOC_DURATION,
            ["--track-top" as string]: `${bounds.top}px`,
            ["--track-bottom" as string]: `${bounds.bottom}px`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            viewBox={`0 0 ${SVG_W} ${svgH}`}
            style={{ height: svgH, width: SVG_W }}
          >
            <path
              d={drawnPath}
              className="stroke-border/80 dark:stroke-border/60"
              fill="none"
              strokeLinecap="butt"
              strokeWidth="1.15"
            />
            {atEnd ? (
              <path
                d={drawnPath}
                className="stroke-primary"
                fill="none"
                strokeLinecap="round"
                strokeWidth="1.35"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: finishBurst ? 0 : 1,
                  animation: finishBurst ? "toc-finish-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards" : undefined,
                  filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--primary) 55%, transparent))",
                }}
              />
            ) : null}
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute transition-[clip-path] ease-[cubic-bezier(0.16,1,0.3,1)]"
            viewBox={`0 0 ${SVG_W} ${svgH}`}
            style={{
              height: svgH,
              width: SVG_W,
              transitionDuration: "var(--toc-duration)",
              clipPath:
                "polygon(0 var(--track-top, 0px), 100% var(--track-top, 0px), 100% var(--track-bottom, 0px), 0 var(--track-bottom, 0px))",
            }}
          >
            <path
              d={drawnPath}
              className="stroke-primary"
              fill="none"
              strokeLinecap="butt"
              strokeWidth="1.25"
            />
          </svg>

          <div
            className="absolute left-0 size-2"
            style={{
              offsetPath: `path("${drawnPath}")`,
              offsetDistance: "var(--offset-distance, 0px)",
              offsetRotate: "0deg",
              offsetAnchor: "50% 50%",
              transition: `offset-distance var(--toc-duration) ${TOC_EASE}`,
            }}
          >
            {finishBurst ? (
              <>
                <span
                  className="absolute inset-0 rounded-full border border-primary"
                  style={{ animation: "toc-finish-ring 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                />
                <span
                  className="absolute inset-0 rounded-full border border-primary/70"
                  style={{ animation: "toc-finish-ring 1100ms 80ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                />
                <span
                  className="absolute inset-0 rounded-full bg-primary/30"
                  style={{ animation: "toc-finish-ring 1000ms 40ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                />
              </>
            ) : null}
            <div
              className={[
                "size-2 rounded-full bg-primary opacity-[var(--opacity,0)]",
                "shadow-[0_0_10px_2px_var(--primary),0_0_22px_6px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
                atEnd
                  ? "shadow-[0_0_12px_3px_var(--primary),0_0_28px_8px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                  : "",
              ].join(" ")}
              style={{
                animation: finishBurst ? "toc-finish-dot 700ms cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
              }}
            />
          </div>
        </div>

        <ul className="relative z-0 flex w-full flex-col">
          {headings.map((heading) => {
            const active = activeId === heading.id
            const padStart = heading.level >= 3 ? 36 : 28

            return (
              <li key={heading.id} className="relative z-0" style={{ height: ITEM_H }}>
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToHeading(heading.id)
                  }}
                  onMouseEnter={(event) => {
                    const link = event.currentTarget
                    const viewport = link.querySelector<HTMLElement>("[data-toc-viewport]")
                    const label = link.querySelector<HTMLElement>("[data-toc-label]")
                    if (!viewport || !label) return
                    const overflow = label.scrollWidth - viewport.clientWidth
                    if (overflow <= 1) return
                    const duration = Math.min(Math.max(overflow * 18, 600), 4000)
                    label.style.transitionDuration = `${duration}ms`
                    // Shift toward the end side only — start side stays clipped
                    label.style.transform = `translateX(${rtl ? overflow : -overflow}px)`
                  }}
                  onMouseLeave={(event) => {
                    const label = event.currentTarget.querySelector<HTMLElement>("[data-toc-label]")
                    if (!label) return
                    label.style.transitionDuration = "420ms"
                    label.style.transform = "translateX(0)"
                  }}
                  className={[
                    "flex h-full w-full cursor-pointer items-center text-[13px] font-medium leading-none transition-colors duration-300",
                    active
                      ? "text-primary"
                      : "text-muted-foreground/70 hover:text-foreground",
                    active && atEnd && finishBurst
                      ? "drop-shadow-[0_0_10px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                      : "",
                  ].join(" ")}
                  style={{
                    paddingInlineStart: padStart,
                    transitionTimingFunction: TOC_EASE,
                  }}
                >
                  <span data-toc-viewport className="min-w-0 flex-1 overflow-hidden">
                    <span
                      data-toc-label
                      className="inline-block max-w-none whitespace-nowrap will-change-transform"
                      style={{
                        transitionProperty: "transform",
                        transitionTimingFunction: "linear",
                        transitionDuration: "420ms",
                      }}
                    >
                      {heading.text}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
