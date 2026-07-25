import { mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { getPayload } from "payload"
import payloadConfig from "../payload.config"

type Locale = "en" | "fa" | "ar"

const newItems: {
  slug: string
  website: string
  categories: number[]
}[] = [
  { slug: "diakoo", website: "https://diakoo.shop", categories: [1, 2] },
  { slug: "steelchi", website: "https://steelchi.com", categories: [1] },
  { slug: "partix", website: "https://partix.om", categories: [1, 2] },
  { slug: "nvco", website: "https://nvco.org", categories: [1] },
]

async function uploadScreenshot(payload: any, website: string, alt: string) {
  const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(website)}?w=1440`
  const filename = `${alt.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-portfolio.webp`

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: { filename: { equals: filename } },
  })
  if (existing.docs?.[0]) return existing.docs[0].id

  const response = await fetch(screenshotUrl)
  if (!response.ok) {
    console.warn(`Could not fetch screenshot for ${website}: ${response.status}`)
    return undefined
  }

  const tempDir = path.join(os.tmpdir(), "nextaar-portfolio-import")
  await mkdir(tempDir, { recursive: true })
  const filePath = path.join(tempDir, filename)

  try {
    await writeFile(filePath, Buffer.from(await response.arrayBuffer()))
    const created = await payload.create({
      collection: "media",
      data: { alt },
      filePath,
      overrideAccess: true,
    })
    return created.id
  } finally {
    await rm(filePath, { force: true })
  }
}

async function main() {
  const payload = await getPayload({ config: payloadConfig })

  for (const item of newItems) {
    const existing = await payload.find({
      collection: "portfolio" as any,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: item.slug } },
    })

    if (existing.docs.length > 0) {
      console.log(`Skipping existing portfolio item: ${item.slug}`)
      continue
    }

    const imageId = await uploadScreenshot(payload, item.website, item.slug)

    const created = await payload.create({
      collection: "portfolio" as any,
      locale: "en",
      data: {
        title: item.slug,
        slug: item.slug,
        categories: item.categories,
        image: imageId,
        _status: "published",
      },
      overrideAccess: true,
    })

    console.log(`Created portfolio item: ${item.slug} (id: ${created.id})`)
  }

  console.log("Run `npx tsx scripts/update-portfolio-content.ts` to fill localized content.")
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
