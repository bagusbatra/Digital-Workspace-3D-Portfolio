import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUIStore } from "@/state/uiStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const BOOT_LINES = [
  "INITIALIZING WORKSPACE...",
  "Loading environment...",
  "Loading projects...",
  "Loading experience...",
  "Loading skills...",
  "SYSTEM READY",
];

const LINE_DELAY_MS = 350;

// PRD §7 — boot sequence bertahap sebelum CTA. Dilewati langsung jika reduced
// motion aktif (PRD §22), dan selalu bisa di-skip manual (accessibility).
export default function LandingPage() {
  useDocumentTitle("Web Developer Portfolio");
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const [lineIndex, setLineIndex] = useState(reducedMotion ? BOOT_LINES.length : 0);
  const bootDone = lineIndex >= BOOT_LINES.length;

  useEffect(() => {
    if (reducedMotion || bootDone) return;
    const timer = setTimeout(() => setLineIndex((i) => i + 1), LINE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [lineIndex, reducedMotion, bootDone]);

  if (!bootDone) {
    return (
      <section className="flex h-full flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <div aria-live="polite" className="font-mono text-sm text-secondary">
          {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <p key={i} className={i === lineIndex ? "text-text" : undefined}>
              {line}
            </p>
          ))}
        </div>
        <button
          onClick={() => setLineIndex(BOOT_LINES.length)}
          className="mt-4 text-xs text-secondary underline-offset-2 hover:text-text hover:underline"
        >
          Skip
        </button>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 bg-background px-6 text-center text-text">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">BAGUS BATRA</h1>
        <p className="mt-1 font-mono text-sm text-secondary">WEB DEVELOPER</p>
      </div>
      <div className="flex gap-4">
        <Link
          to="/workspace"
          className="rounded border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-text"
        >
          ENTER WORKSPACE
        </Link>
        <Link
          to="/resume"
          className="px-5 py-2 text-sm font-medium text-secondary transition hover:text-text"
        >
          VIEW RESUME
        </Link>
      </div>
    </section>
  );
}
