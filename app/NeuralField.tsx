"use client";

import { useEffect, useRef, useState } from "react";

type Node = { x: number; y: number; layer: number; row: number };

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const modeRef = useRef<"geometry" | "channel">("geometry");
  const [mode, setMode] = useState<"geometry" | "channel">("geometry");

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let animation = 0;
    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      context.clearRect(0, 0, w, h);
      const counts = modeRef.current === "geometry" ? [4, 7, 8, 5, 3] : [3, 6, 5, 7, 4];
      const nodes: Node[] = [];
      counts.forEach((count, layer) => {
        for (let row = 0; row < count; row += 1) {
          const stagger = Math.sin((row + 1) * (layer + 2)) * 7;
          nodes.push({
            x: 30 + layer * ((w - 60) / (counts.length - 1)),
            y: 25 + row * ((h - 50) / Math.max(1, count - 1)) + stagger,
            layer,
            row,
          });
        }
      });

      const color = modeRef.current === "geometry" ? "108, 240, 212" : "137, 126, 255";
      for (let layer = 0; layer < counts.length - 1; layer += 1) {
        const from = nodes.filter((node) => node.layer === layer);
        const to = nodes.filter((node) => node.layer === layer + 1);
        from.forEach((a) => to.forEach((b, index) => {
          const distance = Math.hypot(pointerRef.current.x - (a.x + b.x) / 2, pointerRef.current.y - (a.y + b.y) / 2);
          const hover = Math.max(0, 1 - distance / 150);
          context.strokeStyle = `rgba(${color}, ${0.045 + hover * 0.24})`;
          context.lineWidth = hover > .25 ? 1 : .55;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
          if ((a.row + index + layer) % 5 === 0) {
            const progress = (time * .006 + (a.row + index) * .09) % 1;
            const x = a.x + (b.x - a.x) * progress;
            const y = a.y + (b.y - a.y) * progress;
            context.fillStyle = `rgba(${color}, .9)`;
            context.beginPath();
            context.arc(x, y, 1.5, 0, Math.PI * 2);
            context.fill();
          }
        }));
      }
      nodes.forEach((node) => {
        const distance = Math.hypot(pointerRef.current.x - node.x, pointerRef.current.y - node.y);
        const radius = distance < 75 ? 4.8 : 2.7;
        context.fillStyle = distance < 75 ? `rgb(${color})` : `rgba(${color}, .65)`;
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();
      });
      time += 1;
      animation = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="neural-field">
      <canvas
        ref={canvasRef}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        }}
        onPointerLeave={() => { pointerRef.current = { x: -1000, y: -1000 }; }}
        aria-label="Interactive neural network graph with animated activations. Move the pointer to inspect connections."
      />
      <div className="neural-controls" aria-label="Neural model view">
        <button className={mode === "geometry" ? "active" : ""} onClick={() => setMode("geometry")}>Geometry completion</button>
        <button className={mode === "channel" ? "active" : ""} onClick={() => setMode("channel")}>Channel synthesis</button>
      </div>
    </div>
  );
}
