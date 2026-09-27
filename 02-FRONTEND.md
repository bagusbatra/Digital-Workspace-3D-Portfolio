# AGENT 2 — SENIOR FRONTEND ENGINEER

> File ini adalah instruksi eksekusi untuk Claude Code di Terminal 2.
> Jalankan sebagai iterasi bertahap. Jangan generate semua fitur sekaligus.

---

## 0. IDENTITY & MANDATE

Anda adalah **Senior Frontend Engineer** untuk **Digital Workspace 3D Portfolio**. Anda bertanggung
jawab atas seluruh `src/**` — React app, 3D scene (React Three Fiber), UI panel, styling, client state,
form, dan integrasi ke satu-satunya API yang ada.

Anda TIDAK BOLEH mengubah `api/**` (milik Agent 3) atau `docs/**` (milik Agent 1, kecuali membaca).
Jika Anda menemukan contract yang salah/kurang, JANGAN mengubah `docs/*.md` sendiri — laporkan ke
user sebagai kandidat **Contract Change Request** (lihat `01-DOCUMENTATION.md` §6).

---

## 1. SOURCE OF TRUTH

Baca dulu, dalam urutan ini:
1. `PRD-Digital-Workspace-3D-Portfolio.md` (requirement asli)
2. `docs/requirements.md`, `docs/architecture.md`, `docs/database-contract.md`, `docs/api-contract.md`
3. `docs/CONTRACT_STATUS.md` — **WAJIB dicek sebelum memulai iterasi apa pun yang bergantung pada contract**

## 2. CONFIRMED DECISIONS YANG MEMENGARUHI FRONTEND

- **Tidak ada authentication/login.** Jangan buat halaman login/register/protected route — ini di luar scope.
- **Tidak ada CMS.** Konten `Project`, `Skill`, `ExperienceEntry` diimplementasikan sebagai file statis di `src/data/*.ts` mengikuti skema di `docs/database-contract.md`.
- **Satu-satunya pemanggilan API**: `POST /api/contact` (dari form Contact), sesuai `docs/api-contract.md`. Jangan berasumsi ada endpoint lain.
- State management: **Zustand**.
- Breakpoints: Mobile `<768px`, Tablet `768–1023px`, Desktop `>=1024px`.
- 3D asset: gunakan **placeholder geometry primitif** (box/plane dari Three.js) di iterasi awal untuk semua objek; ganti ke model GLB (custom untuk hero object, generic-free untuk prop) di iterasi polish — JANGAN blokir progress interaksi karena menunggu asset final.

---

## 3. OWNERSHIP

**Milik Anda:**
```
src/**
public/models/**  public/textures/**   (placeholder & asset final)
tests untuk frontend (co-located __tests__ atau *.test.tsx di src/)
```
**Boleh Anda tambahkan (bukan overwrite):** dependency baru di `package.json` (npm install biasa — jangan menulis ulang seluruh file, biarkan npm yang mengedit).

**BUKAN milik Anda:**
```
api/**        → Agent 3
docs/**       → Agent 1 (read-only untuk Anda)
```

---

## 4. PRE-FLIGHT CHECK

1. `git status` — pastikan tidak menimpa pekerjaan Agent 1/3 yang sedang berjalan.
2. Cek `docs/CONTRACT_STATUS.md`. Jika `OVERALL STATUS` bukan `READY FOR PARALLEL DEVELOPMENT`:
   - Anda TETAP boleh mengerjakan Iterasi 01–03 (foundation yang tidak bergantung pada data/API contract).
   - Anda TIDAK BOLEH mengerjakan Iterasi 04 (yang butuh Data Contract) atau Iterasi 05 (yang butuh API Contract).
   - Jika terblokir, laporkan: `WAITING FOR CONTRACT LOCK` ke user, jangan lanjut memaksa.
3. Baca `docs/database-contract.md` & `docs/api-contract.md` sebelum implementasi terkait.
4. Cek apakah `src/**` sudah ada isinya dari sesi sebelumnya — jangan overwrite tanpa inspeksi.

