import { useEffect, useRef, useState } from "react";
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
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const overlayRef         = useRef<HTMLDivElement>(null);
  const overlayContentRef  = useRef<HTMLDivElement>(null);

  // Three.js 初期化完了フラグ。
  // state で持つことで「初期化後に別ページへ戻っても overlay が opacity:1 に戻らない」を保証する。
  const [initialized, setInitialized] = useState(false);

  // overlay の表示条件：未初期化 かつ blog 記事ページでない場合のみ表示
  const overlayOpacity = initialized || isBlogPost ? 0 : 1;

  useEffect(() => {
    // /blog/:slug リンクがクリックされた瞬間に overlay を即時暗幕化する。
    // React の re-render を待つと1フレーム遅れて ＊ が透けるため、DOM を直接操作して同期的に対応する。
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!/^\/blog\/.+/.test(href)) return;
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transition = "none";
        overlay.style.opacity    = "1";
      }
      // ＊ スピナーも即座に非表示にして暗幕だけを見せる
      const content = overlayContentRef.current;
      if (content) content.style.visibility = "hidden";
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

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

      // transition を先に DOM へセットしてからフラグを立てる（フェードアウト演出）
      const overlay = overlayRef.current;
      if (overlay) overlay.style.transition = "opacity 1.5s ease";
      setInitialized(true);
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
      <div
        ref={overlayRef}
        style={{
          position:      "fixed",
          inset:         0,
          background:    "#181c2a",
          zIndex:        9999,
          pointerEvents: "none",
          opacity:       overlayOpacity,
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
        }}
      >
        {!isBlogPost && (
          <div
            ref={overlayContentRef}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <span className="overlay-asterisk">＊</span>
            <span className="overlay-loading">loading</span>
          </div>
        )}
      </div>
    </>
  );
}
