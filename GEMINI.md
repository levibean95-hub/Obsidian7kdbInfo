# GEMINI.md - Project Rules and Documentation

## Local Development

### Local Hosting
**CRITICAL**: Always use Node.js to host the site locally. Never use Python's HTTP server.

**Preferred method:**
```bash
npx --yes serve -s . -l 3000
```

This serves the static site on `http://localhost:3000` using Node.js. The `-s` flag enables single-page application mode, and `-l 3000` sets the port to 3000.

**Alternative Node.js options:**
- `npx --yes http-server -p 3000`
- `npx --yes serve . -l 3000`

**Never use:**
- `python -m http.server` (Python HTTP server)
- Any Python-based hosting solution

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

This application is now FULLY DATA-DRIVEN. Hero data is stored in `data/hero-data.json` and automatically displayed on the website.

### Updating Hero Data Workflow

1. **Edit** `data/hero-data.json` to add or modify hero data
2. **Refresh** browser to see changes

**No code changes needed!** The JSON file contains ALL fields (effects, metadata, gear configs, tips) and the website automatically displays them.

### Hero Data Structure

Each hero in `data/hero-data.json` has these fields:
- **Meta Information**: name, role, primary_content, target_transcendence, wishlist_priority, type, target_number, rarity
- **Effects**: Array of effect strings for filtering
- **Gear PvE**: T0 and T6 gear set configurations (arrays of gear objects)
- **Gear PvP**: T0 and T6 gear set configurations (arrays of gear objects)
- **Skill Enhance Priority**: Recommended skill enhancement order (string)
- **Tips/Important Info**: Additional hero information (string)

Each gear object contains:
- `name`: Gear set name
- `main_stats`: Main stat requirements
- `required_stat_thresholds`: Threshold requirements
- `sub_stat_priority`: Priority stats

All this data is automatically displayed on hero detail pages.

### When Code Changes ARE Needed

Code changes in `js/gear-builder.js` are ONLY needed for:
- Heroes requiring custom formatting or layout (e.g., Amelia, Ace with special notes)
- Heroes with complex gear requirements not fitting the standard format

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
guild-war-teams.html - Guild war teams page
wish-list.html      - Wish list tier list page
speed-gearing.html  - Speed gearing guide page
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
  ├── hero-data.json - Complete hero data (effects, metadata, gear configs, tips)
  └── advent-teams-data.json - Advent team compositions
