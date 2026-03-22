import { useEffect, useRef, useState } from "react";

const N          = 8;
const SKEW       = 8;
const OVERLAP    = 0.5; // サブピクセルの隙間を防ぐためストリップを微小に重ねる
const STRIP_MS   = 450;
const STAGGER_MS = 110;
const TOTAL_MS   = STAGGER_MS * (N - 1) + STRIP_MS + 150;
const FADEOUT_MS = 150; // ストリップのフェードアウト時間

function getStripClipPath(i: number): string {
  const w  = 100 / N;
  const x1 = w * i;
  const x2 = w * (i + 1);
  return `polygon(${x1 - SKEW - OVERLAP}% 0%, ${x2 - SKEW + OVERLAP}% 0%, ${x2 + SKEW + OVERLAP}% 100%, ${x1 + SKEW - OVERLAP}% 100%)`;
}

interface Props {
  logos: string[];
  intervalMs: number;
}

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
