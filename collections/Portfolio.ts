import type { CollectionConfig, FieldHook } from "payload";

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: { equals: "published" },
      }
    },
  },
  versions: {
    drafts: { autosave: true },
  },
  admin: {
    useAsTitle: "title",
    group: "Portfolio",
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      localized: true,
      hooks: {
        beforeValidate: [
          ({ value, data, originalDoc, req }) => {
            const slugify = (val: string): string => {
              const base = (val || "").toString().normalize("NFKD").trim().toLowerCase()
              const dashed = base.replace(/[\s_]+/g, "-")
              const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "")
              const collapsed = cleaned.replace(/-+/g, "-").replace(/^-|-$/g, "")
              return collapsed || "untitled"
            }
            if (typeof value === "string" && value.trim() !== "") return slugify(value)
            const locale = (req as any)?.locale as string | undefined
            const titleField: unknown = (data as any)?.title ?? (originalDoc as any)?.title
            let source: string | undefined
            if (typeof titleField === "string") source = titleField
            else if (titleField && typeof titleField === "object" && typeof locale === "string") {
              const localizedTitle = (titleField as Record<string, unknown>)[locale]
              if (typeof localizedTitle === "string") source = localizedTitle
            }
            if (typeof source === "string" && source.trim() !== "") return slugify(source)
            return value
          },
        ],
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "portfolioCategories" as any,
      hasMany: true,
      admin: { position: "sidebar" },
    },
    { name: "excerpt", type: "text", localized: true },
    { name: "body", type: "richText", localized: true },
    {
      name: "client",
      type: "text",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { position: "sidebar" },
      localized: true,
    },
  ],
}


