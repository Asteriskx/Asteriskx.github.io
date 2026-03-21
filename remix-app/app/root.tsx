import type { LinksFunction, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import globalStyles from "./styles/global.css?url";

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
  { name: "description", content: "Asteriskx — Embedded Engineer Portfolio" },
];

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
