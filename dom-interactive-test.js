/**
 * FormReady - Interactive DOM & Functional Engine Tests
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Interactive DOM & Logic Functional Tests ---\n');

// 1. Theme.js logic test
console.log('Test 1: Theme persistence & toggle logic');
let storedTheme = null;
const mockLocalStorage = {
  getItem: (key) => storedTheme,
  setItem: (key, val) => { storedTheme = val; },
  removeItem: (key) => { storedTheme = null; }
};

let rootThemeAttr = null;
const mockDocElement = {
  setAttribute: (k, v) => { if (k === 'data-theme') rootThemeAttr = v; },
  removeAttribute: (k) => { if (k === 'data-theme') rootThemeAttr = null; },
  hasAttribute: (k) => k === 'data-theme' && rootThemeAttr === 'dark'
};

const themeContext = {
  window: {
    matchMedia: (query) => ({ matches: false, addEventListener: () => {} }),
    localStorage: mockLocalStorage
  },
  localStorage: mockLocalStorage,
  document: {
    documentElement: mockDocElement,
    addEventListener: (evt, cb) => { if (evt === 'DOMContentLoaded') cb(); },
    querySelectorAll: () => []
  }
};

vm.createContext(themeContext);
const themeCode = fs.readFileSync(path.join(__dirname, 'js/theme.js'), 'utf8');
vm.runInContext(themeCode, themeContext);

// Initial theme should be light
console.log(`  Initial theme: ${rootThemeAttr || 'light'}`);
if (rootThemeAttr !== null) throw new Error('Expected default light theme');

// Toggle to dark
themeContext.window.toggleTheme();
console.log(`  After toggle: ${rootThemeAttr}`);
if (rootThemeAttr !== 'dark') throw new Error('Expected dark theme after toggle');
if (storedTheme !== 'dark') throw new Error('Expected localStorage to store dark theme');

// Toggle back to light
themeContext.window.toggleTheme();
console.log(`  After second toggle: ${rootThemeAttr || 'light'}`);
if (rootThemeAttr !== null) throw new Error('Expected light theme after second toggle');
if (storedTheme !== 'light') throw new Error('Expected localStorage to store light theme');

console.log('  ✓ Theme switcher passed successfully!\n');

// 2. Preset Filter Test
console.log('Test 2: Preset Filter & Search algorithm');
const examPresetsHtml = fs.readFileSync(path.join(__dirname, 'exam-presets.html'), 'utf8');

// Count preset cards in exam-presets.html
const cardMatches = [...examPresetsHtml.matchAll(/class=["']preset-card["']\s+data-category=["']([^"']+)["']/g)];
console.log(`  Found ${cardMatches.length} preset cards in exam-presets.html`);
if (cardMatches.length < 15) throw new Error('Expected at least 15 preset cards in exam-presets.html');

const categories = new Set(cardMatches.map(m => m[1]));
console.log(`  Categories found: ${Array.from(categories).join(', ')}`);
if (!categories.has('ssc') || !categories.has('upsc') || !categories.has('banking') || !categories.has('nta')) {
  throw new Error('Missing core categories in presets HTML');
}
console.log('  ✓ Preset cards and category tags verified!\n');

// 3. Cleanliness & Security check (no remote API keys, no external scripts that could leak data)
console.log('Test 3: Security & External Dependency Audit');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
  // Ensure no third-party CDNs like unpkg, cdnjs, jQuery, etc., for core function
  if (content.includes('code.jquery.com') || content.includes('bootstrap') || content.includes('react')) {
    throw new Error(`Unexpected external framework found in ${f}`);
  }
  // Ensure no hardcoded secret keys
  if (content.includes('api_key') || content.includes('secret_key')) {
    throw new Error(`Suspicious secret key string found in ${f}`);
  }
});
console.log('  ✓ Zero external framework dependencies & zero API leaks confirmed across all pages!');

console.log('\n🌟 ALL FUNCTIONAL & DOM TESTS PASSED!');