Hero Portraits/     - Portrait images for grid view cards
Hero Models BGL/    - Full model images for detail view
Gear Sets Photos/   - Gear set images for hero detail pages
DEPLOYMENT.md       - User-facing deployment guide
.claude/            - Feature-specific documentation
```

**Important Files:**
- `data/hero-data.json` - Edit this file directly to update hero information
- `js/` folder - All JavaScript is now modular using ES6 modules
- `data/` folder - Hero and advent team data stored as JSON files

## Navigation Menu Consistency

**CRITICAL**: All HTML pages must have the EXACT SAME navigation menu order. The navigation menu appears in the `<nav class="global-nav">` section of each HTML file.

**Correct Navigation Order (must be consistent across ALL pages):**
1. Wish List
2. Speed Gearing Guide
3. Hero Database
4. Guild War Teams
5. Advent Teams
6. Team Builder

When adding new pages or modifying existing pages, ALWAYS ensure the navigation menu follows this exact order. The mobile menu should also maintain this order.

## Hero Management

### State Management

The application maintains state in `js/state.js` module with exported getter/setter functions:
- `currentView`: Tracks which view is active ('grid' or 'detail')
- `selectedHero`: The currently selected hero name
- `searchQuery`: Current search filter text
- `savedScrollPosition`: Preserves scroll position when navigating between views
- `heroData`: Loaded from `data/hero-data.json`
- `adventTeamsData`: Loaded from `data/advent-teams-data.json`
- `allEffects` and `allTargets`: Extracted from hero data for filters

**Important**: When users navigate from grid → detail → grid, the scroll position is preserved so they return to the same location in the hero list. However, on page refresh, the scroll always resets to top.

### Hero Effects and Filtering System

The application includes a searchable effect filter system that allows users to filter heroes by their effects:

**Data Source:**
- Hero effects are stored in `data/hero-data.json`
- Data is loaded asynchronously via `js/data-loader.js` module
- Edit `data/hero-data.json` directly to update hero data

**Searchable Dropdown:**
- Custom searchable dropdown (not a native `<select>`) for better UX
- Users can type to filter effects in real-time
- Clicking an effect filters the hero grid to show only heroes with that effect
- Clear button (×) appears when an effect is selected
- Dropdown closes on selection or when clicking outside
- Press Escape to close the dropdown

**Implementation:**
- `populateEffectFilter()` - Populates dropdown with all unique effects (js/filters.js)
- `setupEffectFilterListeners()` - Sets up all event handlers for the searchable dropdown (js/filters.js)
- `filterEffectOptions(searchTerm)` - Filters visible options based on search (js/filters.js)
- `selectEffect(value, displayText)` - Handles effect selection and hero filtering (js/filters.js)

**Updating Hero Data:**
Edit `data/hero-data.json` directly to add or update hero effects. The changes will be reflected immediately when you refresh the browser.

### Gear Set Photos and Card-Based Layout

The `Gear Sets Photos/` folder contains images of gear sets that should be displayed within hero detail pages. The application uses a **card-based layout** for displaying gear information:

**Card Layout System:**
- Each gear set gets its own compact card (180-200px wide)
- Cards automatically arrange in a responsive grid (side-by-side on desktop, stacked on mobile)
- Heroes can have different numbers of gear sets, and the layout adapts automatically
- Gear sets are separated into T0 and T6 tier sections

**Card Structure (per gear set):**
Each card contains (in order from top to bottom):
1. Gear set name (title)
2. Square gear photo from `Gear Sets Photos/` folder
3. Main Stats (directly below photo)
4. Required Stat Thresholds (formerly "Important Stats")
5. Sub Stat Priority (when applicable)

**Implementation:**
- Gear set images are located in `Gear Sets Photos/` folder
- Images should be properly URL-encoded when referenced (handle spaces and special characters)
- Multiple gear sets for the same tier are comma-separated (e.g., "Spellweaver Physical, Full Speed")
- The `createGearCard()` function handles individual card creation (js/gear-builder.js)
- The `buildGearSection()` function builds complete T0/T6 sections (js/gear-builder.js)
- The `isT6DifferentFromT0()` function compares T0 and T6 gear data (js/gear-builder.js)
- The `populateHeroSections()` function contains all hero-specific gear configurations (js/gear-builder.js)
- Use proper path handling similar to hero images to ensure web hosting compatibility

**T6 Section Conditional Rendering:**
- T6 sections are only displayed when the gear differs from T0
- To avoid redundancy, if T6 gear is identical to T0 (same gear name, main stats, required stats, and sub stats), the T6 section will be hidden
- When adding hero data, always provide T6 information if available, and the system will automatically determine if it should be displayed
- This applies to both Gear PvE and Gear PvP sections

### Adding New Heroes

When adding a brand new hero to the database:

**Step 1: Add Hero Images**
- Add hero portrait to `Hero Portraits/` folder (filename: `HeroName.png`)
- Optionally add full model to `Hero Models BGL/` folder (filename: `HeroName.png`)

**Step 2: Update Constants**
- Add hero name to the `heroes` array in `js/constants.js`
- Hero names must exactly match the image filenames (without `.png` extension)
- Hero names are case-sensitive (e.g., "Nia" not "nia")
- Names with spaces are supported (e.g., "Bi Dam", "Yu Shin")
- Place in correct rarity section (L++, L+, L, or Rare)

**Step 3: Add Hero Data**
- Add hero entry to `data/hero-data.json` with all required fields:
  - name, role, primary_content, target_transcendence, wishlist_priority, type, target_number, rarity
  - effects (array)
  - gear_pve (object with t0 and t6 arrays)
  - gear_pvp (object with t0 and t6 arrays)
  - skill_enhance_priority (string)
  - tips (string)

**Step 4: Verify**
- Refresh browser and check that hero card appears in grid
- Click hero card and verify all data displays correctly
- No code changes needed in `js/gear-builder.js` or `js/hero-detail.js` (data displays automatically!)

**Optional Step 6: Custom Implementation (if needed)**
- Only add explicit implementation in `populateHeroSections()` in `js/gear-builder.js` if you need custom formatting
- Most heroes work fine with the automatic JSON-driven display

The app will automatically generate cards and detail pages for all heroes in the array.

### Where to Find High-Resolution Hero Portraits

**Source**: GameWith Seven Knights Rebirth Character Database

**Image Quality**: 600x315 pixels (full character art)

**How to Download**:

1. **Find the character page URL**:
   - Main character list: https://gamewith.net/sevenknights-rebirth/70396
   - Individual character pages follow the pattern: `https://gamewith.net/sevenknights-rebirth/[ID]`
   - Example: Ace's page is https://gamewith.net/sevenknights-rebirth/70597

