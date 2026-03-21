import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 14;
const COLORS = ["#00e5ff", "#ffffff", "#7ecfdd", "#00bcd4", "#e0f7fa"];

interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number;
  radius: number;
  color: string;
}

export function ClickFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
        const speed = 1.8 + Math.random() * 2.8;
        sparksRef.current.push({
          x:      e.clientX,
          y:      e.clientY,
          vx:     Math.cos(angle) * speed,
          vy:     Math.sin(angle) * speed,
          alpha:  1,
          radius: 1.5 + Math.random() * 2,
          color:  COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };
    window.addEventListener("click", onClick);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(s => s.alpha > 0.02);

      for (const s of sparksRef.current) {
        s.x     += s.vx;
        s.y     += s.vy;
        s.vy    += 0.06; // 重力
        s.vx    *= 0.97;
        s.vy    *= 0.97;
        s.alpha *= 0.93;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9997,
      }}
    />
  );
}
