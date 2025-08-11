"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
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
      setIsSticky(window.scrollY > 90)
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
        "max-w-7xl w-[calc(100%-2rem)] mx-auto",
        isSticky
          && "border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-2 z-20 rounded-2xl"
          
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
            <SheetContent side="left" className="p-0">
              <div className="p-4 border-b">
                <Link href={base} className="flex items-center gap-2">
                  <Image src="/Nextaar.png" alt="Lastaar" width={40} height={40} />
                  <span className="font-semibold">Nextaar</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-2">
                <SheetClose asChild>
                  <Link
                    href={`${base}`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveExact(base)
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveExact(base) ? "page" : undefined}
                  >
                    {nav.home}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/about`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/about`)
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/about`) ? "page" : undefined}
                  >
                    {nav.about}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/services`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/services`)
                        ? "bg-accent text-foreground"
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
                        ? "bg-accent text-foreground"
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
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActiveStartsWith(`${base}/blog`) ? "page" : undefined}
                  >
                    {nav.blog}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${base}/contact`}
                    className={cn(
                      "rounded-md px-3 py-2 text-base",
                      isActiveStartsWith(`${base}/contact`)
                        ? "bg-accent text-foreground"
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
  )
}
