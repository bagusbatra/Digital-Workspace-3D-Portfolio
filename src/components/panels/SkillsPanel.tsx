import PanelShell from "./PanelShell";
import { skills } from "@/data/skills";

// PRD §13 — kategorikal, BUKAN progress bar (REQ-013).
export default function SkillsPanel({ onClose }: { onClose: () => void }) {
  if (skills.length === 0) {
    return (
      <PanelShell title="Skills" onClose={onClose}>
        <p className="text-sm text-secondary">Belum ada data skill.</p>
      </PanelShell>
    );
  }

  return (
    <PanelShell title="Skills" onClose={onClose}>
      <p className="font-mono text-xs text-secondary">$ skills</p>
      <div className="mt-3 space-y-4">
        {skills.map((skill) => (
          <div key={skill.category}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
              {skill.category}
            </h3>
            <ul className="mt-1 space-y-0.5 text-sm">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
