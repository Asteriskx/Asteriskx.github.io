import { reactRouter } from "@react-router/dev/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";
import { defineConfig, type Plugin } from "vite";

// HTML テンプレートに critical CSS と OGP タグを直接注入するプラグイン。
// ssr: false の SSG では meta() がクライアント側で実行されるため、
// クローラーに読まれる静的 HTML には meta タグが含まれない。そのため直接埋め込む。
function injectCriticalBg(): Plugin {
  const SITE_URL  = "https://asteriskx.net";
  const OGP_IMAGE = `${SITE_URL}/assets/image/logo-v2.png`;
  const ogpTags = [
    `<meta property="og:type"        content="website">`,
    `<meta property="og:url"         content="${SITE_URL}">`,
    `<meta property="og:title"       content="ぽーとふぉりおっぽいもの">`,
    `<meta property="og:description" content="If it doesn't exist, that's reason enough to build it.">`,
    `<meta property="og:image"       content="${OGP_IMAGE}">`,
    `<meta name="twitter:card"       content="summary">`,
    `<meta name="twitter:site"       content="@Astrisk_">`,
    `<meta name="twitter:image"      content="${OGP_IMAGE}">`,
  ].join("");

  return {
    name: "inject-critical-bg",
    transformIndexHtml(html) {
      // color-scheme: dark → システム UI（スクロールバー等）を暗色に統一
      const criticalCss = `<style>html,body{background:#181c2a;color-scheme:dark}</style>`;
      return html.replace("<head>", `<head>${criticalCss}${ogpTags}`);
    },
  };
}

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeHighlight],
    }),
    injectCriticalBg(),
    reactRouter(),
  ],
});
