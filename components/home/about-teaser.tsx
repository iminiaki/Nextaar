import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"

export function AboutTeaser({
  locale,
  title,
  body,
  button,
  baseHref,
}: {
  locale: Locale
  title: string
  body: string
  button: string
  baseHref: string
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <RevealOnScroll>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-muted-foreground">{body}</p>
            <Link href={`${baseHref}/about`} className="mt-6 inline-block">
              <Button>{button}</Button>
            </Link>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-2xl" />
            <img
              src="/lastaar-team-collaboration.png"
              alt="About Lastaar"
              className="mx-auto rounded-xl border bg-background object-cover shadow"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
