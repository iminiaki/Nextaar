import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import localFont from "next/font/local"
import "./globals.css"

// Arabic/Persian font (Peyda)
const Peyda = localFont({
  src: [
    { path: "../public/fonts/Peyda-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/Peyda-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/Peyda-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Peyda-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Peyda-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Peyda-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Peyda-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Peyda-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Peyda-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-peyda",
})

// Metadata
export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // This should come from your language detection (router, i18n, etc.)
  const currentLang: string = "en" // Example: change this dynamically
  const isRTL = currentLang === "fa" || currentLang === "ar"

  return (
    <html
      lang={currentLang}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? Peyda.variable : GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
