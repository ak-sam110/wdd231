// Responsive navigation menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('primaryNav');

  // Show/hide nav on mobile
  menuBtn.addEventListener('click', function () {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });

  // Hide nav when resizing to large screen
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 700) {
      nav.style.display = 'block';
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      nav.style.display = 'none';
    }
  });

  // Menu always visible on large screens
  if (window.innerWidth >= 700) {
    nav.style.display = 'block';
  }
});