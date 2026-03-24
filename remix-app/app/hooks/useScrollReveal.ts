import { useEffect } from "react";

/**
 * `.reveal` クラスを持つ要素がビューポートに入ると `.visible` クラスを付与するフック。
 * IntersectionObserver（閾値 8%、下端 30px マージン）で監視し、
 * 同一親内の兄弟要素には 90ms ずつ遅延をずらす段差アニメーションを実現する。
 * `.section-head` 要素内の `.sec-scan` には追加で `.scan` クラスを付与し
 * スキャンライン演出を発火させる。
 * 一度 `.visible` が付与された要素は監視を解除（一度だけ発火）する。
 */
export function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [
            ...entry.target.parentElement!.querySelectorAll(".reveal"),
          ];
          const idx = siblings.indexOf(entry.target as Element);
          const delay = idx * 90;
          setTimeout(
            () => (entry.target as HTMLElement).classList.add("visible"),
            delay
          );
          // section-head 内の .sec-scan にスキャンライン演出を付与
          // sec-label のフェードイン（150ms delay + 500ms）が始まるタイミングで発火
          if (entry.target.classList.contains("section-head")) {
            const scan = entry.target.querySelector<HTMLElement>(".sec-scan");
            if (scan) {
              setTimeout(() => scan.classList.add("scan"), delay + 150);
            }
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
