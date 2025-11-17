// Advent-teams.js - Advent teams view rendering
// This module handles rendering advent boss teams

import {
    savedAdventScrollPosition, setSavedAdventScrollPosition,
    setPreviousView, adventTeamsData
} from './state.js';
import { getPetIconPath, isPlaceholderTeam } from './utils.js';
import { showHeroDetail } from './hero-detail.js';
import { switchView } from './views.js';
import { heroData } from './state.js';

// Create advent hero column
function createAdventHeroColumn(hero, skillData, bossName = null) {
    const column = document.createElement('div');
    column.className = `advent-hero-column ${hero.row || ''}`;

    // Add click handler to entire column to show hero detail
    column.style.cursor = 'pointer';
    column.setAttribute('role', 'button');
    column.setAttribute('tabindex', '0');
    column.setAttribute('aria-label', `View details for ${hero.name}`);
    const handleSelection = () => {
        // Save advent view scroll position before navigating
        setSavedAdventScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        setPreviousView('advent'); // Save that we came from advent view

        // Update URL with hero name
        const heroHash = encodeURIComponent(hero.name);
        history.pushState({ hero: hero.name }, '', `#${heroHash}`);

        showHeroDetail(hero.name);
        switchView('detail');
    };
    column.addEventListener('click', handleSelection);
    column.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSelection();
        }
    });

    // Add type-based border color to the entire hero column
    const typeColors = {
        'Attack': '#c93939',      // Red
        'Magic': '#3b82f6',       // Blue
        'Defense': '#a67c52',     // Brown/tan
        'Support': '#eab308',     // Yellow/gold
        'Universal': '#9333ea'    // Purple
    };

    // Look up hero type from hero data
    const heroInfo = heroData[hero.name];
    if (heroInfo && heroInfo.type && typeColors[heroInfo.type]) {
        column.style.border = `3px solid ${typeColors[heroInfo.type]}`;
        column.style.borderRadius = '8px';
    }

    // Hero portrait
    const portrait = document.createElement('div');
    portrait.className = 'advent-hero-portrait';
    const heroImagePath = `Downloaded%20Hero%20Portraits/${encodeURIComponent(hero.name)}.png`;
    portrait.innerHTML = `<img src="${heroImagePath}" alt="${hero.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23333%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23666%22 font-size=%2212%22>No Image</text></svg>'">`;

    column.appendChild(portrait);

    // Hero name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'advent-hero-name';
    nameDiv.textContent = hero.name;
    // Add class to hide columns with N/A names
    if (hero.name === 'N/A') {
        column.classList.add('hero-na-placeholder');
    }
    column.appendChild(nameDiv);

    // Skill slots
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'advent-skills-container';

    // For Kyle teams, swap visual display: 
    // Normal: s1Slot (top visual) = s1 (bottom skill), s2Slot (bottom visual) = s2 (top skill)
    // Kyle: Need to swap what each slot displays AND the order they appear
    const swapDisplay = bossName === 'Kyle';
    
    // Create both slots
    const slot1 = document.createElement('div');
    slot1.className = 'advent-skill-slot';
    const slot2 = document.createElement('div');
    slot2.className = 'advent-skill-slot';
    
    // For Kyle teams: swap the visual display
    // Normal: slot1 (top visual) = s1 (bottom skill), slot2 (bottom visual) = s2 (top skill)
    // Kyle: slot1 (top visual) = s2 (top skill), slot2 (bottom visual) = s1 (bottom skill)
    const slot1Value = swapDisplay ? (skillData && skillData.s2) : (skillData && skillData.s1);
    const slot2Value = swapDisplay ? (skillData && skillData.s1) : (skillData && skillData.s2);
    
    // Set slot1 content (top visual slot, shows s1 - bottom skill)
    if (slot1Value) {
        slot1.textContent = slot1Value;
        // If it's a combined format (contains "/"), add special styling
        if (typeof slot1Value === 'string' && slot1Value.includes('/')) {
            slot1.classList.add('combined-skill');
        }
    } else {
        slot1.textContent = 'N/A';
        slot1.classList.add('empty');
    }
    
    // Set slot2 content (bottom visual slot, shows s2 - top skill)
    if (slot2Value) {
        slot2.textContent = slot2Value;
        // If it's a combined format (contains "/"), add special styling
        if (typeof slot2Value === 'string' && slot2Value.includes('/')) {
            slot2.classList.add('combined-skill');
        }
    } else {
        slot2.textContent = 'N/A';
        slot2.classList.add('empty');
    }
    
    // Always append in same order: slot1 first (top), slot2 second (bottom)
    skillsContainer.appendChild(slot1);
    skillsContainer.appendChild(slot2);

    column.appendChild(skillsContainer);

    return column;
}

