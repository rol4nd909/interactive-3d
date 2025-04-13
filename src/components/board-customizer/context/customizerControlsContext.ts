import { createContext } from "react";
import { BoardCustomizerColor, BoardCustomizerTexture } from "../types";

export type CustomizerControlsContext = {
  selectedGripTape?: BoardCustomizerColor;
  setGripTape: (gripTape: BoardCustomizerColor) => void;
  selectedBolts?: BoardCustomizerColor;
  setBolts: (bolts: BoardCustomizerColor) => void;
  selectedBaseplates?: BoardCustomizerColor;
  setBaseplates: (baseplates: BoardCustomizerColor) => void;
  selectedTrucks?: BoardCustomizerColor;
  setTrucks: (trucks: BoardCustomizerColor) => void;
  selectedDeck?: BoardCustomizerTexture;
  setDeck: (deck: BoardCustomizerTexture) => void;
  selectedWheels?: BoardCustomizerTexture;
  setWheels: (wheel: BoardCustomizerTexture) => void;
};

// Default context with empty setter functions
export const defaultContext: CustomizerControlsContext = {
  setGripTape: () => {},
  setBolts: () => {},
  setBaseplates: () => {},
  setTrucks: () => {},
  setDeck: () => {},
  setWheels: () => {},
};

export const CustomizerControlsContext = createContext(defaultContext);
