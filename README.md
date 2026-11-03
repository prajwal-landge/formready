<div align="center">

# 📷 FormReady

**Free, Privacy-First In-Browser Photo & Signature Resizer for Indian Exam Portals**

[![Zero Backend](https://img.shields.io/badge/Backend-Zero%20(100%25%20Client--Side)-brightgreen.svg)](#-privacy--security-guarantee)
[![Canvas API](https://img.shields.io/badge/Engine-HTML5%20Canvas%20API-orange.svg)](#-key-features)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20In--Browser-blue.svg)](#-privacy--security-guarantee)
[![Exam Presets](https://img.shields.io/badge/Presets-25%2B%20Indian%20Exams-purple.svg)](#-supported-exam-specifications)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<p align="center">
  A dedicated web utility designed to help millions of Indian competitive exam candidates resize, crop, and compress their passport photos and signatures to the exact pixel dimensions and strict KB limits required by government recruitment portals.
</p>

[**Home**](index.html) • [**Photo Resizer**](photo-resizer.html) • [**Signature Resizer**](signature-resizer.html) • [**Compress to KB**](compress-image-to-kb.html) • [**Exam Presets**](exam-presets.html) • [**Guides**](blog.html)

</div>

---

## 📌 About FormReady

Every year, millions of candidates apply for competitive exams and government jobs across India (SSC, UPSC, IBPS, Railways, NEET, JEE, and State PSCs). A major reason for online application form rejection is **non-compliant photograph and signature uploads**—exceeding file size limits, incorrect aspect ratios, or wrong pixel dimensions.

**FormReady** solves this problem directly in your web browser:
- **100% Client-Side Processing:** Images are never uploaded to any server or external cloud. Everything runs locally on your device via the browser's native **HTML5 Canvas API**.
- **Exact File Size Matching:** Our smart binary search compression algorithm fine-tunes JPEG quality to hit your target file size (e.g., *strictly under 50 KB* or *under 20 KB*) without trial and error.
- **Pre-Configured Exam Standards:** Instant presets with official dimension and size requirements for over 25 major central, banking, medical, engineering, and state examinations.

---

## 🛠️ Website Tools & Pages

### 1. [Passport Photo Resizer](photo-resizer.html)
- Specially tailored for Indian passport-style photos (standard 200 × 230 px or 3.5 × 4.5 cm).
- Built-in aspect ratio lock (1:1.15 and 3.5:4.5), pan, zoom, and rotate controls.
- Interactive visual overlay to ensure 80% face coverage and eye-level alignment.
- Targets official 20 KB – 50 KB file limits with crisp clarity.

### 2. [Signature Resizer](signature-resizer.html)
- Configured for official signature formats (standard 140 × 60 px or 3:1 aspect ratio).
- Auto-crops wide running-hand signatures on white paper with black/blue ink.
- Optimizes stroke contrast and removes grey scanner tint.
- Compresses strictly under 10 KB – 20 KB ceilings required by SSC, UPSC, and IBPS portals.

### 3. [Compress Image to Exact KB](compress-image-to-kb.html)
- One-click compression chips: **10 KB**, **20 KB**, **50 KB**, **100 KB**, and **200 KB**.
- Custom file size target input for any arbitrary portal limit.
- Automatic binary search quantization that hits the target size within 1% error margin without exceeding the ceiling.

### 4. [Exam Presets Directory](exam-presets.html)
- Searchable directory of 25+ Indian competitive exam photo and signature requirements.
- Category filters: **Central Government**, **Banking & Insurance**, **Engineering & Medical**, **Defense & Police**, and **State PSCs**.
- Each card displays required dimensions (px/cm), file size range (KB), accepted format (JPG/PNG), and a one-click button to load specifications into the resizer.

### 5. [Step-by-Step Guides & Blog](blog.html)
- *How to Compress a Photo to 20KB for Exam Forms Without Losing Quality*
- *Complete Guide to SSC Photo & Signature Size Requirements (CGL, CHSL, MTS)*
- *UPSC Civil Services Photo & Signature Upload Guidelines*
- *Top 7 Reasons Why Exam Form Photos Get Rejected (and How to Avoid Them)*

---

## 📋 Supported Exam Specifications

| Exam / Portal | Document Type | Dimensions | File Size (KB) | Format |
| :--- | :--- | :--- | :--- | :--- |
| **SSC CGL / CHSL / MTS** | Passport Photo | 200 × 230 px (3.5 × 4.5 cm) | 20 KB – 50 KB | JPEG / JPG |
| **SSC CGL / CHSL / MTS** | Signature | 140 × 60 px (4.0 × 2.0 cm) | 10 KB – 20 KB | JPEG / JPG |
| **UPSC Civil Services (CSE)** | Photograph | 350 × 350 px (Min) – 1000 × 1000 px | 20 KB – 300 KB | JPEG / JPG |
| **UPSC Civil Services (CSE)** | Signature | 350 × 350 px (Min) – 1000 × 1000 px | 20 KB – 300 KB | JPEG / JPG |
| **IBPS PO / Clerk / RRB** | Passport Photo | 200 × 230 px (4.5 × 3.5 cm) | 20 KB – 50 KB | JPEG / JPG |
| **IBPS PO / Clerk / RRB** | Signature | 140 × 60 px | 10 KB – 20 KB | JPEG / JPG |
| **SBI PO / Clerk** | Passport Photo | 200 × 230 px | 20 KB – 50 KB | JPEG / JPG |
| **SBI PO / Clerk** | Signature | 140 × 60 px | 10 KB – 20 KB | JPEG / JPG |
| **NEET UG (NTA)** | Postcard Photo (4×6) | 4 × 6 inches (1200 × 1800 px) | 10 KB – 200 KB | JPEG / JPG |
| **NEET UG (NTA)** | Passport Photo | 200 × 230 px | 10 KB – 200 KB | JPEG / JPG |
| **JEE Main / Advanced** | Photograph | 200 × 230 px | 10 KB – 200 KB | JPEG / JPG |
| **JEE Main / Advanced** | Signature | 140 × 60 px | 4 KB – 30 KB | JPEG / JPG |
| **RRB Railways (NTPC/Group D)** | Photograph | 35 × 45 mm (320 × 240 px) | 20 KB – 50 KB | JPEG / JPG |
| **GATE Exam** | Photograph | 480 × 640 px (Min) | 20 KB – 200 KB | JPEG / JPG |
| **Aadhaar / PAN Card** | Photo / Signature | 200 × 200 px / 200 × 400 px | Under 50 KB | JPEG / JPG |
| **State PSCs (BPSC/UPPSC/MPSC)** | Photo & Signature | Varies by state notification | 20 KB – 50 KB | JPEG / JPG |

*> Note: Always verify specifications with the official examination notification as portal requirements may update periodically.*

---

## ✨ Key Website Features

- **⚡ 100% In-Browser Execution:** Zero server lag, zero queue, instant canvas rendering.
- **🎯 Live Interactive Canvas Preview:** View real-time before/after comparisons, exact resulting file sizes, and dimensions before downloading.
- **🔄 Complete Adjustment Controls:** Freehand or locked aspect ratios, 90° clockwise rotation, fine-tuned zoom slider, and panning.
- **⚖️ Binary Search Quality Convergence:** Computes the optimal JPEG quantization parameter (0.01 – 1.00) in under 8 logarithmic iterations, guaranteeing the file never exceeds your chosen KB limit.
- **🌗 Dark & Light Theme Modes:** Supports seamless light and dark mode toggling with automatic system preference detection and zero page flicker.
- **📱 Mobile-First Responsive Design:** Clean layout built with modern CSS custom properties (variables), accessible cards, and touch-friendly controls.
- **♿ Web Accessibility & SEO:** Fully semantic HTML5 structure, comprehensive JSON-LD schemas (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`), and WCAG compliant contrast ratios.

---

## 🌐 Full Website Pages Directory

| Page | URL | Purpose |
| :--- | :--- | :--- |
| **Homepage** | [`index.html`](index.html) | Main hero resizer, presets dropdown, feature highlights, and FAQs |
| **Photo Resizer** | [`photo-resizer.html`](photo-resizer.html) | Dedicated passport photo cropping and 20–50KB resizing |
| **Signature Resizer** | [`signature-resizer.html`](signature-resizer.html) | Dedicated 140×60px signature trimmer and 10–20KB compressor |
| **Target KB Compressor** | [`compress-image-to-kb.html`](compress-image-to-kb.html) | Fast compression to exact file sizes (10KB, 20KB, 50KB, 100KB, 200KB) |
| **Exam Presets** | [`exam-presets.html`](exam-presets.html) | Complete catalog of 25+ exams with category tabs and live search |
| **Blog & Guides** | [`blog.html`](blog.html) | Articles, portal photo rules, and rejection prevention tutorials |
| **About Us** | [`about.html`](about.html) | Mission statement, team, and client-side privacy philosophy |
| **Contact Support** | [`contact.html`](contact.html) | Feedback and candidate inquiry form with mailto fallback |
| **Privacy Policy** | [`privacy-policy.html`](privacy-policy.html) | Full privacy rights, cookie information, and AdSense disclosures |
| **Disclaimer** | [`disclaimer.html`](disclaimer.html) | Government non-affiliation notice and candidate verification advice |
| **Terms of Service** | [`terms.html`](terms.html) | Acceptable use policy, intellectual property, and disclaimers |
| **404 Not Found** | [`404.html`](404.html) | Friendly error recovery page with quick navigation back to tools |

---

## 🛡️ Privacy & Security Guarantee

Your personal photos and signatures are sensitive identity documents. FormReady is strictly engineered around **complete client-side data isolation**:

1. **Zero Uploads:** When you select an image, it is read directly into your device's memory using the browser's `FileReader` and rendered on an HTML5 `<canvas>`.
2. **Zero Storage:** Files are never transmitted over the internet or saved on any remote database or third-party server.
3. **Automatic Clearance:** Closing or refreshing the page immediately clears your images from local memory.
4. **GDPR, CCPA & DPDP Compliant:** Because no personally identifiable information (PII) is collected or processed on servers, candidate privacy is guaranteed.

---

## ⚖️ Legal Disclaimer

FormReady is an independent, free educational utility created to assist candidates with document preparation. FormReady is **not affiliated with, endorsed by, or associated with** the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), National Testing Agency (NTA), Railway Recruitment Boards (RRB), or any government authority. Candidates are strongly advised to check the official exam notification before uploading documents.

---

## 📄 License

This website project is open source and licensed under the **[MIT License](LICENSE)**. Free for personal, commercial, and educational use.
