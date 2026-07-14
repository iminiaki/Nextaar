"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isRTL, type Locale } from "@/lib/i18n";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  desc: string;
  href: string;
  cta: string;
};

export function ServicesFeatures({
  locale,
  title,
  subtitle,
  items,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  items: Item[];
}) {
  const rtl = isRTL(locale);
  const sectionRef = useRef<HTMLElement | null>(null);
  const serviceImages = [
    "/services/code.png",
    "/services/Design.png",
    "/services/SEO.png",
    "/services/ADs.png",
  ] as const;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerItems = gsap.utils.toArray<HTMLElement>("[data-services-header]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      const cardContent = gsap.utils.toArray<HTMLElement>("[data-service-card-content]");

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 28%",
            toggleActions: "play reverse play reverse",
          },
        })
        .fromTo(headerItems, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.06 })
        .fromTo(cards, { y: 18, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08 }, "-=0.18")
        .fromTo(cardContent, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.035 }, "-=0.24");
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section ref={sectionRef} id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-services-header className="text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl">
            {title}
          </h2>
          <p data-services-header className="mt-3 text-muted-foreground opacity-0">{subtitle}</p>
        </div>
        <ul className="mt-10 grid grid-cols-1 grid-rows-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li
              key={i}
              className={cn("min-h-[14rem] list-none opacity-0")}
              data-service-card
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="space-y-3">
                      <Image
                        data-service-card-content
                        src={serviceImages[i % serviceImages.length]}
                        alt={it.title}
                        className="object-contain grayscale transition duration-300 group-hover:grayscale-0"
                        height={60}
                        width={60}
                        priority={false}
                      />

                      <h3 data-service-card-content className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-xl md:leading-[1.875rem] text-balance text-foreground">
                        {it.title}
                      </h3>
                      <p data-service-card-content className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                        {it.desc}
                      </p>
                    </div>
                    <div data-service-card-content>
                      <Button
                        asChild
                        variant="outline"
                        size="default"
                        className="group/cta mt-2 h-10 rounded-xl border-border/80 bg-background/60 px-5 text-sm font-medium shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground hover:shadow-md hover:shadow-primary/10"
                      >
                        <Link href={it.href} className="inline-flex items-center gap-2">
                          {it.cta}
                          <ArrowRight
                            className={cn(
                              "size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5",
                              rtl && "rotate-180 group-hover/cta:-translate-x-0.5"
                            )}
                          />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
