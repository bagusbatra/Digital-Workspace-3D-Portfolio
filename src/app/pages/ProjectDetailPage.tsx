import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// PRD §11 — Project Detail lengkap.
export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  useDocumentTitle(project ? project.title : "Project not found");

  if (!project) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-12 text-center text-text">
        <p className="text-sm text-secondary">Project tidak ditemukan.</p>
        <Link to="/projects" className="mt-4 inline-block text-sm text-primary">
          ← Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-12 text-text">
      <Link to="/projects" className="text-xs text-secondary hover:text-text">
        ← Back to Projects
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">{project.title}</h1>
      <p className="mt-1 font-mono text-xs text-secondary">
        {project.technologies.join(" • ")}
      </p>

      <div className="mt-6 space-y-5 text-sm leading-relaxed">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">About</h2>
          <p className="mt-1">{project.description}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Problem</h2>
          <p className="mt-1">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Solution</h2>
          <p className="mt-1">{project.solution}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Role</h2>
          <p className="mt-1">{project.role}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Features</h2>
          <ul className="mt-1 list-inside list-disc">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Result</h2>
          <p className="mt-1">{project.result}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-text"
          >
            LIVE DEMO
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-secondary px-4 py-2 text-xs font-medium text-secondary hover:text-text"
          >
            GITHUB
          </a>
        )}
      </div>
    </section>
  );
}
