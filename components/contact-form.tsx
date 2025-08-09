"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm({
  id = "contact",
  title,
  subtitle,
  emailLabel,
  messageLabel,
  send,
  success,
}: {
  id?: string
  title: string
  subtitle: string
  emailLabel: string
  messageLabel: string
  send: string
  success: string
}) {
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 700))
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <p className="text-muted-foreground">{subtitle}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {emailLabel}
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {messageLabel}
                </label>
                <Textarea id="message" name="message" required rows={5} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                {send}
              </Button>
              {done ? <p className="pt-2 text-sm text-green-600 dark:text-green-400">{success}</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
