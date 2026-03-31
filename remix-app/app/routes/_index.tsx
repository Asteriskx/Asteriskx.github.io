import type { MetaFunction } from "react-router";
import { ClientOnly } from "../components/ClientOnly";
import { Header } from "../components/Header";
import { HeroTerminal } from "../components/HeroTerminal";
import { BackToTop } from "../components/BackToTop";
import { Footer } from "../components/Footer";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { MatrixRainCard } from "../components/MatrixRainCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PostFrontmatter } from "../types";

export const meta: MetaFunction = () => [
  { title: "ぽーとふぉりおっぽいもの" },
];

// ─── Stack tag category → CSS class マッピング ───────────────────────────────

/** ヒーロータグの色と対応させる（sys=cyan / app=green / web=purple / gfx=amber / infra=coral） */
const TAG_CAT: Record<string, string> = {
  // Systems
  "C": "sys", "C++": "sys", "C#": "sys", "Rust": "sys", "Assembly": "sys",
  // App / Script
  "Python": "app", "Java": "app", "Ruby": "app",
  // Web / Script
  "TypeScript": "web", "JavaScript": "web", "React Router v7": "web",
  "HTML": "web", "Node.js": "web", "VBA": "web",
  // Graphics
  "Three.js": "gfx", "p5.js": "gfx", "Processing": "gfx",
  // Infra / Tools
  "GitHub Pages": "infra", "GCC": "infra", "Cygwin": "infra",
  "VSCode API": "infra", "Selenium": "infra", "Linux": "infra",
  // Desktop (.NET ecosystem) → web と同じ purple
  "WPF": "web", "WinForms": "web", ".NET 9": "web",
  ".NET Standard": "web", "Prism": "web", "ReactiveProperty": "web",
};

// ─── Works ───────────────────────────────────────────────────────────────────

/** Work セクションの1カード分のデータ */
interface Work {
  /** カードに表示するアイコン画像 URL */
  icon: string;
  /** アイコン img 要素の CSS クラス名 */
  iconClass: string;
  /** 制作・活動開始年（例: "2021～"） */
  year: string;
  /** プロジェクトカテゴリ（例: "Desktop App"） */
  cat: string;
  /** プロジェクト名 */
  title: string;
  /** 説明文1行目 */
  desc1: string;
  /** 説明文2行目 */
  desc2: string;
  /** 使用技術・スタックのタグ配列 */
  stack: string[];
  /** GitHub 等へのリンク URL */
  link: string;
  /** リンクアンカーの aria-label */
  ariaLabel: string;
  /** true の場合 "featured" バッジを表示しカードを強調する */
  featured: boolean;
}

