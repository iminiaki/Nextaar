import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "role",
      type: "select",
      options: ["admin", "user"],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
  ],
};
