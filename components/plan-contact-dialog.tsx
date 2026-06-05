"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ContactForm } from "@/components/contact-form"

type ContactLabels = {
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
}

export function PlanContactDialog({
  id,
  triggerLabel,
  featured = false,
  rtl = false,
  contact,
}: {
  id: string
  triggerLabel: string
  featured?: boolean
  rtl?: boolean
  contact: ContactLabels
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`mt-auto w-full rounded-xl ${
            featured ? "shadow-lg shadow-primary/25" : "bg-background text-foreground hover:bg-accent"
          }`}
          variant={featured ? "default" : "outline"}
        >
          {triggerLabel}
          <ArrowRight className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-2xl"
        dir={rtl ? "rtl" : "ltr"}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{contact.title}</DialogTitle>
          <DialogDescription>{contact.subtitle}</DialogDescription>
        </DialogHeader>
        <ContactForm id={id} bare {...contact} />
      </DialogContent>
    </Dialog>
  )
}
