// course.js
// Handles filtering of course cards and updating total credits dynamically

document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const courseList = document.getElementById('courseList');
  const creditsValue = document.getElementById('creditsValue');

  function updateCredits(visibleCards) {
    let total = 0;
    visibleCards.forEach(card => {
      const credits = Number(card.getAttribute('data-credits')) || 0;
      total += credits;
    });
    creditsValue.textContent = total;
  }

  function filterCourses(filter) {
    const cards = Array.from(courseList.querySelectorAll('.course-card'));
    let visible = [];
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.display = ''; // show
        visible.push(card);
      } else {
        card.style.display = 'none';
      }
    });
    updateCredits(visible);
  }

  // Wire up buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCourses(btn.getAttribute('data-filter'));
    });
  });

  // initialize
  filterCourses('all');
});
