# PathFinder — File Structure & Connection Guide  (v2)

## Folder Structure

```
pathfinder/
│
├── index.html              ← Homepage
├── about.html              ← About page
├── categories.html         ← Categories page (future)
│
├── roadmaps/
│   ├── frontend.html       ← Frontend Dev roadmap
│   ├── data-science.html   ← (future)
│   └── ux-design.html      ← (future)
│
└── assets/
    ├── css/
    │   ├── global.css      ← All main pages
    │   └── roadmap.css     ← All roadmap pages (load AFTER global.css)
    └── js/
        ├── global.js       ← All main pages
        └── roadmap.js      ← All roadmap pages
```

---

## Connecting files: Main pages

In `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/global.css">
```

Before `</body>`:
```html
<script src="assets/js/global.js"></script>
```

---

## Connecting files: Roadmap pages

In `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/global.css">
<link rel="stylesheet" href="../assets/css/roadmap.css">
```

Before `</body>` — nodes MUST come before roadmap.js:
```html
<script>
  const nodes = {
    'node-id': {
      tag: 'Tech — Phase 1',
      title: 'Node Title',
      desc: 'Description...',
      status: 'done' | 'active' | 'locked',
      resources: [
        { name: 'Resource Name', type: 'Free Course', icon: '🆓', cls: 'res-free', url: 'https://...' }
      ]
    }
  };
</script>
<script src="../assets/js/roadmap.js"></script>
```

---

## Known bugs fixed in v2

### Bug 1 — Global `a` selector (CRITICAL)
The original `style.css` contained:
```css
.footer-col li, a { color: var(--text-muted); ... }
```
The unscoped `a` applied `color: var(--text-muted)` to EVERY anchor on the
page, overriding navbar link colours, CTA button colours, etc.

**Fix in global.css:** Only `a { text-decoration: none; }` globally.
Footer link colours are scoped to `.footer-col a` and `.footer-col li`.

### Bug 2 — Brand font conflict
The original approach overrode `.brand` in roadmap.css to use Syne, which
only worked reliably if roadmap.css loaded after global.css (fragile).

**Fix:** Roadmap pages use `.brand-roadmap` (a separate class defined only
in roadmap.css). Main pages use `.brand` (Playfair Display, global.css only).
They never conflict. HTML difference:
- Main pages:   `<div class="brand">Path<em>Finder</em></div>`
- Roadmap pages: `<div class="brand-roadmap">Path<span>finder</span></div>`

### Bug 3 — Hero styles missing from global.css (v1)
`.hero`, `.hero-left`, `.hero-right`, `.feat-card`, etc. were omitted
from the first version of global.css. They are now included.

### Bug 4 — Progress bar animation
v1 read `fill.style.width` as the target, which was always '0%' since
the element starts at 0. Fixed to read `data-progress` attribute.
Usage: `<div class="progress-bar-fill" data-progress="25%"></div>`

---

## Rules to follow on every new page

1. **Main page** → `global.css` + `global.js` only. One Google Fonts call for Playfair + DM Sans.
2. **Roadmap page** → `global.css` then `roadmap.css`. `nodes` object then `roadmap.js`. One Google Fonts call for Syne + DM Sans.
3. **Never** put roadmap sidebar/node/panel styles in global.css.
4. **Never** put page-specific hero or unique section styles in global.css — use a `<style>` block on the page.
5. **Brand class on roadmap pages is `.brand-roadmap`**, not `.brand`.
6. **`nodes` must be defined before `roadmap.js` loads** — always.
7. **Paths from roadmaps/ subfolder** use `../assets/...` not `assets/...`.
