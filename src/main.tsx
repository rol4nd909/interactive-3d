import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Customizer } from "@/pages/customizer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={import.meta.env.BASE_URL} element={<Home />} />
        <Route
          path={`${import.meta.env.BASE_URL}customizer`}
          element={<Customizer />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
