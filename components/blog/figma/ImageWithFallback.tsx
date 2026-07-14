"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  src?: string | null
  fallbackSrc?: string
  alt?: string
  className?: string
  sizes?: string
  loading?: "lazy" | "eager"
  fetchPriority?: "auto" | "high" | "low"
}

export function ImageWithFallback({
  fallbackSrc = "/placeholder.svg",
  src,
  alt = "",
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  loading = "lazy",
  fetchPriority = "low",
}: Props) {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc)
  const [useNativeImg, setUseNativeImg] = React.useState(false)

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
    setUseNativeImg(false)
  }, [src, fallbackSrc])

  if (useNativeImg || !currentSrc.startsWith("/")) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={() => setCurrentSrc(fallbackSrc)}
      />
    )
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority}
      className={cn("object-cover", className)}
      onError={() => {
        setUseNativeImg(true)
        setCurrentSrc(fallbackSrc)
      }}
    />
  )
}
