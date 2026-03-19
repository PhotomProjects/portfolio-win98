# Portfolio Win98

---

## <ins>Disclaimer</ins>

This website is a personal portfolio created solely to showcase my development skills. It is not intended for commercial use. If you have any questions or concerns regarding intellectual property or other matters, please contact me via GitHub, LinkedIn, or email.

---

## <ins>About</ins>

A Windows 98–inspired portfolio website that behaves like a small “desktop OS”: shortcuts, taskbar, start menu, and windows.  
The goal is to present my projects in a unique way, different than a simple portfolio while keeping the stack simple and lightweight.

**Live:** https://authelinflorian.dev

**Lab:** https://lab.authelinflorian.dev

**CV:** https://cv.authelinflorian.dev (auto-switches to the matching language)

---

## <ins>Why this project?</ins>

This project was made to:

- showcase my front-end fundamentals (DOM, events, UI logic, CSS layout)
- build a reusable base to plug my future projects into
- practice real-world concerns: i18n, accessibility basics, responsive behavior, SEO and security headers
- prove I can create a strong UI identity without a framework

---

## <ins>Methodology</ins>

The main idea was to create reusable “components” with HTML structure + CSS classes, and connect them with data-attributes in JavaScript.

### Reusable UI building blocks

- Window shell
  - `.window` → the window container
  - `.titlebar` → draggable-looking title bar (cursor + layout)
  - `.window-content` → scrollable content area

Every window uses the same pattern:

- a titlebar with the icon + title
- window controls (min/max disabled for now, close enabled)
- a content area

### Data-driven behavior

- `data-open="win-id"` on desktop/start menu items -> it opens a matching window `#win-id`
- `data-action="close"` on a window button -> it closes that specific window
- i18n:
  - `data-i18n="key"` replaces text content
  - `data-i18n-attr="aria-label|placeholder|..."` replaces attributes

### Modular JS (ES modules)

Code is split into small modules:

- `js/core/` for generic behaviors (windows, taskbar, i18n, responsive)
- `js/apps/` for window-specific behaviors (home boot screen, help timing, etc.)

---

## <ins>Stack</ins>

![HTML5](https://img.shields.io/badge/HTML5-c0c0c0?style=for-the-badge&logo=html5&logoColor=008080)
![CSS3](https://img.shields.io/badge/CSS3-c0c0c0?style=for-the-badge&logo=css3&logoColor=008080)
![JavaScript](https://img.shields.io/badge/JavaScript-c0c0c0?style=for-the-badge&logo=javascript&logoColor=008080)
![Cloudflare](https://img.shields.io/badge/Cloudflare-c0c0c0?style=for-the-badge&logo=cloudflare&logoColor=008080)

**Why this stack?**

I used a vanilla stack to strengthen my coding skills and knowledge before moving to frameworks.

---

## <ins>Structure</ins>

```txt
public/
  index.html
  css/
    win98.css
    app.css
    nojs.css
  js/
    main.js
    core/
      i18n.js
      responsive.js
      taskbar.js
      windows.js
      drag.js     # (WIP / planned)
      state.js    # (WIP / planned)
    apps/
      home.js
      help.js
      contact.js  # (WIP)
      projects.js # (WIP)
  i18n/
    fr.json
    en.json
    ja.json
  _headers
  _redirects
  robots.txt
  sitemap.xml
```

---

## Local development

Because i18n uses `fetch("/i18n/...")`, I needed a local HTTP server (opening `index.html` directly won’t fully work).

### Node.js

```bash
npx http-server ./public -p 8080
```

---

## <ins>Main functions</ins>

### Desktop & Windows

- Desktop shortcuts open windows (`data-open` → `#win-id`)
- Windows can be opened/closed
- Close button:
  - adds `.is-closed`
  - sets `hidden` to remove from layout

### Start menu

- Open/close on Start button
- Closes on:
  - outside click
  - Escape
- Start menu items open windows
- “Shut Down” triggers a refresh (OS-like)

### Boot screen & Help

- Home window shows a short boot screen (loading bar) before displaying content
- Help window:
  - auto-opens after boot (desktop only)
  - auto-closes after a delay
  - can be toggled from the taskbar help button

### i18n (FR / EN / JA)

- JSON dictionaries: `public/i18n/{fr,en,ja}.json`
- Language is stored in `localStorage` and applied to `<html lang="...">`
- Content + attributes are translated via `data-i18n` / `data-i18n-attr`
- CV link automatically matches the selected language

### Local time (system tray)

- Displays local time (updates every minute)
- Date is available as a tooltip in the current locale

### Responsive behavior

- **Mobile (< 540px)**: dedicated “Mobile / under construction” window, close disabled
- **Tablet (540–991px)**:
  - alert window shown
  - “one window at a time” behavior (opening one hides others)

### No-JS fallback

- `<noscript>` loads `css/nojs.css` for a simplified readable version (CSP-safe)

---

## <ins>Deployment</ins>

Static site (no build step):

- build command: none
- output directory: public

Cloudflare Pages files:

- public/\_headers → security headers + CSP
- public/\_redirects → canonical redirect (/index.html → /)
- robots.txt + sitemap.xml for SEO

---

## <ins>Known Issues</ins>

- fix mobile media query when using landscape mode

---

## <ins>Roadmap</ins>

- [ ] Window true “state” persistence (positions/open windows)

      (the DOM already stores the current visual state, but it is not yet an explicit state model)

- [ ] Minimize / maximize behavior
- [ ] Proper taskbar “open apps” area (like Win98)
- [ ] Replace `mailto:` form with a serverless endpoint (Cloudflare Workers)
- [ ] `prefers-reduced-motion` support
- [ ] lazy load
- [ ] start / shutdown sound effect
- [ ] shutting down animation
- [ ] add music

---

## <ins>AI</ins>

I used AI as an assistant to:

- run audits / checklists (a11y / SEO / security)
- help me understand new concepts

I still remained the actor of my project, keeping full control over decisions and code.

---

## <ins>FAQ</ins>

### Host

---

## <ins>License</ins>

See `LICENSE`.
