#!/usr/bin/env bash
# Nightly Nextaar backup. Lives at /srv/nextaar/backup.sh on the VPS.
# Cron slot 04:00 — Radya runs 03:20 and Pastil 03:40, so keep out of their way.
set -euo pipefail
DIR=/srv/nextaar/backups/$(date +%F)
mkdir -p "$DIR"
docker exec nextaar-db pg_dump -U nextaar nextaar | gzip > "$DIR/nextaar.sql.gz"
# Uploaded images live only here — Payload writes them to the bind-mounted dir.
tar -czf "$DIR/media.tar.gz" -C /srv/nextaar media
find /srv/nextaar/backups -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} +
echo "[$(date -Is)] nextaar backup done: $(du -sh "$DIR" | cut -f1)"
