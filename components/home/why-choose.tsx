"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const SWIPE_THRESHOLD = 50
const STACK_OFFSET = 10
const CARD_SIZE = 288

const CARD_SWITCH_SOUND_SRC = "/media/pop.mp3"

let cardSwitchAudio: HTMLAudioElement | null = null

function playCardSwitchSound() {
  if (typeof window === "undefined") return

  try {
    if (!cardSwitchAudio) {
      cardSwitchAudio = new Audio(CARD_SWITCH_SOUND_SRC)
      cardSwitchAudio.preload = "auto"
    }

    cardSwitchAudio.currentTime = 0
    void cardSwitchAudio.play()
  } catch {
    // Audio may be blocked until a user gesture occurs.
  }
}

function formatStep(index: number, locale: Locale) {
  const value = index + 1

  if (locale === "fa") {
    return value.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })
  }

  if (locale === "ar") {
    return value.toLocaleString("ar-EG", { minimumIntegerDigits: 2 })
  }

  return String(value).padStart(2, "0")
}

export function WhyChoose({
  locale,
  eyebrow,
  title,
  subtitle,
  swipeHint,
  bullets,
}: {
  locale: Locale
  eyebrow: string
  title: string
  subtitle: string
  swipeHint: string
  bullets: string[]
}) {
  const rtl = isRTL(locale)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToIndex = useCallback((nextIndex: number) => {
    setActiveIndex((prev) => {
      if (prev === nextIndex) return prev
      playCardSwitchSound()
      return nextIndex
    })
  }, [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const headerItems = gsap.utils.toArray<HTMLElement>("[data-why-header]")
      const stack = section.querySelector<HTMLElement>("[data-why-stack]")
      const dots = section.querySelector<HTMLElement>("[data-why-dots]")

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 28%",
          toggleActions: "play reverse play reverse",
        },
      })

      timeline.fromTo(
        headerItems,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, stagger: 0.06 }
      )

      if (stack) {
        timeline.fromTo(
          stack,
          { y: 24, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          "-=0.18"
        )
      }

      if (dots) {
        timeline.fromTo(
          dots,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          "-=0.2"
        )
      }
    }, section)

    return () => ctx.revert()
  }, [bullets.length, rtl])

  const cards = bullets.map((bullet, index) => ({
    id: String(index),
    index,
    bullet,
  }))

  const getStackOrder = () => {
    const reordered = []

    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }

    return reordered.reverse()
  }

  const getStackStyles = (stackPosition: number) => {
    const offset = stackPosition * STACK_OFFSET

    return {
      top: offset,
      left: offset,
      zIndex: cards.length - stackPosition,
      rotate: (stackPosition - 1) * 2,
    }
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const direction = rtl ? -1 : 1
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x * direction < -SWIPE_THRESHOLD || swipe * direction < -1000) {
      goToIndex((activeIndex + 1) % cards.length)
    } else if (offset.x * direction > SWIPE_THRESHOLD || swipe * direction > 1000) {
      goToIndex((activeIndex - 1 + cards.length) % cards.length)
    }

  }

  const stackHeight = CARD_SIZE + (cards.length - 1) * STACK_OFFSET

  return (
    <section ref={sectionRef} className="py-16 md:py-24" dir={rtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div
              className={cn(
                "lg:col-span-4 xl:col-span-5",
                rtl ? "text-right" : "text-left"
              )}
            >
              <div
                data-why-header
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary opacity-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
              <h2
                data-why-header
                className="mt-5 text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl"
              >
                {title}
              </h2>
              <p
                data-why-header
                className="mt-4 max-w-md text-sm leading-7 text-muted-foreground opacity-0 md:text-base"
              >
                {subtitle}
              </p>
            </div>

            <div className="lg:col-span-8 xl:col-span-7">
              <LayoutGroup>
                <motion.div
                  layout
                  data-why-stack
                  className="relative mx-auto size-72 opacity-0"
                  style={{ height: stackHeight }}
                >
                  <AnimatePresence mode="popLayout">
                    {getStackOrder().map((card) => {
                      const styles = getStackStyles(card.stackPosition)
                      const isTopCard = card.stackPosition === 0

                      return (
                        <motion.article
                          key={card.id}
                          layoutId={card.id}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            ...styles,
                          }}
                          exit={{ opacity: 0, scale: 0.92, x: rtl ? 200 : -200 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          drag={isTopCard ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.7}
                          onDragEnd={handleDragEnd}
                          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                          className={cn(
                            "absolute left-0 size-72 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
                            "hover:border-primary/40 transition-colors",
                            isTopCard && "cursor-grab active:cursor-grabbing"
                          )}
                        >
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                          >
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-2xl" />
                            <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-blue-500/8 blur-2xl" />
                          </div>

                          <div
                            className={cn(
                              "relative z-10 flex h-full w-full flex-col items-start gap-4 p-5",
                              rtl ? "text-right" : "text-left"
                            )}
                          >
                            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-base font-semibold text-primary shadow-sm">
                              {formatStep(card.index, locale)}
                            </span>
                            <p
                              className={cn(
                                "line-clamp-5 w-full flex-1 text-sm leading-7 text-foreground/90",
                                rtl ? "text-right" : "text-left"
                              )}
                            >
                              {card.bullet}
                            </p>

                            {isTopCard && cards.length > 1 && (
                              <p
                                className={cn(
                                  "w-full text-xs text-muted-foreground/50",
                                  rtl ? "text-right" : "text-center"
                                )}
                              >
                                {swipeHint}
                              </p>
                            )}
                          </div>
                        </motion.article>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>

              {cards.length > 1 && (
                <div data-why-dots className="mt-6 flex justify-center gap-1.5 opacity-0">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        index === activeIndex
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                      aria-label={`${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  )
}
