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
  assert.match(html, /Research and Industry Experience/);
  assert.match(html, /Honors and Awards/);
  assert.match(html, /Myron M\. Rosenthal Merit Award/);
  assert.match(html, /Leadership and Service/);
  assert.doesNotMatch(html, /4DPS|4D Point Splatting|radar-splatting|2611\.08342|Differentiable Sensing/);
  assert.match(html, /arxiv\.org\/abs\/2610\.03887/);
  assert.match(html, /arxiv\.org\/abs\/2609\.06077/);
  assert.match(html, /ieeexplore\.ieee\.org\/document\/11309979/);
  assert.match(html, /machine-readable point data/);
  assert.match(html, /mailto:gq2032@nyu\.edu/);
  assert.match(html, />gq2032@nyu\.edu<\/a>/);
  assert.doesNotMatch(html, /Mingjun Ying|NYU WIRELESS collaborators/);
  assert.doesNotMatch(html, /pdp-diffusion|Generate the residual|generative channel modeling/);
  assert.doesNotMatch(html, /Complete what the camera cannot see|geometry-completion|known-free violations/);
  assert.doesNotMatch(html, /<!--app-html-->/);
});

test("static build contains essential media and browser assets", async () => {
  await Promise.all([
    access(new URL("404.html", outputRoot)),
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("media/guanyue-qian.jpg", outputRoot)),
    access(new URL("media/horama-pointcloud.png", outputRoot)),
    access(new URL("media/horama-l-reconstruction.png", outputRoot)),
    access(new URL("media/horama-l-wall-coverage.png", outputRoot)),
    access(new URL("media/horama-l-path-loss.png", outputRoot)),
    access(new URL("media/horama-l-spread-cdf.png", outputRoot)),
    access(new URL("media/nyuray-primo-scenario.png", outputRoot)),
    access(new URL("media/nyuray-primo-system.png", outputRoot)),
    access(new URL("media/nyuray-sparc-results.svg", outputRoot)),
    access(new URL("media/about-channel-measurement.jpg", outputRoot)),
    access(new URL("media/conference-poster-session.jpg", outputRoot)),
    access(new URL("media/about-stolze-award.jpg", outputRoot)),
  ]);
  const assets = await readdir(new URL("assets/", outputRoot));
  assert.ok(assets.some((name) => name.endsWith(".js")));
  assert.ok(assets.some((name) => name.endsWith(".css")));
});

test("every research project has a pre-rendered detail page", async () => {
  const routes = ["horama", "horama-l", "nyuray-intelligence"];
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
  assert.match(pages[1], /450,141/);
  assert.match(pages[1], /horama-l-wall-coverage\.png/);
  assert.match(pages[1], /horama-l-path-loss\.png/);
  assert.match(pages[1], /horama-l-spread-cdf\.png/);
  assert.doesNotMatch(pages[1], /horama-l-validation\.png/);
  assert.match(pages[2], /18\.74/);
  assert.match(pages[2], /one million rays/);
  assert.match(pages[2], /nyuray-primo-scenario\.png/);
  assert.match(pages[2], /nyuray-sparc-results\.svg/);
  await assert.rejects(access(new URL("research/geometry-completion/index.html", outputRoot)));
  await assert.rejects(access(new URL("research/pdp-diffusion/index.html", outputRoot)));
});

test("hidden 4DPS content is absent from deployed pages, scripts, and downloads", async () => {
  const files = await readdir(outputRoot, { recursive: true });
  for (const file of files.filter((name) => /\.(?:html|js|json|map|txt)$/.test(name))) {
    const content = await readFile(new URL(file, outputRoot), "utf8");
    assert.doesNotMatch(content, /4DPS|4D Point Splatting|4D POINT SPLATTING|radar-splatting|2611\.08342|4dps-(?:pipeline|splatting)/, file);
  }
  for (const file of ["research/radar-splatting/index.html", "media/4dps-pipeline.png", "media/4dps-splatting.png", "Guanyue-Qian-CV.pdf"]) {
    await assert.rejects(access(new URL(file, outputRoot)), file);
  }
});
