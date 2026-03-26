import { LogoSlashReveal } from "./LogoSlashReveal";

const LOGOS = [
  "/assets/image/logo-v2.png",
  "/assets/image/logo-v3.png",
  "/assets/image/logo-v4.png",
  "/assets/image/logo-v5.png",
];

/**
 * ブログ記事内に埋め込むロゴスラッシュ切り替えデモコンポーネント。
 * MDX 内で <LogoSlashDemo /> として使用する。
 * メインページヒーローエリアと同じ LogoSlashReveal を使用。
 */
export function LogoSlashDemo() {
  return (
    <div className="logo-slash-demo">
      <LogoSlashReveal logos={LOGOS} intervalMs={2400} />
    </div>
  );
}
