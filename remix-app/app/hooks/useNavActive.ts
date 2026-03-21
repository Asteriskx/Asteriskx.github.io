import { useEffect, useState } from "react";

export function useNavActive(sectionIds: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = sectionIds
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
  }, [sectionIds]);

  return active;
}
