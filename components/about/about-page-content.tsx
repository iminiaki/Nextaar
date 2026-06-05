"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Eye, Rocket, Users } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { TeamMemberCard } from "@/components/about/team-member-card"

gsap.registerPlugin(ScrollTrigger)

const scrollTriggerDefaults = {
  start: "top 78%",
  end: "bottom 28%",
  toggleActions: "play reverse play reverse" as const,
}

type Member = {
  name: string
  role: string
  photo?: string
  socials?: { github?: string; linkedin?: string; instagram?: string; twitter?: string }
}

export type AboutPageContentProps = {
  locale: Locale
  content: {
    title: string
    subtitle: string
    aboutDescription: { title: string; body: string[] }
    mission: { title: string; body: string[] }
    vision: { title: string; body: string[] }
    team: { title: string; members: Member[] }
  }
}

export function AboutPageContent({ locale, content: c }: AboutPageContentProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const membersCount = c.team?.members?.length ?? 0

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const ease = "power2.out"

      const heroSection = root.querySelector<HTMLElement>("[data-about-section='hero']")
      const heroEls = gsap.utils.toArray<HTMLElement>(heroSection?.querySelectorAll("[data-about-hero]") ?? [])
      if (heroSection && heroEls.length) {
        gsap
          .timeline({
            defaults: { ease },
            scrollTrigger: { ...scrollTriggerDefaults, trigger: heroSection },
          })
          .fromTo(heroEls, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.07 })
      }

      const introSection = root.querySelector<HTMLElement>("[data-about-section='intro']")
      const introCard = introSection?.querySelector<HTMLElement>("[data-about-intro-card]")
      const introInner = gsap.utils.toArray<HTMLElement>(
        introSection?.querySelectorAll("[data-about-intro-el]") ?? []
      )
      if (introSection && introCard && introInner.length) {
        gsap
          .timeline({
            defaults: { ease },
            scrollTrigger: { ...scrollTriggerDefaults, trigger: introSection },
          })
          .fromTo(introCard, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 })
          .fromTo(introInner, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, stagger: 0.07 }, "-=0.22")
      }

      const mvSection = root.querySelector<HTMLElement>("[data-about-section='mission-vision']")
      const mvGrid = mvSection?.querySelector<HTMLElement>("[data-about-mv-grid]")
      const mvCards = gsap.utils.toArray<HTMLElement>(
        mvSection?.querySelectorAll("[data-about-mv-card]") ?? []
      )
      if (mvSection && mvGrid && mvCards.length) {
        gsap.set(mvGrid, { transformStyle: "preserve-3d", perspective: 1100 })
        gsap
          .timeline({
            defaults: { ease },
            scrollTrigger: { ...scrollTriggerDefaults, trigger: mvSection },
          })
          .fromTo(
            mvCards,
            {
              y: 32,
              opacity: 0,
              scale: 0.94,
              z: -100,
              rotationX: 5,
              transformOrigin: "50% 100%",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              z: 0,
              rotationX: 0,
              duration: 0.5,
              stagger: 0.12,
            }
          )
      }

      const teamSection = root.querySelector<HTMLElement>("[data-about-section='team']")
      const teamGrid = teamSection?.querySelector<HTMLElement>("[data-about-team-grid]")
      const teamHeaders = gsap.utils.toArray<HTMLElement>(
        teamSection?.querySelectorAll("[data-about-team-header]") ?? []
      )
      const teamCards = gsap.utils.toArray<HTMLElement>(
        teamSection?.querySelectorAll("[data-about-team-card]") ?? []
      )
      if (teamSection && teamHeaders.length) {
        const tl = gsap.timeline({
          defaults: { ease },
          scrollTrigger: { ...scrollTriggerDefaults, trigger: teamSection },
        })
        tl.fromTo(teamHeaders, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 })
        if (membersCount > 0 && teamGrid && teamCards.length) {
          gsap.set(teamGrid, { transformStyle: "preserve-3d", perspective: 1100 })
          tl.fromTo(
            teamCards,
            {
              y: 36,
              opacity: 0,
              scale: 0.88,
              z: -140,
              rotationX: 6,
              transformOrigin: "50% 100%",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              z: 0,
              rotationX: 0,
              duration: 0.52,
              stagger: 0.11,
            },
            "-=0.18"
          )
        }
      }
    }, root)

    return () => ctx.revert()
  }, [locale, membersCount])

  return (
    <div ref={rootRef} className="container mx-auto px-4 py-16 md:py-24">
      <section data-about-section="hero">
        <h1 data-about-hero className="text-3xl font-bold tracking-tight opacity-0 sm:text-4xl">
          {c.title}
        </h1>
        <p data-about-hero className="mt-3 max-w-2xl text-muted-foreground opacity-0">
          {c.subtitle}
        </p>
      </section>

      <section data-about-section="intro" className="mt-10">
        <div
          data-about-intro-card
          className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 opacity-0 shadow-sm backdrop-blur"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)] bg-[radial-gradient(600px_200px_at_50%_-80px,hsl(var(--primary)/0.15),transparent_60%)]"
          />
          <h2 data-about-intro-el className="mb-2 text-xl font-semibold opacity-0">
            {c.aboutDescription?.title}
          </h2>
          <div className="grid gap-3 text-muted-foreground">
            {c.aboutDescription?.body?.map((p, i) => (
              <p key={i} data-about-intro-el className="opacity-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section data-about-section="mission-vision" className="mt-10">
        <div
          data-about-mv-grid
          className="grid gap-6 md:grid-cols-2 [&>[data-about-mv-card]]:transform-gpu"
        >
          <div
            data-about-mv-card
            className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 opacity-0 backdrop-blur"
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background/70">
              <Rocket className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{c.mission?.title}</h3>
            <ul className="mt-3 grid gap-2 text-muted-foreground">
              {c.mission?.body?.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-about-mv-card
            className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 opacity-0 backdrop-blur"
          >
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background/70">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{c.vision?.title}</h3>
            <ul className="mt-3 grid gap-2 text-muted-foreground">
              {c.vision?.body?.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-about-section="team" className="mt-10">
        <div className="flex items-center gap-2">
          <div
            data-about-team-header
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background/70 opacity-0"
          >
            <Users className="h-5 w-5" />
          </div>
          <h2 data-about-team-header className="text-xl font-semibold opacity-0">
            {c.team?.title}
          </h2>
        </div>
        <div
          data-about-team-grid
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 [&>[data-about-team-card]]:transform-gpu"
        >
          {c.team?.members?.map((m, i) => (
            <div key={`${m.name}-${i}`} data-about-team-card className="min-h-0 opacity-0">
              <TeamMemberCard
                locale={locale}
                name={m.name}
                role={m.role}
                photo={m.photo}
                socials={m.socials}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
