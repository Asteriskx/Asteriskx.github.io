interface TocItem {
  label: string;
  href: string;
}

interface BlogTocProps {
  items: TocItem[];
}

export function BlogToc({ items }: BlogTocProps) {
  return (
    <nav className="blog-toc" aria-label="目次">
      <span className="blog-toc-header">// table of contents</span>
      <ol className="blog-toc-list">
        {items.map((item, i) => (
          <li key={item.href} className="blog-toc-item">
            <span className="blog-toc-num">{String(i + 1).padStart(2, "0")}.</span>
            <a href={item.href} className="blog-toc-link">{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
