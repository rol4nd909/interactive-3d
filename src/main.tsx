import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Customizer } from "@/pages/customizer";
import { Router } from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customizer" element={<Customizer />} />
      </Routes>
    </Router>
  </StrictMode>
);
