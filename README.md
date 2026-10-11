# Rajtilak Chamlagain | Official Engineering Portfolio 🚀

> **Live Production URL:** [https://rajtilak.me](https://rajtilak.me)  
> **Alternative Mirrors:** [https://rajtilak.live](https://rajtilak.live) • [https://rajtilakchamlagain.tech](https://rajtilakchamlagain.tech) • [https://my-portfolio-henna-rho-16.vercel.app/](https://my-portfolio-henna-rho-16.vercel.app/)

Welcome to the central repository for my personal engineering portfolio. Engineered to set a new benchmark in web aesthetics and performance, this site blends high-performance vanilla engineering with a unique **"Prism OS" (Ethereal Aurora Glass)** design language.

---

## 🌐 Official Production Domains

| Primary Domain | Status | Target / Platform |
|---|---|---|
| **[rajtilak.me](https://rajtilak.me)** | 🟢 Primary Active | Vercel Global Edge Network |
| **[rajtilak.live](https://rajtilak.live)** | 🟢 Mirror / Backup | Vercel Global Edge Network |
| **[rajtilakchamlagain.tech](https://rajtilakchamlagain.tech)** | 🟢 Tech Showcase | GitHub Student Developer Pack / Vercel |

---

## 🎨 Design Philosophy: "Prism OS" (Ethereal Aurora Glass)

Most developer portfolios fall into the dark-mode neon template trope. I engineered **Prism OS** as a breath of fresh air: an optimistic, fluid, ultra-clean aesthetic that reflects precision engineering:

1. **Ethereal Aurora Background:** A 4-color mesh gradient (`#FF9A9E`, `#FECFEF`, `#a1c4fd`, `#c2e9fb`) dynamically shifting via CSS `@keyframes` and matrix rotations to resemble an undulating liquid aurora borealis.
2. **Interactive Cursor Tracker:** An interactive mouse tracker projections an expansive radial gradient behind glass surfaces without repainting the entire DOM tree.
3. **Pristine Glassmorphism:** Layered frosted glass panels (`backdrop-filter: blur(20px)`) with subtle specular highlights, 1px gradient borders, and soft directional drop-shadows.
4. **Editorial Typography:** Geometric futuristic headers in **Space Grotesk** paired with the ergonomic warmth of **Outfit** for high-density reading.
5. **Aesthetic Custom Cursor:** A dual-element cursor (responsive glowing gradient dot + inertia-lag trailing ring with frosted blur) featuring automatic hover expansion over interactive targets.

---

## 🛠️ Complete Architecture & Tech Stack

Engineered from scratch without heavy framework bloat (Zero React, Zero Three.js, Zero Tailwind), ensuring a 99+ Lighthouse performance score and instant cold boots:

- **HTML5 (Semantic Web):** Accessible sectioning, Open Graph metadata, native SVG iconography, and responsive media tags.
- **Advanced CSS3:** Custom CSS variables, Flexbox & CSS Grid, GPU-accelerated 3D transforms (`translateZ(0)`), `backdrop-filter`, and CSS scroll-snap.
- **Modern JavaScript (ES6+ Modules & APIs):**
  - **Intersection Observer API:** Staggered scroll-triggered item reveals (`stagger-1` through `stagger-4`).
  - **Live Chess.com API:** Fetches real-time FIDE & Chess.com Blitz/Rapid stats for `RajTilakChamlagain123`.
  - **Interactive GitHub Contribution Calendar:** Live responsive calendar powered by `github-calendar.js`.
  - **Asynchronous Web3Forms:** AJAX-based contact form submission with zero-refresh client validation and mailto fallbacks.
  - **Client-Side Guestbook:** Local storage buffered feedback board with XSS sanitization.
- **Continuous Integration / Continuous Deployment:** Vercel automated CI/CD pipeline triggered on every commit to `master`.

---

## 🚀 Key Feature Breakdown

### 1. Dynamic Project Filtering System
- Instant categorisation (`All`, `AI & ML`, `Full Stack`, `UI / UX`, `Graphic Design`).
- Real-time badge count computation (`<span class="filter-count">`) dynamically counting rendered items.
- Dynamic "Showing X projects" counter with staggered entrance animations (40ms per-card stagger).

### 2. Live Platform Integrations
- **Live Chess.com Statistics:** Dynamically queries `https://api.chess.com/pub/player/RajTilakChamlagain123/stats` and displays live Rapid & Blitz ratings, user avatars, and active presence.
- **Interactive GitHub Calendar:** Real-time hoverable contribution tiles replacing static images.
- **Curated Spotify Player:** Embedded player allowing visitors to play and stream study/focus soundtracks directly inside the portfolio.

### 3. Native App-Style Mobile Overhaul (iOS Bottom Sheet Experience)
- **Floating Pill Nav:** Floating tab bar fixed to the thumb zone on mobile screens.
- **Horizontal Swipe Carousel:** CSS scroll-snap (`scroll-snap-type: x mandatory`) for effortless single-hand project browsing.
- **Bottom-Sheet Navigation Drawer:** Hamburger menu slides smoothly from bottom-to-top on phones with frosted background dimming.
- **Tactile Touch Feedback:** Micro-contraction (`scale(0.97)`) on touch devices for tactile physical response.
- **System Theme Sync:** `<meta name="theme-color" content="#FFF5F7">` blends browser chrome into the aurora background.

### 4. Interactive Multipage Sub-Hubs
Built with seamless exit/entry transitions without white screen flashes:
- **Chess Career (`chess.html`):** Tournament history, FIDE ID 88176894, verified certificates, and live stats.
- **NCC Journey (`ncc.html`):** National Cadet Corps A-Certificate achievements and National Defence Quiz distinctions.
- **Classical Music & Yoga (`music.html`):** Vocal Visharad achievements from Bhatkhande Sangit Vidyapith, Patanjali Yoga Camp certification, and embedded Spotify playlist.
- **Academics (`academics.html`):** CBSE Class 10 & 12 credentials, B.Tech CSE coursework roadmap.

### 5. Community & Connectivity
- **Direct Contact Channel:** Contact card with Web3Forms integration sending emails straight to `rjtiksrm@gmail.com`.
- **Digital Guestbook:** Live interactive visitor board allowing peers and recruiters to leave public testimonials.

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/rajtilakchamlagain/My_Portfolio.git

# 2. Enter project folder
cd My_Portfolio

# 3. Launch with any HTTP server (e.g. Python, VS Code Live Server)
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

---

## 👨‍💻 Engineering Identity

**Rajtilak Chamlagain**  
*Computer Science & Engineering Student @ Barak Valley Engineering College (2028)*  
- **Email:** [rjtiksrm@gmail.com](mailto:rjtiksrm@gmail.com)  
- **LinkedIn:** [linkedin.com/in/rajtilak-chamlagain-7129942a3](https://linkedin.com/in/rajtilak-chamlagain-7129942a3)  
- **GitHub:** [@rajtilakchamlagain](https://github.com/rajtilakchamlagain)  
- **Chess.com:** [RajTilakChamlagain123](https://www.chess.com/member/RajTilakChamlagain123)

---
*Architected & Maintained by Rajtilak Chamlagain.*
