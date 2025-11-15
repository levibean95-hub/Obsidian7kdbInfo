// Team-builder.js - Team Builder functionality
// This module handles the Team Builder view with drag-and-drop, import/export

import { heroes } from './constants.js';
import { heroData } from './state.js';
import { getHeroImagePath, getTypeIconPath } from './utils.js';

// Team data structure: Array of teams, each team has name and slots (array of 5 hero names or null)
let teams = [{ name: 'Team 1', slots: [null, null, null, null, null] }];
let searchQuery = '';
let draggedHero = null;

// Initialize Team Builder
export function initializeTeamBuilder() {
    renderHeroPool();
    renderTeams();
    setupEventListeners();
    updateImportString();
}

// Render hero pool (left sidebar)
function renderHeroPool() {
    const poolGrid = document.getElementById('hero-pool-grid');
    poolGrid.innerHTML = '';

    const filteredHeroes = heroes.filter(hero => {
        return hero.toLowerCase().includes(searchQuery.toLowerCase());
    });

    filteredHeroes.forEach(heroName => {
        const card = createDraggableHeroCard(heroName);
        poolGrid.appendChild(card);
    });
}

// Create draggable hero card for hero pool
function createDraggableHeroCard(heroName) {
    const card = document.createElement('div');
    card.className = 'hero-pool-card';
    card.draggable = true;
    card.dataset.heroName = heroName;

    const heroInfo = heroData[heroName];
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-pool-image-container';

    const img = document.createElement('img');
    img.className = 'hero-pool-image';
    img.src = getHeroImagePath(heroName);
    img.alt = heroName;
    img.loading = 'lazy';

    // Add type icon badge
    if (heroInfo && heroInfo.type) {
        const typeIconBadge = document.createElement('div');
        typeIconBadge.className = 'type-icon-badge-small';
        const typeIcon = document.createElement('img');
        typeIcon.src = getTypeIconPath(heroInfo.type);
        typeIcon.alt = heroInfo.type;
        typeIconBadge.appendChild(typeIcon);
        imageContainer.appendChild(typeIconBadge);
    }

    // Add rarity badge
    if (heroInfo && heroInfo.rarity) {
        const rarityBadge = document.createElement('div');
        rarityBadge.className = `rarity-badge-small rarity-${heroInfo.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        rarityBadge.textContent = heroInfo.rarity;
        imageContainer.appendChild(rarityBadge);
    }

    const name = document.createElement('div');
    name.className = 'hero-pool-name';
    name.textContent = heroName;

    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);

    // Drag event listeners
    card.addEventListener('dragstart', (e) => {
        draggedHero = heroName;
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', heroName);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedHero = null;
    });

    return card;
}

// Render all teams
function renderTeams() {
    const teamsContainer = document.getElementById('teams-container');
    teamsContainer.innerHTML = '';

    teams.forEach((team, teamIndex) => {
        const teamElement = createTeamElement(team, teamIndex);
        teamsContainer.appendChild(teamElement);
    });
}

// Create team element
function createTeamElement(team, teamIndex) {
    const teamWrapper = document.createElement('div');
    teamWrapper.className = 'team-wrapper';

    // Team header with name input and remove button
    const teamHeader = document.createElement('div');
    teamHeader.className = 'team-header';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'team-name-input';
    nameInput.value = team.name || `Team ${teamIndex + 1}`;
    nameInput.placeholder = `Team ${teamIndex + 1}`;
    nameInput.addEventListener('input', (e) => {
        teams[teamIndex].name = e.target.value.trim() || `Team ${teamIndex + 1}`;
        updateImportString();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove-team';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove Team';
    removeBtn.addEventListener('click', () => {
        if (teams.length > 1) {
            teams.splice(teamIndex, 1);
            renderTeams();
            updateImportString();
        } else {
            alert('You must have at least one team.');
        }
    });

    teamHeader.appendChild(nameInput);
    teamHeader.appendChild(removeBtn);

    // Team slots (5 positions)
    const teamSlots = document.createElement('div');
    teamSlots.className = 'team-slots';

    for (let i = 0; i < 5; i++) {
        const slot = createTeamSlot(teamIndex, i, team.slots[i]);
        teamSlots.appendChild(slot);
    }

    teamWrapper.appendChild(teamHeader);
    teamWrapper.appendChild(teamSlots);

    return teamWrapper;
}

// Create a team slot
function createTeamSlot(teamIndex, slotIndex, heroName) {
    const slot = document.createElement('div');
    slot.className = 'team-slot';
    slot.dataset.teamIndex = teamIndex;
    slot.dataset.slotIndex = slotIndex;

    if (heroName) {
        const heroCard = createTeamSlotHeroCard(heroName, teamIndex, slotIndex);
        slot.appendChild(heroCard);
    } else {
        slot.classList.add('empty-slot');
        slot.textContent = 'Drop Hero Here';
    }

    // Drop event listeners
    slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
        slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');

        if (draggedHero) {
            // If dragging from another slot, clear the source slot first
            if (draggedHero.startsWith('slot:')) {
                const [sourceTeamIndex, sourceSlotIndex] = draggedHero.replace('slot:', '').split(',').map(Number);
                if (sourceTeamIndex !== teamIndex || sourceSlotIndex !== slotIndex) {
                    // Get the actual hero name from the source slot before clearing
                    const heroName = teams[sourceTeamIndex]?.slots[sourceSlotIndex];
                    teams[sourceTeamIndex].slots[sourceSlotIndex] = null;
                    teams[teamIndex].slots[slotIndex] = heroName;
                }
            } else {
                // Dragging from hero pool
                teams[teamIndex].slots[slotIndex] = draggedHero;
            }
            renderTeams();
            updateImportString();
        }
    });

    return slot;
}

// Create hero card for team slot
function createTeamSlotHeroCard(heroName, teamIndex, slotIndex) {
    const card = document.createElement('div');
    card.className = 'team-slot-hero';
    card.draggable = true;
    card.dataset.heroName = heroName;

    const heroInfo = heroData[heroName];
    const imageContainer = document.createElement('div');
    imageContainer.className = 'team-slot-image-container';

    const img = document.createElement('img');
    img.className = 'team-slot-image';
    img.src = getHeroImagePath(heroName);
    img.alt = heroName;

    // Add type icon badge
    if (heroInfo && heroInfo.type) {
        const typeIconBadge = document.createElement('div');
        typeIconBadge.className = 'type-icon-badge-small';
        const typeIcon = document.createElement('img');
        typeIcon.src = getTypeIconPath(heroInfo.type);
        typeIcon.alt = heroInfo.type;
        typeIconBadge.appendChild(typeIcon);
        imageContainer.appendChild(typeIconBadge);
    }

    // Add rarity badge
    if (heroInfo && heroInfo.rarity) {
        const rarityBadge = document.createElement('div');
        rarityBadge.className = `rarity-badge-small rarity-${heroInfo.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        rarityBadge.textContent = heroInfo.rarity;
        imageContainer.appendChild(rarityBadge);
    }

    const name = document.createElement('div');
    name.className = 'team-slot-hero-name';
    name.textContent = heroName;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-hero-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove Hero';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        teams[teamIndex].slots[slotIndex] = null;
        renderTeams();
        updateImportString();
    });

    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(removeBtn);

    // Drag event listeners
    card.addEventListener('dragstart', (e) => {
        draggedHero = `slot:${teamIndex},${slotIndex}`;
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', heroName);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedHero = null;
    });

    return card;
}

