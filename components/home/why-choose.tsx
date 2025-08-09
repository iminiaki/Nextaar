import { Check } from "lucide-react"
import { RevealOnScroll } from "@/components/gsap/reveal"

export function WhyChoose({
  title,
  bullets,
}: {
  title: string
  bullets: string[]
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <RevealOnScroll staggerChildren className="mt-10">
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {bullets.map((b, i) => (
              <li key={i} data-animate className="flex items-start gap-3 rounded-lg border p-4">
                <Check className="mt-1 h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  )
}
