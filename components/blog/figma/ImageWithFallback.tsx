"use client"

import * as React from "react"

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string
}

export function ImageWithFallback({ fallbackSrc = "/placeholder.svg", onError, ...props }: Props) {
  const [src, setSrc] = React.useState<string | undefined>(
    typeof props.src === "string" ? props.src : undefined
  )

  React.useEffect(() => {
    if (typeof props.src === "string") setSrc(props.src)
  }, [props.src])

  return (
    <img
      {...props}
      src={src || fallbackSrc}
      loading={props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
      fetchPriority={props.fetchPriority ?? "low"}
      onError={(e) => {
        setSrc(fallbackSrc)
        onError?.(e as any)
      }}
    />
  )
}