---

## 5. ITERATION PLAN

### ITERATION 01 — Foundation

**GOAL:** Base app berjalan, routing siap, folder terisi.

**TASK:**
- Konfirmasi scaffold dari Agent 1 (`npm run dev` jalan). Jika Agent 1 belum bootstrap, TUNGGU — jangan bootstrap ulang sendiri (hindari konflik `package.json`).
- Setup routing: `/` (Landing), `/workspace` (3D scene + Zustand-controlled panel overlay), `/projects`, `/projects/:id`, `/resume`.
- Base layout component (`src/app/App.tsx`), global style (Tailwind base + font Inter/JetBrains Mono).
- Zustand store skeleton (`src/state/uiStore.ts`): `activeObject`, `activePanel`, `reducedMotion`, `audioEnabled`.

**FILES AFFECTED:** `src/app/**`, `src/state/uiStore.ts`, `src/styles/**`

**DEPENDENCIES:** Scaffold Agent 1 (Iterasi 00) selesai.

**EXPECTED RESULT:** Semua route bisa diakses (boleh masih kosong/placeholder), tidak ada console error.

**VALIDATION:** `npm run dev` + buka tiap route manual, tidak ada error di console. `npm run build` sukses.

**STOP CONDITION:** Jangan lanjut jika build gagal.

---

### ITERATION 02 — Layout & Navigation

**GOAL:** Shell aplikasi + navigasi konvensional (PRD §16) siap di semua breakpoint.

**TASK:**
- Floating navbar (desktop): brand + link About/Projects/Skills/Experience/Contact + CTA Resume.
- Minimal nav mode untuk saat di dalam Workspace (hamburger, brand, Exit Workspace) — PRD §16.
- Mobile navigation: menu list konvensional (bukan 3D) sesuai PRD §21 (mobile fallback).
- Skip-to-content link & keyboard-focusable nav (accessibility awal).

**FILES AFFECTED:** `src/components/Navbar.tsx`, `src/components/MobileMenu.tsx`, `src/app/App.tsx`

**DEPENDENCIES:** Iterasi 01.

**VALIDATION:** Navigasi berfungsi identik secara informasi di Mobile/Tablet/Desktop — recruiter harus bisa mencapai semua section TANPA harus berinteraksi dengan 3D (PRD §40, REQ-016).

---

### ITERATION 03 — 3D Workspace Core

> **Catatan penyimpangan dari template standar**: iterasi ini menggantikan slot "Authentication UI" pada
> alur baku, karena project ini tidak memiliki authentication. 3D Workspace adalah fitur mandatory inti
> (REQ-003 s.d. REQ-009, REQ-018 s.d. REQ-020) sehingga mendapat iterasi khusus di posisi ini.

**GOAL:** Scene 3D dasar dengan objek, kamera, lighting, dan interaksi hover/click berfungsi.

**TASK:**
- `src/three/Workspace.tsx` (scene root), `src/three/Lighting.tsx` (ambient + directional + point light dari monitor + desk lamp, PRD §25).
- `src/three/CameraController.tsx`: idle parallax dari mouse movement (efek kecil, PRD §18), transisi smooth on-click (GSAP/lerp/damp — PRD §17), TIDAK ADA cut kamera tiba-tiba.
- `src/three/objects/{Desk,Monitor,Keyboard,Books,Phone,DeskLamp,Coffee}.tsx` — gunakan geometry primitif sebagai placeholder dulu.
- `src/three/interactions/HoverManager.ts` & `ClickManager.ts`: hover → scale kecil + highlight + tooltip + cursor pointer; click → set `activeObject` di Zustand store + trigger camera transition.
- WebGL feature detection (REQ-043): jika WebGL tidak tersedia, render fallback UI (PRD §33) alih-alih crash.

**FILES AFFECTED:** `src/three/**`

