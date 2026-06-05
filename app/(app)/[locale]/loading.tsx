import {
  SkeletonCtaGlobe,
  SkeletonGoogleReviews,
  SkeletonHero,
  SkeletonLatestPosts,
  SkeletonPartners,
  SkeletonPortfolioPreview,
  SkeletonProcessSection,
  SkeletonServicesGrid,
  SkeletonWhyChoose,
} from "@/components/skeletons/home-shell"

/**
 * Mirrors the home page section order and approximate layout (Hero → Services → CTA →
 * Portfolio → Why Choose → Process → Posts → Reviews → Partners).
 * Shown during `[locale]` segment transitions (same skeleton for all locale routes).
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <SkeletonHero />
      <SkeletonServicesGrid />
      <SkeletonCtaGlobe />
      <SkeletonPortfolioPreview />
      <SkeletonWhyChoose />
      <SkeletonProcessSection />
      <SkeletonLatestPosts />
      <SkeletonGoogleReviews />
      <SkeletonPartners />
    </div>
  )
}
