import { notFound } from "next/navigation"
import { getDictionary, type Locale } from "@/lib/i18n"
import { posts } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { CalendarDays, UserRound, Clock3 } from "lucide-react"
import { ShareButton } from "../../../../components/blog/share-button"
import { BlogTOC } from "../../../../components/blog/toc"
import { SubscribeWidget } from "../../../../components/blog/subscribe-widget"

type Params = { params: { locale: Locale; slug: string } }

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) => posts.map((p) => ({ locale: loc, slug: p.slug })))
}

export default async function PostDetail({ params }: Params) {
  const dict = await getDictionary(params.locale)
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const author = "Lastaar"
  const bodyText = post.body[params.locale] || ""
  const words = bodyText.trim().split(/\s+/).filter(Boolean)
  const readingMinutes = Math.max(1, Math.ceil(words.length / 200))
  const shareLabels = dict.blogDetail.share

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1 order-2 md:order-1">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold">{dict.blogDetail.tocTitle}</h3>
              <BlogTOC containerId="post-content" locale={params.locale} />
            </div>
            <SubscribeWidget locale={params.locale} labels={dict.blogDetail.subscribe} />
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-3 order-1 md:order-2">
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title[params.locale]}</h1>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />{new Date(post.date).toLocaleDateString()}</span>
              <span className="inline-flex items-center gap-1"><UserRound className="size-4" />{author}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-4" />
                {`${readingMinutes} ${dict.blogDetail.readTimeSuffix}`}
              </span>
              <span className="mx-1 h-4 w-px bg-border" />
              <ShareButton
                title={post.title[params.locale]}
                ariaLabel={shareLabels.title}
                locale={params.locale}
                labels={shareLabels}
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title[params.locale]}
              className="w-full rounded-xl border"
            />
          </RevealOnScroll>

          <RevealOnScroll className="prose mt-8 max-w-none dark:prose-invert">
            <div id="post-content">
              <h2>hiiiii</h2>
              <p>{bodyText}</p>
              <h3>dadadfadf</h3>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  )
}
