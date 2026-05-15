/* ============================================
   main.js — Grace Community Church
   ============================================ */

// ── Navbar scroll behavior ───────────────────
const navbar = document.getElementById('mainNavbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Utility: Format date ─────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  };
}

// ── Home Page: Load preview events ───────────
const homeEventsContainer = document.getElementById('home-events-container');
if (homeEventsContainer) {
  API.getEvents().then(events => {
    const preview = events.slice(0, 3);
    homeEventsContainer.innerHTML = preview.map(ev => {
      const d = formatDate(ev.date);
      return `
        <div class="col-md-4">
          <div class="event-card d-flex">
            <div class="event-card-date">
              <div class="event-date-day">${d.day}</div>
              <div class="event-date-month">${d.month}</div>
            </div>
            <div class="event-card-body">
              <div class="event-tag">Upcoming</div>
              <h5>${ev.title}</h5>
              <p>${ev.description.substring(0, 90)}...</p>
            </div>
          </div>
        </div>`;
    }).join('');
  });
}

// ── Events Page ──────────────────────────────
const eventsContainer = document.getElementById('events-container');
if (eventsContainer) {
  API.getEvents().then(events => {
    eventsContainer.innerHTML = events.map(ev => {
      const d = formatDate(ev.date);
      return `
        <div class="col-md-6 col-lg-4">
          <div class="event-card h-100">
            <div class="d-flex align-items-stretch">
              <div class="event-card-date" style="min-width:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div class="event-date-day">${d.day}</div>
                <div class="event-date-month">${d.month}</div>
              </div>
              <div class="event-card-body">
                <div class="event-tag">Upcoming Event</div>
                <h5>${ev.title}</h5>
                <p>${ev.description}</p>
                <small class="text-muted">${d.full}</small>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');
  });
}

// ── Sermons Page ─────────────────────────────
const sermonsContainer = document.getElementById('sermons-container');
if (sermonsContainer) {
  API.getSermons().then(sermons => {
    sermonsContainer.innerHTML = sermons.map(s => {
      const d = formatDate(s.date);
      return `
        <div class="col-md-6 col-lg-4">
          <div class="sermon-card h-100">
            <div class="sermon-thumb">
              <iframe src="${s.videoUrl}" title="${s.title}" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="sermon-card-body">
              <div class="sermon-date">${d.full}</div>
              <h5>${s.title}</h5>
              <p class="text-muted mb-0" style="font-size:.85rem;">
                <i class="bi bi-person me-1"></i>${s.speaker || 'Pastor Daniel Osei'}
              </p>
            </div>
          </div>
        </div>`;
    }).join('');
  });
}

// ── Prayer Request Form ───────────────────────
const prayerForm = document.getElementById('prayerForm');
if (prayerForm) {
  prayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!prayerForm.checkValidity()) {
      prayerForm.classList.add('was-validated');
      return;
    }

    const btn = prayerForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

    const data = {
      name: prayerForm.querySelector('#prayerName').value.trim(),
      email: prayerForm.querySelector('#prayerEmail').value.trim(),
      category: prayerForm.querySelector('#prayerCategory').value,
      message: prayerForm.querySelector('#prayerMessage').value.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await API.submitPrayerRequest(data);
      document.getElementById('prayerSuccess').classList.remove('d-none');
      prayerForm.reset();
      prayerForm.classList.remove('was-validated');
      setTimeout(() => document.getElementById('prayerSuccess').classList.add('d-none'), 6000);
    } catch (err) {
      alert('There was an error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send me-2"></i>Submit Prayer Request';
    }
  });
}

// ── Contact Form ─────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    const btn = contactForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    const data = {
      name: contactForm.querySelector('#contactName').value.trim(),
      email: contactForm.querySelector('#contactEmail').value.trim(),
      subject: contactForm.querySelector('#contactSubject').value.trim(),
      message: contactForm.querySelector('#contactMessage').value.trim()
    };

    try {
      await API.submitContact(data);
      document.getElementById('contactSuccess').classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      setTimeout(() => document.getElementById('contactSuccess').classList.add('d-none'), 6000);
    } catch (err) {
      alert('There was an error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
    }
  });
}

// ── Scroll reveal ─────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .event-card, .sermon-card, .stat-item, .pastor-card, .mission-block').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
