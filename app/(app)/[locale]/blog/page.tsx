import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, type Locale } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { RevealOnScroll } from "@/components/gsap/reveal";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const c = dict.pages.blog;
  const base = `/${params.locale}`;

  const payload = await getPayload({ config: payloadConfig });
  const { docs: posts } = await payload.find({
    collection: "posts" as any,
    limit: 100,
    locale: params.locale as any,
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {c.title}
        </h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.subtitle}</p>
      </RevealOnScroll>

      <RevealOnScroll staggerChildren className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((p) => (
              <Link key={p.slug} href={`${base}/blog/${p.slug}`} data-animate>
                <Card className="h-full transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <img
                      src={p.sizes.thumbnail.url || "/placeholder.svg"}
                      alt={p.title}
                      className="mb-3 w-full rounded-md border"
                    />
                    <p className="mb-2">{p.excerpt}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
