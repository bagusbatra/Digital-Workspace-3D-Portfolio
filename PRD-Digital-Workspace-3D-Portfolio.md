# PRD — Digital Workspace 3D Portfolio

**Product Name:** Bagus Batra — Digital Workspace  
**Product Type:** Interactive 3D Personal Portfolio  
**Primary Technology:** Three.js / React Three Fiber  
**Target:** Recruiter, HRD, client, fellow developers  
**Platform:** Desktop-first, responsive mobile  
**Visual Direction:** Modern, cinematic, minimal, professional  
**Status:** Product Specification v1.0

---

# 1. Product Overview

**Digital Workspace** adalah website portfolio personal berbasis 3D yang merepresentasikan dunia kerja seorang developer melalui sebuah ruang kerja digital.

Alih-alih menggunakan portfolio konvensional berupa:

> Home → About → Skills → Projects → Contact

pengunjung akan **memasuki sebuah workspace 3D** dan berinteraksi dengan berbagai objek di dalamnya.

Setiap objek merepresentasikan bagian dari portfolio.

```text
                   DIGITAL WORKSPACE

                        ┌─────────┐
                        │ MONITOR │
                        │ PROJECT │
                        └─────────┘

       ┌───────┐                         ┌───────┐
       │ BOOKS │                         │ PHONE │
       │ ABOUT │                         │CONTACT│
       └───────┘                         └───────┘

                    ┌─────────────┐
                    │  KEYBOARD   │
                    │   SKILLS    │
                    └─────────────┘

                         ☕
                       EASTER
                        EGG
```

---

# 2. Product Vision

## Vision

Menciptakan portfolio yang membuat recruiter atau pengunjung **tidak hanya membaca tentang developer, tetapi merasakan bagaimana developer tersebut bekerja.**

## Core Concept

> **"This is where ideas become digital experiences."**

Workspace menjadi representasi visual dari:

- identitas
- pengalaman
- kemampuan
- project
- proses bekerja
- teknologi
- kontak

---

# 3. Product Goals

## Primary Goals

1. Menampilkan portfolio secara berbeda dari website konvensional.
2. Menunjukkan kemampuan frontend dan 3D development.
3. Membuat project lebih menarik untuk dieksplorasi.
4. Menciptakan pengalaman interaktif tanpa mengorbankan usability.
5. Memiliki struktur konten yang mudah diperbarui.
6. Tetap terlihat profesional di mata recruiter.

## Secondary Goals

- Menunjukkan kemampuan Three.js.
- Menunjukkan kemampuan UI/UX.
- Menampilkan personal branding.
- Menjadi showcase technical skill.
- Menyediakan kontak profesional.

---

# 4. Target User

## Primary User — Recruiter / HRD

Mereka biasanya membutuhkan informasi:

- siapa kamu
- posisi yang dituju
- pengalaman
- skill
- project
- kontak

Mereka **tidak boleh dipaksa memahami mekanisme 3D** untuk mendapatkan informasi tersebut.

## Secondary User — Developer

Developer akan tertarik dengan:

- Three.js
- architecture
- interaction
- animation
- performance
- source code

## Tertiary User — Potential Client

Membutuhkan:

- kemampuan
- portfolio
- service
- cara menghubungi

---

# 5. Core User Journey

```text
LANDING
   ↓
BOOT / INTRO
   ↓
ENTER WORKSPACE
   ↓
3D WORKSPACE
   ↓
EXPLORE OBJECT
   ↓
OPEN INFORMATION
   ↓
PROJECT / ABOUT / SKILLS / CONTACT
   ↓
RETURN TO WORKSPACE
```

Namun pengguna tetap memiliki **shortcut navigation** agar tidak harus mengeksplorasi semuanya.

---

# 6. Information Architecture

```text
/
│
├── Home
│
├── Workspace
│   ├── About
│   ├── Skills
│   ├── Experience
│   ├── Projects
│   └── Contact
│
├── Projects
│   └── Project Detail
│
└── Resume
```

3D Workspace menjadi **core experience**, sementara informasi tetap bisa diakses melalui UI konvensional.

---

# 7. Landing Page

