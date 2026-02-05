import { areaItems } from '../scripts/items.mjs';

function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = item.name;

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = `Photo of ${item.name}`;
  figure.appendChild(img);

  const address = document.createElement('address');
  address.textContent = item.address;

  const desc = document.createElement('p');
  desc.textContent = item.description;

  const button = document.createElement('button');
  button.textContent = 'Learn More';
  button.onclick = () => {
    alert(`Learn more about ${item.name}!`);
    // Optionally, open modal or more info.
  };

  card.append(title, figure, address, desc, button);
  return card;
}

function renderCards(items) {
  const area = document.querySelector('.discover-area');
  area.innerHTML = '';
  items.forEach( item => {
    const card = createCard(item);
    area.appendChild(card);
  });
}

// LocalStorage for last visit logic
function showVisitMessage() {
  const msgContainer = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('discoverLastVisit');
  const now = Date.now();

  if (!lastVisit) {
    msgContainer.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msInDay = 24*60*60*1000;
    const daysBetween = Math.floor((now - lastVisit) / msInDay);
    if (daysBetween < 1) {
      msgContainer.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      msgContainer.textContent = "You last visited 1 day ago.";
    } else {
      msgContainer.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }
  localStorage.setItem('discoverLastVisit', now);
}

document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
  renderCards(areaItems);
});