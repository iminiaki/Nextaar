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
    read: ({req : { user }}) => {
      if(user) return true
      
      return {
        _status: {
          equals: "published"
        }
      };
    }
  },
  hooks: {
    beforeChange: [
      async ({ data, context }) => {
        console.log("THIS IS DATA", { data, context });
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
    preview: ({ slug }) => `http://localhost:3000/${slug}`,
    useAsTitle: "title",
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
      admin: { position: "sidebar" },
      hooks: {
        beforeValidate: [
          (
            (fallbackField: string = "title"): FieldHook =>
            ({ value, data, originalDoc, req }) => {
              const slugify = (val: string): string =>
                val
                  .normalize("NFKD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-z0-9 -]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "");

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
      name: "excerpt",
      type: "text",
      localized: true,
    },

    {
      name: "body",
      type: "richText",
      localized: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
  
      localized: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      localized: true,
    },
    {
      name: "readingTime",
      type: "number",
    },
    {
      name: "metaTag",
      type: "text",
      localized: true,
    },
    {
      name: "metaDescription",
      type: "text",
      localized: true,
    },
    {
      name: "metaKeywords",
      type: "text",
      localized: true,
    },
    {
      name: "metaTitle",
      type: "text",
      localized: true,
    },{
    name: "thumbnail",
    type: "upload",
    relationTo: "media",
    admin: { position: "sidebar" },
    
  }
  ],
  // upload: {
  //   adminThumbnail: "thumbnail",
  //   mimeTypes: ["image/*"],
  //   staticDir: "public/blog-media",
  //   // admin: { position: "sidebar" },
  //   imageSizes: [
  //     {
  //       name: "thumbnail",
  //       width: 300,
  //       height: 300,
  //     },
  //     {
  //       name: "banner",
  //       width: 1024,
  //       height: 640,
  //     },
  //   ],
  // },
};
