import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

function slugify(val: string): string {
  const base = (val || "").toString().normalize("NFKD").trim().toLowerCase();
  // Replace any whitespace/underscores with dashes
  const dashed = base.replace(/[\s_]+/g, "-");
  // Keep Unicode letters and numbers across scripts, and dashes
  const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "");
  const collapsed = cleaned.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return collapsed || "untitled";
}

function buildPathFromSlug(rawSlug: string, locale: string | null): string {
  const normalizedSlug = rawSlug.startsWith("/") ? rawSlug : rawSlug.trim();
  if (normalizedSlug.startsWith("/")) return normalizedSlug;
  const safeLocale = locale && /^[a-z]{2}$/i.test(locale) ? locale : "en";
  return `/${safeLocale}/blog/${normalizedSlug}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slugParam = searchParams.get("slug");
  const locale = searchParams.get("locale");
  const id = searchParams.get("id");

  if (!secret || secret !== (process.env.DRAFT_SECRET || "dev-secret")) {
    return new Response("Invalid token", { status: 401 });
  }

  if ((!slugParam || slugParam.trim() === "") && (!id || id.trim() === "")) {
    return new Response("Missing id or slug", { status: 400 });
  }

  let path: string | null = null;

  // Validate blog post path if it matches /:locale/blog/:slug
  const payload = await getPayload({ config: payloadConfig });

  if (slugParam && slugParam.trim() !== "") {
    path = buildPathFromSlug(slugParam, locale);
    const match = path.match(/^\/(\w{2})\/blog\/([^/?#]+)/);
    if (match) {
      const [, loc, blogSlug] = match;
      const result = await payload.find({
        collection: "posts" as any,
        where: { slug: { equals: blogSlug } },
        limit: 1,
        locale: loc as any,
        draft: true as any,
        overrideAccess: true,
      });
      if (!result?.docs?.[0] && !id) {
        return new Response("Invalid slug", { status: 401 });
      }
    }
  }

  // If an id is provided, prefer it for validation and for computing a fallback path
  if (id && id.trim() !== "") {
    try {
      const doc = await payload.findByID({
        collection: "posts" as any,
        id,
        locale: "all" as any,
        draft: true as any,
        overrideAccess: true,
      });

      const isValidLocale = (l: unknown): l is string =>
        typeof l === "string" && /^[a-z]{2}$/i.test(l);
      const requestedLocale = isValidLocale(locale) ? locale : null;

      const slugField = (doc as any)?.slug;
      const titleField = (doc as any)?.title;

      const getLocalized = (obj: any, loc: string): string => {
        if (!obj) return "";
        if (typeof obj === "object" && typeof obj[loc] === "string")
          return (obj[loc] as string) || "";
        if (typeof obj === "string") return obj || "";
        return "";
      };

      const pathLocale = (requestedLocale || "en") as string;
      const orderedLocales: string[] = [pathLocale, "ar", "fa", "en"].filter(
        (l, idx, arr) => !!l && arr.indexOf(l) === idx
      );

      let slugCandidate = getLocalized(slugField, pathLocale).trim();
      if (!slugCandidate) {
        for (const loc of orderedLocales) {
          const s = getLocalized(slugField, loc).trim();
          if (s) {
            slugCandidate = s;
            break;
          }
        }
      }

      let titleCandidate = "";
      if (!slugCandidate) {
        titleCandidate = getLocalized(titleField, pathLocale).trim();
        if (!titleCandidate) {
          for (const loc of orderedLocales) {
            const t = getLocalized(titleField, loc).trim();
            if (t) {
              titleCandidate = t;
              break;
            }
          }
        }
      }

      const finalSlug = slugify(slugCandidate || titleCandidate || "untitled");
      path = buildPathFromSlug(finalSlug, pathLocale);
      // Carry the previewId so the page can fetch by ID if the slug isn't saved yet
      path +=
        (path.includes("?") ? "&" : "?") +
        `previewId=${encodeURIComponent(id)}`;
    } catch (e) {
      // If fetch by ID fails and we already have a path from slug, proceed; otherwise error
      if (!path) return new Response("Invalid id", { status: 401 });
    }
  }

  const draft = await draftMode();
  draft.enable();
  redirect(encodeURI(path as string));
}
