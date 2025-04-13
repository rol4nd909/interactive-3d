import { Link, useSearchParams } from "react-router-dom";
import { Logo } from "../Logo";
import { boardCustomizerData } from "./board-customizer-data";
import { CustomizerControlsProvider } from "./context/CustomizerControlsProvider";
import { Controls } from "./Controls";
import { Preview } from "./Preview";
import Loading from "./Loading";

export function BoardCustomizer() {
  const [searchParams] = useSearchParams();
  const { wheels, decks, metals } = boardCustomizerData;

  const defaultGripTape =
    metals.find((m) => m.uid === searchParams.get("griptape")) || metals[9];
  const defaultBolts =
    metals.find((m) => m.uid === searchParams.get("bolt")) || metals[11];
  const defaultBaseplates =
    metals.find((m) => m.uid === searchParams.get("baseplate")) || metals[6];
  const defaultTrucks =
    metals.find((m) => m.uid === searchParams.get("truck")) || metals[4];
  const defaultDeck =
    decks.find((d) => d.uid === searchParams.get("deck")) || decks[6];
  const defaultWheel =
    wheels.find((w) => w.uid === searchParams.get("wheel")) || wheels[2];

  const wheelTextureURLs = wheels.map((wheel) => wheel.texture);
  const deckTextureURLs = decks.map((deck) => deck.texture);

  return (
    <div
      className="min-h-screen lg:grid grid-cols-[1fr_24rem] relative"
      id="customizer"
    >
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultGripTape={defaultGripTape}
        defaultBaseplates={defaultBaseplates}
        defaultTrucks={defaultTrucks}
        defaultBolts={defaultBolts}
      >
        <div className="bg-[#3a414a] max-lg:aspect-square relative">
          <Link
            to={import.meta.env.BASE_URL}
            className="absolute text-white left-6 top-6 z-10"
          >
            <Logo className="h-12" />
          </Link>

          <div className="absolute inset-0">
            <Preview
              wheelTextureURLs={wheelTextureURLs}
              deckTextureURLs={deckTextureURLs}
            />
          </div>
        </div>

        <div className="bg-zinc-900 bg-texture text-white p-6 grid gap-8 max-h-screen">
          <h2 className="text-fluid-3 uppercase font-sans leading-[1.15]">
            Build your board
          </h2>

          <Controls wheels={wheels} decks={decks} metals={metals} />

          <a
            className="btn-cutout group mx-4 items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg py-3 from-brand-lime to-brand-orange text-black inline-flex"
            href=""
          >
            <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&amp;&gt;svg]:h-full [&amp;&gt;svg]:w-full size-6">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
              </svg>
            </div>
            <div className="w-px self-stretch bg-black/25"></div>
            Add to cart
          </a>
        </div>
      </CustomizerControlsProvider>
      <Loading />
    </div>
  );
}
