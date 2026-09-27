import type { Project } from "./types";

// Konten mengikuti PRD §10-11. Detail Elips Academy Website belum selengkap Lab
// Procurement System di PRD asli — placeholder di bawah ditandai untuk diisi ulang
// dengan copy final dari user (lihat docs/requirements.md > Assumptions).
export const projects: Project[] = [
  {
    id: "laboratory-procurement-system",
    title: "Laboratory Procurement System",
    description: "A web-based procurement system for managing laboratory equipment and supplies.",
    problem:
      "Proses procurement laboratorium dilakukan manual, menyebabkan pencatatan yang tidak konsisten dan sulit dilacak.",
    solution:
      "Membangun sistem procurement terpusat yang mengelola seluruh alur dari permintaan produk hingga laporan penerimaan barang.",
    role: "Full-stack Developer",
    features: [
      "Product management",
      "Quotation",
      "Order",
      "Delivery",
      "Receipt",
      "Reporting",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
    result:
      "Mempercepat proses procurement dan memberikan visibilitas penuh terhadap status pengadaan barang.",
    thumbnail: "/projects/lab-procurement.png",
    github: "",
    demoUrl: "",
  },
  {
    id: "elips-academy-website",
    title: "Elips Academy Website",
    description: "Company/academy profile website with course and program information.",
    problem:
      "Informasi program dan aktivitas akademi belum tersedia secara online, menyulitkan calon peserta mencari informasi.",
    solution:
      "Membangun website profil akademi yang menampilkan program, informasi, dan kontak secara terstruktur.",
    role: "Web Developer",
    features: ["Program listing", "Informasi akademi", "Contact form"],
    technologies: ["Laravel", "JavaScript"],
    result: "Memberikan kanal informasi resmi yang mudah diakses calon peserta secara online.",
    thumbnail: "/projects/elips-academy.png",
    github: "",
    demoUrl: "",
  },
];
