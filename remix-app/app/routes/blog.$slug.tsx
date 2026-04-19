import type { MetaFunction } from "react-router";
import { useLoaderData, useParams } from "react-router";
import type { Route } from "./+types/blog.$slug";
import { Header } from "../components/Header";
import { BackToTop } from "../components/BackToTop";
import { Footer } from "../components/Footer";
import { CodeBlock } from "../components/CodeBlock";
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

export const meta: MetaFunction = ({ matches, params }) => {
  const self = matches[matches.length - 1] as { data?: { frontmatter?: PostFrontmatter } };
  const fm = self?.data?.frontmatter;
  const slug = params.slug ?? "";

  const title = fm?.title ? `${fm.title} — Asteriskx` : "Blog — Asteriskx";
  const description = fm?.description ?? "If it doesn't exist, that's reason enough to build it.";
  const ogTitle = fm?.title ?? "ぽーとふぉりおっぽいもの";
  const ogUrl = `https://asteriskx.net/blog/${slug}`;

  return [
    { title },
    { name: "description",          content: description },
    { property: "og:type",          content: "article" },
    { property: "og:url",           content: ogUrl },
    { property: "og:title",         content: ogTitle },
    { property: "og:description",   content: description },
    { property: "og:image",         content: "https://asteriskx.net/assets/image/ogp.png" },
    { property: "og:image:width",   content: "1200" },
    { property: "og:image:height",  content: "630" },
    { name: "twitter:card",         content: "summary_large_image" },
    { name: "twitter:title",        content: ogTitle },
    { name: "twitter:description",  content: description },
    { name: "twitter:image",        content: "https://asteriskx.net/assets/image/ogp.png" },
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
          <div className="blog-post-meta">
            <time className="blog-post-date">{frontmatter.date}</time>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="blog-tags">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="blog-content">
          {/* MDX コンポーネントは components prop を受け取れるが型定義に含まれないためキャスト */}
          {(() => {
            const MDX = Component as React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }>;
            return <MDX components={{ pre: CodeBlock }} />;
          })()}
        </div>
      </section>

      <BackToTop />

      <Footer />
    </>
  );
}
