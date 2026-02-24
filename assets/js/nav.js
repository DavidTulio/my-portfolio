/**
 * nav.js
 * Handles: scrolled class, mobile menu toggle, active nav link.
 */

(function () {
  'use strict';

  function init() {
    const navbar    = document.querySelector('.navbar');
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
    const navLinks  = document.querySelectorAll('.navbar__link');

    if (!navbar) return;

    // ── Scrolled state ──
    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // ── Mobile menu toggle ──
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('is-open');
          mobileMenu.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
          hamburger.classList.remove('is-open');
          mobileMenu.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    // ── Active nav link ──
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
