import { useRef } from "react";
import type { Group } from "three";
import { Html } from "@react-three/drei";
import { useHoverScale } from "../interactions/HoverManager";
import { useObjectClick } from "../interactions/ClickManager";
import { useUIStore } from "@/state/uiStore";

// Function: Experience (REQ-008). Lampu menyala saat hover ATAU saat objek ini aktif.
export default function DeskLamp() {
  const groupRef = useRef<Group>(null);
  const { hovered, handlers } = useHoverScale(groupRef);
  const handleClick = useObjectClick("lamp");
  const isActive = useUIStore((s) => s.activeObject === "lamp");
  const lampOn = hovered || isActive;

  return (
    <group ref={groupRef} position={[1.2, 0.46, 0.4]} onClick={handleClick} {...handlers}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#3A414C" />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <coneGeometry args={[0.12, 0.18, 12]} />
        <meshStandardMaterial
          color="#F4F6F9"
          emissive="#F4F6F9"
          emissiveIntensity={lampOn ? 0.8 : 0}
        />
      </mesh>
      <pointLight
        position={[0, 0.5, 0.1]}
        intensity={lampOn ? 1.1 : 0}
        color="#F4F6F9"
        distance={3}
      />
      {hovered && (
        <Html position={[0, 0.7, 0]} center distanceFactor={4}>
          <div className="whitespace-nowrap rounded bg-surface px-3 py-1.5 text-xs text-text shadow-lg">
            <p className="font-medium">EXPERIENCE</p>
          </div>
        </Html>
      )}
    </group>
  );
}
