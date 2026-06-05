"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/lib/i18n"
import { subscribeEmail } from "@/app/actions"
import Image from "next/image"
import { SparklesCore } from "@/components/ui/sparkles"
import {
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  MailCheck,
  MapPinHouse,
  Phone,
  Send,
  Smartphone,
  Twitter,
} from "lucide-react"

type ColumnLinks = { label: string; href: string }[]

export function SiteFooter({
  locale,
  office,
  quickLinks,
  latestPosts,
  newsletter,
  rights,
}: {
  locale: Locale
  office: { title: string; address: string[]; email: string; phone: string; mobile: string }
  quickLinks: { title: string; links: ColumnLinks }
  latestPosts: { title: string; posts: ColumnLinks }
  newsletter: { title: string; placeholder: string; button: string; success: string }
  rights: string
}) {
  const [state, formAction, pending] = useActionState(subscribeEmail, { ok: false, message: "" })
  const addressQuery = office.address.join(", ")
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`
  const socials: { label: string; href: string; Icon: React.ComponentType<{ className?: string; width?: number; height?: number }> }[] = [
    { label: "Twitter", href: "#", Icon: Twitter },
    { label: "GitHub", href: "#", Icon: Github },
    { label: "LinkedIn", href: "#", Icon: Linkedin },
    { label: "Instagram", href: "#", Icon: Instagram },
    { label: "Dribbble", href: "#", Icon: Dribbble },
  ]

  return (
    <footer className="relative">
      {/* Subtle spotlight gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-120px,hsl(var(--primary)/0.10),transparent_60%)]"
      />
      {/* Soft grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div className="container mx-auto px-4 mb-8 pt-8 pb-6 border rounded-2xl">
        {/* Brand row */}
        {/* <div className="mb-10 flex items-center justify-between">
          <div className="relative flex items-center gap-3">
            
            <span className="sr-only">Nextaar</span>
          </div>
        </div> */}
        <div className="grid gap-10 md:grid-cols-12 items-end">
          {/* Newsletter CTA */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl border p-2 shadow-sm backdrop-blur max-w-fit">
              <Image src="/Nextaar.png" alt="Nextaar" width={36} height={36} className="select-none" />
            </div>
            <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000_30%,transparent)]"
              >
                <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <SparklesCore
                className="absolute inset-0 pointer-events-none"
                background="transparent"
                particleColor="#a30098"
                particleDensity={60}
                minSize={1}
                maxSize={2}
                speed={2}
              />
              <h4 className="mb-3 text-sm font-semibold">{newsletter.title}</h4>
              <form action={formAction} className="flex max-w-lg gap-2">
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder={newsletter.placeholder}
                  className="flex-1 backdrop-blur-2xl"
                  aria-label={newsletter.placeholder}
                />
                <Button type="submit" disabled={pending} aria-label={newsletter.button}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {state.ok && (
                <p className="mt-2 text-xs text-green-600 dark:text-green-400">{newsletter.success}</p>
              )}
              {/* Socials under subscription */}
            </div>
            <div className="mt-4 flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group relative inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/70 text-foreground/70 shadow-sm transition-colors hover:text-foreground"
                  >
                    <span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,hsl(var(--primary)/0.25),transparent_30%,transparent_70%,hsl(var(--primary)/0.25))] opacity-0 transition-opacity group-hover:opacity-100" />
                    <Icon className="relative h-4 w-4" />
                  </a>
                ))}
              </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 md:col-span-8 lg:col-span-8">
            <div>
              <h4 className="mb-3 text-sm font-semibold">{office.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {office.address.map((line, i) => (
                  <li className="flex items-center gap-2" key={i}>
                    <MapPinHouse width={16} />
                    <a className="hover:text-foreground" href={mapsUrl} target="_blank" rel="noreferrer">
                      {line}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <MailCheck width={16} />
                  <a className="hover:text-foreground" href={`mailto:${office.email}`}>
                    {office.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone width={16} />
                  <a className="hover:text-foreground" href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}>
                    {office.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone width={16} />
                  <a className="hover:text-foreground" href={`tel:${office.mobile.replace(/[^0-9]/g, "")}`}>
                    {office.mobile}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold">{quickLinks.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {quickLinks.links.map((l, i) => (
                  <li key={i}>
                    <Link className="hover:text-foreground" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold">{latestPosts.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {latestPosts.posts.map((p, i) => (
                  <li key={i}>
                    <Link className="hover:text-foreground" href={p.href}>
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{rights}</p>
          <p className="sm:order-last">{"Lastaar © " + new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
