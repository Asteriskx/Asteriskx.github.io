import { useEffect, useRef } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      await loadScript("/icon_b64.js");
      const iconDataUrls: string[] =
        (window as unknown as { ICON_DATA_URLS?: string[] }).ICON_DATA_URLS ?? [];

      if (!canvasRef.current) return;

      // Dynamic import of the bg init function
      const { initBg } = await import("../lib/initBg");
      cleanup = initBg(canvasRef.current, THREE, iconDataUrls, (id: number) => {
        animationId = id;
      });
    })();

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      cleanup?.();
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}
