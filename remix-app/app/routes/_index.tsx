import type { MetaFunction } from "react-router";
import { useEffect, useState } from "react";
import { ClientOnly } from "../components/ClientOnly";
import { BgCanvas } from "../components/BgCanvas";
import { Header } from "../components/Header";
import { HeroTerminal } from "../components/HeroTerminal";
import { CustomCursor } from "../components/CustomCursor";
import { BackToTop } from "../components/BackToTop";
import { ClickFireworks } from "../components/ClickFireworks";
import { LoginOverlay } from "../components/LoginOverlay";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PostFrontmatter } from "../types";

export const meta: MetaFunction = () => [
  { title: "ぽーとふぉりおっぽいもの" },
];

// ─── Works ───────────────────────────────────────────────────────────────────

const WORKS = [
  {
    icon: "/assets/image/logo-v4.png",
    iconClass: "work-icon work-icon--round",
    year: "2018～",
    cat: "Portfolio",
    title: "asteriskx.net",
    desc1: "Three.js パーティクル背景とターミナル風ログイン演出を実装した個人ポートフォリオサイト。",
    desc2: "2026年3月に React Router v7 + SSG 構成で全面刷新。GitHub Pages にホスティング。",
    stack: ["Three.js", "React Router v7", "TypeScript", "GitHub Pages"],
    link: "https://github.com/Asteriskx/Asteriskx.github.io",
    ariaLabel: "asteriskx.net GitHub",
  },
  {
    icon: "/assets/image/mryl.png",
    iconClass: "work-icon",
    year: "2026～",
    cat: "Language Design",
    title: "Mryl",
    desc1: "C / C++ / C# / Rust から影響を受けた自作プログラミング言語。",
    desc2: "セルフホスティングと自作コンパイラ・ネイティブ実行環境構築を目指す個人プロジェクト。",
    stack: ["Python", "C", "GCC", "Cygwin"],
    link: "https://github.com/Mryl-Dev/Mryl",
    ariaLabel: "Mryl GitHub",
  },
  {
    icon: "/assets/image/mryl.png",
    iconClass: "work-icon",
    year: "2026～",
    cat: "VSCode Extension",
    title: "Mryl-Analyzer",
    desc1: "Mryl 言語用 VSCode 拡張機能。",
    desc2: "シンタックスハイライトとコード補完機能（開発中）を提供する。",
    stack: ["Python", "TypeScript", "VSCode API"],
    link: "https://github.com/Mryl-Dev/myrl-analyzer",
    ariaLabel: "Mryl Analyzer GitHub",
  },
  {
    icon: "/assets/image/sagiri-nowplaying.png",
    iconClass: "work-icon work-icon--round",
    year: "2021～",
    cat: "Desktop App",
    title: "Sagiri-NowPlaying",
    desc1: "Spotify / SoundCloud の再生中楽曲を Twitter / Misskey へ投稿できる C# 製アプリ。",
    desc2: "再生情報確認・アートワーク表示機能も搭載。",
    stack: ["C#", ".NET 9", "WPF", "Prism", "ReactiveProperty", "Selenium"],
    link: "https://github.com/Sagiri-Dev/Sagiri",
    ariaLabel: "Sagiri NowPlaying GitHub",
  },
  {
    icon: "/assets/image/legato.png",
    iconClass: "work-icon",
    year: "2017～",
    cat: "Library",
    title: "Legato",
    desc1: "AIMP4 の再生曲を Twitter / Misskey へ投稿できる C# 製ラッパーライブラリ。",
    desc2: "派生アプリの基盤として機能する。",
    stack: ["C#", "WinForms", ".NET Standard"],
    link: "https://github.com/Legato-Dev/Legato",
    ariaLabel: "Legato GitHub",
  },
  {
    icon: "/assets/image/legato.png",
    iconClass: "work-icon",
    year: "2017～",
    cat: "Desktop App",
    title: "Legato-NowPlaying",
    desc1: "AIMP4 の再生曲を Twitter / Misskey へ投稿できる C# 製デスクトップアプリ。",
    desc2: "まりはち、syuilo 氏との共同開発。",
    stack: ["C#", "WinForms", ".NET Standard"],
    link: "https://github.com/Legato-Dev/Legato-NowPlaying",
    ariaLabel: "Legato NowPlaying GitHub",
  },
];

