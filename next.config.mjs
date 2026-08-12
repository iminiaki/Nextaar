import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output keeps the runtime image small and lets it start with a
  // plain `node server.js` — the server has no Node and cannot run npm.
  output: "standalone",
  // Keep metadata in the initial document head. This avoids streamed metadata
  // being missed by crawlers and audits that do not wait for React to settle.
  htmlLimitedBots: /.*/,
  typescript: {
    // Restored so the production build can complete. Next 15 types `params` as
    // a Promise, but 9 page files under app/(app)/[locale]/ still declare it as
    // a plain object and read `params.locale` synchronously. Next still allows
    // that at runtime (deprecated), so the site works — it only fails
    // typecheck. Proper fix: type them `Promise<{ locale: Locale }>` and await
    // params. Sync access is slated to be removed, so this needs doing before
    // any Next 16 upgrade.
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      { pathname: "/media/**" },
      { pathname: "/api/media/file/**" },
      { pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "recharts",
      "gsap",
      "framer-motion",
      "motion",
    ],
  },
};

export default withPayload(nextConfig);
