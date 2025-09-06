// Dynamically set copyright year and last modified date
document.addEventListener('DOMContentLoaded', function () {
  // Copyright year
  const year = new Date().getFullYear();
  document.getElementById('copyrightYear').textContent = year;

  // Last modified
  document.getElementById('lastModified').textContent =
    'Last Modification: ' + document.lastModified;
});