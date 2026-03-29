import { useEffect, useRef } from "react";

/**
 * Three.js パーティクル背景アニメーションを描画する全画面固定キャンバスコンポーネント。
 * `three` と `/icon_b64.json`（アイコン画像の Base64 データ）を動的にロードし、
 * {@link initBg} でアニメーションループを開始する。
 * root.tsx 内で `ClientOnly` に包んで配置しており、ページ遷移でも再マウントしない。
 *
 * 以前は `<script>` タグでグローバル変数にアイコンデータを書き込んでいたが、
 * 1MB 超の JS をメインスレッドでパースする負荷が大きいため fetch + JSON に変更した。
 */
export function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      // Three.js とアイコンデータを並列で読み込む
      const [THREE, iconDataUrls] = await Promise.all([
        import("three"),
        fetch("/icon_b64.json").then((r) => r.json() as Promise<string[]>),
      ]);

      if (!canvasRef.current) return;

      const { initBg } = await import("../lib/initBg");
      cleanup = initBg(canvasRef.current, THREE, iconDataUrls, (id: number) => {
        animationId = id;
      });
    })();

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      cleanup?.();
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}
