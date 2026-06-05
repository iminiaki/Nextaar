import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getPayload } from "payload";

loadEnvFiles(process.cwd());
process.env.PAYLOAD_SECRET ||= "local-payload-script-secret";

const SOURCE_LOCALE = process.env.POST_TRANSLATE_SOURCE_LOCALE || "fa";
const TARGET_LOCALES = (process.env.POST_TRANSLATE_TARGET_LOCALES || "en,ar")
  .split(",")
  .map((locale) => locale.trim())
  .filter(Boolean);
const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");
const TRANSLATE_CATEGORIES = !process.argv.includes("--skip-categories");
const BATCH_CHAR_LIMIT = 3000;
const DELIMITER = "\n___NEXTAAR_TRANSLATION_SEGMENT___\n";
const REQUEST_TIMEOUT_MS = 20000;
const MAX_RETRIES = 3;

type TargetLocale = "en" | "ar";

type TranslatableTextNode = {
  text: string;
};

function loadEnvFiles(cwd: string) {
  const shellEnvKeys = new Set(Object.keys(process.env));

  for (const filename of [".env", ".env.local"]) {
    const filePath = path.join(cwd, filename);
    if (!existsSync(filePath)) continue;

    for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!match || shellEnvKeys.has(match[1])) continue;

      const value = (match[2] || "")
        .replace(/^['"]|['"]$/g, "")
        .replace(/\\n/g, "\n");

      process.env[match[1]] = value;
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value: string) {
  const base = value.toString().normalize("NFKD").trim().toLowerCase();
  const dashed = base.replace(/[\s_]+/g, "-");
  const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "");
  return cleaned.replace(/-+/g, "-").replace(/^-|-$/g, "") || "untitled";
}

function unwrapPayloadConfig(module: any) {
  return module.default?.default ?? module.default;
}

function collectTextNodes(value: unknown, nodes: TranslatableTextNode[] = []) {
  if (!value) return nodes;

  if (Array.isArray(value)) {
    for (const child of value) collectTextNodes(child, nodes);
    return nodes;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.text === "string" && record.text.trim()) {
      nodes.push(record as TranslatableTextNode);
    }

    for (const [key, child] of Object.entries(record)) {
      if (key !== "text" && child && typeof child === "object") {
        collectTextNodes(child, nodes);
      }
    }
  }

  return nodes;
}

function translatedTextFromGoogleResponse(data: any) {
  if (!Array.isArray(data?.[0])) {
    throw new Error("Unexpected translation response.");
  }

  return data[0]
    .map((segment: unknown) =>
      Array.isArray(segment) && typeof segment[0] === "string"
        ? segment[0]
        : ""
    )
    .join("");
}

async function translateChunk(text: string, targetLocale: string) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", SOURCE_LOCALE);
  url.searchParams.set("tl", targetLocale);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(
          `Translation failed: ${response.status} ${response.statusText}`
        );
      }

      return translatedTextFromGoogleResponse(await response.json());
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        await sleep(500 * attempt);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

function splitLongText(text: string) {
  const chunks: string[] = [];
  let current = "";

  for (const part of text.split(/(?<=[.!؟?۔])\s+/u)) {
    if ((current + " " + part).trim().length > BATCH_CHAR_LIMIT && current) {
      chunks.push(current.trim());
      current = part;
    } else {
      current = `${current} ${part}`.trim();
    }
  }

  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [text];
}

async function translateLongText(text: string, targetLocale: string) {
  const chunks = splitLongText(text);
  const translated: string[] = [];

  for (const chunk of chunks) {
    translated.push(await translateChunk(chunk, targetLocale));
    await sleep(150);
  }

  return translated.join(" ");
}

async function translateTexts(texts: string[], targetLocale: string) {
  const results = [...texts];
  const pending: { index: number; text: string }[] = [];

  texts.forEach((text, index) => {
    if (!text.trim()) return;
    pending.push({ index, text });
  });

  for (let cursor = 0; cursor < pending.length; ) {
    const batch: typeof pending = [];
    let charCount = 0;

    while (cursor < pending.length) {
      const item = pending[cursor];
      if (item.text.length > BATCH_CHAR_LIMIT) {
        if (batch.length === 0) {
          results[item.index] = await translateLongText(item.text, targetLocale);
          cursor += 1;
          await sleep(150);
        }
        break;
      }

      const nextCount = charCount + item.text.length + DELIMITER.length;
      if (batch.length > 0 && nextCount > BATCH_CHAR_LIMIT) break;

      batch.push(item);
      charCount = nextCount;
      cursor += 1;
    }

    if (batch.length === 0) continue;

    const translated = await translateChunk(
      batch.map((item) => item.text).join(DELIMITER),
      targetLocale
    );
    const parts = translated.split(DELIMITER);

    if (parts.length === batch.length) {
      batch.forEach((item, index) => {
        results[item.index] = parts[index].trim();
      });
    } else {
      for (const item of batch) {
        results[item.index] = await translateLongText(item.text, targetLocale);
        await sleep(150);
      }
    }

    await sleep(250);
  }

  return results;
}

