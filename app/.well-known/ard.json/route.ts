import { aiCatalogResponse } from "@/lib/ai-catalog"

export const dynamic = "force-static"

export function GET() {
  return aiCatalogResponse()
}
