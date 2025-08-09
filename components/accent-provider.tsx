import type React from "react"
import type { ReactNode } from "react"

export function AccentProvider({ children }: { children: ReactNode }) {
  return (
    <div
      style={
        {
          ["--primary" as any]: "#a30098",
          ["--primary-foreground" as any]: "white",
          ["--ring" as any]: "oklch(0.6 0.1 320)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
