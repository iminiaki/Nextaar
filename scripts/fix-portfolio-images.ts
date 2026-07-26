import { copyFileSync, existsSync, readFileSync } from "node:fs"
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

const updates = [
  {
    slug: "partix",
    source: path.join(process.cwd(), "public/media/partix-portfolio.jpg"),
    alt: "Partix",
  },
  {
    slug: "steelchi",
    source: path.join(process.cwd(), "public/media/steelchi-portfolio.jpg"),
    alt: "Steelchi",
  },
] as const

async function main() {
  const mod = await import("../payload.config")
  const payloadConfig = (mod as any).default?.default ?? (mod as any).default
  const payload = await getPayload({ config: payloadConfig })

  for (const item of updates) {
    if (!existsSync(item.source)) {
      throw new Error(`Missing screenshot: ${item.source}`)
    }

    const created = await payload.create({
      collection: "media",
      data: { alt: item.alt },
      filePath: item.source,
      overrideAccess: true,
    })
    const mediaId = created.id as number
    console.log(`Created media ${created.filename} -> #${mediaId}`)

    const portfolio = await payload.find({
      collection: "portfolio" as any,
      locale: "en",
      limit: 1,
      overrideAccess: true,
      draft: true as any,
      where: { slug: { equals: item.slug } },
    })

    const doc = portfolio.docs[0]
    if (!doc) {
      console.warn(`Portfolio item not found: ${item.slug}`)
      continue
    }

    for (const locale of ["en", "fa", "ar"] as const) {
      await payload.update({
        collection: "portfolio" as any,
        id: doc.id,
        locale,
        draft: false as any,
        data: {
          image: mediaId,
          _status: "published",
        },
        overrideAccess: true,
      })
      console.log(`Published ${item.slug} (${locale}) -> media #${mediaId}`)
    }
  }

  for (const item of updates) {
    const check = await payload.find({
      collection: "portfolio" as any,
      locale: "en",
      limit: 1,
      depth: 1,
      overrideAccess: true,
      where: { slug: { equals: item.slug } },
    })
    const image = check.docs[0]?.image as any
    console.log(`VERIFY ${item.slug}:`, image?.id, image?.filename)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
