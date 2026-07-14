"use client"

import Link from "next/link"
import { Clock, MoveRight, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { isRTL, type Locale } from "@/lib/i18n"

type Author = { name: string; avatar?: string }
type PostCardLabels = { readTimeSuffix: string; authorAlt: string }

export type PostCardProps = {
  id?: string
  href?: string
  title: string
  caption?: string
  excerpt?: string
  imageUrl?: string | null
  imageAlt?: string
  author?: Author
  date?: string | Date
  createdAt?: string | Date
  category?: string
  categories?: string[]
  readTime?: string | number | null
  readingTime?: number | null
  className?: string
  locale?: Locale
  labels?: Partial<PostCardLabels>
}

export function PostCard(props: PostCardProps) {
  const {
    href,
    title,
    caption,
    excerpt,
    imageUrl,
    imageAlt,
    author,
    date,
    createdAt,
    category,
    categories,
    readTime,
    readingTime,
    className = "",
  } = props

  const rtl = props.locale ? isRTL(props.locale) : false
  const authorAlt = author?.name || props.labels?.authorAlt || "Author"

  const content = (
    <Card
      className={`group relative h-full overflow-hidden border-border/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-border hover:shadow-2xl hover:shadow-black/5 will-change-transform ${className}`}
      style={{ borderRadius: "1.5rem" }}
      data-animate
      data-cursor-variant="post"
    >
      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-4 pb-0">
        <div className="relative h-56 overflow-hidden rounded-2xl shadow-lg shadow-black/5">
          <ImageWithFallback
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt || title}
            className="transition-all duration-700 group-hover:rotate-1 group-hover:scale-110 will-change-transform"
            fetchPriority="low"
          />

          {Array.isArray(categories) && categories.length > 0 ? (
            <div className={`absolute top-4 flex max-w-[90%] flex-wrap items-center gap-2 ${rtl ? "right-4" : "left-4"}`}>
              {categories.slice(0, 3).map((cat, idx) => (
                <Badge key={`${cat}-${idx}`} className="border-0 bg-black/20 px-2 py-1 text-xs text-white backdrop-blur-md">
                  <span className="">{cat}</span>
                </Badge>
              ))}
              {categories.length > 3 ? (
                <Badge className="border-0 px-2 py-1 text-xs shadow-lg backdrop-blur-md">+{categories.length - 3}</Badge>
              ) : null}
            </div>
          ) : category ? (
            <Badge className={`absolute !bg-none top-4 border-0 px-3 py-1 shadow-lg backdrop-blur-md ${rtl ? "right-4" : "left-4"}`}>
              <span className="">{category}</span>
            </Badge>
          ) : null}

          {readTime ?? readingTime ? (
            <div className={`absolute bottom-4 flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs text-white backdrop-blur-md ${rtl ? "left-4" : "right-4"}`}>
              <Clock className="h-3 w-3" />
              <span>
                {typeof (readTime ?? readingTime) === "number"
                  ? `${readTime ?? readingTime} ${props.labels?.readTimeSuffix ?? "min"}`
                  : (readTime ?? "")}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <CardContent className="space-y-4 py-5">
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl transition-colors duration-300">
            {title}
          </h3>
          {(caption ?? excerpt) ? (
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{caption ?? excerpt}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-border/30 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-background shadow-md rounded-lg group-hover:rounded-4xl transition-all duration-300">
              <AvatarImage src={author?.avatar} alt={authorAlt} />
              <AvatarFallback className="bg-gradient-to-br from-primary/10 to-accent/10">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
              {author?.name ? <p className="text-sm">{author.name}</p> : null}
              {(date ?? createdAt) ? (
                <p className="text-xs text-muted-foreground">{new Date(date ?? createdAt as any).toLocaleDateString(props.locale)}</p>
              ) : null}
            </div>
          </div>
          <div className="group-hover:bg-primary group-hover:scale-125 rounded-full p-2 transition-all duration-300">
            <MoveRight className={`h-4 w-4 group-hover:text-white transition-all duration-300 ${rtl ? "rotate-180" : ""}`} />
          </div>
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 transition-colors duration-300 group-hover:bg-primary/10">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-colors duration-300 group-hover:bg-primary" />
          </div> */}
        </div>
      </CardContent>
    </Card>
  )

  return href ? <Link href={href} data-cursor-variant="post" className="cursor-none">{content}</Link> : content
}