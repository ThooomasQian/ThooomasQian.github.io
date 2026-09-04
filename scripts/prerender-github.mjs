import { copyFile, readFile, writeFile } from "node:fs/promises";
import { render } from "../.github-ssr/entry-server.mjs";

const outputUrl = new URL("../dist-github/", import.meta.url);
const indexUrl = new URL("index.html", outputUrl);
const template = await readFile(indexUrl, "utf8");
const html = template.replace("<!--app-html-->", render());

await writeFile(indexUrl, html);
await copyFile(indexUrl, new URL("404.html", outputUrl));
await writeFile(new URL(".nojekyll", outputUrl), "");
