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
  assert.match(html, /PHOTOGRAPHY · FIELD NOTES/);
  assert.match(html, /conference-poster-session\.jpg/);
  assert.match(html, /AFTER IEEE ICC · SCOTLAND/);
  assert.match(html, /WILLIAM J\. STOLZE AWARD · NYU TANDON/);
  assert.ok(html.indexOf("4D Point Splatting") < html.indexOf("Generative Geometry"));
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
    access(new URL("media/horama-pointcloud.png", outputRoot)),
    access(new URL("media/conference-poster-session.jpg", outputRoot)),
    access(new URL("media/about-channel-measurement.jpg", outputRoot)),
    access(new URL("media/about-equipment-test.jpg", outputRoot)),
    access(new URL("media/about-sounder-check.jpg", outputRoot)),
    access(new URL("media/about-stolze-award.jpg", outputRoot)),
    access(new URL("media/photography/670f7dcd39d84d5c87fe2ab75c9a5d.jpg", outputRoot)),
  ]);

  const scriptFiles = await import("node:fs/promises").then(({ readdir }) =>
    readdir(new URL("assets/", outputRoot)),
  );
  assert.ok(scriptFiles.some((name) => name.endsWith(".js")));
  assert.ok(scriptFiles.some((name) => name.endsWith(".css")));
});

test("pre-renders every research project with route-specific metadata", async () => {
  const routes = ["horama", "geometry-completion", "pdp-diffusion", "nyuray-intelligence", "radar-splatting"];
  const pages = await Promise.all(routes.map((route) => readFile(new URL(`research/${route}/index.html`, outputRoot), "utf8")));
  for (const [index, html] of pages.entries()) {
    assert.match(html, new RegExp(`https:\\/\\/thooomasqian\\.github\\.io\\/research\\/${routes[index]}\\/`));
    assert.match(html, /THE PROJECT/);
    assert.match(html, /METHOD/);
    assert.doesNotMatch(html, /<!--app-html-->/);
  }
  assert.match(pages[0], /phone scan to a radio-ready digital twin/);
  assert.match(pages[1], /known-free violations/);
  assert.match(pages[2], /401/);
  assert.match(pages[3], /18\.74/);
  assert.doesNotMatch(pages[4], /og\.png/);
});
