import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0; // target (mouse position)
    let rx = 0, ry = 0; // current ring position (lerped)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate(${mx}px,${my}px)`;
    };

    let animId: number;
    const smooth = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      const ring = ringRef.current;
      if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`;
      animId = requestAnimationFrame(smooth);
    };
    animId = requestAnimationFrame(smooth);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
