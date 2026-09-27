import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";

// Function: Skills (REQ-005).
export default function Keyboard() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("keyboard");

  return (
    <group ref={groupRef} position={[0, 0.46, 0.35]} onClick={handleClick} {...handlers}>
      <mesh>
        <boxGeometry args={[0.55, 0.03, 0.2]} />
        <meshStandardMaterial color="#14171C" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.15, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">SKILLS</p>
          </div>
        </Html>
      )}
    </group>
  );
}
