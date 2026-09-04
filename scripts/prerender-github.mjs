import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { render, staticRoutes } from "../.github-ssr/entry-server.mjs";

const outputUrl = new URL("../dist-github/", import.meta.url);
const indexUrl = new URL("index.html", outputUrl);
const template = await readFile(indexUrl, "utf8");
const siteUrl = "https://thooomasqian.github.io";

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function pageHtml({ pathname, title, description, image }) {
  const canonical = `${siteUrl}${pathname}`;
  let html = template.replace("<!--app-html-->", render(pathname));
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  if (image) {
    const imageUrl = `${siteUrl}${image}`;
    html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);
  } else {
    html = html.replace(/\s*<meta property="og:image" content=".*?" \/>/, "");
    html = html.replace(/\s*<meta name="twitter:image" content=".*?" \/>/, "");
    html = html.replace('content="summary_large_image"', 'content="summary"');
  }
  return html;
}

const homeHtml = pageHtml({
  pathname: "/",
  title: "Guanyue Qian — Wireless Intelligence & 3D Vision",
  description: "Research portfolio of Guanyue Qian at NYU WIRELESS, working across wireless propagation, machine learning, and 3D reconstruction.",
  image: "/og.png",
});

await writeFile(indexUrl, homeHtml);
for (const route of staticRoutes) {
  const directory = new URL(`.${route.pathname}`, outputUrl);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), pageHtml(route));
}
await copyFile(indexUrl, new URL("404.html", outputUrl));
await writeFile(new URL(".nojekyll", outputUrl), "");
