import type { CollectionConfig, FieldHook } from "payload";

function extractPlainTextFromLexical(value: any): string {
  if (!value) return "";
  const collectedText: string[] = [];

  const walk = (node: any) => {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (typeof node === "object") {
      if (typeof node.text === "string") {
        collectedText.push(node.text);
      }
      for (const key of Object.keys(node)) {
        if (key === "text") continue;
        const child = (node as any)[key];
        if (child && typeof child === "object") walk(child);
      }
      return;
    }
  };

  walk(value);
  return collectedText.join(" ");
}

export const Posts: CollectionConfig = {
  slug: "posts",
  // access: {
  //   read: () => true,
  // },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;

      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, context }) => {
        // Calculate reading time from richText `body`
        let plainText = "";

        // Prefer data.body from the incoming document
        const incomingBody = data?.body as any;
        if (typeof incomingBody === "string") {
          plainText = incomingBody;
        } else if (incomingBody) {
          plainText = extractPlainTextFromLexical(incomingBody);
        } else if ((context as any)?.internal?.richText?.body) {
          // Fallback to editor context if needed
          plainText = extractPlainTextFromLexical(
            (context as any).internal.richText.body
          );
        }

        const words = plainText?.trim()?.split(/\s+/).filter(Boolean) || [];
        const readingTime = Math.max(1, Math.ceil(words.length / 200));

        if (data) {
          (data as any).readingTime = readingTime;
        }

        return data;
      },
    ],
  },

  admin: {
    preview: (doc, options) => {
      const { id, slug, title } = doc as any;
      const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const token = process.env.DRAFT_SECRET || "dev-secret";
      const loc =
        typeof (options as any)?.locale === "string"
          ? (options as any).locale
          : "en";
      const slugify = (val: string): string => {
        const base = (val || "")
          .toString()
          .normalize("NFKD")
          .trim()
          .toLowerCase();
        const dashed = base.replace(/[\s_]+/g, "-");
        const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "");
        const collapsed = cleaned.replace(/-+/g, "-").replace(/^-|-$/g, "");
        return collapsed || "untitled";
      };
      const getLocalized = (obj: any, l: string): string | undefined => {
        if (!obj) return undefined;
        if (typeof obj === "object" && typeof obj[l] === "string")
          return obj[l] as string;
        if (typeof obj === "string") return obj as string;
        return undefined;
      };
      const localizedTitle = getLocalized(title, loc) || "untitled";
      const finalSlug = (() => {
        const s = getLocalized(slug, loc);
        if (s && s.trim() !== "") return s;
        return slugify(String(localizedTitle));
      })();
      const idParam = id ? `&id=${encodeURIComponent(String(id))}` : "";
      return `${base}/api/draft?secret=${encodeURIComponent(
        token
      )}&slug=${encodeURIComponent(
        String(finalSlug)
      )}&locale=${encodeURIComponent(loc)}${idParam}`;
    },
    useAsTitle: "title",
    group: "Blog",
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      localized: true,
      unique: true,
      admin: {
        position: "sidebar",
        // readOnly: true,
        // condition: () => false, // hide from admin UI; generated automatically
      },
      hooks: {
        beforeValidate: [
          (
            (fallbackField: string = "title"): FieldHook =>
            ({ value, data, originalDoc, req }) => {
              const slugify = (val: string): string => {
                const base = (val || "")
                  .toString()
                  .normalize("NFKD")
                  .trim()
                  .toLowerCase();
                const dashed = base.replace(/[\s_]+/g, "-");
                const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "");
                const collapsed = cleaned
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "");
                return collapsed || "untitled";
              };

              if (typeof value === "string" && value.trim() !== "") {
                return slugify(value);
              }

              const locale = (req as any)?.locale as string | undefined;
              const titleField: unknown =
                (data as any)?.[fallbackField] ??
                (originalDoc as any)?.[fallbackField];

              let source: string | undefined;
              if (typeof titleField === "string") {
                source = titleField;
              } else if (
                titleField &&
                typeof titleField === "object" &&
                typeof locale === "string"
              ) {
                const localizedTitle = (titleField as Record<string, unknown>)[
                  locale
                ];
                if (typeof localizedTitle === "string") source = localizedTitle;
              }

              if (typeof source === "string" && source.trim() !== "") {
                return slugify(source);
              }

              return value;
            }
          )(),
        ],
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories" as any,
      hasMany: true,   // allow multiple categories per post
      required: false, // set true if you want every post to have at least one category
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "text",
      localized: true,
    },

    {
      name: "body",
      type: "richText",
      localized: true,
      // Uses root editor (payload.config.ts) with Table + FAQ + FixedToolbar
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      // localized: true,
    },
    {
      name: "readingTime",
      type: "number",
    },
    {
  name: "seo",
  type: "group",
  fields: [
    { name: "metaTitle", type: "text", localized: true },
    { name: "metaDescription", type: "textarea", localized: true },
    { name: "metaKeywords", type: "text", localized: true },
  ],
},
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { position: "sidebar" },
      localized: true,
    },
  ],
  
};
