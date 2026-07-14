"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const routeLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    portfolio: "Portfolio",
    services: "Services",
    terms: "Terms and Conditions",
    "data-protection": "Data Protection",
    "web-development": "Web Development",
    design: "Design",
    "seo-aeo-geo": "SEO, AEO and GEO",
    "ad-campaigns": "Ad Campaigns",
  },
  fa: {
    home: "صفحه نخست",
    about: "درباره",
    blog: "بلاگ",
    contact: "تماس",
    portfolio: "نمونه کارها",
    services: "خدمات",
    terms: "شرایط و قوانین",
    "data-protection": "حفاظت از داده ها",
    "web-development": "توسعه وب",
    design: "طراحی",
    "seo-aeo-geo": "خدمات SEO، AEO و GEO",
    "ad-campaigns": "کمپین تبلیغاتی",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    blog: "المدونة",
    contact: "اتصل",
    portfolio: "الأعمال",
    services: "الخدمات",
    terms: "الشروط والأحكام",
    "data-protection": "حماية البيانات",
    "web-development": "تطوير الويب",
    design: "التصميم",
    "seo-aeo-geo": "خدمات SEO وAEO وGEO",
    "ad-campaigns": "حملات إعلانية",
  },
}

function toTitleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getSegmentLabel(segment: string, locale: Locale) {
  return routeLabels[locale][segment] ?? toTitleCase(decodeURIComponent(segment))
}

type BreadcrumbItem = {
  label: string
  href: string
}

type BlogPostBreadcrumb = {
  title?: string
  category?: {
    label: string
    slug?: string
  }
}

function getLocalizedField(value: unknown, locale: Locale) {
  if (typeof value === "string") return value
  if (value && typeof value === "object") {
    const localized = (value as Record<string, unknown>)[locale]
    if (typeof localized === "string") return localized
  }
  return undefined
}

export function Breadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [blogPost, setBlogPost] = useState<BlogPostBreadcrumb | null>(null)
  const [blogCategory, setBlogCategory] = useState<{ label: string; slug: string } | null>(null)
  const rtl = isRTL(locale)
  const segments = pathname.split("/").filter(Boolean)
  const pathLocale = segments[0]
  const routeSegments = pathLocale === locale ? segments.slice(1) : segments
  const isBlogPost = routeSegments[0] === "blog" && routeSegments.length === 2
  const postSlug = isBlogPost ? routeSegments[1] : undefined
  const categorySlug = searchParams.get("category") ?? undefined
  const isBlogCategory =
    routeSegments[0] === "blog" && routeSegments.length === 1 && Boolean(categorySlug)

  useEffect(() => {
    if (!postSlug) {
      setBlogPost(null)
      return
    }

    const controller = new AbortController()

    async function fetchPostBreadcrumb() {
      try {
        const params = new URLSearchParams({
          limit: "1",
          depth: "2",
          locale,
        })
        params.set("where[slug][equals]", postSlug)

        const response = await fetch(`/api/posts?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!response.ok) return

        const result = await response.json()
        const post = result?.docs?.[0]
        if (!post) return

        const firstCategory = Array.isArray(post.categories) ? post.categories[0] : undefined
        const categoryLabel = firstCategory ? getLocalizedField(firstCategory.name, locale) : undefined

        setBlogPost({
          title: getLocalizedField(post.title, locale),
          category: categoryLabel
            ? {
                label: categoryLabel,
                slug: typeof firstCategory?.slug === "string" ? firstCategory.slug : undefined,
              }
            : undefined,
        })
      } catch (error) {
        if (!controller.signal.aborted) setBlogPost(null)
      }
    }

    fetchPostBreadcrumb()

    return () => controller.abort()
  }, [locale, postSlug])

  useEffect(() => {
    if (!isBlogCategory || !categorySlug) {
      setBlogCategory(null)
      return
    }

    const controller = new AbortController()

    async function fetchCategoryBreadcrumb() {
      try {
        const params = new URLSearchParams({
          limit: "1",
          locale,
        })
        params.set("where[slug][equals]", categorySlug)

        const response = await fetch(`/api/categories?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!response.ok) return

        const result = await response.json()
        const category = result?.docs?.[0]
        if (!category) return

        const label = getLocalizedField(category.name, locale)
        if (!label) return

        setBlogCategory({ label, slug: categorySlug })
      } catch {
        if (!controller.signal.aborted) setBlogCategory(null)
      }
    }

    fetchCategoryBreadcrumb()

    return () => controller.abort()
  }, [categorySlug, isBlogCategory, locale])

  const items = useMemo<BreadcrumbItem[]>(() => {
    const homeItem = {
      label: routeLabels[locale].home,
      href: `/${locale}`,
    }

    if (isBlogPost && postSlug) {
      const blogItem = {
        label: routeLabels[locale].blog,
        href: `/${locale}/blog`,
      }
      const categoryItem = blogPost?.category
        ? {
            label: blogPost.category.label,
            href: blogPost.category.slug
              ? `/${locale}/blog?category=${encodeURIComponent(blogPost.category.slug)}`
              : `/${locale}/blog`,
          }
        : undefined
      const postItem = {
        label: blogPost?.title ?? getSegmentLabel(postSlug, locale),
        href: `/${locale}/blog/${postSlug}`,
      }

      return [homeItem, blogItem, ...(categoryItem ? [categoryItem] : []), postItem]
    }

    if (isBlogCategory && categorySlug) {
      const blogItem = {
        label: routeLabels[locale].blog,
        href: `/${locale}/blog`,
      }
      const categoryItem = {
        label: blogCategory?.label ?? getSegmentLabel(categorySlug, locale),
        href: `/${locale}/blog?category=${encodeURIComponent(categorySlug)}`,
      }

      return [homeItem, blogItem, categoryItem]
    }

    return [
      homeItem,
      ...routeSegments.map((segment, index) => ({
        label: getSegmentLabel(segment, locale),
        href: `/${locale}/${routeSegments.slice(0, index + 1).join("/")}`,
      })),
    ]
  }, [blogCategory, blogPost, categorySlug, isBlogCategory, isBlogPost, locale, postSlug, routeSegments])

  if (routeSegments.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      dir={rtl ? "rtl" : "ltr"}
      className="container mx-auto px-4 pt-20 md:pt-24"
    >
      <ol className="inline-flex max-w-full items-center gap-1 rounded-full border bg-background/75 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex min-w-0 items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 opacity-60", rtl && "rotate-180")} />
              ) : null}
              {isLast ? (
                <span className="max-w-[13rem] truncate font-medium text-foreground md:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex max-w-[10rem] items-center gap-1.5 truncate transition-colors hover:text-foreground md:max-w-xs"
                >
                  {index === 0 ? <Home className="h-3.5 w-3.5 shrink-0" /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
