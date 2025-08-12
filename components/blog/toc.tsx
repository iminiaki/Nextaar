"use client"

import { useEffect, useMemo, useState } from "react"
import { isRTL, type Locale, getDictionary } from "@/lib/i18n"

type TocItem = { id: string; text: string; level: number }

export function BlogTOC({ containerId, locale }: { containerId: string; locale?: Locale }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return
    const found: TocItem[] = []
    const nodes = container.querySelectorAll<HTMLElement>("h1, h2, h3")
    nodes.forEach((el, i) => {
      if (!el.id) el.id = `${el.tagName.toLowerCase()}-${i}`
      const level = Number(el.tagName.substring(1))
      found.push({ id: el.id, text: el.innerText, level })
    })
    setHeadings(found)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: "0px 0px -70% 0px" }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [containerId])

  const dict = locale ? (getDictionary as any)(locale) : null
  const noHeadingsText = dict?.blogDetail?.noHeadings ?? "No headings"

  if (headings.length === 0) {
    return <p className="text-sm text-muted-foreground">{noHeadingsText}</p>
  }

  const rtl = locale ? isRTL(locale) : false

  return (
    <nav className={`text-sm ${rtl ? "text-right" : "text-left"}`}>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level > 1 ? (rtl ? "me-3" : "ms-3") : undefined}>
            <a
              href={`#${h.id}`}
              className={`block truncate hover:text-foreground ${activeId === h.id ? "text-foreground" : "text-muted-foreground"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}


