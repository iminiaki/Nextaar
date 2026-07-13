import Link from "next/link"
import { PostCard } from "@/components/blog/post-card"
import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Hash, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubscribeWidget } from "@/components/blog/subscribe-widget"
import { BlogPagination, getBlogPagination } from "@/components/blog/blog-pagination"
import {
  findCategories,
  findPosts,
  getPostCategoryCounts,
} from "@/lib/payload-queries"
import { buildPageMetadata } from "@/lib/metadata"

export const revalidate = 3600

function getLocalizedName(category: any, locale: Locale) {
  const name = category?.name
  if (name && typeof name === "object" && typeof name[locale] === "string") return name[locale]
  if (typeof name === "string") return name
  return undefined
}

function getCategorySlug(category: any) {
  return typeof category?.slug === "string" ? category.slug : undefined
}

function createBlogHref(
  base: string,
  params: { category?: string; q?: string; page?: number }
) {
  const searchParams = new URLSearchParams()
  if (params.category) searchParams.set("category", params.category)
  if (params.q) searchParams.set("q", params.q)
  if (params.page && params.page > 1) searchParams.set("page", String(params.page))
  const query = searchParams.toString()

  return query ? `${base}/blog?${query}` : `${base}/blog`
}

function buildPostsWhere(activeCategory?: string, searchQuery?: string) {
  const conditions: Record<string, unknown>[] = []

  if (activeCategory) {
    conditions.push({ "categories.slug": { equals: activeCategory } })
  }

  if (searchQuery) {
    conditions.push({
      or: [
        { title: { contains: searchQuery } },
        { excerpt: { contains: searchQuery } },
      ],
    })
  }

  if (conditions.length === 0) return undefined
  if (conditions.length === 1) return conditions[0]
  return { and: conditions }
}

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.blog

  return buildPageMetadata({
    locale: params.locale,
    title: c.title,
    description: c.subtitle,
    path: "/blog",
  })
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: Locale }
  searchParams?: { category?: string; q?: string; page?: string }
}) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.blog
  const base = `/${params.locale}`
  const activeCategory = searchParams?.category
  const searchQuery = searchParams?.q?.trim() ?? ""
  const requestedPage = Number.parseInt(searchParams?.page ?? "1", 10)
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  const where = buildPostsWhere(activeCategory, searchQuery || undefined)

  const [{ docs: posts, totalDocs }, { docs: categories }, postCountByCategory] = await Promise.all([
    findPosts({
      locale: params.locale,
      limit: 12,
      page: currentPage,
      depth: 1,
      where,
    }),
    findCategories(params.locale),
    getPostCategoryCounts(params.locale),
  ])

  const { currentPage: safePage, totalPages } = getBlogPagination({
    totalItems: totalDocs,
    currentPage,
  })

  const categoriesWithPosts = categories.filter((category: any) => {
    const slug = getCategorySlug(category)
    return slug ? (postCountByCategory[slug] ?? 0) > 0 : false
  })

  const totalPosts = Object.values(postCountByCategory).reduce((sum, count) => sum + count, 0)
  const createPageHref = (page: number) =>
    createBlogHref(base, {
      category: activeCategory,
      q: searchQuery || undefined,
      page,
    })

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 relative">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {c.title}
        </h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.subtitle}</p>
      </RevealOnScroll>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <RevealOnScroll className="lg:col-span-3">
          <aside className="sticky top-32 flex flex-col gap-4">
            <div className="rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-background/70 text-primary">
                  <Search className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold">{c.search}</h2>
              </div>
              <form action={`${base}/blog`} className="flex gap-2">
                {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
                <Input
                  type="search"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder={c.searchPlaceholder}
                  className="min-w-0"
                />
                <Button type="submit" size="icon" aria-label={c.search}>
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-background/70 text-primary">
                  <Hash className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold">{c.categories}</h2>
              </div>
              <nav className="grid gap-2 text-sm">
                <Link
                  href={createBlogHref(base, { q: searchQuery })}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                    !activeCategory ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span>{c.allPosts}</span>
                  <span className="text-xs opacity-80">{totalPosts}</span>
                </Link>
                {categoriesWithPosts.map((category: any) => {
                  const slug = getCategorySlug(category)
                  const name = getLocalizedName(category, params.locale)
                  if (!slug || !name) return null
                  const isActive = activeCategory === slug

                  return (
                    <Link
                      key={slug}
                      href={createBlogHref(base, { category: slug, q: searchQuery })}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <span>{name}</span>
                      <span className="text-xs opacity-80">{postCountByCategory[slug] ?? 0}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <SubscribeWidget locale={params.locale} labels={dict.blogDetail.subscribe} />
          </aside>
        </RevealOnScroll>

        <RevealOnScroll staggerChildren className="lg:col-span-9">
          {posts.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((p) => (
                  <PostCard
                    key={p.slug}
                    href={`${base}/blog/${p.slug}`}
                    title={p.title}
                    excerpt={p.excerpt}
                    imageUrl={p.image?.url}
                    createdAt={p.createdAt}
                    readingTime={p.readingTime}
                    locale={params.locale}
                    labels={{ readTimeSuffix: dict.blogDetail.readTimeSuffix, authorAlt: (dict as any)?.common?.authorAlt }}
                    author={{
                      name: (p.author && typeof p.author === "object") ? (p.author as any).name : undefined,
                      avatar: (p.author && typeof p.author === "object") ? (p.author as any).image?.url : undefined,
                    }}
                    categories={Array.isArray((p as any).categories)
                      ? (p as any).categories.map((category: any) => getLocalizedName(category, params.locale)).filter(Boolean)
                      : undefined}
                  />
                ))}
              </div>
              <BlogPagination
                currentPage={safePage}
                totalPages={totalPages}
                createHref={createPageHref}
                locale={params.locale}
                labels={{
                  previous: c.previousPage,
                  next: c.nextPage,
                }}
              />
            </>
          ) : (
            <div className="rounded-2xl border bg-card/60 p-8 text-center text-sm text-muted-foreground">
              {c.noPosts}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </div>
  )
}
