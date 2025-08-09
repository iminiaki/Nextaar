import { RevealOnScroll } from "@/components/gsap/reveal"

export function Partners({ title }: { title: string }) {
  const logos = [
    "/generic-brand-logo-1.png",
    "/generic-brand-logo-2.png",
    "/brand-logo-3.png",
    "/brand-logo-4.png",
    "/brand-logo-5.png",
    "/brand-logo-6.png",
  ]
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-xl font-medium">{title}</h3>
        </div>
        <RevealOnScroll staggerChildren className="mt-6">
          <div className="grid grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {logos.map((src, i) => (
              <div key={i} className="flex items-center justify-center" data-animate>
                <img
                  src={src || "/placeholder.svg"}
                  alt={"Partner logo " + (i + 1)}
                  className="h-10 opacity-70 grayscale"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
