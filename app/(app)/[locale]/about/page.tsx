import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Rocket, Eye, Users, Github, Linkedin, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  const c = dict.pages.about

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.subtitle}</p>
      </RevealOnScroll>

      {/* About description */}
      <RevealOnScroll className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)] bg-[radial-gradient(600px_200px_at_50%_-80px,hsl(var(--primary)/0.15),transparent_60%)]" />
          <h2 className="text-xl font-semibold mb-2">{c.aboutDescription?.title}</h2>
          <div className="grid gap-3 text-muted-foreground">
            {c.aboutDescription?.body?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Mission & Vision */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border p-6 bg-card/60 backdrop-blur">
            <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background/70"><Rocket className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">{c.mission?.title}</h3>
            <ul className="mt-3 grid gap-2 text-muted-foreground">
              {c.mission?.body?.map((p, i) => (
                <li key={i} className="leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border p-6 bg-card/60 backdrop-blur">
            <div aria-hidden className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background/70"><Eye className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">{c.vision?.title}</h3>
            <ul className="mt-3 grid gap-2 text-muted-foreground">
              {c.vision?.body?.map((p, i) => (
                <li key={i} className="leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>

      {/* Team grid */}
      <RevealOnScroll className="mt-10">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background/70"><Users className="h-5 w-5" /></div>
          <h2 className="text-xl font-semibold">{c.team?.title}</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.team?.members?.map((m, i) => (
            <div key={i} className="group relative flex aspect-[1/1] overflow-hidden rounded-xl border bg-card/60 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 ring-1 ring-transparent group-hover:ring-primary/20">
              {/* Background image */}
              <div aria-hidden className="absolute inset-0 -z-10">
                <Image src={m.photo || "/placeholder-user.jpg"} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transform-gpu transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 brightness-100 group-hover:brightness-110 saturate-110 group-hover:saturate-125" />
              </div>
              {/* Subtle grid overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000,transparent)] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] group-hover:opacity-20 transition-opacity" />
              {/* Gradient overlay for readability */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent transition-colors group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent" />
              <div className="relative z-10 mt-auto p-4 text-white translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-lg font-semibold leading-tight drop-shadow">{m.name}</p>
                <p className="text-sm text-white/80">{m.role}</p>
                {/* Socials */}
                {m.socials ? (
                  <div className="mt-2 flex items-center gap-2">
                    {m.socials.github ? (
                      <a href={m.socials.github} aria-label={`${m.name} GitHub`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/70 text-white/90 hover:text-white">
                        <Github className="h-4 w-4" />
                      </a>
                    ) : null}
                    {m.socials.linkedin ? (
                      <a href={m.socials.linkedin} aria-label={`${m.name} LinkedIn`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/70 text-white/90 hover:text-white">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    ) : null}
                    {m.socials.instagram ? (
                      <a href={m.socials.instagram} aria-label={`${m.name} Instagram`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/70 text-white/90 hover:text-white">
                        <Instagram className="h-4 w-4" />
                      </a>
                    ) : null}
                    {m.socials.twitter ? (
                      <a href={m.socials.twitter} aria-label={`${m.name} Twitter`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/70 text-white/90 hover:text-white">
                        <Twitter className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>

    </div>
  )
}