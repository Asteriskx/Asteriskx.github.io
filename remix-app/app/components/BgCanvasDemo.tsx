import { useEffect, useRef } from "react";

/**
 * ブログ記事内に埋め込む Three.js パーティクルデモコンポーネント。
 * MDX 内で <BgCanvasDemo height={420} /> として使用する。
 *
 * BgCanvas（全画面背景）との違い:
 *   - コンテナ要素のサイズに追従（window サイズではない）
 *   - initBgDemo を使用（軽量化・中央配置）
 *   - SSG では描画しない（useEffect 内で動的 import）
 */
export function BgCanvasDemo({ height = 420 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      const { initBgDemo } = await import("../lib/initBgDemo");

      if (!containerRef.current || !canvasRef.current) return;

      cleanup = initBgDemo(
        canvasRef.current,
        containerRef.current,
        THREE,
        (id: number) => { animationId = id; }
      );
    })();

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-demo-container"
      style={{ height }}
    >
      <canvas ref={canvasRef} className="bg-demo-canvas" />
    </div>
  );
}
