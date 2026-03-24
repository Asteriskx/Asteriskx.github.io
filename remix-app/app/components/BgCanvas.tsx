import { useEffect, useRef } from "react";

/**
 * 外部スクリプトを動的に挿入するユーティリティ関数。
 * 同一 `src` が既に挿入済みの場合は重複挿入せず即 resolve する。
 * @param src 挿入する script 要素の src 属性値
 * @returns スクリプトのロード完了を待つ Promise
 */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

/**
 * Three.js パーティクル背景アニメーションを描画する全画面固定キャンバスコンポーネント。
 * `three` と `/icon_b64.js`（アイコン画像の Base64 データ）を動的インポートし、
 * {@link initBg} でアニメーションループを開始する。
 * root.tsx 内で `ClientOnly` に包んで配置しており、ページ遷移でも再マウントしない。
 */
export function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      await loadScript("/icon_b64.js");
      const iconDataUrls: string[] =
        (window as unknown as { ICON_DATA_URLS?: string[] }).ICON_DATA_URLS ?? [];

      if (!canvasRef.current) return;

      // 背景初期化関数（initBg）を動的インポート
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
