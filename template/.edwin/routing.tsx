
// DO NOT TOUCH THIS FILE, THIS IS AUTO-GENERATED

import { AuthRequired } from "@edwin/client";
import { ReactNode } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Error from "../src/components/error";
import Layout from "../src/components/layout";
import LoginPage from "../src/pages/login";
import Page0 from "../src/pages/document/[id]";
import Page1 from "../src/pages/index";
import Page2 from "../src/pages/login";
import Page3 from "../src/pages/new";

export default function EdwinRouting({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="login" element={<LoginPage/>} />
          <Route element={<AuthRequired />}>
            {children}
            <Route key="/document/:id" path="/document/:id" element={<Page0 />} />
            <Route key="/" path="/" element={<Page1 />} />
            <Route key="/login" path="/login" element={<Page2 />} />
            <Route key="/new" path="/new" element={<Page3 />} />
            <Route path="*" element={<Error status={404}/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
