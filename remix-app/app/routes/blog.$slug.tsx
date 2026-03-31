import type { MetaFunction } from "react-router";
import { useLoaderData, useParams } from "react-router";
import type { Route } from "./+types/blog.$slug";
import { Header } from "../components/Header";
import { BackToTop } from "../components/BackToTop";
import type { PostFrontmatter } from "../types";

/**
 * ブログ記事個別ページのクライアントローダー。
 * `params.slug` に対応する MDX モジュールを動的インポートし記事データを返す。
 * UX のため最低 500ms のローディング表示を保証する（軽量記事でも即座に消えないよう）。
 * @param params.slug 記事のスラッグ（URL パラメーター）
 * @throws {Response} スラッグに対応する MDX ファイルが存在しない場合に 404 を throw
 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const modules = import.meta.glob<{
    default: React.ComponentType;
    frontmatter: PostFrontmatter;
  }>("../content/blog/*.mdx");

  const key = `../content/blog/${params.slug}.mdx`;
  const loader = modules[key];
  if (!loader) throw new Response("Not Found", { status: 404 });

  // 記事が軽くても最低 600ms はローディングを見せる（blog-hydrate アニメーションのチラつき防止）
  const [mod] = await Promise.all([
    loader(),
    new Promise(r => setTimeout(r, 600)),
  ]);
  return { Component: mod.default, frontmatter: mod.frontmatter };
}

export const meta: MetaFunction = ({ matches }) => {
  const self = matches[matches.length - 1] as { data?: { frontmatter?: PostFrontmatter } };
  const d = self?.data;
  return [
    { title: d?.frontmatter?.title ? `${d.frontmatter.title} — Asteriskx` : "Blog — Asteriskx" },
    { name: "description", content: d?.frontmatter?.description ?? "" },
  ];
};

/**
 * clientLoader のデータ取得中（ハイドレーション完了前）に表示されるフォールバック UI。
 * ターミナル風のプログレスバーでロード中であることを表現する。
 */
export function HydrateFallback() {
  const { slug } = useParams();
  return (
    <div className="blog-hydrate">
      <div className="blog-hydrate-terminal">
        <span className="blog-hydrate-comment">// loading article...</span>
        <span className="blog-hydrate-cmd">$ cat blog/{slug}.mdx</span>
        <span className="blog-hydrate-progress">
          <span className="blog-hydrate-bar" />
        </span>
      </div>
    </div>
  );
}

/**
 * ブログ記事個別ページ（/blog/:slug）。
 * clientLoader が返した MDX コンポーネントをレンダリングし、記事本文・日付・ヘッダーを表示する。
 */
export default function BlogPost() {
  const { Component, frontmatter } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Header />

      <section className="section blog-post-section">
        <div className="blog-post-header">
          <a href="/blog" className="blog-back">[ ← back ]</a>
          <h1 className="blog-post-title">{frontmatter.title}</h1>
          <time className="blog-post-date">{frontmatter.date}</time>
        </div>

        <div className="blog-content">
          <Component />
        </div>
      </section>

      <BackToTop />

      <footer className="footer">
        <span className="footer-copy">&copy; 2018&ndash;2026 Asteriskx</span>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="/#about">about</a>
          <a href="/#work">work</a>
          <a href="/blog">blog</a>
          <a href="/#contact">contact</a>
        </nav>
      </footer>
    </>
  );
}
