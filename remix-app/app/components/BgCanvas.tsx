import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/**
 * Three.js パーティクル背景アニメーションを描画する全画面固定キャンバスコンポーネント。
 * `three` と `/icon_b64.json`（アイコン画像の Base64 データ）を動的にロードし、
 * {@link initBg} でアニメーションループを開始する。
 * root.tsx 内で `ClientOnly` に包んで配置しており、ページ遷移でも再マウントしない。
 */
export function BgCanvas() {
  const { pathname } = useLocation();
  const isBlogPost = /^\/blog\/.+/.test(pathname);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number | null = null;
    let cleanup: (() => void) | null = null;

    // ページ離脱直前に overlay を即時表示して白フラッシュを防ぐ
    const showOverlay = () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      overlay.style.transition = "none";
      overlay.style.opacity    = "1";
      const cv = canvasRef.current;
      if (cv) cv.style.filter = "brightness(0)";
    };
    window.addEventListener("pagehide",     showOverlay);
    window.addEventListener("beforeunload", showOverlay);

    (async () => {
      const [THREE, iconDataUrls] = await Promise.all([
        import("three"),
        fetch("/icon_b64.json").then((r) => r.json() as Promise<string[]>),
      ]);
      if (!canvasRef.current) return;

      const { initBg } = await import("../lib/initBg");
      cleanup = initBg(canvasRef.current, THREE, iconDataUrls, (id: number) => {
        animationId = id;
      });

      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transition = "opacity 1.5s ease";
        overlay.style.opacity    = "0";
      }
    })();

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      window.removeEventListener("pagehide",     showOverlay);
      window.removeEventListener("beforeunload", showOverlay);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef} />
      {/* opacity は useEffect で直接 DOM 操作するため style prop には初期値のみ設定 */}
      <div
        ref={overlayRef}
        style={{
          position:      "fixed",
          inset:         0,
          background:    "#181c2a",
          zIndex:        9999,
          pointerEvents: "none",
          opacity:       isBlogPost ? 0 : 1,
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
        }}
      >
        {!isBlogPost && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="overlay-asterisk">＊</span>
            <span className="overlay-loading">loading</span>
          </div>
        )}
      </div>
    </>
  );
}
