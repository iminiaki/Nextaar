import { RevealOnScroll } from "@/components/gsap/reveal"
import Image from "next/image"

export function Partners({ title }: { title: string }) {
  const logos = [
    "/techs/Backbone.js.svg",
    "/techs/Bootstrap.svg",
    "/techs/Express.svg",
    "/techs/Firebase.svg",
    "/techs/Gatsby.svg",
    "/techs/GraphQL.svg",
    "/techs/Laravel.svg",
    "/techs/Material UI.svg",
    "/techs/MongoDB.svg",
    "/techs/MySQL.svg",
    "/techs/Nest.js.svg",
    "/techs/Next.js.svg",
    "/techs/NGINeX.svg",
    "/techs/Node.js.svg",
    "/techs/Nuxt JS.svg",
    "/techs/payload.svg",
    "/techs/PHP.svg",
    "/techs/PostgresSQL.svg",
    "/techs/React.svg",
    "/techs/Solid.js.svg",
    "/techs/Tailwind CSS.svg",
    "/techs/TypeScript.svg",
    "/techs/Vite.js.svg",
    "/techs/Vue.js.svg",
  ]
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-xl font-medium mb-12">{title}</h3>
        </div>
        <RevealOnScroll staggerChildren className="mt-6" start="top 88%">
          <div className="grid grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {logos.map((src, i) => (
              <div key={i} className="flex items-center justify-center" data-animate>
                <Image
                  width={100}
                  height={100}
                  src={src || "/placeholder.svg"}
                  alt={"Partner logo " + (i + 1)}
                  loading="lazy"
                  decoding="async"
                  className="h-10 grayscale transition duration-300 hover:grayscale-0 dark:invert dark:hover:invert-0"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
