import { useUIStore, type ActiveObjectId } from "@/state/uiStore";

// Klik objek 3D (REQ-004..008) → set activeObject di store global.
// CameraController membaca activeObject ini untuk memicu transisi kamera.
export function useObjectClick(id: ActiveObjectId) {
  const setActiveObject = useUIStore((s) => s.setActiveObject);

  return (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setActiveObject(id);
  };
}
