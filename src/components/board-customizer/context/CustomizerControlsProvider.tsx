import { useMemo, useState } from "react";
import { BoardCustomizerColor, BoardCustomizerTexture } from "../types";
import { CustomizerControlsContext } from "./customizerControlsContext";

type CustomizerControlsProviderProps = {
  defaultWheel?: BoardCustomizerTexture;
  defaultDeck?: BoardCustomizerTexture;
  defaultGripTape?: BoardCustomizerColor;
  defaultBaseplates?: BoardCustomizerColor;
  defaultTrucks?: BoardCustomizerColor;
  defaultBolts?: BoardCustomizerColor;
  children: React.ReactNode;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultGripTape,
  defaultBaseplates,
  defaultTrucks,
  defaultBolts,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedGripTape, setGripTape] = useState(defaultGripTape);
  const [selectedBaseplates, setBaseplates] = useState(defaultBaseplates);
  const [selectedTrucks, setTrucks] = useState(defaultTrucks);
  const [selectedBolts, setBolts] = useState(defaultBolts);

  const value = useMemo<CustomizerControlsContext>(() => {
    return {
      selectedWheels: selectedWheel,
      setWheels: setWheel,
      selectedDeck,
      setDeck,
      selectedGripTape,
      setGripTape,
      selectedBaseplates,
      setBaseplates,
      selectedTrucks,
      setTrucks,
      selectedBolts,
      setBolts,
    };
  }, [
    selectedWheel,
    selectedDeck,
    selectedGripTape,
    selectedBaseplates,
    selectedTrucks,
    selectedBolts,
  ]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}
