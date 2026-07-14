import { cache } from "react"
import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import type { Locale } from "@/lib/i18n"

export const REVALIDATE_SECONDS = 3600

export const getPayloadClient = cache(async () => {
  return getPayload({ config: payloadConfig })
})

async function isDraftModeEnabled() {
  const { isEnabled } = await draftMode()
  return isEnabled
}

type FindPostsOptions = {
  locale: Locale
  limit?: number
  page?: number
  depth?: number
  where?: Record<string, unknown>
  sort?: string
}

async function findPostsUncached({
  locale,
  limit = 10,
  page = 1,
  depth = 1,
  where,
  sort = "-createdAt",
}: FindPostsOptions) {
  const payload = await getPayloadClient()
  const isEnabled = await isDraftModeEnabled()

  return payload.find({
    collection: "posts" as any,
    limit,
    page,
    sort: sort as any,
    where: where as any,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth,
  })
}

export const findPosts = cache(async (options: FindPostsOptions) => {
  const isEnabled = await isDraftModeEnabled()
  if (isEnabled) return findPostsUncached(options)

  const { locale, limit = 10, page = 1, depth = 1, where, sort = "-createdAt" } = options
  const cacheKey = JSON.stringify({ locale, limit, page, depth, where, sort })

  return unstable_cache(
    () => findPostsUncached(options),
    ["find-posts", cacheKey],
    { revalidate: REVALIDATE_SECONDS, tags: [`posts-${locale}`] }
  )()
})

type FindPortfolioOptions = {
  locale: Locale
  limit?: number
  page?: number
  depth?: number
  where?: Record<string, unknown>
}

async function findPortfolioUncached({
  locale,
  limit = 10,
  page = 1,
  depth = 1,
  where,
}: FindPortfolioOptions) {
  const payload = await getPayloadClient()
  const isEnabled = await isDraftModeEnabled()

  return payload.find({
    collection: "portfolio" as any,
    limit,
    page,
    sort: "-createdAt" as any,
    where: where as any,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth,
  })
}

export const findPortfolio = cache(async (options: FindPortfolioOptions) => {
  const isEnabled = await isDraftModeEnabled()
  if (isEnabled) return findPortfolioUncached(options)

  const { locale, limit = 10, page = 1, depth = 1, where } = options
  const cacheKey = JSON.stringify({ locale, limit, page, depth, where })

  return unstable_cache(
    () => findPortfolioUncached(options),
    ["find-portfolio", cacheKey],
    { revalidate: REVALIDATE_SECONDS, tags: [`portfolio-${locale}`] }
  )()
})

async function findCategoriesUncached(locale: Locale) {
  const payload = await getPayloadClient()
  const isEnabled = await isDraftModeEnabled()

  return payload.find({
    collection: "categories" as any,
    limit: 100,
    locale: locale as any,
    fallbackLocale: false as any,
    sort: "name" as any,
    depth: 1,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
  })
}

export const findCategories = cache(async (locale: Locale) => {
  const isEnabled = await isDraftModeEnabled()
  if (isEnabled) return findCategoriesUncached(locale)

  return unstable_cache(
    () => findCategoriesUncached(locale),
    ["find-categories", locale],
    { revalidate: REVALIDATE_SECONDS, tags: [`categories-${locale}`] }
  )()
})

async function findPostBySlugUncached(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const isEnabled = await isDraftModeEnabled()

  const result = await payload.find({
    collection: "posts" as any,
    where: { slug: { equals: slug } },
    limit: 1,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    depth: 2 as any,
    overrideAccess: isEnabled,
  })

  return result.docs?.[0]
}

export const findPostBySlug = cache(async (locale: Locale, slug: string) => {
  const isEnabled = await isDraftModeEnabled()
  if (isEnabled) return findPostBySlugUncached(locale, slug)

  return unstable_cache(
    () => findPostBySlugUncached(locale, slug),
    ["find-post-by-slug", locale, slug],
    { revalidate: REVALIDATE_SECONDS, tags: [`posts-${locale}`, `post-${slug}`] }
  )()
})

export async function getLatestPostLinks(locale: Locale, limit = 4) {
  const { docs } = await findPosts({ locale, limit, depth: 0 })

  return docs
    .filter((post) => typeof post.slug === "string" && typeof post.title === "string")
    .map((post) => ({
      label: post.title as string,
      href: `/${locale}/blog/${post.slug}`,
    }))
}

export async function getPostCategoryCounts(locale: Locale) {
  const { docs } = await findPosts({ locale, limit: 500, depth: 1 })

  return docs.reduce<Record<string, number>>((acc, post: any) => {
    if (!Array.isArray(post.categories)) return acc
    for (const category of post.categories) {
      const slug = typeof category?.slug === "string" ? category.slug : undefined
      if (slug) acc[slug] = (acc[slug] ?? 0) + 1
    }
    return acc
  }, {})
}

async function findPortfolioBySlugUncached(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const isEnabled = await isDraftModeEnabled()

  const result = await payload.find({
    collection: "portfolio" as any,
    where: { slug: { equals: slug } },
    limit: 1,
    locale: locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    depth: 2 as any,
    overrideAccess: isEnabled,
  })

  return result.docs?.[0]
}

export const findPortfolioBySlug = cache(async (locale: Locale, slug: string) => {
  const isEnabled = await isDraftModeEnabled()
  if (isEnabled) return findPortfolioBySlugUncached(locale, slug)

  return unstable_cache(
    () => findPortfolioBySlugUncached(locale, slug),
    ["find-portfolio-by-slug", locale, slug],
    { revalidate: REVALIDATE_SECONDS, tags: [`portfolio-${locale}`, `portfolio-item-${slug}`] }
  )()
})
