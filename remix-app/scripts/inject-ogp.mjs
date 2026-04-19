/**
 * inject-ogp.mjs
 *
 * ビルド後に実行するポスト-ビルドスクリプト。
 * `clientLoader` を使うブログ記事は SSG 時点でデータが確定しないため、
 * MetaFunction の OGP が root のフォールバック値になってしまう。
 * このスクリプトが各記事の MDX frontmatter を読んで、
 * 対応する静的 HTML の OGP / title タグを正しい値に書き換える。
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_MDX_DIR  = path.join(__dirname, "../app/content/blog");
const BUILD_DIR     = path.join(__dirname, "../build/client/blog");
const SITE_ORIGIN   = "https://asteriskx.net";

/** HTML 属性値用にエスケープ */
function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * MDX ファイルの frontmatter ブロックからフィールドを抽出する。
 * YAML パーサーに依存せず、シンプルな正規表現で処理する。
 */
function parseFrontmatter(mdxContent) {
  const block = mdxContent.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";

  // title / description は常にダブルクォート文字列
  const title       = block.match(/^title:\s*"(.+)"/m)?.[1]       ?? "";
  const description = block.match(/^description:\s*"(.+)"/m)?.[1]  ?? "";

  return { title, description };
}

/** HTML 内の特定 meta タグの content 属性値を置換する */
function replaceMeta(html, attr, attrValue, newContent) {
  // <meta {attr}="{attrValue}" content="..."/> のパターン
  const re = new RegExp(
    `(<meta\\s+${attr}="${attrValue}"\\s+content=")[^"]*("\\s*/>)`,
    "g"
  );
  return html.replace(re, `$1${escapeAttr(newContent)}$2`);
}

/** HTML 内の <title>...</title> を置換する */
function replaceTitle(html, newTitle) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(newTitle)}</title>`);
}

// ── メイン処理 ─────────────────────────────────────────────────────────────────

const mdxFiles = await glob(`${BLOG_MDX_DIR}/*.mdx`);
let count = 0;

for (const mdxPath of mdxFiles) {
  const slug     = path.basename(mdxPath, ".mdx");
  const htmlPath = path.join(BUILD_DIR, slug, "index.html");

  if (!existsSync(htmlPath)) {
    console.warn(`[inject-ogp] HTML not found, skip: ${slug}`);
    continue;
  }

  const { title, description } = parseFrontmatter(readFileSync(mdxPath, "utf-8"));
  if (!title) {
    console.warn(`[inject-ogp] No title in frontmatter, skip: ${slug}`);
    continue;
  }

  const ogTitle       = title;
  const ogDescription = description || "If it doesn't exist, that's reason enough to build it.";
  const ogUrl         = `${SITE_ORIGIN}/blog/${slug}/`;
  const pageTitle     = `${title} — Asteriskx`;

  let html = readFileSync(htmlPath, "utf-8");

  // <title> タグ
  html = replaceTitle(html, pageTitle);

  // <meta name="description">
  html = replaceMeta(html, "name", "description", ogDescription);

  // OGP
  html = replaceMeta(html, "property", "og:type",        "article");
  html = replaceMeta(html, "property", "og:url",         ogUrl);
  html = replaceMeta(html, "property", "og:title",       ogTitle);
  html = replaceMeta(html, "property", "og:description", ogDescription);

  // Twitter Card
  html = replaceMeta(html, "name", "twitter:title",       ogTitle);
  html = replaceMeta(html, "name", "twitter:description", ogDescription);

  writeFileSync(htmlPath, html, "utf-8");
  console.log(`[inject-ogp] OK: ${slug}`);
  count++;
}

console.log(`[inject-ogp] Done. ${count} files updated.`);
