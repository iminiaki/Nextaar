"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { subscribeEmail } from "@/app/actions"
import { type Locale, isRTL, getDictionary } from "@/lib/i18n"
import { Send } from "lucide-react"

type SubscribeLabels = { title: string; help: string; placeholder: string; success: string; buttonAria: string }

export function SubscribeWidget({ locale, labels }: { locale?: Locale; labels?: SubscribeLabels }) {
  const [state, formAction, pending] = useActionState(subscribeEmail, { ok: false, message: "" })
  const rtl = locale ? isRTL(locale) : false
  const dict = locale ? (getDictionary as any)(locale) : (null as any)
  // Note: getDictionary is async on server usage; here we rely on the preloaded object.
  // If needed, pass strings from the server instead of calling here.
  const t: SubscribeLabels = labels ?? (locale && dict?.blogDetail?.subscribe
    ? dict.blogDetail.subscribe
    : { title: "Subscribe", help: "Get our latest posts in your inbox.", placeholder: "you@example.com", success: "You’re subscribed!", buttonAria: "Subscribe" })

  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-2 text-sm font-semibold">{t.title}</h3>
      <p className="mb-3 text-xs text-muted-foreground">{t.help}</p>
      <form action={formAction} className={`flex gap-2 ${rtl ? "flex row-reverse" : ""}`}>
        <Input type="email" name="email" required placeholder={t.placeholder} className="max-w-[220px]" dir={rtl ? "rtl" : "ltr"} />
        <Button type="submit" size="sm" disabled={pending} aria-label={t.buttonAria}>
          <Send className={`size-4 ${rtl ? "rotate-270" : ""}`} />
        </Button>
      </form>
      {state.ok && <p className="mt-2 text-xs text-green-600 dark:text-green-400">{t.success}</p>}
    </div>
  )
}


