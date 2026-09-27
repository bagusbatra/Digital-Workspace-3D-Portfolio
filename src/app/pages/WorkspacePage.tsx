import { Suspense } from "react";
import MobileMenu from "../../components/MobileMenu";
import WebGLFallback from "../../components/WebGLFallback";
import Workspace from "../../three/Workspace";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { useUIStore } from "@/state/uiStore";

// Desktop/tablet: scene 3D interaktif (Iterasi 03). Panel konten (Iterasi 04)
// akan dirender sebagai overlay berdasarkan uiStore.activePanel.
// Mobile: TIDAK memaksakan workspace 3D penuh (PRD §21) — tampilkan menu konvensional.
export default function WorkspacePage() {
  const webglSupported = useWebGLSupport();
  const activePanel = useUIStore((s) => s.activePanel);

  return (
    <section className="relative flex h-full flex-col bg-background text-text">
      <div className="hidden flex-1 md:block">
        {webglSupported === false ? (
          <WebGLFallback onContinue={() => {}} />
        ) : (
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center font-mono text-sm text-secondary">
                Loading 3D assets...
              </div>
            }
          >
            <Workspace />
          </Suspense>
        )}
      </div>

      {activePanel && (
        <div className="absolute inset-0 hidden items-center justify-center bg-background/80 md:flex">
          <p className="font-mono text-sm text-secondary">
            [ PANEL "{activePanel}" — akan diisi di Iterasi 04 ]
          </p>
        </div>
      )}

      <div className="flex-1 md:hidden">
        <div className="flex flex-col items-center gap-1 pt-10">
          <span className="text-xl font-semibold">BAGUS BATRA</span>
          <span className="font-mono text-xs text-secondary">
            WEB DEVELOPER
          </span>
        </div>
        <MobileMenu />
      </div>
    </section>
  );
}
