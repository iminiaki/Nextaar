import type { CollectionConfig } from "payload";

export const PortfolioCategories: CollectionConfig = {
  slug: "portfolioCategories",
  labels: {
    singular: "Portfolio Category",
    plural: "Portfolio Categories",
  },
  admin: {
    useAsTitle: "name",
    group: "Portfolio",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "text", required: false, localized: true },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};


