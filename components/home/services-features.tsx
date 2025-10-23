import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { RevealOnScroll } from "@/components/gsap/reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

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
  const serviceImages = [
    "/services/Design.png",
    "/services/code.png",
    "/services/SEO.png",
    "/services/ADs.png",
  ] as const;
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <ul className="grid grid-cols-1 grid-rows-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it, i) => (
              <li
                key={i}
                className={cn("min-h-[14rem] list-none")}
                data-animate
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
                          src={serviceImages[i % serviceImages.length]}
                          alt={it.title}
                          className="object-contain grayscale transition duration-300 group-hover:grayscale-0"
                          height={60}
                          width={60}
                          priority={false}
                        />

                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-xl md:leading-[1.875rem] text-balance text-foreground">
                          {it.title}
                        </h3>
                        <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                          {it.desc}
                        </p>
                      </div>
                      <div>
                        <Link href={it.href}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                          >
                            {it.cta}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
