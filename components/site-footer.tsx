"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/lib/i18n"
import { subscribeEmail } from "@/app/actions"
import { SparklesCore } from "@/components/ui/sparkles"
import {
  Facebook,
  Instagram,
  Linkedin,
  MailCheck,
  MapPinHouse,
  Phone,
  Send,
  Smartphone,
} from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/social-links"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

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
    { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: Facebook },
    { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram },
    { label: "WhatsApp", href: SOCIAL_LINKS.whatsapp, Icon: WhatsAppIcon },
    { label: "Telegram", href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
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
        <div className="grid gap-10 md:grid-cols-12 items-center">
          {/* Newsletter CTA */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4">
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
            <div className="flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    <Link className="line-clamp-1 hover:text-foreground" href={p.href} title={p.label}>
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
