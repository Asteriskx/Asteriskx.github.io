import type { Config } from "@react-router/dev/config";
import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getBlogSlugs(): Promise<string[]> {
  const files = await glob("app/content/blog/*.mdx", {
    cwd: __dirname,
  });
  return files.map((f) => path.basename(f, ".mdx"));
}

export default {
  ssr: false,
  async prerender() {
    const slugs = await getBlogSlugs();
    return [
      "/",
      "/blog",
      ...slugs.map((s) => `/blog/${s}`),
    ];
  },
} satisfies Config;
