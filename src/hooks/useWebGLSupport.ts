import { useEffect, useState } from "react";

// Deteksi dukungan WebGL2 (REQ-043) — dipakai untuk memicu fallback UI (PRD §33)
// sebelum Canvas R3F dipasang, agar tidak crash di device/browser yang tidak mendukung.
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
