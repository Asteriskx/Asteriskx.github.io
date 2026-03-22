import { reactRouter } from "@react-router/dev/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";
import { defineConfig, type Plugin } from "vite";

// HTML テンプレートに critical CSS を直接注入するプラグイン。
// React のレンダリングより前に実行されるため、JS ロード前の白発光を防ぐ。
function injectCriticalBg(): Plugin {
  return {
    name: "inject-critical-bg",
    transformIndexHtml(html) {
      return html.replace("<head>", '<head><style>html,body{background:#181c2a}</style>');
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
