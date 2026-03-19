/* ============================================================
   SKILL ROADMAPS — Homepage JavaScript
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
