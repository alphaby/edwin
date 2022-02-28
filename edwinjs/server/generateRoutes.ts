import glob from "glob";
import { getPath } from "./config";
import fs from "fs";
import chokidar from "chokidar";

const imports = (routes: any) => `
// DO NOT TOUCH THIS FILE, THIS IS AUTO-GENERATED

import { AuthRequired } from "@edwin/client";
import { ReactNode } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Error from "../src/components/error";
import Layout from "../src/components/layout";
import LoginPage from "../src/pages/login";
${routes
  .map(
    ({ importPath, component }: any) =>
      `import ${component} from "../src${importPath}";`
  )
  .join("\n")}
`;

const content = (routes: any) => `
export default function EdwinRouting({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="login" element={<LoginPage/>} />
          <Route element={<AuthRequired />}>
            {children}
            ${routes
              .filter(({ path }: any) => path !== "login")
              .map(
                ({ path, component }: any) =>
                  `<Route key="${path}" path="${path}" element={<${component} />} />`
              )
              .join("\n            ")}
            <Route path="*" element={<Error status={404}/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
`;

function generateRoutingComponent() {
  glob(getPath("/src/pages/**/[a-z[]*.tsx"), (err: any, files: string[]) => {
    const routes = files.map((file, index) => {
      const importPath = file
        .replace(process.cwd(), "")
        .replace(".tsx", "")
        .replace("/src", "");
      const path = file
        .replace(process.cwd(), "")
        .replace(/\/src\/pages|index|\.tsx$/g, "")
        .replace(/\[\.{3}.+\]/, "*")
        .replace(/\[(.+)\]/, ":$1");
      const component = "Page" + index;
      return { importPath, path, component };
    });
    fs.writeFile(
      "./.edwin/routing.tsx",
      imports(routes) + content(routes),
      (err) => {
        if (err) console.log(err);
        console.log("✅ Routing generated");
      }
    );
  });
}

export default function () {
  generateRoutingComponent();
  chokidar
    .watch("./src/pages/**/[a-z[]*.tsx", {
      cwd: process.cwd(),
      ignoreInitial: true,
    })
    .on("all", () => generateRoutingComponent());
}
