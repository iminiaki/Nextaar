"use client" // Navbar needs to be a client component if it contains ModeToggle or LanguageSwitcher

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import type { Locale } from "@/lib/i18n"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function Navbar({
  locale,
  nav,
}: {
  locale: Locale
  nav: { home: string; about: string; services: string; portfolio: string; blog: string; contact: string }
}) {
  const base = `/${locale}`
  const pathname = usePathname()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveExact = (href: string) => pathname === href
  const isActiveStartsWith = (href: string) => pathname === href || pathname.startsWith(href + "/")
  return (
    <header
      className={cn(
        "transition-all duration-300 ease-in-out",
        !isSticky
          ? "border-b"
          : "border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-2 z-20 max-w-7xl mx-auto rounded-2xl"
      )}
      data-sticky={isSticky ? "true" : undefined}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 ">
        <div className="flex items-center gap-3">
          <Link href={base} className="font-semibold">
            <Image src="/Nextaar.png" alt="Lastaar" width={64} height={64} />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
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
            href={`${base}/services`}
            className={cn(
              "text-sm hover:text-foreground",
              isActiveStartsWith(`${base}/services`) ? "text-foreground" : "text-muted-foreground"
            )}
            aria-current={isActiveStartsWith(`${base}/services`) ? "page" : undefined}
          >
            {nav.services}
          </Link>
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
          <LanguageSwitcher locale={locale} />
          <ModeToggle />
          <Link href={`${base}/contact`}>
            <Button className="hidden md:inline-flex">{nav.contact}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
