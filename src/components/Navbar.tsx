import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUIStore, type ActivePanelId } from "@/state/uiStore";

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

  const goToPanel = (panel: ActivePanelId) => {
    openPanel(panel);
    if (!inWorkspace) navigate("/workspace");
  };

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
        <Link to="/" className="font-mono text-secondary hover:text-text">
          EXIT WORKSPACE
        </Link>
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
      <Link
        to="/resume"
        className="rounded border border-primary px-3 py-1.5 text-primary hover:bg-primary hover:text-text"
      >
        RESUME
      </Link>
    </nav>
  );
}
