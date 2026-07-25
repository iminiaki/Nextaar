# Deploying Nextaar — PRODUCTION AS-BUILT (2026-07-25)

> **Read this first:**
> 1. Prod lives on the shared Radya VPS: `root@194.5.175.170` (SSH key auth from
>    Ali's Mac). This is a **three-app** server: Radya GPS tracking, Pastil
>    (`pastilmod.ir`), and now Nextaar. Full server docs: gps-tracker repo →
>    `docs/CICD.md` §1; Pastil's notes: pastilmod repo → `DEPLOY.md`.
> 2. TLS and routing are handled by the **shared Caddy** at `/srv/edge`. Do not
>    install nginx. Only Caddy publishes 80/443.
> 3. The server has **no Node** and cannot reach the npm registry reliably
>    (Iranian VPS). Never run `npm` there — build on the Mac and ship the image.

## Production layout

```
/srv/edge/sites/nextaar.caddy   nextaar.lastaar.com → reverse_proxy nextaar-app:3000
/srv/nextaar/
  compose.yaml       app (image nextaar-app:prod) + db (postgres:16-alpine)
  .env               DATABASE_URI (db:5432), PAYLOAD_SECRET, NEXT_PUBLIC_* (mode 600)
  .env.db            POSTGRES_USER/PASSWORD/DB (mode 600)
  media/             Payload uploads, bind-mounted to /app/public/media.
                     Owner MUST be 100:101 (the nextjs user in node:22-alpine).
  backup.sh          nightly dump + media tarball, cron 04:00, 14-day retention
  backups/<date>/nextaar.sql.gz + media.tar.gz
```
- The app joins the external docker network `edge`; that is how Caddy reaches
  it. Nothing publishes a public port.
- Postgres is loopback-only on `127.0.0.1:5545` (5432 is Supabase's, 5544 is
  Pastil's). Memory caps: app 1 GB, db 512 MB.
- Backup cron at 04:00 — Radya runs 03:20, Pastil 03:40. Keep the 04:00 slot.

## How to deploy a new version

```bash
cd ~/Documents/dev/nextaar
docker compose up -d                      # local build DB on 5546 must be running
docker build --platform linux/amd64 \
  --add-host=host.docker.internal:host-gateway \
  --build-arg DATABASE_URI=postgres://nextaar:nextaar@host.docker.internal:5546/nextaar \
  -t nextaar-app:prod .
docker save nextaar-app:prod | gzip -1 | ssh root@194.5.175.170 'gunzip | docker load'
ssh root@194.5.175.170 'cd /srv/nextaar && docker compose up -d app'
```
The build **prerenders pages that query Payload**, so it needs a reachable
Postgres — that is what `--add-host` is for. Without it the build fails with
`relation "posts" does not exist`.

`NEXT_PUBLIC_*` values are inlined into the client bundle at build time, so the
image is origin-specific. Rebuild if the public URL changes.

## Server CPU constraint — sharp is version-pinned

The VPS is a bare "Common KVM processor" **without SSE4.2/POPCNT** (pre
x86-64-v2). sharp ≥ 0.34 ships v2-only binaries that refuse to load, and its
WASM fallback needs SIMD the CPU also lacks. `package.json` pins
`"sharp": "0.33.5"` with a top-level `overrides` entry (and a matching
`pnpm.overrides`) so nothing pulls a newer copy back in. The Dockerfile also
copies `node_modules/{sharp,@img}` into the runner explicitly — the standalone
tracer drops libvips' `.so` because it is dlopen'd, never `require()`d.

Verified working on the VPS: resize + WebP encode, and `/_next/image` live
optimization. It logs `WARNING: CPU supports 0x6000000000004000, software
requires 0x4000000000005000` — that is the loader falling back to a baseline
path, not an error.

**Do not bump sharp** unless the VPS moves to x86-64-v2 hardware. This means
carrying the libvips CVEs in GHSA-f88m-g3jw-g9cj; the mitigation is that only
authenticated admins can upload to the Media collection, and no remote image
patterns are configured. Compiling sharp from source against distro libvips is
the route to a patched libvips on this CPU if that becomes necessary.

## Payload gotchas (hard-won)

- **Migrations must exist.** The project originally had none and relied on
  dev-mode schema push, which is disabled in production. `migrationDir` is set
  in `payload.config.ts` because Payload defaults to `src/migrations` and this
  project has no `src/`.
- **Generated migrations need hand-editing.** Payload emits
  `import { MigrateUpArgs, MigrateDownArgs, sql }` as a *value* import; plain
  Node rejects it. Split the types into `import type` after every
  `migrate:create` so migrations run with no transpiler.
- **The CLI cannot load the config under Node 22** — `@payloadcms/richtext-lexical`
  has a top-level await, so `require()` of the ESM graph throws. Use
  `npx payload --use-swc <cmd>` (needs the `@swc-node/register` devDependency).
- **Restoring an older dump needs `payload_kv`.** Dumps predating Payload 3.8x
  lack that table; create it from the migration's DDL or the app breaks at
  runtime. Also insert a `payload_migrations` row naming the init migration,
  or `payload migrate` will try to recreate existing tables.
- **Delete the `batch = -1` "dev" row after restoring a dev-pushed dump.** While
  that row exists Payload decides the DB was dynamically pushed and `migrate`
  stops on an interactive prompt — *"data loss will occur. Would you like to
  proceed? (y/N)"*. In a non-TTY (CI, a container start hook) that hangs
  forever with no output, which reads exactly like a silent success. Answering
  `y` would run the init migration against tables that already exist.
  `delete from payload_migrations where batch = -1;` leaves a normal history and
  makes `migrate` a genuine no-op. Done on prod 2026-07-25.

## Schema changes / db access

Run from the Mac through an SSH tunnel — never on the server:
```bash
ssh -f -N -L 15545:127.0.0.1:5545 root@194.5.175.170
DBPW=$(ssh root@194.5.175.170 'grep "^POSTGRES_PASSWORD=" /srv/nextaar/.env.db | cut -d= -f2-')
DATABASE_URI="postgresql://nextaar:${DBPW}@127.0.0.1:15545/nextaar" npx payload --use-swc migrate
pkill -f "ssh -f -N -L 15545"
```

## DNS (lastaar.com)

DNS is hosted at **SabinServer** (`irns1/irns2.sbglobaldns.com`), edited via the
cPanel Zone Editor. `.com`, so no IRNIC involvement.

- **Email stays on cPanel at `79.175.130.9`.** `mail` is an A record and MX is
  `10 mail.lastaar.com` — deliberately decoupled from the apex so moving the
  website does not break mail. Never point `mail` or MX at the VPS; it runs no
  mail server. Keep the cPanel account alive for email.
- Leave alone: MX, `mail`, `default._domainkey` (DKIM), SPF, `_dmarc*`,
  `_acme-challenge*`, `ftp`.
- `en.lastaar.com` / `www.en.lastaar.com` are the old cPanel English site.
  Nextaar uses path locales (`/en`, `/fa`, `/ar`), so redirect or remove them.
- Lower the apex TTL to 300 **~4 hours before** any cutover — a TTL change only
  takes effect after the old TTL expires.

## Iran-network gotchas

- Plain HTTP to the server on odd ports gets intercepted by the national filter
  (302 → 10.10.34.35). Preview via HTTPS or an SSH tunnel, never `http://IP:port`.
- If Caddy cert issuance fails while DNS resolves correctly, suspect
  Iran-gateway inbound interference, not an app fault.

## Known gaps

- **~40% of media files are missing.** The DB references 61 originals and 113
  size variants; 24 originals and 45 variants are absent from `public/media`.
  The dump is newer than the committed media snapshot (it expects `ali-1.jpg`,
  `ali-2.jpg`, … where only `ali.jpg` exists). Copy `public/media` from the
  machine that produced the dump into `/srv/nextaar/media` (owner 100:101).
- Backups are on-server only — offsite copy is an open item.
- `next@15.5.21` carries an unpatched vendored `postcss` advisory and the
  drizzle-kit → esbuild dev-server chain; neither is reachable in production.
- No error monitoring (Sentry) configured.
