import { draftMode } from "next/headers"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import type { Locale } from "@/lib/i18n"

export async function getLatestPostLinks(locale: Locale, limit = 4) {
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled } = await draftMode()
  const { docs } = await payload.find({
    collection: "posts" as any,
    limit,
    sort: "-createdAt" as any,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 0,
  })

  return docs
    .filter((post) => typeof post.slug === "string" && typeof post.title === "string")
    .map((post) => ({
      label: post.title as string,
      href: `/${locale}/blog/${post.slug}`,
    }))
}
