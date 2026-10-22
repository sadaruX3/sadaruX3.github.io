# Sadaru Wijethunga — Portfolio

A single-page React + Tailwind portfolio.

## Structure

```
sadaru-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # renders PortfolioV3
    ├── PortfolioV3.jsx # the actual portfolio page (hero, about, skills, projects, contact)
    └── index.css       # Tailwind base styles
```

## Run it in VS Code

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — you can deploy that to GitHub Pages, Netlify, Vercel, etc.

## Edit the content

Everything (name, skills, projects, colors, section text) lives in
`src/PortfolioV3.jsx`. Project data is in the `PROJECTS` array near the
top of the file, skills in `SKILL_GROUPS`, and nav links in `NAV_ITEMS`.
