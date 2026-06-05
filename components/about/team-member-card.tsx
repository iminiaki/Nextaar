import Image from "next/image"
import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { isRTL, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export type TeamMemberSocials = {
  github?: string
  linkedin?: string
  instagram?: string
  twitter?: string
}

export type TeamMemberCardProps = {
  locale: Locale
  name: string
  role: string
  photo?: string
  socials?: TeamMemberSocials
  className?: string
}

export function TeamMemberCard({ locale, name, role, photo, socials, className }: TeamMemberCardProps) {
  const s = socials
  const rtl = isRTL(locale)
  const roleBadgeMono = locale === "en"

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className={cn(
        "group relative aspect-[3/4] w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-muted shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 md:rounded-[1.75rem]",
        className
      )}
    >
      <Image
        src={photo || "/placeholder-user.jpg"}
        alt={name}
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        priority={false}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/35 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start p-5 text-start md:p-6">
        <span
          className={cn(
            "inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[11px] font-medium leading-snug text-white shadow-sm backdrop-blur-md sm:text-xs",
            roleBadgeMono ? "font-mono tracking-wide" : "font-sans tracking-normal"
          )}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)]" aria-hidden />
          <span className="truncate">{role}</span>
        </span>
        <p className="mt-3 text-2xl font-bold leading-none tracking-tight text-white drop-shadow-sm md:text-[1.65rem]">
          {name}
        </p>
        {s && (s.github || s.linkedin || s.instagram || s.twitter) ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {s.github ? (
              <Link
                href={s.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/55 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </Link>
            ) : null}
            {s.linkedin ? (
              <Link
                href={s.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/55 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            ) : null}
            {s.instagram ? (
              <Link
                href={s.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Instagram`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/55 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            ) : null}
            {s.twitter ? (
              <Link
                href={s.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} X / Twitter`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/55 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
