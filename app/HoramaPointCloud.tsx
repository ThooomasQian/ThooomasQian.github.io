"use client";

import { useEffect, useRef, useState } from "react";

type CloudPoint = {
  x: number;
  y: number;
  z: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  size: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function HoramaPointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const source = new Image();
    let animation = 0;
    let disposed = false;
    let points: CloudPoint[] = [];
    let start = performance.now();

    const updateScroll = () => {
      scrollRef.current = reducedMotion ? 0 : clamp(window.scrollY / Math.max(520, window.innerHeight * 0.72));
    };

    const buildPoints = () => {
      const sampleWidth = 540;
      const sampleHeight = 353;
      const sampler = document.createElement("canvas");
      sampler.width = sampleWidth;
      sampler.height = sampleHeight;
      const samplerContext = sampler.getContext("2d", { willReadFrequently: true });
      if (!samplerContext) return;
      samplerContext.drawImage(source, 0, 0, sampleWidth, sampleHeight);
      const pixels = samplerContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const next: CloudPoint[] = [];

      for (let y = 0; y < sampleHeight; y += 3) {
        for (let x = 0; x < sampleWidth; x += 3) {
          const index = (y * sampleWidth + x) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const brightness = (red + green + blue) / 3;
          const seed = x * 0.73 + y * 1.37;
          if (brightness > 244 || seededNoise(seed) < 0.24) continue;

          const angle = seededNoise(seed + 17) * Math.PI * 2;
          const distance = 55 + seededNoise(seed + 29) * 250;
          next.push({
            x: x - sampleWidth / 2,
            y: y - sampleHeight / 2,
            z: (175 - brightness) * 0.18 + (seededNoise(seed + 41) - 0.5) * 22,
            red,
            green,
            blue,
            alpha: 0.38 + seededNoise(seed + 53) * 0.58,
            size: 0.55 + seededNoise(seed + 67) * 1.35,
            scatterX: Math.cos(angle) * distance,
            scatterY: Math.sin(angle) * distance - seededNoise(seed + 79) * 54,
            scatterZ: (seededNoise(seed + 97) - 0.5) * 300,
          });
        }
      }
      points = next;
      start = performance.now();
      setReady(true);
    };

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const background = context.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, width * 0.72);
      background.addColorStop(0, "#111c28");
      background.addColorStop(0.58, "#08121d");
      background.addColorStop(1, "#040a11");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(145, 171, 195, .07)";
      context.lineWidth = 1;
      for (let y = height * 0.2; y < height; y += 44) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const entrance = reducedMotion ? 1 : clamp((now - start) / 900);
      const easedEntrance = 1 - Math.pow(1 - entrance, 3);
      const scatter = scrollRef.current;
      const time = reducedMotion ? 0 : (now - start) * 0.0001;
      const yaw = Math.sin(time) * 0.075;
      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);
      const scale = Math.min(width / 610, height / 430) * (0.94 + easedEntrance * 0.06);
      const centerX = width * 0.5;
      const centerY = height * 0.5 + 10;

      context.globalCompositeOperation = "screen";
      points.forEach((point) => {
        const scatteredX = point.x + point.scatterX * scatter * 1.65;
        const scatteredY = point.y + point.scatterY * scatter * 1.45;
        const scatteredZ = point.z + point.scatterZ * scatter;
        const rotatedX = scatteredX * cos + scatteredZ * sin;
        const rotatedZ = -scatteredX * sin + scatteredZ * cos;
        const perspective = 1 + rotatedZ / 1250;
        let x = centerX + rotatedX * scale * perspective;
        let y = centerY + scatteredY * scale * perspective;

        const pointerDistance = Math.hypot(x - pointerRef.current.x, y - pointerRef.current.y);
        if (pointerDistance < 74) {
          const force = (1 - pointerDistance / 74) * 20;
          const angle = Math.atan2(y - pointerRef.current.y, x - pointerRef.current.x);
          x += Math.cos(angle) * force;
          y += Math.sin(angle) * force;
        }

        const fade = (1 - scatter * 0.34) * easedEntrance;
        context.fillStyle = `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha * fade})`;
        context.beginPath();
        context.arc(x, y, point.size * perspective, 0, Math.PI * 2);
        context.fill();
      });
      context.globalCompositeOperation = "source-over";

      const scanX = ((now - start) * 0.055) % Math.max(width, 1);
      if (!reducedMotion && scatter < 0.2) {
        const scan = context.createLinearGradient(scanX - 55, 0, scanX + 16, 0);
        scan.addColorStop(0, "rgba(100, 235, 224, 0)");
        scan.addColorStop(1, "rgba(100, 235, 224, .11)");
        context.fillStyle = scan;
        context.fillRect(scanX - 55, 0, 72, height);
      }

      if (!disposed) animation = requestAnimationFrame(draw);
    };

    source.onload = buildPoints;
    source.src = "/media/horama-pointcloud.png";
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    animation = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div
      className={`horama-cloud ${ready ? "is-ready" : ""}`}
      ref={hostRef}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }}
      onPointerLeave={() => { pointerRef.current = { x: -1000, y: -1000 }; }}
    >
      <canvas ref={canvasRef} aria-label="Interactive HoRAMA RGB-D point cloud of NYU MakerSpace. Scroll to disperse the scan and move the pointer to disturb nearby points." />
      <div className="cloud-hud" aria-hidden="true">
        <span>RGB-D / 2.0M PTS</span>
        <span>SCROLL TO DISPERSE ↓</span>
      </div>
    </div>
  );
}
