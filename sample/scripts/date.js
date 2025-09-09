// date.js
// outputs the copyright year and last modified date

document.addEventListener('DOMContentLoaded', () => {
  // current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // last modified
  const lastEl = document.getElementById('lastModified');
  if (lastEl) {
    // document.lastModified returns a string - use it directly per assignment
    lastEl.textContent = `Last Modified: ${document.lastModified}`;
  }
});
