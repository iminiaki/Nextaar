type MediaLike = {
  url?: string | null
  filename?: string | null
} | string | null | undefined

/** Prefer public `/media/...` so next/image can optimize local files reliably. */
export function getMediaSrc(media: MediaLike, fallback = "/placeholder.svg") {
  if (!media) return fallback

  if (typeof media === "string") {
    if (media.startsWith("/api/media/file/")) {
      return `/media/${decodeURIComponent(media.slice("/api/media/file/".length))}`
    }
    return media || fallback
  }

  if (typeof media.filename === "string" && media.filename.trim()) {
    return `/media/${media.filename}`
  }

  if (typeof media.url === "string" && media.url.startsWith("/api/media/file/")) {
    return `/media/${decodeURIComponent(media.url.slice("/api/media/file/".length))}`
  }

  return media.url || fallback
}
