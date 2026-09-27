# Architecture Contract — Digital Workspace 3D Portfolio

Status: **LOCKED**

## Frontend Architecture

- **Framework**: React 18 + Vite + TypeScript, SPA dengan `react-router-dom`.
- **3D layer**: React Three Fiber + Three.js + Drei di atas React tree yang sama (bukan iframe/canvas terpisah dari DOM), agar UI panel & SEO tetap DOM-native.
- **State management**: Zustand (`src/state/uiStore.ts`) — menyimpan `activeObject`, `activePanel`, `reducedMotion`, `audioEnabled`. Dipilih karena ringan dan tidak memerlukan Provider wrapper seperti Context untuk state yang diakses lintas komponen 3D dan UI overlay.
- **Folder responsibility**:
  ```
  src/app/            → App shell, routing, page-level containers
  src/components/     → UI non-3D (Navbar, panel-panel konten, form)
  src/three/          → Scene, camera, lighting, objek 3D, interaction manager
  src/data/           → Data statis (projects, skills, experience) — sumber tunggal konten
  src/state/          → Zustand store
  src/hooks/          → Custom hook (breakpoint detection, reduced-motion, dll.)
  src/lib/            → Utility & API client kecil (fetch wrapper ke /api/contact)
  src/styles/         → Global CSS + Tailwind entry
  ```
- **Routing**: `/` (Landing), `/workspace` (3D scene + panel overlay), `/projects`, `/projects/:id`, `/resume`.

## Backend Architecture

- **Tidak ada server framework, tidak ada REST API surface luas.** Satu-satunya server-side logic: `api/contact.ts`, serverless function di Vercel.
- Function menerima `POST`, memvalidasi payload, meneruskan ke email service pihak ketiga, mengembalikan response terstandar (lihat `docs/api-contract.md`).
- Tidak ada middleware auth, tidak ada session.

## Database

**Tidak ada relational database.** Konten (`Project`, `Skill`, `ExperienceEntry`) adalah data statis TypeScript di `src/data/*.ts`, di-bundle ke frontend saat build, versioned di git. Skema field didokumentasikan di `docs/database-contract.md` (nama file dipertahankan sesuai konvensi meski tidak ada DB relasional).

## External Services

- **Email service** (Resend/EmailJS — vendor final ditentukan Agent 3 saat implementasi) — dipanggil dari `api/contact.ts` menggunakan API key di environment variable.
- **Vercel** — hosting frontend statis + eksekusi serverless function di folder `api/` dalam repo yang sama (bukan repo/deployment terpisah).

## Data Flow

```
(1) Render Workspace dari data statis
    src/data/*.ts → src/three/objects/* & src/components/*Panel.tsx (via import langsung, build-time)

(2) Interaksi objek 3D
    User klik objek 3D → ClickManager → uiStore.setActiveObject()
    → CameraController animasikan transisi (GSAP/lerp/damp)
    → uiStore.activePanel berubah → panel UI terkait di-render

(3) Contact form submission
    ContactPanel (form) → validasi client (sesuai api-contract.md)
    → fetch POST /api/contact → serverless function
    → validasi server (ulang, tidak percaya client) → email provider
    → response { success, error? } → ContactPanel render success/error state
```

## Authentication Flow

**Tidak ada.** Tidak ada user account, session, atau data yang dilindungi per-user. Endpoint `/api/contact` bersifat public, dilindungi rate limiting (bukan auth) — lihat `docs/api-contract.md` dan `03-BACKEND.md` Iterasi 05.

## Major Technical Decisions (Architecture Decision Record ringkas)

| Keputusan | Alasan |
|---|---|
| Static frontend + 1 serverless function (bukan Laravel+MySQL) | Scope portfolio personal tidak memerlukan data dinamis/multi-user; mengurangi permukaan keamanan (tanpa DB/auth untuk dijaga) dan waktu deployment |
| Zustand dibanding React Context untuk state 3D | Menghindari re-render tree besar saat state kamera/objek berubah frekuensi tinggi; API lebih ringkas untuk state lintas Canvas/DOM |
| Data statis dibanding CMS | Konten portfolio jarang berubah; git-versioned content lebih sederhana untuk single-maintainer tanpa menambah biaya infra CMS/DB |
| Serverless function co-located di repo yang sama (bukan backend repo terpisah) | Selaras dengan model deployment Vercel, menghindari kebutuhan orkestrasi multi-repo/multi-deploy untuk scope sekecil ini |
