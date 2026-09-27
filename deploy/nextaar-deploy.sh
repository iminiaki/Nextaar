#!/usr/bin/env bash
# Pull-based deploy for Nextaar. Lives at /srv/nextaar/deploy.sh on the VPS and
# runs every 2 minutes from nextaar-deploy.timer.
#
# GitHub Actions pushes ghcr.io/iminiaki/nextaar:main on every push to main.
# This script pulls that tag; if it is a new image it takes a DB dump, switches
# the local `nextaar-app:live` tag (what compose.yaml runs) to it, and waits
# for /healthz to report the new commit. If that fails it switches back to
# `nextaar-app:previous` and remembers the bad image so it is not retried.
#
# Nothing connects into the server — it only pulls, so the throttled inbound
# SSH path from outside Iran is never involved.
set -euo pipefail

REMOTE=ghcr.io/iminiaki/nextaar:main
LIVE=nextaar-app:live
PREV=nextaar-app:previous
DIR=/srv/nextaar
FAILED_FILE=$DIR/.deploy-failed-image
DUMPS=$DIR/backups/predeploy

log() { echo "[$(date -Is)] $*"; }

exec 9>/run/nextaar-deploy.lock
flock -n 9 || exit 0
cd "$DIR"

# A pull that fails is not an error worth alerting on — the Iran link has bad
# hours. The timer tries again in 2 minutes.
# Layers already downloaded are kept, so each retry resumes where it stopped.
pulled=0
for attempt in 1 2 3; do
  if err=$(docker pull -q "$REMOTE" 2>&1); then pulled=1; break; fi
  sleep 15
done
if [ "$pulled" != 1 ]; then
  log "pull failed after 3 attempts; will retry next run. Last error: $(echo "$err" | tail -2 | tr '\n' ' ')"
  exit 0
fi

new_id=$(docker image inspect -f '{{.Id}}' "$REMOTE")
live_id=$(docker image inspect -f '{{.Id}}' "$LIVE" 2>/dev/null || echo none)
[ "$new_id" = "$live_id" ] && exit 0
if [ -f "$FAILED_FILE" ] && [ "$(cat "$FAILED_FILE")" = "$new_id" ]; then
  exit 0 # already rolled back from this exact image; wait for a new push
fi

sha=$(docker image inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$REMOTE" | sed -n 's/^GIT_SHA=//p')
log "new image ${new_id:7:12} (commit ${sha:-unknown}); deploying"

# The new build may run Payload migrations on boot (prodMigrations), so dump
# first. Keep the 10 most recent; the nightly backup.sh covers the long tail.
mkdir -p "$DUMPS"
dump="$DUMPS/$(date +%F-%H%M%S)-${sha:-unknown}.sql.gz"
docker exec nextaar-db pg_dump -U nextaar nextaar | gzip > "$dump"
log "pre-deploy dump: $dump ($(du -h "$dump" | cut -f1))"
ls -1t "$DUMPS"/*.sql.gz | tail -n +11 | xargs -r rm -f

[ "$live_id" != none ] && docker tag "$LIVE" "$PREV"
docker tag "$REMOTE" "$LIVE"
docker compose up -d app

# Health goes through the shared Caddy, so routing and TLS are checked too.
# First boot after a schema change runs migrations, hence up to 3 minutes.
healthy=0
for i in $(seq 1 36); do
  body=$(curl -s --max-time 5 --resolve lastaar.com:443:127.0.0.1 https://lastaar.com/healthz || true)
  if echo "$body" | grep -q "\"ok\":true" && echo "$body" | grep -q "\"sha\":\"$sha\""; then
    healthy=1; break
  fi
  sleep 5
done

if [ "$healthy" = 1 ]; then
  rm -f "$FAILED_FILE"
  docker image prune -f >/dev/null
  log "deployed commit $sha — healthy"
  exit 0
fi

log "commit $sha failed health check; rolling back"
docker logs --tail 40 nextaar-app 2>&1 | sed 's/^/  app| /' || true
echo "$new_id" > "$FAILED_FILE"
if [ "$live_id" != none ]; then
  docker tag "$PREV" "$LIVE"
  docker compose up -d app
  log "rolled back to ${live_id:7:12}. If the failed build ran a migration the old image cannot handle, restore: gunzip -c $dump | docker exec -i nextaar-db psql -U nextaar nextaar"
fi
exit 1
