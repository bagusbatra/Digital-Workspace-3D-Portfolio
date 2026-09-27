import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import CameraController from "./CameraController";
import Desk from "./objects/Desk";
import Monitor from "./objects/Monitor";
import Keyboard from "./objects/Keyboard";
import Books from "./objects/Books";
import Phone from "./objects/Phone";
import DeskLamp from "./objects/DeskLamp";
import Coffee from "./objects/Coffee";

// Scene root (REQ-003) — dirender hanya di breakpoint tablet/desktop (lihat WorkspacePage,
// mobile memakai fallback non-3D per PRD §21).
export default function Workspace() {
  return (
    <Canvas camera={{ position: [0, 1.6, 3.2], fov: 45 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#0B0D10"]} />
      <Lighting />
      <CameraController />
      <Desk />
      <Monitor />
      <Keyboard />
      <Books />
      <Phone />
      <DeskLamp />
      <Coffee />
    </Canvas>
  );
}
