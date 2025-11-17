# Repository Guidelines

## Architecture & Layout
The site is a static SPA with two primary views (`#hero-grid-view` and `#hero-detail-view`) defined in `index.html`; specialty guides live in `wish-list.html`, `speed-gearing.html`, and `guild-war-teams.html`. Navigation in every HTML file must follow the Cursor/Claude order: Wish List -> Speed Gearing Guide -> Hero Database -> Guild War Teams -> Advent Teams -> Team Builder. JavaScript lives in `js/` as ES modules: `main.js` boots, `state.js` holds filters, `hero-grid.js` and `hero-detail.js` render the two views, `gear-builder.js` manages complex layouts, while `filters.js`, `views.js`, and `advent-teams.js` cover interaction. Data sits in `data/hero-data.json` and `data/advent-teams-data.json`; assets belong in `Hero Portraits/`, `Hero Models BGL/`, `Gear Sets Photos/`, `Type Icons/`, and `Pet Icons/`. Always route portrait/model lookups through `getHeroImagePath` so URL encoding stays correct.

## Local Development Workflow
Follow `.cursorrules`: always host with Node tooling. Preferred command: `npx --yes serve -s . -l 3000`. `npm start` or `npm run dev` execute `server.js` on port 3000 for parity testing. `npm run python` exists for limited comparison only; do not fall back to `python -m http.server`. Deploy via `netlify deploy --prod` (or `--dry-run`) which consumes `netlify.toml`.

## Coding Style & Naming
Use ES modules with explicit relative imports, 4-space indentation, and `const`/`let`. DOM ids/classes stay kebab-case, JS identifiers camelCase, assets PascalCase (`HeroName.png`) to match game names. Maintain the rarity-sorted hero arrays in `js/constants.js`, and document non-obvious helpers with short intent comments. When special layouts are required, extend `gear-builder.js`; otherwise keep hero logic data-driven through JSON edits.

## Testing & QA
No automated suite, so manual regression is required. After each change: host locally, clear cache, verify the grid, detail panel, filters, Advent teams, and the `#teams` route. Confirm every hero entry has matching portrait/model assets (watch for console 404s). Before PRs, trigger a Netlify draft or `--dry-run` deploy and inspect responsive breakpoints.

## Commits & PRs
Mirror existing sentence-cased commit subjects (for example, "Fixed menu navigation error"), keep them under roughly 72 characters, and isolate unrelated work. PRs should describe scope, list touched JSON and media files, link issues, attach UI screenshots or GIFs plus the Netlify preview URL, and enumerate manual test steps.

## Documentation Map
Consult `.cursorrules` for hosting mandates and workflow guardrails. `.claude/CLAUDE.md` covers architecture, view logic, and the modular docs system; use `.claude/heroes.md` for hero and gear details, `.claude/teams.md` for Advent team flows, and `.claude/reference.md` for design system notes. Always review the relevant file before editing its domain.

