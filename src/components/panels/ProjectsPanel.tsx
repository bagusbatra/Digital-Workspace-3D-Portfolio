import { Link } from "react-router-dom";
import PanelShell from "./PanelShell";
import { projects } from "@/data/projects";

// PRD §10 — list ringkas di dalam workspace overlay. Detail lengkap (PRD §11)
// dibuka di halaman terpisah /projects/:id agar bisa diakses langsung via URL (REQ-048)
// tanpa harus lewat interaksi 3D dulu.
export default function ProjectsPanel({ onClose }: { onClose: () => void }) {
  if (projects.length === 0) {
    return (
      <PanelShell title="Projects" onClose={onClose}>
        <p className="text-sm text-secondary">Belum ada project untuk ditampilkan.</p>
      </PanelShell>
    );
  }

  return (
    <PanelShell title="Projects" onClose={onClose}>
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded border border-background p-4">
            <h3 className="text-sm font-semibold">{project.title}</h3>
            <p className="mt-0.5 font-mono text-xs text-secondary">
              {project.technologies.join(" • ")}
            </p>
            <Link
              to={`/projects/${project.id}`}
              onClick={onClose}
              className="mt-3 inline-block rounded border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-text"
            >
              VIEW PROJECT
            </Link>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
