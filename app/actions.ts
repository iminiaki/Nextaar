"use server"

export async function subscribeEmail(_: { ok: boolean; message: string }, formData: FormData) {
  const email = String(formData.get("email") || "")
  await new Promise((r) => setTimeout(r, 600))
  return { ok: !!email, message: email ? "ok" : "error" }
}
