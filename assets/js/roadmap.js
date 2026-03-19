/* ============================================================
   PATHFINDER — roadmap.js
   Shared by: frontend.html, data-science.html, ux-design.html, etc.

   HOW TO USE:
   1. Define a `nodes` object in a page-specific <script> block
      BEFORE this file loads.
   2. Load this file last: <script src="../assets/js/roadmap.js"></script>

   NODE DATA SHAPE:
   const nodes = {
     'node-id': {
       tag:       'Tech — Phase 1',
       title:     'HTML Basics',
       desc:      'Learn the structure...',
       status:    'done' | 'active' | 'locked',
       resources: [
         {
           name: 'MDN Web Docs',
           type: 'Free Documentation',
           icon: '📄',
           cls:  'res-doc' | 'res-free' | 'res-video',
           url:  'https://...'   // optional — makes resource a real link
         }
       ]
     }
   }
   ============================================================ */


/* ── Panel open / close ── */
function openPanel(id) {
  const n = (typeof nodes !== 'undefined') ? nodes[id] : null;
  if (!n) return;

  document.getElementById('panelTag').textContent   = n.tag;
  document.getElementById('panelTitle').textContent = n.title;
  document.getElementById('panelDesc').textContent  = n.desc;

  // CTA button state
  const btn = document.getElementById('panelBtn');
  if (n.status === 'done') {
    btn.textContent      = '✓ Completed';
    btn.style.opacity    = '1';
    btn.style.cursor     = 'default';
    btn.style.background = 'rgba(245,166,35,0.3)';
  } else if (n.status === 'active') {
    btn.textContent      = 'Mark as Complete ✓';
    btn.style.opacity    = '1';
    btn.style.cursor     = 'pointer';
    btn.style.background = 'var(--gold)';
  } else {
    btn.textContent      = '🔒 Complete previous nodes first';
    btn.style.opacity    = '0.4';
    btn.style.cursor     = 'not-allowed';
    btn.style.background = 'var(--gold)';
  }

  // Resources list
  const res = document.getElementById('panelResources');
  res.innerHTML = n.resources.map(r => {
    const tag  = r.url ? 'a' : 'div';
    const href = r.url ? `href="${r.url}" target="_blank" rel="noopener"` : '';
    return `
      <${tag} ${href} class="resource-item">
        <div class="res-icon ${r.cls}">${r.icon}</div>
        <div class="res-info">
          <div class="res-name">${r.name}</div>
          <div class="res-type">${r.type}</div>
        </div>
        <span style="color:var(--text-muted); font-size:0.8rem;">→</span>
      </${tag}>
    `;
  }).join('');

  document.getElementById('detailPanel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePanel();
});


/* ── Progress bar animation on load ── */
window.addEventListener('load', () => {
  const fill = document.querySelector('.progress-bar-fill');
  if (fill) {
    const target = fill.dataset.progress || '0%';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { fill.style.width = target; }, 200);
    });
  }
});
