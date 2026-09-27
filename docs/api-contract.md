# API Contract — Digital Workspace 3D Portfolio

Status: **LOCKED**

Satu-satunya endpoint dalam project ini.

---

## POST /api/contact

**AUTH:** None (public endpoint — dilindungi rate limiting, bukan authentication)

**REQUEST BODY:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**VALIDATION RULES** (diterapkan di client DAN server — server tidak mempercayai client):

| Field | Rule |
|---|---|
| name | required, min 2 karakter |
| email | required, format email valid |
| subject | required, min 2 karakter |
| message | required, min 10 karakter, max 2000 karakter |

**RESPONSE 200 (success):**
```json
{ "success": true }
```

**RESPONSE 400 (validation error):**
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "details": { "field": "pesan error" }
}
```

**RESPONSE 405 (method tidak diizinkan):**
```json
{ "success": false, "error": "METHOD_NOT_ALLOWED" }
```

**RESPONSE 429 (rate limited):**
```json
{ "success": false, "error": "RATE_LIMITED" }
```

**RESPONSE 500 (provider/server error):**
```json
{ "success": false, "error": "SEND_FAILED" }
```
Catatan: error 500 generik/tak terduga tetap mengikuti bentuk ini (`success: false, error: "INTERNAL_ERROR"` jika bukan kegagalan pengiriman email spesifik) — tidak boleh membocorkan stack trace ke client.

---

## Contract Consistency Check

- [x] Frontend (`src/components/ContactPanel.tsx`, Agent 2 Iterasi 05) memanggil endpoint ini dengan body persis sesuai skema di atas.
- [x] Backend (`api/contact.ts`, Agent 3 Iterasi 04) mengembalikan response persis sesuai skema di atas.
- [x] Kedua sisi menggunakan bentuk error yang sama: `{ success: false, error: <code>, details?: {...} }`.
