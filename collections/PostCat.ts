import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  admin: {
    useAsTitle: "name",
    group: "Blog",
  },
  access: {
    read: () => true, // public can read categories
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true, // if you want category names translatable
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "text",
    //   required: true,
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
