import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useUIStore, type ActiveObjectId } from "@/state/uiStore";

// Target kamera per objek (REQ-018) — posisi + titik pandang saat objek diklik.
// Default view = kamera menghadap desk secara umum (PRD §17).
const CAMERA_TARGETS: Record<
  Exclude<ActiveObjectId, null>,
  { position: [number, number, number]; lookAt: [number, number, number] }
> = {
  monitor: { position: [0, 1.3, 1.4], lookAt: [0, 1.1, -0.6] },
  keyboard: { position: [0, 1.1, 1.1], lookAt: [0, 0.85, 0.1] },
  books: { position: [-1.4, 1.1, 1.3], lookAt: [-1.4, 0.9, 0.2] },
  phone: { position: [1.4, 1.1, 1.3], lookAt: [1.4, 0.9, 0.2] },
  lamp: { position: [1.2, 1.4, 1.2], lookAt: [1.2, 1.1, 0.4] },
  coffee: { position: [0.6, 1.2, 1.3], lookAt: [0.6, 0.9, 0.5] },
};

const DEFAULT_VIEW = {
  position: [0, 1.6, 3.2] as [number, number, number],
  lookAt: [0, 0.9, 0] as [number, number, number],
};

// REQ-018/019 — transisi kamera smooth (damp, bukan cut tiba-tiba) + parallax
// halus dari posisi mouse saat idle (tidak ada objek aktif).
export default function CameraController() {
  const { camera } = useThree();
  const activeObject = useUIStore((s) => s.activeObject);
  const reducedMotion = useUIStore((s) => s.reducedMotion);

  const mouse = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new Vector3(...DEFAULT_VIEW.lookAt));

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((_, delta) => {
    const target = activeObject ? CAMERA_TARGETS[activeObject] : DEFAULT_VIEW;
    const dampFactor = reducedMotion ? 20 : 6;

    let [tx, ty, tz] = target.position;

    // Parallax kecil hanya saat idle, dimatikan jika reduced motion aktif (PRD §22).
    if (!activeObject && !reducedMotion) {
      tx += mouse.current.x * 0.15;
      ty += -mouse.current.y * 0.08;
    }

    camera.position.x = MathUtils.damp(camera.position.x, tx, dampFactor, delta);
    camera.position.y = MathUtils.damp(camera.position.y, ty, dampFactor, delta);
    camera.position.z = MathUtils.damp(camera.position.z, tz, dampFactor, delta);

    lookAtTarget.current.set(
      MathUtils.damp(lookAtTarget.current.x, target.lookAt[0], dampFactor, delta),
      MathUtils.damp(lookAtTarget.current.y, target.lookAt[1], dampFactor, delta),
      MathUtils.damp(lookAtTarget.current.z, target.lookAt[2], dampFactor, delta),
    );
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
