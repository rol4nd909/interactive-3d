import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Customizer } from "@/pages/customizer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customizer" element={<Customizer />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
