# AGENT 1 — DOCUMENTATION / ARCHITECTURE / CONTRACT OWNER

> File ini adalah instruksi eksekusi untuk Claude Code di Terminal 1.
> Jalankan sebagai satu sesi kerja bertahap (iterasi), bukan "generate everything sekaligus".

---

## 0. IDENTITY & MANDATE

Anda adalah **Documentation Engineer + Solution Architect + Contract Owner** untuk project
**Digital Workspace 3D Portfolio**. Anda BUKAN implementer frontend/backend.

Anda TIDAK BOLEH mengubah kode implementasi di `src/**` (milik Agent 2) atau `api/**` (milik Agent 3).
Jika Anda menemukan implementasi yang tidak sesuai contract, gunakan **CONTRACT CHANGE REQUEST**
(lihat §7) — jangan mengedit file mereka langsung.

---

## 1. SOURCE OF TRUTH HIERARCHY

Ketika ada konflik informasi, ikuti urutan ini (tinggi → rendah):

1. Requirement eksplisit dari PRD (`PRD-Digital-Workspace-3D-Portfolio.md`)
2. Keputusan teknis yang sudah dikonfirmasi user (lihat §2 di bawah)
3. Hasil analisis PROMPT 1 (requirement matrix, klasifikasi Mandatory/Optional/Implied/Assumption)
4. Shared contract yang sudah di-lock (`docs/*.md`)
5. Assumption yang terdokumentasi
6. Best practice teknis umum

---

## 2. CONFIRMED TECHNICAL DECISIONS (tidak boleh diubah tanpa Contract Change Request)

| Keputusan | Hasil |
|---|---|
| Backend architecture | **Static frontend, TANPA database, TANPA authentication.** Satu-satunya server-side logic: 1 serverless function untuk contact form. |
| Contact form mechanism | **Third-party email service** (mis. Resend/EmailJS), dipanggil dari 1 serverless function tipis (`api/contact.ts`) |
| CMS / Admin panel | **Tidak ada.** Konten (projects/skills/experience) dikelola lewat file data statis TypeScript di `src/data/*.ts`, diedit manual via kode. |
| 3D asset strategy | Hero object (Monitor, Keyboard, Books, Phone) = custom sederhana/low-poly. Prop generic (Coffee, Lamp, Chair, Plant) = asset CC0/gratis. |
| Frontend stack (Confirmed dari PRD §27) | React, React Three Fiber, Three.js, Drei, GSAP, TypeScript, Tailwind CSS, Vite |
| State management | Zustand (ringan, cocok untuk state kamera/objek aktif; sudah disebut sebagai opsi di PRD) |
| Testing | Vitest + React Testing Library untuk unit/component test. E2E (Playwright) bersifat opsional, hanya jika waktu memungkinkan. |
| Deployment | Vercel (mendukung Vite SPA + serverless function di folder `api/` secara native dalam repo yang sama) |
| Breakpoints | Mobile `<768px`, Tablet `768–1023px`, Desktop `>=1024px` (selaras Tailwind default `md`/`lg`) |
| Resume | File PDF statis untuk diunduh/dilihat |
| Analytics | Optional, jika diimplementasikan gunakan abstraksi `trackEvent()` yang pluggable — jangan hard-code ke satu vendor |
| i18n | Tidak dibutuhkan, UI berbahasa Inggris seluruhnya |

**PENTING:** Karena tidak ada database dan tidak ada authentication, JANGAN membuat entity relasional,
migration, atau auth flow apa pun. Ini akan melanggar rule "No Requirement Invention" (PROMPT 3 §5).

---

## 3. OWNERSHIP

**Milik Anda (boleh dibuat/diedit):**
```
README.md
docs/**
.env.example        (skeleton awal saja — Agent 2/3 mengisi section masing-masing)
package.json, vite.config.ts, tsconfig.json, tailwind.config.ts   (HANYA saat bootstrap Iterasi 00)
```

**BUKAN milik Anda (jangan diedit setelah bootstrap):**
```
src/**   → Agent 2 (Frontend)
api/**   → Agent 3 (Backend)
```

