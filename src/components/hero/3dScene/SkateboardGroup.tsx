import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Skateboard } from "@components/skateboard/Skateboard";
import { Hotspot } from "./Hotspot";

type SkateboardGroupProps = {
  gripTapeColor: string;
  boltColor: string;
  basePlateColor?: string;
  truckColor: string;
  deckTextureURLs: string[];
  wheelTextureURLs: string[];
  animating: boolean;
  showHotspot: { front: boolean; middle: boolean; back: boolean };
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  containerRef: React.RefObject<THREE.Group>;
  originRef: React.RefObject<THREE.Group>;
};

export function SkateboardGroup({
  gripTapeColor,
  boltColor,
  basePlateColor,
  truckColor,
  deckTextureURLs,
  wheelTextureURLs,
  animating,
  showHotspot,
  onClick,
  containerRef,
  originRef,
}: SkateboardGroupProps) {
  return (
    <group ref={originRef}>
      <group ref={containerRef} position={[-0.25, 0, -0.635]}>
        <group position={[0, -0.086, 0.635]}>
          <Skateboard
            gripTapeColor={gripTapeColor}
            boltColor={boltColor}
            basePlateColor={basePlateColor}
            truckColor={truckColor}
            deckTextureURLs={deckTextureURLs}
            wheelTextureURLs={wheelTextureURLs}
            constantWheelSpin
          />

          <Hotspot
            isVisible={!animating && showHotspot.front}
            position={[0, 0.38, 1]}
            color="#B8FC39"
          />
          <mesh position={[0, 0.27, 0.9]} name="front" onClick={onClick}>
            <boxGeometry args={[0.6, 0.2, 0.58]} />
            <meshStandardMaterial visible={false} />
          </mesh>

          <Hotspot
            isVisible={!animating && showHotspot.middle}
            position={[0, 0.33, 0]}
            color="#FF7A51"
          />
          <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
            <boxGeometry args={[0.6, 0.1, 1.2]} />
            <meshStandardMaterial visible={false} />
          </mesh>

          <Hotspot
            isVisible={!animating && showHotspot.back}
            position={[0, 0.35, -0.9]}
            color="#46ACFA"
          />
          <mesh position={[0, 0.27, -0.9]} name="back" onClick={onClick}>
            <boxGeometry args={[0.6, 0.2, 0.58]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
