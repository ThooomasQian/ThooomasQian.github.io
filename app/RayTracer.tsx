"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

function pointOnPath(points: Point[], progress: number) {
  const lengths = points.slice(1).map((point, index) =>
    Math.hypot(point.x - points[index].x, point.y - points[index].y)
  );
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let target = progress * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index]) {
      const ratio = target / lengths[index];
      return {
        x: points[index].x + (points[index + 1].x - points[index].x) * ratio,
        y: points[index].y + (points[index + 1].y - points[index].y) * ratio,
      };
    }
    target -= lengths[index];
  }
  return points[points.length - 1];
}

export function RayTracer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const receiverRef = useRef({ x: 0.83, y: 0.35 });
  const pausedRef = useRef(false);
  const frequencyRef = useRef(16.95);
  const [paused, setPaused] = useState(false);
  const [frequency, setFrequency] = useState(16.95);

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { frequencyRef.current = frequency; }, [frequency]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let animation = 0;

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

      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#091729");
      gradient.addColorStop(1, "#050b13");
      context.fillStyle = gradient;
      context.fillRect(0, 0, w, h);

      context.strokeStyle = "rgba(148, 177, 207, .08)";
      context.lineWidth = 1;
      for (let x = 0; x < w; x += 28) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, h); context.stroke(); }
      for (let y = 0; y < h; y += 28) { context.beginPath(); context.moveTo(0, y); context.lineTo(w, y); context.stroke(); }

      const walls = [
        [0.31, 0.06, 0.035, 0.50], [0.31, 0.70, 0.035, 0.24],
        [0.56, 0.24, 0.035, 0.57], [0.76, 0.05, 0.035, 0.22],
        [0.76, 0.48, 0.035, 0.47], [0.09, 0.30, 0.12, 0.035],
        [0.42, 0.55, 0.14, 0.035], [0.79, 0.69, 0.13, 0.035],
      ];
      walls.forEach(([x, y, width, height]) => {
        context.fillStyle = "rgba(119, 146, 174, .18)";
        context.fillRect(x * w, y * h, width * w, height * h);
        context.strokeStyle = "rgba(165, 193, 221, .19)";
        context.strokeRect(x * w, y * h, width * w, height * h);
      });

      const tx = { x: 0.12 * w, y: 0.66 * h };
      const rx = { x: receiverRef.current.x * w, y: receiverRef.current.y * h };
      const paths: Point[][] = [
        [tx, { x: 0.325 * w, y: 0.61 * h }, { x: 0.575 * w, y: 0.40 * h }, rx],
        [tx, { x: 0.21 * w, y: 0.315 * h }, { x: 0.575 * w, y: 0.32 * h }, rx],
        [tx, { x: 0.325 * w, y: 0.82 * h }, { x: 0.775 * w, y: 0.82 * h }, rx],
      ];
      const colors = ["#67e8f9", "#8b7cff", "#38f5a5"];
      const speed = frequencyRef.current > 10 ? 0.0045 : 0.0034;
      if (!pausedRef.current) frame += 1;

      paths.forEach((path, pathIndex) => {
        context.beginPath();
        path.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
        context.strokeStyle = colors[pathIndex] + "80";
        context.lineWidth = 1.25;
        context.stroke();

        for (let particle = 0; particle < 3; particle += 1) {
          const progress = (frame * speed + particle / 3 + pathIndex * 0.11) % 1;
          const point = pointOnPath(path, progress);
          const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);
          glow.addColorStop(0, colors[pathIndex]);
          glow.addColorStop(1, colors[pathIndex] + "00");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(point.x, point.y, 10, 0, Math.PI * 2);
          context.fill();
          context.fillStyle = "white";
          context.beginPath();
          context.arc(point.x, point.y, 1.7, 0, Math.PI * 2);
          context.fill();
        }
      });

      const drawNode = (point: Point, label: string, color: string) => {
        context.shadowColor = color;
        context.shadowBlur = 18;
        context.fillStyle = color;
        context.beginPath();
        context.arc(point.x, point.y, 6, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        context.fillStyle = "rgba(225, 238, 250, .72)";
        context.font = "600 10px ui-monospace, monospace";
        context.fillText(label, point.x - 9, point.y - 14);
      };
      drawNode(tx, "TX", "#f7bd4d");
      drawNode(rx, "RX", "#67e8f9");

      context.fillStyle = "rgba(200, 218, 234, .46)";
      context.font = "500 9px ui-monospace, monospace";
      context.fillText("DRAG TO MOVE RECEIVER", 14, h - 16);
      context.textAlign = "right";
      context.fillText(`${frequencyRef.current.toFixed(frequencyRef.current < 10 ? 1 : 2)} GHz · 3 PATHS`, w - 14, h - 16);
      context.textAlign = "left";
      animation = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animation);
  }, []);

  const moveReceiver = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    receiverRef.current = {
      x: Math.max(0.64, Math.min(0.92, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0.18, Math.min(0.82, (event.clientY - rect.top) / rect.height)),
    };
  };

  return (
    <div className="ray-tracer">
      <canvas
        ref={canvasRef}
        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); moveReceiver(event); }}
        onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) moveReceiver(event); }}
        aria-label="Animated floor plan showing three reflected radio paths from transmitter to receiver. Drag to move the receiver."
      />
      <div className="demo-controls">
        <div className="frequency-tabs" aria-label="Ray tracing frequency">
          {[3.7, 16.95].map((value) => (
            <button key={value} className={frequency === value ? "active" : ""} onClick={() => setFrequency(value)}>
              {value} GHz
            </button>
          ))}
        </div>
        <button className="pause-button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
          {paused ? "Play field" : "Pause field"}
        </button>
      </div>
    </div>
  );
}
