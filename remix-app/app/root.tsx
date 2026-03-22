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

const SITE_URL = "https://asteriskx.net";
const OGP_IMAGE = `${SITE_URL}/assets/image/logo-v2.png`;

export const meta: MetaFunction = () => [
  { title: "ぽーとふぉりおっぽいもの" },
  { name: "description",              content: "If it doesn't exist, that's reason enough to build it." },
  { property: "og:type",              content: "website" },
  { property: "og:url",               content: SITE_URL },
  { property: "og:title",             content: "ぽーとふぉりおっぽいもの" },
  { property: "og:description",       content: "If it doesn't exist, that's reason enough to build it." },
  { property: "og:image",             content: OGP_IMAGE },
  { name: "twitter:card",             content: "summary" },
  { name: "twitter:site",             content: "@Astrisk_" },
  { name: "twitter:title",            content: "ぽーとふぉりおっぽいもの" },
  { name: "twitter:description",      content: "If it doesn't exist, that's reason enough to build it." },
  { name: "twitter:image",            content: OGP_IMAGE },
];

export default function App() {
  const { pathname } = useLocation();

  const [showLogin, setShowLogin] = useState(false);

  // LoginOverlay は "/" のみ表示。page-transition の外に置くことで
  // fadeIn アニメーションに引きずられず即時表示できる。
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
