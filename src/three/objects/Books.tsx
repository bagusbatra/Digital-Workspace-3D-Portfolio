import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";

// Function: About / Education (REQ-006).
export default function Books() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("books");

  return (
    <group ref={groupRef} position={[-1.4, 0.46, 0.2]} onClick={handleClick} {...handlers}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.06, 0.22]} />
        <meshStandardMaterial color="#2158F5" />
      </mesh>
      <mesh position={[0, 0.07, 0.01]}>
        <boxGeometry args={[0.28, 0.05, 0.2]} />
        <meshStandardMaterial color="#8B949E" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.2, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">ABOUT ME</p>
          </div>
        </Html>
      )}
    </group>
  );
}
