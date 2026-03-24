import { useEffect, useRef, useState } from "react";

/** ストリップの分割数 */
const N          = 8;
/** ストリップの傾き角（%単位）。大きいほど斜めが急になる */
const SKEW       = 8;
/** サブピクセルの隙間を防ぐためストリップを微小に重ねる */
const OVERLAP    = 0.5;
/** 1枚のストリップがスライドインする時間（ミリ秒） */
const STRIP_MS   = 450;
/** 隣接ストリップ間の開始遅延（ミリ秒） */
const STAGGER_MS = 110;
/** 全ストリップのスライドイン完了までの合計時間（ミリ秒） */
const TOTAL_MS   = STAGGER_MS * (N - 1) + STRIP_MS + 150;
/** ストリップのフェードアウト時間（ミリ秒） */
const FADEOUT_MS = 150;

/**
 * i 番目のストリップの clip-path polygon 値を算出する。
 * 全体を N 等分した帯を SKEW 分だけ傾けることでスラッシュ（斜め切り替え）演出を実現する。
 * OVERLAP で隣接ストリップを微小に重ねてサブピクセルの隙間を防ぐ。
 * @param i ストリップのインデックス（0 〜 N-1）
 * @returns CSS `clip-path` に使用できる polygon 文字列
 */
function getStripClipPath(i: number): string {
  const w  = 100 / N;
  const x1 = w * i;
  const x2 = w * (i + 1);
  return `polygon(${x1 - SKEW - OVERLAP}% 0%, ${x2 - SKEW + OVERLAP}% 0%, ${x2 + SKEW + OVERLAP}% 100%, ${x1 + SKEW - OVERLAP}% 100%)`;
}

/** {@link LogoSlashReveal} に渡す Props */
interface Props {
  /** 交互表示するロゴ画像 URL の配列（2枚以上を想定） */
  logos: string[];
  /** ロゴを切り替えるインターバル（ミリ秒） */
  intervalMs: number;
}

/**
 * ロゴ画像を斜めストリップのスライドイン演出で交互に切り替えるコンポーネント。
 * N 枚のストリップをスタガーしながら次のロゴを覆い被せ、フェードアウトで切り替えを完了する。
 * currentIdx は ref でも管理し、setInterval の deps から外すことで
 * タイマーが不意にリセットされる副作用を防いでいる。
 */
export function LogoSlashReveal({ logos, intervalMs }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx]       = useState<number | null>(null);
  const [leaving, setLeaving]       = useState(false);

  // currentIdx を ref でも管理することで、effect の deps から外せる。
  // deps に currentIdx があると t1 発火 → currentIdx 更新 → cleanup で t2/t3 もキャンセルされてしまうため。
  const currentIdxRef = useRef(currentIdx);
  currentIdxRef.current = currentIdx;

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIdxRef.current + 1) % logos.length;
      setNextIdx(next);
      setLeaving(false);

      setTimeout(() => setCurrentIdx(next), TOTAL_MS);
      setTimeout(() => setLeaving(true), TOTAL_MS + 50);
      setTimeout(() => setNextIdx(null), TOTAL_MS + 50 + FADEOUT_MS);
    }, intervalMs);

    return () => clearInterval(timer);
  // currentIdx を deps から除外し、ref 経由で常に最新値を参照する
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logos.length, intervalMs]);

  return (
    <div className="slash-logo-wrap">
      <img src={logos[currentIdx]} alt="logo" className="slash-logo-base" />

      {nextIdx !== null && (
        <div
          className={`slash-strips-wrapper${leaving ? " leaving" : ""}`}
          style={{ "--fadeout-ms": `${FADEOUT_MS}ms` } as React.CSSProperties}
        >
          {Array.from({ length: N }, (_, i) => (
            <div
              key={i}
              style={{ position: "absolute", inset: 0, clipPath: getStripClipPath(i) }}
            >
              <div
                className="slash-strip-inner"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${logos[nextIdx]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animationDelay: `${i * STAGGER_MS}ms`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