2. **Locate the profile image**:
   - Each character page has a profile section with a high-res character portrait
   - Look for images with the URL pattern: `https://img.gamewith.net/jp/img/[hash].png`
   - These are typically 600x315 pixels showing full character artwork
   - Example: Ace's portrait is `https://img.gamewith.net/jp/img/bf73e36a400e31ca181a838802896e41.png`

3. **Automated download script**:
   - Use `download_highres_portraits.py` to batch download portraits for multiple heroes
   - The script automatically scrapes character page URLs from the tier list
   - Extracts and downloads the `/jp/img/` profile images
   - Saves directly to the `Hero Portraits/` folder

**Note**: There are also smaller 100x100px thumbnail images available at:
- `https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_[ID].png`
- These are lower quality and should NOT be used for the hero database

### Updating Hero Data

**The application is DATA-DRIVEN!** Hero data is automatically displayed from `data/hero-data.json`. Edit the JSON file directly to update hero information.

### Workflow for Updating Existing Heroes

**Step 1: Edit `data/hero-data.json`**

Find the hero entry and update the relevant fields. Example structure:

```json
{
  "HeroName": {
    "name": "Hero Name",
    "role": "Support, DPS, Tank, etc.",
    "primary_content": "Arena, GvG, Total War, etc.",
    "target_transcendence": "T0, T0-T6, etc.",
    "wishlist_priority": "High, Medium, Low, N/A",
    "type": "Attack, Magic, Defense, Support, Universal",
    "target_number": "All Enemies, Single Enemy, etc.",
    "rarity": "L++, L+, L, Rare",
    "effects": [
      "Effect Name 1",
      "Effect Name 2",
      "Effect Name 3"
    ],
    "gear_pve": {
      "t0": [
        {
          "name": "Gatekeeper Physical",
          "main_stats": "Max HP % (weapons), Block Rate (armors)",
          "required_stat_thresholds": "100% Block Rate",
          "sub_stat_priority": "Block Rate, Max HP"
        }
      ],
      "t6": [
        {
          "name": "Vanguard Physical",
          "main_stats": "All Attack %",
          "required_stat_thresholds": "N/A",
          "sub_stat_priority": "Attack"
        }
      ]
    },
    "gear_pvp": {
      "t0": [
        {
          "name": "Full Speed",
          "main_stats": "N/A",
          "required_stat_thresholds": "Speed",
          "sub_stat_priority": "Speed"
        }
      ],
      "t6": []
    },
    "skill_enhance_priority": "S1, S2, or S1 > S2, etc.",
    "tips": "Your tips and important information about the hero go here. Can span multiple lines."
  }
}
```

**Step 2: Verify the Changes**

Refresh your browser and open the hero's detail page to verify:
- Effects list is populated
- Meta information (Role, Primary content, etc.) appears under hero name
- Gear sections display T0 and T6 configurations
- Tips/Important Info section shows your text
- Skill Enhance Priority is displayed

**That's it!** The hero data will automatically display on the website.

### Automatic vs. Explicit Implementations

**For most heroes:**
- Hero data from JSON will automatically display (effects, gear, tips, metadata)
- No code changes needed in `js/gear-builder.js` or `js/hero-detail.js`
- The default implementation pulls data directly from JSON

**For heroes needing custom formatting:**
- Add explicit implementation in `populateHeroSections()` function in `js/gear-builder.js`
- Examples: Amelia, Ace, Aquila have custom gear layouts with specific notes
- Only add explicit implementations when the default JSON-driven display isn't sufficient

### Important Notes

