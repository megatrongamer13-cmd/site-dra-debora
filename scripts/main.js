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
