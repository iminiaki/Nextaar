import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { CalendarDays, UserRound, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/blog/share-button"
import { BlogTOC } from "@/components/blog/toc"
import { SubscribeWidget } from "@/components/blog/subscribe-widget"
export const revalidate = 3600

type Params = {
  params: { locale: Locale; slug: string }
  searchParams?: Record<string, string | string[] | undefined>
}

function getCategoryName(category: any, locale: Locale) {
  const name = category?.name
  if (name && typeof name === "object" && typeof name[locale] === "string") return name[locale]
  if (typeof name === "string") return name
  return undefined
}

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: { locale: Locale; slug: string }
  searchParams?: Record<string, string | string[] | undefined>
}) => {
  const { isEnabled } = await draftMode()
  const previewId =
    typeof searchParams?.previewId === "string"
      ? searchParams.previewId
      : undefined

  let post: any | undefined

  if (isEnabled && previewId) {
    try {
      const payload = await getPayloadClient()
      post = await payload.findByID({
        collection: "posts" as any,
        id: previewId,
        locale: params.locale as any,
        fallbackLocale: false as any,
        draft: true as any,
        depth: 2 as any,
        overrideAccess: true,
      })
    } catch {}
  }

  if (!post) {
    post = await findPostBySlug(params.locale, params.slug)
  }

  if (!post) {
    return {
      title: "Preview",
      description: "Previewing draft content",
    }
  }

  return buildPageMetadata({
    locale: params.locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${params.slug}`,
  })
}

export default async function PostDetail({ params, searchParams }: Params) {
  const dict = await getDictionary(params.locale)
  const { isEnabled } = await draftMode()
  const previewId =
    typeof searchParams?.previewId === "string"
      ? searchParams?.previewId
      : undefined
  let post: any | undefined

  if (isEnabled && previewId) {
    try {
      const payload = await getPayloadClient()
      post = await payload.findByID({
        collection: "posts" as any,
        id: previewId,
        locale: params.locale as any,
        fallbackLocale: false as any,
        draft: true as any,
        overrideAccess: true,
      })
    } catch {
      // fallback to slug query below
    }
  }

  if (!post) {
    post = await findPostBySlug(params.locale, params.slug)
  }

  if (!post) return notFound()

  const categories = Array.isArray(post.categories)
    ? post.categories
        .map((category: any) => ({
          name: getCategoryName(category, params.locale),
          slug: typeof category?.slug === "string" ? category.slug : undefined,
        }))
        .filter((category: any) => Boolean(category.name))
    : []

  const imageUrl = post.image?.url || "/placeholder.svg"

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-4">
        <aside className="lg:col-span-1 order-2 md:order-1">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold">
                {dict.blogDetail.tocTitle}
              </h3>
              <BlogTOC containerId="post-content" locale={params.locale} />
            </div>
            <SubscribeWidget
              locale={params.locale}
              labels={dict.blogDetail.subscribe}
            />
          </div>
        </aside>

        <div className="lg:col-span-3 order-1 md:order-2">
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
                        href={`/${params.locale}/blog${category.slug ? `?category=${encodeURIComponent(category.slug)}` : ""}`}
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
                  locale={params.locale}
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

          <RevealOnScroll className="prose mt-8 max-w-none dark:prose-invert">
            <div id="post-content">
              <RichText data={post.body} />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  )
}
