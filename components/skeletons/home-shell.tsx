import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

/** Matches bordered cards used across the marketing site */
export function SkeletonCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-border/60 bg-card/40 p-4 shadow-sm backdrop-blur-sm md:rounded-[1.5rem] md:p-5",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[92vh]">
      <div className="container relative mx-auto grid items-center gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-36 lg:pb-24">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
          <Skeleton className="h-8 w-44 rounded-full sm:h-9 sm:w-52" />
          <div className="w-full max-w-xl space-y-3 lg:max-w-none">
            <Skeleton className="mx-auto h-12 w-full max-w-[22rem] rounded-lg sm:h-14 lg:mx-0 lg:h-16 lg:max-w-xl" />
            <Skeleton className="mx-auto h-12 w-full max-w-lg rounded-lg sm:h-14 lg:mx-0" />
          </div>
          <div className="w-full max-w-lg space-y-2">
            <Skeleton className="mx-auto h-5 w-full rounded-md lg:mx-0" />
            <Skeleton className="mx-auto h-5 w-[92%] rounded-md lg:mx-0" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Skeleton className="h-11 w-full rounded-lg sm:w-40" />
            <Skeleton className="h-11 w-full rounded-lg sm:w-44" />
          </div>
          <div className="mt-2 flex w-full flex-wrap justify-center gap-8 border-t border-border/40 pt-6 lg:justify-start">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 lg:items-start">
                <Skeleton className="h-8 w-14 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-lg justify-center lg:max-w-none">
          <Skeleton className="aspect-[4/3] w-full max-w-md rounded-[2rem] border border-border/50 bg-muted/50 lg:aspect-square lg:max-w-none" />
        </div>
      </div>
    </section>
  )
}

export function SkeletonServicesGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <Skeleton className="mx-auto h-9 w-56 rounded-lg sm:h-10 sm:w-72" />
          <Skeleton className="mx-auto h-5 w-full max-w-xl rounded-md" />
          <Skeleton className="mx-auto h-5 w-[90%] max-w-lg rounded-md" />
        </div>
        <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <li key={i}>
              <SkeletonCard className="flex min-h-[14rem] flex-col justify-between gap-6">
                <div className="space-y-4">
                  <Skeleton className="h-[60px] w-[60px] rounded-xl" />
                  <Skeleton className="h-6 w-[85%] rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-[92%] rounded-md" />
                </div>
                <Skeleton className="h-9 w-28 rounded-md" />
              </SkeletonCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SkeletonCtaGlobe() {
  return (
    <section className="py-8 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 rounded-2xl bg-background py-8 lg:flex-row lg:justify-center lg:gap-12 lg:py-10">
          <Skeleton className="h-[280px] w-full max-w-lg rounded-full border border-border/40 bg-muted/30 md:h-[320px]" />
          <div className="w-full max-w-2xl flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <Skeleton className="h-7 w-36 rounded-full" />
                <Skeleton className="mt-5 h-9 w-full max-w-md rounded-lg sm:h-10" />
                <Skeleton className="mt-3 h-9 w-full max-w-lg rounded-lg sm:h-11" />
                <Skeleton className="mt-4 h-4 w-full max-w-xl rounded-md" />
                <Skeleton className="mt-2 h-4 w-[88%] max-w-lg rounded-md" />
                <Skeleton className="mt-8 h-12 w-48 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkeletonPortfolioPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3 text-center sm:text-start">
            <Skeleton className="mx-auto h-9 w-48 rounded-lg sm:mx-0 sm:h-10 sm:w-56" />
            <Skeleton className="mx-auto h-5 w-full max-w-xl rounded-md sm:mx-0" />
            <Skeleton className="mx-auto h-5 w-[85%] max-w-lg rounded-md sm:mx-0" />
          </div>
          <Skeleton className="mx-auto h-10 w-40 shrink-0 rounded-xl sm:mx-0" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-0">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl border border-border/40" />
              <div className="mt-3 flex justify-between gap-2 px-1">
                <Skeleton className="h-5 flex-1 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkeletonWhyChoose() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="space-y-4 lg:col-span-4 xl:col-span-5">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-10 w-full max-w-sm rounded-lg sm:h-11" />
              <Skeleton className="h-4 w-full max-w-md rounded-md" />
              <Skeleton className="h-4 w-[92%] max-w-md rounded-md" />
            </div>
            <div className="mx-auto lg:col-span-8 xl:col-span-7">
              <div className="relative size-72">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute size-72 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                    style={{
                      top: i * 10,
                      left: i * 10,
                      zIndex: 4 - i,
                    }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    >
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-2xl" />
                      <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-blue-500/8 blur-2xl" />
                    </div>
                    <div className="relative z-10 flex h-full flex-col gap-4 p-5">
                      <Skeleton className="size-14 shrink-0 rounded-2xl" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-[82%] rounded-md" />
                        <Skeleton className="h-4 w-[68%] rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    className={cn("h-1.5 rounded-full", i === 0 ? "w-4" : "w-1.5")}
                  />
                ))}
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export function SkeletonProcessSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-5">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-10 w-full max-w-md rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-[95%] rounded-md" />
              <Skeleton className="h-4 w-[88%] rounded-md" />
              <div className="flex flex-wrap gap-3 pt-3">
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} className="min-h-[11rem] space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                    <Skeleton className="h-10 w-10 rounded-md opacity-40" />
                  </div>
                  <Skeleton className="h-5 w-[90%] rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-[85%] rounded-md" />
                </SkeletonCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkeletonLatestPosts() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <Skeleton className="mx-auto h-10 w-64 rounded-lg sm:w-80" />
          <Skeleton className="mx-auto h-5 w-full max-w-lg rounded-md" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/30 shadow-sm">
              <Skeleton className="h-56 w-full rounded-none rounded-t-[1.5rem]" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-[90%] rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-[75%] rounded-md" />
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkeletonGoogleReviews() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-10 w-full max-w-lg rounded-lg" />
              <Skeleton className="h-5 w-full max-w-xl rounded-md" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Skeleton className="h-[4.5rem] w-44 rounded-2xl border border-border/40" />
              <Skeleton className="h-12 w-48 rounded-xl" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full border border-border/40" />
          <Skeleton className="h-9 w-9 rounded-full border border-border/40" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} className="min-h-[260px] space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/5 max-w-[12rem] rounded-md" />
                  <Skeleton className="h-3 w-4/5 max-w-[14rem] rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 rounded-md" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-[70%] rounded-md" />
              </div>
              <Skeleton className="mt-auto h-4 w-32 rounded-md" />
            </SkeletonCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkeletonPartners() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Skeleton className="mx-auto mb-12 h-7 w-80 max-w-full rounded-md" />
        <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-[100px] max-w-full rounded-lg opacity-70" />
          ))}
        </div>
      </div>
    </section>
  )
}
