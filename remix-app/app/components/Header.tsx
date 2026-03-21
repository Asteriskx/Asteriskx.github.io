import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavActive } from "../hooks/useNavActive";

const TITLE = "ぽーとふぉりおっぽいもの";

// ブログ記事数（バッジ表示用）
const postCount = Object.keys(
  import.meta.glob("../content/blog/*.mdx")
).length;

// 最新記事日付（更新情報バッジ用）
const postModules = import.meta.glob<{ frontmatter: { date: string } }>(
  "../content/blog/*.mdx",
  { eager: true }
);
const latestDate = Object.values(postModules)
  .map((m) => m.frontmatter?.date ?? "")
  .sort((a, b) => b.localeCompare(a))[0] ?? null;

export function Header() {
  const [titleText, setTitleText] = useState("");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const active   = useNavActive(["about", "work", "blog", "contact"]);
  const location = useLocation();
  const isHome   = location.pathname === "/";
  const isBlog   = location.pathname.startsWith("/blog");

  const sectionHref = (id: string) => isHome ? `#${id}` : `/#${id}`;

  // Header typewriter
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTitleText(TITLE.slice(0, i + 1));
        i++;
        if (i >= TITLE.length) clearInterval(interval);
      }, 90);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll shrink
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
          <span className="header-cursor">_</span>
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

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <nav>
          <a href={sectionHref("about")} className="mobile-link" onClick={closeMenu}>About</a>
          <a href={sectionHref("work")}  className="mobile-link" onClick={closeMenu}>Work</a>
          <a href={sectionHref("blog")} className="mobile-link" onClick={closeMenu}>
            Blog
            {postCount > 0 && <span className="nav-blog-badge">{postCount}</span>}
          </a>
          <a href={sectionHref("contact")} className="mobile-link" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
}