// Render a team card
function renderTeamCard(team, bossName = null) {
    const card = document.createElement('div');
    card.className = 'advent-team-card';

    // Team name header
    const header = document.createElement('div');
    header.className = 'advent-team-header';

    const title = document.createElement('h3');
    title.textContent = team.name;
    header.appendChild(title);

    card.appendChild(header);

    // Formation label
    const formationLabel = document.createElement('div');
    formationLabel.className = 'advent-formation-label';
    const formationNames = {
        'basic': 'Basic Formation (2 Front, 3 Back)',
        'balanced': 'Balanced Formation (3 Front, 2 Back)',
        'attack': 'Attack Formation (1 Front, 4 Back)',
        'protective': 'Protective Formation (4 Front, 1 Back)'
    };
    formationLabel.textContent = formationNames[team.formationType] || team.formationType;
    card.appendChild(formationLabel);

    // Heroes container
    const heroesContainer = document.createElement('div');
    heroesContainer.className = 'advent-heroes-container';

    // Create skill lookup map
    const skillMap = {};
    if (team.skills) {
        team.skills.forEach(skill => {
            skillMap[skill.hero] = skill;
        });
    }

    // Render each hero (skip placeholder heroes with "---" or "N/A" name)
    team.heroes.forEach(hero => {
        if (hero.name === '---' || hero.name === 'N/A') {
            return; // Skip empty hero boxes
        }
        const heroColumn = createAdventHeroColumn(hero, skillMap[hero.name], bossName);
        heroesContainer.appendChild(heroColumn);
    });

    card.appendChild(heroesContainer);

    // Pet and Notes Section (side by side)
    const bottomSection = document.createElement('div');
    bottomSection.className = 'advent-bottom-section';

    // Pet slot
    const petContainer = document.createElement('div');
    petContainer.className = 'advent-pet-container';

    const petIcon = document.createElement('div');
    petIcon.className = 'advent-pet-icon';

    const petPath = team.pet ? getPetIconPath(team.pet) : null;
    if (petPath) {
        // Show pet icon
        petIcon.innerHTML = `<img src="${petPath}" alt="${team.pet}" onerror="this.style.display='none'">`;
    } else {
        // Show placeholder
        petIcon.classList.add('placeholder');
        petIcon.innerHTML = `<div class="pet-placeholder-box"></div>`;
    }

    petContainer.appendChild(petIcon);

    const petLabel = document.createElement('div');
    petLabel.className = 'advent-pet-label';
    petLabel.textContent = petPath ? team.pet : 'Pet';
    petContainer.appendChild(petLabel);

    bottomSection.appendChild(petContainer);

    // Special Notes section
    const notesContainer = document.createElement('div');
    notesContainer.className = 'advent-notes-container';

    const notesTitle = document.createElement('div');
    notesTitle.className = 'advent-notes-title';
    notesTitle.textContent = 'Special Notes';
    notesContainer.appendChild(notesTitle);

    const notesContent = document.createElement('div');
    notesContent.className = 'advent-notes-content';
    if (team.notes) {
        notesContent.textContent = team.notes;
    } else {
        notesContent.textContent = 'No special notes';
        notesContent.classList.add('empty');
    }
    notesContainer.appendChild(notesContent);

    bottomSection.appendChild(notesContainer);

    card.appendChild(bottomSection);

    return card;
}

// Main function to populate advent teams
export function populateAdventTeams() {
    const container = document.getElementById('advent-bosses-container');
    if (!container) {
        console.error('Advent bosses container not found');
        return;
    }

    container.innerHTML = '';

    // Iterate through each boss
    Object.keys(adventTeamsData).forEach(bossName => {
        const bossData = adventTeamsData[bossName];

        // Boss section
        const bossSection = document.createElement('div');
        bossSection.className = 'advent-boss-section';
        bossSection.dataset.boss = bossName.toLowerCase();

        // Boss header
        const bossHeader = document.createElement('div');
        bossHeader.className = 'advent-boss-header';
        const bossTitle = document.createElement('h2');
        bossTitle.textContent = bossName;
        bossHeader.appendChild(bossTitle);
        bossSection.appendChild(bossHeader);

        // Teams container
        const teamsContainer = document.createElement('div');
        teamsContainer.className = 'advent-teams-container';

        const validTeams = bossData.teams.filter(team => !isPlaceholderTeam(team));
        if (validTeams.length === 0) {
            const placeholderCard = document.createElement('div');
            placeholderCard.className = 'advent-team-card advent-team-card--empty';
            placeholderCard.textContent = 'Team recommendations are coming soon.';
            teamsContainer.appendChild(placeholderCard);
        } else {
            // Render each team with color coding to show pairs
            validTeams.forEach((team, index) => {
                const teamCard = renderTeamCard(team, bossName);

                // Color code team pairs
                if (index < 2) {
                    // Main team combo (Team 1 and Team 2)
                    teamCard.style.border = '3px solid #4a9eff';
                } else if (index < 4) {
                    // First alternative team combo
                    teamCard.style.border = '3px solid #51cf66';
                } else {
                    // Second alternative team combo
                    teamCard.style.border = '3px solid #ff8787';
                }

                teamsContainer.appendChild(teamCard);
            });
        }

        bossSection.appendChild(teamsContainer);
        container.appendChild(bossSection);
    });
}
