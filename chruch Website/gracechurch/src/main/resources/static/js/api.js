/* ============================================
   api.js — Spring Boot REST API Integration
   Base URL: http://localhost:8080/api
   ============================================ */

const API_BASE = 'http://localhost:8080/api';

const API = {
  // ── Events ──────────────────────────────────
  async getEvents() {
    try {
      const res = await fetch(`${API_BASE}/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, using mock data:', err.message);
      return API.mockEvents();
    }
  },

  async createEvent(data) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create event');
    return await res.json();
  },

  // ── Sermons ─────────────────────────────────
  async getSermons() {
    try {
      const res = await fetch(`${API_BASE}/sermons`);
      if (!res.ok) throw new Error('Failed to fetch sermons');
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, using mock data:', err.message);
      return API.mockSermons();
    }
  },

  async createSermon(data) {
    const res = await fetch(`${API_BASE}/sermons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create sermon');
    return await res.json();
  },

  // ── Prayer Requests ──────────────────────────
  async submitPrayerRequest(data) {
    try {
      const res = await fetch(`${API_BASE}/prayer-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to submit prayer request');
      return await res.json();
    } catch (err) {
      // Graceful degradation: simulate success when backend not running
      console.warn('API unavailable, simulating success:', err.message);
      return { success: true, message: 'Prayer request received (offline mode)' };
    }
  },

  // ── Contact Form ─────────────────────────────
  async submitContact(data) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to submit contact form');
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, simulating success:', err.message);
      return { success: true };
    }
  },

  // ── Mock Data (when backend is offline) ──────
  mockEvents() {
    return [
      { id: 1, title: 'Annual Prayer & Fasting Week', date: '2025-02-10', description: 'Join us for seven days of corporate fasting and intercession for our city, nation, and the nations.' },
      { id: 2, title: 'Youth Conference 2025', date: '2025-02-22', description: 'A powerful weekend gathering for young adults aged 16–35. Worship, teaching, and fellowship.' },
      { id: 3, title: "Women's Retreat — Valley of Refreshing", date: '2025-03-08', description: 'A weekend getaway for all women to rest, reconnect, and be renewed in God\'s presence.' },
      { id: 4, title: 'Easter Sunrise Service', date: '2025-04-20', description: 'Celebrate the resurrection of Jesus Christ with our outdoor sunrise worship experience.' },
      { id: 5, title: 'Marriage Enrichment Seminar', date: '2025-05-03', description: 'Practical tools and biblical foundations for stronger, healthier marriages.' },
      { id: 6, title: 'Community Outreach Day', date: '2025-05-17', description: 'Serve alongside fellow believers to bless our community with food, prayer, and care.' }
    ];
  },

  mockSermons() {
    return [
      { id: 1, title: 'The Power of Unwavering Faith', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2025-01-19', speaker: 'Pastor Daniel Osei' },
      { id: 2, title: 'Walking in Divine Purpose', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2025-01-12', speaker: 'Pastor Daniel Osei' },
      { id: 3, title: "Grace That Surpasses Understanding", videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2025-01-05', speaker: 'Rev. Miriam Afolabi' },
      { id: 4, title: 'Praying With Authority', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2024-12-29', speaker: 'Pastor Daniel Osei' },
      { id: 5, title: 'The Fruit of the Spirit', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2024-12-22', speaker: 'Elder James Mensah' },
      { id: 6, title: 'Overcoming the Spirit of Fear', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', date: '2024-12-15', speaker: 'Rev. Miriam Afolabi' }
    ];
  }
};
