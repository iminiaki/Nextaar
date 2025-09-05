import Link from "next/link"
import { PostCard } from "@/components/blog/post-card"
import type { Locale } from "@/lib/i18n"
import { posts } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"

export function LatestPosts({
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
  const latest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <PostCard
                key={p.slug}
                href={`${baseHref}/blog/${p.slug}`}
                title={p.title[locale]}
                excerpt={p.excerpt[locale]}
                imageUrl={p.image}
                createdAt={p.date}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
