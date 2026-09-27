import { Link, useLocation } from "react-router-dom";

const SECTIONS = [
  { label: "ABOUT", to: "/workspace#about" },
  { label: "PROJECTS", to: "/projects" },
  { label: "SKILLS", to: "/workspace#skills" },
  { label: "EXPERIENCE", to: "/workspace#experience" },
  { label: "CONTACT", to: "/workspace#contact" },
];

// Navbar konvensional (PRD §16) — jalur akses ke semua konten yang TIDAK bergantung
// pada interaksi 3D, agar recruiter tidak wajib memahami mekanisme 3D (REQ-016).
export default function Navbar() {
  const location = useLocation();
  const inWorkspace = location.pathname.startsWith("/workspace");

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
            <Link to={s.to} className="text-secondary hover:text-text">
              {s.label}
            </Link>
          </li>
        ))}
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