const WORKS: Work[] = [
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
    featured: true,
  },
  {
    icon: "/assets/image/mryl.png",
    iconClass: "work-icon",
    year: "2026～",
    cat: "Language Design",
    title: "Mryl",
    desc1: "C / C++ / C# / Rust から影響を受けた自作プログラミング言語（ミリルと読みます）。",
    desc2: "セルフホスティングと自作コンパイラ・ネイティブ実行環境構築を目指す個人プロジェクト。",
    stack: ["Python", "C", "GCC", "Cygwin"],
    link: "https://github.com/Mryl-Dev/Mryl",
    ariaLabel: "Mryl GitHub",
    featured: true,
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
    featured: false,
  },
  {
    icon: "/assets/image/sagiri-nowplaying.png",
    iconClass: "work-icon work-icon--round",
    year: "2021～",
    cat: "Desktop App",
    title: "Sagiri-NowPlaying",
    desc1: "Spotify / SoundCloud（開発中）/ MusicBee（開発中）の再生中楽曲を",
    desc2: "Twitter（開発中）/ Misskey へ投稿できる C# 製アプリ。再生情報確認・アートワーク表示機能も搭載。",
    stack: ["C#", ".NET 9", "WPF", "Prism", "ReactiveProperty", "Selenium"],
    link: "https://github.com/Sagiri-Dev/Sagiri",
    ariaLabel: "Sagiri NowPlaying GitHub",
    featured: true,
  },
  {
    icon: "/assets/image/legato.png",
    iconClass: "work-icon",
    year: "2017～",
    cat: "Library",
    title: "Legato",
    desc1: "AIMP 4 / 5 の再生曲を Twitter / Misskey へ投稿できる C# 製ラッパーライブラリ。",
    desc2: "プロジェクト立ち上げ後、まりはち氏（@mr8Alice）が合流。派生アプリの基盤として機能する。",
    stack: ["C#", "WinForms", ".NET Standard"],
    link: "https://github.com/Legato-Dev/Legato",
    ariaLabel: "Legato GitHub",
    featured: false,
  },
  {
    icon: "/assets/image/legato.png",
    iconClass: "work-icon",
    year: "2017～",
    cat: "Desktop App",
    title: "Legato-NowPlaying",
    desc1: "AIMP 4 / 5 の再生曲を Twitter / Misskey へ投稿できる C# 製デスクトップアプリ。",
    desc2: "まりはち氏（@mr8Alice）、syuilo 氏（@syuilo）との共同開発。",
    stack: ["C#", "WinForms", ".NET Standard"],
    link: "https://github.com/Legato-Dev/Legato-NowPlaying",
    ariaLabel: "Legato NowPlaying GitHub",
    featured: false,
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
  .sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.slug.localeCompare(a.slug);
  })
  .slice(0, 3);

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * ホームページのルートコンポーネント。
 * 01. About（ターミナル）/ 02. Work（カード一覧）/ 03. Blog（最新3件）/ 04. Contact
 * の4セクションで構成される。
 */
export default function Index() {
  useScrollReveal();

  return (
    <>
      <Header />

      <ClientOnly>{() => <ScrollIndicator />}</ClientOnly>

      {/* 01. About / Hero */}
      <section className="hero section" id="about">
        <div className="section-head reveal">
          <span className="sec-num">01</span>
          <span className="sec-label"><span className="sec-scan" data-text="About">About</span></span>
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
          <span className="sec-label"><span className="sec-scan" data-text="Work">Work</span></span>
        </div>
        <div className="work-list">
          {WORKS.map((w) => (
            <article
              key={w.title}
              className={`work-item reveal${w.featured ? " work-item--featured" : ""}`}
            >
              {/* hover 時にレーザーが枠に沿って走る SVG ボーダー */}
              <svg className="work-laser" aria-hidden="true">
                <rect width="100%" height="100%" rx="5" ry="5" />
              </svg>
              <img src={w.icon} alt={w.title} className={w.iconClass} />
              <div className="work-meta">
                <span className="work-year">{w.year}</span>
                <span className="work-cat">{w.cat}</span>
              </div>
              <div className="work-body">
                <h3 className="work-title">
                  {w.title}
                  {w.featured && <span className="work-featured-badge">featured</span>}
                </h3>
                <p className="work-desc">{w.desc1}</p>
                <p className="work-desc">{w.desc2}</p>
                <div className="work-stack">
                  {w.stack.map((s) => (
                    <span key={s} className={`stack-tag stack-tag--${TAG_CAT[s] ?? "sys"}`}>{s}</span>
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
          <span className="sec-label"><span className="sec-scan" data-text="Blog">Blog</span></span>
        </div>
        <div className="blog-recent">
          {RECENT_POSTS.length === 0 ? (
            <div className="blog-empty reveal">
              <span className="blog-empty-comment">// no posts yet</span>
              <span className="blog-empty-cmd">$ git log --oneline blog/</span>
              <span className="blog-empty-comment">// fatal: your branch has no history</span>
            </div>
          ) : (
            RECENT_POSTS.map((post) => (
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
          <span className="sec-label"><span className="sec-scan" data-text="Contact">Contact</span></span>
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

      <Footer isHome />
    </>
  );
}
