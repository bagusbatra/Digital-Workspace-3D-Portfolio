// PRD §33 — fallback saat WebGL tidak tersedia, bukan blank/crash screen.
export default function WebGLFallback({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-background px-6 text-center text-text">
      <h2 className="text-lg font-semibold">3D EXPERIENCE UNAVAILABLE</h2>
      <p className="max-w-sm text-sm text-secondary">
        Your browser/device doesn&apos;t support the full 3D experience. You can still explore my
        portfolio using the standard interface.
      </p>
      <button
        onClick={onContinue}
        className="rounded border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-text"
      >
        CONTINUE
      </button>
    </div>
  );
}
