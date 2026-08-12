type MediaSize = {
  url?: string | null
  filename?: string | null
}

type MediaLike =
  | {
      url?: string | null
      filename?: string | null
      sizes?: {
        banner?: MediaSize | null
        thumbnail?: MediaSize | null
      } | null
    }
  | string
  | null
  | undefined

/** Hand-optimized WebP siblings for oversized PNG masters in /public/media. */
const WEBP_MASTERS = new Set([
  "ChatGPT Image Jul 13, 2026, 10_01_37 AM.png",
  "ChatGPT Image Jul 13, 2026, 10_01_37 AM-1024x640.png",
  "ChatGPT Image Jul 28, 2025, 03_57_27 AM.png",
  "ChatGPT Image Jul 28, 2025, 03_57_27 AM-1024x640.png",
])

function toPublicPath(raw: string) {
  let value = raw.trim()
  if (!value) return value

  if (value.startsWith("/api/media/file/")) {
    value = `/media/${decodeURIComponent(value.slice("/api/media/file/".length))}`
  } else if (!value.startsWith("/") && !value.startsWith("http")) {
    value = `/media/${value}`
  }

  if (value.startsWith("/media/")) {
    const filename = decodeURIComponent(value.slice("/media/".length))
    if (WEBP_MASTERS.has(filename)) {
      return `/media/${filename.replace(/\.png$/i, ".webp")}`
    }
  }

  return value
}

function fromSize(size?: MediaSize | null) {
  if (!size) return null
  if (typeof size.filename === "string" && size.filename.trim()) {
    return toPublicPath(size.filename)
  }
  if (typeof size.url === "string" && size.url.trim()) {
    return toPublicPath(size.url)
  }
  return null
}

/** Prefer public `/media/...` so next/image can optimize local files reliably. */
export function getMediaSrc(
  media: MediaLike,
  fallback = "/placeholder.svg",
  preferredSize?: "banner" | "thumbnail",
) {
  if (!media) return fallback

  if (typeof media === "string") {
    return toPublicPath(media) || fallback
  }

  // Prefer a hand-optimized WebP master over Payload's resized PNG variants.
  if (typeof media.filename === "string" && media.filename.trim()) {
    const master = toPublicPath(media.filename)
    if (master.endsWith(".webp")) return master
  }

  if (preferredSize) {
    const sized = fromSize(media.sizes?.[preferredSize])
    if (sized) return sized
  }

  if (typeof media.filename === "string" && media.filename.trim()) {
    return toPublicPath(media.filename)
  }

  if (typeof media.url === "string" && media.url.trim()) {
    return toPublicPath(media.url)
  }

  return fallback
}
