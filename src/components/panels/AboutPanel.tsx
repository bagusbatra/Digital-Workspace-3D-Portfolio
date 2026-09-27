import PanelShell from "./PanelShell";

// PRD §12 — About ringkas. Prosa identitas bersifat statis (bukan entity berulang),
// sehingga sengaja tidak dimasukkan ke docs/database-contract.md.
export default function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell title="About" onClose={onClose}>
      <h2 className="text-lg font-semibold">Bagus Batra</h2>
      <p className="mt-1 font-mono text-xs text-secondary">Web Developer</p>
      <p className="mt-4 text-sm leading-relaxed text-text">
        I build web applications focused on functionality, usability and clean digital
        experiences.
      </p>
      <div className="mt-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-secondary">
          Education
        </h3>
        <p className="mt-1 text-sm">D3 Teknologi Informasi</p>
      </div>
      <div className="mt-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-secondary">Focus</h3>
        <ul className="mt-1 space-y-0.5 text-sm">
          <li>Web Development</li>
          <li>Software Engineering</li>
          <li>Interactive Web</li>
        </ul>
      </div>
    </PanelShell>
  );
}
