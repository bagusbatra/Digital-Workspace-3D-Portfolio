import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";

// Function: Easter Egg (REQ-009, Optional). Konten pesan easter egg ditangani
// oleh panel yang membaca activeObject === "coffee" (Iterasi 04/06).
export default function Coffee() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("coffee");

  return (
    <group ref={groupRef} position={[0.55, 0.46, 0.5]} onClick={handleClick} {...handlers}>
      <mesh>
        <cylinderGeometry args={[0.06, 0.05, 0.09, 12]} />
        <meshStandardMaterial color="#8B949E" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.15, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">COFFEE DETECTED</p>
          </div>
        </Html>
      )}
    </group>
  );
}
