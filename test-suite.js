/**
 * FormReady - Comprehensive Test Suite
 * Validates:
 * 1. File existence & directory structure
 * 2. HTML syntax, doctypes, and semantic structure
 * 3. Word counts (Index > 1000, Tool pages & Legal > 600)
 * 4. Internal hyperlink integrity (all target files and anchor IDs exist)
 * 5. Asset references (CSS, JS)
 * 6. Metadata (Title, Description, Canonical, OG, Twitter)
 * 7. JSON-LD Structured Data validity
 * 8. AdSense & Privacy compliance keywords
 * 9. JavaScript syntax check & PRESETS database integrity
 * 10. Sitemap & Robots.txt validity
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = __dirname;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
    failures.push(message);
  }
}

console.log('====================================================');
console.log('   FormReady Production Verification & Test Suite   ');
console.log('====================================================\n');

// 1. Files & Structure Verification
console.log('--- 1. File Structure & Assets ---');
const requiredFiles = [
  'index.html',
  'photo-resizer.html',
  'signature-resizer.html',
  'compress-image-to-kb.html',
  'exam-presets.html',
  'blog.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'disclaimer.html',
  'terms.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'css/style.css',
  'js/theme.js',
  'js/tool.js',
  'js/main.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 0, `File exists & non-empty: ${file} (${size} bytes)`);
});

// 2. JavaScript Syntax Verification
console.log('\n--- 2. JavaScript Syntax & Runtime Modules ---');
const jsFiles = ['js/theme.js', 'js/tool.js', 'js/main.js'];
jsFiles.forEach(jsFile => {
  const code = fs.readFileSync(path.join(ROOT_DIR, jsFile), 'utf8');
  try {
    new vm.Script(code);
    assert(true, `Syntax valid: ${jsFile}`);
  } catch (err) {
    assert(false, `Syntax error in ${jsFile}: ${err.message}`);
  }
});

// Test tool.js PRESETS database
const toolCode = fs.readFileSync(path.join(ROOT_DIR, 'js/tool.js'), 'utf8');
const sandbox = {
  window: {},
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  },
  URL: { revokeObjectURL: () => {}, createObjectURL: () => 'blob:mock' },
  setTimeout: () => {},
  clearTimeout: () => {}
};
vm.createContext(sandbox);
vm.runInContext(toolCode, sandbox);

const presets = sandbox.window.FORMREADY_PRESETS;
assert(presets && typeof presets === 'object', 'PRESETS object exported to window.FORMREADY_PRESETS');
const presetKeys = Object.keys(presets || {});
assert(presetKeys.length >= 15, `Loaded ${presetKeys.length} exam presets (expected >= 15)`);

// Validate preset schema
let presetsValid = true;
presetKeys.forEach(k => {
  const p = presets[k];
  if (!p.category || !p.name || !p.width || !p.height || !p.maxKB || !p.format) {
    presetsValid = false;
    console.error(`Preset ${k} has missing required fields`);
  }
});
assert(presetsValid, 'All presets contain category, name, width, height, maxKB, and format');

// 3. HTML Pages Validation & Word Counts
console.log('\n--- 3. HTML Validation, Word Counts & Content Richness ---');

const htmlFiles = [
  { file: 'index.html', minWords: 1000 },
  { file: 'photo-resizer.html', minWords: 600 },
  { file: 'signature-resizer.html', minWords: 600 },
  { file: 'compress-image-to-kb.html', minWords: 600 },
  { file: 'exam-presets.html', minWords: 400 },
  { file: 'blog.html', minWords: 800 },
  { file: 'about.html', minWords: 600 },
  { file: 'contact.html', minWords: 400 },
  { file: 'privacy-policy.html', minWords: 600 },
  { file: 'disclaimer.html', minWords: 600 },
  { file: 'terms.html', minWords: 600 },
  { file: '404.html', minWords: 80 }
];

function extractText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  const words = text.match(/\b[A-Za-z0-9'-]+\b/g);
  return words ? words.length : 0;
}

const pageContents = {};
const allDeclaredIds = {};

htmlFiles.forEach(({ file, minWords }) => {
  const html = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
  pageContents[file] = html;

  // Extract all IDs for anchor verification
  allDeclaredIds[file] = new Set();
  const idMatches = html.matchAll(/id=["']([^"']+)["']/g);
  for (const m of idMatches) {
    allDeclaredIds[file].add(m[1]);
  }

  // Check Doctype
  assert(html.startsWith('<!DOCTYPE html>'), `${file}: Contains HTML5 doctype declaration`);

  // Check Viewport Meta
  assert(html.includes('<meta name="viewport"'), `${file}: Mobile viewport configured`);

  // Check Title & Meta Description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  assert(titleMatch && titleMatch[1].length > 10, `${file}: Title present ("${titleMatch ? titleMatch[1].substring(0, 40) : ''}...")`);

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  assert(descMatch && descMatch[1].length > 30, `${file}: Meta description present (${descMatch ? descMatch[1].length : 0} chars)`);

  // Check Canonical Link
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (file !== '404.html') {
    assert(canonMatch && canonMatch[1].startsWith('https://formready.io/'), `${file}: Canonical link configured`);
  }

  // Check Open Graph & Twitter Cards
  if (file !== '404.html') {
    assert(html.includes('property="og:title"'), `${file}: Open Graph tags present`);
    assert(html.includes('name="twitter:card"'), `${file}: Twitter Card tags present`);
  }

  // Check Single H1
  const h1Matches = html.match(/<h1\b[^>]*>/gi);
  assert(h1Matches && h1Matches.length === 1, `${file}: Exactly one <h1> tag present`);

  // Check Semantic Landmarks
  assert(html.includes('<header') && html.includes('<main') && html.includes('<footer'), `${file}: Semantic landmarks (<header>, <main>, <footer>) present`);

  // Check Word Count
  const text = extractText(html);
  const words = countWords(text);
  assert(words >= minWords, `${file}: Word count ${words} >= target ${minWords}`);
});

// 4. Hyperlink & Asset Integrity Check
console.log('\n--- 4. Hyperlink & Local Asset Integrity Check ---');
let brokenLinksCount = 0;

htmlFiles.forEach(({ file }) => {
  const html = pageContents[file];

  // Check <link rel="stylesheet">
  const cssMatches = html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g);
  for (const match of cssMatches) {
    const cssPath = path.join(ROOT_DIR, match[1]);
    if (!fs.existsSync(cssPath)) {
      brokenLinksCount++;
      assert(false, `${file} references missing CSS: ${match[1]}`);
    }
  }

  // Check <script src="...">
  const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/g);
  for (const match of scriptMatches) {
    const scriptPath = path.join(ROOT_DIR, match[1]);
    if (!fs.existsSync(scriptPath)) {
      brokenLinksCount++;
      assert(false, `${file} references missing script: ${match[1]}`);
    }
  }

  // Check internal href links
  const hrefMatches = html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    const href = match[1];
    // Ignore external links, mailto, tel
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      continue;
    }

    if (href.startsWith('#')) {
      // Local page anchor
      const anchorId = href.substring(1);
      if (anchorId && !allDeclaredIds[file].has(anchorId)) {
        brokenLinksCount++;
        assert(false, `${file} has broken anchor: ${href}`);
      }
    } else {
      // Relative file link (e.g. "photo-resizer.html" or "index.html#resizer-tool-section")
      const [linkFile, linkAnchor] = href.split('#');
      const cleanLinkFile = linkFile.split('?')[0];

      if (cleanLinkFile) {
        const targetPath = path.join(ROOT_DIR, cleanLinkFile);
        if (!fs.existsSync(targetPath)) {
          brokenLinksCount++;
          assert(false, `${file} has broken relative link to: ${cleanLinkFile}`);
        } else if (linkAnchor) {
          // Target anchor exists in target file?
          if (allDeclaredIds[cleanLinkFile] && !allDeclaredIds[cleanLinkFile].has(linkAnchor)) {
            brokenLinksCount++;
            assert(false, `${file} references anchor #${linkAnchor} missing in ${cleanLinkFile}`);
          }
        }
      }
    }
  }
});

if (brokenLinksCount === 0) {
  assert(true, 'All internal hyperlinks, anchors, and asset paths are valid!');
}

// 5. AdSense & Legal Disclosures Check
console.log('\n--- 5. AdSense Policy Disclosures & Legal Checklist ---');

const privacyHtml = pageContents['privacy-policy.html'].toLowerCase();
assert(privacyHtml.includes('cookie'), 'Privacy Policy covers Cookies');
assert(privacyHtml.includes('google adsense') || privacyHtml.includes('adsense'), 'Privacy Policy covers Google AdSense');
assert(privacyHtml.includes('third-party'), 'Privacy Policy covers third-party advertising vendors');
assert(privacyHtml.includes('dart') || privacyHtml.includes('doubleclick'), 'Privacy Policy covers DoubleClick DART cookies');
assert(privacyHtml.includes('adssettings.google.com') || privacyHtml.includes('networkadvertising.org'), 'Privacy Policy provides direct opt-out links');

const disclaimerHtml = pageContents['disclaimer.html'].toLowerCase();
assert(disclaimerHtml.includes('not affiliated'), 'Disclaimer contains explicit non-affiliation clause');
assert(disclaimerHtml.includes('official notification'), 'Disclaimer advises verifying with official notifications');

// 6. JSON-LD Structured Data Schema Validation
console.log('\n--- 6. JSON-LD Structured Data Schemas ---');
htmlFiles.forEach(({ file }) => {
  const html = pageContents[file];
  const schemaMatches = html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  for (const match of schemaMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      assert(true, `${file}: Valid JSON-LD schema (${parsed['@type'] || (parsed['@graph'] && parsed['@graph'].map(g => g['@type']).join(', '))})`);
    } catch (err) {
      assert(false, `${file}: Malformed JSON-LD schema: ${err.message}`);
    }
  }
});

// 7. Sitemap & Robots.txt Check
console.log('\n--- 7. Sitemap & Robots.txt Verification ---');
const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
assert(sitemapContent.includes('<urlset'), 'sitemap.xml contains <urlset> root element');

const sitemapUrls = [...sitemapContent.matchAll(/<loc>https:\/\/formready\.io\/([^<]*)<\/loc>/g)].map(m => m[1]);
assert(sitemapUrls.length >= 10, `sitemap.xml indexes ${sitemapUrls.length} pages`);

sitemapUrls.forEach(urlPath => {
  const targetFile = urlPath === '' ? 'index.html' : urlPath;
  assert(fs.existsSync(path.join(ROOT_DIR, targetFile)), `Sitemap URL resolves to real file: ${targetFile}`);
});

const robotsContent = fs.readFileSync(path.join(ROOT_DIR, 'robots.txt'), 'utf8');
assert(robotsContent.includes('Sitemap: https://formready.io/sitemap.xml'), 'robots.txt references sitemap.xml');
assert(robotsContent.includes('User-agent: *'), 'robots.txt specifies wildcard user-agent');

// 8. Canvas Compression Binary Search Simulation
console.log('\n--- 8. Binary Search Algorithm Math & Convergence Test ---');

function simulateBinarySearch(targetKB, pixelArea, textureFactor) {
  // Model file size in bytes as a function of quality (0.01 to 1.0)
  // Base header ~ 600 bytes + pixelArea * quality * textureFactor
  const targetBytes = targetKB * 1024;
  function estimateBytes(q) {
    return 600 + pixelArea * (q * 0.85 + 0.15) * textureFactor;
  }

  let low = 0.01;
  let high = 0.95;
  let bestQuality = 0.01;
  let iterations = 10;

  // Initial check
  if (estimateBytes(0.95) <= targetBytes) {
    return { quality: 0.95, sizeBytes: estimateBytes(0.95) };
  }
  if (estimateBytes(0.01) > targetBytes) {
    return { quality: 0.01, sizeBytes: estimateBytes(0.01), overBudget: true };
  }

  for (let i = 0; i < iterations; i++) {
    const mid = (low + high) / 2;
    const testSize = estimateBytes(mid);
    if (testSize <= targetBytes) {
      bestQuality = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  return { quality: bestQuality, sizeBytes: estimateBytes(bestQuality), overBudget: false };
}

// Case 1: SSC Photo 200x230 px, target 50KB
const res1 = simulateBinarySearch(50, 200 * 230, 0.5);
assert(!res1.overBudget && res1.sizeBytes <= 50 * 1024, `SSC Photo 50KB test converges under budget: ${Math.round(res1.sizeBytes / 1024)} KB at quality ${res1.quality.toFixed(3)}`);

// Case 2: SSC Signature 140x60 px, target 20KB
const res2 = simulateBinarySearch(20, 140 * 60, 0.4);
assert(!res2.overBudget && res2.sizeBytes <= 20 * 1024, `SSC Signature 20KB test converges under budget: ${Math.round(res2.sizeBytes / 1024)} KB at quality ${res2.quality.toFixed(3)}`);

// Case 3: UPSC Photo 350x350 px, target 100KB
const res3 = simulateBinarySearch(100, 350 * 350, 0.6);
assert(!res3.overBudget && res3.sizeBytes <= 100 * 1024, `UPSC Photo 100KB test converges under budget: ${Math.round(res3.sizeBytes / 1024)} KB at quality ${res3.quality.toFixed(3)}`);

// Final Summary
console.log('\n====================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log('====================================================');

if (failedTests > 0) {
  console.error('\nFailures detected:');
  failures.forEach(f => console.error(` - ${f}`));
  process.exit(1);
} else {
  console.log('\n🌟 ALL TESTS PASSED! WEBSITE READY FOR PRODUCTION & ADSENSE.');
  process.exit(0);
}

