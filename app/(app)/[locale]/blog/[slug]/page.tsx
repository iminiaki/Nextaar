import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { RevealOnScroll } from "@/components/gsap/reveal";
import { CalendarDays, UserRound, Clock3 } from "lucide-react";
import { ShareButton } from "@/components/blog/share-button";
import { BlogTOC } from "@/components/blog/toc";
import { SubscribeWidget } from "@/components/blog/subscribe-widget";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Params = { params: { locale: Locale; slug: string } };

export const generateMetaData = async ({ params }: Params) => {
  const payload = await getPayload({ config: payloadConfig });
  const { docs: posts } = await payload.find({
    collection: "posts" as any,
    limit: 100,
    locale: params.locale as any,
  });

  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
};

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) =>
    posts.map((p) => ({ locale: loc, slug: p.slug }))
  );
}

export default async function PostDetail({ params }: Params) {
  const dict = await getDictionary(params.locale);
  const payload = await getPayload({ config: payloadConfig });
  const { docs: posts } = await payload.find({
    collection: "posts" as any,
    limit: 100,
    locale: params.locale as any,
  });

  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-4">
        {/* Sidebar */}
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

        {/* Main */}
        <div className="lg:col-span-3 order-1 md:order-2">
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-1">
                <UserRound className="size-4" />
                {post.author?.name}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-4" />
                {`${post.readingTime} ${dict.blogDetail.readTimeSuffix}`}
              </span>
              <span className="mx-1 h-4 w-px bg-border" />
              <ShareButton
                title={post.title}
                ariaLabel={dict.blogDetail.share.title}
                locale={params.locale}
                labels={dict.blogDetail.share}
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8">
            <img
              src={post.thumbnail.url || "/placeholder.svg"}
              alt={post.title}
              className="w-full rounded-xl aspect-[2/1] object-cover"
            />
          </RevealOnScroll>

          <RevealOnScroll className="prose mt-8 max-w-none dark:prose-invert">
            <div id="post-content">
              <RichText data={post.body} />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
}
