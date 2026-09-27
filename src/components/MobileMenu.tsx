import { Link } from "react-router-dom";
import { useUIStore, type ActivePanelId } from "@/state/uiStore";

const ITEMS: { label: string; panel: ActivePanelId }[] = [
  { label: "ABOUT", panel: "about" },
  { label: "SKILLS", panel: "skills" },
  { label: "EXPERIENCE", panel: "experience" },
  { label: "CONTACT", panel: "contact" },
];

// Fallback navigasi mobile (PRD §21) — tidak memaksakan workspace 3D penuh di layar kecil.
// Item konten dibuka sebagai panel (uiStore), Projects tetap link ke halaman terpisah.
export default function MobileMenu() {
  const openPanel = useUIStore((s) => s.openPanel);

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex flex-col gap-3 px-6 py-8"
    >
      {ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => openPanel(item.panel)}
          className="rounded border border-surface bg-surface px-4 py-3 text-center text-sm font-medium text-text"
        >
          {item.label}
        </button>
      ))}
      <Link
        to="/projects"
        className="rounded border border-surface bg-surface px-4 py-3 text-center text-sm font-medium text-text"
      >
        PROJECTS
      </Link>
    </nav>
  );
}
