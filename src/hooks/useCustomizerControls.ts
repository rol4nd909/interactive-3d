import { CustomizerControlsContext } from "@/components/board-customizer/context/customizerControlsContext";
import { useContext } from "react";

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