**Effects - CRITICAL:**
- Effects should NOT say `[To be filled with hero-specific effects]` - replace with actual effects
- Effects automatically appear in the hero detail page's "Effect List" section
- Effects automatically populate the effect filter dropdown on the main page

**Gear Set Names - CRITICAL:**
- **ALWAYS use "Full Speed" as the gear set name, NOT just "Speed"**
- Correct: `Name: Full Speed`
- Wrong: `Name: Speed`
- The gear set photo is named "Full Speed.png" in the `Gear Sets Photos/` folder
- Using just "Speed" will cause the image to fail to load
- Always check available gear set photos: `ls "C:\Users\B\Videos\Projects\7k Gearing\Gear Sets Photos"`

**Metadata:**
- No longer needs to be added to `updateHeroMetaInformation()` in `js/hero-detail.js`
- Metadata is automatically pulled from JSON (Role, Primary content, Target transcendence, Wishlist priority)
- Legacy hardcoded metadata in `hero-detail.js` acts as fallback only

### Hero Page Sections

Each hero detail page includes the following sections:

### Meta Information (displayed under hero name):
- **Role**: Hero's role in the game
- **Primary content used in**: Main game modes where the hero is used
- **Target transcendence**: Recommended transcendence level
- **Wish list priority**: Priority level for obtaining the hero

### Main Sections:
1. **Gear PvE** - Displays gear sets in a card-based layout, separated by tier (T0 and T6 when applicable)
   - Each gear set card contains:
     - Gear set photo (square)
     - Main Stats
     - Required Stat Thresholds
     - Sub Stat Priority (optional)
   - **Note**: T6 section is only shown when gear differs from T0 to avoid redundancy

2. **Gear PvP** - Same card-based structure as Gear PvE, separated by tier (T0 and T6 when applicable)
   - Each gear set card contains:
     - Gear set photo (square)
     - Main Stats
     - Required Stat Thresholds
     - Sub Stat Priority (optional)
   - **Note**: T6 section is only shown when gear differs from T0 to avoid redundancy

3. **Skill Enhance Priority** - Recommended order for enhancing skills

4. **Tips/Important Info** - Additional tips and important information about the hero

### Hero Data Files

Hero data is stored in `data/hero-data.json` as a single JSON file. Each hero entry contains all the information needed to display the hero detail page. When updating hero pages:
- Edit the hero entry in `data/hero-data.json`
- The application automatically displays all fields from the JSON
- Handle gear set images from `Gear Sets Photos/` folder when specified in the gear data

### Gear Set Photo Naming Convention

**CRITICAL**: Gear set names in hero data files should use the CORRECT, standard naming. When a matching photo doesn't exist in `C:\Users\B\Videos\Projects\7k Gearing\Gear Sets Photos`, it should be added with the correct filename.

**Before adding or updating gear set information in hero data files:**

1. **Check available gear set photos**: Run `ls "C:\Users\B\Videos\Projects\7k Gearing\Gear Sets Photos"` to see the exact filenames
2. **Use correct standard names**: Always use proper capitalization and spelling:
   - Correct: `Name: Avenger Physical`
   - Wrong: `Name: Avernger physical` (typo and wrong case)
3. **If photo is missing or misnamed**: Note that the photo needs to be added/renamed in the `Gear Sets Photos/` folder
   - Example: If data needs "Avenger Physical" but folder has "Avernger physical.png", the photo file needs to be renamed
4. **No extra text**: Don't add descriptive text like "(Situational)" or "(magic)" unless it's part of the standard gear set name
5. **Verify in browser**: After updating hero data, check the hero's detail page to ensure gear photos display correctly

**Workflow**:
1. Always check `C:\Users\B\Videos\Projects\7k Gearing\Gear Sets Photos` first
2. Use correct standard names in hero data files
3. Note any missing or misnamed photos that need to be added/fixed
4. Photos should be added to match the correct names, not the other way around

## Advent Teams System

### Overview

The Advent Teams page displays team compositions for game mode content. Teams are shown in a compact, side-by-side layout with visual positioning that indicates front and back row placements.

### Team Data Structure

Teams are stored in `data/advent-teams-data.json`. The structure is organized by boss name, with each boss containing an array of teams.

