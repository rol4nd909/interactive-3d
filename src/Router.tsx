import { BrowserRouter, type BrowserRouterProps } from "react-router-dom";

export function Router({ children }: BrowserRouterProps) {
  const basename = "/interactive-3d"; // required for both local and GitHub Pages
  return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
}
