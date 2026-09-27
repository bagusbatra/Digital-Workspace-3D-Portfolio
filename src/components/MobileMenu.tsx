import { Link } from "react-router-dom";

const ITEMS = [
  { label: "ABOUT", to: "/workspace#about" },
  { label: "PROJECTS", to: "/projects" },
  { label: "SKILLS", to: "/workspace#skills" },
  { label: "EXPERIENCE", to: "/workspace#experience" },
  { label: "CONTACT", to: "/workspace#contact" },
];

// Fallback navigasi mobile (PRD §21) — tidak memaksakan workspace 3D penuh di layar kecil.
export default function MobileMenu() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="flex flex-col gap-3 px-6 py-8 md:hidden"
    >
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="rounded border border-surface bg-surface px-4 py-3 text-center text-sm font-medium text-text"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
