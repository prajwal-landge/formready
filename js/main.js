/**
 * FormReady - Main Site Interactions & UI Helpers
 * Navigation, FAQ Accordions, Preset Search/Filter, Contact Handler, SEO Helpers
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initDynamicYear();
    initMobileNavigation();
    initFaqAccordion();
    initPresetSearchAndFilter();
    initContactForm();
    initSmoothScrolling();
  });

  // -------------------------------------------------------------------------
  // 1. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  function initDynamicYear() {
    var yearElements = document.querySelectorAll('.current-year');
    var currentYear = new Date().getFullYear();
    yearElements.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  // -------------------------------------------------------------------------
  // 2. Mobile Hamburger Navigation
  // -------------------------------------------------------------------------
  function initMobileNavigation() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = hamburger.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close when clicking any nav link
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-active');
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('is-active');
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Accessible FAQ Accordion
  // -------------------------------------------------------------------------
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      var questionBtn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');

      if (!questionBtn || !answer) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-active');

        // Optional: close other items for clean accordion UX
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('is-active');
            var otherBtn = otherItem.querySelector('.faq-question');
            var otherAns = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('is-active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('is-active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Preset Cards Search & Category Filter (for exam-presets.html & index.html)
  // -------------------------------------------------------------------------
  function initPresetSearchAndFilter() {
    var searchInput = document.getElementById('preset-search-input');
    var categoryPills = document.querySelectorAll('.filter-pill');
    var presetCards = document.querySelectorAll('.preset-card');
    var counterEl = document.getElementById('preset-count-display');

    if (!presetCards.length) return;

    var activeCategory = 'all';
    var activeSearchQuery = '';

    function filterPresets() {
      var visibleCount = 0;

      presetCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category') || '';
        var cardTitle = (card.querySelector('.preset-exam-name') ? card.querySelector('.preset-exam-name').textContent : '').toLowerCase();
        var cardDesc = (card.querySelector('.preset-specs-list') ? card.querySelector('.preset-specs-list').textContent : '').toLowerCase();

        var matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        var matchesSearch = !activeSearchQuery || cardTitle.indexOf(activeSearchQuery) !== -1 || cardDesc.indexOf(activeSearchQuery) !== -1;

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counterEl) {
        counterEl.textContent = 'Showing ' + visibleCount + ' of ' + presetCards.length + ' exam presets';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        activeSearchQuery = this.value.trim().toLowerCase();
        filterPresets();
      });
    }

    categoryPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        categoryPills.forEach(function (p) { p.classList.remove('is-active'); });
        this.classList.add('is-active');
        activeCategory = this.getAttribute('data-filter') || 'all';
        filterPresets();
      });
    });

    // Preset "Copy Specs" buttons
    var copyButtons = document.querySelectorAll('.btn-copy-preset-specs');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var specs = this.getAttribute('data-specs');
        if (specs && navigator.clipboard) {
          navigator.clipboard.writeText(specs).then(function () {
            if (window.FormReadyToast) {
              window.FormReadyToast('Specifications copied to clipboard!', 'success');
            }
          });
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Contact Form Handling (Client-side validation with mailto fallback)
  // -------------------------------------------------------------------------
  function initContactForm() {
    var contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('contact-name');
      var emailInput = document.getElementById('contact-email');
      var subjectInput = document.getElementById('contact-subject');
      var messageInput = document.getElementById('contact-message');

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var subject = subjectInput ? subjectInput.value.trim() : '';
      var message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (window.FormReadyToast) {
          window.FormReadyToast('Please complete all required fields.', 'error');
        } else {
          alert('Please complete all required fields.');
        }
        return;
      }

      // Email format regex check
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (window.FormReadyToast) {
          window.FormReadyToast('Please enter a valid email address.', 'error');
        } else {
          alert('Please enter a valid email address.');
        }
        return;
      }

      // Display success message and provide mailto link fallback
      var statusBox = document.getElementById('contact-status-box');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = '<div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">' +
          '<strong>Thank you, ' + escapeHtml(name) + '!</strong> Your message has been prepared. If your email client does not open automatically, you can write directly to <code>support@formready.io</code>.' +
          '</div>';
      }

      // Trigger mailto client
      var mailtoUrl = 'mailto:support@formready.io?subject=' + encodeURIComponent('[FormReady Inquiry] ' + (subject || 'General Inquiry')) +
        '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);

      window.location.href = mailtoUrl;

      contactForm.reset();
    });
  }

  function escapeHtml(string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, function (s) {
      return entityMap[s];
    });
  }

  // -------------------------------------------------------------------------
  // 6. Smooth Scrolling for Internal Hash Anchors
  // -------------------------------------------------------------------------
  function initSmoothScrolling() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
})();

