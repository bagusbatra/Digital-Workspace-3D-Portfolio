import type { ExperienceEntry } from "./types";

// PRD §14 menampilkan ketiga peran ini dalam satu grup timeline "2026" tanpa
// merinci rentang tahun terpisah — period di bawah mengikuti apa adanya dari PRD
// (lihat docs/requirements.md > Assumptions terkait presisi tanggal).
export const experience: ExperienceEntry[] = [
  {
    id: "it-programmer",
    company: "Enterprise Internal System",
    position: "IT Programmer",
    period: { start: "2026", end: "Present" },
    description:
      "Mengembangkan dan memelihara sistem internal enterprise untuk mendukung operasional bisnis.",
    responsibilities: [
      "Membangun modul aplikasi internal",
      "Memelihara dan melakukan debugging sistem existing",
      "Berkolaborasi dengan tim untuk requirement bisnis",
    ],
    technologies: ["Laravel", "MySQL", "JavaScript"],
  },
  {
    id: "freelance-web-developer",
    company: "Freelance",
    position: "Freelance Web Developer",
    period: { start: "2026", end: "Present" },
    description: "Mengerjakan berbagai project web development untuk klien.",
    responsibilities: [
      "Analisis kebutuhan klien",
      "Desain & implementasi aplikasi web",
      "Deployment & maintenance",
    ],
    technologies: ["Laravel", "JavaScript", "MySQL"],
  },
  {
    id: "it-trainer",
    company: "Training Institute",
    position: "IT Trainer",
    period: { start: "2026", end: "Present" },
    description: "Mengajar materi web development & komputer.",
    responsibilities: [
      "Menyusun materi pelatihan",
      "Mengajar web development & computer literacy",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];
