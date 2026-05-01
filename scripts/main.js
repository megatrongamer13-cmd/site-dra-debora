/* ============================================================
   STICKY HEADER
   ============================================================ */
const header = document.getElementById('header');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// close on link click
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// close on outside click
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================================
   SCROLL ANIMATIONS (IntersectionObserver)
   ============================================================ */
const animTargets = document.querySelectorAll('.fade-in, .fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animTargets.forEach(el => observer.observe(el));

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__answer');
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq__item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      openItem.querySelector('.faq__answer').hidden = true;
    });

    // open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

/* ============================================================
   WHATSAPP FLOAT — appear after 2s
   ============================================================ */
setTimeout(() => {
  document.getElementById('whatsappFloat').classList.add('visible');
}, 2000);
