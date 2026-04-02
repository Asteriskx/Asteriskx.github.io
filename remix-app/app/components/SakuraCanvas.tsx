import { useEffect, useRef } from "react";

/**
 * Three.js 桜花びらアニメーションを描画する全画面固定キャンバスコンポーネント。
 * `three` と `initSakura` を動的ロードし、SSG 環境での window 参照を回避する。
 * root.tsx の BgCanvas とは独立しており、/sakura ページ専用。
 */
export function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [THREE, { initSakura }] = await Promise.all([
        import("three"),
        import("../lib/initSakura"),
      ]);
      if (!canvasRef.current) return;

      cleanup = initSakura(canvasRef.current, THREE, (id) => {
        rafId = id;
      });
    })();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset:    0,
        width:    "100%",
        height:   "100%",
        display:  "block",
      }}
    />
  );
}
