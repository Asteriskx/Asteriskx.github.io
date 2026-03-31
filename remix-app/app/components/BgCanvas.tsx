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
  // state：overlay content の条件レンダリング用。
  // ref ：useEffect の deps に含めず pathname 変化時に読むための同期フラグ。
  const [initialized, setInitialized] = useState(false);
  const initializedRef = useRef(false);

  // overlay の opacity は React style prop で管理しない。
  // 理由：initialized=true 後は overlayOpacity が常に 0 で固定されるため、
  //       click handler が DOM を opacity:1 にしても React は「差分なし」と判断し
  //       DOM を修正しないバグが発生する（React の style diff 最適化との競合）。
  // → opacity はすべて直接 DOM 操作で管理する。

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

  // Three.js 初期化完了 → overlay フェードアウト（1.5s）。
  // transition は Three.js init 内で DOM に直接セット済みのため、ここでは opacity だけ変える。
  useEffect(() => {
    if (!initialized) return;
    const overlay = overlayRef.current;
    if (overlay) overlay.style.opacity = "0";
  }, [initialized]);

  // ページ遷移のたびに overlay をリセット。
  // click handler や pagehide が opacity:1 にした後、React の style diff では
  // 差分が検出されないため useEffect で直接 DOM をリセットする必要がある。
  //
  // blog 記事ページ: Three.js 初期化前でも即座に透明化する。
  //   理由: handleClick が opacity:1 にした後、Three.js がまだ未初期化（initializedRef=false）の
  //         場合に early return すると overlay が暗幕のまま固まるバグが発生する。
  //         blog-hydrate が独自のローディング UI を提供するため、overlay は不要。
  // 非ブログページ: Three.js 初期化済みの場合のみリセット（初期ローディング演出を維持）。
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (/^\/blog\/.+/.test(pathname)) {
      // blog 記事: Three.js 初期化状態に関わらず即座に透明化
      overlay.style.transition = "none";
      overlay.style.opacity    = "0";
      return;
    }
    if (!initializedRef.current) return;
    overlay.style.transition = "none";
    overlay.style.opacity    = "0";
  }, [pathname]);

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

      // transition を先に DOM へセットしてからフラグを立てる（フェードアウト演出）。
      // setInitialized(true) のあと useEffect([initialized]) が opacity:0 を適用する。
      const overlay = overlayRef.current;
      if (overlay) overlay.style.transition = "opacity 1.5s ease";
      initializedRef.current = true;
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
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          // opacity はここで管理しない（上記コメント参照）
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
