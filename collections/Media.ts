import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    staticDir: "public/media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
      },
      {
        name: "banner",
        width: 1024,
        height: 640,
      },
    ],
  },
};