Setelah Iterasi 00 (bootstrap scaffold) selesai, config file (`package.json`, dst.) menjadi shared —
Anda hanya boleh mengedit lagi lewat koordinasi eksplisit (bukan overwrite diam-diam), karena Agent 2/3
akan menambah dependency di file yang sama.

---

## 4. PRE-FLIGHT CHECK (WAJIB sebelum menulis apa pun)

1. `git status` — cek apakah repo sudah di-init dan ada perubahan pending. Jika belum ada git repo, jalankan `git init` dan lakukan initial commit setelah bootstrap.
2. Cek isi direktori project saat ini — pastikan tidak menimpa file yang sudah ada.
3. Baca ulang `PRD-Digital-Workspace-3D-Portfolio.md` secara utuh.
4. Baca §2 di atas (Confirmed Technical Decisions) — ini final, jangan tanya ulang ke user kecuali menemukan kontradiksi baru.
5. Konfirmasi tidak ada dokumen `docs/*.md` yang sudah ada sebelum Anda menimpanya.

Jangan mulai coding/menulis contract sebelum pre-flight ini selesai.

---

## 5. ITERATION PLAN

### ITERATION 00 — Project Scaffold Bootstrap

**GOAL:** Menyediakan baseline project agar Agent 2 & Agent 3 punya struktur untuk mulai bekerja tanpa bertabrakan.

**TASK:**
- `npm create vite@latest . -- --template react-ts` (atau setup manual React+TS+Vite)
- Install: `three @react-three/fiber @react-three/drei gsap zustand`, dev deps: `tailwindcss postcss autoprefixer`, `vitest @testing-library/react @testing-library/jest-dom`, `typescript eslint` sesuai kebutuhan
- Setup Tailwind (config + base CSS) dengan design token dari PRD §24:
  - Primary `#2158F5`, Background `#0B0D10`, Surface `#14171C`, Text `#F4F6F9`, Secondary `#8B949E`
  - Font: Inter (UI), JetBrains Mono (terminal/code)
- Buat folder skeleton kosong (dengan `.gitkeep` jika perlu):
  ```
  src/app/  src/components/  src/three/objects/  src/three/interactions/
  src/data/  src/hooks/  src/state/  src/styles/  src/lib/
  api/
  public/models/  public/textures/
  docs/change-requests/
  ```
- Buat `.env.example` skeleton (kosong, section placeholder):
  ```
  # === BACKEND / CONTACT FORM (diisi oleh Agent 3) ===

  # === FRONTEND (diisi oleh Agent 2, jika ada var client-safe) ===
  ```
- `git init` (jika belum), commit: `chore: bootstrap project scaffold`

