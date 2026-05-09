import { getDictionary, type Locale } from "@/lib/i18n"
import { RevealOnScroll } from "@/components/gsap/reveal"
import { Rocket, Eye, Users } from "lucide-react"
import { TeamMemberCard } from "@/components/about/team-member-card"

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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.team?.members?.map((m, i) => (
            <TeamMemberCard
              key={`${m.name}-${i}`}
              name={m.name}
              role={m.role}
              photo={m.photo}
              socials={m.socials}
            />
          ))}
        </div>
      </RevealOnScroll>

    </div>
  )
}