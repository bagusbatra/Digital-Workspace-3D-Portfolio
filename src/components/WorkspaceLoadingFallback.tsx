import { useProgress } from "@react-three/drei";

// PRD §19 — progress % + status text nyata (bukan spinner generik), dibaca dari
// THREE.DefaultLoadingManager via drei. Saat ini objek masih primitif (tanpa GLB),
// sehingga progress akan langsung 100% — infrastruktur ini tetap dipasang agar
// siap dipakai saat asset GLB/texture ditambahkan di fase optimization.
export default function WorkspaceLoadingFallback() {
  const { progress, item } = useProgress();
  const percent = Math.round(progress);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-col items-center justify-center gap-3 font-mono text-sm text-secondary"
    >
      <p className="text-text">LOADING WORKSPACE</p>
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full bg-primary transition-[width] duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs">{item ? `Loading ${item}...` : "Loading 3D assets..."}</p>
      <p className="text-xs">{percent}%</p>
    </div>
  );
}
