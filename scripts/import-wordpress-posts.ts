import { getPayload } from "payload";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

loadEnvFiles(process.cwd());
process.env.PAYLOAD_SECRET ||= "local-payload-script-secret";

const DEFAULT_POSTS_URL = "https://lastaar.com/wp-json/wp/v2/posts";
const DEFAULT_LOCALE = "fa";
const PER_PAGE = 100;

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

type WordPressRendered = {
  rendered?: string;
};

type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  description?: string;
};

type WordPressMedia = {
  id?: number;
  alt_text?: string;
  source_url?: string;
  media_details?: {
    file?: string;
  };
};

type WordPressPost = {
  id: number;
  date?: string;
  modified?: string;
  slug?: string;
  link?: string;
  title?: WordPressRendered;
  excerpt?: WordPressRendered;
  content?: WordPressRendered;
  _embedded?: {
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
};

type ImportStats = {
  created: number;
  updated: number;
  skipped: number;
  categories: number;
  media: number;
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const postsUrl =
  args.find((arg) => !arg.startsWith("--")) ||
  process.env.WORDPRESS_POSTS_URL ||
  DEFAULT_POSTS_URL;
const locale = process.env.WORDPRESS_IMPORT_LOCALE || DEFAULT_LOCALE;
const importMedia = process.env.WORDPRESS_IMPORT_MEDIA !== "false";

const namedEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  hellip: "...",
  laquo: "«",
  ldquo: '"',
  lsquo: "'",
  lt: "<",
  nbsp: " ",
  ndash: "-",
  quot: '"',
  raquo: "»",
  rdquo: '"',
  rsquo: "'",
  shy: "",
  zwnj: "\u200c",
};

function decodeHtml(value = "") {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity: string) => {
    const normalized = entity.toLowerCase();
    if (normalized.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }
    if (normalized.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }
    return namedEntities[normalized] ?? `&${entity};`;
  });
}

function htmlToText(html = "") {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\[\/?[^\]]+\]/g, "")
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(value: string) {
  const base = value.toString().normalize("NFKD").trim().toLowerCase();
  const dashed = base.replace(/[\s_]+/g, "-");
  const cleaned = dashed.replace(/[^\p{L}\p{N}-]+/gu, "");
  return cleaned.replace(/-+/g, "-").replace(/^-|-$/g, "") || "untitled";
}

function lexicalText(text: string) {
  return {
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    type: "text",
    version: 1,
  };
}

function lexicalParagraph(text: string) {
  return {
    children: text ? [lexicalText(text)] : [],
    direction: "rtl",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    type: "paragraph",
    version: 1,
  };
}

function lexicalHeading(text: string, tag: string) {
  return {
    children: [lexicalText(text)],
    direction: "rtl",
    format: "",
    indent: 0,
    tag,
    type: "heading",
    version: 1,
  };
}

function htmlToLexical(html = "") {
  const children: any[] = [];
  const blockPattern = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const text = htmlToText(match[2]);
    if (!text) continue;

    if (tag.startsWith("h")) {
      children.push(lexicalHeading(text, tag));
    } else {
      children.push(lexicalParagraph(tag === "li" ? `• ${text}` : text));
    }
  }

  if (children.length === 0) {
    const fallback = htmlToText(html);
    for (const paragraph of fallback.split(/\n{2,}/).filter(Boolean)) {
      children.push(lexicalParagraph(paragraph));
    }
  }

  return {
    root: {
      children: children.length > 0 ? children : [lexicalParagraph("")],
      direction: "rtl",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

function buildPageUrl(baseUrl: string, page: number) {
  const url = new URL(baseUrl);
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));
  url.searchParams.set("_embed", "1");
  return url;
}

