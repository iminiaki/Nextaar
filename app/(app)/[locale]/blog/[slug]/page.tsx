import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { getDictionary, type Locale } from "@/lib/i18n"
import { findPostBySlug, findRelatedPosts, getPayloadClient } from "@/lib/payload-queries"
import { buildPageMetadata } from "@/lib/metadata"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { CalendarDays, UserRound, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/blog/share-button"
import { BlogTOC } from "@/components/blog/toc"
import { MobileBlogTOC } from "@/components/blog/mobile-toc"
import { SubscribeWidget } from "@/components/blog/subscribe-widget"
import { PreferredSource } from "@/components/blog/preferred-source"
import { PostCard } from "@/components/blog/post-card"

export const revalidate = 3600

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getCategoryName(category: any, locale: Locale) {
  const name = category?.name
  if (name && typeof name === "object" && typeof name[locale] === "string") return name[locale]
  if (typeof name === "string") return name
  return undefined
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { locale, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const { isEnabled } = await draftMode()
  const previewId =
    typeof resolvedSearchParams?.previewId === "string"
      ? resolvedSearchParams.previewId
      : undefined

  let post: any | undefined

  if (isEnabled && previewId) {
    try {
      const payload = await getPayloadClient()
      post = await payload.findByID({
        collection: "posts" as any,
        id: previewId,
        locale: locale as any,
        fallbackLocale: false as any,
        draft: true as any,
        depth: 2 as any,
        overrideAccess: true,
      })
    } catch {}
  }

  if (!post) {
    post = await findPostBySlug(locale, slug)
  }

  if (!post) {
    return {
      title: "Preview",
      description: "Previewing draft content",
    }
  }

  return buildPageMetadata({
    locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.publishedAt || post.createdAt,
    modifiedTime: post.updatedAt || post.publishedAt || post.createdAt,
    image: post.image?.url,
    authors: post.author?.name ? [post.author.name] : undefined,
  })
}

export default async function PostDetail({ params, searchParams }: PageProps) {
  const { locale, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const dict = await getDictionary(locale)
  const { isEnabled } = await draftMode()
  const previewId =
    typeof resolvedSearchParams?.previewId === "string"
      ? resolvedSearchParams.previewId
      : undefined
  let post: any | undefined

  if (isEnabled && previewId) {
    try {
      const payload = await getPayloadClient()
      post = await payload.findByID({
        collection: "posts" as any,
        id: previewId,
        locale: locale as any,
        fallbackLocale: false as any,
        draft: true as any,
        overrideAccess: true,
      })
    } catch {
      // fallback to slug query below
    }
  }

  if (!post) {
    post = await findPostBySlug(locale, slug)
  }

  if (!post) return notFound()

  const categories = Array.isArray(post.categories)
    ? post.categories
        .map((category: any) => ({
          name: getCategoryName(category, locale),
          slug: typeof category?.slug === "string" ? category.slug : undefined,
        }))
        .filter((category: any) => Boolean(category.name))
    : []

  const categoryIds = Array.isArray(post.categories)
    ? post.categories
        .map((category: any) => {
          if (category == null) return undefined
          if (typeof category === "string" || typeof category === "number") return category
          return category.id
        })
        .filter((id: unknown): id is string | number => id != null && id !== "")
    : []

  const categorySlugs = categories
    .map((category: any) => category.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0)

  const relatedPosts =
    categorySlugs.length > 0 || categoryIds.length > 0
      ? await findRelatedPosts({
          locale,
          postId: post.id,
          categorySlugs,
          categoryIds,
          limit: 4,
        })
      : []

  const showRelated = relatedPosts.length >= 4
  const imageUrl = post.image?.url || "/placeholder.svg"

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-4">
        <aside className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold">
                {dict.blogDetail.tocTitle}
              </h3>
              <BlogTOC containerId="post-content" locale={locale} />
            </div>
            <PreferredSource
              locale={locale}
              labels={dict.blogDetail.preferredSource}
            />
            <SubscribeWidget
              locale={locale}
              labels={dict.blogDetail.subscribe}
            />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title || "Untitled"}
            </h1>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="inline-flex items-center gap-1">
                  <UserRound className="size-4" />
                  {post.author?.name}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="size-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-4" />
                  {`${post.readingTime} ${dict.blogDetail.readTimeSuffix}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:justify-end">
                {categories.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {categories.map((category: any) => (
                      <Link
                        key={`${category.name}-${category.slug ?? "category"}`}
                        href={`/${locale}/blog${category.slug ? `?category=${encodeURIComponent(category.slug)}` : ""}`}
                      >
                        <Badge variant="secondary" className="rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground">
                          {category.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : null}
                <span className="hidden h-4 w-px bg-border sm:inline-block" />
                <ShareButton
                  title={post.title}
                  ariaLabel={dict.blogDetail.share.title}
                  locale={locale}
                  labels={dict.blogDetail.share}
                />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>

          <div className="mt-6 lg:hidden">
            <MobileBlogTOC
              containerId="post-content"
              locale={locale}
              title={dict.blogDetail.tocTitle}
            />
          </div>

          <RevealOnScroll className="post-prose prose mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-28">
            <div id="post-content">
              <RichText data={post.body} />
            </div>
          </RevealOnScroll>

          {/* End-of-article Preferred Sources (Google official button) */}
          <div className="mt-10">
            <PreferredSource
              locale={locale}
              labels={dict.blogDetail.preferredSource}
            />
          </div>

          <div className="mt-4 lg:hidden">
            <SubscribeWidget
              locale={locale}
              labels={dict.blogDetail.subscribe}
            />
          </div>
        </div>
      </div>

      {showRelated ? (
        <section className="mt-16 md:mt-24">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.blogDetail.relatedTitle}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="mt-8" staggerChildren stagger={0.11} start="top 88%">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.slice(0, 4).map((related: any) => (
                <div key={related.slug ?? related.id} data-animate className="h-full">
                  <PostCard
                    href={`/${locale}/blog/${related.slug}`}
                    title={related.title}
                    excerpt={related.excerpt}
                    imageUrl={related.image?.url}
                    createdAt={related.createdAt}
                    readingTime={related.readingTime}
                    locale={locale}
                    labels={{
                      readTimeSuffix: dict.blogDetail.readTimeSuffix,
                      authorAlt: (dict as any)?.common?.authorAlt,
                    }}
                    author={{
                      name:
                        related.author && typeof related.author === "object"
                          ? related.author.name
                          : undefined,
                      avatar:
                        related.author && typeof related.author === "object"
                          ? related.author.image?.url
                          : undefined,
                    }}
                    categories={
                      Array.isArray(related.categories)
                        ? related.categories
                            .map((category: any) => getCategoryName(category, locale))
                            .filter(Boolean)
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </section>
      ) : null}
    </article>
  )
}
