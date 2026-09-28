import { useUIStore } from "@/state/uiStore";

// PRD §22 — toggle "[ REDUCE MOTION ]" untuk user yang tidak ingin animasi
// berlebihan, dan §23 toggle audio (default OFF, tidak autoplay).
export default function SettingsToggles() {
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const audioEnabled = useUIStore((s) => s.audioEnabled);
  const toggleReducedMotion = useUIStore((s) => s.toggleReducedMotion);
  const toggleAudio = useUIStore((s) => s.toggleAudio);

  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <button
        onClick={toggleReducedMotion}
        aria-pressed={reducedMotion}
        className="rounded border border-surface px-2 py-1 text-secondary hover:text-text"
      >
        [ REDUCE MOTION: {reducedMotion ? "ON" : "OFF"} ]
      </button>
      <button
        onClick={toggleAudio}
        aria-pressed={audioEnabled}
        className="rounded border border-surface px-2 py-1 text-secondary hover:text-text"
      >
        [ AUDIO: {audioEnabled ? "ON" : "OFF"} ]
      </button>
    </div>
  );
}
