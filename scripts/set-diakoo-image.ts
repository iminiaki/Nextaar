import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { getPayload } from "payload"

for (const filename of [".env", ".env.local"]) {
  const filePath = path.join(process.cwd(), filename)
  if (!existsSync(filePath)) continue
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (!match || process.env[match[1]]) continue
    process.env[match[1]] = (match[2] || "").replace(/^['"]|['"]$/g, "")
  }
}
process.env.PAYLOAD_SECRET ||= "local-payload-script-secret"

const FILENAME = "diakoo-portfolio.jpg"
const SOURCE = path.join(process.cwd(), "public/media", FILENAME)
const SLUG = "diakoo"

async function main() {
  if (!existsSync(SOURCE)) throw new Error(`Missing ${SOURCE}`)

  const mod = await import("../payload.config")
  const payloadConfig = (mod as any).default?.default ?? (mod as any).default
  const payload = await getPayload({ config: payloadConfig })
  const stats = statSync(SOURCE)

  const existing = await payload.find({
    collection: "media",
    limit: 5,
    overrideAccess: true,
    where: { filename: { equals: FILENAME } },
  })

  let mediaId = existing.docs[0]?.id as number | undefined

  if (mediaId == null) {
    // Create a DB row that points at the already-deployed public file.
    // Avoid payload.create(filePath) — it duplicates to diakoo-portfolio-1.jpg.
    const created = await payload.create({
      collection: "media",
      overrideAccess: true,
      data: {
        alt: "Diakoo Shop",
        filename: FILENAME,
        mimeType: "image/jpeg",
        filesize: stats.size,
        width: 1825,
        height: 862,
        url: `/media/${FILENAME}`,
      } as any,
    })
    mediaId = created.id as number
    console.log(`Created media row #${mediaId} -> ${FILENAME}`)
  } else {
    await payload.update({
      collection: "media",
      id: mediaId,
      overrideAccess: true,
      data: {
        alt: "Diakoo Shop",
        filename: FILENAME,
        mimeType: "image/jpeg",
        filesize: stats.size,
        width: 1825,
        height: 862,
        url: `/media/${FILENAME}`,
      } as any,
    })
    console.log(`Updated media row #${mediaId} -> ${FILENAME}`)
  }

  const portfolio = await payload.find({
    collection: "portfolio" as any,
    locale: "en",
    limit: 1,
    overrideAccess: true,
    draft: true as any,
    where: { slug: { equals: SLUG } },
  })
  const doc = portfolio.docs[0]
  if (!doc) throw new Error(`Portfolio ${SLUG} not found`)

  for (const locale of ["en", "fa", "ar"] as const) {
    await payload.update({
      collection: "portfolio" as any,
      id: doc.id,
      locale,
      draft: false as any,
      overrideAccess: true,
      data: { image: mediaId, _status: "published" },
    })
    console.log(`Linked ${SLUG} (${locale}) -> media #${mediaId}`)
  }

  for (const locale of ["en", "fa", "ar"] as const) {
    const check = await payload.find({
      collection: "portfolio" as any,
      locale,
      limit: 1,
      depth: 1,
      overrideAccess: true,
      where: { slug: { equals: SLUG } },
    })
    const image = check.docs[0]?.image as any
    console.log(`VERIFY ${locale}:`, image?.filename || image)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
