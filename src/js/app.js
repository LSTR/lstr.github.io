document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────
   * 1. NAV — scroll shrink + active section highlight
   * ───────────────────────────────────────────────── */
  const nav = document.querySelector('.glass-nav');
  const navLinks = document.querySelectorAll('#desktop-nav a, .mobile-nav a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink nav on scroll
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Active link highlight
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }, { passive: true });

  /* ─────────────────────────────────────────────────
   * 2. MOBILE NAV — hamburger toggle
   * ───────────────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  /* ─────────────────────────────────────────────────
   * 3. SMOOTH SCROLL
   * ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = window.scrollY + target.getBoundingClientRect().top - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ─────────────────────────────────────────────────
   * 4. SCROLL REVEAL (Intersection Observer)
   * ───────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = el.dataset.delay || '0s';
        el.style.transitionDelay = delay;
        el.classList.add('visible');
        obs.unobserve(el);
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─────────────────────────────────────────────────
   * 5. PROJECTS CAROUSEL
   * ───────────────────────────────────────────────── */
  const track   = document.querySelector('.carousel-track');
  const slides  = document.querySelectorAll('.project-slide');
  const dots    = document.querySelectorAll('.dot');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  btnPrev?.addEventListener('click', () => goTo(current - 1));
  btnNext?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch/drag support
  let startX = 0;
  track?.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track?.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Mouse drag
  let isDragging = false;
  track?.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; });
  track?.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
  track?.addEventListener('mouseleave', () => { isDragging = false; });

  // Auto-advance
  let autoplay = setInterval(() => goTo(current + 1), 5500);
  track?.addEventListener('mouseenter', () => clearInterval(autoplay));
  track?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 5500);
  });

  // Init
  goTo(0);

  /* ─────────────────────────────────────────────────
   * 6. HERO TYPING EFFECT
   * ───────────────────────────────────────────────── */
  const dynamicText = document.getElementById('dynamic-text');
  if (dynamicText) {
    const phrases = [
      'Mobile Experiences.',
      'Android Applications.',
      'iOS Solutions.',
      'Kotlin Ecosystems.',
      'SwiftUI Interfaces.',
    ];
    let pIdx = 0, cIdx = phrases[0].length, isDeleting = false, speed = 100;

    function type() {
      const phrase = phrases[pIdx];
      dynamicText.textContent = isDeleting
        ? phrase.substring(0, cIdx - 1)
        : phrase.substring(0, cIdx + 1);

      isDeleting ? cIdx-- : cIdx++;
      speed = isDeleting ? 50 : 100;

      if (!isDeleting && cIdx === phrase.length) {
        isDeleting = true; speed = 2200;
      } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        speed = 500;
      }
      setTimeout(type, speed);
    }
    setTimeout(type, 1200);
  }
});
