import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { INITIAL_CAMERA_POSITION, LOOK_AT_VECTOR } from "@/constants/camera";

export function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(LOOK_AT_VECTOR);

    setZoom();

    window.addEventListener("resize", setZoom);

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);
      camera.position.set(
        INITIAL_CAMERA_POSITION[0] * scale,
        INITIAL_CAMERA_POSITION[1] * scale,
        INITIAL_CAMERA_POSITION[2] * scale
      );
    }

    return () => window.removeEventListener("resize", setZoom);
  }, [camera]);

  return null;
}
