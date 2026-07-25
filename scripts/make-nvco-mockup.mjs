import sharp from "sharp"
import { mkdirSync, existsSync } from "node:fs"
import path from "node:path"

const OUT = path.join(process.cwd(), "public/media/nvco-portfolio.jpg")
const SHOTS = "/tmp/nvco-shots"

const W = 1024
const H = 483
const BG = "#e8ebef"

// 6 panels like Partix reference: 2 rows x 3 cols, slight tilts
const panels = [
  { file: "home.png", x: 28, y: 28, w: 300, h: 200, rotate: -4 },
  { file: "projects.png", x: 362, y: 18, w: 300, h: 200, rotate: 2 },
  { file: "project-detail.png", x: 696, y: 30, w: 300, h: 200, rotate: -2.5 },
  { file: "about.png", x: 40, y: 250, w: 300, h: 200, rotate: 3 },
  { file: "blog.png", x: 362, y: 242, w: 300, h: 200, rotate: -2 },
  { file: "contact.png", x: 684, y: 255, w: 300, h: 200, rotate: 3.5 },
]

async function roundedCard(inputPath, width, height, radius = 16) {
  const resized = await sharp(inputPath)
    .resize(width, height, { fit: "cover", position: "top" })
    .png()
    .toBuffer()

  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
  )

  const card = await sharp(resized)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer()

  // soft drop shadow
  const pad = 18
  const shadowSvg = Buffer.from(
    `<svg width="${width + pad * 2}" height="${height + pad * 2}">
      <defs>
        <filter id="f" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.28"/>
        </filter>
      </defs>
      <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white" filter="url(#f)"/>
    </svg>`
  )

  const shadowed = await sharp({
    create: {
      width: width + pad * 2,
      height: height + pad * 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadowSvg, left: 0, top: 0 },
      { input: card, left: pad, top: pad },
    ])
    .png()
    .toBuffer()

  return { buffer: shadowed, pad }
}

async function main() {
  const layers = []

  for (const panel of panels) {
    const src = path.join(SHOTS, panel.file)
    if (!existsSync(src)) throw new Error(`Missing shot: ${src}`)

    const { buffer, pad } = await roundedCard(src, panel.w, panel.h)
    const rotated = await sharp(buffer)
      .rotate(panel.rotate, {
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()

    const meta = await sharp(rotated).metadata()
    layers.push({
      input: rotated,
      left: Math.round(panel.x - pad),
      top: Math.round(panel.y - pad),
      width: meta.width,
      height: meta.height,
    })
  }

  // Keep layers inside canvas by clamping left/top and extending canvas slightly if needed
  let maxW = W
  let maxH = H
  for (const layer of layers) {
    maxW = Math.max(maxW, (layer.left || 0) + (layer.width || 0) + 8)
    maxH = Math.max(maxH, (layer.top || 0) + (layer.height || 0) + 8)
    if ((layer.left || 0) < 0) {
      // shift all later
    }
  }

  // Normalize negative offsets
  let shiftX = 0
  let shiftY = 0
  for (const layer of layers) {
    if ((layer.left || 0) < shiftX) shiftX = layer.left || 0
    if ((layer.top || 0) < shiftY) shiftY = layer.top || 0
  }
  shiftX = Math.min(0, shiftX)
  shiftY = Math.min(0, shiftY)

  const composites = layers.map((layer) => ({
    input: layer.input,
    left: Math.max(0, Math.round((layer.left || 0) - shiftX)),
    top: Math.max(0, Math.round((layer.top || 0) - shiftY)),
  }))

  const canvasW = Math.max(W, ...composites.map((c, i) => c.left + (layers[i].width || 0)))
  const canvasH = Math.max(H, ...composites.map((c, i) => c.top + (layers[i].height || 0)))

  const collage = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: BG,
    },
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toBuffer()

  // Final crop/resize to portfolio card aspect (1024x483 like references)
  await sharp(collage)
    .resize(W, H, { fit: "cover", position: "centre" })
    .jpeg({ quality: 90 })
    .toFile(OUT)

  console.log("Wrote", OUT)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
