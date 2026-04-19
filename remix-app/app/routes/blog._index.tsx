import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { BackToTop } from "../components/BackToTop";
import { Footer } from "../components/Footer";
import { MatrixRainCard } from "../components/MatrixRainCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PostFrontmatter } from "../types";

/** `import.meta.glob` で取得した MDX モジュールの型 */
interface PostModule {
  frontmatter: PostFrontmatter;
}

const postModules = import.meta.glob<PostModule>("../content/blog/*.mdx", {
  eager: true,
});

const posts = Object.entries(postModules)
  .map(([filepath, mod]) => ({
    slug: filepath.replace("../content/blog/", "").replace(".mdx", ""),
    ...mod.frontmatter,
  }))
  .sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    // 同日は slug（ファイル名）の降順（後から作ったファイルが上）
    return b.slug.localeCompare(a.slug);
  });

/** 全記事のタグを重複なく収集し、出現数の多い順に並べる */
const allTags = Array.from(
  posts.flatMap((p) => p.tags ?? []).reduce((acc, tag) => {
    acc.set(tag, (acc.get(tag) ?? 0) + 1);
    return acc;
  }, new Map<string, number>()),
).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);

export const meta: MetaFunction = () => [
  { title: "Blog — ぽーとふぉりおっぽいもの" },
  { name: "description",          content: "If it doesn't exist, that's reason enough to build it." },
  { property: "og:type",          content: "website" },
  { property: "og:url",           content: "https://asteriskx.net/blog/" },
  { property: "og:title",         content: "Blog — ぽーとふぉりおっぽいもの" },
  { property: "og:description",   content: "If it doesn't exist, that's reason enough to build it." },
  { property: "og:image",         content: "https://asteriskx.net/assets/image/ogp.png" },
  { property: "og:image:width",   content: "1200" },
  { property: "og:image:height",  content: "630" },
  { name: "twitter:card",         content: "summary_large_image" },
  { name: "twitter:title",        content: "Blog — ぽーとふぉりおっぽいもの" },
  { name: "twitter:description",  content: "If it doesn't exist, that's reason enough to build it." },
  { name: "twitter:image",        content: "https://asteriskx.net/assets/image/ogp.png" },
];

/**
 * ブログ記事一覧ページ（/blog）。
 * MDX ファイルを一括インポートし、日付降順で全記事をカード表示する。
 * タグボタンで絞り込みができる（クライアントサイド filtering）。
 */
export default function BlogIndex() {
  useScrollReveal();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // フィルター変更後、新たにレンダリングされた .reveal 要素は useScrollReveal の
  // IntersectionObserver が監視できないため、強制的に visible を付与する。
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".blog-list .reveal:not(.visible)");
    els.forEach((el) => el.classList.add("visible"));
  }, [activeTag]);

  const filtered = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts;

  return (
    <>
      <Header />

      <section className="section" id="blog">
        <div className="section-head reveal">
          <span className="sec-num">Blog</span>
          <span className="sec-label">Articles</span>
        </div>

        {/* タグフィルター */}
        {allTags.length > 0 && (
          <div className="blog-filter">
            <button
              className={`blog-filter-btn${activeTag === null ? " active" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter-btn${activeTag === tag ? " active" : ""}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="blog-list">
          {filtered.length === 0 && (
            <div className="blog-empty reveal">
              <span className="blog-empty-comment">// no posts yet</span>
              <span className="blog-empty-cmd">$ git log --oneline blog/</span>
              <span className="blog-empty-comment">// fatal: your branch has no history</span>
            </div>
          )}
          {filtered.map((post) => (
            <MatrixRainCard key={post.slug} className="blog-card reveal">
              <a href={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta">
                  <time className="blog-date">{post.date}</time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-arrow">[ read ]</span>
              </a>
            </MatrixRainCard>
          ))}
        </div>
      </section>

      <BackToTop />

      <Footer />
    </>
  );
}
