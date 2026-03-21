import { useEffect } from "react";

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
          setTimeout(
            () => (entry.target as HTMLElement).classList.add("visible"),
            idx * 90
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
