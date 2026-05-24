# Portfolio v2 Archive & v3 Rebuild

Move the current site into a `v2/` folder for safe-keeping, then build a fresh v3 from the redesign mockup.

---

## Phase 1 — Archive current site → `v2/`

Move these items into a new `v2/` directory at the repo root:

| Item | Action |
|---|---|
| `index.html` | → `v2/index.html` |
| `src/` (entire directory) | → `v2/src/` |

The `legacy/`, `redesign/`, `CNAME`, `_config.yml`, `README.md` and `.git` stay at root.  
A brand-new `index.html` + `src/` will be the v3.

---

## Phase 2 — v3 Architecture

### Design Language (from mockup)

| Token | Value |
|---|---|
| Background | Deep navy `#0A0F1E` — `#0D1526` |
| Surface cards | `rgba(16,24,44,0.7)` with `backdrop-filter: blur(16px)` |
| Accent blue | `#4F9EFF` |
| Accent purple | `#9B8AFF` |
| Text primary | `#F0F4FF` |
| Text secondary | `#7888AA` |
| Gradient | `135deg, #4F9EFF → #9B8AFF` |
| Radius | `20px` cards, `999px` pills/buttons |
| Font | Outfit (headings) + Inter (body) — same as v2 |

### Sections (matches mockup order)

1. **Hero** — split layout: left = headline + 2 CTA buttons; right = floating phone mockup with blurred gradient blob
2. **Who I Am** — 2-column bento: left = avatar card (rounded photo + name/title + bio + resume btn), right = stats row (5+ yrs / Lima Peru) + Core Tech Stack pill tags
3. **Selected Case Studies** — left image mockup (multi-device), right = title + description + bullet highlights + tech tags + CTA
4. **Let's Connect** — 4-card row grid (LinkedIn, GitHub, Email, Twitter) with icons
5. **Footer** — centered copyright line

### File Structure

```
/                        ← repo root
├── v2/                  ← archived current site
│   ├── index.html
│   └── src/
│       ├── css/
│       └── js/
├── index.html           ← v3 entry point
└── src/
    ├── css/
    │   ├── sys.css      ← design tokens (updated palette)
    │   ├── style.css    ← reset + shared utilities
    │   ├── nav.css      ← glass nav
    │   ├── hero.css     ← hero split layout + phone mockup
    │   ├── about.css    ← Who I Am bento
    │   ├── projects.css ← case studies
    │   ├── social.css   ← connect section
    │   └── footer.css   ← footer
    └── js/
        └── app.js       ← scroll animations + typing effect
```

### Key v3 Differences vs v2

| Feature | v2 | v3 |
|---|---|---|
| Hero layout | Text only, left-aligned | Split: text left, phone mockup right |
| Navigation | Text links + contact CTA | Minimal pill nav, no CTA button (matches mockup) |
| About | 4-col bento grid | 2-col: photo card left, stats + tags right |
| Phone mockup | Static colored placeholder | Rendered device frame with gradient screen |
| Projects | 3 alternating rows | Single featured case study (clean card) visible |
| Testimonials | Horizontal scroll | **Removed** (not in redesign) |
| Footer | Inline in social section | Standalone centered footer |

---

## Verification Plan

- Open `index.html` in browser to visual-check layout matches mockup
- Confirm `v2/index.html` still loads correctly (no broken relative paths)
- Test responsive at 375px, 768px, 1280px breakpoints
