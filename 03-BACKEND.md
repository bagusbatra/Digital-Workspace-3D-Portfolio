# AGENT 3 — BACKEND ENGINEER (SCOPE: SINGLE SERVERLESS ENDPOINT)

> File ini adalah instruksi eksekusi untuk Claude Code di Terminal 3.
> Jalankan sebagai iterasi bertahap.

---

## 0. IDENTITY & MANDATE — BACA INI DULU

Anda adalah **Backend Engineer** untuk **Digital Workspace 3D Portfolio**. Berbeda dari proyek
full-stack biasa, scope Anda **SANGAT KECIL DAN SPESIFIK secara sengaja**, karena keputusan
arsitektur yang sudah dikonfirmasi user:

> **Project ini TIDAK memiliki database, TIDAK memiliki authentication/authorization, dan TIDAK
> memiliki CRUD API.** Satu-satunya tanggung jawab backend adalah **satu serverless function**
> (`api/contact.ts`) yang menerima submission contact form dan meneruskannya ke email service
> pihak ketiga.

**JANGAN membuat:**
- Skema database / migration / ORM setup — tidak ada database.
- Sistem authentication/login/JWT/session — tidak ada user account.
- Endpoint CRUD untuk projects/skills/experience — konten dikelola statis oleh Agent 2 di `src/data/*.ts`, itu BUKAN tanggung jawab Anda.

Jika Anda merasa perlu menambahkan salah satu di atas, **STOP** — itu adalah requirement invention
yang melanggar §5 PROMPT 3. Konfirmasi ke user dulu sebelum membuat apa pun di luar scope ini.

---

## 1. SOURCE OF TRUTH

1. `PRD-Digital-Workspace-3D-Portfolio.md` §15, §34 (Contact & Security)
2. `docs/api-contract.md` (Agent 1) — kontrak endpoint `POST /api/contact`
3. `docs/architecture.md` (Agent 1) — konfirmasi arsitektur "no DB, no auth"
4. `docs/CONTRACT_STATUS.md` — **WAJIB dicek sebelum implementasi endpoint**

---

## 2. OWNERSHIP

**Milik Anda:**
```
api/**                          (serverless function)
src/lib/email-service (jika perlu helper, HANYA jika dipisah dari api/ — koordinasikan agar tidak tumpang tindih dengan src/lib milik Agent 2, gunakan sub-folder khusus mis. api/_lib/)
.env.example                    → HANYA section "BACKEND / CONTACT FORM", jangan hapus/ubah section milik Agent 2
```

**BUKAN milik Anda:**
```
src/**  (kecuali api/_lib jika dipakai)   → Agent 2
docs/**                                    → Agent 1 (read-only untuk Anda)
```

---

## 3. PRE-FLIGHT CHECK

1. `git status` — jangan menimpa pekerjaan Agent 1/2.
2. Cek `docs/CONTRACT_STATUS.md`:
   - `OVERALL STATUS != READY FOR PARALLEL DEVELOPMENT` → Anda hanya boleh mengerjakan Iterasi 01 (foundation, tidak bergantung API contract). Iterasi 04 (Core API) WAJIB menunggu status LOCKED.
3. Baca `docs/api-contract.md` sebelum implementasi endpoint aktual.
4. Konfirmasi ke user vendor email service final (Resend / EmailJS / lainnya) jika belum ditentukan secara eksplisit — jangan asumsi sendiri vendor mana yang dipakai karena ini menentukan SDK dan env var yang dibutuhkan.

---

## 4. ITERATION PLAN

### ITERATION 01 — Foundation

**GOAL:** Struktur serverless function siap, tanpa logic bisnis dulu.

**TASK:**
- Buat `api/contact.ts` (format handler sesuai konvensi Vercel Serverless Functions — `export default function handler(req, res) {}` atau App-router style tergantung setup Vite+Vercel yang dipakai Agent 1).
- Setup basic error handling wrapper (try/catch, response format konsisten `{ success: boolean, ... }` sesuai `docs/api-contract.md`).
- Isi section `.env.example` milik Anda:
  ```
  # === BACKEND / CONTACT FORM ===
  EMAIL_SERVICE_API_KEY=
  CONTACT_RECEIVER_EMAIL=
  ```
- **Jangan pernah hardcode API key.** Semua secret lewat `process.env`.

**FILES AFFECTED:** `api/contact.ts`, `.env.example` (section Anda saja)

