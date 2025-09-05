"use client"

import Link from "next/link"
import { Clock, MoveRight, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"

type Author = { name: string; avatar?: string }

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
  readTime?: string | number | null
  readingTime?: number | null
  className?: string
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
    readTime,
    readingTime,
    className = "",
  } = props

  const content = (
    <Card
      className={`group relative h-full overflow-hidden border-border/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-border hover:shadow-2xl hover:shadow-black/5 ${className}`}
      style={{ borderRadius: "1.5rem" }}
      data-animate
    >
      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-4 pb-0">
        <div className={`relative overflow-hidden rounded-2xl shadow-lg shadow-black/5`}>
          <ImageWithFallback
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt || title}
            className="h-56 w-full object-cover transition-all duration-700 group-hover:rotate-1 group-hover:scale-110 "
          />

          {category ? (
            <Badge className="absolute left-4 top-4 border-0 bg-background/95 px-3 py-1 shadow-lg backdrop-blur-md">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{category}</span>
            </Badge>
          ) : null}

          {readTime ?? readingTime ? (
            <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs text-white backdrop-blur-md">
              <Clock className="h-3 w-3" />
              <span>
                {typeof (readTime ?? readingTime) === "number"
                  ? `${readTime ?? readingTime} min`
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
            <Avatar className="h-10 w-10 ring-2 ring-background shadow-md">
              <AvatarImage src={author?.avatar} alt={author?.name || "author"} />
              <AvatarFallback className="bg-gradient-to-br from-primary/10 to-accent/10">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
              {author?.name ? <p className="text-sm">{author.name}</p> : null}
              {(date ?? createdAt) ? (
                <p className="text-xs text-muted-foreground">{new Date(date ?? createdAt as any).toLocaleDateString()}</p>
              ) : null}
            </div>
          </div>
              <div className="group-hover:bg-primary group-hover:scale-125 rounded-full p-2 transition-all duration-300">
                <MoveRight className="h-4 w-4 group-hover:text-white transition-all duration-300" />
              </div>
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 transition-colors duration-300 group-hover:bg-primary/10">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-colors duration-300 group-hover:bg-primary" />
          </div> */}
        </div>
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{content}</Link> : content
}