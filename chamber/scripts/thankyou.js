
    // Animate membership cards on load (not on user action)
    window.addEventListener('DOMContentLoaded', function() {
      const cards = document.querySelectorAll('.membership-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 210 + 130*i);
      });

      // Read and display query string field values
      function getParam(name) {
        const url = new URL(window.location);
        return url.searchParams.get(name) || "";
      }
      // Assign values
      document.getElementById('fn').textContent = getParam('firstName');
      document.getElementById('ln').textContent = getParam('lastName');
      document.getElementById('mail').textContent = getParam('email');
      document.getElementById('ph').textContent = getParam('mobile');
      document.getElementById('org').textContent = getParam('organization');
      document.getElementById('date').textContent = getParam('timestamp');
    });

    // Modal handling (same logic as in join.html)
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
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll('.modal[aria-hidden="false"]').forEach(modal =>
          modal.setAttribute('aria-hidden', 'true'));
      }
    });
    // Accessibility: trap focus in modal
    function trapFocus(element) {
      const focusEls = element.querySelectorAll('a, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const firstEl = focusEls[0];
      const lastEl = focusEls[focusEls.length - 1];
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      });
    }
    document.querySelectorAll('.modal').forEach(trapFocus);

     // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
