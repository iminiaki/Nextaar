import { notFound } from "next/navigation"
import { getDictionary, type Locale } from "@/lib/i18n"
import { posts } from "@/lib/content"
import { RevealOnScroll } from "@/components/gsap/reveal"

type Params = { params: { locale: Locale; slug: string } }

export async function generateStaticParams() {
  return ["en", "fa", "ar"].flatMap((loc) => posts.map((p) => ({ locale: loc, slug: p.slug })))
}

export default async function PostDetail({ params }: Params) {
  const _dict = await getDictionary(params.locale)
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title[params.locale]}</h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-2 text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title[params.locale]}
          className="w-full max-w-3xl rounded-lg border"
        />
      </RevealOnScroll>

      <RevealOnScroll className="prose mt-8 max-w-3xl dark:prose-invert">
        <p>{post.body[params.locale]}</p>
      </RevealOnScroll>
    </article>
  )
}
