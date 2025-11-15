# Hero Management Documentation

This file contains all documentation related to managing heroes in the 7 Knights database.

## State Management

The application maintains state in `js/state.js` module with exported getter/setter functions:
- `currentView`: Tracks which view is active ('grid' or 'detail')
- `selectedHero`: The currently selected hero name
- `searchQuery`: Current search filter text
- `savedScrollPosition`: Preserves scroll position when navigating between views
- `heroData`: Loaded from `data/hero-data.json`
- `adventTeamsData`: Loaded from `data/advent-teams-data.json`
- `allEffects` and `allTargets`: Extracted from hero data for filters

**Important**: When users navigate from grid → detail → grid, the scroll position is preserved so they return to the same location in the hero list. However, on page refresh, the scroll always resets to top.

## Hero Effects and Filtering System

The application includes a searchable effect filter system that allows users to filter heroes by their effects:

**Data Source:**
- Hero effects are stored in `data/hero-data.json` (generated from `hero_data/*.txt` files)
- Data is loaded asynchronously via `js/data-loader.js` module
- Run `python sync_hero_data.py` after updating hero_data files to regenerate the JSON

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
When effects are added/updated in `hero_data/*.txt` files, run `python sync_hero_data.py` to regenerate `data/hero-data.json`. The sync script automatically parses all fields from the text files and updates the JSON data.

## Gear Set Photos and Card-Based Layout

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

## Adding New Heroes

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

**Step 3: Create Hero Data File**
- Create new text file in `hero_data/` folder (e.g., `hero_data/Nia.txt`)
- Use the template format shown in "Updating Hero Data" section above
- Fill in all sections: META INFORMATION, EFFECTS, GEAR PVE, GEAR PVP, SKILL ENHANCE PRIORITY, TIPS/IMPORTANT INFO

**Step 4: Run Sync Script**
```bash
python sync_hero_data.py
```

**Step 5: Verify**
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

## Updating Hero Data

**The application is now DATA-DRIVEN!** Hero data is automatically displayed from `data/hero-data.json`, which is generated from `hero_data/*.txt` files.

### Workflow for Updating Existing Heroes

**Step 1: Edit the Hero Data File**

Update the hero's text file in `hero_data/HeroName.txt` with all relevant information:

```
=====================================
HERO: Hero Name
=====================================

--- META INFORMATION ---
Role: Support, DPS, Tank, etc.
Primary content used in: Arena, GvG, Total War, etc.
Target transcendence: T0, T0-T6, etc.
Wish list priority: High, Medium, Low, N/A
Rarity: L++, L+, L, Rare
Type: Attack, Magic, Defense, Support, Universal
Target Number: All Enemies, Single Enemy, etc.

--- EFFECTS ---
Effect Name 1
Effect Name 2
Effect Name 3

--- GEAR PVE ---
## T0 Gear Sets

Gear Set 1:
Name: Gatekeeper Physical
Main Stats: Max HP % (weapons), Block Rate (armors)
Required Stat Thresholds: 100% Block Rate
Sub Stat Priority: Block Rate, Max HP

Gear Set 2:
Name: Spellweaver Physical
Main Stats: All Attack %
Required Stat Thresholds: N/A
Sub Stat Priority: Attack

## T6 Gear Sets

Gear Set 1:
Name: Vanguard Physical
Main Stats: All Attack %
Required Stat Thresholds: N/A
Sub Stat Priority: Attack

--- GEAR PVP ---
## T0 Gear Sets

Gear Set 1:
Name: Full Speed
Main Stats: N/A
Required Stat Thresholds: Speed
Sub Stat Priority: Speed

## T6 Gear Sets

Gear Set 1:
Name: Full Speed
Main Stats: N/A
Required Stat Thresholds: Speed
Sub Stat Priority: Speed

--- SKILL ENHANCE PRIORITY ---
S1, S2, or S1 > S2, etc.

--- TIPS/IMPORTANT INFO ---
Your tips and important information about the hero go here.
Can span multiple lines.
```

**Step 2: Run the Sync Script**

After updating the text file, run:
```bash
python sync_hero_data.py
```

This script will:
- Parse ALL fields from `hero_data/*.txt` files
- Extract: Role, Primary content, Target transcendence, Wishlist priority, Type, Target Number, Rarity
- Extract: All effects from the EFFECTS section
- Extract: Gear configurations (PvE and PvP with T0/T6 sections)
- Extract: Skill enhance priority
- Extract: Tips/Important Info
- Generate/update `data/hero-data.json` with complete data

**Step 3: Verify the Changes**

Open the hero's detail page in your browser and verify:
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

## Hero Page Sections

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

Individual hero data is stored in the `hero_data/` folder as separate text files (e.g., `Ace.txt`, `Alice.txt`). Each file contains placeholder sections that should be filled with hero-specific information. When updating hero pages:
- Read the corresponding text file from `hero_data/`
- Parse the sections and populate them into the hero detail view
- Handle gear set images from `Gear Sets Photos/` folder when specified in the data files

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
