// navigation.js
// Handles hamburger toggle and responsive nav behavior

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
  });

  // close nav when a link is clicked (mobile)
  nav.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'A' && window.innerWidth < 900) {
      nav.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Ensure nav visibility after resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      nav.style.display = 'block';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // initialize based on current width
  if (window.innerWidth >= 900) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
});
