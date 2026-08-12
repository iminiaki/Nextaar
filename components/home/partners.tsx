"use client"

import { RevealOnScroll } from "@/components/gsap/reveal"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { isRTL, type Locale } from "@/lib/i18n"

const logos = [
  "/techs/Backbone.js.svg",
  "/techs/Bootstrap.svg",
  "/techs/Express.svg",
  "/techs/Firebase.svg",
  "/techs/Gatsby.svg",
  "/techs/GraphQL.svg",
  "/techs/Laravel.svg",
  "/techs/Material UI.svg",
  "/techs/MongoDB.svg",
  "/techs/MySQL.svg",
  "/techs/Nest.js.svg",
  "/techs/Next.js.svg",
  "/techs/nginex.svg",
  "/techs/Node.js.svg",
  "/techs/Nuxt JS.svg",
  "/techs/payload.svg",
  "/techs/PHP.svg",
  "/techs/PostgresSQL.svg",
  "/techs/React.svg",
  "/techs/Solid.js.svg",
  "/techs/Tailwind CSS.svg",
  "/techs/TypeScript.svg",
  "/techs/Vite.js.svg",
  "/techs/Vue.js.svg",
]

function LogoCell({ src, index }: { src: string; index: number }) {
  return (
    <div className="flex items-center justify-center px-1 py-2">
      <Image
        width={100}
        height={100}
        src={src || "/placeholder.svg"}
        alt={"Partner logo " + (index + 1)}
        loading="lazy"
        decoding="async"
        className="h-10 w-auto max-w-full grayscale transition duration-300 hover:grayscale-0 dark:invert dark:hover:invert-0"
      />
    </div>
  )
}

export function Partners({ locale, title }: { locale: Locale; title: string }) {
  const rtl = isRTL(locale)
  const prevLabel =
    locale === "fa" ? "تکنولوژی‌های قبلی" : locale === "ar" ? "التقنيات السابقة" : "Previous technologies"
  const nextLabel =
    locale === "fa" ? "تکنولوژی‌های بعدی" : locale === "ar" ? "التقنيات التالية" : "Next technologies"

  return (
    <section className="overflow-x-clip py-12" dir={rtl ? "rtl" : "ltr"}>
      <div className="container mx-auto min-w-0 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-12 text-xl font-medium">{title}</h3>
        </div>
        <RevealOnScroll className="mt-6 min-w-0" start="top 92%">
          {/* Mobile: 3-column carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                direction: rtl ? "rtl" : "ltr",
              }}
              className="w-full min-w-0"
            >
              <CarouselContent className="-ml-3 items-center">
                {logos.map((src, i) => (
                  <CarouselItem key={src} className="basis-1/3 pl-3">
                    <LogoCell src={src} index={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-5 flex items-center justify-center gap-3">
                <CarouselPrevious
                  aria-label={prevLabel}
                  className="static size-9 translate-x-0 translate-y-0"
                />
                <CarouselNext
                  aria-label={nextLabel}
                  className="static size-9 translate-x-0 translate-y-0"
                />
              </div>
            </Carousel>
          </div>

          {/* Tablet/desktop: static grid */}
          <div className="hidden items-center justify-center gap-6 md:grid md:grid-cols-6">
            {logos.map((src, i) => (
              <LogoCell key={src} src={src} index={i} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
