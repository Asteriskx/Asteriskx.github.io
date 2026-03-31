/**
 * サイト共通フッターコンポーネント。
 * isHome=true のときはアンカーリンク（#about）、
 * false のときは絶対パス（/#about）を使用する。
 */
export function Footer({ isHome = false }: { isHome?: boolean }) {
  const h = (id: string) => isHome ? `#${id}` : `/#${id}`;
  return (
    <footer className="footer">
      <span className="footer-copy">&copy; 2018&ndash;2026 Asteriskx</span>
      <nav className="footer-nav" aria-label="Footer navigation">
        <a href={h("about")}>about</a>
        <a href={h("work")}>work</a>
        <a href="/blog">blog</a>
        <a href={h("contact")}>contact</a>
      </nav>
    </footer>
  );
}
