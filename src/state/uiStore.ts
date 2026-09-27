import { create } from "zustand";

export type ActiveObjectId =
  | "monitor"
  | "keyboard"
  | "books"
  | "phone"
  | "lamp"
  | "coffee"
  | null;

export type ActivePanelId =
  | "projects"
  | "skills"
  | "about"
  | "contact"
  | "experience"
  | null;

interface UIState {
  activeObject: ActiveObjectId;
  activePanel: ActivePanelId;
  reducedMotion: boolean;
  audioEnabled: boolean;
  setActiveObject: (id: ActiveObjectId) => void;
  openPanel: (panel: ActivePanelId) => void;
  closePanel: () => void;
  toggleReducedMotion: () => void;
  toggleAudio: () => void;
}

// Mapping objek 3D -> panel section mengikuti konvensi penamaan di shared contract
// (lihat docs/architecture.md) agar konsisten antara three/interactions dan UI panel.
const OBJECT_TO_PANEL: Record<Exclude<ActiveObjectId, null>, ActivePanelId> = {
  monitor: "projects",
  keyboard: "skills",
  books: "about",
  phone: "contact",
  lamp: "experience",
  coffee: null,
};

export const useUIStore = create<UIState>((set) => ({
  activeObject: null,
  activePanel: null,
  reducedMotion: false,
  audioEnabled: false,
  setActiveObject: (id) =>
    set({
      activeObject: id,
      activePanel: id ? OBJECT_TO_PANEL[id] : null,
    }),
  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null, activeObject: null }),
  toggleReducedMotion: () =>
    set((state) => ({ reducedMotion: !state.reducedMotion })),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
}));
