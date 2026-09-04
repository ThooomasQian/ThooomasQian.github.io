import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://guanyue-qian.qgy06442.chatgpt.site/", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function renderPath(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`https://guanyue-qian.qgy06442.chatgpt.site${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete academic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Guanyue Qian — Wireless Intelligence &amp; 3D Vision<\/title>/);
  assert.match(html, /Making the invisible/);
  assert.match(html, /HoRAMA/);
  assert.match(html, /RT-Anchored PDP Diffusion/);
  assert.match(html, /EDUCATION \+ EXPERIENCE/);
  assert.match(html, /PHOTOGRAPHY · FIELD NOTES/);
  assert.match(html, /Collecting light/);
  assert.match(html, /Guanyue-Qian-CV\.pdf/);
  assert.match(html, /thooomasqian\.github\.io\/og\.png/);
  assert.doesNotMatch(html, />View project</);
});

test("ships the essential portfolio assets", async () => {
  await Promise.all([
    access(new URL("public/Guanyue-Qian-CV.pdf", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
    access(new URL("public/media/guanyue-qian.jpg", projectRoot)),
    access(new URL("public/media/horama-pipeline.jpg", projectRoot)),
    access(new URL("public/media/fr1-measurement.mp4", projectRoot)),
    access(new URL("public/media/horama-pointcloud.png", projectRoot)),
    access(new URL("public/media/conference-poster-session.jpg", projectRoot)),
    access(new URL("public/media/photography/670f7dcd39d84d5c87fe2ab75c9a5d.jpg", projectRoot)),
  ]);
});

test("server-renders representative project detail routes", async () => {
  const [horamaResponse, radarResponse] = await Promise.all([renderPath("/research/horama"), renderPath("/research/radar-splatting")]);
  assert.equal(horamaResponse.status, 200);
  assert.equal(radarResponse.status, 200);
  const [horama, radar] = await Promise.all([horamaResponse.text(), radarResponse.text()]);
  assert.match(horama, /From a phone scan to a radio-ready digital twin/);
  assert.match(horama, /END-TO-END PIPELINE/);
  assert.match(horama, /<title>From a phone scan to a radio-ready digital twin\. — Guanyue Qian<\/title>/);
  assert.match(horama, /property="og:title" content="From a phone scan to a radio-ready digital twin\. — Guanyue Qian"/);
  assert.match(horama, /name="twitter:description" content="HoRAMA turns an RGB-D walkthrough/);
  assert.match(horama, /thooomasqian\.github\.io\/media\/horama-pointcloud\.png/);
  assert.match(radar, /Differentiable radar rendering from monocular video/);
  assert.match(radar, /DOPPLER/);
  assert.match(radar, /<title>Differentiable radar rendering from monocular video\. — Guanyue Qian<\/title>/);
  assert.match(radar, /property="og:description" content="A differentiable renderer converts articulated motion/);
  assert.match(radar, /name="twitter:title" content="Differentiable radar rendering from monocular video\. — Guanyue Qian"/);
  assert.doesNotMatch(radar, /og\.png/);
});
