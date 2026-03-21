/**
 * theme.js
 * Handles dark / light mode toggle with localStorage persistence.
 * Also swaps logo images between logo-light.png and logo-dark.png.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const ATTR = 'data-theme';
  const root = document.documentElement;

  /**
   * Swap all .logo-img src attributes based on current theme.
   */
  function updateLogos(theme) {
    document.querySelectorAll('.logo-img').forEach(function (img) {
      if (theme === 'dark') {
        img.src = img.src.replace('logo-light.png', 'logo-dark.png');
      } else {
        img.src = img.src.replace('logo-dark.png', 'logo-light.png');
      }
    });
  }

  /**
   * Apply a theme ('dark' | 'light') to <html> and persist it.
   */
  function applyTheme(theme) {
    root.setAttribute(ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateLogos(theme);
  }

  /**
   * Toggle between 'dark' and 'light'.
   */
  function toggleTheme() {
    const current = root.getAttribute(ATTR) || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /**
   * Initialise: read saved preference or system preference.
   */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Bind toggle button(s)
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
