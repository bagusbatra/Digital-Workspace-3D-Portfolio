import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import LandingPage from "./pages/LandingPage";
import WorkspacePage from "./pages/WorkspacePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ResumePage from "./pages/ResumePage";
import { useUIStore } from "@/state/uiStore";

export default function App() {
  // Hormati preferensi sistem "prefers-reduced-motion" sebagai default awal
  // (PRD §22) — user tetap bisa override manual lewat SettingsToggles.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      useUIStore.setState({ reducedMotion: true });
    }
  }, []);

  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-text"
      >
        Skip to content
      </a>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <Navbar />
        <div id="main-content" className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