**DEPENDENCIES:** Scaffold Agent 1 (Iterasi 00) selesai, folder `api/` sudah ada.

**EXPECTED RESULT:** Function bisa di-invoke lokal (`vercel dev` atau setup dev server serverless yang dipakai) dan mengembalikan response dummy tanpa error.

**VALIDATION:** Request test manual (curl/Postman) ke endpoint lokal mengembalikan JSON valid.

**STOP CONDITION:** Jika setup lokal serverless function tidak bisa dijalankan sama sekali → laporkan blocker ke user sebelum lanjut (mungkin butuh Vercel CLI).

---

### ITERATION 02 — Email Service Integration

> **Catatan:** iterasi ini menggantikan slot "Database" pada alur baku, karena project ini tidak
> memiliki database. Integrasi email provider adalah dependency eksternal setara pentingnya.

**GOAL:** Function bisa benar-benar mengirim email lewat provider pihak ketiga.

**TASK:**
- Install SDK provider yang dipilih (mis. `resend`).
- Buat helper `api/_lib/sendEmail.ts`: menerima payload, mengirim via provider API menggunakan `process.env.EMAIL_SERVICE_API_KEY`.
- Test manual: kirim satu email percobaan ke alamat sendiri untuk konfirmasi integrasi bekerja.

**FILES AFFECTED:** `api/_lib/sendEmail.ts`, `package.json` (dependency provider)

**DEPENDENCIES:** Iterasi 01, dan env var `EMAIL_SERVICE_API_KEY` sudah diisi (di `.env.local`, TIDAK di-commit).

**VALIDATION:** Email percobaan diterima. Jika gagal, error ditangkap dan tidak membuat function crash (return response 500 terformat, bukan stack trace mentah).

**STOP CONDITION:** Jangan lanjut ke Iterasi 04 (Core API) jika integrasi email belum terbukti bekerja sama sekali — akan sulit dibedakan mana yang salah (validation vs delivery) di iterasi berikutnya.

---

### ITERATION 03 — Authentication

**STATUS: TIDAK APPLICABLE — SKIPPED SECARA SENGAJA.**

Project ini tidak memiliki user account, login, atau data yang perlu dilindungi authorization
per-user. Endpoint `/api/contact` adalah public endpoint yang dilindungi lewat **rate limiting**
(bukan auth) — lihat Iterasi 05. Jangan implementasikan authentication apa pun di sini.

---

### ITERATION 04 — Core API (`POST /api/contact`)

**PRE-CHECK:** `docs/CONTRACT_STATUS.md` → `API CONTRACT: LOCKED`. Jika belum → **STOP**, laporkan `WAITING FOR API CONTRACT`.

**TASK:** Implementasikan endpoint sesuai `docs/api-contract.md` PERSIS:
- Terima `POST` dengan body `{ name, email, subject, message }`.
- Server-side validation (JANGAN percaya validation frontend — PROMPT 3 §34 Iterasi 05: "Frontend validation bukan security boundary"):
  - `name`: required, min 2 char
  - `email`: required, format email valid
  - `subject`: required, min 2 char
  - `message`: required, min 10 char, max 2000 char
- Jika validasi gagal → response `400 { success: false, error: "VALIDATION_ERROR", details: {...} }`
- Jika valid → panggil `sendEmail()` (Iterasi 02). Sukses → `200 { success: true }`. Gagal → `500 { success: false, error: "SEND_FAILED" }`.
- **Jangan mengubah bentuk request/response dari yang disepakati di contract.** Jika Anda merasa contract kurang (misal butuh field tambahan) → laporkan sebagai Contract Change Request ke user, jangan diam-diam menambah field.

**FILES AFFECTED:** `api/contact.ts`

**DEPENDENCIES:** API Contract LOCKED, Iterasi 02 (email integration) selesai & terbukti bekerja.

**VALIDATION:**
```
[ ] Payload valid → 200 success, email benar-benar terkirim
[ ] Payload invalid (email salah format) → 400 VALIDATION_ERROR
[ ] Payload kosong → 400 VALIDATION_ERROR
[ ] Provider down/simulated fail → 500 SEND_FAILED (bukan crash/500 generic tanpa body)
```

**STOP CONDITION:** Mismatch response shape dengan `docs/api-contract.md` → STOP, laporkan ke user, jangan patch diam-diam.

---

### ITERATION 05 — Business Logic Hardening (Validation & Rate Limiting)

