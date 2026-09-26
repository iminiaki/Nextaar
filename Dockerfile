# Multi-stage build for the Nextaar (Next.js 15 + Payload 3) app.
#
# Two builders use this file:
#   - GitHub Actions (.github/workflows/deploy.yml) on every push to main: builds
#     linux/amd64 with NEXT_PUBLIC_* = https://lastaar.com, pushes to
#     ghcr.io/iminiaki/nextaar, and the VPS pulls it. The VPS never builds —
#     it has no Node and cannot reach the npm registry reliably.
#   - Railway, for the dev branch, with NEXT_PUBLIC_* from its service variables.
# Both use a dummy DATABASE_URI: pages are force-dynamic and query at runtime.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time secrets/URLs. Do NOT use Railway's private DATABASE_URI here —
# private networking is unavailable during image builds (ENOTFOUND *.railway.internal).
# Pages are force-dynamic, so Payload talks to Postgres only at runtime.
ARG PAYLOAD_SECRET=build-time-placeholder-secret-min-32-chars
# NEXT_PUBLIC_* are inlined into the client bundle at build time, so this must
# already be the production origin.
ARG NEXT_PUBLIC_SERVER_URL=https://nextaar-production.up.railway.app
ARG NEXT_PUBLIC_SITE_URL=https://nextaar-production.up.railway.app
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET \
    NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NODE_ENV=production \
    DATABASE_URI=postgresql://build:build@127.0.0.1:5432/build

# Force a dummy DB URL even if the host injects DATABASE_URI into the build env.
RUN DATABASE_URI=postgresql://build:build@127.0.0.1:5432/build npm run build

FROM node:22-alpine AS runner
WORKDIR /app
# Commit the image was built from; served by /healthz so deploys can prove
# which build is live. The GitHub deploy workflow passes it.
ARG GIT_SHA=unknown
ENV NODE_ENV=production GIT_SHA=$GIT_SHA
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The standalone tracer drops sharp's libvips shared library — it is opened by
# the dynamic linker rather than require(), so tracing never sees the .so.
# Ship the complete packages instead. sharp is pinned to 0.33.5 because this
# VPS's CPU predates x86-64-v2 (no SSE4.2/POPCNT) and 0.34+ binaries refuse to
# load on it. See DEPLOY.md in the pastilmod repo.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

# Payload writes uploads here (Media.staticDir = public/media). Bind-mount a
# host directory over this path so uploaded images survive redeploys.
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

USER nextjs
EXPOSE 3000
# Railway's edge often reaches the container over IPv6; bind dual-stack.
ENV PORT=3000 HOSTNAME=::
CMD ["node", "server.js"]
