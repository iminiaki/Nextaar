import { existsSync, readFileSync } from "node:fs"
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
    slug: "diakoo",
    source: path.join(process.cwd(), "public/media/diakoo-portfolio.jpg"),
    filename: "diakoo-portfolio.jpg",
    alt: "Diakoo Shop",
  },
  {
    slug: "partix",
    source: path.join(process.cwd(), "public/media/partix-portfolio.jpg"),
    filename: "partix-portfolio.jpg",
    alt: "Partix",
  },
  {
    slug: "steelchi",
    source: path.join(process.cwd(), "public/media/steelchi-portfolio.jpg"),
    filename: "steelchi-portfolio.jpg",
    alt: "Steelchi",
  },
] as const

async function resolveMediaId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  item: (typeof updates)[number],
) {
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: { filename: { equals: item.filename } },
  })
  const found = existing.docs[0]
  if (found?.id != null) {
    console.log(`Reusing media ${item.filename} -> #${found.id}`)
    return found.id as number
  }

  if (!existsSync(item.source)) {
    throw new Error(`Missing screenshot: ${item.source}`)
  }

  const created = await payload.create({
    collection: "media",
    data: { alt: item.alt },
    filePath: item.source,
    overrideAccess: true,
  })
  console.log(`Created media ${created.filename} -> #${created.id}`)
  return created.id as number
}

async function main() {
  const only = process.argv.slice(2).filter((arg) => !arg.startsWith("-"))
  const selected = only.length
    ? updates.filter((item) => only.includes(item.slug))
    : updates.filter((item) => item.slug === "diakoo")

  if (selected.length === 0) {
    throw new Error(`No matching portfolio slugs. Available: ${updates.map((u) => u.slug).join(", ")}`)
  }

  const mod = await import("../payload.config")
  const payloadConfig = (mod as any).default?.default ?? (mod as any).default
  const payload = await getPayload({ config: payloadConfig })

  for (const item of selected) {
    const mediaId = await resolveMediaId(payload, item)

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

  for (const item of selected) {
    const check = await payload.find({
      collection: "portfolio" as any,
      locale: "en",
      limit: 1,
      depth: 1,
      overrideAccess: true,
      where: { slug: { equals: item.slug } },
    })
    const image = check.docs[0]?.image as any
    console.log(`VERIFY ${item.slug}:`, image?.id, image?.filename, image?.sizes?.banner?.filename)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
