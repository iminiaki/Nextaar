"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQBlockNode = {
  fields?: {
    items?: Array<{
      question?: unknown;
      answer?: unknown;
    }>;
  };
};

type FAQBlockProps = {
  node: FAQBlockNode;
};

function getLocalizedValue(
  value: unknown,
  locale?: string
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object" || value === null) return "";
  const obj = value as Record<string, string>;
  return (locale && obj[locale]) || obj["en"] || Object.values(obj)[0] || "";
}

export function FAQBlock({ node }: FAQBlockProps) {
  const items = node.fields?.items ?? [];
  if (items.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full mb-6 mt-2">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left">
            {getLocalizedValue(item.question)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap">
                {typeof item.answer === "string"
                  ? item.answer
                  : getLocalizedValue(item.answer)}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
