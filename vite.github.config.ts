import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: `${projectRoot}github`,
  publicDir: `${projectRoot}public`,
  base: "/",
  plugins: [react()],
  build: {
    outDir: `${projectRoot}dist-github`,
    emptyOutDir: true,
  },
});
