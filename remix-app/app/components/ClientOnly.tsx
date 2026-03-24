import { useEffect, useState } from "react";

/** {@link ClientOnly} に渡す Props */
interface ClientOnlyProps {
  /** クライアントのみでレンダーするコンテンツ（関数形式で遅延評価） */
  children: () => React.ReactNode;
  /** SSR / ハイドレーション前に表示するフォールバック（省略時は何も表示しない） */
  fallback?: React.ReactNode;
}

/**
 * SSR・ハイドレーション完了前は children を描画しないコンポーネント。
 * Three.js など window / document に依存する処理を SSG 環境で安全に扱うために使用する。
 * `mounted` が true になるのはクライアントでの初回 useEffect 実行後（= ハイドレーション完了後）。
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children()}</> : <>{fallback}</>;
}
