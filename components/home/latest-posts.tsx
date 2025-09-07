import { PostCard } from "@/components/blog/post-card"
import type { Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import { draftMode } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export async function LatestPosts({
  locale,
  title,
  subtitle,
  baseHref,
}: {
  locale: Locale
  title: string
  subtitle: string
  baseHref: string
}) {
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled } = await draftMode()
  const { docs: posts } = await payload.find({
    collection: "posts" as any,
    limit: 4,
    sort: "-createdAt" as any,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 2,
  })
  const dict = await getDictionary(locale)
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <PostCard
                key={(p as any).slug}
                href={`${baseHref}/blog/${(p as any).slug}`}
                title={(p as any).title}
                excerpt={(p as any).excerpt}
                imageUrl={(p as any).image?.url}
                createdAt={(p as any).createdAt}
                readingTime={(p as any).readingTime}
                locale={locale}
                labels={{ readTimeSuffix: dict.blogDetail.readTimeSuffix, authorAlt: (dict as any)?.common?.authorAlt }}
                author={{
                  name: ((p as any).author && typeof (p as any).author === "object") ? (p as any).author.name : undefined,
                  avatar: ((p as any).author && typeof (p as any).author === "object") ? (p as any).author.image?.url : undefined,
                }}
                categories={Array.isArray((p as any).categories)
                  ? (p as any).categories.map((c: any) => {
                      if (c && typeof c === "object") {
                        const name = c.name
                        if (name && typeof name === "object" && name[locale]) return name[locale]
                        if (typeof name === "string") return name
                      }
                      return undefined
                    }).filter(Boolean)
                  : undefined}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
