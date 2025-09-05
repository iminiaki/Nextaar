import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-24 py-10 sm:py-14 lg:py-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="mx-auto h-6 w-48">
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
          <div className="mx-auto max-w-3xl">
            <Skeleton className="h-10 w-3/4 mx-auto" />
          </div>
          <div className="mx-auto max-w-2xl">
            <Skeleton className="h-6 w-5/6 mx-auto" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </section>

        {/* Services Features */}
        <section className="space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-64" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </section>

        {/* CTA */}
        <section className="space-y-4 rounded-xl border p-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
          <Skeleton className="h-10 w-28" />
        </section>

        {/* Portfolio Preview */}
        <section className="space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-64" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </section>

        {/* Why Choose */}
        <section className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </section>

        {/* About Teaser */}
        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-48 w-full" />
        </section>

        {/* Latest Posts */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-44" />
            <Skeleton className="h-5 w-72" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div key={key} className="space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-4 w-3/6" />
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[0, 1, 2, 3, 4, 5].map((key) => (
              <Skeleton key={key} className="h-12 w-full" />
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="space-y-4 rounded-xl border p-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-28" />
        </section>
      </div>
    </div>
  );
}


