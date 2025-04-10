import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Hero } from "@components/hero/Hero";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Hero />

    <div className="py-48 constrained-grid gap-y-12">
      <p className="constrained-col-content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
        nesciunt, ratione doloremque corrupti aperiam, repudiandae reiciendis
        nemo quae commodi neque modi beatae cum officia possimus consequatur,
        recusandae magnam quidem debitis.
      </p>
      <p className="constrained-col-content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
        nesciunt, ratione doloremque corrupti aperiam, repudiandae reiciendis
        nemo quae commodi neque modi beatae cum officia possimus consequatur,
        recusandae magnam quidem debitis.
      </p>
      <p className="constrained-col-content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
        nesciunt, ratione doloremque corrupti aperiam, repudiandae reiciendis
        nemo quae commodi neque modi beatae cum officia possimus consequatur,
        recusandae magnam quidem debitis.
      </p>
    </div>
  </StrictMode>
);
