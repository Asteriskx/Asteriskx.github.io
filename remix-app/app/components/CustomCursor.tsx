import { useEffect, useRef } from "react";

/**
 * カスタムマウスカーソルコンポーネント。
 * 内側の点（`.cursor`）はマウス位置へ即座に追従し、
 * 外側のリング（`.cursor-ring`）は lerp（係数 0.12）で遅延追従することで柔らかい動きを表現する。
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0; // ターゲット座標（マウス位置）
    let rx = 0, ry = 0; // リング現在座標（lerp 補間済み）

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
