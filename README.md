# 7 Knights Rebirth - Hero Database

A modern, mobile-responsive React + TypeScript web application that serves as a comprehensive hero database for "7 Knights Rebirth" game. Built with Vite, TanStack Router, and React 19.

## Features

- **Hero Database**: Browse all heroes with filtering by type, effects, and target
- **Detailed Hero Pages**: View comprehensive hero information including:
  - Gear recommendations (PvE and PvP, T0 and T6)
  - Hero effects and abilities
  - Skill enhancement priorities
  - Tips and important information
- **Advent Teams**: View team compositions for Advent boss content
- **Team Builder**: Create, customize, and share your own team compositions with image export
- **Guild War Teams**: View guild war team compositions
- **Speed Gearing Guide**: Interactive guide for optimizing gear speed stats
- **Wish List**: Tier list of heroes ranked by wish list priority
- **Search Functionality**: Quickly find specific heroes
- **Effect Filtering**: Filter heroes by their effects
- **Mobile Responsive**: Works perfectly on both desktop and mobile devices

## Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **pnpm** - Fast, disk space efficient package manager
- **CSS** - Modern styling with CSS variables

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Obsidian7kdbInfo

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000` with hot module replacement.

### Build

```bash
# Build for production
pnpm build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview production build locally
pnpm preview
```

## Project Structure

```
src/
  ├── components/          # Reusable React components
  │   ├── Filters/        # Filter components
  │   ├── HeroDetail/     # Hero detail components
  │   └── Navigation/     # Navigation component
  ├── context/            # React context providers
  │   └── AppContext.tsx  # Global app state management
  ├── lib/                # TypeScript utilities and types
  │   ├── types.ts        # TypeScript type definitions
  │   ├── constants.ts    # Application constants
  │   ├── utils.ts        # Utility functions
  │   ├── data-loader.ts  # Data loading functions
  │   ├── gear-builder.ts # Gear-related utilities
  │   └── team-image-export.ts # Team image export utilities
  ├── pages/              # Page components
  │   ├── LandingPage/    # Landing page
  │   ├── HeroDatabase/   # Hero database pages
  │   ├── GuildWarTeams/  # Guild war teams
  │   ├── SpeedGearing/   # Speed gearing guide
  │   └── WishList/       # Wish list
  ├── routes.tsx          # Route definitions
  ├── App.tsx             # Main App component
  └── main.tsx            # Application entry point

public/
  ├── data/               # JSON data files
  │   ├── hero-data.json
  │   ├── advent-teams-data.json
  │   └── guild-war-teams-data.json
  ├── Hero Portraits/     # Hero portrait images
  ├── Downloaded Hero Portraits/ # Downloaded hero portraits
  ├── Hero Models BGL/    # Hero model images
  ├── Gear Sets Photos/   # Gear set images
  ├── Type Icons/         # Type icon images
  └── Pet Icons/          # Pet icon images
```

## Adding or Updating Heroes

The application is **fully data-driven**. To add or update hero information:

1. **Edit `public/data/hero-data.json`** directly with the hero data
2. **Refresh the browser** to see changes (or rely on Vite HMR)

No code changes are needed for most heroes! The JSON file contains all fields:
- Meta information (role, type, rarity, etc.)
- Effects array
- Gear configurations (PvE and PvP, T0 and T6)
- Skill enhancement priority
- Tips and important information

### Adding a New Hero

1. **Add hero portraits**:
   - Add to `public/Hero Portraits/` folder (filename: `HeroName.png`)
   - Add to `public/Downloaded Hero Portraits/` folder (filename: `HeroName.png`)
   - Optionally add full model to `public/Hero Models BGL/` folder

2. **Add hero name** to `heroes` array in `src/lib/constants.ts` (in correct rarity section)

3. **Add hero data** to `public/data/hero-data.json` with all required fields

4. **Refresh browser** to see the new hero

See `.cursorrules` for detailed documentation on data structure and conventions.

## TypeScript Configuration

The project uses **3 TypeScript config files** (standard Vite setup):

- `tsconfig.json` - Root config that references the other two
- `tsconfig.app.json` - Configuration for app code (`src/` directory)
- `tsconfig.node.json` - Configuration for Node.js config files (`vite.config.ts`)

This allows different TypeScript settings for different parts of the project. This is the correct setup and should not be consolidated.

## Deployment

This is a Vite-built static site that can be deployed to any static hosting service:

- **Netlify**: Already configured (see `netlify.toml`)
- **GitHub Pages**: Push to repository and configure GitHub Pages
- **Vercel**: Automatic detection
- **Any static host**: Upload the `dist/` folder after building

To deploy to Netlify:
```bash
pnpm build
netlify deploy --prod
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## Development Guidelines

See `.cursorrules` for comprehensive development guidelines, including:
- Architecture overview
- Data structure conventions
- Adding heroes and teams
- Gear set naming conventions
- Code style guidelines
- TypeScript best practices

## License

This project is for personal/community use related to the 7 Knights Rebirth game.
