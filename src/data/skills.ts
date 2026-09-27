import type { Skill } from "./types";

// PRD §13 — kategorikal, tanpa progress bar/persentase palsu (REQ-013).
export const skills: Skill[] = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
  { category: "Backend", items: ["PHP", "Laravel"] },
  { category: "Database", items: ["MySQL"] },
  { category: "Tools", items: ["Git", "GitHub"] },
  { category: "3D", items: ["Three.js", "WebGL"] },
];