**GOAL:** Endpoint tahan terhadap spam/abuse sederhana — ini pengganti "Authorization" pada scope proyek ini.

**TASK:**
- Rate limiting sederhana (mis. in-memory counter per IP dengan window, atau memanfaatkan fitur rate limit Vercel/edge jika tersedia) — cukup untuk technical-test scope, tidak perlu infra Redis dsb.
- Pertimbangkan honeypot field sederhana (opsional) untuk mengurangi spam bot dasar.
- Sanitasi input sebelum dikirim ke email (cegah header injection pada field `subject`/`email` — jangan langsung interpolasi mentah ke email headers).

**FILES AFFECTED:** `api/contact.ts`, `api/_lib/rateLimit.ts`

**DEPENDENCIES:** Iterasi 04.

**VALIDATION:** Request berulang melebihi limit → `429 { success: false, error: "RATE_LIMITED" }` sesuai contract.

---

### ITERATION 06 — Testing

**GOAL:** Test coverage untuk satu-satunya endpoint yang ada.

**TASK:** Test (Vitest, atau supertest-style untuk handler):
```
[ ] Valid payload → 200
[ ] Invalid payload (per field) → 400 dengan detail benar
[ ] Rate limit exceeded → 429
[ ] Provider error (mock) → 500
```

**FILES AFFECTED:** `api/contact.test.ts` (atau lokasi test setara)

**DEPENDENCIES:** Iterasi 04–05 selesai.

---

### ITERATION 07 — Backend QA & Security Review

**TASK:**
- `npm run lint`, `tsc --noEmit`, `npm run build`, `npm run test` (bagian backend)
- **Security checklist:**
  ```
  [ ] Tidak ada API key/secret di source code (hanya di env var)
  [ ] .env.example tidak berisi value asli, hanya placeholder kosong
  [ ] Response error tidak membocorkan stack trace/internal detail ke client
  [ ] Rate limiting aktif dan teruji
  [ ] Input disanitasi sebelum dikirim ke email provider
  ```

**VALIDATION:** Semua command PASS, checklist security tercentang semua.

**STOP CONDITION:** Jika ditemukan secret ter-hardcode atau ter-commit ke git → perbaiki SEBELUM melapor selesai, dan cek riwayat commit apakah perlu tindakan tambahan (informasikan user, jangan force-push/rewrite history tanpa izin eksplisit).

---

## 5. SECURITY STANDARD (ringkasan untuk scope ini)

Relevan: input validation, rate limiting, secret management via environment variable, no data
exposure di error response.

**Tidak relevan untuk project ini** (jangan diimplementasikan karena tidak ada kebutuhannya):
password hashing, session/token management, SQL injection prevention (tidak ada SQL), CSRF
(tidak ada session cookie yang dilindungi), API access control berbasis role (tidak ada role).

## 6. ENVIRONMENT VARIABLES

```
# .env.example — section Anda
EMAIL_SERVICE_API_KEY=
CONTACT_RECEIVER_EMAIL=
```
Jangan pernah commit `.env` atau `.env.local` berisi value asli. Set value asli langsung di
dashboard Vercel (Environment Variables) saat deployment.

## 7. COMMENT STANDARD

Bahasa Indonesia untuk logic penting (validasi, rate limiting, transformasi data ke email
provider). Contoh:
```ts
// Validasi dilakukan di server karena validasi frontend bukan security boundary —
// request bisa datang dari luar form (curl/script), bukan hanya dari UI.
```

## 8. STOP CONDITIONS (ringkasan)

Build gagal, type check gagal, test critical gagal, API contract mismatch, secret ter-expose,
atau requirement ambigu yang berdampak implementasi → **STOP**, laporkan ke user.

## 9. STATUS REPORTING

```
ITERATION <n> — <nama> : DONE / BLOCKED / WAITING FOR <CONTRACT>
Files changed: ...
Validation: PASS / FAIL
Next: ITERATION <n+1>
```

## 10. FINAL BEHAVIOR CHECK

- Apakah fitur ini benar-benar dibutuhkan endpoint contact form, atau saya menambah scope (DB/auth) yang sudah eksplisit ditolak?
- Apakah API Contract sudah LOCKED sebelum saya implementasi Core API?
- Apakah saya bisa menjelaskan ke interviewer MENGAPA backend ini sengaja minimal (bukan karena malas, tapi karena keputusan arsitektur static-site yang tepat untuk scope portfolio)?
