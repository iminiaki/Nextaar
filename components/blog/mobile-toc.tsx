"use client"

import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BlogTOC } from "@/components/blog/toc"
import type { Locale } from "@/lib/i18n"

export function MobileBlogTOC({
  containerId,
  locale,
  title,
}: {
  containerId: string
  locale: Locale
  title: string
}) {
  return (
    <Collapsible className="rounded-xl border">
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-start text-sm font-semibold">
        <span>{title}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-4 pb-4 pt-3">
        <BlogTOC containerId={containerId} locale={locale} />
      </CollapsibleContent>
    </Collapsible>
  )
}
