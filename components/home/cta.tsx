import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { GlobeNxt } from "../ui/globe/globenxt"

export function CallToAction({
  locale,
  title,
  subtitle,
  button,
}: {
  locale: Locale
  title: string
  subtitle: string
  button: { label: string; href: string }
}) {
  return (
    <section className="py-8 md:py-24">
      <div className="relative container mx-auto px-4">
      
        <div className="container overflow-visible mx-auto px-4 py-8 rounded-2xl bg-background flex flex-col lg:flex-row items-center justify-center ">
        <GlobeNxt className="max-w-md h-[512px]"/>
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold sm:text-3xl">{title}</h3>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
          <div className="mt-6">
            <Link href={button.href}>
              <Button size="lg">{button.label}</Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
      </div>
      
    </section>
  )
}
