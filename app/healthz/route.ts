import { getPayloadClient } from "@/lib/payload-queries"

// Deploy health check. The VPS deploy script and the GitHub deploy workflow
// both poll this: `sha` proves which build is live, and the count proves
// Payload initialised — which is when prodMigrations run — and Postgres answers.
export const dynamic = "force-dynamic"

export async function GET() {
  const sha = process.env.GIT_SHA || "unknown"
  try {
    const payload = await getPayloadClient()
    await payload.count({ collection: "users" })
    return Response.json({ ok: true, sha }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[healthz]", error)
    return Response.json({ ok: false, sha }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