**FILES AFFECTED:** `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, folder skeleton, `.env.example`, `.gitignore`

**DEPENDENCIES:** Tidak ada.

**EXPECTED RESULT:** `npm run dev` berjalan tanpa error, `npm run build` berhasil.

**VALIDATION:** Dev server start sukses. Build sukses. Struktur folder sesuai §28 PRD.

**POTENTIAL ISSUE:** Konflik versi dependency antara Three.js/R3F/Drei — cek compatibility matrix resmi R3F sebelum install.

**STOP CONDITION:** Jika `npm run build` gagal setelah scaffold awal, jangan lanjut ke Iterasi 01 — perbaiki dulu.

---

### ITERATION 01 — Requirements Contract

**GOAL:** Menghasilkan `docs/requirements.md` sebagai source of truth requirement yang bisa dilacak.

**TASK:** Tuangkan requirement matrix (REQ-001 s.d. REQ-048, lihat hasil analisis PROMPT 1) ke `docs/requirements.md` dengan kolom:

```
REQ-ID | Description | Priority (Mandatory/Optional/Implied/Assumption) | Type | Acceptance Criteria | Related Feature
```

Sertakan juga bagian **Assumptions** (lihat daftar assumption di analisis PROMPT 1: konten project contoh, resume format PDF, browser target evergreen, dsb.) dan **Resolved Clarifications** (backend static, email service, no CMS, hybrid asset — dari §2 dokumen ini).

**FILES AFFECTED:** `docs/requirements.md`

**DEPENDENCIES:** Tidak ada.

**EXPECTED RESULT:** Semua REQ mandatory dari PRD tercatat, tidak ada yang hilang.

**VALIDATION:** `[ ] Semua mandatory requirement dari PRD Section 37 (MVP Acceptance Criteria) termapping ke minimal 1 REQ-ID.`

**POTENTIAL ISSUE:** Requirement yang implisit (state management, WebGL detection, dll.) terlewat — cross-check ke daftar IMPLIED di analisis PROMPT 1.

**STOP CONDITION:** Jangan lanjut ke Iterasi 02 jika ada mandatory requirement PRD yang tidak punya REQ-ID.

---

### ITERATION 02 — Architecture Contract

**GOAL:** Menghasilkan `docs/architecture.md`.

**TASK:** Dokumentasikan:
- **Frontend architecture**: React + Vite SPA, routing (React Router atau file-based sesuai pilihan), state management (Zustand store untuk: active 3D object, camera target, panel open/closed, reduced-motion flag, audio on/off), folder responsibility (`src/app`, `src/components`, `src/three`, `src/data`, `src/state`).
- **Backend architecture**: SATU serverless function (`api/contact.ts`) di Vercel. Tidak ada server framework, tidak ada REST API surface lain.
- **Database**: **Tidak ada.** Nyatakan eksplisit "No relational database — content is static, versioned in `src/data/*.ts`". Jangan biarkan bagian ini kosong tanpa penjelasan.
- **External services**: email service provider (Resend/EmailJS — final vendor dikonfirmasi user saat implementasi Agent 3), hosting Vercel.
- **Data flow**: diagram teks untuk (a) render 3D workspace dari data statis, (b) klik objek → panel UI → render konten dari `src/data`, (c) submit contact form → `api/contact.ts` → email provider.
- **Authentication flow**: **Tidak ada** — nyatakan eksplisit alasan (static portfolio, no user account).
- **Major technical decisions**: catat semua dari §2 dokumen ini sebagai "Architecture Decision Record" ringkas (keputusan + alasan).

**FILES AFFECTED:** `docs/architecture.md`

**DEPENDENCIES:** `docs/requirements.md` (Iterasi 01) selesai.

**EXPECTED RESULT:** Architecture selaras dengan stack §2 dan tidak mengandung entity/flow yang tidak diperlukan (no auth, no DB).

**VALIDATION:** Architecture ter-review ulang terhadap requirement — tidak ada mismatch.

**STOP CONDITION:** Jika architecture mengandung asumsi auth/DB yang tidak disetujui user → hapus, ini melanggar §2.

---

### ITERATION 03 — Data Contract (menggantikan "Database Contract")

**GOAL:** Menghasilkan `docs/database-contract.md` — **catatan: nama file dipertahankan sesuai konvensi, isinya adalah data contract untuk static data, BUKAN skema database relasional**, karena project ini tidak memiliki database (§2).

**TASK:** Dokumentasikan struktur data statis sebagai pengganti ERD:

```
Entity: Project
  id: string (unique, required)
  title: string (required)
  description: string (required)
  problem: string (required)
  solution: string (required)
  role: string (required)
  features: string[] (required)
  technologies: string[] (required)
  result: string (required)
  thumbnail: string (path, required)
  github: string (url, optional)
  demoUrl: string (url, optional)

Entity: Skill
  category: "Frontend" | "Backend" | "Database" | "Tools" | "3D" (required)
  items: string[] (required)

Entity: ExperienceEntry
  id: string (required)
  company: string (required)
  position: string (required)
  period: { start: string; end: string | "Present" } (required)
  description: string (required)
  responsibilities: string[] (required)
  technologies: string[] (required)

Entity: ContactFormPayload (bukan entity persisten — hanya bentuk request ke api/contact)
  name: string (required)
  email: string (required, format email)
  subject: string (required)
  message: string (required, min length)
```

Jelaskan juga: tidak ada foreign key/relationship formal (data statis, tidak relasional); relasi Skill↔Project bersifat referensi longgar (opsional, non-blocking).

**FILES AFFECTED:** `docs/database-contract.md`

**DEPENDENCIES:** `docs/requirements.md`

**EXPECTED RESULT:** Skema field lengkap untuk semua entity yang dibutuhkan Agent 2 untuk implementasi `src/data/*.ts` dan tipe TypeScript.

**VALIDATION:** Setiap field yang tampil di PRD (§10, §12, §13, §14) punya representasi di skema ini.

**STOP CONDITION:** Jika ada field UI yang tidak punya sumber data di skema → tambahkan sebelum lock.

---

### ITERATION 04 — API Contract

**GOAL:** Menghasilkan `docs/api-contract.md` untuk satu-satunya endpoint yang ada.

**TASK:**

```
METHOD: POST
ENDPOINT: /api/contact
AUTH: None (public endpoint, dilindungi rate limiting, bukan auth)

REQUEST BODY:
{
  "name": string,
  "email": string,
  "subject": string,
  "message": string
}

RESPONSE 200:
{ "success": true }

RESPONSE 400 (validation error):
{ "success": false, "error": "VALIDATION_ERROR", "details": { field: string } }

RESPONSE 429 (rate limited):
{ "success": false, "error": "RATE_LIMITED" }

RESPONSE 500 (provider/server error):
{ "success": false, "error": "SEND_FAILED" }

VALIDATION RULES:
- name: required, min 2 char
- email: required, valid email format
- subject: required, min 2 char
- message: required, min 10 char, max 2000 char
```

**FILES AFFECTED:** `docs/api-contract.md`

**DEPENDENCIES:** `docs/database-contract.md` (untuk konsistensi tipe `ContactFormPayload`)

**EXPECTED RESULT:** Frontend (Agent 2) dan Backend (Agent 3) memiliki definisi request/response yang identik.

**VALIDATION:** Response shape konsisten (selalu `{ success: boolean, ... }`), error code terdaftar lengkap.

**STOP CONDITION:** Jangan lock jika ada ambiguitas format error.

---

### ITERATION 05 — CONTRACT LOCK

**GOAL:** Mengunci seluruh contract dan membuka jalan development paralel.

**TASK:** Buat `docs/CONTRACT_STATUS.md`:

```markdown
# CONTRACT STATUS

REQUIREMENTS: LOCKED
ARCHITECTURE: LOCKED
DATA CONTRACT: LOCKED
API CONTRACT: LOCKED

OVERALL STATUS: READY FOR PARALLEL DEVELOPMENT

Last updated: <tanggal>
Locked by: Agent 1 (Documentation)
```

Jalankan checklist validasi (§8 PROMPT 3) sebelum menulis status LOCKED:

```
[ ] Semua mandatory requirement tercatat di requirements.md
[ ] Architecture sesuai stack yang dikonfirmasi (§2)
[ ] Data contract sesuai kebutuhan UI (§10,12,13,14 PRD)
[ ] API contract sesuai kebutuhan contact form (§15 PRD)
[ ] Frontend dependency terhadap API jelas (hanya 1 endpoint: POST /api/contact)
[ ] Backend dependency terhadap data — TIDAK ADA (backend tidak menyentuh data.ts)
[ ] Authentication contract — N/A, dinyatakan eksplisit tidak ada
[ ] Error contract jelas (400/429/500 terdefinisi)
```

Jika ada item gagal → tulis `OVERALL STATUS: CONTRACT NOT READY` dan daftar item yang gagal. Agent 2 & Agent 3 HARUS menunggu.

**FILES AFFECTED:** `docs/CONTRACT_STATUS.md`

**DEPENDENCIES:** Iterasi 01–04 selesai.

**EXPECTED RESULT:** Status `READY FOR PARALLEL DEVELOPMENT` tertulis dan bisa dibaca Agent 2/3 di terminal masing-masing.

**STOP CONDITION:** Jangan tulis status READY jika checklist di atas belum semua tercentang.

---

### ITERATION 06 — README

**GOAL:** `README.md` di root.

**TASK:** Overview project, features, tech stack (final, sesuai §2), cara install (`npm install`), environment variables (rujuk `.env.example`), cara run (`npm run dev`), testing (`npm run test`), deployment (Vercel — hubungkan repo, set env var di dashboard Vercel).

**FILES AFFECTED:** `README.md`

**DEPENDENCIES:** Iterasi 00 (tahu struktur final), Iterasi 05 (tahu contract final).

**VALIDATION:** Orang baru bisa clone & jalankan project hanya dari membaca README ini.

---

### ITERATION 07 — Flowchart

**GOAL:** `docs/flowcharts.md`.

**TASK:** Dokumentasikan (teks/mermaid):
- Main user flow: Landing → Boot → Enter Workspace → Explore Object → Open Panel → Return
- Camera interaction flow: Idle parallax → Hover → Click → Smooth transition → Focus object → Exit focus
- Contact flow: Fill form → Client validation → Submit → `api/contact` → Email provider → Success/Error feedback
- Tidak ada authentication flow — nyatakan eksplisit N/A.

**FILES AFFECTED:** `docs/flowcharts.md`

**DEPENDENCIES:** Iterasi 02 (Architecture)

---

### ITERATION 08 — Final Documentation Sync

**GOAL:** Selaraskan seluruh dokumentasi dengan implementasi aktual setelah Agent 2 & Agent 3 selesai.

**TASK:** Review ulang `docs/api-contract.md`, `docs/architecture.md`, `docs/database-contract.md`, `docs/flowcharts.md`, `README.md` terhadap kode final. Perbarui jika ada CONTRACT CHANGE REQUEST yang disetujui selama development (lihat §7). Tulis bagian "Testing" dan "Deployment" final di README berdasarkan apa yang benar-benar diimplementasikan.

**DEPENDENCIES:** Agent 2 Iterasi 07 & Agent 3 Iterasi 07 selesai (Frontend QA & Backend QA).

**VALIDATION:** Tidak ada dokumentasi yang menyebut fitur yang tidak diimplementasikan, dan tidak ada fitur terimplementasi yang tidak terdokumentasi.

---

## 6. CONTRACT CHANGE REQUEST (jika Agent 2/3 menemukan masalah contract)

Jika Anda menerima permintaan perubahan contract dari Agent 2/3 (disampaikan lewat user), buat file
`docs/change-requests/CR-XXX.md`:

```markdown
## CR-XXX

Change:
Reason:
Affected requirement:
Affected files:
Frontend impact:
Backend impact:
Data impact:
Risk:
Recommendation:
```

Setelah user memutuskan (approve/reject):
1. Update contract terkait (`docs/*.md`)
2. Revalidate (jalankan ulang checklist §8 PROMPT 3 yang relevan)
3. Update `docs/CONTRACT_STATUS.md` dengan timestamp baru
4. Informasikan ke user bahwa Agent 2/3 boleh lanjut

Jangan pernah mengubah contract langsung tanpa CR jika perubahan tersebut memengaruhi Agent lain.

---

## 7. STATUS REPORTING

Setiap kali Anda menyelesaikan satu iterasi, laporkan ke user dalam format singkat:

```
ITERATION <n> — <nama> : DONE / BLOCKED
Files created/updated: ...
Validation result: PASS / FAIL (+alasan)
Next: ITERATION <n+1>
```

---

## 8. FINAL BEHAVIOR CHECK

Sebelum setiap aksi tanya diri sendiri:
- Apakah ini benar-benar diminta PRD atau §2 keputusan user?
- Apakah saya owner file ini (§3)?
- Apakah saya mengarang fitur (auth/DB) yang sudah eksplisit ditolak?
- Apakah dokumentasi ini bisa dijelaskan ke interviewer sebagai keputusan yang disengaja, bukan default AI?
