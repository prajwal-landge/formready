<div align="center">

# 📷 FormReady

**Free, Privacy-First In-Browser Photo & Signature Resizer for Indian Exam Portals**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Backend](https://img.shields.io/badge/Backend-Zero%20(100%25%20Client--Side)-brightgreen.svg)](#privacy-first-architecture)
[![Canvas API](https://img.shields.io/badge/Engine-HTML5%20Canvas%20API-orange.svg)](#technical-architecture)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla%20JS)-success.svg)](#features)
[![AdSense Ready](https://img.shields.io/badge/AdSense-Approval%20Ready-yellow.svg)](#adsense-readiness)

<p align="center">
  Resize and compress candidate passport photographs and signatures to the exact pixel dimensions (e.g., 200×230, 140×60) and file size limits (20KB, 50KB, 100KB) mandated by Indian exam portals.
</p>

[**Explore Presets**](exam-presets.html) • [**Photo Resizer**](photo-resizer.html) • [**Signature Resizer**](signature-resizer.html) • [**Compress to KB**](compress-image-to-kb.html)

</div>

---

## 📌 Overview

Every year, millions of Indian applicants face application rejection due to mismatched image dimensions, incorrect aspect ratios, or exceeding file size limits (e.g., *maximum 50 KB for SSC CGL photos*, *maximum 20 KB for signatures*).

**FormReady** solves this problem entirely inside the user's web browser:
- **Zero Server Uploads:** Images never leave the candidate's device. Processing occurs locally using the browser's native **W3C Canvas API**.
- **Binary Search Compression:** Automatically determines the highest possible JPEG quality that strictly fits under the target KB ceiling without exceeding it.
- **25+ Official Exam Presets:** One-click presets for SSC (CGL, CHSL, MTS), UPSC Civil Services, IBPS Bank PO/Clerk, SBI, RRB Railways, NEET, JEE Main, GATE, CUET, and State PSCs.

---

## 🚀 Key Features

- **⚡ 100% Client-Side Processing:** Zero backend servers, zero database, zero API keys. Safe for sensitive candidate documents.
- **🎯 Exact Dimension & Aspect Ratio Lock:** Crop, zoom, pan, and rotate photos with custom or locked aspect ratios.
- **⚖️ Smart JPEG Binary Search Optimizer:** Converges logarithmically to the optimal JPEG quality factor (0.01 – 1.00) in under 8 iterations to match target KB limits within 1% error margin.
- **🌗 Zero-Flash Dark & Light Modes:** Synchronizes with system preferences and remembers choices via `localStorage` with no Flash of Unstyled Content (FOUC).
- **📱 Fully Responsive Design:** Clean mobile-first layout with fluid CSS variables, glassmorphic cards, and smooth CSS transitions.
- **🔍 Searchable Exam Directory:** Filter exam cards by category (Central, Banking, Engineering, Medical, State PSC) or search by exam keyword with one-click tool pre-filling.
- **♿ Accessible & SEO-Optimized:** Semantic HTML5, ARIA labels, structured JSON-LD schemas (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`), and full Lighthouse performance compliance.

---

## 📂 Project Structure

```text
FormReady/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated 1-click GitHub Pages CI/CD workflow
├── css/
│   └── style.css               # Unified responsive stylesheet with dark/light themes & CSS variables
├── js/
│   ├── theme.js                # Zero-flash theme switcher (localStorage + prefers-color-scheme)
│   ├── tool.js                 # Canvas resize engine, preset registry & binary search optimizer
│   └── main.js                 # Mobile drawer, FAQ accordions, search filter & contact form logic
├── index.html                  # Homepage (hero, interactive tool, presets, guides, FAQs)
├── photo-resizer.html          # Dedicated passport photo resizer tool
├── signature-resizer.html      # Dedicated signature resizer tool
├── compress-image-to-kb.html   # Quick target KB compressor (10KB, 20KB, 50KB, 100KB, 200KB)
├── exam-presets.html           # Comprehensive 25+ exam specification directory
├── blog.html                   # 4 In-depth technical guides & exam application tutorials
├── about.html                  # About FormReady & privacy philosophy (800+ words)
├── contact.html                # Contact form with real-time validation & mailto fallback
├── privacy-policy.html         # AdSense & DoubleClick DART cookie disclosures (1,100+ words)
├── disclaimer.html             # Government non-affiliation disclaimer & verification notes
├── terms.html                  # Terms of service & acceptable use policy
├── 404.html                    # Helpful error page with deep-links back to tools
├── robots.txt                  # Search engine crawl directives
├── sitemap.xml                 # XML sitemap indexing all canonical URLs
├── server.js                   # Lightweight zero-dependency local static server
├── test-suite.js               # 178-point automated QA test suite
├── dom-interactive-test.js     # DOM & functional simulation test suite
├── browser-verify.js           # Headless Google Chrome browser validation script
├── .gitignore                  # Git ignore rules for node_modules, temp files, and OS artifacts
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── package.json                # Project manifest & test runners
└── LICENSE                     # MIT Open Source License
```

---

## 💻 Local Development Setup

Because FormReady is built with standard vanilla web standards, it has **zero build steps** and **zero compilation requirements**.

### Option A: Using Built-in Node.js Server (Recommended)

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/FormReady.git
   cd FormReady
   ```

2. Start the local server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```text
   http://127.0.0.1:8080/
   ```

### Option B: Open Directly in Any Browser

You can simply double-click [`index.html`](index.html) or open it via any browser. (Note: Running via an HTTP server is recommended for testing service workers and canvas export features).

---

## 🧪 Testing & Quality Assurance

FormReady comes with an automated testing pipeline:

```bash
# Run unit, content, schema, and DOM interaction tests (178/178 tests)
npm test

# Run Google Chrome headless browser rendering & screenshot verification
npm run test:browser
```

### Test Coverage Highlights:
- **Word Count & AdSense Audit:** Verified that all content pages exceed Google AdSense requirements (Index > 2,000 words, legal > 700 words, tool pages > 800 words).
- **Binary Search Convergence:** Validated JPEG quantization output against strict exam ceilings:
  - SSC Photo (200×230 px @ max 50 KB) → converges to ~22 KB at Q=0.95 (under budget).
  - SSC Signature (140×60 px @ max 20 KB) → converges to ~4 KB at Q=0.95 (under budget).
  - UPSC Photo (350×350 px @ max 100 KB) → converges to ~69 KB at Q=0.95 (under budget).
- **Link & Anchor Integrity:** 100% valid internal links and hash navigation.
- **Zero Console Errors:** Verified in real Google Chrome browser runtime.

---

## 🌐 Deploying to GitHub Pages

FormReady is pre-configured for instant deployment on **GitHub Pages**.

### Method 1: Automated Deployment via GitHub Actions (Recommended)

This repository already includes `.github/workflows/deploy.yml`.

1. Create a new repository on [GitHub](https://github.com/new) named `FormReady` (or any name you prefer).
2. Push your code:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: FormReady v1.0.0"
   git remote add origin https://github.com/<your-username>/FormReady.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build, and publish your site at:
   ```text
   https://<your-username>.github.io/FormReady/
   ```

### Method 2: Standard Branch Deployment

1. Push your code to the `main` branch.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select branch: `main` and folder: `/ (root)`.
5. Click **Save**. Your site will be live within 1–2 minutes!

---

## ☁️ Alternative Free Deployment Options

- **Netlify:** Drag and drop the project folder into [Netlify Drop](https://app.netlify.com/drop).
- **Cloudflare Pages:** Connect your GitHub repository to Cloudflare Pages; set build command to empty and output directory to `/`.
- **Vercel:** Run `npx vercel` in the project root.

---

## 🛡️ Privacy & Security Guarantee

FormReady is architected around absolute client-side isolation:
1. **No External Network Calls:** No images or personal files are transmitted over the internet.
2. **In-Memory Operations:** Images are decoded directly into an HTML5 `<canvas>` element and garbage-collected once processed.
3. **GDPR, CCPA & Indian DPDP Act Compliant:** Because no user data is collected or stored, privacy compliance is built-in by design.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Free for personal, commercial, and educational use.
