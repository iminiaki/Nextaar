import { NextRequest, NextResponse } from "next/server"
import {
  detectLocale,
  LOCALE_COOKIE,
  readCountryFromHeaders,
} from "@/lib/locale-from-geo"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname !== "/") {
    return NextResponse.next()
  }

  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = detectLocale({
    preferred: savedLocale,
    country: request.geo?.country ?? readCountryFromHeaders(request.headers),
    acceptLanguage: request.headers.get("accept-language"),
  })

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/"],
}
