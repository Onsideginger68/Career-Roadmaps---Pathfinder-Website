/* ============================================================
   PATHFINDER — global.js
   Shared by: index.html, about.html, categories.html, etc.
   ============================================================ */


/* ── Tag Filter Buttons ── */
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


/* ── Hero Feature Cards — active state on click ── */
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.feat-card').forEach(c => c.classList.remove('active-card'));
    card.classList.add('active-card');
  });
});


/* ── Scroll Fade-In (IntersectionObserver) ── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Immediately reveal anything already in viewport on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });
})();


/* ── Auto-highlight active nav link based on current filename ── */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
})();
