import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faq",
  labels: {
    singular: "FAQ",
    plural: "FAQs",
  },
  fields: [
    {
      name: "items",
      type: "array",
      labels: {
        singular: "Item",
        plural: "Items",
      },
      required: true,
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
