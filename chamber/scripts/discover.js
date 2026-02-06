
// Updated discover script — builds accessible, performance-friendly cards
import { areaItems } from './items.mjs';

/**
 * Remove all children without using innerHTML (safer, avoids accidental markup injection).
 * @param {Element} node
 */
function clearChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

/**
 * Create a single accessible card element for an item.
 * Returns an <article> element.
 * @param {Object} item
 */
function createCard(item) {
  const article = document.createElement('article');
  article.className = 'card';
  article.setAttribute('role', 'article');

  // Heading with id for aria-labelledby
  const heading = document.createElement('h2');
  const headingId = `card-title-${item.id}`;
  heading.id = headingId;
  heading.textContent = item.name;
  article.appendChild(heading);

  // Figure and image with explicit width/height to avoid layout shift
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.alt || `Photo of ${item.name}`;
  // Provide explicit dimensions from items.mjs to reduce CLS
  if (item.width && item.height) {
    img.width = item.width;
    img.height = item.height;
  }
  img.loading = 'lazy';
  img.decoding = 'async';
  img.setAttribute('importance', 'low'); // hint for browsers (non-standard, okay for hints)
  img.className = 'card-image';
  figure.appendChild(img);

  // Optional short caption for the figure (improves semantics)
  if (item.caption) {
    const figcap = document.createElement('figcaption');
    figcap.textContent = item.caption;
    figure.appendChild(figcap);
  }

  article.appendChild(figure);

  // Address
  if (item.address) {
    const address = document.createElement('address');
    address.textContent = item.address;
    article.appendChild(address);
  }

  // Description
  if (item.description) {
    const desc = document.createElement('p');
    desc.textContent = item.description;
    article.appendChild(desc);
  }

  // Action: use a link to a details page (progressively enhanced). Avoid alert().
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const detailsLink = document.createElement('a');
  // Prefer an actual href so Lighthouse / SEO sees a navigable URL; you can change to a real page
  detailsLink.href = item.detailsUrl || `details.html?id=${encodeURIComponent(item.id)}`;
  detailsLink.className = 'card-button';
  detailsLink.textContent = 'Learn More';
  detailsLink.setAttribute('aria-label', `Learn more about ${item.name}`);
  // If opening in new tab required, ensure rel="noopener noreferrer" (not used here by default)
  detailsLink.addEventListener('click', (ev) => {
    // If you plan to open a modal instead of navigate, preventDefault here and open the modal.
    // ev.preventDefault();
    // openModalForItem(item);
    // For now we let the link navigate to the details url.
  });

  actions.appendChild(detailsLink);
  article.appendChild(actions);

  // Associate article with heading for screen readers
  article.setAttribute('aria-labelledby', headingId);

  return article;
}

/**
 * Render a list of items into .discover-area using DocumentFragment for performance.
 * @param {Array} items
 */
function renderCards(items) {
  const area = document.querySelector('.discover-area');
  if (!area) return;

  // Mark busy for assistive tech while rendering
  area.setAttribute('aria-busy', 'true');

  // Clear existing children safely
  clearChildren(area);

  const frag = document.createDocumentFragment();
  items.forEach((item) => {
    const card = createCard(item);
    frag.appendChild(card);
  });

  area.appendChild(frag);
  area.removeAttribute('aria-busy');
}

/**
 * Display a friendly visit message using safe localStorage access.
 */
function showVisitMessage() {
  const msgContainer = document.getElementById('visit-message');
  if (!msgContainer) return;

  let lastVisit = null;
  try {
    lastVisit = localStorage.getItem('discoverLastVisit');
  } catch (err) {
    // localStorage may be unavailable in some privacy modes — fail gracefully
    console.warn('localStorage unavailable:', err);
    lastVisit = null;
  }

  const now = Date.now();

  if (!lastVisit) {
    msgContainer.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const msInDay = 24 * 60 * 60 * 1000;
    const daysBetween = Math.floor((now - Number(lastVisit)) / msInDay);
    if (daysBetween < 1) {
      msgContainer.textContent = 'Back so soon! Awesome!';
    } else if (daysBetween === 1) {
      msgContainer.textContent = 'You last visited 1 day ago.';
    } else {
      msgContainer.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  try {
    localStorage.setItem('discoverLastVisit', String(now));
  } catch (err) {
    // ignore storage failures
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
  renderCards(areaItems);
});