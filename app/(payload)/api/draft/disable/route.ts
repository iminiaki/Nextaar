import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") || "/";
  const draft = await draftMode();
  draft.disable();
  redirect(to);
}
