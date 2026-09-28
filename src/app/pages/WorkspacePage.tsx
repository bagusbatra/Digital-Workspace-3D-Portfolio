import { Suspense } from "react";
import MobileMenu from "../../components/MobileMenu";
import WebGLFallback from "../../components/WebGLFallback";
import Workspace from "../../three/Workspace";
import WorkspaceLoadingFallback from "../../components/WorkspaceLoadingFallback";
import AboutPanel from "../../components/panels/AboutPanel";
import SkillsPanel from "../../components/panels/SkillsPanel";
import ExperiencePanel from "../../components/panels/ExperiencePanel";
import ProjectsPanel from "../../components/panels/ProjectsPanel";
import ContactPanel from "../../components/panels/ContactPanel";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useUIStore } from "@/state/uiStore";

// Desktop/tablet: scene 3D interaktif. Mobile: fallback menu konvensional (PRD §21).
// Panel konten (About/Skills/Experience/Projects) tampil di SEMUA breakpoint, karena
// baik interaksi 3D maupun MobileMenu sama-sama memicu uiStore.activePanel.
// Contact panel diimplementasikan di Iterasi 05.
export default function WorkspacePage() {
  useDocumentTitle("Workspace");
  const webglSupported = useWebGLSupport();
  const activeObject = useUIStore((s) => s.activeObject);
  const activePanel = useUIStore((s) => s.activePanel);
  const closePanel = useUIStore((s) => s.closePanel);

  const isCoffeeEasterEgg = activeObject === "coffee";
  const hasOverlay = Boolean(activePanel) || isCoffeeEasterEgg;

  return (
    <section className="relative flex h-full flex-col bg-background text-text">
      <h1 className="sr-only">Digital Workspace — Bagus Batra</h1>

      <div className="hidden flex-1 md:block">
        {webglSupported === false ? (
          <WebGLFallback onContinue={() => {}} />
        ) : (
          <Suspense fallback={<WorkspaceLoadingFallback />}>
            <Workspace />
          </Suspense>
        )}
      </div>

      <div className="flex-1 md:hidden">
        <div className="flex flex-col items-center gap-1 pt-10">
          <span className="text-xl font-semibold">BAGUS BATRA</span>
          <span className="font-mono text-xs text-secondary">WEB DEVELOPER</span>
        </div>
        <MobileMenu />
      </div>

      {hasOverlay && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 px-4">
          {activePanel === "about" && <AboutPanel onClose={closePanel} />}
          {activePanel === "skills" && <SkillsPanel onClose={closePanel} />}
          {activePanel === "experience" && <ExperiencePanel onClose={closePanel} />}
          {activePanel === "projects" && <ProjectsPanel onClose={closePanel} />}
          {activePanel === "contact" && <ContactPanel onClose={closePanel} />}
          {isCoffeeEasterEgg && (
            <div className="rounded border border-surface bg-surface px-6 py-4 text-center">
              <p className="font-mono text-sm font-medium">COFFEE DETECTED</p>
              <p className="mt-1 font-mono text-xs text-secondary">
                Developer productivity: +25%
              </p>
              <p className="mt-1 font-mono text-xs text-primary">STATUS: READY TO CODE</p>
              <button
                onClick={closePanel}
                className="mt-3 text-xs text-secondary hover:text-text"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
