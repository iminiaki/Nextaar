import { RevealOnScroll } from "@/components/gsap/reveal"

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
    "/techs/NGINX.svg",
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
        <RevealOnScroll staggerChildren className="mt-6">
          <div className="grid grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {logos.map((src, i) => (
              <div key={i} className="flex items-center justify-center" data-animate>
                <img
                  src={src || "/placeholder.svg"}
                  alt={"Partner logo " + (i + 1)}
                  className="h-10 grayscale hover:grayscale-0 transition-grayscale duration-300"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
