import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SkateboardScene } from "./SkateboardScene";
import { INITIAL_CAMERA_POSITION } from "@/constants/camera";

type Props = {
  gripTapeColor: string;
  boltColor: string;
  basePlateColor?: string;
  truckColor: string;
  deckTextureURLs: string[];
  wheelTextureURLs: string[];
};

export function SkateboardCanvas({
  gripTapeColor,
  boltColor,
  basePlateColor,
  truckColor,
  deckTextureURLs,
  wheelTextureURLs,
}: Props) {
  return (
    <div className="grid col-[1/-1] row-[1/-1] z-10">
      <Canvas camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}>
        <Suspense>
          <SkateboardScene
            gripTapeColor={gripTapeColor}
            boltColor={boltColor}
            basePlateColor={basePlateColor}
            truckColor={truckColor}
            deckTextureURLs={deckTextureURLs}
            wheelTextureURLs={wheelTextureURLs}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
