(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeButton = document.querySelector('.theme-toggle');
  let savedTheme;
  try { savedTheme = localStorage.getItem('biju-portfolio-theme'); } catch { /* Storage can be unavailable in private browsing. */ }

  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#17211d' : '#f6f6f0';
  }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeButton.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(savedTheme);
    try { localStorage.setItem('biju-portfolio-theme', savedTheme); } catch { /* The theme still works for this visit. */ }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  function closeMenu(returnFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    mobileNav.hidden = isOpen;
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projects = [...document.querySelectorAll('.project-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach(project => {
      const visible = category === 'all' || project.dataset.categories.split(' ').includes(category);
      project.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector('#filter-status').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
  }));

  const toast = document.querySelector('.toast');
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }
  const copyButton = document.querySelector('.copy-email');
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('bijuborah2017@gmail.com');
      showToast('Email copied. Say hello!');
      copyButton.querySelector('use').setAttribute('href', '#i-check');
      copyButton.setAttribute('aria-label', 'Email address copied');
      setTimeout(() => {
        copyButton.querySelector('use').setAttribute('href', '#i-copy');
        copyButton.setAttribute('aria-label', 'Copy email address');
      }, 3000);
    } catch {
      showToast('Select the email address to copy it, or click it to say hello.');
    }
  });

  document.querySelector('#year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.desktop-nav a')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('is-current', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

    if (!reducedMotion.matches) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.section-heading, .experience-layout, .about-layout, .skills-heading, .skills-grid, .awards').forEach(element => {
        element.classList.add('reveal-ready', 'reveal-pending');
        revealObserver.observe(element);
      });
      const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          const target = Number(element.dataset.count);
          const start = performance.now();
          function tick(now) {
            const progress = Math.min((now - start) / 950, 1);
            element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          countObserver.unobserve(element);
        });
      }, { threshold: 0.9 });
      document.querySelectorAll('[data-count]').forEach(element => countObserver.observe(element));
    }
  }
})();
