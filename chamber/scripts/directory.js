// Fetch member data and populate page
async function loadMembers() {
  const res = await fetch('data/members.json');
  const members = await res.json();
  displayMembers(members, getViewMode());
}

function getViewMode() {
  return document.getElementById('members').classList.contains('list') ? 'list' : 'grid';
}

function displayMembers(members, mode) {
  const membersSection = document.getElementById('members');
  membersSection.innerHTML = '';
  if (mode === 'grid') {
    membersSection.className = 'grid';
    members.forEach(member => {
      membersSection.innerHTML += `
        <div class="member-card">
          <img src="images/${member.image}" alt="${member.name} logo">
          <div class="company">${member.name}</div>
          <div class="level">${membershipLevel(member.level)}</div>
          <div>${member.description}</div>
          <div><strong>Address:</strong> ${member.address}</div>
          <div><strong>Phone:</strong> ${member.phone}</div>
          <div><a href="${member.website}" target="_blank">Visit Site</a></div>
        </div>
      `;
    });
  } else {
    membersSection.className = 'list';
    members.forEach(member => {
      membersSection.innerHTML += `
        <div class="member-list-item">
          <img src="images/${member.image}" alt="${member.name} logo">
          <div>
            <div class="company">${member.name}</div>
            <div class="level">${membershipLevel(member.level)}</div>
            <div>${member.description}</div>
            <div><strong>Address:</strong> ${member.address}</div>
            <div><strong>Phone:</strong> ${member.phone}</div>
            <div><a href="${member.website}" target="_blank">Visit Site</a></div>
          </div>
        </div>
      `;
    });
  }
}

function membershipLevel(level) {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
}

// Toggle view handlers
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('members').classList.remove('list');
  document.getElementById('grid-view').classList.add('active');
  document.getElementById('list-view').classList.remove('active');
  loadMembers();
});
document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('members').classList.add('list');
  document.getElementById('list-view').classList.add('active');
  document.getElementById('grid-view').classList.remove('active');
  loadMembers();
});

// Copyright and last-modified
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent =
  `Last Modification: ${document.lastModified}`;

// On page load
window.addEventListener('DOMContentLoaded', loadMembers);

// Responsive nav (optional but recommended)
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('#main-nav ul').classList.toggle('open');
});