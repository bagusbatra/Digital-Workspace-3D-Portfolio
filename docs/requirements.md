# Requirements Contract — Digital Workspace 3D Portfolio

Status: **LOCKED**

Source of truth hierarchy: PRD (`PRD-Digital-Workspace-3D-Portfolio.md`) → Confirmed technical decisions (lihat `01-DOCUMENTATION.md` §2) → dokumen ini → best practice.

## Confirmed Technical Decisions (final, tidak diubah tanpa Contract Change Request)

| Keputusan | Hasil |
|---|---|
| Backend | Static frontend, tanpa database, tanpa authentication. Satu serverless function untuk contact form. |
| Contact form | Third-party email service, dipanggil dari `api/contact.ts` |
| CMS/Admin | Tidak ada — konten statis di `src/data/*.ts` |
| 3D asset | Custom sederhana untuk hero object (Monitor, Keyboard, Books, Phone) + generic gratis (CC0) untuk prop |
| Stack frontend | React, React Three Fiber, Three.js, Drei, GSAP, TypeScript, Tailwind CSS, Vite |
| State management | Zustand |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |

## Requirement Matrix

| REQ-ID | Description | Priority | Type | Acceptance Criteria | Related Feature |
|---|---|---|---|---|---|
| REQ-001 | Landing page dengan boot sequence + CTA "ENTER WORKSPACE" & "VIEW RESUME" | Mandatory | Explicit | User melihat teks boot bertahap lalu 2 CTA berfungsi | Landing |
| REQ-002 | Loading screen dengan progress % + status text saat asset 3D dimuat | Mandatory | Explicit | Progress bar bergerak 0→100%, ada status text | Loading System |
| REQ-003 | Workspace 3D dapat dirender tanpa error | Mandatory | Explicit | Scene termuat, tidak ada console error | Workspace |
| REQ-004 | Monitor: hover tooltip + klik → kamera + panel Projects | Mandatory | Explicit | Hover→tooltip, klik→kamera transisi+panel terbuka | Monitor Object |
| REQ-005 | Keyboard: klik → terminal Skills | Mandatory | Explicit | Klik→panel skills terbuka | Keyboard Object |
| REQ-006 | Books: klik → panel About | Mandatory | Explicit | Klik→panel about terbuka | Books Object |
| REQ-007 | Phone: klik → panel Contact | Mandatory | Explicit | Klik→panel contact terbuka | Phone Object |
| REQ-008 | Desk Lamp: hover menyala + klik → panel Experience | Mandatory | Explicit | Hover→lampu nyala, klik→panel experience | Lamp Object |
| REQ-009 | Coffee: easter egg | Optional | Explicit | Klik→pesan easter egg | Coffee Object |
| REQ-010 | Project showcase list (≥2 project) | Mandatory | Explicit | List project tampil dari data statis | Projects |
| REQ-011 | Project detail lengkap (name, thumbnail, desc, problem, solution, tech, role, features, result, github, demo) | Mandatory | Explicit | Semua field tampil di halaman detail | Project Detail |
| REQ-012 | About section ringkas | Mandatory | Explicit | Identitas, pendidikan, focus area tampil | About |
| REQ-013 | Skills sebagai kategori tech stack, bukan progress bar | Mandatory | Explicit | Tidak ada representasi persentase palsu | Skills |
| REQ-014 | Experience timeline lengkap | Mandatory | Explicit | Company/position/period/desc/responsibility/tech tampil | Experience |
| REQ-015 | Contact terminal + form | Mandatory | Explicit | Form Name/Email/Subject/Message berfungsi | Contact |
| REQ-016 | Navigasi konvensional tersedia paralel dengan 3D | Mandatory | Explicit | Semua section bisa diakses tanpa 3D | Navbar |
| REQ-017 | Workspace mode nav minimal | Mandatory | Explicit | Hamburger + brand + Exit Workspace tampil di dalam workspace | Navbar |
| REQ-018 | Camera transition smooth, tidak ada cut tiba-tiba | Mandatory | Explicit | Transisi memakai easing/lerp/damp | Camera System |
| REQ-019 | Parallax kamera dari mouse movement (efek kecil) | Mandatory | Explicit | Kamera bergeser halus mengikuti mouse | Camera System |
| REQ-020 | Hover feedback (scale, highlight, tooltip, cursor) | Mandatory | Explicit | Setiap objek 3D merespons hover | Interaction |
| REQ-021 | Scroll mengontrol cinematic transition | Mandatory | Explicit | Scroll memicu transisi terkontrol | Interaction |
| REQ-022 | Performance 60 FPS desktop / 30–60 FPS mobile | Mandatory | Explicit | Diukur dengan profiler | Performance |
| REQ-023 | Optimasi asset (GLB/Draco/KTX2/instancing/frustum culling/baked lighting) | Mandatory | Explicit | Asset dioptimasi sebelum production | Performance |
| REQ-024 | Hindari shadow real-time berlebih, particle berlebih, post-processing berat | Mandatory | Explicit | Tidak ada efek berat tanpa alasan | Performance |
| REQ-025 | Responsive 3 tier (Desktop full 3D / Tablet simplified / Mobile no-3D) | Mandatory | Explicit | Layout berubah sesuai breakpoint | Responsive |
| REQ-026 | Mobile fallback: menu list konvensional | Mandatory | Explicit | Mobile menampilkan list menu, bukan scene 3D penuh | Responsive |
| REQ-027 | Accessibility: skip animation, reduced motion, keyboard nav, contrast, semantic HTML | Mandatory | Explicit | Semua item accessibility terpenuhi | Accessibility |
| REQ-028 | Audio default OFF, tidak autoplay | Mandatory | Explicit | Audio hanya aktif via interaksi user | Audio |
| REQ-029 | Design token warna & tipografi sesuai PRD §24 | Mandatory | Explicit | Tailwind config memakai token yang benar | Visual Design |
| REQ-030 | Lighting setup (ambient/directional/point/lamp/soft shadow) | Mandatory | Explicit | Scene memiliki pencahayaan sesuai spesifikasi | Lighting |
| REQ-031 | Konten data-driven (bukan hardcode di komponen) | Mandatory | Explicit | Data di `src/data/*.ts`, bukan inline JSX | Data Architecture |
| REQ-032 | SEO via HTML biasa (title, meta, H1/H2) | Mandatory | Explicit | Tag SEO ada di DOM, bukan di canvas | SEO |
| REQ-033 | Analytics tracking | Optional | Explicit | Event tracking terpasang jika diimplementasikan | Analytics |
| REQ-034 | Easter egg tambahan (maks 3–5 total) | Optional | Explicit | Bonus non-blocking | Easter Egg |
| REQ-035 | Error state: WebGL unavailable → fallback | Mandatory | Explicit | Fallback UI tampil jika WebGL tidak tersedia | Error State |
| REQ-036 | Error state: asset gagal load → Retry/View Standard | Mandatory | Explicit | UI retry/fallback tampil saat load gagal | Error State |
| REQ-037 | Tidak ada secret/API key di frontend | Mandatory | Explicit | Audit source code tidak menemukan secret | Security |
| REQ-038 | Static portfolio, tidak wajib DB/auth/backend | Mandatory | Explicit | Tidak ada implementasi DB/auth | Architecture |
| REQ-039 | Contact form via email service (mekanisme final) | Mandatory | Explicit + Resolved | `POST /api/contact` mengirim email sukses | Contact API |
| REQ-040 | Deployment via GitHub → Vercel | Mandatory | Explicit | Project ter-deploy dan dapat diakses publik | Deployment |
| REQ-041 | Resume dapat dilihat/diunduh (PDF) | Mandatory | Implied | File PDF resume dapat diakses dari halaman Resume | Resume |
| REQ-042 | State management objek aktif/panel/kamera | Mandatory | Implied | Zustand store mengelola state UI 3D | State Management |
| REQ-043 | WebGL feature detection | Mandatory | Implied | Deteksi WebGL memicu REQ-035 | Error Handling |
| REQ-044 | Device/breakpoint detection | Mandatory | Implied | Breakpoint <768/768-1023/≥1024 diterapkan konsisten | Responsive |
| REQ-045 | Asset loading pipeline (Suspense/preload) | Mandatory | Implied | Loading progress REQ-002 didukung pipeline ini | Loading System |
| REQ-046 | TypeScript schema Project/Skill/ExperienceEntry | Mandatory | Implied | Tipe data konsisten dengan `docs/database-contract.md` | Data Architecture |
| REQ-047 | Validasi input contact form (client + server) | Mandatory | Implied | Validasi client sesuai `docs/api-contract.md`, server tidak mempercayai client | Contact Form |
| REQ-048 | Routing menyatukan Workspace 3D & halaman konvensional | Mandatory | Implied | Semua route dapat diakses langsung via URL | Routing |

## Assumptions

- Konten project mengikuti 2 contoh di PRD (Lab Procurement System, Elips Academy); dapat ditambah tanpa mengubah arsitektur.
- Kontak (email/LinkedIn/GitHub/WhatsApp) adalah placeholder sampai user memberi data asli.
- Resume berupa file PDF statis.
- Browser target: evergreen modern (Chrome/Edge/Firefox/Safari, 2 versi terakhir), WebGL2 tersedia.
- Bahasa UI: Inggris, tidak ada i18n.

## Validation

`[x]` Semua mandatory requirement dari PRD Section 37 (MVP Acceptance Criteria) sudah termapping ke minimal satu REQ-ID di atas.
