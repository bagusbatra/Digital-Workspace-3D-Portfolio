import MobileMenu from "../../components/MobileMenu";

// Desktop/tablet: scene 3D diimplementasikan di Iterasi 03 (3D Workspace Core).
// Mobile: TIDAK memaksakan workspace 3D penuh (PRD §21) — tampilkan menu konvensional.
export default function WorkspacePage() {
  return (
    <section className="flex h-full flex-col bg-background text-text">
      <div className="hidden flex-1 items-center justify-center md:flex">
        <p className="font-mono text-sm text-secondary">
          [ WORKSPACE 3D — akan diisi di Iterasi 03 ]
        </p>
      </div>
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
