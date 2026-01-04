// inventory.js: fetch data, render inventory, hooks for filters, favorites, modals
import { openModal, getFavorites, setFavorites, updateFavoritesCount } from './main.js';

const DATA_URL = 'data/cars.json';
const inventoryList = document.getElementById('inventory-list');
const featuredList = document.getElementById('featured-list');

// fetch with try...catch
async function fetchCars() {
  try {
    const resp = await fetch(DATA_URL, {cache: "no-store"});
    if (!resp.ok) throw new Error(`Network error: ${resp.status}`);
    const json = await resp.json();
    return json;
  } catch (err) {
    console.error('Fetch failed', err);
    return [];
  }
}

// create a card from an item (template literal)
function carCardTemplate(car) {
  return `
    <article class="card" data-id="${car.id}" aria-labelledby="${car.id}-title">
      <div class="thumb">
        <img src="${car.img}" alt="${car.make} ${car.model} ${car.year}" loading="lazy" width="600" height="338" />
      </div>
      <h3 id="${car.id}-title">${car.year} ${car.make} ${car.model}</h3>
      <div class="meta">${car.color} • ${car.mileage.toLocaleString()} mi</div>
      <div class="price">$${car.price.toLocaleString()}</div>
      <div class="card-actions">
        <button class="btn view-details" data-id="${car.id}">View Details</button>
        <button class="btn fav-btn" data-id="${car.id}" aria-pressed="false">♡ Favorite</button>
      </div>
    </article>
  `;
}

// Render a list of cars into a container element
function renderCars(cars, container) {
  if (!container) return;
  container.innerHTML = cars.map(carCardTemplate).join('');
  // attach event listeners
  container.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const car = cars.find(c => c.id === id);
      if (!car) return;
      const content = buildDetailHtml(car);
      openModal(content);
    });
  });
  container.querySelectorAll('.fav-btn').forEach(btn => {
    const id = btn.dataset.id;
    const favs = getFavorites();
    if (favs.includes(id)) {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = '♥ Favorited';
    }
    btn.addEventListener('click', () => {
      toggleFavorite(id, btn);
    });
  });
}

function buildDetailHtml(car) {
  return `
    <div class="detail-grid">
      <div><img src="${car.img}" alt="${car.make} ${car.model}" width="640" height="360" loading="lazy" style="width:100%;border-radius:8px;"/></div>
      <div>
        <h2 id="modal-title">${car.year} ${car.make} ${car.model}</h2>
        <p class="meta">${car.color} • ${car.mileage.toLocaleString()} miles</p>
        <p class="price">$${car.price.toLocaleString()}</p>
        <p>${car.desc}</p>
        <dl>
          <dt>ID</dt><dd>${car.id}</dd>
          <dt>Make</dt><dd>${car.make}</dd>
          <dt>Model</dt><dd>${car.model}</dd>
          <dt>Year</dt><dd>${car.year}</dd>
        </dl>
        <div style="margin-top:1rem;">
          <button class="btn primary" id="request-testdrive" data-id="${car.id}">Request Test Drive</button>
          <button class="btn" id="modal-fav" data-id="${car.id}">♡ Favorite</button>
        </div>
      </div>
    </div>
  `;
}

function toggleFavorite(id, btn) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = '♥ Favorited';
  } else {
    favs.splice(idx, 1);
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = '♡ Favorite';
  }
  setFavorites(favs);
}

// filter & sort logic
function applyFilters(cars) {
  const search = (document.getElementById('search')?.value || '').toLowerCase().trim();
  const minPrice = Number(document.getElementById('min-price')?.value || 0);
  const maxPrice = Number(document.getElementById('max-price')?.value || 0);
  const sort = document.getElementById('sort')?.value || 'relevance';

  let results = cars.slice();

  // search using array filter (demonstrate array methods)
  if (search) {
    results = results.filter(c => (`${c.make} ${c.model}`.toLowerCase().includes(search) || c.id === search));
  }
  if (minPrice) results = results.filter(c => c.price >= minPrice);
  if (maxPrice) results = results.filter(c => c.price <= maxPrice);

  // sorting with array.sort
  if (sort === 'price-asc') results.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') results.sort((a,b) => b.price - a.price);
  if (sort === 'year-desc') results.sort((a,b) => b.year - a.year);

  return results;
}

async function init() {
  const cars = await fetchCars();

  // dynamic generation: ensure at least 15 items shown (we provide 15 in cars.json)
  if (featuredList) {
    const featured = cars.slice(0, 3);
    renderCars(featured, featuredList);
  }

  if (inventoryList) {
    // restore saved filter state
    try {
      const savedFilters = JSON.parse(localStorage.getItem('sam-filters') || '{}');
      if (savedFilters) {
        if (savedFilters.search) document.getElementById('search').value = savedFilters.search;
        if (savedFilters.minPrice) document.getElementById('min-price').value = savedFilters.minPrice;
        if (savedFilters.maxPrice) document.getElementById('max-price').value = savedFilters.maxPrice;
        if (savedFilters.sort) document.getElementById('sort').value = savedFilters.sort;
      }
    } catch {}

    const filtered = applyFilters(cars);
    renderCars(filtered, inventoryList);

    // hook apply/clear
    document.getElementById('apply-filters').addEventListener('click', () => {
      const results = applyFilters(cars);
      // save filters
      const toSave = {
        search: document.getElementById('search').value,
        minPrice: document.getElementById('min-price').value,
        maxPrice: document.getElementById('max-price').value,
        sort: document.getElementById('sort').value
      };
      try { localStorage.setItem('sam-filters', JSON.stringify(toSave)); } catch {}
      renderCars(results, inventoryList);
    });
    document.getElementById('clear-filters').addEventListener('click', () => {
      document.getElementById('filters').reset();
      try { localStorage.removeItem('sam-filters'); } catch {}
      renderCars(cars, inventoryList);
    });
  }

  // delegated events for modal content favorites & test drive
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'modal-fav') {
      const id = e.target.dataset.id;
      const btnOutside = document.querySelector(`.fav-btn[data-id="${id}"]`);
      toggleFavorite(id, btnOutside || e.target);
    }
    if (e.target && e.target.id === 'request-testdrive') {
      const id = e.target.dataset.id;
      // open contact form in new tab with prefilled interest
      const url = new URL('contact.html', location.href);
      url.searchParams.set('interest', id);
      window.location.href = url.toString();
    }
  });

  // update favorites count when storage changes (another tab)
  window.addEventListener('storage', () => updateFavoritesCount());

  // example use of array methods: compute average price and total inventory count (reduce)
  const avgPrice = cars.reduce((acc, c) => acc + c.price, 0) / (cars.length || 1);
  console.log(`Inventory loaded: ${cars.length} vehicles; average price $${Math.round(avgPrice).toLocaleString()}`);
}

init();