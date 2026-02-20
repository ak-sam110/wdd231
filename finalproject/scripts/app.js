export function responsiveNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });

  // Close menu on resize if window is larger than 650px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 650) navLinks.classList.remove('show');
  });
}

export function setWayfinding(activePage) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === activePage);
    link.setAttribute('aria-current', link.classList.contains('active') ? 'page' : 'false');
  });
}

export function showModal(content, title = 'Details') {
  const modal = document.getElementById('modal-dialog');
  if (!modal) return;
  const modalContent = modal.querySelector('.modal-body');
  const modalTitle = modal.querySelector('.modal-title');
  modalContent.innerHTML = content;
  modalTitle.textContent = title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  const modal = document.getElementById('modal-dialog');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = "";
}

export function modalAccessibility() {
  const modal = document.getElementById('modal-dialog');
  if (!modal) return;
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// LocalStorage helpers
export function getFavorites() {
  return JSON.parse(localStorage.getItem('sammytech_favorites') || '[]');
}

export function addFavorite(id) {
  let favs = getFavorites();
  if (!favs.includes(id)) favs.push(id);
  localStorage.setItem('sammytech_favorites', JSON.stringify(favs));
}

export function removeFavorite(id) {
  let favs = getFavorites().filter(f => f !== id);
  localStorage.setItem('sammytech_favorites', JSON.stringify(favs));
}

// Set up nav and modal globally (include in main .js)
responsiveNav();
setWayfinding(
  (window.location.pathname.includes('tutorials')) ? 'tutorials' :
  (window.location.pathname.includes('network')) ? 'network' :
  'home'
);
modalAccessibility();