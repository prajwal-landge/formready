const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_PROFILE = path.join(process.env.TEMP, 'chrome_verify_profile_' + Date.now());
const BASE_URL = 'http://127.0.0.1:8080';

const PAGES = [
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
  '404.html'
];

async function runChrome(args) {
  return new Promise((resolve) => {
    execFile(CHROME_PATH, args, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      resolve({ err, stdout, stderr });
    });
  });
}

async function verifyPages() {
  console.log('=== FORMREADY BROWSER VERIFICATION SUITE ===');
  console.log('Testing with real Google Chrome browser at:', CHROME_PATH);
  console.log('Base server URL:', BASE_URL);
  console.log('Temp profile directory:', TEMP_PROFILE);
  console.log('--------------------------------------------------\n');

  let passed = 0;
  let failed = 0;

  for (const page of PAGES) {
    const url = `${BASE_URL}/${page}`;
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--disable-fre',
      '--disable-sync',
      `--user-data-dir=${TEMP_PROFILE}`,
      '--dump-dom',
      url
    ];

    const res = await runChrome(args);
    const dom = res.stdout || '';

    // Checks
    const hasTheme = dom.includes('data-theme=');
    const hasNav = dom.includes('class="nav-links"') || dom.includes('id="navLinks"');
    const hasFooter = dom.includes('formready-footer') || dom.includes('class="site-footer"');
    const hasTitle = /<title>(.*?)<\/title>/i.test(dom);
    const titleMatch = dom.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'NONE';

    const ok = hasTheme && hasTitle && dom.length > 1000;

    if (ok) {
      console.log(`[PASS] ${page.padEnd(26)} | DOM Size: ${dom.length} bytes | Theme Injected: ${hasTheme} | Title: "${title.slice(0, 45)}..."`);
      passed++;
    } else {
      console.log(`[FAIL] ${page.padEnd(26)} | Output length: ${dom.length} | Err: ${res.err ? res.err.message : 'Invalid DOM'}`);
      failed++;
    }
  }

  // Also take a screenshot of index.html and exam-presets.html
  console.log('\n--- Capturing Browser Screenshots ---');
  const screenshotIndex = path.join(__dirname, 'screenshot-home.png');
  const ssArgs = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-fre',
    '--disable-sync',
    `--user-data-dir=${TEMP_PROFILE}`,
    '--window-size=1280,900',
    `--screenshot=${screenshotIndex}`,
    `${BASE_URL}/index.html`
  ];

  await runChrome(ssArgs);
  if (fs.existsSync(screenshotIndex)) {
    const stats = fs.statSync(screenshotIndex);
    console.log(`[PASS] Screenshot captured: screenshot-home.png (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.log('[WARN] Screenshot not captured directly via flag');
  }

  const screenshotPresets = path.join(__dirname, 'screenshot-presets.png');
  const ssPresetsArgs = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-fre',
    '--disable-sync',
    `--user-data-dir=${TEMP_PROFILE}`,
    '--window-size=1280,900',
    `--screenshot=${screenshotPresets}`,
    `${BASE_URL}/exam-presets.html`
  ];
  await runChrome(ssPresetsArgs);
  if (fs.existsSync(screenshotPresets)) {
    const stats = fs.statSync(screenshotPresets);
    console.log(`[PASS] Screenshot captured: screenshot-presets.png (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\n==================================================');
  console.log(`Summary: ${passed}/${PAGES.length} pages passed Chrome browser rendering verification.`);
  console.log('==================================================');

  // Clean up temp profile
  try {
    fs.rmSync(TEMP_PROFILE, { recursive: true, force: true });
  } catch (e) {}

  process.exit(failed > 0 ? 1 : 0);
}

verifyPages();

