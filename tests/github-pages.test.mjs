import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist-github/", import.meta.url);

test("GitHub Pages output is pre-rendered and canonical", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  assert.match(html, /<title>Guanyue Qian — Wireless Intelligence &amp; 3D Vision<\/title>/);
  assert.match(html, /Making the invisible/);
  assert.match(html, /HoRAMA/);
  assert.match(html, /EDUCATION \+ EXPERIENCE/);
  assert.match(html, /https:\/\/thooomasqian\.github\.io\/og\.png/);
  assert.doesNotMatch(html, /<!--app-html-->/);
});

test("GitHub Pages output includes interactive code and essential media", async () => {
  await Promise.all([
    access(new URL("404.html", outputRoot)),
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("Guanyue-Qian-CV.pdf", outputRoot)),
    access(new URL("media/fr1-measurement.mp4", outputRoot)),
    access(new URL("media/guanyue-qian.jpg", outputRoot)),
  ]);

  const scriptFiles = await import("node:fs/promises").then(({ readdir }) =>
    readdir(new URL("assets/", outputRoot)),
  );
  assert.ok(scriptFiles.some((name) => name.endsWith(".js")));
  assert.ok(scriptFiles.some((name) => name.endsWith(".css")));
});
