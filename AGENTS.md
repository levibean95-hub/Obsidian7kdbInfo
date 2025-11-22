# Repository Guidelines

## Project Structure & Module Organization
Obsidian7kdb Info is a Vite-driven React SPA. `src/components` hosts reusable UI as well as feature folders (`Filters`, `HeroDetail`, `Navigation`, etc.), while routed pages live in `src/pages` and share orchestration from `src/routes.tsx`. `src/context/AppContext.tsx` exposes global hero/team state, and `src/lib` centralizes constants, loaders, image exporters, and gear utilities. JSON data and hero imagery live under `public/` (notably `public/data` and the portrait subfolders); production bundles are emitted to `dist/`.

## Build, Test, and Development Commands
- `pnpm install` - install dependencies (Node 18+; pnpm is assumed in CI).
- `pnpm dev` - start Vite at http://localhost:3000 with hot reloading.
- `pnpm build` - run TypeScript project references then `vite build` into `dist/`.
- `pnpm preview` - locally serve the latest build to mirror deploy behavior.
- `pnpm lint` - run ESLint (JS/TS, react-hooks, refresh) to enforce style.

## Coding Style & Naming Conventions
Use TypeScript + React 19 functional components and hooks. Prefer two-space indentation, double quotes, and PascalCase component files (e.g., `GearCard.tsx`). Keep hooks/utilities camelCase and colocate component-specific styles while shared styles stay in `App.css` and `index.css`. Run `pnpm lint` or enable the ESLint integration in your editor; avoid disabling rules except around generated data parsing.

## Testing Guidelines
Automated tests are not yet committed, so exercise new features via `pnpm dev` plus `pnpm preview` for production parity. When adding tests, name them `*.test.tsx` beside the module, use React Testing Library, and prefer descriptive `describe`/`it` blocks (hero filtering, gear cards, team builder exports). Always include sample data rows in `public/data/*.json` to cover your changes and document manual verification steps in the PR.

## Commit & Pull Request Guidelines
Recent commits use short, imperative summaries (e.g., `Fix guild war teams`, `Add base for pull sim`). Keep messages under ~72 characters, note the affected area first, and reference issue IDs or hero names when relevant. Pull requests should describe user-facing impact, data files touched, and manual/automated verification, plus screenshots or GIFs for UI/data differences. Link Netlify preview URLs whenever possible.

## Data & Asset Workflow
Because the app is data-driven, update JSON before touching components. Keep filenames consistent (`HeroName.png`) across `public/Hero Portraits`, `public/Downloaded Hero Portraits`, and optional `public/Hero Models BGL`. Register heroes in `src/lib/constants.ts` and leverage utilities in `src/lib/data-loader.ts` or `team-image-export.ts` for new fields. Validate JSON via `pnpm dev` reloads and commit large assets via Git LFS if applicable.