## Objective

Memberikan first impression sebelum pengguna masuk ke workspace.

### Visual

Layar gelap.

Teks muncul secara bertahap:

```text
INITIALIZING WORKSPACE...

Loading environment...
Loading projects...
Loading experience...
Loading skills...

SYSTEM READY
```

Kemudian:

```text
BAGUS BATRA

WEB DEVELOPER
```

CTA:

```text
[ ENTER WORKSPACE ]
```

Secondary:

```text
[ VIEW RESUME ]
```

---

# 8. Workspace

Ini merupakan **main scene**.

## Environment

Ruangan sederhana:

```text
┌─────────────────────────────────────────┐
│                                         │
│            WALL / PROJECTS              │
│                                         │
│          ┌───────────────┐              │
│          │   MONITOR     │              │
│          └───────────────┘              │
│                                         │
│     BOOKS             DESK LAMP         │
│                                         │
│             ┌─────────┐                 │
│             │  DESK   │                 │
│             └─────────┘                 │
│                                         │
└─────────────────────────────────────────┘
```

---

# 9. 3D Objects

## 9.1 Monitor

**Function:** Projects

Ketika hover:

```text
PROJECTS
Explore my work
```

Ketika click:

Camera bergerak menuju monitor.

Monitor menampilkan UI Projects.

---

## 9.2 Keyboard

**Function:** Skills

Saat diklik:

Terminal muncul.

```text
$ skills

Frontend
HTML
CSS
JavaScript
React

Backend
PHP
Laravel
MySQL

3D
Three.js
WebGL
```

---

## 9.3 Books

**Function:** About / Education

Buku dapat diberi label:

```text
WEB DEVELOPMENT
```

```text
ABOUT ME
```

Saat diklik, kamera mendekat dan buku terbuka.

---

## 9.4 Smartphone

**Function:** Contact

Screen:

```text
CONTACT

LinkedIn
GitHub
Email
WhatsApp
```

---

## 9.5 Desk Lamp

**Function:** Experience

Lampu menyala ketika hover.

Klik:

```text
EXPERIENCE

2026
IT Programmer

Previous Experience
...

Education
D3 Teknologi Informasi
```

---

## 9.6 Coffee

**Function:** Easter Egg**

Tidak wajib.

Saat diklik:

```text
COFFEE DETECTED

Developer productivity:
+25%

STATUS:
READY TO CODE
```

---

# 10. Project Showcase

Projects merupakan bagian terpenting setelah Hero.

Ketika monitor diklik, tampilkan:

```text
PROJECTS

┌───────────────────────────────┐
│ Laboratory Procurement System │
│ Laravel • MySQL • JavaScript  │
│                               │
│ [ VIEW PROJECT ]              │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Elips Academy Website         │
│ Laravel • JavaScript          │
│                               │
│ [ VIEW PROJECT ]              │
└───────────────────────────────┘
```

---

# 11. Project Detail

Setiap project mempunyai:

## Required

- Project name
- Thumbnail
- Description
- Problem
- Solution
- Technology
- Role
- Features
- Result
- GitHub
- Live Demo

## Example

```text
LABORATORY PROCUREMENT SYSTEM

Laravel
MySQL
JavaScript

ABOUT
A web-based procurement system...

PROBLEM
Manual procurement process...

SOLUTION
...

FEATURES
• Product management
• Quotation
• Order
• Delivery
• Receipt
• Reporting

TECH STACK

PHP
Laravel
MySQL
JavaScript

[ LIVE DEMO ]
[ GITHUB ]
```

---

# 12. About Section

About tidak dibuat terlalu panjang.

```text
BAGUS BATRA

Web Developer

I build web applications focused on
functionality, usability and clean
digital experiences.

EDUCATION
D3 Teknologi Informasi

FOCUS
Web Development
Software Engineering
Interactive Web
```

Tambahkan foto profesional jika diinginkan.

---

# 13. Skills

Gunakan pendekatan **skill visualization**, bukan progress bar palsu.

Jangan:

```text
Laravel ██████████ 100%
```

Lebih baik:

```text
TECH STACK

Frontend
HTML
CSS
JavaScript

Backend
PHP
Laravel

Database
MySQL

Tools
Git
GitHub

3D
Three.js
WebGL
```

Skill level bisa dijelaskan melalui **experience/project**, bukan angka subjektif.

---

# 14. Experience

Timeline horizontal/vertical.

```text
2026
│
├── IT Programmer
│
│   Enterprise / Internal System
│
├── Freelance Web Developer
│
│   Web Development Projects
│
└── IT Trainer
    Web Development & Computer
```

Setiap experience memiliki:

- Company
- Position
- Period
- Description
- Responsibility
- Technologies

---

# 15. Contact

Contact dibuat seperti **communication terminal**.

```text
COMMUNICATION CENTER

Interested in working together?

EMAIL
hello@example.com

LINKEDIN
...

GITHUB
...

WHATSAPP
...

[ SEND MESSAGE ]
```

Form:

```text
Name
Email
Subject
Message

[ SEND MESSAGE ]
```

---

# 16. Navigation System

Walaupun website berbasis 3D, navigation harus tetap tersedia.

## Desktop

Floating navbar:

```text
BAGUS BATRA

ABOUT
PROJECTS
SKILLS
EXPERIENCE
CONTACT

[ RESUME ]
```

## Workspace Mode

Minimal:

```text
☰     BAGUS BATRA        EXIT WORKSPACE
```

---

# 17. Camera System

Camera merupakan bagian penting dari UX.

## Default

```text
Camera
   ↓
Desk
```

## Hover

Objek sedikit bergerak.

## Click

Camera melakukan:

```text
Current Position
        ↓
Smooth Transition
        ↓
Target Object
```

Gunakan:

- GSAP
- easing
- lerp
- damp

Jangan menggunakan perpindahan kamera secara tiba-tiba.

---

# 18. Interaction

## Mouse

Mouse movement:

```text
Mouse X → Camera rotation
Mouse Y → Camera rotation
```

Efek sangat kecil agar tidak mengganggu.

## Hover

Objek:

- sedikit scale
- highlight
- tooltip
- cursor berubah

## Click

Objek membuka informasi.

## Scroll

Scroll mengontrol cinematic transition.

---

# 19. Loading System

Karena asset 3D bisa cukup berat, wajib ada loading screen.

```text
LOADING WORKSPACE

████████████████░░░░ 82%

Loading 3D assets...

82%
```

Setelah selesai:

```text
WORKSPACE READY

[ ENTER ]
```

---

# 20. Performance Requirements

Ini sangat penting.

## Target

### Desktop

**60 FPS** pada perangkat modern.

### Mobile

Minimal:

**30–60 FPS**

## Optimization

Gunakan:

- `.glb/.gltf`
- Draco compression
- KTX2 texture
- texture resolution optimization
- lazy loading
- instancing
- frustum culling
- limited shadow resolution
- baked lighting jika memungkinkan

Hindari terlalu banyak:

- real-time shadows
- high-poly objects
- particle berlebihan
- transparent materials
- post-processing berat

---

# 21. Responsive Design

## Desktop

Full 3D experience.

```text
┌─────────────────────────────┐
│                             │
│         3D WORKSPACE        │
│                             │
│       ┌───────────┐         │
│       │  MONITOR  │         │
│       └───────────┘         │
│                             │
└─────────────────────────────┘
```

## Tablet

Camera lebih dekat.

Beberapa object interaction disederhanakan.

## Mobile

**Jangan memaksakan workspace 3D penuh.**

Gunakan:

```text
Mobile Workspace

      BAGUS BATRA
      WEB DEVELOPER

[ ABOUT ]
[ PROJECTS ]
[ SKILLS ]
[ EXPERIENCE ]
[ CONTACT ]
```

3D tetap ada sebagai background/dekorasi ringan.

---

# 22. Accessibility

Wajib tersedia:

- Skip animation
- Reduced motion
- Keyboard navigation
- Text alternative
- readable contrast
- semantic HTML
- accessible buttons

Tambahkan:

```text
[ REDUCE MOTION ]
```

untuk pengguna yang tidak ingin animasi berlebihan.

---

