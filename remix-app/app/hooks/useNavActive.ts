import { useEffect, useState } from "react";

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
