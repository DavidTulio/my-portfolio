# David John Emmanuel G. Tulio — Portfolio

Personal portfolio website built with pure **HTML, CSS, and JavaScript**.
No frameworks, no build tools — clean, fast, and fully responsive.

**Live site:** `davidtulio.netlify.app` *(update this once deployed)*
**GitHub:** [github.com/DavidTulio](https://github.com/DavidTulio)

---

## 📁 Project Structure

```
portfolio_v4/
├── index.html                ← Home page
├── about.html                ← About (bio, photo, skills, certifications)
├── projects.html             ← Projects showcase
├── contact.html              ← Contact form + social links
├── blog.html                 ← Blog articles
│
└── assets/
    ├── images/
    │   ├── logo-light.png    ← Black logo (used in light mode)
    │   ├── logo-dark.png     ← White logo (used in dark mode)
    │   └── ...               ← Add your photos and blog images here
    │
    ├── certificates/         ← Create this folder, put your PDF certs here
    │   ├── comptia-itf.pdf
    │   ├── cisco-js-essentials.pdf
    │   ├── cisco-ccna.pdf
    │   └── cisco-endpoint-security.pdf
    │
    ├── css/
    │   ├── tokens.css        ← Design tokens (colors, fonts, spacing)
    │   ├── base.css          ← Reset, typography, shared utilities
    │   ├── nav.css           ← Navigation bar styles
    │   ├── footer.css        ← Footer styles
    │   └── pages/
    │       ├── home.css      ← Home page styles
    │       ├── about.css     ← About page styles
    │       ├── projects.css  ← Projects page styles
    │       ├── contact.css   ← Contact page styles
    │       └── blog.css      ← Blog page styles
    │
    ├── js/
    │   ├── theme.js          ← Dark/light mode toggle + logo swap
    │   ├── nav.js            ← Navbar scroll effect + mobile menu
    │   └── animations.js     ← Scroll reveal, counters, form handler
    │
    └── TULIO_RESUME.pdf      ← Your resume (linked to Download button)
```

---

## ✨ Features

- **5 pages** — Home, About, Projects, Contact, Blog
- **Dark / Light mode** toggle with `localStorage` persistence and system preference detection
- **Dual font system** — Unbounded (wide, for headings) + Bebas Neue (condensed, for UI labels)
- **Logo auto-swap** between black and white versions when toggling theme
- **Mobile responsive** with hamburger menu
- **Scroll reveal animations** using `IntersectionObserver`
- **Project filter** by category on Projects page
- **Expandable blog articles** — inline read more / collapse
- **Contact form** with validation and success state
- **Resume download** button on About page
- **SEO metadata** on all pages (title, description, Open Graph)
- **Accessibility** — ARIA roles, semantic HTML, keyboard navigation

---

## 🎨 Design System

| | Font | Used for |
|---|---|---|
| Display | **Unbounded** | Big headings, hero name, section titles, project titles |
| UI | **Bebas Neue** | Navbar links, buttons, tags, skill pills, labels |
| Body | **System UI** | Paragraphs, descriptions, bio text |

| | Color |
|---|---|
| Light mode background | `#f4f1ec` warm off-white |
| Light mode ink | `#0d0c0a` near-black |
| Dark mode background | `#0d0c0a` deep charcoal |
| Dark mode ink | `#f4f1ec` warm white |

All tokens live in `assets/css/tokens.css` — edit colors and spacing there.

---

## 📝 Still To Fill In

These are the remaining placeholder sections to complete:

| Section | File | What to add |
|---|---|---|
| Testimonials | `index.html` | Quotes, names, roles from classmates/professors/clients |
| Blog hero images | `blog.html` | Replace thumb divs with `<img>` tags (see below) |
| 3rd project | `index.html` + `projects.html` | Your next project details + links |
| GitHub links | `projects.html` | Replace all `href="#"` on GitHub buttons |
| Social links | All pages footer | Twitter/X and Facebook URLs |
| Certificate links | `about.html` | Replace `href="#"` with PDF paths (see below) |
| Certificate years | `about.html` | Fill in the year for each cert |
| About photo | `about.html` | Add your photo (see below) |

---

## 📸 Adding Your Photo (About Page)

1. Put your photo in `assets/images/` — e.g. `david-photo.jpg`
2. Open `about.html` and find the comment `EDIT: Your Photo`
3. Update the `src` attribute:
   ```html
   <img src="assets/images/david-photo.jpg"
        alt="David John Emmanuel G. Tulio" />
   ```
4. Delete the `<div class="about-hero__photo-placeholder">` block below it

---

## 🖼️ Adding Blog Hero Images

1. Put your images in `assets/images/` — e.g. `blog-hero-1.jpg`
2. Open `blog.html` and find the thumbnail div for each article:
   ```html
   <!-- Find this: -->
   <div class="blog-card__thumb blog-card__thumb--1"></div>

   <!-- Replace with this: -->
   <img src="assets/images/blog-hero-1.jpg"
        alt="Brief description"
        class="blog-card__thumb" />
   ```

---

## 🏅 Linking Certificate PDFs

1. Create a folder inside assets: `assets/certificates/`
2. Copy your downloaded PDF certificates into that folder
3. Open `about.html`, find each cert card, and update the link:
   ```html
   <!-- Before: -->
   <a href="#" class="cert-card__link">View Certificate →</a>

   <!-- After: -->
   <a href="assets/certificates/comptia-itf.pdf"
      class="cert-card__link"
      target="_blank">View Certificate →</a>
   ```
> `target="_blank"` makes the PDF open in a new tab instead of leaving your portfolio.

---

## ✍️ Turning "Coming Soon" into a Real Blog Post

**Option A — Inline expandable (best for short articles)**
1. Open `blog.html` and find the Coming Soon card
2. Change the button from:
   ```html
   <a href="#" class="btn btn--ghost" disabled>Coming Soon</a>
   ```
   To:
   ```html
   <button class="btn btn--ghost blog-read-more">Read Article</button>
   ```
3. Add your article content inside a `<div class="blog-article-body">` below the card

**Option B — Separate page (recommended for long articles)**
1. Create a new file e.g. `blog-post-2.html` (duplicate `blog.html` as a starting point)
2. Write your full article inside it
3. In `blog.html`, update the button:
   ```html
   <a href="blog-post-2.html" class="btn btn--ghost">Read Article →</a>
   ```

---

## 🔗 Connecting the Contact Form

The form currently shows a success message but doesn't send real emails.
To make it functional, use **Formspree** (free):

1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → copy your unique URL (e.g. `https://formspree.io/f/xabcdefg`)
3. Open `assets/js/animations.js` → find the form submit handler
4. Replace the simulated response with a real `fetch()` POST to your Formspree URL

---

## 🚀 Deployment

### Step 1 — Push to GitHub

Open Terminal / Command Prompt, navigate to your portfolio folder, then run:

```bash
git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/DavidTulio/david-tulio-portfolio.git
git push -u origin main
```

### Step 2 — Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) → **Sign up with GitHub**
2. Click **Add new site** → **Import an existing project** → **GitHub**
3. Select your `david-tulio-portfolio` repository
4. Leave all build settings blank (no build step needed for plain HTML)
5. Click **Deploy site** — you're live 🎉

**To update your live site after any changes:**
```bash
git add .
git commit -m "describe what you changed"
git push
```
Netlify auto-redeploys within 30 seconds every time you push to GitHub.

**To set a custom site name:**
Netlify dashboard → **Site settings** → **Domain management** → **Change site name**
→ e.g. `davidtulio` makes your URL `davidtulio.netlify.app`

---

## 🔧 Quick Reference — Common Edits

| What to change | Where to find it |
|---|---|
| Hero tagline | `index.html` → `EDIT: Tagline` comment |
| Stat numbers | `index.html` → `STAT 1`, `STAT 2` comments |
| Availability status | `index.html` → `EDIT: Change the availability text` |
| Logo image | Replace `assets/images/logo-light.png` and `logo-dark.png` |
| Colors / spacing | `assets/css/tokens.css` |
| Fonts | `assets/css/tokens.css` → `--font-display` and `--font-body` |
| Contact form backend | `assets/js/animations.js` → form submit handler |

---

&copy; 2025 David John Emmanuel G. Tulio. All rights reserved.