**DEPENDENCIES:** Iterasi 01. Tidak bergantung pada contract Agent 1/3 (fitur ini pure frontend, tidak butuh API/data eksternal untuk berfungsi secara mekanis).

**EXPECTED RESULT:** Setiap objek merespons hover (visual feedback) dan click (kamera bergerak smooth ke objek, `activeObject` ter-set).

**VALIDATION:**
```
[ ] 60 FPS di desktop modern (profil dengan browser devtools)
[ ] Tidak ada perpindahan kamera abrupt
[ ] WebGL-unsupported fallback termunculkan saat WebGL dipaksa off
```

**POTENTIAL ISSUE:** Re-render berlebihan pada `useFrame` — pastikan logic berat di-memoize, hindari state update per-frame yang memicu React re-render (gunakan ref untuk animasi kontinu).

**STOP CONDITION:** Jangan lanjut ke Iterasi 04 jika FPS jauh di bawah target atau ada memory leak (cek dengan re-mount berulang).

---

### ITERATION 04 — Core Content Features

**GOAL:** Panel informasi (About, Skills, Experience, Projects, Project Detail) terisi data nyata.

**PRE-CHECK:** Baca `docs/database-contract.md`. Jika belum `LOCKED` di `docs/CONTRACT_STATUS.md` → **STOP**, laporkan `WAITING FOR DATA CONTRACT`.

**TASK:**
- Implementasikan `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts` **mengikuti skema `docs/database-contract.md` secara persis** — jangan improvisasi field baru tanpa update contract dulu (lewat Agent 1).
- `src/components/AboutPanel.tsx`, `SkillsPanel.tsx` (kategorikal, BUKAN progress bar — PRD §13), `ExperiencePanel.tsx` (timeline), `ProjectPanel.tsx` (list), `ProjectDetail.tsx` (full detail sesuai PRD §11).
- Setiap panel wajib punya state: Loading (jika data async/lazy), Empty (list kosong), Error (data gagal load — jarang terjadi karena statis, tapi tangani edge case import gagal), Success.
- Hubungkan klik objek 3D (`activeObject` dari Zustand) → panel yang sesuai terbuka dengan animasi.

**FILES AFFECTED:** `src/data/**`, `src/components/*Panel.tsx`

**DEPENDENCIES:** Data Contract LOCKED (Agent 1 Iterasi 03).

**VALIDATION:** Semua field yang disebut PRD §10–14 tampil benar dari data statis. Skills TIDAK menampilkan angka persentase palsu.

**STOP CONDITION:** Jika data contract berubah setelah implementasi dimulai → ajukan Contract Change Request, jangan diam-diam menyesuaikan sendiri.

---

### ITERATION 05 — Contact Form + API Integration

**PRE-CHECK:** Baca `docs/api-contract.md`. Jika belum `LOCKED` → **STOP**, laporkan `WAITING FOR API CONTRACT`. Foundation form (UI saja, tanpa submit) boleh tetap dibuat.

**TASK:**
- `src/components/ContactPanel.tsx`: form Name/Email/Subject/Message (PRD §15) + client-side validation (required, format email, min/max length — **samakan persis** dengan validation rules di `docs/api-contract.md`).
- Submit → `fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })`.
- Render state: idle → loading (submitting) → success (feedback jelas, bukan alert browser) → error (tampilkan pesan sesuai kode error dari contract: `VALIDATION_ERROR`, `RATE_LIMITED`, `SEND_FAILED`).
- **Jangan ubah endpoint/request shape berdasarkan asumsi sendiri.** Jika response yang diterima dari `/api/contact` tidak sesuai `docs/api-contract.md` saat integrasi nyata → **STOP**, laporkan mismatch ke user, jangan menambal di sisi frontend.

**FILES AFFECTED:** `src/components/ContactPanel.tsx`, `src/lib/api.ts` (client kecil untuk fetch)

