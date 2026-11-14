import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist-github/", import.meta.url);

test("home page is pre-rendered as a compact academic profile", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  assert.match(html, /<title>Guanyue Qian<\/title>/);
  assert.match(html, /About/);
  assert.match(html, /News/);
  assert.match(html, /Wireless digital twins/);
  assert.match(html, /Differentiable Sensing/);
  assert.match(html, /Research and Industry Experience/);
  assert.match(html, /Honors and Awards/);
  assert.match(html, /Leadership and Service/);
  assert.match(html, /4D Point Splatting/);
  assert.ok(html.indexOf("4D Point Splatting") < html.indexOf("HoRAMA-L"));
  assert.match(html, /arxiv\.org\/abs\/2611\.08342/);
  assert.match(html, /arxiv\.org\/abs\/2610\.03887/);
  assert.match(html, /arxiv\.org\/abs\/2609\.06077/);
  assert.match(html, /arxiv\.org\/abs\/2510\.00141/);
  assert.match(html, /machine-readable point data/);
  assert.match(html, /mailto:gq2032@nyu\.edu/);
  assert.match(html, />gq2032@nyu\.edu<\/a>/);
  assert.doesNotMatch(html, /Mingjun Ying|NYU WIRELESS collaborators/);
  assert.doesNotMatch(html, /<!--app-html-->/);
});

test("static build contains essential media and browser assets", async () => {
  await Promise.all([
    access(new URL("404.html", outputRoot)),
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("Guanyue-Qian-CV.pdf", outputRoot)),
    access(new URL("media/guanyue-qian.jpg", outputRoot)),
    access(new URL("media/horama-pointcloud.png", outputRoot)),
    access(new URL("media/4dps-pipeline.png", outputRoot)),
    access(new URL("media/horama-l-reconstruction.png", outputRoot)),
    access(new URL("media/about-channel-measurement.jpg", outputRoot)),
    access(new URL("media/conference-poster-session.jpg", outputRoot)),
    access(new URL("media/about-stolze-award.jpg", outputRoot)),
  ]);
  const assets = await readdir(new URL("assets/", outputRoot));
  assert.ok(assets.some((name) => name.endsWith(".js")));
  assert.ok(assets.some((name) => name.endsWith(".css")));
});

test("every research project has a pre-rendered detail page", async () => {
  const routes = ["horama", "radar-splatting", "horama-l", "geometry-completion", "pdp-diffusion", "nyuray-intelligence"];
  const pages = await Promise.all(routes.map((route) => readFile(new URL(`research/${route}/index.html`, outputRoot), "utf8")));
  for (const [index, html] of pages.entries()) {
    assert.match(html, new RegExp(`https:\\/\\/thooomasqian\\.github\\.io\\/research\\/${routes[index]}\\/`));
    assert.match(html, /Research Context/);
    assert.match(html, /Method/);
    assert.match(html, /Results/);
    assert.match(html, /Resources/);
    assert.doesNotMatch(html, /<!--app-html-->/);
  }
  assert.match(pages[0], /phone scan to a radio-ready digital twin/);
  assert.match(pages[0], /MASt3R-SLAM/);
  assert.match(pages[1], /335/);
  assert.match(pages[2], /450,141/);
  assert.match(pages[3], /known-free violations/);
  assert.match(pages[4], /401/);
  assert.match(pages[5], /18\.74/);
  assert.match(pages[5], /one million rays/);
});
