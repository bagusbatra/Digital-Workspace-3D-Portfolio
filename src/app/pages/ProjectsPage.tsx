import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// REQ-010 — akses non-3D ke project list (§6 Information Architecture).
export default function ProjectsPage() {
  useDocumentTitle("Projects");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-text">
      <h1 className="text-2xl font-semibold">Projects</h1>

      {projects.length === 0 ? (
        <p className="mt-6 text-sm text-secondary">Belum ada project untuk ditampilkan.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded border border-surface bg-surface p-5">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="mt-1 font-mono text-xs text-secondary">
                {project.technologies.join(" • ")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text">{project.description}</p>
              <Link
                to={`/projects/${project.id}`}
                className="mt-4 inline-block rounded border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-text"
              >
                VIEW PROJECT
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
