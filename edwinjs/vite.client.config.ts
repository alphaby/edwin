import { defineConfig } from "vite";
import path from "path";
import autoExternal from "rollup-plugin-auto-external";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "client/index.ts"),
      name: "client",
      fileName: (format) => `index.${format}.js`,
    },
    outDir: "dist/client",
    rollupOptions: {
      plugins: [autoExternal()],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
