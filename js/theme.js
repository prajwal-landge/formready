/**
 * FormReady - Theme Switcher (Dark/Light Mode)
 * Ensures zero-flash on page load, respects system preferences,
 * and persists user theme choice in localStorage.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'formready_theme_preference';

  /**
   * Determine preferred theme:
   * 1. Check localStorage override.
   * 2. Fallback to OS prefers-color-scheme.
   * 3. Fallback to 'light'.
   */
  function getPreferredTheme() {
    var storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Apply theme immediately to document element to prevent FOUC / flash
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeToggleUI(theme);
  }

  /**
   * Update theme toggle button aria-label & title
   */
  function updateThemeToggleUI(theme) {
    var toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      btn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }

  // Apply immediately upon execution in <head>
  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Expose toggle API
  window.toggleTheme = function () {
    var activeTheme = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
    var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  // Wire up event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    updateThemeToggleUI(document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light');

    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.toggleTheme();
      });
    });

    // Listen to OS system theme changes if user has not explicitly set a manual preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });
})();

