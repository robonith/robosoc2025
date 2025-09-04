import React, { useEffect, useRef } from "react";

const LineFollowerLoader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = "Robosoc";
    const fontSize = 120;
    const font = `900 ${fontSize}px sans-serif`;

    ctx.font = font;
    const metrics = ctx.measureText(text);

    const width = Math.ceil(metrics.width + 100);
    const height = Math.ceil(fontSize * 1.5);

    canvas.width = width;
    canvas.height = height;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offCtx.font = font;
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "#fff";
    offCtx.fillText(text, 50, height / 2);

    let animationId: number;
    const fuzzRange = 30;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const intensity = 0.25;
      for (let y = 0; y < height; y++) {
        const dx = Math.floor((Math.random() - 0.5) * intensity * fuzzRange);
        ctx.drawImage(offscreen, 0, y, width, 1, dx, y, width, 1);
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LineFollowerLoader;
