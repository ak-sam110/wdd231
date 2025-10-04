// ----------- Weather Section -------------
const WEATHER_API_KEY = "2f1ea7cce21e9753457890fab4f81e7d"; // Replace with your OpenWeatherMap API key
const CITY = "Ibadan";
const COUNTRY = "NG"; // Nigeria

async function fetchWeather() {
  // Coordinates for Oyo State (7.46, 3.90)
  const lat = 7.46, lon = 3.90;     
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Current weather
    const current = data.current;
    document.getElementById("current-weather").innerHTML = `
      <strong>${Math.round(current.temp)}&deg;C</strong><br>
      ${current.weather[0].description}<br>
      Humidity: ${current.humidity}%<br>
      Sunrise: ${new Date(current.sunrise*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}<br>
      Sunset: ${new Date(current.sunset*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
    `;

    // 3-day forecast
    const days = ["Today", "Tomorrow", (new Date(Date.now() + 2*86400000)).toLocaleDateString('en-US', {weekday: 'long'})];
    let forecastHtml = "";
    for (let i = 0; i < 3; i++) {
      const day = data.daily[i];
      forecastHtml += `<div class="forecast-day"><strong>${days[i]}</strong>: ${Math.round(day.temp.day)}&deg;C</div>`;
    }
    document.getElementById("weather-forecast").innerHTML = forecastHtml;
  } catch (err) {
    document.getElementById("current-weather").textContent = "sunrise.";
    document.getElementById("weather-forecast").textContent = "humidity";
  }
}
fetchWeather();

// ----------- Spotlights Section (Gold/Silver random) -------------
async function loadSpotlights() {
  const res = await fetch('data/members.json');
  const members = await res.json();
  // Filter to gold and silver
  const spotlightMembers = members.filter(m => m.level === 2 || m.level === 3);
  // Shuffle and pick 2 or 3
  spotlightMembers.sort(() => Math.random() - 0.5);
  const count = Math.random() > 0.5 ? 3 : 2;
  const selected = spotlightMembers.slice(0, count);

  const container = document.getElementById('spotlight-members');
  container.innerHTML = '';
  selected.forEach(member => {
    container.innerHTML += `
      <div class="spotlight-card">
        <img src="images/${member.image}" alt="${member.name} logo">
        <div class="company">${member.name}</div>
        <div class="level">${member.level === 3 ? "Gold Member" : "Silver Member"}</div>
        <div>${member.description || ""}</div>
        <div><strong>Phone:</strong> ${member.phone}</div>
        <div><strong>Address:</strong> ${member.address}</div>
        <div><a href="${member.website}" target="_blank">Visit Site</a></div>
      </div>
    `;
  });
}
loadSpotlights();

// ----------- Footer Dates -------------
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;

// ----------- Responsive Nav (optional) -------------
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('#main-nav ul').classList.toggle('open');
});