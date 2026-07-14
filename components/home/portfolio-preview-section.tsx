"use client"

import Link from "next/link"
import { Children, useCallback, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  locale: Locale
  title: string
  subtitle: string
  viewAll: string
  baseHref: string
  children: ReactNode
}

function getSlidesPerView(el: HTMLElement) {
  const slides = Array.from(el.children) as HTMLElement[]
  if (slides.length === 0) return 1

  const gap = 16
  const slideWidth = slides[0].offsetWidth
  if (slideWidth <= 0) return 1

  return Math.max(1, Math.min(slides.length, Math.floor((el.clientWidth + gap) / (slideWidth + gap))))
}

function getPageCount(el: HTMLElement) {
  const slides = Array.from(el.children) as HTMLElement[]
  if (slides.length === 0) return 0

  const slidesPerView = getSlidesPerView(el)
  return Math.max(1, slides.length - slidesPerView + 1)
}

function getActivePage(el: HTMLElement) {
  const slides = Array.from(el.children) as HTMLElement[]
  if (slides.length === 0) return 0

  const pages = getPageCount(el)
  if (pages <= 1) return 0

  const containerLeft = el.scrollLeft
  const containerRight = containerLeft + el.clientWidth
  let bestIndex = 0
  let bestVisible = 0

  slides.forEach((slide, index) => {
    const slideLeft = slide.offsetLeft
    const slideRight = slideLeft + slide.offsetWidth
    const visible = Math.min(slideRight, containerRight) - Math.max(slideLeft, containerLeft)
    if (visible > bestVisible) {
      bestVisible = visible
      bestIndex = index
    }
  })

  return Math.min(pages - 1, bestIndex)
}

export function PortfolioPreviewSection({
  locale,
  title,
  subtitle,
  viewAll,
  baseHref,
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [activePage, setActivePage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const rtl = isRTL(locale)
  const slideCount = useMemo(() => Children.count(children), [children])
  const dotLabel = {
    en: (index: number) => `Go to slide ${index + 1}`,
    fa: (index: number) => `رفتن به اسلاید ${index + 1}`,
    ar: (index: number) => `الانتقال إلى الشريحة ${index + 1}`,
  }[locale]

  const updatePagination = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    setPageCount(getPageCount(el))
    setActivePage(getActivePage(el))
  }, [])

  const scrollToPage = useCallback((pageIndex: number) => {
    const el = scrollRef.current
    if (!el) return

    const slide = el.children[pageIndex] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
    setActivePage(pageIndex)
  }, [])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return
      dragState.current = {
        active: true,
        moved: false,
        startX: event.pageX,
        scrollLeft: el.scrollLeft,
      }
      el.classList.add("cursor-grabbing")
    }

    const onMouseUp = () => {
      dragState.current.active = false
      el.classList.remove("cursor-grabbing")
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!dragState.current.active) return
      const walk = event.pageX - dragState.current.startX
      if (Math.abs(walk) > 4) {
        dragState.current.moved = true
        event.preventDefault()
      }
      if (!dragState.current.moved) return
      el.scrollLeft = dragState.current.scrollLeft - walk
    }

    const onClick = (event: MouseEvent) => {
      if (!dragState.current.moved) return
      event.preventDefault()
      event.stopPropagation()
      dragState.current.moved = false
    }

    el.addEventListener("mousedown", onMouseDown)
    el.addEventListener("click", onClick, true)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("mousemove", onMouseMove)
    el.addEventListener("scroll", updatePagination, { passive: true })
    window.addEventListener("resize", updatePagination)

    updatePagination()

    return () => {
      el.removeEventListener("mousedown", onMouseDown)
      el.removeEventListener("click", onClick, true)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("scroll", updatePagination)
      window.removeEventListener("resize", updatePagination)
    }
  }, [slideCount, updatePagination])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || slideCount === 0) return

    const ctx = gsap.context(() => {
      const headerEls = gsap.utils.toArray<HTMLElement>("[data-portfolio-header]")
      const cards = gsap.utils.toArray<HTMLElement>("[data-portfolio-card]")

      if (cards.length === 0) return

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 28%",
            toggleActions: "play reverse play reverse",
          },
        })
        .fromTo(headerEls, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.06 })
        .fromTo(
          cards,
          {
            y: 36,
            opacity: 0,
            scale: 0.92,
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.52,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        )
    }, section)

    return () => ctx.revert()
  }, [slideCount])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-start">
            <h2
              data-portfolio-header
              className="text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl"
            >
              {title}
            </h2>
            <p data-portfolio-header className="mt-3 text-muted-foreground opacity-0">
              {subtitle}
            </p>
          </div>
          <Link href={`${baseHref}/portfolio`} data-portfolio-header className="opacity-0">
            <Button variant="outline">{viewAll}</Button>
          </Link>
        </div>

        <div data-portfolio-carousel className="relative mt-10">
          <div
            ref={scrollRef}
            dir={rtl ? "rtl" : "ltr"}
            className={cn(
              "flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2",
              "snap-x snap-mandatory touch-pan-x",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "cursor-grab select-none",
            )}
          >
            {Children.map(children, (child, index) => (
              <div
                key={index}
                className="w-[min(100%,340px)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.67rem)]"
              >
                {child}
              </div>
            ))}
          </div>

          {pageCount > 1 ? (
            <div
              data-portfolio-dots
              className="mt-6 flex items-center justify-center gap-1.5"
              role="tablist"
              aria-label={locale === "fa" ? "اسلایدها" : locale === "ar" ? "الشرائح" : "Slides"}
            >
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  onClick={() => scrollToPage(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === activePage
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={dotLabel(index + 1)}
                  aria-selected={index === activePage}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
