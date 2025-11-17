// Guild War Teams Module - Handles rendering of guild war team compositions
import { heroData } from './state.js';
import { getHeroImagePath } from './utils.js';

// Pet image mapping
const PET_IMAGES = {
    'Ruu': 'Pet Icons/Ruu.png',
    'Eirin': 'Pet Icons/Eirin.png',
    'Merparrow': 'Pet Icons/Merparrow.png',
    'Yeonji': 'Pet Icons/Yeonji.png',
    'Richel': 'Pet Icons/Richel.png',
    'Kree': 'Pet Icons/Kree.png',
    'Windy': 'Pet Icons/Windy.png'
};

/**
 * Creates a hero column for guild war teams (simplified version)
 * @param {Object} hero - Hero object with name, position, row
 * @param {Object} skillData - Skill data object with s1 and s2 orders
 * @returns {HTMLElement} Hero column element
 */
function createGuildWarHeroColumn(hero, skillData) {
    const column = document.createElement('div');
    column.className = `advent-hero-column ${hero.row || ''}`;

    // Add click handler to entire column
    column.style.cursor = 'pointer';
    column.setAttribute('role', 'button');
    column.setAttribute('tabindex', '0');
    column.setAttribute('aria-label', `View details for ${hero.name}`);

    const handleSelection = () => {
        // Store referrer for back button navigation
        sessionStorage.setItem('heroDetailReferrer', 'guild-war-teams');
        // Navigate to index.html with hero hash for detail view
        window.location.href = `index.html#${encodeURIComponent(hero.name)}`;
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

    // Get hero type for border color
    let heroInfo = null;
    if (Array.isArray(heroData)) {
        heroInfo = heroData.find(h => h.name === hero.name) || null;
    } else if (heroData && typeof heroData === 'object') {
        heroInfo = heroData[hero.name] || null;
    }

    if (heroInfo && heroInfo.type && typeColors[heroInfo.type]) {
        column.style.border = `3px solid ${typeColors[heroInfo.type]}`;
        column.style.borderRadius = '8px';
    }

    // Create hero portrait
    const portrait = document.createElement('div');
    portrait.className = 'advent-hero-portrait';
    const heroImagePath = `Downloaded%20Hero%20Portraits/${encodeURIComponent(hero.name)}.png`;
    portrait.innerHTML = `<img src="${heroImagePath}" alt="${hero.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23333%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23666%22 font-size=%2212%22>No Image</text></svg>'">`;

    column.appendChild(portrait);

    // Create hero name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'advent-hero-name';
    nameDiv.textContent = hero.name;
    column.appendChild(nameDiv);

    // Create skill slots
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'advent-skills-container';

    // S2 slot (top visual - top skill)
    const slot1 = document.createElement('div');
    slot1.className = 'advent-skill-slot';
    if (skillData.s2) {
        slot1.textContent = skillData.s2;
    } else {
        slot1.textContent = 'N/A';
        slot1.classList.add('empty');
    }

    // S1 slot (bottom visual - bottom skill)
    const slot2 = document.createElement('div');
    slot2.className = 'advent-skill-slot';
    if (skillData.s1) {
        slot2.textContent = skillData.s1;
    } else {
        slot2.textContent = 'N/A';
        slot2.classList.add('empty');
    }

    skillsContainer.appendChild(slot1);
    skillsContainer.appendChild(slot2);
    column.appendChild(skillsContainer);

    return column;
}

/**
 * Creates an empty hero column placeholder
 * @param {number} position - Position number (1-5)
 * @param {string} formationType - Formation type to determine row
 * @returns {HTMLElement} Empty hero column element
 */
function createEmptyHeroColumn(position, formationType) {
    const column = document.createElement('div');

    // Determine row based on position and formation type
    // Based on .claude/teams.md documentation:
    // Attack formation: Front (down): 3, Back (up): 1, 2, 4, 5
    // Protective formation: Front (down): 1, 2, 4, 5, Back (up): 3
    let row = '';
    if (formationType === 'attack') {
        // Attack: position 3 is front, all others are back
        row = position === 3 ? 'front' : 'back';
    } else if (formationType === 'protective') {
        // Protective: positions 1, 2, 4, 5 are front, position 3 is back
        row = (position === 1 || position === 2 || position === 4 || position === 5) ? 'front' : 'back';
    } else if (formationType === 'basic') {
        // Basic: positions 1-2 front, 3-5 back
        row = position <= 2 ? 'front' : 'back';
    } else if (formationType === 'balanced') {
        // Balanced: positions 1-3 front, 4-5 back
        row = position <= 3 ? 'front' : 'back';
    }

    column.className = `advent-hero-column ${row}`;
    column.style.opacity = '0.5';
    column.style.border = '3px solid #444';
    column.style.borderRadius = '8px';
    column.style.backgroundColor = 'rgba(68, 68, 68, 0.3)';

    // Empty portrait
    const portrait = document.createElement('div');
    portrait.className = 'advent-hero-portrait';
    portrait.style.backgroundColor = '#333';
    portrait.style.display = 'flex';
    portrait.style.alignItems = 'center';
    portrait.style.justifyContent = 'center';
    portrait.style.color = '#666';
    portrait.style.fontSize = '0.9rem';
    portrait.textContent = 'N/A';
    column.appendChild(portrait);

    // N/A name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'advent-hero-name';
    nameDiv.textContent = 'N/A';
    nameDiv.style.color = '#666';
    column.appendChild(nameDiv);

    // Empty skill slots
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'advent-skills-container';

    const slot1 = document.createElement('div');
    slot1.className = 'advent-skill-slot empty';
    slot1.textContent = 'N/A';
    skillsContainer.appendChild(slot1);

    const slot2 = document.createElement('div');
    slot2.className = 'advent-skill-slot empty';
    slot2.textContent = 'N/A';
    skillsContainer.appendChild(slot2);

    column.appendChild(skillsContainer);

    return column;
}

/**
 * Extracts the team number from a team name
 * @param {string} teamName - Team name (e.g., "Team 1", "Team 1 alt", "Team 4 ALT 2")
 * @returns {number} The team number
 */
function extractTeamNumber(teamName) {
    const match = teamName.match(/Team\s+(\d+)/i);
    return match ? parseInt(match[1]) : 0;
}

/**
 * Gets a color for a team number
 * @param {number} teamNumber - The team number
 * @returns {string} Hex color code
 */
function getTeamColor(teamNumber) {
    const teamColors = [
        '#e74c3c', // Team 1 - Red
        '#3498db', // Team 2 - Blue
        '#2ecc71', // Team 3 - Green
        '#f39c12', // Team 4 - Orange
        '#9b59b6', // Team 5 - Purple
        '#1abc9c', // Team 6 - Teal
        '#e67e22', // Team 7 - Dark Orange
        '#34495e'  // Team 8 - Dark Gray
    ];
    return teamColors[(teamNumber - 1) % teamColors.length] || '#9333ea';
}

/**
 * Renders a single guild war team card
 * @param {Object} team - Team object with heroes, skills, pet, etc.
 * @returns {HTMLElement} Team card element
 */
function renderGuildWarTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'advent-team-card';

    // Get team number and color
    const teamNumber = extractTeamNumber(team.name);
    const borderColor = getTeamColor(teamNumber);

    // Apply colored border to card and set CSS variable for pseudo-element
    card.style.border = `3px solid ${borderColor}`;
    card.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px ${borderColor}40`;
    card.style.setProperty('--team-color', borderColor);

    // Team name header
    const header = document.createElement('div');
    header.className = 'advent-team-header';
    header.style.borderBottom = `2px solid ${borderColor}`;

    const title = document.createElement('h3');
    title.textContent = team.name;
    title.style.color = borderColor;
    title.style.textShadow = `0 0 10px ${borderColor}80`;
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

    // Check if team is empty
    if (team.heroes.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-team-message';
        emptyMessage.textContent = 'Empty Placeholder Team';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px';
        emptyMessage.style.color = '#888';
        emptyMessage.style.fontSize = '1.1rem';
        heroesContainer.appendChild(emptyMessage);
    } else {
        // Render only the first 3 heroes (skip empty/N/A placeholders)
        const validHeroes = team.heroes.filter(hero => hero.name && hero.name !== '---' && hero.name !== 'N/A');
        const heroesToShow = validHeroes.slice(0, 3); // Limit to 3 heroes
        
        heroesToShow.forEach(hero => {
            const skillData = team.skills.find(s => s.hero === hero.name) || { s1: null, s2: null };
            const heroColumn = createGuildWarHeroColumn(hero, skillData);
            heroesContainer.appendChild(heroColumn);
        });
    }

    card.appendChild(heroesContainer);

    // Pet Section (centered)
    const bottomSection = document.createElement('div');
    bottomSection.className = 'advent-bottom-section';
    bottomSection.style.justifyContent = 'center';

    // Pet container
    const petContainer = document.createElement('div');
    petContainer.className = 'advent-pet-container';
    petContainer.style.border = `2px solid ${borderColor}`;

    const petIcon = document.createElement('div');
    petIcon.className = 'advent-pet-icon';

    const petPath = team.pet && PET_IMAGES[team.pet] ? PET_IMAGES[team.pet] : null;
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

    card.appendChild(bottomSection);

    return card;
}

/**
 * Main function to populate guild war teams
 */
export async function populateGuildWarTeams() {
    const container = document.getElementById('guild-war-teams-container');
    if (!container) {
        console.error('Guild war teams container not found');
        return;
    }

    try {
        // Load guild war teams data
        const response = await fetch('data/guild-war-teams-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load guild war teams data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Loaded guild war data:', data);

        // Clear container
        container.innerHTML = '';

        // Get Guild War teams
        const guildWarData = data['Guild War'];
        if (!guildWarData || !guildWarData.teams) {
            console.error('No guild war teams data found');
            return;
        }
        console.log('Found teams:', guildWarData.teams.length);

        // Create Guild War section
        const guildWarSection = document.createElement('div');
        guildWarSection.className = 'advent-boss-section';

        // Section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'advent-boss-header';

        const title = document.createElement('h2');
        title.textContent = 'Guild War Teams';
        sectionHeader.appendChild(title);

        guildWarSection.appendChild(sectionHeader);

        // Create ONE teams container for all teams (grid will handle 2 per row)
        const teamsContainer = document.createElement('div');
        teamsContainer.className = 'advent-teams-container';

        // Render all teams with color coding based on team number
        guildWarData.teams.forEach((team) => {
            const teamCard = renderGuildWarTeamCard(team);
            teamsContainer.appendChild(teamCard);
        });

        guildWarSection.appendChild(teamsContainer);
        container.appendChild(guildWarSection);

    } catch (error) {
        console.error('Error loading guild war teams:', error);
        container.innerHTML = '<p style="color: red; text-align: center;">Failed to load guild war teams data.</p>';
    }
}
