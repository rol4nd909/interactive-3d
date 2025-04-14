import clsx from "clsx";
import { BoardCustomizerDocumentData } from "./types";
import { ComponentProps, ReactNode } from "react";
import { useCustomizerControls } from "@/hooks/useCustomizerControls";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type ControlsProps = Pick<
  BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & {
  clasName?: string;
};

export function Controls({ wheels, decks, metals, clasName }: ControlsProps) {
  const {
    setGripTape,
    setBolts,
    setBaseplates,
    setTrucks,
    setDeck,
    setWheels,
    selectedGripTape,
    selectedBolts,
    selectedBaseplates,
    selectedTrucks,
    selectedDeck,
    selectedWheels,
  } = useCustomizerControls();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  function updateParams(key: string, value: string | null) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    const newSearch = newParams.toString();
    navigate(`${location.pathname}?${newSearch}${location.hash}`, {
      replace: true,
    });
  }

  return (
    // "relative" is needed to prevent overflow because of the sr-only text
    // in the Option component
    <div className={clsx("overflow-y-auto p-[2px] flex-1 relative", clasName)}>
      <div className="grid gap-6">
        <Options title="Deck" selectedName={selectedDeck?.uid}>
          {decks.map((deck) => (
            <Option
              key={deck.uid}
              texture={deck.textureCrop ?? deck.texture}
              selected={deck.uid === selectedDeck?.uid}
              onClick={() => {
                setDeck(deck);
                updateParams("deck", deck.uid ?? null);
              }}
            >
              {deck.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>

        <Options title="Griptape" selectedName={selectedGripTape?.uid}>
          {metals.map((m) => (
            <Option
              key={m.uid}
              color={m.color}
              selected={m.uid === selectedGripTape?.uid}
              onClick={() => {
                setGripTape(m);
                updateParams("griptape", m.uid ?? null);
              }}
            >
              {m.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>

        <Options title="Wheels" selectedName={selectedWheels?.uid}>
          {wheels.map((wheel) => (
            <Option
              key={wheel.uid}
              texture={wheel.textureCrop ?? wheel.texture}
              selected={wheel.uid === selectedWheels?.uid}
              onClick={() => {
                setWheels(wheel);
                updateParams("wheel", wheel.uid ?? null);
              }}
            >
              {wheel.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>

        <Options title="Trucks" selectedName={selectedTrucks?.uid}>
          {metals.map((m) => (
            <Option
              key={m.uid}
              color={m.color}
              selected={m.uid === selectedTrucks?.uid}
              onClick={() => {
                setTrucks(m);
                updateParams("truck", m.uid ?? null);
              }}
            >
              {m.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>

        <Options title="Baseplates" selectedName={selectedBaseplates?.uid}>
          {metals.map((m) => (
            <Option
              key={m.uid}
              color={m.color}
              selected={m.uid === selectedBaseplates?.uid}
              onClick={() => {
                setBaseplates(m);
                updateParams("baseplate", m.uid ?? null);
              }}
            >
              {m.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>

        <Options title="Bolts" selectedName={selectedBolts?.uid}>
          {metals.map((m) => (
            <Option
              key={m.uid}
              color={m.color}
              selected={m.uid === selectedBolts?.uid}
              onClick={() => {
                setBolts(m);
                updateParams("bolt", m.uid ?? null);
              }}
            >
              {m.uid?.replace(/-/g, " ")}
            </Option>
          ))}
        </Options>
      </div>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: string;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <h3 className="text-fluid-1 font-sans leading-[1.25] uppercase">
          {title ?? "Options"}
        </h3>

        <p className="text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formattedName}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & ({ texture: string; color?: never } | { color: string; texture?: never });

function Option({ children, selected, texture, color, onClick }: OptionProps) {
  return (
    <button
      className={clsx(
        "size-10 cursor-pointer rounded-full border-4 border-black outline-white overflow-hidden",
        selected && "outline-2"
      )}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {texture && (
        <img
          className="pointer-events-none object-cover size-full"
          src={texture}
          alt=""
        />
      )}

      <span className="sr-only">{children}</span>
    </button>
  );
}
