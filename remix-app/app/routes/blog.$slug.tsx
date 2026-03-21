import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/blog.$slug";
import { ClientOnly } from "../components/ClientOnly";
import { BgCanvas } from "../components/BgCanvas";
import { Header } from "../components/Header";
import { CustomCursor } from "../components/CustomCursor";
import { BackToTop } from "../components/BackToTop";
import type { PostFrontmatter } from "../types";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const modules = import.meta.glob<{
    default: React.ComponentType;
    frontmatter: PostFrontmatter;
  }>("../content/blog/*.mdx");

  const key = `../content/blog/${params.slug}.mdx`;
  const loader = modules[key];
  if (!loader) throw new Response("Not Found", { status: 404 });

  const mod = await loader();
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

export default function BlogPost() {
  const { Component, frontmatter } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <ClientOnly>{() => <BgCanvas />}</ClientOnly>
      <div className="bg-veil" />
      <ClientOnly>{() => <CustomCursor />}</ClientOnly>

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
      </footer>
    </>
  );
}