# 23. Audio

Audio **optional**.

Default:

**OFF**

Jika user mengaktifkan:

- keyboard typing
- mouse click
- monitor power-on
- subtle ambient room sound

Jangan autoplay audio tanpa interaksi.

---

# 24. Visual Design

## Colors

| Role | Color |
|---|---|
| Primary | `#2158F5` |
| Background | `#0B0D10` |
| Surface | `#14171C` |
| Text | `#F4F6F9` |
| Secondary | `#8B949E` |

## Typography

**Inter** untuk UI.

**JetBrains Mono** untuk terminal/code elements.

---

# 25. Lighting

Konsep lighting:

```text
                AREA LIGHT
                    ↓
              ┌───────────┐
              │  MONITOR  │
              └───────────┘
                    ↓
                 DESK

        ← Ambient Light
```

Gunakan:

- Ambient light
- Directional light
- Point light dari monitor
- Desk lamp
- Soft shadows

Monitor memberikan **subtle blue glow** ke meja.

---

# 26. 3D Asset Strategy

Tidak semua object harus dibuat dari nol.

## Custom

- Desk
- Monitor
- Keyboard
- Books
- Phone

## Generic

- Coffee cup
- Lamp
- Chair
- Plant
- Small decorations

Gunakan asset yang memiliki lisensi sesuai untuk penggunaan portfolio.

---

# 27. Tech Stack

## Recommended

```text
React
React Three Fiber
Three.js
Drei
GSAP
TypeScript
Tailwind CSS
Vite
```

## Optional

```text
Postprocessing
Lenis
Leva
Zustand
```

---

# 28. Architecture

```text
src/
│
├── app/
│   ├── App.tsx
│   └── routes.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── LoadingScreen.tsx
│   ├── ProjectPanel.tsx
│   ├── AboutPanel.tsx
│   └── ContactPanel.tsx
│
├── three/
│   ├── Workspace.tsx
│   ├── CameraController.tsx
│   ├── Lighting.tsx
│   │
│   ├── objects/
│   │   ├── Desk.tsx
│   │   ├── Monitor.tsx
│   │   ├── Keyboard.tsx
│   │   ├── Books.tsx
│   │   ├── Phone.tsx
│   │   └── Coffee.tsx
│   │
│   └── interactions/
│       ├── HoverManager.ts
│       └── ClickManager.ts
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
│
└── styles/
```

---

# 29. Data Architecture

Portfolio content jangan ditulis langsung di komponen.

Contoh:

```ts
const projects = [
  {
    id: 1,
    title: "Laboratory Procurement System",
    description: "...",
    technologies: [
      "Laravel",
      "MySQL",
      "JavaScript"
    ],
    image: "/projects/lab.png",
    github: "...",
    demo: "..."
  }
];
```

Dengan begitu project bisa ditambahkan tanpa mengubah struktur 3D.

---

# 30. SEO

Walaupun menggunakan Three.js, SEO tetap harus menggunakan HTML biasa.

```html
<title>
  Bagus Batra — Web Developer Portfolio
</title>
```

Meta description:

> Portfolio Bagus Batra, Web Developer specializing in modern web applications, Laravel, JavaScript and interactive digital experiences.

Gunakan heading:

```text
H1 → Bagus Batra — Web Developer
H2 → Projects
H2 → Skills
H2 → Experience
H2 → Contact
```

---

# 31. Analytics

Optional tetapi berguna.

Track:

```text
Page Visit
Workspace Enter
Project Open
Project Demo Click
GitHub Click
Resume Download
Contact Click
```

Jangan mengumpulkan data pribadi yang tidak diperlukan.

---

# 32. Easter Eggs

Maksimal 3–5.

## Konami Code

Keyboard berubah menjadi mode developer.

## Coffee

```text
COFFEE LEVEL: CRITICAL
```

## Monitor Terminal

User bisa mengetik:

```text
help
about
projects
skills
contact
```

## Secret Message

```text
> sudo hire bagus
> permission granted
```

Easter egg harus menjadi bonus, bukan bagian utama navigasi.

---

# 33. Error State

Jika WebGL tidak tersedia:

