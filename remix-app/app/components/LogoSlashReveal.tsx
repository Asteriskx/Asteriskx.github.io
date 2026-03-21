import { useEffect, useState } from "react";

const N          = 8;
const SKEW       = 8;
const STRIP_MS   = 450;
const STAGGER_MS = 110;
const TOTAL_MS   = STAGGER_MS * (N - 1) + STRIP_MS + 150;
const FADEOUT_MS = 150; // ストリップのフェードアウト時間

function getStripClipPath(i: number): string {
  const w  = 100 / N;
  const x1 = w * i;
  const x2 = w * (i + 1);
  return `polygon(${x1 - SKEW}% 0%, ${x2 - SKEW}% 0%, ${x2 + SKEW}% 100%, ${x1 + SKEW}% 100%)`;
}

interface Props {
  logos: string[];
  intervalMs: number;
}

export function LogoSlashReveal({ logos, intervalMs }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx]       = useState<number | null>(null);
  const [leaving, setLeaving]       = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIdx + 1) % logos.length;
      setNextIdx(next);
      setLeaving(false);

      // 1. 全ストリップ完成後: ベース画像を新しい src に差し替え
      const t1 = setTimeout(() => setCurrentIdx(next), TOTAL_MS);

      // 2. ベース描画後: ストリップをフェードアウト開始
      const t2 = setTimeout(() => setLeaving(true), TOTAL_MS + 50);

      // 3. フェードアウト完了後: ストリップを DOM から削除
      const t3 = setTimeout(() => setNextIdx(null), TOTAL_MS + 50 + FADEOUT_MS);

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, intervalMs);

    return () => clearInterval(timer);
  }, [currentIdx, logos.length, intervalMs]);

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
