# 7K RE:BIRTH OBSIDIAN INFO DUMP

A modern hero database web application for "7 Knights Rebirth" game, built with Vite, React, TypeScript, Tailwind CSS 4, and TanStack Router.

## Tech Stack

- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling with CSS-based configuration
- **TanStack Router** - File-based routing
- **pnpm** - Package manager

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (install via `npm install -g pnpm`)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── HeroGrid.tsx    # Main hero grid view
│   ├── HeroDetail.tsx  # Hero detail page
│   ├── AdventTeams.tsx # Advent teams view
│   └── TeamBuilder.tsx # Team builder view
├── routes/             # TanStack Router routes (file-based)
├── hooks/              # React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants.ts        # Application constants
└── index.css           # Tailwind CSS 4 styles and theme

data/                   # JSON data files
├── hero-data.json      # Hero data
└── advent-teams-data.json # Advent team data
```

## Features

- **Hero Grid View**: Browse all heroes with filtering by type, effects, and target
- **Hero Detail View**: View detailed hero information including gear, skills, and tips
- **Advent Teams**: View team compositions for advent bosses
- **Team Builder**: Build and share team compositions (coming soon)
- **Mobile Responsive**: Fully responsive design for mobile and desktop

## Tailwind CSS 4

This project uses Tailwind CSS 4 with CSS-based configuration. Custom colors, fonts, and shadows are defined in `src/index.css` using the `@theme` directive.

## Routing

Routes are defined using TanStack Router's file-based routing system:
- `/` - Hero grid view
- `/hero/$heroName` - Hero detail view
- `/advent` - Advent teams view
- `/teambuilder` - Team builder view

## Data

Hero data is stored in `data/hero-data.json` and is automatically loaded on app initialization. The application is fully data-driven - update the JSON files to see changes reflected immediately.

## Development

- Type checking: `pnpm type-check`
- Build: `pnpm build`
- Dev server: `pnpm dev`

## License

MIT
