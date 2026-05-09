import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { getDictionary, type Locale } from "@/lib/i18n";
import { RevealOnScroll } from "@/components/gsap/reveal";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { draftMode } from "next/headers";
import { Hash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubscribeWidget } from "@/components/blog/subscribe-widget";

function getLocalizedName(category: any, locale: Locale) {
  const name = category?.name;
  if (name && typeof name === "object" && typeof name[locale] === "string") return name[locale];
  if (typeof name === "string") return name;
  return undefined;
}

function getCategorySlug(category: any) {
  return typeof category?.slug === "string" ? category.slug : undefined;
}

function postHasCategory(post: any, categorySlug?: string) {
  if (!categorySlug) return true;
  if (!Array.isArray(post?.categories)) return false;
  return post.categories.some((category: any) => getCategorySlug(category) === categorySlug);
}

function postMatchesSearch(post: any, query: string, locale: Locale) {
  if (!query) return true;
  const normalizedQuery = query.trim().toLowerCase();
  const categoryNames = Array.isArray(post?.categories)
    ? post.categories.map((category: any) => getLocalizedName(category, locale)).filter(Boolean).join(" ")
    : "";
  const searchable = [post?.title, post?.excerpt, categoryNames].filter(Boolean).join(" ").toLowerCase();

  return searchable.includes(normalizedQuery);
}

function createBlogHref(base: string, params: { category?: string; q?: string }) {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set("category", params.category);
  if (params.q) searchParams.set("q", params.q);
  const query = searchParams.toString();

  return query ? `${base}/blog?${query}` : `${base}/blog`;
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams?: { category?: string; q?: string };
}) {
  const dict = await getDictionary(params.locale);
  const c = dict.pages.blog;
  const base = `/${params.locale}`;
  const activeCategory = searchParams?.category;
  const searchQuery = searchParams?.q?.trim() ?? "";

  const payload = await getPayload({ config: payloadConfig });
  const { isEnabled } = await draftMode();
  const [{ docs: posts }, { docs: categories }] = await Promise.all([
    payload.find({
      collection: "posts" as any,
      limit: 100,
      locale: params.locale as any,
      fallbackLocale: false as any,
      draft: isEnabled as any,
      overrideAccess: isEnabled,
      depth: 2,
    }),
    payload.find({
      collection: "categories" as any,
      limit: 100,
      locale: params.locale as any,
      fallbackLocale: false as any,
      sort: "name" as any,
      depth: 1,
    }),
  ]);

  const sortedPosts = posts
    .filter((post) => postHasCategory(post, activeCategory))
    .filter((post) => postMatchesSearch(post, searchQuery, params.locale))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const postCountByCategory = posts.reduce<Record<string, number>>((acc, post: any) => {
    if (!Array.isArray(post.categories)) return acc;
    for (const category of post.categories) {
      const slug = getCategorySlug(category);
      if (slug) acc[slug] = (acc[slug] ?? 0) + 1;
    }
    return acc;
  }, {});

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
                  <span className="text-xs opacity-80">{posts.length}</span>
                </Link>
                {categories.map((category: any) => {
                  const slug = getCategorySlug(category);
                  const name = getLocalizedName(category, params.locale);
                  if (!slug || !name) return null;
                  const isActive = activeCategory === slug;

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
                  );
                })}
              </nav>
            </div>

            <SubscribeWidget locale={params.locale} labels={dict.blogDetail.subscribe} />
          </aside>
        </RevealOnScroll>

        <RevealOnScroll staggerChildren className="lg:col-span-9">
          {sortedPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sortedPosts.map((p) => (
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
          ) : (
            <div className="rounded-2xl border bg-card/60 p-8 text-center text-sm text-muted-foreground">
              {c.noPosts}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
}
