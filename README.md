# David John Emmanuel G. Tulio — Portfolio

Personal portfolio website built with pure **HTML, CSS, and JavaScript**.
No frameworks, no build tools — clean, fast, and fully responsive.

**Live site:** `davidtulio.netlify.app` *(update once deployed)*
**GitHub:** [github.com/DavidTulio](https://github.com/DavidTulio)

---

## 📁 Project Structure

```
my_portfolio/
├── index.html                ← Home page
├── about.html                ← About (bio, photo, skills, certifications)
├── projects.html             ← Projects showcase
├── contact.html              ← Contact form + social links + resume download
├── blog.html                 ← Blog articles
├── certificate.html          ← Certificate viewer page (shared for all certs)
│
└── assets/
    ├── images/
    │   ├── logo-light.png    ← Black logo (light mode)
    │   ├── logo-dark.png     ← White logo (dark mode)
    │   ├── david-photo.jpg   ← Your profile photo
    │   ├── home-dropify.png  ← Dropify screenshots
    │   ├── merch-dropify.PNG
    │   ├── about-dropify.PNG
    │   ├── 4b-home.PNG       ← 4B Betis Furniture screenshots
    │   ├── 4b-store.PNG
    │   ├── 4b-about.PNG
    │   ├── Blog1.jpg         ← Blog hero images
    │   └── Blog2.jpg
    │
    ├── certificates/         ← All certificate files
    │   ├── Comptia-cert.pdf
    │   ├── JS-cert.pdf
    │   ├── CCNA-cert.pdf
    │   ├── Endpoint-cert.pdf
    │   ├── Simplilearn-1.pdf
    │   ├── Simplilearn-2.pdf
    │   ├── Simplilearn-3.pdf
    │   ├── Simplilearn-4.pdf
    │   └── 6WSEA CERTIFICATE SEO1.png
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
    │       └── certificate.css   ← Certificate viewer page styles
    │
    ├── js/
    │   ├── theme.js          ← Dark/light mode toggle + logo swap
    │   ├── nav.js            ← Navbar scroll effect + mobile menu
    │   └── animations.js     ← Scroll reveal, counters, form handler
    │
    └── TULIO_RESUME.pdf      ← Resume (linked on About + Contact pages)
```

---

## ✨ Features

- **6 pages** — Home, About, Projects, Contact, Blog, Certificate Viewer
- **Certificate viewer** — dedicated styled page for each cert with Download + Open Full Screen buttons and prev/next navigation
- **Dark / Light mode** toggle with localStorage persistence
- **Dual font system** — Unbounded (wide headings) + Bebas Neue (UI labels)
- **Logo auto-swap** between black/white versions on theme toggle
- **Mobile responsive** with hamburger menu
- **Scroll reveal animations**
- **Project filter** by category on Projects page
- **Expandable blog articles** inline
- **Contact form** with validation and success state
- **Resume download** on both About and Contact pages
- **SEO metadata** on all pages
- **Accessibility** — ARIA roles, semantic HTML, descriptive alt texts

---

## 🎨 Design System

| Role | Font | Used for |
|---|---|---|
| Display | **Unbounded** | Big headings, hero name, section titles |
| UI | **Bebas Neue** | Navbar, buttons, tags, labels, pills |
| Body | **System UI** | Paragraphs, descriptions, bio text |

| Mode | Background | Text |
|---|---|---|
| Light | `#f4f1ec` warm off-white | `#0d0c0a` near-black |
| Dark | `#0d0c0a` deep charcoal | `#f4f1ec` warm white |

All tokens in `assets/css/tokens.css`.

---

## 📝 Still To Complete

| What | File | How |
|---|---|---|
| Testimonials (3) | `index.html` | Find `TESTIMONIAL 1/2/3` comments, add real quotes |
| 3rd project | `index.html` + `projects.html` | Find `PROJECT CARD 3` / `Project 03` comments |
| Dropify GitHub link | `projects.html` | Find `PLACEHOLDER: Add your Dropify GitHub` comment |
| Personal interests | `about.html` | Find the two empty `interest-pill` placeholders |

---

## 🏅 Certificate Viewer

Each cert card in `about.html` links to `certificate.html?cert=ID`.
The viewer loads the correct certificate based on the URL parameter.

**To add a new certificate:**
1. Put the file in `assets/certificates/`
2. Add a new object to the `CERTIFICATES` array in `certificate.html`:
   ```js
   {
     id:       'your-unique-id',      // used in the URL ?cert=this
     title:    'Certificate Name',
     issuer:   'Issuing Organisation',
     year:     '2025',
     file:     'assets/certificates/your-file.pdf',
     fileType: 'pdf',                 // 'pdf' or 'image'
     desc:     'Short description of what this certificate covers.'
   },
   ```
3. Add a cert card in `about.html`:
   ```html
   <article class="cert-card reveal">
     <div class="cert-card__badge" aria-hidden="true">🏅</div>
     <div>
       <div class="cert-card__issuer">Organisation</div>
       <div class="cert-card__title">Certificate Name</div>
       <div class="cert-card__year">2025</div>
     </div>
     <a href="certificate.html?cert=your-unique-id" class="cert-card__link">
       View Certificate →
     </a>
   </article>
   ```

---

## ✍️ Adding a New Blog Post

**Option A — Inline expandable (short posts)**
1. In `blog.html`, find the Coming Soon card
2. Change the `Coming Soon →` anchor to a `<button class="btn btn--ghost blog-read-more">Read Article</button>`
3. Add your content inside a `<div class="blog-article-body">` below the card

**Option B — Separate page (recommended for long posts)**
1. Create `blog-post-name.html` (duplicate `blog.html` as starting point)
2. Write your article inside it
3. In `blog.html`, update the button: `<a href="blog-post-name.html">Read Article →</a>`

---

## 🔗 Connecting the Contact Form

Form currently simulates success. To make it real, use **Formspree** (free):
1. Go to [formspree.io](https://formspree.io) → create account → get form URL
2. In `assets/js/animations.js`, find the form submit handler
3. Replace the simulated block with a `fetch()` POST to your Formspree URL

---

## 🚀 Deployment

### Push to GitHub
```bash
git add .
git commit -m "describe your changes"
git push
```

### First-time setup (if needed)
```bash
git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/DavidTulio/my_portfolio.git
git push -u origin main
```

### Netlify (auto-deploys on every push)
1. [netlify.com](https://netlify.com) → Sign up with GitHub
2. **Add new site** → **Import from GitHub** → select repo
3. Leave build settings blank → **Deploy site**
4. Set custom name: **Site settings** → **Domain** → `davidtulio.netlify.app`

---

## 🔧 Quick Reference

| What to change | Where |
|---|---|
| Hero tagline | `index.html` → `EDIT: Tagline` |
| Stat numbers | `index.html` → `STAT 1`, `STAT 2`, `STAT 3`, `STAT 4` |
| Availability status | `index.html` → `EDIT: Change the availability text` |
| Logo files | Replace `assets/images/logo-light.png` + `logo-dark.png` |
| Colors / spacing | `assets/css/tokens.css` |
| Fonts | `assets/css/tokens.css` → `--font-display`, `--font-body` |
| Contact form backend | `assets/js/animations.js` → form submit handler |

---

&copy; 2025 David John Emmanuel G. Tulio. All rights reserved.