// ─── Blog（最新3件）──────────────────────────────────────────────────────────

const postModules = import.meta.glob<{ frontmatter: PostFrontmatter }>(
  "../content/blog/*.mdx",
  { eager: true }
);

const RECENT_POSTS = Object.entries(postModules)
  .map(([path, mod]) => ({
    slug: path.replace("../content/blog/", "").replace(".mdx", ""),
    ...mod.frontmatter,
  }))
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Index() {
  useScrollReveal();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    if (!sessionStorage.getItem("lo_done") || isReload) setShowLogin(true);
  }, []);

  const handleLoginDone = () => {
    sessionStorage.setItem("lo_done", "1");
    setShowLogin(false);
  };

  return (
    <>
      {showLogin && <LoginOverlay onDone={handleLoginDone} />}

      <ClientOnly>{() => <BgCanvas />}</ClientOnly>
      <div className="bg-veil" />
      <ClientOnly>{() => <CustomCursor />}</ClientOnly>
      <ClientOnly>{() => <ClickFireworks />}</ClientOnly>

      <Header />

      {/* 01. About / Hero */}
      <section className="hero section" id="about">
        <div className="section-head reveal">
          <span className="sec-num">01</span>
          <span className="sec-label">About</span>
        </div>
        <div className="hero-inner">
          <ClientOnly>{() => <HeroTerminal />}</ClientOnly>
        </div>
        <div className="hero-scroll-line" />
      </section>

      {/* 02. Work */}
      <section className="section" id="work">
        <div className="section-head reveal">
          <span className="sec-num">02</span>
          <span className="sec-label">Work</span>
        </div>
        <div className="work-list">
          {WORKS.map((w) => (
            <article key={w.title} className="work-item reveal">
              <img src={w.icon} alt={w.title} className={w.iconClass} />
              <div className="work-meta">
                <span className="work-year">{w.year}</span>
                <span className="work-cat">{w.cat}</span>
              </div>
              <div className="work-body">
                <h3 className="work-title">{w.title}</h3>
                <p className="work-desc">{w.desc1}</p>
                <p className="work-desc">{w.desc2}</p>
                <div className="work-stack">
                  {w.stack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
              </div>
              <a
                href={w.link}
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={w.ariaLabel}
              >
                [ view ]
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 03. Blog */}
      <section className="section" id="blog">
        <div className="section-head reveal">
          <span className="sec-num">03</span>
          <span className="sec-label">Blog</span>
        </div>
        <div className="blog-recent">
          {RECENT_POSTS.length === 0 ? (
            <p className="blog-empty reveal">記事はまだありません。</p>
          ) : (
            RECENT_POSTS.map((post) => (
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
            ))
          )}
          <div className="blog-viewall reveal">
            <a href="/blog" className="blog-viewall-link">
              [ view all articles ]
            </a>
          </div>
        </div>
      </section>

      {/* 04. Contact */}
      <section className="section" id="contact">
        <div className="section-head reveal">
          <span className="sec-num">04</span>
          <span className="sec-label">Contact</span>
        </div>
        <div className="contact-body">
          <p className="contact-lead reveal">連絡はこちらまで。</p>
          <div className="contact-links">
            <a
              href="https://twitter.com/Astrisk_"
              className="contact-link reveal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/image/logo-v5.jpg" alt="Twitter" className="cl-icon cl-icon--img" />
              <span className="cl-name">Twitter (X)</span>
              <span className="cl-handle">@Astrisk_</span>
              <span className="cl-arrow">[ view ]</span>
            </a>
            <a
              href="https://github.com/Asteriskx"
              className="contact-link reveal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/image/github.jpg" alt="GitHub" className="cl-icon cl-icon--img" />
              <span className="cl-name">GitHub</span>
              <span className="cl-handle">@Asteriskx</span>
              <span className="cl-arrow">[ view ]</span>
            </a>
          </div>
        </div>
      </section>

      <BackToTop />

      <footer className="footer">
        <span className="footer-copy">&copy; 2018&ndash;2026 Asteriskx</span>
      </footer>
    </>
  );
}
