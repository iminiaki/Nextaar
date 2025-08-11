"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/lib/i18n"
import { subscribeEmail } from "@/app/actions"
import { MailCheck, MapPinHouse, Phone, Send, Smartphone } from "lucide-react"

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

  return (
    <footer className="border-t">
      <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold">{office.title}</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {office.address.map((line, i) => (
              
              <li className="flex gap-2 items-center" key={i}>
                <MapPinHouse width={16} />
                <a className="hover:text-foreground" href={`address:${office.address}`}>
                  {line}
                </a>
                </li>
            ))}
            <li className="flex gap-2 items-center">
              <MailCheck width={16} />
              <a className="hover:text-foreground" href={`mailto:${office.email}`}>
                {office.email}
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <Phone width={16} />
              <a className="hover:text-foreground" href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}>
                {office.phone}
              </a>
            </li>
            <li className="flex gap-2 items-center">
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

        <div>
          <h4 className="mb-3 text-sm font-semibold">{newsletter.title}</h4>
          <form action={formAction} className="flex gap-2">
            <Input
              type="email"
              name="email"
              required
              placeholder={newsletter.placeholder}
              className="max-w-[280px]"
              aria-label={newsletter.placeholder}
            />
            <Button type="submit" disabled={pending}>
              <Send />
            </Button>
          </form>
          {state.ok && <p className="mt-2 text-xs text-green-600 dark:text-green-400">{newsletter.success}</p>}
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 text-xs text-muted-foreground">
          <p>{rights}</p>
          <p>{"Lastaar © " + new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
