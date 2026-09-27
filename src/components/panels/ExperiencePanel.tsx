import PanelShell from "./PanelShell";
import { experience } from "@/data/experience";

// PRD §14 — timeline experience.
export default function ExperiencePanel({ onClose }: { onClose: () => void }) {
  if (experience.length === 0) {
    return (
      <PanelShell title="Experience" onClose={onClose}>
        <p className="text-sm text-secondary">Belum ada data experience.</p>
      </PanelShell>
    );
  }

  return (
    <PanelShell title="Experience" onClose={onClose}>
      <ol className="space-y-4 border-l border-background pl-4">
        {experience.map((entry) => (
          <li key={entry.id}>
            <p className="font-mono text-xs text-secondary">
              {entry.period.start} — {entry.period.end}
            </p>
            <h3 className="text-sm font-semibold">{entry.position}</h3>
            <p className="text-xs text-secondary">{entry.company}</p>
            <p className="mt-1 text-sm leading-relaxed">{entry.description}</p>
            <ul className="mt-1 list-inside list-disc text-sm text-secondary">
              {entry.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </PanelShell>
  );
}
