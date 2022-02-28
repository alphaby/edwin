import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: "FRONTEND_",
  resolve: {
    alias: {
      "@edwin/client": path.resolve(process.cwd(), "./.edwin"),
    },
    dedupe: ["react-router-dom", "formik", "react", "react-dom"],
  },
  build: {
    outDir: "./dist",
    minify: false,
  },
});