async function translatePost(payload: any, post: any, targetLocale: TargetLocale) {
  if (!FORCE) {
    const existing = await payload.findByID({
      id: post.id,
      collection: "posts",
      fallbackLocale: false,
      locale: targetLocale,
      overrideAccess: true,
    });

    if (existing?.title && existing?.body) {
      console.log(`Skipping ${targetLocale}: ${post.title} already has localized content.`);
      return false;
    }
  }

  const body = JSON.parse(JSON.stringify(post.body || null));
  const bodyTextNodes = collectTextNodes(body);
  const fields = [
    post.title || "",
    post.excerpt || "",
    post.seo?.metaTitle || post.title || "",
    post.seo?.metaDescription || post.excerpt || "",
    post.seo?.metaKeywords || "",
    ...bodyTextNodes.map((node) => node.text),
  ];

  const translated = await translateTexts(fields, targetLocale);
  const [
    title,
    excerpt,
    metaTitle,
    metaDescription,
    metaKeywords,
    ...bodyTexts
  ] = translated;

  bodyTextNodes.forEach((node, index) => {
    node.text = bodyTexts[index] || node.text;
  });

  const data = {
    body,
    excerpt,
    image: post.image || undefined,
    seo: {
      metaDescription,
      metaKeywords,
      metaTitle,
    },
    slug: slugify(title),
    title,
  };

  if (DRY_RUN) {
    console.log(`Would update ${targetLocale}: ${post.title} -> ${title}`);
    return true;
  }

  await payload.update({
    id: post.id,
    collection: "posts",
    data,
    fallbackLocale: false,
    locale: targetLocale,
    overrideAccess: true,
  });

  console.log(`Updated ${targetLocale}: ${post.title} -> ${title}`);
  return true;
}

async function translateCategory(
  payload: any,
  category: any,
  targetLocale: TargetLocale
) {
  if (!category.name && !category.description) return false;

  const [name, description] = await translateTexts(
    [category.name || "", category.description || ""],
    targetLocale
  );

  if (DRY_RUN) {
    console.log(`Would update category ${targetLocale}: ${category.name} -> ${name}`);
    return true;
  }

  await payload.update({
    id: category.id,
    collection: "categories",
    data: {
      description,
      name,
    },
    fallbackLocale: false,
    locale: targetLocale,
    overrideAccess: true,
  });

  console.log(`Updated category ${targetLocale}: ${category.name} -> ${name}`);
  return true;
}

async function main() {
  const payloadConfigModule = await import("../payload.config.ts");
  const payload = await getPayload({
    config: unwrapPayloadConfig(payloadConfigModule),
  });

  const { docs: posts } = await payload.find({
    collection: "posts",
    depth: 0,
    fallbackLocale: false,
    limit: 100,
    locale: SOURCE_LOCALE,
    overrideAccess: true,
  });

  console.log(
    `Translating ${posts.length} posts from ${SOURCE_LOCALE} to ${TARGET_LOCALES.join(", ")}${DRY_RUN ? " (dry run)" : ""}.`
  );

  let updatedPosts = 0;
  for (const post of posts) {
    for (const targetLocale of TARGET_LOCALES as TargetLocale[]) {
      if (await translatePost(payload, post, targetLocale)) updatedPosts += 1;
    }
  }

  let updatedCategories = 0;
  if (TRANSLATE_CATEGORIES) {
    const { docs: categories } = await payload.find({
      collection: "categories",
      depth: 0,
      fallbackLocale: false,
      limit: 100,
      locale: SOURCE_LOCALE,
      overrideAccess: true,
    });

    for (const category of categories) {
      for (const targetLocale of TARGET_LOCALES as TargetLocale[]) {
        if (await translateCategory(payload, category, targetLocale)) {
          updatedCategories += 1;
        }
      }
    }
  }

  console.log(
    `Translation complete. Posts updated: ${updatedPosts}. Categories updated: ${updatedCategories}.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    setTimeout(() => process.exit(process.exitCode ?? 0), 100);
  });
