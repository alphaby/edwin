#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const tsconfig = `{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "lib": ["ES2015", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "outDir": "dist/src",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@edwin/client": [".edwin/index.ts"]
    }
  },
  "include": ["src/**/*", ".edwin/*"]
}`;

const viteconfig = `import { defineConfig } from "vite";
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
});`;

const index = `export { default as EdwinRouting } from "./routing";
export * from "./querying";
export * from "edwinjs/dist/client";`;

const types = `export { useSetTitle } from "edwinjs/dist/client/contexts/meta";
export {
  useLogout,
  useLogin,
  AuthRequired,
  useUser,
} from "edwinjs/dist/client/contexts/auth";
export {
  useMessage,
  useSetMessage,
} from "edwinjs/dist/client/contexts/message";
export type {
  GetArgs,
  QueryObject,
  ServerMessage,
} from "edwinjs/dist/client/lib/prisma";
export { usePrisma, queryPrisma } from "edwinjs/dist/client/lib/prisma";
export { default as PrismaForm } from "edwinjs/dist/client/components/prismaForm";
export { default as EdwinApp } from "edwinjs/dist/client/components/edwinApp";
export { default as LoginForm } from "edwinjs/dist/client/components/loginForm";
export { useTranslation } from "edwinjs/dist/client/lib/i18n";
export { default as EdwinRouting } from "./routing";
export * from "./querying";`;

fs.mkdir(path.join(process.cwd(), "./.edwin"), (err) => null);

fs.writeFile(path.join(process.cwd(), "./tsconfig.json"), tsconfig, (err) => {
  if (err) console.log(err);
  console.log("✅ TS config generated");
});

fs.writeFile(
  path.join(process.cwd(), "./.edwin/build.config.ts"),
  viteconfig,
  (err) => {
    if (err) console.log(err);
    console.log("✅ Vite config generated");
  }
);

fs.writeFile(
  path.join(process.cwd(), "./.edwin/routing.tsx"),
  `// PLEASE LAUNCH EDWIN SERVER TO GENERATE THIS FILE
export default function () {
  return null;
}`,
  (err) => (err ? console.log(err) : null)
);

fs.writeFile(
  path.join(process.cwd(), "./.edwin/querying.tsx"),
  `// PLEASE LAUNCH EDWIN SERVER TO GENERATE THIS FILE
export function _() {
  return null;
}`,
  (err) => (err ? console.log(err) : null)
);

// fs.writeFile(path.join(process.cwd(), "./.edwin/index.d.ts"), types, (err) =>
//   err ? console.log(err) : null
// );

fs.writeFile(path.join(process.cwd(), "./.edwin/index.ts"), index, (err) => {
  if (err) console.log(err);
  console.log("✅ Edwin client ready");
});
