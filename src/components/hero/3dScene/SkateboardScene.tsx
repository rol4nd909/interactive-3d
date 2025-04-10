import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import { ContactShadows, Environment, Html } from "@react-three/drei";
import { WavyPaths } from "./WavyPaths";
import { SkateboardGroup } from "./SkateboardGroup";
import { CameraController } from "./CameraController";
import { useBoardAnimations } from "@/hooks/useBoardAnimations";
import { useIdleSway } from "@/hooks/useIdleSway";

export function SkateboardScene({
  gripTapeColor,
  boltColor,
  basePlateColor,
  truckColor,
  deckTextureURLs,
  wheelTextureURLs,
}: {
  gripTapeColor: string;
  boltColor: string;
  basePlateColor?: string;
  truckColor: string;
  deckTextureURLs: string[];
  wheelTextureURLs: string[];
}) {
  const originRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  const [animating, setAnimating] = useState(false);
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });

  const { ollie, kickflip, frontside360 } = useBoardAnimations(setAnimating);

  useIdleSway(containerRef, originRef);

  function hideHotspot(name: string) {
    setShowHotspot((prev) => ({ ...prev, [name]: false }));
  }

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;
    const origin = originRef.current;
    const { name } = event.object;

    if (!board || !origin || animating) return;

    // Use a map to handle actions based on the 'name'
    const actions: Record<string, () => void> = {
      back: () => ollie(board),
      middle: () => kickflip(board),
      front: () => frontside360(board, origin),
    };

    // Check if the name exists in the actions map, if so, run the action
    if (name in actions) {
      actions[name]();
    }

    // Check if the name is in the showHotspot and call hideHotspot
    if (name in showHotspot) {
      hideHotspot(name);
    }
  }

  return (
    <group>
      <CameraController />
      <Environment files={`${import.meta.env.BASE_URL}hdr/warehouse-256.hdr`} />

      <SkateboardGroup
        gripTapeColor={gripTapeColor}
        boltColor={boltColor}
        basePlateColor={basePlateColor}
        truckColor={truckColor}
        deckTextureURLs={deckTextureURLs}
        wheelTextureURLs={wheelTextureURLs}
        animating={animating}
        showHotspot={showHotspot}
        onClick={onClick}
        containerRef={containerRef as React.RefObject<THREE.Group>}
        originRef={originRef as React.RefObject<THREE.Group>}
      />

      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />

      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[1, 0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  );
}
