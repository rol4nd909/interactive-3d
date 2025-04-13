import * as THREE from "three";
import { useCustomizerControls } from "@/hooks/useCustomizerControls";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Skateboard } from "../skateboard/Skateboard";

const DEFAULT_GRIPTAPE_COLOR = "rebeccapurple";
const DEFAULT_BOLT_COLOR = "hotpink";
const DEFAULT_BASEPLATE_COLOR = "cyan";
const DEFAULT_TRUCK_COLOR = "white";
const DEFAULT_ACTIVE_DECK_INDEX = 0;
const DEFAULT_ACTIVE_WHEEL_INDEX = 0;

const ENVIRONMENT_COLOR = "#3B3A3A";

type PreviewProps = {
  deckTextureURLs: string[];
  wheelTextureURLs: string[];
};

export function Preview({ deckTextureURLs, wheelTextureURLs }: PreviewProps) {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  const {
    selectedGripTape,
    selectedBolts,
    selectedBaseplates,
    selectedTrucks,
    selectedDeck,
    selectedWheels,
  } = useCustomizerControls();

  const gripTapeColor = selectedGripTape?.color || DEFAULT_GRIPTAPE_COLOR;
  const boltColor = selectedBolts?.color || DEFAULT_BOLT_COLOR;
  const basePlateColor = selectedBaseplates?.color || DEFAULT_BASEPLATE_COLOR;
  const truckColor = selectedTrucks?.color || DEFAULT_TRUCK_COLOR;

  const activeDeckIndex = deckTextureURLs.findIndex(
    (url) => url === selectedDeck?.texture
  );
  const activeWheelIndex = wheelTextureURLs.findIndex(
    (url) => url === selectedWheels?.texture
  );
  const deckIndex =
    activeDeckIndex >= 0 ? activeDeckIndex : DEFAULT_ACTIVE_DECK_INDEX;
  const wheelIndex =
    activeWheelIndex >= 0 ? activeWheelIndex : DEFAULT_ACTIVE_WHEEL_INDEX;

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0)
    );
  }, [selectedDeck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0.15, 0.3, 0),
      new THREE.Vector3(-2.13, 0.6, -1.53)
    );
  }, [selectedGripTape]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.12, 0.29, 0.57),
      new THREE.Vector3(0.1, 0.25, 0.9)
    );
  }, [selectedTrucks]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.2, 0.29, 0.57),
      new THREE.Vector3(0.1, 0.25, 0.9)
    );
  }, [selectedBaseplates]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.08, 0.54, 0.64),
      new THREE.Vector3(0.09, 1, 0.9)
    );
  }, [selectedWheels]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.25, 0.3, 0.62),
      new THREE.Vector3(-0.5, 0.35, 0.8)
    );
  }, [selectedBolts]);

  function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
    if (!cameraControls.current) return;

    cameraControls.current.setTarget(target.x, target.y, target.z, true);
    cameraControls.current.setPosition(pos.x, pos.y, pos.z, true);
  }

  function onCameraControlStart() {
    if (
      !cameraControls.current ||
      !floorRef.current ||
      cameraControls.current.colliderMeshes.length > 0
    )
      return;

    cameraControls.current.colliderMeshes = [floorRef.current];
  }

  return (
    <Canvas camera={{ position: [2.5, 1, 0], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <Environment
          files={`${import.meta.env.BASE_URL}hdr/warehouse-512.hdr`}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        <StageFloor />
        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={floorRef}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        <Skateboard
          gripTapeColor={gripTapeColor}
          boltColor={boltColor}
          basePlateColor={basePlateColor}
          truckColor={truckColor}
          deckTextureURLs={deckTextureURLs}
          wheelTextureURLs={wheelTextureURLs}
          activeDeckIndex={deckIndex}
          activeWheelIndex={wheelIndex}
          pose="side"
        />

        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
          onStart={onCameraControlStart}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture(
    `${import.meta.env.BASE_URL}concrete-normal.avif`
  );
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap: normalMap,
  });

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
