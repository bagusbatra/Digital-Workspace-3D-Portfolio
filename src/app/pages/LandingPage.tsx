import { Link } from "react-router-dom";

// Placeholder — boot sequence & CTA penuh diimplementasikan di Iterasi 06 (UI/UX Refinement).
export default function LandingPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 bg-background px-6 text-center text-text">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">BAGUS BATRA</h1>
        <p className="mt-1 font-mono text-sm text-secondary">WEB DEVELOPER</p>
      </div>
      <div className="flex gap-4">
        <Link
          to="/workspace"
          className="rounded border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-text"
        >
          ENTER WORKSPACE
        </Link>
        <Link
          to="/resume"
          className="px-5 py-2 text-sm font-medium text-secondary transition hover:text-text"
        >
          VIEW RESUME
        </Link>
      </div>
    </section>
  );
}
