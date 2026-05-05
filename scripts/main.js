/* ============================================================
   HEADER STICKY
   ============================================================ */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navWrapper = navMenu ? navMenu.parentElement : null;

if (navToggle && navWrapper) {
  navToggle.addEventListener('click', () => {
    const isOpen = navWrapper.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // fecha ao clicar em link
  navMenu.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      navWrapper.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // fecha ao clicar fora
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && navWrapper.classList.contains('open')) {
      navWrapper.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });

  // fecha com Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navWrapper.classList.contains('open')) {
      navWrapper.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
      navToggle.focus();
    }
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const button = item.querySelector('.faq-item__question');
  const answer = item.querySelector('.faq-item__answer');
  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isOpen = item.dataset.open === 'true';

    // fecha todos
    faqItems.forEach(other => {
      other.dataset.open = 'false';
      const otherBtn = other.querySelector('.faq-item__question');
      const otherAns = other.querySelector('.faq-item__answer');
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      if (otherAns) otherAns.hidden = true;
    });

    // abre o clicado se estava fechado
    if (!isOpen) {
      item.dataset.open = 'true';
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

/* ============================================================
   SCROLL ANIMATIONS — IntersectionObserver
   ============================================================ */
const animTargets = document.querySelectorAll('.fade-up, .fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animTargets.forEach(el => observer.observe(el));
} else {
  // Fallback: navegadores antigos — mostrar tudo imediatamente
  animTargets.forEach(el => el.classList.add('visible'));
}
