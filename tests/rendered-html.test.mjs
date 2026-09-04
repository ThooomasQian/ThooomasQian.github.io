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
  assert.match(html, /Guanyue-Qian-CV\.pdf/);
  assert.match(html, /guanyue-qian\.qgy06442\.chatgpt\.site\/og\.png/);
});

test("ships the essential portfolio assets", async () => {
  await Promise.all([
    access(new URL("public/Guanyue-Qian-CV.pdf", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
    access(new URL("public/media/guanyue-qian.jpg", projectRoot)),
    access(new URL("public/media/horama-pipeline.jpg", projectRoot)),
    access(new URL("public/media/fr1-measurement.mp4", projectRoot)),
  ]);
});
