import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about",   label: "about"   },
  { id: "work",    label: "work"    },
  { id: "blog",    label: "blog"    },
  { id: "contact", label: "contact" },
];

/**
 * 右端に固定表示されるセクションスクロールインジケーター。
 * 各セクション要素の `offsetTop - 140px` を閾値にスクロール位置を判定し、
 * アクティブなセクションのドットをハイライトする。
 * ページ末尾 60px 以内では末尾セクションを強制的にアクティブにする。
 * モバイルではラベルを非表示にしドットのみのコンパクト表示に切り替わる（CSS 制御）。
 */
export function ScrollIndicator() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 60;
      if (nearBottom) {
        setActive(SECTIONS[SECTIONS.length - 1].id);
        return;
      }
      let current = "about";
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="scroll-indicator" aria-label="セクションナビゲーション">
      <div className="si-track" />
      <div className="si-items">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`si-item${active === id ? " active" : ""}`}
            aria-label={label}
          >
            <span className="si-label">{label}</span>
            <span className="si-dot" />
          </a>
        ))}
      </div>
    </nav>
  );
}
