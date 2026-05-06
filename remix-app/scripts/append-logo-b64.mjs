/**
 * append-logo-b64.mjs
 * 指定した PNG を base64 data URL に変換して icon_b64.json に追記する。
 * Usage: node scripts/append-logo-b64.mjs <image-path>
 */

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_PATH = path.join(__dirname, "../public/icon_b64.json");

const imgArg = process.argv[2];
if (!imgArg) {
  console.error("Usage: node scripts/append-logo-b64.mjs <image-path>");
  process.exit(1);
}

const imgPath = path.resolve(__dirname, "..", imgArg);
const ext     = path.extname(imgArg).slice(1).toLowerCase();
const mime    = ext === "png" ? "image/png" : "image/jpeg";

const imgBuf  = readFileSync(imgPath);
const dataUrl = `data:${mime};base64,${imgBuf.toString("base64")}`;

const existing = JSON.parse(readFileSync(JSON_PATH, "utf-8"));
existing.push(dataUrl);
writeFileSync(JSON_PATH, JSON.stringify(existing), "utf-8");

console.log(`[append-logo-b64] Added: ${path.basename(imgArg)} → icon_b64.json (total: ${existing.length} entries)`);
