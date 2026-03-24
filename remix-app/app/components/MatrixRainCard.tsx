import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const CHARS = "アイウエオカキクケコ01アスタリスクXYZ<>/{}[]";

/** {@link MatrixRainCard} に渡す Props */
interface Props {
  /** article 要素に付与する CSS クラス名 */
  className?: string;
  /** カード内に表示するコンテンツ（canvas より前面に描画される） */
  children: ReactNode;
}

/**
 * ホバー時にマトリックスレイン（落下文字）アニメーションを表示するカードコンポーネント。
 * アニメーションは Canvas 2D で描画し、ホバー終了時にキャンバスをクリアする。
 * RAF と runRef で管理することで state 更新による不要な再レンダーを回避している。
 */
export function MatrixRainCard({ className, children }: Props) {
  const cardRef   = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // raf/running は ref で管理（state にすると再レンダーが発生しパフォーマンスに影響）
  const runRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const card   = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    let cols: number;
    let drops: number[];

    function resize() {
      canvas!.width  = card!.offsetWidth;
      canvas!.height = card!.offsetHeight;
      cols  = Math.floor(canvas!.width / 14);
      drops = Array.from({ length: cols }, () => Math.random() * -20);
    }

    function draw() {
      ctx.fillStyle = "rgba(6,10,20,0.18)";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx.font = "11px Consolas, monospace";

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x  = i * 14;
        const y  = drops[i] * 14;
        // 画面下部は暗く、上部は明るいシアン。ランダムに白いきらめきを追加
        const nearBottom = y > canvas!.height * 0.8;
        ctx.fillStyle = nearBottom
          ? `rgba(0,229,255,${0.05 + Math.random() * 0.1})`
          : `rgba(0,229,255,${0.2  + Math.random() * 0.3})`;
        if (Math.random() > 0.97) ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText(ch, x, y);
        if (y > canvas!.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }
      if (runRef.current) rafRef.current = requestAnimationFrame(draw);
    }

    const onEnter = () => {
      resize();
      runRef.current = true;
      draw();
    };
    const onLeave = () => {
      runRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      runRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <article ref={cardRef} className={className}>
      <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
      {children}
    </article>
  );
}
