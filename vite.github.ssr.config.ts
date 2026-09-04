import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: `${projectRoot}github`,
  plugins: [react()],
  build: {
    ssr: `${projectRoot}github/src/entry-server.tsx`,
    outDir: `${projectRoot}.github-ssr`,
    emptyOutDir: true,
    rollupOptions: {
      output: { entryFileNames: "entry-server.mjs" },
    },
  },
});
