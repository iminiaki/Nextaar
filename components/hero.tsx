"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  baseHref = "/en",
  align = "center",
}: {
  eyebrow: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  baseHref?: string
  align?: "start" | "center" | "end"
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
      tl.fromTo("[data-hero-eyebrow]", { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo("[data-hero-title]", { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4")
        .fromTo("[data-hero-subtitle]", { y: 16, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
        .fromTo("[data-hero-ctas] > *", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08 }, "-=0.5")

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }, rootRef)

    const onMove = (e: MouseEvent) => {
      if (!imgRef.current || !rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(imgRef.current, {
        rotateY: relX * 6,
        rotateX: -relY * 6,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.3,
      })
    }
    const node = rootRef.current
    node?.addEventListener("mousemove", onMove)
    return () => {
      node?.removeEventListener("mousemove", onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div
        ref={rootRef}
        className={cn(
          "container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24"
        )}
      >
        <div className="space-y-5 flex flex-col items-center md:items-start ">
          <div
            data-hero-eyebrow
            className="flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary "
          >
            {eyebrow}
          </div>
          <h1 data-hero-title className="text-center md:text-start text-3xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p data-hero-subtitle className="text-center md:text-start text-muted-foreground md:text-lg">
            {subtitle}
          </p>
          <div
            data-hero-ctas
            className={cn(
              "flex flex-col gap-3 sm:flex-row",
              align === "center" && "sm:justify-center md:justify-start",
            )}
          >
            <Link href={`${baseHref}/contact`}>
              <Button size="lg" className="w-full">{ctaPrimary}</Button>
            </Link>
            <Link href={`${baseHref}/services`}>
              <Button size="lg" variant="outline">
                {ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            ref={imgRef as any}
            src="/lastrounat.webp"
            alt="Product preview"
            width={500}
            height={500}
            className="mx-auto rounded-4xl bg-background object-cover will-change-transform"
            priority
          />
        </div>
      </div>
    </section>
  )
}
