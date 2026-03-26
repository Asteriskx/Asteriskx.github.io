import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { BackToTop } from "../components/BackToTop";
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

export const meta: MetaFunction = () => [{ title: "Blog — Asteriskx" }];

/**
 * ブログ記事一覧ページ（/blog）。
 * MDX ファイルを一括インポートし、日付降順で全記事をカード表示する。
 */
export default function BlogIndex() {
  useScrollReveal();

  return (
    <>
      <Header />

      <section className="section" id="blog">
        <div className="section-head reveal">
          <span className="sec-num">Blog</span>
          <span className="sec-label">Articles</span>
        </div>

        <div className="blog-list">
          {posts.length === 0 && (
            <div className="blog-empty reveal">
              <span className="blog-empty-comment">// no posts yet</span>
              <span className="blog-empty-cmd">$ git log --oneline blog/</span>
              <span className="blog-empty-comment">// fatal: your branch has no history</span>
            </div>
          )}
          {posts.map((post) => (
            <MatrixRainCard key={post.slug} className="blog-card reveal">
              <a href={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta">
                  <time className="blog-date">{post.date}</time>
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
