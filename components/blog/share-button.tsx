"use client"

import { useMemo, useState } from "react"
import { Share2, Linkedin, Instagram, Facebook, Mail, Copy, Link as LinkIcon, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { isRTL, type Locale } from "@/lib/i18n"

type ShareLabels = {
  title: string
  linkedin: string
  instagram: string
  telegram: string
  facebook: string
  email: string
  x: string
  copy: string
  close: string
}

type Props = { title: string; ariaLabel?: string; locale?: Locale; labels?: ShareLabels }

export function ShareButton({ title, ariaLabel = "Share", locale, labels: providedLabels }: Props) {
  const [open, setOpen] = useState(false)
  const url = typeof window !== "undefined" ? window.location.href : ""
  const rtl = locale ? isRTL(locale) : false

  const labels = useMemo<ShareLabels>(() => {
    if (providedLabels) return providedLabels
    return {
      title: "Share",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      telegram: "Telegram",
      facebook: "Facebook",
      email: "Email",
      x: "X",
      copy: "Copy link",
      close: "Close",
    }
  }, [providedLabels])

  function openWindow(href: string) {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  function handleLinkedIn() {
    const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    openWindow(share)
  }

  function handleTwitter() {
    const share = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    openWindow(share)
  }

  function handleFacebook() {
    const share = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    openWindow(share)
  }

  function handleTelegram() {
    const share = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    openWindow(share)
  }

  async function handleInstagram() {
    // No official web share endpoint; copy link then open instagram.com
    try {
      await navigator.clipboard.writeText(url)
    } catch {}
    openWindow("https://www.instagram.com")
  }

  function handleEmail() {
    const href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    window.location.href = href
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={ariaLabel}>
          <Share2 className="size-4" />
          <span className="sr-only">{ariaLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false} dir={rtl ? "rtl" : "ltr"}>
        <DialogHeader className="">
          <div className={`grid grid-cols-[1fr_auto] items-center gap-2`}>
            <DialogTitle className={rtl ? "text-right" : "text-left"}>{labels.title}</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={labels.close}
                className="justify-self-end"
              >
                <span className="sr-only">{labels.close}</span>
                <span aria-hidden>×</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className={`grid grid-cols-2 gap-3 ${rtl ? "text-right" : "text-left"}`}>
          <Button variant="outline" onClick={handleLinkedIn} className="justify-start gap-2">
            <Linkedin className="size-4" /> {labels.linkedin}
          </Button>
          <Button variant="outline" onClick={handleInstagram} className="justify-start gap-2">
            <Instagram className="size-4" /> {labels.instagram}
          </Button>
          <Button variant="outline" onClick={handleTelegram} className="justify-start gap-2">
            <LinkIcon className="size-4" /> {labels.telegram}
          </Button>
          <Button variant="outline" onClick={handleFacebook} className="justify-start gap-2">
            <Facebook className="size-4" /> {labels.facebook}
          </Button>
          <Button variant="outline" onClick={handleEmail} className="justify-start gap-2">
            <Mail className="size-4" /> {labels.email}
          </Button>
          <Button variant="outline" onClick={handleTwitter} className="justify-start gap-2">
            <Twitter className="size-4" /> {labels.x}
          </Button>
          <Button variant="secondary" onClick={handleCopy} className={`col-span-2 justify-center gap-2`}>
            <Copy className="size-4" /> {labels.copy}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


