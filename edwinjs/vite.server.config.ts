import { defineConfig } from "vite";
import path from "path";
import autoExternal from "rollup-plugin-auto-external";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/index.ts"),
      name: "server",
      fileName: (format) => `index.${format}.js`,
    },
    outDir: "dist",
    rollupOptions: {
      plugins: [autoExternal()],
    },
  },
});