async function fetchJson<T>(url: URL): Promise<{ data: T; headers: Headers }> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText} (${url})`);
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
  };
}

async function fetchAllPosts() {
  const posts: WordPressPost[] = [];

  for (let page = 1; ; page += 1) {
    const url = buildPageUrl(postsUrl, page);
    const { data, headers } = await fetchJson<WordPressPost[]>(url);
    if (!Array.isArray(data)) {
      throw new Error("WordPress posts response was not an array.");
    }

    posts.push(...data);
    const totalPages = Number(headers.get("x-wp-totalpages") || "0");
    if (totalPages > 0 ? page >= totalPages : data.length < PER_PAGE) break;
  }

  return posts;
}

function getPostCategories(post: WordPressPost) {
  return (post._embedded?.["wp:term"] || [])
    .flat()
    .filter((term) => term.taxonomy === "category" && term.slug !== "uncategorized");
}

function getFeaturedMedia(post: WordPressPost) {
  return post._embedded?.["wp:featuredmedia"]?.[0];
}

function sanitizeFilename(filename: string) {
  return filename
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function mediaFilename(media: WordPressMedia, post: WordPressPost) {
  const sourcePath = media.source_url ? new URL(media.source_url).pathname : "";
  const baseName =
    sourcePath.split("/").filter(Boolean).pop() ||
    media.media_details?.file?.split("/").pop() ||
    `post-${post.id}.jpg`;
  return sanitizeFilename(`wp-${media.id || post.id}-${baseName}`);
}

async function ensureCategory(payload: any, term: WordPressTerm, stats: ImportStats) {
  const slug = slugify(term.slug || term.name);
  const existing = await payload.find({
    collection: "categories",
    fallbackLocale: false,
    limit: 1,
    locale,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (existing.docs?.[0]) return existing.docs[0].id;
  if (dryRun) return `dry-run-category-${slug}`;

  const created = await payload.create({
    collection: "categories",
    data: {
      description: htmlToText(term.description || ""),
      name: decodeHtml(term.name),
      slug,
    },
    locale,
    overrideAccess: true,
  });

  stats.categories += 1;
  return created.id;
}

async function ensureMedia(payload: any, media: WordPressMedia | undefined, post: WordPressPost, stats: ImportStats) {
  if (!importMedia || !media?.source_url) return undefined;

  const filename = mediaFilename(media, post);
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: {
      filename: {
        equals: filename,
      },
    },
  });

  if (existing.docs?.[0]) return existing.docs[0].id;
  if (dryRun) return `dry-run-media-${filename}`;

  const response = await fetch(media.source_url);
  if (!response.ok) {
    console.warn(`Skipping featured image for post ${post.id}: ${response.status} ${media.source_url}`);
    return undefined;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    console.warn(`Skipping non-image featured media for post ${post.id}: ${contentType}`);
    return undefined;
  }

  const tempDir = path.join(os.tmpdir(), "nextaar-wordpress-import");
  await mkdir(tempDir, { recursive: true });
  const filePath = path.join(tempDir, filename);

  await writeFile(filePath, Buffer.from(await response.arrayBuffer()));

  try {
    const created = await payload.create({
      collection: "media",
      data: {
        alt: media.alt_text || htmlToText(post.title?.rendered || "") || filename,
      },
      filePath,
      overrideAccess: true,
    });

    stats.media += 1;
    return created.id;
  } finally {
    await rm(filePath, { force: true });
  }
}

async function getAuthorId(payload: any) {
  const authorEmail = process.env.WORDPRESS_IMPORT_AUTHOR_EMAIL;
  const where = authorEmail
    ? {
        email: {
          equals: authorEmail,
        },
      }
    : undefined;

  const users = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
    ...(where ? { where } : {}),
  });

  return users.docs?.[0]?.id;
}

function postData(post: WordPressPost, categoryIds: string[], mediaId: string | undefined, authorId: string | undefined) {
  const title = htmlToText(post.title?.rendered || `WordPress post ${post.id}`);
  const excerpt = htmlToText(post.excerpt?.rendered || "").replace(/\s*\[&hellip;\]\s*$/, "");
  const slug = slugify(post.slug || title);
  const publishedAt = post.date ? new Date(post.date).toISOString() : undefined;
  const updatedAt = post.modified ? new Date(post.modified).toISOString() : undefined;

  return {
    _status: "published",
    ...(authorId ? { author: authorId } : {}),
    ...(categoryIds.length > 0 ? { categories: categoryIds } : {}),
    ...(mediaId ? { image: mediaId } : {}),
    ...(publishedAt ? { createdAt: publishedAt } : {}),
    ...(updatedAt ? { updatedAt } : {}),
    body: htmlToLexical(post.content?.rendered || ""),
    excerpt,
    seo: {
      metaDescription: excerpt,
      metaTitle: title,
    },
    slug,
    title,
  };
}

async function upsertPost(payload: any, post: WordPressPost, data: any, stats: ImportStats) {
  const existing = await payload.find({
    collection: "posts",
    fallbackLocale: false,
    limit: 1,
    locale,
    overrideAccess: true,
    where: {
      slug: {
        equals: data.slug,
      },
    },
  });

  if (dryRun) {
    console.log(`${existing.docs?.[0] ? "Would update" : "Would create"}: ${data.slug}`);
    return;
  }

  if (existing.docs?.[0]) {
    await payload.update({
      id: existing.docs[0].id,
      collection: "posts",
      data,
      locale,
      overrideAccess: true,
    });
    stats.updated += 1;
    return;
  }

  await payload.create({
    collection: "posts",
    data,
    locale,
    overrideAccess: true,
  });
  stats.created += 1;
}

async function main() {
  const stats: ImportStats = {
    categories: 0,
    created: 0,
    media: 0,
    skipped: 0,
    updated: 0,
  };

  console.log(`Fetching WordPress posts from ${postsUrl}`);
  console.log(`Import locale: ${locale}${dryRun ? " (dry run)" : ""}`);

  const wordpressPosts = await fetchAllPosts();
  console.log(`Fetched ${wordpressPosts.length} WordPress posts.`);

  const payloadConfigModule = await import("../payload.config.ts");
  const payloadConfig =
    (payloadConfigModule.default as any)?.default ?? payloadConfigModule.default;
  const payload = await getPayload({ config: payloadConfig });
  const authorId = await getAuthorId(payload);

  for (const post of wordpressPosts) {
    const title = htmlToText(post.title?.rendered || "");
    if (!title) {
      stats.skipped += 1;
      console.warn(`Skipping post ${post.id}: missing title`);
      continue;
    }

    const categoryIds = await Promise.all(
      getPostCategories(post).map((term) => ensureCategory(payload, term, stats))
    );
    const mediaId = await ensureMedia(payload, getFeaturedMedia(post), post, stats);
    const data = postData(post, categoryIds, mediaId, authorId);
    await upsertPost(payload, post, data, stats);
  }

  console.log("WordPress import complete.");
  console.log(
    `Created: ${stats.created}, updated: ${stats.updated}, skipped: ${stats.skipped}, categories: ${stats.categories}, media: ${stats.media}`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    // Payload keeps database handles open in local scripts.
    setTimeout(() => process.exit(process.exitCode ?? 0), 100);
  });
