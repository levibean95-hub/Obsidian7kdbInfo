# Advent Teams System Documentation

This file contains all documentation for the Advent Teams feature.

## Overview

The Advent Teams page displays team compositions for game mode content. Teams are shown in a compact, side-by-side layout with visual positioning that indicates front and back row placements.

## Team Data Structure

Teams are stored in the `ADVENT_TEAMS_DATA` object in `script.js` (around line 1043). The structure is organized by boss name, with each boss containing an array of teams.

**Basic Structure:**
```javascript
const ADVENT_TEAMS_DATA = {
    'Boss Name': {
        teams: [
            {
                name: 'Team Name',
                formationType: 'basic', // or 'balanced', 'attack', 'protective'
                heroes: [ /* hero objects */ ],
                skills: [ /* skill objects */ ]
            }
        ]
    }
};
```

## Formation Types and Positioning

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

## Adding Heroes to Teams

Each hero in the `heroes` array requires:
- `name`: Hero name (must match portrait filename in `Hero Portraits/` folder)
- `position`: Position number (1-5)
- `row`: Either `'front'` or `'back'` (determines visual positioning)

**Example:**
```javascript
heroes: [
    { name: 'Lina', position: 1, row: 'back' },
    { name: 'Daisy', position: 2, row: 'front' },
    { name: 'Ruri', position: 3, row: 'back' },
    { name: 'Miho', position: 4, row: 'front' },
    { name: 'Biscuit', position: 5, row: 'back' }
]
```

## Setting Skill Priorities

**CRITICAL - Skill Slot Mapping:**
- **S1 = Bottom skill** (lower skill slot in-game)
- **S2 = Top skill** (upper skill slot in-game)

Each hero in the `skills` array can have two skills (S1 and S2):
- `hero`: Hero name (must match name in `heroes` array)
- `s1`: Bottom skill execution order (number) or `null` if not used
- `s2`: Top skill execution order (number) or `null` if not used

**Skill Order Example:**
```javascript
skills: [
    { hero: 'Lina', s1: 3, s2: null },      // S1 executes 3rd
    { hero: 'Daisy', s1: 4, s2: null },     // S1 executes 4th
    { hero: 'Ruri', s1: 5, s2: 6 },         // S1 executes 5th, S2 executes 6th
    { hero: 'Miho', s1: 7, s2: 2 },         // S1 executes 7th, S2 executes 2nd
    { hero: 'Biscuit', s1: null, s2: 1 }    // S2 executes 1st
]
```

**Visual Result:** Each hero column shows two skill slots below their portrait. Numbers appear in the slots to indicate execution order. Empty slots (null values) display as dashed boxes.

## Formation Templates

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

## Complete Working Example

Here's a complete example showing how to add a new boss with a team:

```javascript
const ADVENT_TEAMS_DATA = {
    'Teo': {
        teams: [
            {
                name: 'Speed Team',
                formationType: 'balanced',
                heroes: [
                    { name: 'Kris', position: 1, row: 'front' },
                    { name: 'Knox', position: 2, row: 'back' },
                    { name: 'May', position: 3, row: 'front' },
                    { name: 'Shane', position: 4, row: 'back' },
                    { name: 'Lina', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Kris', s1: 2, s2: null },
                    { hero: 'Knox', s1: 5, s2: null },
                    { hero: 'May', s1: 1, s2: 4 },
                    { hero: 'Shane', s1: 3, s2: 6 },
                    { hero: 'Lina', s1: null, s2: 7 }
                ]
            }
        ]
    }
};
```

**Skill Execution Order in Example:**
1. May S1
2. Kris S1
3. Shane S1
4. May S2
5. Knox S1
6. Shane S2
7. Lina S2

**Visual Layout:**
- **Front (lowered):** Kris, May, Lina
- **Back (raised):** Knox, Shane

## Hero Portrait Requirements

**CRITICAL:** Before adding heroes to teams:
1. Ensure hero portraits exist in `Hero Portraits/` folder
2. Portrait filenames must match hero names exactly (case-sensitive)
3. If portraits are missing, copy them from `Downloaded Hero Portraits/` folder

**Example:**
```bash
cp "Downloaded Hero Portraits/Lina.png" "Hero Portraits/Lina.png"
```

## Adding New Boss/Content Pages

To add a new boss or content type:

1. **Add to ADVENT_TEAMS_DATA:**
```javascript
const ADVENT_TEAMS_DATA = {
    'Existing Boss': { /* ... */ },
    'New Boss Name': {
        teams: [
            // Add team(s) here using templates above
        ]
    }
};
```

2. **The page will automatically:**
   - Create a new boss section
   - Display teams in a 2-column grid (desktop) or 1-column (mobile/tablet)
   - Show hero portraits, names, and skill priorities
   - Apply proper front/back row visual positioning

## Best Practices

1. **Hero Names:** Always use exact hero names that match portrait filenames
2. **Skill Orders:** Number skills sequentially (1, 2, 3...) in execution order
3. **Null Skills:** Use `null` for skills that aren't used in the rotation
4. **Formation Types:** Choose the formationType that matches your intended front/back split
5. **Testing:** After adding teams, navigate to Advent Teams page to verify:
   - Hero portraits load correctly
   - Skill numbers display in correct slots
   - Front/back positioning appears as expected
   - Layout fits properly in 2-column grid

## Troubleshooting

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
