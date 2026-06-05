"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { ChevronDown, Code2, Megaphone, Menu, Search, Sparkles, XIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { isRTL, type Locale } from "@/lib/i18n"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

type ServiceMenuItem = {
  title: string
  desc: string
  href: string
}

export function Navbar({
  locale,
  nav,
  servicesMenu,
}: {
  locale: Locale
  nav: { home: string; about: string; services: string; portfolio: string; blog: string; contact: string; nextaar: string; }
  servicesMenu: ServiceMenuItem[]
}) {
  const base = `/${locale}`
  const rtl = locale ? isRTL(locale) : false
  const pathname = usePathname()
  const [isSticky, setIsSticky] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [servicesMenuTop, setServicesMenuTop] = useState(72)
  const navRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const servicesWrapRef = useRef<HTMLDivElement | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesIcons = [Code2, Sparkles, Search, Megaphone] as const
  const [indicator, setIndicator] = useState<{ left: number; top: number; visible: boolean }>(
    { left: 0, top: 0, visible: false }
  )
  const menuText =
    locale === "fa"
      ? {
          quickLabel: "سرویس‌ها",
          featuredTitle: "راهکار مناسب بیزنس شما",
          featuredDesc: "از طراحی تا توسعه و رشد، سرویس‌ها را بر اساس مرحله کسب‌وکارتان انتخاب کنید.",
          viewAll: "مشاهده همه خدمات",
        }
      : locale === "ar"
        ? {
            quickLabel: "الخدمات",
            featuredTitle: "حلول مصممة لعملك",
            featuredDesc: "اختر الخدمة المناسبة لمرحلة نمو عملك، من التصميم حتى التطوير والتسويق.",
            viewAll: "عرض جميع الخدمات",
          }
        : {
            quickLabel: "Services",
            featuredTitle: "Solutions tailored to your business",
            featuredDesc: "Pick the right service for your current growth stage, from design and development to marketing.",
            viewAll: "View all services",
          }

  const openServicesMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsServicesOpen(true)
  }

  const closeServicesMenuSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false)
      closeTimerRef.current = null
    }, 140)
  }

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!servicesWrapRef.current) return
      if (!servicesWrapRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    window.addEventListener("mousedown", onPointerDown)
    return () => {
      window.removeEventListener("mousedown", onPointerDown)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const updateMenuTop = () => {
      if (!headerRef.current) return
      const rect = headerRef.current.getBoundingClientRect()
      setServicesMenuTop(rect.bottom + 8)
    }

    updateMenuTop()
    window.addEventListener("resize", updateMenuTop, { passive: true })
    window.addEventListener("scroll", updateMenuTop, { passive: true })
    return () => {
      window.removeEventListener("resize", updateMenuTop)
      window.removeEventListener("scroll", updateMenuTop)
    }
  }, [isSticky])

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 90)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveExact = (href: string) => pathname === href
  const isActiveStartsWith = (href: string) => pathname === href || pathname.startsWith(href + "/")

  useEffect(() => {
    const updateIndicator = () => {
      const headerElement = headerRef.current
      const navElement = navRef.current
      if (!headerElement || !navElement) {
        setIndicator((prev) => ({ ...prev, visible: false }))
        return
      }

      const activeLink: HTMLElement | null = navElement.querySelector(
        '[aria-current="page"]'
      )
      if (!activeLink) {
        setIndicator((prev) => ({ ...prev, visible: false }))
        return
      }

      const linkRect = activeLink.getBoundingClientRect()
      const headerRect = headerElement.getBoundingClientRect()

      const left = linkRect.left + linkRect.width / 2
      // Place near the bottom of the header so it feels "under" the nav item
      const top = headerRect.top + headerRect.height - 8 // 8px padding from bottom

      setIndicator({ left, top, visible: true })
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator, { passive: true })
    window.addEventListener("scroll", updateIndicator, { passive: true })
    return () => {
      window.removeEventListener("resize", updateIndicator)
      window.removeEventListener("scroll", updateIndicator)
    }
  }, [pathname])
  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "z-30 max-w-7xl w-[calc(100%-2rem)] mx-auto",
        !isSticky && "absolute inset-x-0 top-0",
        isSticky && "fixed top-2 inset-x-0 border backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm rounded-2xl",
      )}
      dir="ltr"
      data-sticky={isSticky ? "true" : undefined}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 ">
        <div className="flex items-center gap-3 w-12 md:w-16">
          <Link href={base} className="font-semibold">
            <Image src="/Nextaar.png" alt="Lastaar" width={64} height={64} />
          </Link>
        </div>
        <nav ref={navRef} className="hidden items-center gap-6 md:flex" dir={rtl ? "rtl" : "ltr"}>
          <Link
            href={`${base}`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveExact(base) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveExact(base) ? "page" : undefined}
          >
            {nav.home}
          </Link>
          <div
            ref={servicesWrapRef}
            className="relative"
            onPointerEnter={openServicesMenu}
            onPointerLeave={closeServicesMenuSoon}
          >
            <Link
              href={`${base}/services`}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm hover:text-foreground",
                isActiveStartsWith(`${base}/services`) ? "text-foreground" : "text-muted-foreground"
              )}
              aria-current={isActiveStartsWith(`${base}/services`) ? "page" : undefined}
              onFocus={openServicesMenu}
            >
              {nav.services}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-200", isServicesOpen && "rotate-180")}
              />
            </Link>

            <div
              className={cn(
                "fixed left-1/2 z-40 w-[min(94vw,860px)] -translate-x-1/2",
                isServicesOpen
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              )}
              style={{ top: servicesMenuTop }}
              onPointerEnter={openServicesMenu}
              onPointerLeave={closeServicesMenuSoon}
            >
              <div className="rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {menuText.quickLabel}
                  </p>
                  <Link href={`${base}/services`} className="text-xs font-medium text-primary hover:underline">
                    {menuText.viewAll}
                  </Link>
                </div>

                <div className="grid gap-4 lg:grid-cols-12" dir={rtl ? "rtl" : "ltr"}>
                  <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/12 via-primary/5 to-blue-500/8 p-4 lg:col-span-4">
                    <p className="text-sm font-semibold text-foreground">{menuText.featuredTitle}</p>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{menuText.featuredDesc}</p>
                    <Link href={`${base}/services`} className="mt-4 inline-flex">
                      <Button size="sm" className="h-8">
                        {menuText.viewAll}
                      </Button>
                    </Link>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                    {servicesMenu.slice(0, 4).map((item, i) => {
                      const Icon = servicesIcons[i % servicesIcons.length]
                      return (
                        <Link
                          key={`${item.title}-${i}`}
                          href={item.href}
                          className="group rounded-xl border border-border/60 p-3 transition hover:border-primary/35 hover:bg-accent/30"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="line-clamp-1 text-sm font-medium text-foreground">{item.title}</p>
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`${base}/portfolio`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveStartsWith(`${base}/portfolio`) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveStartsWith(`${base}/portfolio`) ? "page" : undefined}
          >
            {nav.portfolio}
          </Link>
          <Link
            href={`${base}/blog`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveStartsWith(`${base}/blog`) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveStartsWith(`${base}/blog`) ? "page" : undefined}
          >
            {nav.blog}
          </Link>
          <Link
            href={`${base}/about`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveStartsWith(`${base}/about`) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveStartsWith(`${base}/about`) ? "page" : undefined}
          >
            {nav.about}
          </Link>
          <Link
            href={`${base}/contact`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveStartsWith(`${base}/contact`) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveStartsWith(`${base}/contact`) ? "page" : undefined}
          >
            {nav.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden order-1"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={rtl ? "right" : "left" } className="p-0">
              <div className="p-4 border-b flex items-center justify-between">
                <Link href={base} className="flex items-center gap-2">
                  <Image src="/Nextaar.png" alt="Lastaar" width={40} height={40} />
                  <span className="font-semibold">{nav.nextaar}</span>
                </Link>
                <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary  top-4 ltr:right-4 rtl:left-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
              </div>
              <nav className="flex flex-col gap-1 p-2">
                <SheetClose asChild>
                  <Link
                    href={`${base}`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveExact(base)
                        ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveExact(base) ? "page" : undefined}
                  >
                    {nav.home}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/services`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/services`)
                                              ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`

                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/services`) ? "page" : undefined}
                  >
                    {nav.services}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/portfolio`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/portfolio`)
                                              ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`

                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/portfolio`) ? "page" : undefined}
                  >
                    {nav.portfolio}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/blog`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/blog`)
                                              ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`

                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/blog`) ? "page" : undefined}
                  >
                    {nav.blog}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/about`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/about`)
                                              ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`

                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/about`) ? "page" : undefined}
                  >
                    {nav.about}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/contact`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/contact`)
                                              ? `bg-accent/80 text-foreground before:absolute ${rtl ? "before:-right-1" : "before:-left-1"} before:bg-[#a30098] before:w-2 before:h-6 before:-z-10 before:rounded`

                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/contact`) ? "page" : undefined}
                  >
                    {nav.contact}
                  </Link>
                </SheetClose>
              </nav>
              <div className="p-4 border-t flex items-center gap-2">
                <LanguageSwitcher locale={locale} />
                <ModeToggle />
                <SheetClose asChild>
                  <Link href={`${base}/contact`} className="ml-auto">
                    <Button className="w-full">{nav.contact}</Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <LanguageSwitcher locale={locale} />
          <ModeToggle />
          <Link href={`${base}/contact`} className="hidden md:inline-flex ">
            <Button>{nav.contact}</Button>
          </Link>
        </div>
      </div>
    </header>
    {/* Active item indicator behind the blurred header (desktop only) */}
    {indicator.visible && isSticky ? (
      <div
        aria-hidden
        className="hidden md:block fixed pointer-events-none z-10"
        style={{ left: indicator.left, top: indicator.top }}
      >
        <span className="block h-2 w-6 -translate-x-1/2 translate-y-0.5 rounded-sm bg-primary" />
      </div>
    ) : null}
    </>
  )
}
