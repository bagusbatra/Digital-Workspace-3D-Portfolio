import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUIStore, type ActivePanelId } from "@/state/uiStore";
import SettingsToggles from "./SettingsToggles";

const SECTIONS: { label: string; panel: ActivePanelId }[] = [
  { label: "ABOUT", panel: "about" },
  { label: "SKILLS", panel: "skills" },
  { label: "EXPERIENCE", panel: "experience" },
  { label: "CONTACT", panel: "contact" },
];

// Navbar konvensional (PRD §16) — jalur akses ke semua konten yang TIDAK bergantung
// pada interaksi 3D, agar recruiter tidak wajib memahami mekanisme 3D (REQ-016).
// About/Skills/Experience/Contact dibuka sebagai panel di dalam Workspace (bukan
// halaman terpisah), karena §6 Information Architecture menempatkannya di bawah Workspace.
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const openPanel = useUIStore((s) => s.openPanel);
  const inWorkspace = location.pathname.startsWith("/workspace");
  const isLanding = location.pathname === "/";

  const goToPanel = (panel: ActivePanelId) => {
    openPanel(panel);
    if (!inWorkspace) navigate("/workspace");
  };

  // Landing (PRD §7) sengaja tanpa navbar — layar first-impression yang polos
  // sebelum user masuk ke Workspace, sesuai mockup PRD.
  if (isLanding) {
    return null;
  }

  if (inWorkspace) {
    return (
      <nav className="flex items-center justify-between border-b border-surface bg-background/90 px-4 py-3 text-sm text-text backdrop-blur">
        <button
          aria-label="Open menu"
          className="font-mono text-secondary hover:text-text"
        >
          ☰
        </button>
        <span className="font-medium">BAGUS BATRA</span>
        <div className="flex items-center gap-3">
          <SettingsToggles />
          <Link to="/" className="font-mono text-secondary hover:text-text">
            EXIT WORKSPACE
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 text-sm text-text">
      <Link to="/" className="font-semibold">
        BAGUS BATRA
      </Link>
      <ul className="hidden items-center gap-6 md:flex">
        {SECTIONS.map((s) => (
          <li key={s.label}>
            <button
              onClick={() => goToPanel(s.panel)}
              className="text-secondary hover:text-text"
            >
              {s.label}
            </button>
          </li>
        ))}
        <li>
          <Link to="/projects" className="text-secondary hover:text-text">
            PROJECTS
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <SettingsToggles />
        </div>
        <Link
          to="/resume"
          className="rounded border border-primary px-3 py-1.5 text-primary hover:bg-primary hover:text-text"
        >
          RESUME
        </Link>
      </div>
    </nav>
  );
}
