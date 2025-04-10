import * as THREE from "three";
import { useEffect } from "react";
import gsap from "gsap";

export function useIdleSway(
  containerRef: React.RefObject<THREE.Group | null>,
  originRef: React.RefObject<THREE.Group | null>
) {
  useEffect(() => {
    if (!containerRef.current || !originRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(
      containerRef.current.position,
      {
        x: 0.2,
        duration: 3,
        ease: "sine.inOut",
      },
      0
    );
    tl.to(
      originRef.current.rotation,
      {
        y: Math.PI / 64,
        duration: 3,
        ease: "sine.inOut",
      },
      0
    );
  }, [containerRef, originRef]);
}
