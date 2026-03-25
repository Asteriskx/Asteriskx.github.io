import type { LinksFunction, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import globalStyles from "./styles/global.css?url";
import { ClientOnly } from "./components/ClientOnly";
import { BgCanvas } from "./components/BgCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { ClickFireworks } from "./components/ClickFireworks";
import { LoginOverlay } from "./components/LoginOverlay";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/assets/image/logo-v5.png", type: "image/png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700;900&display=swap",
  },
  { rel: "stylesheet", href: globalStyles },
];

export const meta: MetaFunction = () => [
  { title: "ぽーとふぉりおっぽいもの" },
  { name: "description", content: "If it doesn't exist, that's reason enough to build it." },
  /* ── Open Graph ── */
  { property: "og:type",        content: "website" },
  { property: "og:url",         content: "https://asteriskx.net/" },
  { property: "og:title",       content: "ぽーとふぉりおっぽいもの" },
  { property: "og:description", content: "If it doesn't exist, that's reason enough to build it." },
  { property: "og:image",       content: "https://asteriskx.net/assets/image/ogp.png" },
  { property: "og:image:width",  content: "1200" },
  { property: "og:image:height", content: "630" },
  /* ── Twitter Card ── */
  { name: "twitter:card",        content: "summary_large_image" },
  { name: "twitter:title",       content: "ぽーとふぉりおっぽいもの" },
  { name: "twitter:description", content: "If it doesn't exist, that's reason enough to build it." },
  { name: "twitter:image",       content: "https://asteriskx.net/assets/image/ogp.png" },
];

/**
 * アプリケーションルート。全ページ共通の HTML シェルと常駐コンポーネントを提供する。
 * LoginOverlay は "/" かつ未完了・リロード時のみ表示し、完了後は sessionStorage に記録する。
 * BgCanvas / CustomCursor / ClickFireworks はページ遷移をまたいで再マウントしないよう
 * `<Outlet>` の外側に配置している。
 */
export default function App() {
  const { pathname } = useLocation();

  // lazy initializer で初回レンダー時点から判定する。
  // useEffect 内で判定すると「useState(false) → 1フレーム露出 → true」の
  // タイムラグが生まれ、F5 時にメインページが一瞬白発光する原因になる。
  const [showLogin, setShowLogin] = useState(() => {
    if (typeof window === "undefined") return false; // SSG サーバー側スキップ
    if (window.location.pathname !== "/") return false;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    return !sessionStorage.getItem("lo_done") || isReload;
  });

  // ルート遷移で "/" に来た場合（初回ロード以外）の検知用
  useEffect(() => {
    if (pathname !== "/") return;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    if (!sessionStorage.getItem("lo_done") || isReload) setShowLogin(true);
  }, [pathname]);

  // ログインアニメーション中はスクロールをロック
  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showLogin]);

  // useCallback でメモ化し、LoginOverlay の deps (onDone) に渡す参照を安定させる
  const handleLoginDone = useCallback(() => {
    sessionStorage.setItem("lo_done", "1");
    setShowLogin(false);
  }, []);

  return (
    <html lang="ja" style={{ background: "#181c2a" }}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* ブラウザのナビゲーション中のブランク状態をダークに統一 */}
        <meta name="color-scheme" content="dark" />
        {/* CSS ファイルより先に解釈されるため、全ページの白発光を防ぐ critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: "html,body{background:#181c2a}" }} />
        <Meta />
        <Links />
      </head>
      <body style={{ background: "#181c2a" }}>
        {showLogin && <LoginOverlay onDone={handleLoginDone} />}
        {/* BgCanvas 系はページ遷移で再マウントしないよう page-transition の外に置く */}
        <ClientOnly>{() => <BgCanvas />}</ClientOnly>
        <div className="bg-veil" />
        <ClientOnly>{() => <CustomCursor />}</ClientOnly>
        <ClientOnly>{() => <ClickFireworks />}</ClientOnly>
        {/* pathname をキーにすることでページ遷移のたびに fadeIn を発火 */}
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
