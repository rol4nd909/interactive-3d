import { HashRouter } from "react-router-dom";

export function Router({ children }: { children: React.ReactNode }) {
  return <HashRouter>{children}</HashRouter>;
}
