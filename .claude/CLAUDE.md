# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application that serves as a hero database for "7 Knights" game. It displays hero portraits in a grid view and shows detailed hero information when clicked. The application is designed to be deployed to static hosting platforms (Netlify, GitHub Pages, Vercel, etc.).

## Core Architecture

### Two-View System

The application uses a view-switching architecture with two main views:

1. **Grid View** (`#hero-grid-view`): Displays all heroes as cards with portrait images from `Hero Portraits/` folder
2. **Detail View** (`#hero-detail-view`): Shows individual hero details with full model images from `Hero Models BGL/` folder

Views are toggled by adding/removing the `active` class. Only one view is visible at a time.

### Image Path Handling

The application uses multiple image folders:
- `Hero Portraits/`: Used for grid view cards (portrait style)
- `Hero Models BGL/`: Used for detail view (full character models)
- `Gear Sets Photos/`: Contains gear set images to be displayed in hero detail pages

**Critical**: The `getHeroImagePath(heroName, useModel)` function (js/utils.js) handles:
- URL encoding for folders with spaces and special characters
- Switching between portrait and model paths based on the `useModel` boolean
- Configuration via `HERO_PORTRAITS_PATH` and `HERO_MODELS_PATH` constants from js/constants.js

This encoding is essential for web hosting compatibility.

## Data-Driven Architecture

**CRITICAL**: This application is now FULLY DATA-DRIVEN. Hero data is stored in `hero_data/*.txt` files and automatically displayed on the website.

### Updating Hero Data Workflow

1. **Edit** the hero's text file in `hero_data/HeroName.txt`
2. **Run** `python sync_hero_data.py` to regenerate `data/hero-data.json`
3. **Refresh** browser to see changes

**No code changes needed!** The sync script parses ALL fields (effects, metadata, gear configs, tips) and the website automatically displays them.

### What the Sync Script Does

`sync_hero_data.py` parses these fields from each `hero_data/*.txt` file:
- **Meta Information**: Role, Primary content, Target transcendence, Wishlist priority, Type, Target Number, Rarity
- **Effects**: All effects listed in the EFFECTS section
- **Gear PvE**: T0 and T6 gear set configurations
- **Gear PvP**: T0 and T6 gear set configurations
- **Skill Enhance Priority**: Recommended skill enhancement order
- **Tips/Important Info**: Additional hero information

All this data is stored in `data/hero-data.json` and automatically displayed on hero detail pages.

### When Code Changes ARE Needed

Code changes in `js/gear-builder.js` are ONLY needed for:
- Heroes requiring custom formatting or layout (e.g., Amelia, Ace with special notes)
- Heroes with complex gear requirements not fitting the standard format

For 90% of heroes, just update the text file and run the sync script!

## Modular Architecture

The application uses ES6 modules for better code organization and maintainability:

- **main.js** - Entry point that initializes the app and loads data
- **constants.js** - Static configuration (hero list, paths, regex patterns)
- **state.js** - Centralized state management with getter/setter functions
- **utils.js** - Reusable utility functions (image paths, validation)
- **data-loader.js** - Asynchronous data loading from JSON files
- **filters.js** - All filtering logic (search, effects, types, targets)
- **hero-grid.js** - Grid view rendering and hero card creation
- **hero-detail.js** - Hero detail view and metadata display
- **gear-builder.js** - Gear sections with all hero-specific configurations
- **advent-teams.js** - Advent boss teams rendering
- **views.js** - View switching and event listeners

Data is loaded asynchronously from JSON files in the `data/` folder, eliminating the token limit issues from the previous embedded approach.

## File Structure

```
index.html          - Main HTML structure with both grid and detail views
styles.css          - Modern dark theme with animations and responsive design
js/                 - Modular JavaScript files (ES6 modules)
  ├── main.js       - Application entry point and initialization
  ├── constants.js  - Hero list and configuration constants
  ├── state.js      - Global state management
  ├── utils.js      - Utility helper functions
  ├── data-loader.js - Load data from JSON files
  ├── filters.js    - Search and filter functionality
  ├── hero-grid.js  - Grid view rendering
  ├── hero-detail.js - Hero detail view and metadata
  ├── gear-builder.js - Gear sections and hero-specific data
  ├── advent-teams.js - Advent teams view
  └── views.js      - View switching and navigation
data/               - JSON data files
  ├── hero-data.json - Complete hero data (effects, metadata, gear configs, tips) - auto-generated from hero_data/*.txt
  └── advent-teams-data.json - Advent team compositions
Hero Portraits/     - Portrait images for grid view cards
Hero Models BGL/    - Full model images for detail view
Gear Sets Photos/   - Gear set images for hero detail pages
hero_data/          - Individual text files containing hero information to be populated
sync_hero_data.py   - Script to sync hero_data/*.txt files to data/hero-data.json
DEPLOYMENT.md       - User-facing deployment guide (NOT for Claude's reference)
.claude/            - Feature-specific documentation (see below)
```

**Important Files:**
- `sync_hero_data.py` - Run this after updating hero_data files: `python sync_hero_data.py`
- `js/` folder - All JavaScript is now modular using ES6 modules
- `data/` folder - Hero and advent team data stored as JSON files

## When to Read Feature-Specific Documentation

This project uses **modular documentation**. ALWAYS read the appropriate specialized file when working on these features:

### Read `.claude/heroes.md` when:
- Adding new heroes to the database
- Updating hero data, effects, or gear information
- Working with hero portraits or models
- Implementing or fixing the effects filtering system
- Updating gear set displays or card layouts
- Modifying hero detail pages
- Working with `hero_data/*.txt` files
- Questions about gear set photos or naming conventions

### Read `.claude/teams.md` when:
- Adding or modifying Advent Teams
- Working with team formations
- Setting up boss/content team compositions
- Configuring skill priorities for teams
- Troubleshooting team display issues
- Questions about formation types (basic, balanced, attack, protective)

### Read `.claude/reference.md` when:
- Looking up design system information (colors, CSS properties)
- Finding character page IDs for portrait downloads
- Checking available gear set photos
- Quick reference for formation patterns

### Read `.claude/deployment.md` when:
- Deploying to Netlify or other hosting platforms
- Questions about web hosting configuration
- Running deployment commands

**IMPORTANT**:
- For hero-related work: ALWAYS read `.claude/heroes.md`
- For team-related work: ALWAYS read `.claude/teams.md`
- For deployment: ALWAYS read `.claude/deployment.md`
- For quick lookups: Check `.claude/reference.md`

These specialized files contain detailed instructions, examples, and critical information that is not in this core file.

**Do not put python scripts in the working directory**