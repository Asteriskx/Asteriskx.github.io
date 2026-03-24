import { useEffect, useState } from "react";

/**
 * スクロール位置に基づいてアクティブなセクション ID を返すカスタムフック。
 * 各セクションの `offsetTop - 120px` を閾値とし、超えた最後のセクションを active とする。
 * ページ末尾 60px 以内では末尾セクションを強制的に active にする。
 * `sectionIds` は毎回新しい配列リテラルで渡される想定のため、join した文字列を dep にして
 * 不要な effect 再実行を防ぐ。
 * @param sectionIds 監視するセクション要素の id 配列（DOM 順と一致すること）
 * @returns 現在アクティブなセクションの id 文字列（未判定時は空文字列）
 */
export function useNavActive(sectionIds: string[]): string {
  const [active, setActive] = useState("");

  // sectionIds は呼び出し元で毎回新しい配列リテラルが渡されるため、
  // 参照ではなく内容で比較するために join した文字列を dep にする
  const sectionKey = sectionIds.join(",");

  useEffect(() => {
    const ids = sectionKey.split(",");
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    function onScroll() {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 60;
      if (nearBottom && sections.length > 0) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      let current = "";
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  return active;
}
