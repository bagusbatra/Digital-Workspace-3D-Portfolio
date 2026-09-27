// Tipe data mengikuti persis docs/database-contract.md (LOCKED).
// Jangan menambah field baru di sini tanpa Contract Change Request ke Agent 1.

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  technologies: string[];
  result: string;
  thumbnail: string;
  github?: string;
  demoUrl?: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools" | "3D";

export interface Skill {
  category: SkillCategory;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  period: {
    start: string;
    end: string | "Present";
  };
  description: string;
  responsibilities: string[];
  technologies: string[];
}
