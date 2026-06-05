"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm({
  id = "contact",
  bare = false,
  title,
  subtitle,
  nameLabel,
  namePlaceholder,
  companyLabel,
  companyPlaceholder,
  emailLabel,
  emailPlaceholder,
  phoneLabel,
  messageLabel,
  messagePlaceholder,
  send,
  success,
  onSuccess,
}: {
  id?: string
  /** When true, renders only the form (no outer section/card/glows) so it can be embedded, e.g. in a dialog. */
  bare?: boolean
  title: string
  subtitle: string
  nameLabel: string
  namePlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  messageLabel: string
  messagePlaceholder: string
  send: string
  success: string
  onSuccess?: () => void
}) {
  const [done, setDone] = useState(false)
  const [phone, setPhone] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 700))
    setDone(true)
    onSuccess?.()
    setTimeout(() => setDone(false), 2000)
  }

  const form = (
    <form onSubmit={onSubmit} className="relative z-0 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            {nameLabel}
          </label>
          <Input id={`${id}-name`} name="name" required placeholder={namePlaceholder} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-company`} className="text-sm font-medium">
            {companyLabel}
          </label>
          <Input id={`${id}-company`} name="company" required placeholder={companyPlaceholder} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-email`} className="text-sm font-medium">
          {emailLabel}
        </label>
        <Input id={`${id}-email`} name="email" type="email" required placeholder={emailPlaceholder} />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-phone`} className="text-sm font-medium">
          {phoneLabel}
        </label>
        <PhoneInput
          defaultCountry="us"
          value={phone}
          onChange={setPhone}
          forceDialCode
          inputProps={{
            id: `${id}-phone`,
            name: "phone",
            required: true,
            "aria-label": phoneLabel,
          }}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-message`} className="text-sm font-medium">
          {messageLabel}
        </label>
        <Textarea id={`${id}-message`} name="message" required rows={5} placeholder={messagePlaceholder} />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {send}
      </Button>
      {done ? <p className="pt-2 text-sm text-green-600 dark:text-green-400">{success}</p> : null}
    </form>
  )

  if (bare) {
    return (
      <div className="relative rounded-3xl border bg-card p-6 shadow-sm backdrop-blur md:p-8">
        {/* Use an opaque card in dialogs, with stronger glows so the overlay does not mute them. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        </div>
        <div className="relative flex flex-col gap-8">
          <div className="relative z-20">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          {form}
        </div>
      </div>
    )
  }

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-2xl rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur md:p-8">
          {/* Clip glows only so the phone country list can overflow without hiding the heading */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          </div>
          <div className="relative flex flex-col gap-8">
            <div className="relative z-20">
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            </div>
            {form}
          </div>
        </div>
      </div>
    </section>
  )
}
