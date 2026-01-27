   
// Set form timestamp value on page load
document.getElementById('formTimestamp').value = new Date().toLocaleString();

//Animate membership cards in sequence
window.addEventListener('DOMContentLoaded', function() {
    const cards = this.document.querySelectorAll('.membership-card');
    cards.forEach((card, i) => {
        this.setTimeout(() => {
            card.classList.add('visible');
        }, 280 + 120*i);
    });
});

// Modal control logic (open & close)
document.querySelectorAll('.membership-card a[data-modal]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.setAttribute('aria-hidden', 'false');
            modal.querySelector('.close-btn').focus();
        }
    });
});
document.querySelectorAll('.close-btn[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', function() {
        const modalId = this.getAttribute('data-close-modal');
        document.getElementById(modalId).setAttribute('aria-hidden', 'true');
    });
});

// keyboard (escape) closes modal 
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.modal[aria-hidden="false"]').forEach(modal => 
            modal.setAttribute('aria-hidden', 'true'));
    }    
});

// Trap focus inside open modal
function trapFocus(element) {
    const focusEls = element.querySelectorAll('a, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    const firstEls = focusEls[0];
    const lastEls = focusEls[focusEls.length -1];
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftkey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftkey && document.activeElemnt === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }

        }
    });
}
document.querySelectorAll('.modal').forEach(trapFocus);

 // Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();


