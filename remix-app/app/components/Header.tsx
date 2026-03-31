import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavActive } from "../hooks/useNavActive";

const TITLE = "ぽーとふぉりおっぽいもの";

/** 最新記事日付（更新情報バッジ用）・記事数（バッジ表示用） */
const postModules = import.meta.glob<{ frontmatter: { date: string } }>(
  "../content/blog/*.mdx",
  { eager: true }
);
const postCount  = Object.keys(postModules).length;
const latestDate = Object.values(postModules)
  .map((m) => m.frontmatter?.date ?? "")
  .sort((a, b) => b.localeCompare(a))[0] ?? null;

/**
 * サイトヘッダーコンポーネント。
 * - タイプライター演出でタイトルを表示（マウント後 200ms 遅延で開始、1文字 90ms）
 * - スクロール 40px 超で `.scrolled` クラスを付与しヘッダーを縮小
 * - ホームページ（`/`）はアンカーリンク、その他ページは `/#section` 形式のリンクを生成
 * - ブログページでは Blog ナビ項目を常時アクティブ表示
 * - モバイルではハンバーガーメニューに切り替わる
 */
export function Header() {
  const [titleText, setTitleText] = useState("");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const active   = useNavActive(["about", "work", "blog", "contact"]);
  const location = useLocation();
  const isHome   = location.pathname === "/";
  const isBlog   = location.pathname.startsWith("/blog");

  const sectionHref = (id: string) => isHome ? `#${id}` : `/#${id}`;

  // ─── タイプライター ───────────────────────────────────────────────────────────
  // setTimeout 内の setInterval は useEffect の cleanup に届かないため、
  // interval を外側の変数で持ち、両方を cleanup で確実にクリアする
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setTitleText(TITLE.slice(0, i + 1));
        i++;
        if (i >= TITLE.length) clearInterval(interval!);
      }, 90);
    }, 200);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  // ─── スクロール縮小 ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
        <a href={isHome ? "#about" : "/"} className="header-name">
          <span className="header-prompt">›</span>
          <span>{titleText}</span>
          <span className="header-cursor" />
        </a>

        <nav className="header-nav">
          <a href={sectionHref("about")} className={active === "about" ? "active" : ""}>
            <span className="nav-num">01.</span>About
          </a>
          <a href={sectionHref("work")} className={active === "work" ? "active" : ""}>
            <span className="nav-num">02.</span>Work
          </a>
          <a href={sectionHref("blog")} className={active === "blog" || isBlog ? "active" : ""}>
            <span className="nav-num">03.</span>Blog
            {postCount > 0 && (
              <span className="nav-blog-badge">{postCount}</span>
            )}
            {latestDate && (
              <span className="nav-blog-date">{latestDate}</span>
            )}
          </a>
          <a href={sectionHref("contact")} className={active === "contact" ? "active" : ""}>
            <span className="nav-num">04.</span>Contact
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-label="メニュー"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* オーバーレイ（パネル外タップで閉じる） */}
      {menuOpen && <div className="mobile-menu-veil" onClick={closeMenu} />}

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <nav>
          <a href={sectionHref("about")} className="mobile-link" onClick={closeMenu}>
            <span className="nav-num">01.</span>About
          </a>
          <a href={sectionHref("work")}  className="mobile-link" onClick={closeMenu}>
            <span className="nav-num">02.</span>Work
          </a>
          <a href={sectionHref("blog")} className="mobile-link" onClick={closeMenu}>
            <span className="nav-num">03.</span>Blog
            {postCount > 0 && <span className="nav-blog-badge">{postCount}</span>}
          </a>
          <a href={sectionHref("contact")} className="mobile-link" onClick={closeMenu}>
            <span className="nav-num">04.</span>Contact
          </a>
        </nav>
      </div>
    </>
  );
}
