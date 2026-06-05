/**
 * Extracts FAQ items from Lexical rich text body (BlocksFeature faq blocks).
 * Returns items for FAQ schema only when present.
 */
function getLocalizedText(
  value: unknown,
  locale?: string
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object" || value === null) return "";
  const obj = value as Record<string, string>;
  return (locale && obj[locale]) || obj["en"] || Object.values(obj)[0] || "";
}

function walkLexical(
  node: unknown,
  locale: string,
  faqs: Array<{ question: string; answer: string }>
): void {
  if (!node || typeof node !== "object") return;

  const n = node as Record<string, unknown>;
  const type = n.type;
  const blockType = n.blockType;

  if (type === "block" && blockType === "faq") {
    const fields = n.fields as { items?: Array<{ question?: unknown; answer?: unknown }> } | undefined;
    const items = fields?.items ?? [];
    for (const item of items) {
      const q = getLocalizedText(item.question, locale);
      const a = getLocalizedText(item.answer, locale);
      if (q && a) {
        faqs.push({ question: q, answer: a });
      }
    }
    return;
  }

  const children = n.children;
  if (Array.isArray(children)) {
    for (const child of children) {
      walkLexical(child, locale, faqs);
    }
  }
}

export function extractFAQFromLexical(
  body: unknown,
  locale: string
): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  if (!body || typeof body !== "object") return faqs;

  const root = (body as { root?: unknown }).root;
  if (root) {
    walkLexical(root, locale, faqs);
  }
  return faqs;
}

export function buildFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
  pageUrl?: string
): object | null {
  if (!faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { url: pageUrl }),
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
