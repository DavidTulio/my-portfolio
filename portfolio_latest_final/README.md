# David John Emmanuel G. Tulio — Portfolio

Personal portfolio website built with pure **HTML, CSS, and JavaScript**.
No frameworks, no build tools — clean, fast, and fully responsive.

**Live site:** https://davidtulio-portfolio.netlify.app
**GitHub:** [github.com/DavidTulio](https://github.com/DavidTulio)

---

## 📁 Project Structure

```
my_portfolio/
├── index.html                ← Home page
├── about.html                ← About (bio, photo, skills, certifications)
├── projects.html             ← Projects showcase (5 projects)
├── contact.html              ← Contact form + social links + resume download
├── blog.html                 ← Blog (3 full articles)
├── certificate.html          ← Certificate viewer (shared for all certs)
│
└── assets/
    ├── images/
    │   ├── logo-light.png        ← Black logo (light mode)
    │   ├── logo-dark.png         ← White logo (dark mode)
    │   ├── david-photo.jpg       ← Profile photo
    │   ├── home-dropify.png      ← Dropify screenshots
    │   ├── merch-dropify.PNG
    │   ├── about-dropify.PNG
    │   ├── 4b-home.PNG           ← 4B Betis Furniture screenshots
    │   ├── 4b-store.PNG
    │   ├── 4b-about.PNG
    │   ├── Focusflow1.png        ← FocusFlow screenshots
    │   ├── Focusflow2.png
    │   ├── Focusflow3.png
    │   ├── AllowanceIQ1.png      ← AllowanceIQ screenshots
    │   ├── AllowanceIQ2.png
    │   ├── AllowanceIQ3.png
    │   ├── vitalcheck1.png       ← VitalCheck screenshots
    │   ├── vitalcheck2.png
    │   ├── vitalcheck3.png
    │   ├── Blog1.jpg             ← Blog hero images
    │   └── Blog2.jpg
    │
    ├── certificates/             ← All certificate files (PDF + PNG)
    │   ├── Comptia-cert.pdf
    │   ├── JS-cert.pdf
    │   ├── CCNA-cert.pdf
    │   ├── Endpoint-cert.pdf
    │   ├── Simplilearn-1.pdf
    │   ├── Simplilearn-2.pdf
    │   ├── Simplilearn-3.pdf
    │   ├── Simplilearn-4.pdf
    │   ├── 6WSEA CERTIFICATE SEO1.png
    │   ├── GA1 - Get started using Google Analytics.pdf
    │   ├── GA2 - Manage GA4 Data and Learn to Read Reports.pdf
    │   ├── GA3 - Use GA4 with other Tools and Data Sources.pdf
    │   ├── GA4 - Dive Deeper into GA4 Data and Reports.pdf
    │   └── Google Analytics Certification.pdf
    │
    ├── css/
    │   ├── tokens.css            ← Design tokens (colors, fonts, spacing)
    │   ├── base.css              ← Reset, typography, shared utilities
    │   ├── nav.css               ← Navigation bar styles
    │   ├── footer.css            ← Footer styles
    │   └── pages/
    │       ├── home.css          ← Home page styles
    │       ├── about.css         ← About page styles
    │       ├── projects.css      ← Projects page styles
    │       ├── contact.css       ← Contact page styles
    │       ├── blog.css          ← Blog page styles
    │       └── certificate.css   ← Certificate viewer styles
    │
    ├── js/
    │   ├── theme.js              ← Dark/light mode toggle + logo swap
    │   ├── nav.js                ← Navbar scroll effect + mobile menu
    │   └── animations.js         ← Scroll reveal, counters, form handler
    │
    └── TULIO_RESUME.pdf          ← Resume (linked on About + Contact pages)
```

---

## ✨ Features

- **6 pages** — Home, About, Projects, Contact, Blog, Certificate Viewer
- **5 projects** — Dropify, 4B Betis Furniture, FocusFlow, AllowanceIQ, VitalCheck
- **14 certificates** — with dedicated viewer page (Download + Open Full Screen + prev/next)
- **3 blog articles** — all fully readable with inline expand/collapse
- **Contact form** — connected to Formspree, messages delivered to Gmail
- **Dark / Light mode** — with localStorage persistence and logo auto-swap
- **Dual font system** — Unbounded (headings) + Bebas Neue (UI labels)
- **Mobile responsive** — hamburger menu, fluid layouts
- **Scroll reveal animations** — IntersectionObserver
- **Resume download** — on both About and Contact pages
- **SEO metadata** — title, description, Open Graph on all pages
- **Accessibility** — ARIA roles, semantic HTML, descriptive alt texts

---

## 🎨 Design System

| Role | Font | Used for |
|---|---|---|
| Display | **Unbounded** | Big headings, hero name, section titles |
| UI | **Bebas Neue** | Navbar, buttons, tags, labels |
| Body | **System UI** | Paragraphs, descriptions, body text |

| Mode | Background | Text |
|---|---|---|
| Light | `#f4f1ec` warm off-white | `#0d0c0a` near-black |
| Dark | `#0d0c0a` deep charcoal | `#f4f1ec` warm white |

All tokens in `assets/css/tokens.css`.

---

## 📝 Still To Fill In

| What | File | How |
|---|---|---|
| Testimonial names | `index.html` | Find `EDIT:` comments, fill in initials, name, role |
| Dropify GitHub link | `projects.html` | Find the commented-out GitHub button and uncomment |

---

## 🏅 Certificate Viewer

All cert cards in `about.html` link to `certificate.html?cert=ID`.

**To add a new certificate:**
1. Put the file in `assets/certificates/`
2. Add a new object to the `CERTIFICATES` array in `certificate.html`
3. Add a new cert card in `about.html` linking to `certificate.html?cert=your-id`
4. Add the newest cert at the **top** of both lists (newest → oldest order)

---

## ✍️ Blog

All 3 articles are fully readable via inline expand/collapse.

**To add a new blog post:**
1. Add a new blog card in `blog.html`
2. Add the expanded article `<div id="article-N">` below the cards section
3. Make sure the button uses `data-read-more="article-N"`

---

## 📬 Contact Form

The contact form sends messages directly to `davidjohne.tulio@gmail.com` via **Formspree**.
No backend or database required.

- Formspree endpoint: `https://formspree.io/f/xdawwkyr`
- To change the recipient email: update your Formspree account settings

---

## 🚀 Deployment

**Update live site after any change:**
```bash
git add .
git commit -m "describe what you changed"
git push
```
Netlify auto-redeploys within 30 seconds on every push.

**First-time setup (if needed):**
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/DavidTulio/my_portfolio.git
git push -u origin main
```

---

## 🔧 Quick Reference

| What to change | Where |
|---|---|
| Hero tagline | `index.html` → `EDIT: Tagline` comment |
| Stat numbers | `index.html` → `STAT 1`, `STAT 2`, `STAT 3`, `STAT 4` comments |
| Availability status | `index.html` → `EDIT: Change the availability text` |
| Logo files | Replace `assets/images/logo-light.png` + `logo-dark.png` |
| Colors / spacing | `assets/css/tokens.css` |
| Contact form recipient | Formspree dashboard → update email |

---

&copy; 2025 David John Emmanuel G. Tulio. All rights reserved.