// Generate import string from current teams
function generateImportString() {
    const data = {
        teams: teams.map(team => ({
            name: team.name || `Team ${teams.indexOf(team) + 1}`,
            slots: team.slots
        }))
    };
    return btoa(JSON.stringify(data));
}

// Parse import string and load teams
function parseImportString(importString) {
    try {
        const decoded = atob(importString);
        const data = JSON.parse(decoded);
        
        if (data.teams && Array.isArray(data.teams)) {
            teams = data.teams.map((team, index) => ({
                name: (team.name && team.name.trim()) || `Team ${index + 1}`,
                slots: team.slots || [null, null, null, null, null]
            }));
            
            // Ensure slots are exactly 5
            teams.forEach(team => {
                while (team.slots.length < 5) {
                    team.slots.push(null);
                }
                team.slots = team.slots.slice(0, 5);
            });
            
            renderTeams();
            updateImportString();
            return true;
        }
        return false;
    } catch (e) {
        console.error('Failed to parse import string:', e);
        return false;
    }
}

// Update import string display
function updateImportString() {
    const importString = generateImportString();
    const output = document.getElementById('import-string-output');
    if (output) {
        output.value = importString;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('team-builder-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderHeroPool();
        });
    }

    // Generate import string button (updates display)
    const generateBtn = document.getElementById('generate-import-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            updateImportString();
        });
    }
    
    // Auto-update import string on any change (already handled in other functions)

    // Copy import string button
    const copyBtn = document.getElementById('copy-import-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const output = document.getElementById('import-string-output');
            if (output) {
                output.select();
                document.execCommand('copy');
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            }
        });
    }

    // Import button
    const importBtn = document.getElementById('import-btn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const input = document.getElementById('import-string-input');
            if (input && input.value.trim()) {
                const success = parseImportString(input.value.trim());
                if (success) {
                    alert('Teams imported successfully!');
                    input.value = '';
                } else {
                    alert('Failed to import teams. Please check your import string.');
                }
            }
        });
    }

    // Add team button
    const addTeamBtn = document.getElementById('add-team-btn');
    if (addTeamBtn) {
        addTeamBtn.addEventListener('click', () => {
            const defaultName = `Team ${teams.length + 1}`;
            teams.push({ name: defaultName, slots: [null, null, null, null, null] });
            renderTeams();
            updateImportString();
        });
    }

    // Auto-update import string when teams change
    // This is handled in renderTeams and other functions
}

