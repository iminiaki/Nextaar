/**
 * BlocksFeature with FAQ block.
 * Use in lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FAQFeature()] })
 */
import { BlocksFeature } from "@payloadcms/richtext-lexical";
import { FAQBlock } from "../../../blocks/FAQ";

export const FAQFeature = () => BlocksFeature({ blocks: [FAQBlock] });
