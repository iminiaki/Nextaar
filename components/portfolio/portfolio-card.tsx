import Link from "next/link"
import { cn } from "@/lib/utils"

export type PortfolioCardProps = {
  href?: string
  title: string
  categories?: string[] | string
  image?: string | null
  imageAlt?: string
  className?: string
}

export function PortfolioCard({ href, title, categories, image, imageAlt, className }: PortfolioCardProps) {
  const renderedCategories = Array.isArray(categories) ? categories.join(" · ") : categories

  const content = (
    <div
      className={cn(
        "group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 transition-transform duration-500 hover:-translate-y-1",
        className
      )}
      data-cursor-variant="portfolio"
    >
      {/* Background image */}
      <img
        src={image || "/placeholder.svg"}
        alt={imageAlt || title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay for readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" /> */}

      {/* Blurred info box */}
      <div className="absolute bottom-4 left-4 right-4 group-hover:translate-y-2 group-hover:scale-105 transition-transform duration-500">
        <div
          className="rounded-xl border border-white/15 bg-black/65 p-4 text-white shadow-2xl"
          style={{
            WebkitBackdropFilter: "blur(16px) saturate(160%)",
            backdropFilter: "blur(16px) saturate(160%)",
          }}
        >
          <div className="line-clamp-1 text-lg font-semibold tracking-tight">{title}</div>
          {renderedCategories ? (
            <div className="mt-1 line-clamp-1 text-sm opacity-90">{renderedCategories}</div>
          ) : null}
        </div>
      </div>
    </div>
  )

  return href ? (
    <Link href={href} key={`card-${title}`} data-animate data-cursor-variant="portfolio" className="cursor-none">
      {content}
    </Link>
  ) : (
    content
  )
}


