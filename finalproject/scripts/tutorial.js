
import {
  responsiveNav, setWayfinding, showModal, modalAccessibility,
  getFavorites, addFavorite, removeFavorite
} from './app.js';

window.addEventListener('DOMContentLoaded', () => {
  responsiveNav();
  setWayfinding();
  modalAccessibility();
  loadTutorials();
});

async function loadTutorials() {
  const container = document.getElementById('tutorial-list');
  try {
    const resp = await fetch('./data/tutorials-data.json');
    const items = await resp.json();
    container.innerHTML = items.map(tut => tutorialCard(tut)).join('');
    document.querySelectorAll('.tut-details').forEach(btn => {
      btn.addEventListener('click', e =>
        showModal(tutorialDetail(items.find(t => t.id == btn.dataset.id)), 'Tutorial Details'));
    });
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.dataset.id;
        if (getFavorites().includes(id)) {
          removeFavorite(id); btn.textContent = 'Add Favorite';
          btn.setAttribute('aria-label', 'Add to favorites');
        } else {
          addFavorite(id); btn.textContent = 'Favorited';
          btn.setAttribute('aria-label', 'Remove from favorites');
        }
      });
    });
  } catch (err) {
    container.innerHTML = '<p>Sorry, unable to load tutorials (check connection).</p>';
    console.error(err);
  }
}

function tutorialCard(t) {
  const fav = getFavorites().includes(t.id);
  return `
  <article class="tutorial-card" tabindex="0" aria-label="${t.title}">
    <img src="${t.img}" alt="Tutorial illustration" loading="lazy" width="80" height="80">
    <h3>${t.title}</h3>
    <p>${t.description}</p>
    <div><span><b>Difficulty:</b> ${t.difficulty}</span>
      <span><b>Category:</b> ${t.category}</span></div>
    <button class="favorite-btn" data-id="${t.id}" aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}">
      ${fav ? 'Favorited' : 'Add Favorite'}
    </button>
    <button class="tut-details" data-id="${t.id}" aria-label="View details for ${t.title}">View Details</button>
  </article>`;
}
function tutorialDetail(t) {
  return `
  <div>
    <img src="${t.img}" alt="Tutorial banner" loading="lazy" style="width:100%;max-width:220px;">
    <h3>${t.title}</h3>
    <p>${t.description}</p>
    <ul>
      <li><b>Difficulty:</b> ${t.difficulty}</li>
      <li><b>Category:</b> ${t.category}</li>
      <li><b>Length:</b> ${t.length}</li>
      <li><b>Author:</b> ${t.author}</li>
    </ul>
    <a href="${t.link}" target="_blank" rel="noopener">Go to Tutorial</a>
  </div>
  `;
}

// ----------- Footer Dates -------------
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;