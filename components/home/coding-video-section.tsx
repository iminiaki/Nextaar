import { RevealOnScroll } from "@/components/gsap/reveal"

export function CodingVideoSection({
  eyebrow,
  title,
  subtitle,
  stats,
}: {
  eyebrow: string
  title: string
  subtitle: string
  stats: { value: string; label: string }[]
}) {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/60 p-2 shadow-2xl shadow-black/10 backdrop-blur dark:shadow-black/40">
            <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <video
                src="/media/coding.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="aspect-[16/10] min-h-[420px] w-full object-cover brightness-[0.62] saturate-125 md:aspect-video"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,24,147,0.18),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.72))]" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center px-6 py-12 text-center text-white">
                <div className="mx-auto max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-100 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.9)] animate-pulse" />
                    {eyebrow}
                  </span>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">{subtitle}</p>
                  <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-center backdrop-blur-md">
                    {stats.map((stat) => (
                      <div key={stat.label} className="border-white/10 px-3 py-4 not-last:border-e sm:px-5">
                        <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</div>
                        <div className="mt-1 text-xs leading-5 text-white/70 sm:text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
