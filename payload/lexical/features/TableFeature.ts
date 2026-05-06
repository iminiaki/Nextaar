/**
 * Re-export Payload's built-in experimental table feature.
 * Use this in lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, TableFeature()] })
 */
import { EXPERIMENTAL_TableFeature } from '@payloadcms/richtext-lexical';

export const TableFeature = EXPERIMENTAL_TableFeature;
