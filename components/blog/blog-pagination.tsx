import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isRTL, type Locale } from "@/lib/i18n";

const POSTS_PER_PAGE = 12;

type BlogPaginationLabels = {
  previous: string;
  next: string;
};

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  createHref: (page: number) => string;
  labels: BlogPaginationLabels;
  locale: Locale;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  for (let offset = -1; offset <= 1; offset += 1) {
    const page = currentPage + offset;
    if (page > 1 && page < totalPages) pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];

    if (index > 0 && page - previous > 1) {
      result.push("ellipsis");
    }

    result.push(page);
  }

  return result;
}

export function getBlogPagination({
  totalItems,
  currentPage,
}: {
  totalItems: number;
  currentPage: number;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  return {
    currentPage: safePage,
    totalPages,
    offset: (safePage - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
  };
}

export function BlogPagination({
  currentPage,
  totalPages,
  createHref,
  labels,
  locale,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const rtl = isRTL(locale);
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const PreviousIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  const previousButtonClass = cn(
    buttonVariants({ variant: "ghost", size: "default" }),
    "gap-1 px-2.5",
    rtl ? "sm:pr-2.5" : "sm:pl-2.5"
  );
  const nextButtonClass = cn(
    buttonVariants({ variant: "ghost", size: "default" }),
    "gap-1 px-2.5",
    rtl ? "sm:pl-2.5" : "sm:pr-2.5"
  );

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center pt-8"
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          {currentPage > 1 ? (
            <Link
              href={createHref(currentPage - 1)}
              aria-label={labels.previous}
              className={previousButtonClass}
            >
              <PreviousIcon className="size-4" />
              <span className="hidden sm:block">{labels.previous}</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(previousButtonClass, "pointer-events-none opacity-50")}
            >
              <PreviousIcon className="size-4" />
              <span className="hidden sm:block">{labels.previous}</span>
            </span>
          )}
        </li>

        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${index}`}>
              <span className="flex size-9 items-center justify-center">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More pages</span>
              </span>
            </li>
          ) : (
            <li key={page}>
              <Link
                href={createHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  buttonVariants({
                    variant: page === currentPage ? "outline" : "ghost",
                    size: "icon",
                  })
                )}
              >
                {page}
              </Link>
            </li>
          )
        )}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={createHref(currentPage + 1)}
              aria-label={labels.next}
              className={nextButtonClass}
            >
              <span className="hidden sm:block">{labels.next}</span>
              <NextIcon className="size-4" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(nextButtonClass, "pointer-events-none opacity-50")}
            >
              <span className="hidden sm:block">{labels.next}</span>
              <NextIcon className="size-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