**Basic Structure:**
```json
{
  "Boss Name": {
    "teams": [
      {
        "name": "Team Name",
        "formationType": "basic",
        "heroes": [
          { "name": "Hero1", "position": 1, "row": "back" },
          { "name": "Hero2", "position": 2, "row": "front" }
        ],
        "skills": [
          { "hero": "Hero1", "s1": 1, "s2": null },
          { "hero": "Hero2", "s1": 2, "s2": 3 }
        ]
      }
    ]
  }
}
```

### Formation Types and Positioning

The application uses **alternating visual positioning** to display front and back rows. Heroes are positioned using CSS transforms:
- **Back row**: Heroes move UP (-40px translateY)
- **Front row**: Heroes move DOWN (+40px translateY)

### Formation Patterns:

| Formation Type | Front/Back Split | Alternating Pattern |
|---------------|------------------|---------------------|
| **Basic** | 2 Front, 3 Back | **Front (down):** 2, 4<br>**Back (up):** 1, 3, 5 |
| **Balanced** | 3 Front, 2 Back | **Front (down):** 1, 3, 5<br>**Back (up):** 2, 4 |
| **Attack** | 1 Front, 4 Back | **Front (down):** 3<br>**Back (up):** 1, 2, 4, 5 |
| **Protective** | 4 Front, 1 Back | **Front (down):** 1, 2, 4, 5<br>**Back (up):** 3 |

**Important:** The formation label is hidden on the page. Players identify formations by the visual positioning of units.

### Adding Heroes to Teams

Each hero in the `heroes` array requires:
- `name`: Hero name (must match portrait filename in `Hero Portraits/` folder)
- `position`: Position number (1-5)
- `row`: Either `'front'` or `'back'` (determines visual positioning)

**Example:**
```json
"heroes": [
  { "name": "Lina", "position": 1, "row": "back" },
  { "name": "Daisy", "position": 2, "row": "front" },
  { "name": "Ruri", "position": 3, "row": "back" },
  { "name": "Miho", "position": 4, "row": "front" },
  { "name": "Biscuit", "position": 5, "row": "back" }
]
```

### Setting Skill Priorities

**CRITICAL - Skill Slot Mapping:**
- **S1 = ALWAYS bottom skill** (lower skill slot in-game)
- **S2 = ALWAYS top skill** (upper skill slot in-game)

This mapping is CONSISTENT across all teams and all bosses. S1 is always the bottom skill, S2 is always the top skill.

Each hero in the `skills` array can have two skills (S1 and S2):
- `hero`: Hero name (must match name in `heroes` array)
- `s1`: Bottom skill execution order (number) or `null` if not used
- `s2`: Top skill execution order (number) or `null` if not used

**Skill Order Example:**
```json
"skills": [
  { "hero": "Lina", "s1": 3, "s2": null },      // Priority 3: Lina bottom skill
  { "hero": "Daisy", "s1": 4, "s2": null },     // Priority 4: Daisy bottom skill
  { "hero": "Ruri", "s1": 5, "s2": 6 },         // Priority 5: Ruri bottom, Priority 6: Ruri top
  { "hero": "Miho", "s1": 7, "s2": 2 },         // Priority 2: Miho top, Priority 7: Miho bottom
  { "hero": "Biscuit", "s1": null, "s2": 1 }    // Priority 1: Biscuit top skill
]
```

**Execution Order (by priority number):**
1. Biscuit S2 (top skill)
2. Miho S2 (top skill)
3. Lina S1 (bottom skill)
4. Daisy S1 (bottom skill)
5. Ruri S1 (bottom skill)
6. Ruri S2 (top skill)
7. Miho S1 (bottom skill)

**Visual Result:** Each hero column shows two skill slots below their portrait. The top slot displays S2 values, the bottom slot displays S1 values. Numbers appear in the slots to indicate execution order. Empty slots (null values) display as dashed boxes.

### Formation Templates

