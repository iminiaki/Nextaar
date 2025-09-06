import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { getDictionary, type Locale } from "@/lib/i18n";
import { RevealOnScroll } from "@/components/gsap/reveal";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { draftMode } from "next/headers";

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const c = dict.pages.blog;
  const base = `/${params.locale}`;

  const payload = await getPayload({ config: payloadConfig });
  const { isEnabled } = await draftMode();
  const { docs: posts } = await payload.find({
    collection: "posts" as any,
    limit: 100,
    locale: params.locale as any,
    fallbackLocale: false as any,
    draft: isEnabled as any,
    overrideAccess: isEnabled,
    depth: 2,
  });

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

      <RevealOnScroll staggerChildren className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((p) => (
              <PostCard
                key={p.slug}
                href={`${base}/blog/${p.slug}`}
                title={p.title}
                excerpt={p.excerpt}
                imageUrl={p.image?.url}
                createdAt={p.createdAt}
                readingTime={p.readingTime}
                author={{
                  name: (p.author && typeof p.author === "object") ? (p.author as any).name : undefined,
                  avatar: (p.author && typeof p.author === "object") ? (p.author as any).image?.url : undefined,
                }}
                categories={Array.isArray((p as any).categories)
                  ? (p as any).categories.map((c: any) => {
                      if (c && typeof c === "object") {
                        const name = c.name
                        if (name && typeof name === "object" && name[params.locale]) return name[params.locale]
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
  );
}
