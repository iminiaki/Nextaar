#!/bin/bash
# Build locally for cPanel (shared hosting cannot run next build — OOM).
# Usage: ./scripts/cpanel-build.sh
# Then upload .next to the server.

set -e

export NODE_ENV=production
export NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL:-https://lastaar.com}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://lastaar.com}"

# Use local Docker Postgres for build (NOT the cPanel production DB).
# Start it first: docker-compose up -d
export DATABASE_URI="${BUILD_DATABASE_URI:-postgres://nextaar:nextaar@127.0.0.1:5432/nextaar}"
export PAYLOAD_SECRET="${BUILD_PAYLOAD_SECRET:-local-cpanel-build-secret-min-32-chars}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Warning: docker not found. Start local Postgres or build may fail."
elif ! docker compose -f docker-compose.yml ps postgres 2>/dev/null | grep -q "running\|Up"; then
  echo ""
  echo "⚠️  Local Postgres is not running. Start it first:"
  echo "   docker-compose up -d"
  echo ""
fi

echo "Building with:"
echo "  NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL"
echo "  NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL"
echo "  DATABASE_URI=$DATABASE_URI"
echo ""

npm run build

echo ""
echo "Build done. Upload the .next folder to the server:"
echo "  scp -r .next lastaar1@YOUR_SERVER:/home/lastaar1/nextaar/"
echo ""
echo "Or zip and upload via cPanel File Manager:"
echo "  tar -czf next-build.tar.gz .next"
echo "  # upload to /home/lastaar1/nextaar/ and run: tar -xzf next-build.tar.gz"