### Basic Formation Template (2 Front, 3 Back)
```javascript
{
    name: 'Team Name',
    formationType: 'basic',
    heroes: [
        { name: 'Hero 1', position: 1, row: 'back' },
        { name: 'Hero 2', position: 2, row: 'front' },
        { name: 'Hero 3', position: 3, row: 'back' },
        { name: 'Hero 4', position: 4, row: 'front' },
        { name: 'Hero 5', position: 5, row: 'back' }
    ],
    skills: [
        { hero: 'Hero 1', s1: null, s2: null },
        { hero: 'Hero 2', s1: null, s2: null },
        { hero: 'Hero 3', s1: null, s2: null },
        { hero: 'Hero 4', s1: null, s2: null },
        { hero: 'Hero 5', s1: null, s2: null }
    ]
}
```

### Balanced Formation Template (3 Front, 2 Back)
```javascript
{
    name: 'Team Name',
    formationType: 'balanced',
    heroes: [
        { name: 'Hero 1', position: 1, row: 'front' },
        { name: 'Hero 2', position: 2, row: 'back' },
        { name: 'Hero 3', position: 3, row: 'front' },
        { name: 'Hero 4', position: 4, row: 'back' },
        { name: 'Hero 5', position: 5, row: 'front' }
    ],
    skills: [
        { hero: 'Hero 1', s1: null, s2: null },
        { hero: 'Hero 2', s1: null, s2: null },
        { hero: 'Hero 3', s1: null, s2: null },
        { hero: 'Hero 4', s1: null, s2: null },
        { hero: 'Hero 5', s1: null, s2: null }
    ]
}
```

### Attack Formation Template (1 Front, 4 Back)
```javascript
{
    name: 'Team Name',
    formationType: 'attack',
    heroes: [
        { name: 'Hero 1', position: 1, row: 'back' },
        { name: 'Hero 2', position: 2, row: 'back' },
        { name: 'Hero 3', position: 3, row: 'front' },
        { name: 'Hero 4', position: 4, row: 'back' },
        { name: 'Hero 5', position: 5, row: 'back' }
    ],
    skills: [
        { hero: 'Hero 1', s1: null, s2: null },
        { hero: 'Hero 2', s1: null, s2: null },
        { hero: 'Hero 3', s1: null, s2: null },
        { hero: 'Hero 4', s1: null, s2: null },
        { hero: 'Hero 5', s1: null, s2: null }
    ]
}
```

### Protective Formation Template (4 Front, 1 Back)
```javascript
{
    name: 'Team Name',
    formationType: 'protective',
    heroes: [
        { name: 'Hero 1', position: 1, row: 'front' },
        { name: 'Hero 2', position: 2, row: 'front' },
        { name: 'Hero 3', position: 3, row: 'back' },
        { name: 'Hero 4', position: 4, row: 'front' },
        { name: 'Hero 5', position: 5, row: 'front' }
    ],
    skills: [
        { hero: 'Hero 1', s1: null, s2: null },
        { hero: 'Hero 2', s1: null, s2: null },
        { hero: 'Hero 3', s1: null, s2: null },
        { hero: 'Hero 4', s1: null, s2: null },
        { hero: 'Hero 5', s1: null, s2: null }
    ]
}
```

### Complete Working Example

Here's a complete example showing how to add a new boss with a team in `data/advent-teams-data.json`:

```json
{
  "Teo": {
    "teams": [
      {
        "name": "Speed Team",
        "formationType": "balanced",
        "heroes": [
          { "name": "Kris", "position": 1, "row": "front" },
          { "name": "Knox", "position": 2, "row": "back" },
          { "name": "May", "position": 3, "row": "front" },
          { "name": "Shane", "position": 4, "row": "back" },
          { "name": "Lina", "position": 5, "row": "front" }
        ],
        "skills": [
          { "hero": "Kris", "s1": 2, "s2": null },
          { "hero": "Knox", "s1": 5, "s2": null },
          { "hero": "May", "s1": 1, "s2": 4 },
          { "hero": "Shane", "s1": 3, "s2": 6 },
          { "hero": "Lina", "s1": null, "s2": 7 }
        ]
      }
    ]
  }
}
```

**Skill Execution Order in Example:**
1. May S1 (bottom skill)
2. Kris S1 (bottom skill)
3. Shane S1 (bottom skill)
4. May S2 (top skill)
5. Knox S1 (bottom skill)
6. Shane S2 (top skill)
7. Lina S2 (top skill)

**Remember:** S1 is ALWAYS bottom skill, S2 is ALWAYS top skill

**Visual Layout:**
- **Front (lowered):** Kris, May, Lina
- **Back (raised):** Knox, Shane

