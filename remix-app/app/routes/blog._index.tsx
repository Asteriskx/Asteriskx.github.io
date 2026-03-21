import type { MetaFunction } from "react-router";
import { ClientOnly } from "../components/ClientOnly";
import { BgCanvas } from "../components/BgCanvas";
import { Header } from "../components/Header";
import { CustomCursor } from "../components/CustomCursor";
import { BackToTop } from "../components/BackToTop";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PostFrontmatter } from "../types";

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
  .sort((a, b) => b.date.localeCompare(a.date));

export const meta: MetaFunction = () => [{ title: "Blog — Asteriskx" }];

export default function BlogIndex() {
  useScrollReveal();

  return (
    <>
      <ClientOnly>{() => <BgCanvas />}</ClientOnly>
      <div className="bg-veil" />
      <ClientOnly>{() => <CustomCursor />}</ClientOnly>

      <Header />

      <section className="section" id="blog">
        <div className="section-head reveal">
          <span className="sec-num">Blog</span>
          <span className="sec-label">Articles</span>
        </div>

        <div className="blog-list">
          {posts.length === 0 && (
            <p className="blog-empty reveal">記事はまだありません。</p>
          )}
          {posts.map((post) => (
            <article key={post.slug} className="blog-card reveal">
              <a href={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta">
                  <time className="blog-date">{post.date}</time>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-arrow">[ read ]</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <BackToTop />

      <footer className="footer">
        <span className="footer-copy">&copy; 2018&ndash;2026 Asteriskx</span>
      </footer>
    </>
  );
}
