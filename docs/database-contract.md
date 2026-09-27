# Database Contract — Digital Workspace 3D Portfolio

Status: **LOCKED**

> **Catatan penting**: Project ini **tidak memiliki relational database** (lihat keputusan di
> `docs/requirements.md` §Confirmed Technical Decisions). Nama file dipertahankan sesuai konvensi
> PROMPT 3, namun isinya adalah **static data contract** — skema TypeScript untuk konten yang
> dikelola di `src/data/*.ts`, bukan skema tabel SQL. Tidak ada primary key/foreign key dalam
> arti relasional; field "id" di bawah adalah unique string identifier untuk keperluan routing/key
> React, bukan auto-increment DB.

## Entity: Project

| Field | Type | Required | Notes |
|---|---|---|---|
| id | string | Required | Unique, dipakai di URL `/projects/:id` |
| title | string | Required | |
| description | string | Required | |
| problem | string | Required | |
| solution | string | Required | |
| role | string | Required | |
| features | string[] | Required | |
| technologies | string[] | Required | |
| result | string | Required | |
| thumbnail | string | Required | Path relatif ke `/public` |
| github | string (URL) | Optional | |
| demoUrl | string (URL) | Optional | |

## Entity: Skill

| Field | Type | Required | Notes |
|---|---|---|---|
| category | `"Frontend" \| "Backend" \| "Database" \| "Tools" \| "3D"` | Required | |
| items | string[] | Required | Nama teknologi, tanpa angka persentase (REQ-013) |

## Entity: ExperienceEntry

| Field | Type | Required | Notes |
|---|---|---|---|
| id | string | Required | Unique |
| company | string | Required | |
| position | string | Required | |
| period.start | string | Required | |
| period.end | `string \| "Present"` | Required | |
| description | string | Required | |
| responsibilities | string[] | Required | |
| technologies | string[] | Required | |

## Relationship

Tidak ada foreign key formal — data statis, tidak relasional. Referensi Skill↔Project (mis. "skill X dibuktikan lewat project Y") bersifat opsional/longgar di level UI, bukan constraint data.

## Constraints

- Semua array minimal berisi 1 elemen jika field tersebut Required.
- `thumbnail`/`image` path harus mengarah ke file yang benar-benar ada di `public/`.
- Tidak ada validasi runtime terhadap skema ini kecuali TypeScript compile-time check (tidak ada database constraint karena tidak ada database).