### Hero Portrait Requirements

**CRITICAL:** Before adding heroes to teams:
1. Ensure hero portraits exist in `Hero Portraits/` folder
2. Portrait filenames must match hero names exactly (case-sensitive)
3. If portraits are missing, copy them from `Downloaded Hero Portraits/` folder

**Example:**
```bash
cp "Downloaded Hero Portraits/Lina.png" "Hero Portraits/Lina.png"
```

### Adding New Boss/Content Pages

To add a new boss or content type:

1. **Edit `data/advent-teams-data.json`:**
```json
{
  "Existing Boss": { /* ... */ },
  "New Boss Name": {
    "teams": [
      {
        "name": "Team Name",
        "formationType": "basic",
        "heroes": [ /* hero objects */ ],
        "skills": [ /* skill objects */ ]
      }
    ]
  }
}
```

2. **The page will automatically:**
   - Create a new boss section
   - Display teams in a 2-column grid (desktop) or 1-column (mobile/tablet)
   - Show hero portraits, names, and skill priorities
   - Apply proper front/back row visual positioning

### Best Practices

1. **Hero Names:** Always use exact hero names that match portrait filenames
2. **Skill Orders:** Number skills sequentially (1, 2, 3...) in execution order
3. **Null Skills:** Use `null` for skills that aren't used in the rotation
4. **Formation Types:** Choose the formationType that matches your intended front/back split
5. **Testing:** After adding teams, navigate to Advent Teams page to verify:
   - Hero portraits load correctly
   - Skill numbers display in correct slots
   - Front/back positioning appears as expected
   - Layout fits properly in 2-column grid

### Troubleshooting

**Heroes show "No Image" placeholder:**
- Check that portrait exists in `Hero Portraits/` folder
- Verify filename matches hero name exactly (case-sensitive)
- Copy from `Downloaded Hero Portraits/` if needed

**Skill numbers don't show:**
- Verify `hero` name in skills array matches `name` in heroes array exactly
- Check that skill orders are numbers, not strings

**Wrong front/back positioning:**
- Double-check `row` property is either `'front'` or `'back'`
- Refer to Formation Patterns table above for correct alternating pattern

## Reference

### Design System

The application uses a dark theme with CSS custom properties defined in `styles.css` (lines 7-17):
- Color scheme: Dark blue/purple gradient background with indigo/purple accents
- Modern features: Glassmorphism effects, smooth transitions, gradient text
- Responsive grid: Auto-adjusts from desktop (200px cards) to mobile (140px cards)

### Character Page ID Reference

For quick lookup when downloading portraits from GameWith:
- Ace: 70597
- Aquila: 70973
- Kyle: 70972
- Search pattern: `site:gamewith.net "seven knights rebirth" [HeroName] rating skills`

### Available Gear Set Photos

Currently available gear set photos in `C:\Users\B\Videos\Projects\7k Gearing\Gear Sets Photos`:
- Assassin Magic, assassin physical
- avenger magic, Avenger Physical
- Bounty Tracker Physical
- Full Speed
- Gatekeeper Magic, Gatekeeper Physical
- Guardian Magic, Guardian Physical
- Orchestrator Magic
- Paladin Magic
- Spellweaver Magic, Spellweaver Physical
- Vanguard Magic, Vanguard Physical

**Note on capitalization:** Some gear set photos still have inconsistent capitalization (e.g., "assassin physical" vs "Assassin Magic"). These work fine in the application due to case-insensitive file systems on Windows, but should ideally be standardized to proper capitalization for consistency.

### Formation Patterns Quick Reference

| Formation Type | Front/Back Split | Alternating Pattern |
|---------------|------------------|---------------------|
| **Basic** | 2 Front, 3 Back | **Front (down):** 2, 4<br>**Back (up):** 1, 3, 5 |
| **Balanced** | 3 Front, 2 Back | **Front (down):** 1, 3, 5<br>**Back (up):** 2, 4 |
| **Attack** | 1 Front, 4 Back | **Front (down):** 3<br>**Back (up):** 1, 2, 4, 5 |
| **Protective** | 4 Front, 1 Back | **Front (down):** 1, 2, 4, 5<br>**Back (up):** 3 |
