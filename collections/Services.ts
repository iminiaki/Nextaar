import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