```text
3D EXPERIENCE UNAVAILABLE

Your browser/device doesn't support
the full 3D experience.

You can still explore my portfolio
using the standard interface.

[ CONTINUE ]
```

Jika asset gagal:

```text
Unable to load workspace.

[ RETRY ]
[ VIEW STANDARD PORTFOLIO ]
```

---

# 34. Security

Jika hanya static portfolio:

- tidak membutuhkan database
- tidak membutuhkan authentication
- tidak membutuhkan backend

Contact form dapat menggunakan:

- serverless function
- email service
- backend Laravel

Jangan expose:

- API secret
- private keys
- database credentials

---

# 35. Deployment

## Recommended

```text
GitHub
   ↓
Vercel / Netlify
   ↓
Custom Domain
```

## Jika membutuhkan backend

```text
Frontend
React + Three.js
       ↓
Backend
Laravel API
       ↓
MySQL
```

---

# 36. MVP

Jangan langsung membuat seluruh konsep.

## Phase 1 — Foundation

- React
- R3F
- Three.js
- basic scene
- camera
- lighting
- responsive canvas

## Phase 2 — Workspace

- desk
- monitor
- keyboard
- books
- phone
- lamp

## Phase 3 — Interaction

- hover
- click
- camera animation
- object highlighting

## Phase 4 — Content

- About
- Skills
- Experience
- Projects
- Contact

## Phase 5 — Polish

- loading
- animation
- sound
- particles
- post processing

## Phase 6 — Optimization

- GLB compression
- texture optimization
- mobile
- accessibility
- SEO

---

# 37. MVP Acceptance Criteria

Website dianggap berhasil jika:

- [ ] User dapat membuka landing page.
- [ ] Loading asset memiliki feedback.
- [ ] User dapat masuk ke workspace.
- [ ] Workspace dapat dirender tanpa error.
- [ ] Monitor dapat diinteraksikan.
- [ ] Keyboard dapat diinteraksikan.
- [ ] Books dapat diinteraksikan.
- [ ] Phone dapat diinteraksikan.
- [ ] Experience dapat dibuka.
- [ ] Projects dapat dibuka.
- [ ] Project detail dapat dilihat.
- [ ] Contact dapat diakses.
- [ ] Navigation konvensional tersedia.
- [ ] Website dapat digunakan tanpa memahami 3D.
- [ ] Mobile memiliki fallback yang layak.
- [ ] Loading tidak membuat user menunggu tanpa informasi.
- [ ] Tidak ada secret/API key di frontend.

---

# 38. Definition of Done

Project dianggap **production-ready** ketika:

```text
✓ 3D Scene
✓ Responsive
✓ Interactive
✓ Project Showcase
✓ About
✓ Skills
✓ Experience
✓ Contact
✓ Resume
✓ SEO
✓ Accessibility
✓ Loading State
✓ Error State
✓ Performance Optimization
✓ Mobile Fallback
✓ Analytics
✓ Deployment
```

---

# 39. Final Experience

Pengalaman ideal user:

```text
             WEBSITE
                │
                ▼
        ┌───────────────┐
        │   BOOTING...  │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │ BAGUS BATRA   │
        │ WEB DEVELOPER │
        │               │
        │    ENTER      │
        └───────┬───────┘
                │
                ▼
      ┌─────────────────────┐
      │                     │
      │   DIGITAL           │
      │   WORKSPACE         │
      │                     │
      │    🖥️               │
      │                     │
      │ 📚        📱        │
      │                     │
      │       ⌨️            │
      │                     │
      └─────────────────────┘
          │     │      │
          ▼     ▼      ▼
       ABOUT PROJECTS CONTACT
```

# 40. Core Product Principle

> **3D adalah experience, bukan penghalang.**

Recruiter harus bisa mendapatkan informasi penting dalam **30–60 detik**, sementara orang yang ingin mengeksplorasi bisa menghabiskan beberapa menit menikmati workspace.

Portfolio ini tidak hanya menunjukkan:

> **"Saya bisa membuat website."**

Tetapi secara tidak langsung menunjukkan:

> **"Saya bisa membangun sebuah digital experience."**
