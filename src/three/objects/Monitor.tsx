import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";

// Function: Projects (REQ-004). Placeholder primitif — diganti GLB custom di Iterasi polish.
export default function Monitor() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("monitor");

  return (
    <group ref={groupRef} position={[0, 0.75, -0.6]} onClick={handleClick} {...handlers}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.9, 0.55, 0.05]} />
        <meshStandardMaterial color="#0B0D10" emissive="#2158F5" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#14171C" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.65, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">PROJECTS</p>
            <p className="text-secondary">Explore my work</p>
          </div>
        </Html>
      )}
    </group>
  );
}
