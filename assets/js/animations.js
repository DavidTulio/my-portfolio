/**
 * animations.js
 * Handles: scroll reveal, skill bar animation, stat counters, contact form.
 */

(function () {
  'use strict';

  // ── Scroll Reveal ──
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ── Skill Bar Animation ──
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-item__fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const target = bar.dataset.width || '80%';
            // Small delay so CSS transition plays visibly
            setTimeout(() => {
              bar.style.width = target;
            }, 150);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  // ── Stat Counter Animation ──
  function animateCounter(el, target, duration) {
    const start     = performance.now();
    const startVal  = 0;

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            animateCounter(el, target, 1400);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.7 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  // ── Contact Form ──
  function initContactForm() {
    const form    = document.querySelector('.contact-form');
    const success = document.querySelector('.form-success');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Send form data to Formspree — messages arrive in davidjohne.tulio@gmail.com
      fetch('https://formspree.io/f/xdawwkyr', {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          // Success — hide form, show thank you message
          form.style.display = 'none';
          if (success) success.classList.add('is-visible');
        } else {
          // Server error
          btn.disabled = false;
          btn.textContent = 'Send Message →';
          alert('Something went wrong. Please try again or email me directly at davidjohne.tulio@gmail.com');
        }
      })
      .catch(() => {
        // Network error
        btn.disabled = false;
        btn.textContent = 'Send Message →';
        alert('Could not send message. Please check your connection or email me at davidjohne.tulio@gmail.com');
      });
    });
  }

  // ── Project Filter ──
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards  = document.querySelectorAll('[data-category]');

        cards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Blog Read More Toggle ──
  function initBlogToggle() {
    const readMoreBtns = document.querySelectorAll('[data-read-more]');

    readMoreBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.readMore;
        const article  = document.getElementById(targetId);

        if (!article) return;

        const isVisible = article.style.display === 'block';
        article.style.display = isVisible ? 'none' : 'block';
        btn.textContent = isVisible ? 'Read Article →' : 'Collapse ↑';

        if (!isVisible) {
          article.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── Init ──
  function init() {
    initReveal();
    initSkillBars();
    initCounters();
    initContactForm();
    initProjectFilter();
    initBlogToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
