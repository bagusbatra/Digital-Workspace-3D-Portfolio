import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";

// Function: Contact (REQ-007).
export default function Phone() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("phone");

  return (
    <group ref={groupRef} position={[1.4, 0.46, 0.2]} onClick={handleClick} {...handlers}>
      <mesh rotation={[-Math.PI / 2.4, 0, 0]}>
        <boxGeometry args={[0.16, 0.32, 0.02]} />
        <meshStandardMaterial color="#2A2F38" emissive="#2158F5" emissiveIntensity={0.35} />
      </mesh>
      {hovered && (
        <Html position={[0, 0.2, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">CONTACT</p>
          </div>
        </Html>
      )}
    </group>
  );
}