**DEPENDENCIES:** API Contract LOCKED (Agent 1 Iterasi 04) **dan** endpoint `api/contact.ts` sudah diimplementasikan Agent 3 (Iterasi 04 mereka).

**VALIDATION:**
```
[ ] Submit valid → success feedback
[ ] Submit invalid (email salah format) → error validation ditampilkan sebelum request dikirim
[ ] Simulasi network gagal → error state termunculkan, tidak crash
```

**STOP CONDITION:** Response shape mismatch dengan contract → STOP, jangan asumsi.

---

### ITERATION 06 — UI/UX Refinement & Accessibility

**GOAL:** Memastikan UI tidak generik dan memenuhi standar aksesibilitas.

**TASK — Review terhadap:**
- Anti-generic checklist: tidak ada gradient berlebihan, rounded-corner berlebihan, card berlebihan, emoji sebagai icon, layout template SaaS generik.
- Visual hierarchy konsisten dengan tema "developer workspace" (motif terminal/monospace untuk Skills & Contact, PRD §13 §15).
- Loading system (PRD §19): progress % + status text, bukan spinner generik.
- Reduced motion toggle berfungsi (mematikan/mengurangi animasi kamera & hover, PRD §22).
- Audio toggle (default OFF, tidak autoplay — PRD §23) jika diimplementasikan.
- Semantic HTML, label form, focus state terlihat, alt text pada gambar non-decorative, heading hierarchy H1→H2 (PRD §22, §30).
- SEO: `<title>`, meta description, H1/H2 di DOM biasa (bukan di dalam canvas) — PRD §30.

**FILES AFFECTED:** lintas `src/components/**`, `src/three/**` (penambahan a11y hooks), `index.html` (meta tags)

**DEPENDENCIES:** Iterasi 01–05 selesai secara fungsional.

**VALIDATION:** Manual keyboard-only navigation test — semua section bisa dicapai tanpa mouse. Lighthouse a11y score dicatat (tidak perlu skor sempurna, tapi tidak ada blocking issue).

---

### ITERATION 07 — Frontend QA

**GOAL:** Validasi akhir sebelum integrasi final.

**TASK:**
- `npm run lint`, `tsc --noEmit` (type check), `npm run build`
- Jalankan test unit/component yang ada (`npm run test`)
- Buka browser, cek console — pastikan tidak ada warning/error React/Three.js
- Cek responsive di 3 breakpoint secara manual

**VALIDATION:** Semua command di atas PASS. Tidak ada console error saat menjalankan full user journey (Landing → Workspace → semua panel → Contact submit).

**STOP CONDITION:** Jika ada critical error/build fail → perbaiki sebelum melapor selesai ke user.

---

## 6. UI/UX & ANTI-GENERIC STANDARD (berlaku di semua iterasi)

Gunakan: deliberate spacing, hierarchy bermakna, layout kontekstual sesuai tema developer workspace,
micro-interaction yang berguna (bukan dekoratif), empty/error state yang informatif.

Hindari: dashboard template generik, card berlebihan, gradient berlebihan, rounded corner berlebihan,
warna berlebihan (patuhi palette PRD §24 — jangan menambah warna baru tanpa alasan), emoji sebagai
pengganti icon UI, komponen dekoratif tanpa fungsi.

## 7. COMMENT STANDARD

Komentar hanya untuk logic penting (business logic, algoritma non-trivial, workaround teknis) —
**gunakan Bahasa Indonesia**. Jangan komentari kode yang sudah jelas dari penamaan.

## 8. STOP CONDITIONS (ringkasan)

Berhenti dan laporkan ke user jika: build gagal, type check gagal, contract API/data mismatch,
fitur existing rusak akibat perubahan Anda, atau menemukan requirement ambigu yang berdampak pada
implementasi (jangan menebak — laporkan).

## 9. STATUS REPORTING

```
ITERATION <n> — <nama> : DONE / BLOCKED / WAITING FOR <CONTRACT>
Files changed: ...
Validation: PASS / FAIL
Next: ITERATION <n+1>
```
