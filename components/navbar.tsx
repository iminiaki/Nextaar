import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import type { Locale } from "@/lib/i18n"
import Image from "next/image"

export function Navbar({
  locale,
  nav,
}: {
  locale: Locale
  nav: { home: string; about: string; services: string; portfolio: string; blog: string; contact: string }
}) {
  const base = `/${locale}`

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href={base} className="font-semibold">
            <Image src="/Nextaar.png" alt="Lastaar" width={64} height={64} />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`${base}`} className="text-sm text-muted-foreground hover:text-foreground">
            {nav.home}
          </Link>
          <Link href={`${base}/about`} className="text-sm text-muted-foreground hover:text-foreground">
            {nav.about}
          </Link>
          <Link href={`${base}/services`} className="text-sm text-muted-foreground hover:text-foreground">
            {nav.services}
          </Link>
          <Link href={`${base}/portfolio`} className="text-sm text-muted-foreground hover:text-foreground">
            {nav.portfolio}
          </Link>
          <Link href={`${base}/blog`} className="text-sm text-muted-foreground hover:text-foreground">
            {nav.blog}
          </Link>
          <Link href={`${base}/contact`} className="text-sm text-muted-foreground hover:text-foreground">
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
