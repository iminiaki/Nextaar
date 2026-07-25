# Multi-stage build for the Nextaar (Next.js 15 + Payload 3) app.
#
# Built on the dev Mac for linux/amd64 and shipped to the VPS as a saved image —
# the server has no Node and cannot reach the npm registry reliably.
#
#   docker build --platform linux/amd64 \
#     --add-host=host.docker.internal:host-gateway \
#     --build-arg DATABASE_URI=postgres://nextaar:nextaar@host.docker.internal:5546/nextaar \
#     -t nextaar-app:prod .
#
# The build prerenders pages that query Payload, so it needs a reachable
# Postgres — that is what the --add-host flag is for (the local dev DB on 5546).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time only. The DB is read to prerender /[locale] pages; no writes occur.
ARG DATABASE_URI
ARG PAYLOAD_SECRET=build-time-placeholder-secret-min-32-chars
# NEXT_PUBLIC_* are inlined into the client bundle at build time, so this must
# already be the production origin.
ARG NEXT_PUBLIC_SERVER_URL=https://lastaar.com
ARG NEXT_PUBLIC_SITE_URL=https://lastaar.com
ENV DATABASE_URI=$DATABASE_URI \
    PAYLOAD_SECRET=$PAYLOAD_SECRET \
    NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NODE_ENV=production

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
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
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
