import { useState, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";

// Hover feedback (REQ-020): scale kecil + cursor pointer, dipakai seragam oleh
// semua objek 3D agar konsisten tanpa duplikasi logic di setiap komponen.
export function useHoverScale(groupRef: RefObject<Group>, targetScale = 1.06) {
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = hovered ? targetScale : 1;
    const next = MathUtils.damp(groupRef.current.scale.x, target, 8, delta);
    groupRef.current.scale.setScalar(next);
  });

  const handlers = {
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setHovered(true);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setHovered(false);
      document.body.style.cursor = "auto";
    },
  };

  return { hovered, handlers };
}
