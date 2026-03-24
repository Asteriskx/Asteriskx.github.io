import { useEffect, useState } from "react";

/**
 * スクロール量が 400px を超えた時点で表示されるトップへ戻るボタン。
 * クリックするとページ先頭へスムーズスクロールする。
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top${visible ? " visible" : ""}`}
      aria-label="トップに戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      [ ↑ top ]
    </button>
  );
}
