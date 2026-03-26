import { useState } from "react";
import { HeroTerminal } from "./HeroTerminal";

/**
 * ブログ記事内に埋め込むヒーローターミナルデモコンポーネント。
 * MDX 内で <HeroTerminalDemo /> として使用する。
 *
 * HeroTerminal はタイピングアニメーションが1回きりのため、
 * key をインクリメントして強制再マウントすることでリプレイを実現する。
 */
export function HeroTerminalDemo() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="hero-terminal-demo">
      <HeroTerminal key={replayKey} />
      <button
        className="hero-terminal-demo-replay"
        onClick={() => setReplayKey(k => k + 1)}
        aria-label="再生"
      >
        [ replay ]
      </button>
    </div>
  );
}
