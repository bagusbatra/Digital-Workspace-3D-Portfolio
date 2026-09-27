import { useEffect, type ReactNode } from "react";

interface PanelShellProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// Frame terminal-style yang dipakai seragam oleh semua panel konten (About/Skills/
// Experience/Projects) agar konsisten dan tidak duplikasi layout close-button/escape-key.
export default function PanelShell({ title, onClose, children }: PanelShellProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={title}
      className="flex max-h-[80vh] w-full max-w-lg flex-col rounded border border-surface bg-surface/95 text-text shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-background px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-wider text-secondary">
          {title}
        </span>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="text-secondary hover:text-text"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto px-5 py-4">{children}</div>
    </div>
  );
}
