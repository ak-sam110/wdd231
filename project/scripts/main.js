// main.js: handles navigation toggle, modal logic, favorites count and localStorage state
const navToggleButtons = document.querySelectorAll('.nav-toggle');
const mainNavs = document.querySelectorAll('#main-nav');

navToggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    mainNavs.forEach(nav => {
      const expanded = nav.getAttribute('aria-hidden') === 'false' || nav.style.display === 'flex';
      nav.setAttribute('aria-hidden', expanded ? 'true' : 'false');
      btn.setAttribute('aria-expanded', String(!expanded));
      // set display inline for small screens (simple approach)
      if (!expanded) nav.style.display = 'flex'; else nav.style.display = 'none';
    });
  });
});

// Modal dialog
const modal = document.getElementById('detail-modal');
const modalCloseBtns = document.querySelectorAll('.modal-close');

function openModal(contentHtml) {
  if (!modal) return;
  modal.querySelector('#modal-body').innerHTML = contentHtml;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // focus management
  const firstFocusable = modal.querySelector('button, a, input, [tabindex]');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// close events
modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
}

// Expose modal functions for other modules
export { openModal, closeModal };

// Favorites (localStorage)
const FAVORITES_KEY = 'sam-favorites';
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}
function setFavorites(arr) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
  } catch {}
  updateFavoritesCount();
}
function updateFavoritesCount() {
  const count = getFavorites().length;
  document.querySelectorAll('#fav-count').forEach(el => el.textContent = count);
}
updateFavoritesCount();

export { getFavorites, setFavorites, updateFavoritesCount };