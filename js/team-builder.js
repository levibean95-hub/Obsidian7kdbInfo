// Team-builder.js - Team Builder functionality
// This module handles the Team Builder view with drag-and-drop, import/export

import { heroes } from './constants.js';
import { heroData, allEffects } from './state.js';
import { getHeroImagePath, getTypeIconPath, getPetIconPath } from './utils.js';

// Team data structure: Array of teams, each team has name, slots (array of 5 hero names or null), tiers (array of 5 tier numbers 0-6), gearSets (array of 5 gear set names or null), skillOrders (array of 5 skill order arrays or null), pet (pet name or null), and formationType
// skillOrders: Each hero slot has an array of skill selections like [{skill: 's1', order: 1}, {skill: 's2', order: 2}]
let teams = [{ name: 'Team 1', slots: [null, null, null, null, null], tiers: [0, 0, 0, 0, 0], gearSets: [null, null, null, null, null], skillOrders: [[], [], [], [], []], pet: null, formationType: 'basic' }];

// Available pets (from Pet Icons folder)
const PETS = [
    'Croa',
    'Dello',
    'Doo',
    'Eirin',
    'Eri',
    'Hellepin',
    'Karam',
    'Kree',
    'Little Feng',
    'Merparrow',
    'Mewmew',
    'Mick',
    'Mimic',
    'Mole',
    'Nikki',
    'Nina',
    'Note',
    'Paragon',
    'Pike',
    'Richel',
    'Ruu',
    'Sherry',
    'Windy',
    'Yeonji',
    'Yu'
];

// Available gear sets
const GEAR_SETS = [
    'None',
    'Assassin',
    'Avenger',
    'Bounty Tracker',
    'Full Speed',
    'Gatekeeper',
    'Guardian',
    'Orchestrator',
    'Paladin',
    'Spellweaver',
    'Vanguard'
];
let searchQuery = '';
let selectedType = '';
let selectedEffect = '';
let subject = '';
let draggedHero = null;
let showPets = false; // Toggle between heroes and pets

// Initialize Team Builder
export function initializeTeamBuilder() {
    // Check URL for import string on load
    checkUrlForImport();
    
    // Setup filters
    populateEffectFilter();
    setupFilterListeners();
    
    // Setup subject field
    setupSubjectField();
    
    // Setup mode toggle (heroes/pets)
    setupModeToggle();
    
    // Render UI
    renderHeroPool();
    renderTeams();
    setupEventListeners();
    updateUrl();
}

// Setup mode toggle between heroes and pets
function setupModeToggle() {
    const heroBtn = document.getElementById('toggle-hero-mode');
    const petBtn = document.getElementById('toggle-pet-mode');
    
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            showPets = false;
            heroBtn.classList.add('active');
            petBtn?.classList.remove('active');
            renderHeroPool();
        });
    }
    
    if (petBtn) {
        petBtn.addEventListener('click', () => {
            showPets = true;
            petBtn.classList.add('active');
            heroBtn?.classList.remove('active');
            renderHeroPool();
        });
    }
}

// Check URL for import string on page load
function checkUrlForImport() {
    const urlParams = new URLSearchParams(window.location.search);
    const importString = urlParams.get('teams');
    
    if (importString) {
        const success = parseImportString(importString);
        if (success) {
            // Update subject field if present
            const subjectParam = urlParams.get('subject');
            if (subjectParam) {
                subject = decodeURIComponent(subjectParam);
                const subjectInput = document.getElementById('team-builder-subject');
                if (subjectInput) {
                    subjectInput.value = subject;
                }
            }
        }
    }
}

// Populate effect filter dropdown
function populateEffectFilter() {
    const effectDropdown = document.getElementById('team-builder-effect-dropdown');
    if (!effectDropdown) return;

    const sortedEffects = Array.from(allEffects).sort();
    effectDropdown.innerHTML = '';
    
    const defaultOption = document.createElement('div');
    defaultOption.className = `effect-option${selectedEffect ? '' : ' selected'}`;
    defaultOption.setAttribute('data-value', '');
    defaultOption.setAttribute('role', 'option');
    defaultOption.textContent = 'All Effects';
    effectDropdown.appendChild(defaultOption);

    sortedEffects.forEach(effect => {
        const option = document.createElement('div');
        option.className = 'effect-option';
        option.setAttribute('data-value', effect);
        option.textContent = effect;
        option.setAttribute('role', 'option');
        if (effect === selectedEffect) {
            option.classList.add('selected');
        }
        effectDropdown.appendChild(option);
    });
}

// Setup filter event listeners
function setupFilterListeners() {
    // Type filter buttons
    const typeButtons = document.querySelectorAll('.team-builder-type-filter .type-filter-button');
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedType = button.dataset.type || '';
            renderHeroPool();
            updateUrl();
        });
    });

    // Effect filter
    const effectSearchInput = document.getElementById('team-builder-effect-search');
    const effectDropdown = document.getElementById('team-builder-effect-dropdown');
    const clearEffectBtn = document.getElementById('team-builder-clear-effect-btn');

    if (effectSearchInput && effectDropdown) {
        effectSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const options = effectDropdown.querySelectorAll('.effect-option');
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
            
            if (!effectDropdown.classList.contains('show')) {
                effectDropdown.classList.add('show');
                effectSearchInput.setAttribute('aria-expanded', 'true');
            }
        });

        effectSearchInput.addEventListener('focus', () => {
            effectDropdown.classList.add('show');
            effectSearchInput.setAttribute('aria-expanded', 'true');
        });

        effectDropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.effect-option');
            if (option) {
                const value = option.dataset.value || '';
                selectEffect(value);
            }
        });

        document.addEventListener('click', (e) => {
            if (!effectSearchInput.contains(e.target) && !effectDropdown.contains(e.target)) {
                effectDropdown.classList.remove('show');
                effectSearchInput.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (clearEffectBtn) {
        clearEffectBtn.addEventListener('click', () => {
            selectEffect('');
        });
    }
}

// Select effect filter
function selectEffect(value) {
    selectedEffect = value;
    const effectSearchInput = document.getElementById('team-builder-effect-search');
    const clearEffectBtn = document.getElementById('team-builder-clear-effect-btn');
    const effectDropdown = document.getElementById('team-builder-effect-dropdown');
    
    if (effectSearchInput) {
        effectSearchInput.value = value || '';
    }
    
    if (clearEffectBtn) {
        clearEffectBtn.style.display = value ? 'block' : 'none';
    }
    
    if (effectDropdown) {
        effectDropdown.querySelectorAll('.effect-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.value === value);
        });
        effectDropdown.classList.remove('show');
    }
    
    if (effectSearchInput) {
        effectSearchInput.setAttribute('aria-expanded', 'false');
    }
    
    renderHeroPool();
    updateUrl();
}

// Setup subject field
function setupSubjectField() {
    const subjectInput = document.getElementById('team-builder-subject');
    if (subjectInput) {
        subjectInput.value = subject;
        subjectInput.addEventListener('input', (e) => {
            subject = e.target.value.trim();
            updateUrl();
        });
    }
}

// Render hero pool (left sidebar) or pet pool
function renderHeroPool() {
    const poolGrid = document.getElementById('hero-pool-grid');
    if (!poolGrid) return;
    
    poolGrid.innerHTML = '';

    if (showPets) {
        // Render pets
        const filteredPets = PETS.filter(pet => {
            return !searchQuery || pet.toLowerCase().includes(searchQuery.toLowerCase());
        });
        
        filteredPets.forEach(petName => {
            const card = createDraggablePetCard(petName);
            poolGrid.appendChild(card);
        });
    } else {
        // Filter heroes based on search query, type, and effect
        const filteredHeroes = heroes.filter(hero => {
            // Filter by search query
            const matchesSearch = hero.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Filter by type
            let matchesType = true;
            if (selectedType) {
                const data = heroData[hero];
                matchesType = data && data.type === selectedType;
            }
            
            // Filter by effect
            let matchesEffect = true;
            if (selectedEffect) {
                const data = heroData[hero];
                matchesEffect = data && data.effects && data.effects.includes(selectedEffect);
            }
            
            return matchesSearch && matchesType && matchesEffect;
        });

        filteredHeroes.forEach(heroName => {
            const card = createDraggableHeroCard(heroName);
            poolGrid.appendChild(card);
        });
    }
}

// Create draggable pet card for pet pool
function createDraggablePetCard(petName) {
    const card = document.createElement('div');
    card.className = 'hero-pool-card';
    card.draggable = true;
    card.dataset.petName = petName;
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-pool-image-container';
    
    const img = document.createElement('img');
    img.className = 'hero-pool-image';
    const petPath = getPetIconPath(petName);
    if (petPath) {
        img.src = petPath;
    }
    img.alt = petName;
    img.loading = 'lazy';
    
    const name = document.createElement('div');
    name.className = 'hero-pool-name';
    name.textContent = petName;
    
    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);
    
    // Drag event listeners
    card.addEventListener('dragstart', (e) => {
        draggedHero = `pet:${petName}`;
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', petName);
    });
    
    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedHero = null;
    });
    
    return card;
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
    if (!teamsContainer) return;
    
    teamsContainer.innerHTML = '';

    teams.forEach((team, teamIndex) => {
        const teamElement = createTeamElement(team, teamIndex);
        teamsContainer.appendChild(teamElement);
    });
}

// Get row position based on formation type and slot index (0-4)
// Position mapping: 0=pos1, 1=pos2, 2=pos3, 3=pos4, 4=pos5
function getRowForFormation(formationType, slotIndex) {
    const formations = {
        'basic': ['back', 'front', 'back', 'front', 'back'],      // 2 Front (pos 2,4), 3 Back (pos 1,3,5)
        'balanced': ['front', 'back', 'front', 'back', 'front'],  // 3 Front (pos 1,3,5), 2 Back (pos 2,4)
        'attack': ['back', 'back', 'front', 'back', 'back'],      // 1 Front (pos 3), 4 Back (pos 1,2,4,5)
        'protective': ['front', 'front', 'back', 'front', 'front'] // 4 Front (pos 1,2,4,5), 1 Back (pos 3)
    };
    return formations[formationType]?.[slotIndex] || 'back';
}

// Create team element
function createTeamElement(team, teamIndex) {
    const teamWrapper = document.createElement('div');
    teamWrapper.className = 'team-wrapper';

    // Team header with name input, formation selector, and remove button
    const teamHeader = document.createElement('div');
    teamHeader.className = 'team-header';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'team-name-input';
    nameInput.value = team.name || `Team ${teamIndex + 1}`;
    nameInput.placeholder = `Team ${teamIndex + 1}`;
    nameInput.addEventListener('input', (e) => {
        teams[teamIndex].name = e.target.value.trim() || `Team ${teamIndex + 1}`;
        updateUrl();
    });

    // Formation selector
    const formationSelect = document.createElement('select');
    formationSelect.className = 'team-formation-select';
    const currentFormation = team.formationType || 'basic';
    formationSelect.innerHTML = `
        <option value="basic">Basic (2F, 3B)</option>
        <option value="balanced">Balanced (3F, 2B)</option>
        <option value="attack">Attack (1F, 4B)</option>
        <option value="protective">Protective (4F, 1B)</option>
    `;
    // Set value after innerHTML to ensure it's reflected
    formationSelect.value = currentFormation;
    formationSelect.addEventListener('change', (e) => {
        teams[teamIndex].formationType = e.target.value;
        renderTeams();
        updateUrl();
    });

    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn-clear-team';
    clearBtn.innerHTML = 'Clear';
    clearBtn.title = 'Clear Team';
    clearBtn.addEventListener('click', () => {
        teams[teamIndex].slots = [null, null, null, null, null];
        teams[teamIndex].tiers = [0, 0, 0, 0, 0];
        teams[teamIndex].gearSets = [null, null, null, null, null];
        teams[teamIndex].skillOrders = [[], [], [], [], []];
        teams[teamIndex].pet = null;
        renderTeams();
        updateUrl();
    });

    const resetSkillsBtn = document.createElement('button');
    resetSkillsBtn.className = 'btn-reset-skills';
    resetSkillsBtn.innerHTML = 'Reset Skills';
    resetSkillsBtn.title = 'Reset All Skill Orders for this Team';
    resetSkillsBtn.addEventListener('click', () => {
        teams[teamIndex].skillOrders = [[], [], [], [], []];
        renderTeams();
        updateUrl();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove-team';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove Team';
    removeBtn.addEventListener('click', () => {
        if (teams.length > 1) {
            teams.splice(teamIndex, 1);
            renderTeams();
            updateUrl();
        } else {
            alert('You must have at least one team.');
        }
    });

    // Left group: name and formation
    const leftGroup = document.createElement('div');
    leftGroup.className = 'team-header-left';
    leftGroup.appendChild(nameInput);
    leftGroup.appendChild(formationSelect);

    // Center group: clear button only
    const centerGroup = document.createElement('div');
    centerGroup.className = 'team-header-center';
    centerGroup.appendChild(clearBtn);

    // Right group: remove button
    const rightGroup = document.createElement('div');
    rightGroup.className = 'team-header-right';
    rightGroup.appendChild(removeBtn);

    teamHeader.appendChild(leftGroup);
    teamHeader.appendChild(centerGroup);
    teamHeader.appendChild(rightGroup);

    // Team slots (5 positions)
    const teamSlots = document.createElement('div');
    teamSlots.className = 'team-slots';

    for (let i = 0; i < 5; i++) {
        const row = getRowForFormation(team.formationType || 'basic', i);
        const slot = createTeamSlot(teamIndex, i, team.slots[i], row, team.tiers?.[i] || 0, team.gearSets?.[i] || null, team.skillOrders?.[i] || []);
        teamSlots.appendChild(slot);
    }

    // Pet slot and bottom controls container
    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'team-bottom-container';

    // Reset skills button (bottom left)
    const resetSkillsBtnBottom = document.createElement('div');
    resetSkillsBtnBottom.className = 'team-reset-skills-container';
    resetSkillsBtnBottom.appendChild(resetSkillsBtn);

    // Pet slot (center)
    const petSlot = createPetSlot(teamIndex, team.pet || null);

    // Empty spacer (bottom right) to balance layout
    const spacer = document.createElement('div');
    spacer.className = 'team-bottom-spacer';

    bottomContainer.appendChild(resetSkillsBtnBottom);
    bottomContainer.appendChild(petSlot);
    bottomContainer.appendChild(spacer);

    teamWrapper.appendChild(teamHeader);
    teamWrapper.appendChild(teamSlots);
    teamWrapper.appendChild(bottomContainer);

    return teamWrapper;
}

// Create pet slot
function createPetSlot(teamIndex, petName) {
    const petContainer = document.createElement('div');
    petContainer.className = 'team-pet-container';
    
    const petSlot = document.createElement('div');
    petSlot.className = 'team-pet-slot';
    petSlot.dataset.teamIndex = teamIndex;
    
    if (petName) {
        const petCard = createPetSlotCard(petName, teamIndex);
        petSlot.appendChild(petCard);
    } else {
        petSlot.classList.add('empty-pet-slot');
        petSlot.textContent = 'Drop Pet Here';
    }
    
    // Drop event listeners
    petSlot.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedHero && draggedHero.startsWith('pet:')) {
            e.dataTransfer.dropEffect = 'move';
            petSlot.classList.add('drag-over');
        }
    });
    
    petSlot.addEventListener('dragleave', () => {
        petSlot.classList.remove('drag-over');
    });
    
    petSlot.addEventListener('drop', (e) => {
        e.preventDefault();
        petSlot.classList.remove('drag-over');
        
        if (draggedHero && draggedHero.startsWith('pet:')) {
            const pet = draggedHero.replace('pet:', '');
            teams[teamIndex].pet = pet;
            renderTeams();
            updateUrl();
        }
    });
    
    petContainer.appendChild(petSlot);
    return petContainer;
}

// Create pet card for pet slot
function createPetSlotCard(petName, teamIndex) {
    const card = document.createElement('div');
    card.className = 'team-pet-card';
    card.draggable = true;
    card.dataset.petName = petName;
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'team-pet-image-container';
    
    const img = document.createElement('img');
    img.className = 'team-pet-image';
    const petPath = getPetIconPath(petName);
    if (petPath) {
        img.src = petPath;
    }
    img.alt = petName;
    
    const name = document.createElement('div');
    name.className = 'team-pet-name';
    name.textContent = petName;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-pet-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove Pet';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        teams[teamIndex].pet = null;
        renderTeams();
        updateUrl();
    });
    
    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(removeBtn);
    
    // Drag event listeners
    card.addEventListener('dragstart', (e) => {
        draggedHero = `pet:${petName}`;
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', petName);
    });
    
    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedHero = null;
    });
    
    return card;
}

// Create a team slot
function createTeamSlot(teamIndex, slotIndex, heroName, row, tier, gearSet, skillOrder) {
    const slot = document.createElement('div');
    slot.className = `team-slot team-slot-${row}`;
    slot.dataset.teamIndex = teamIndex;
    slot.dataset.slotIndex = slotIndex;

    if (heroName) {
        const heroCard = createTeamSlotHeroCard(heroName, teamIndex, slotIndex, gearSet, skillOrder);
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
                    // Get the actual hero name, tier, and gear set from the source slot before clearing
                    const heroName = teams[sourceTeamIndex]?.slots[sourceSlotIndex];
                    const heroTier = teams[sourceTeamIndex]?.tiers?.[sourceSlotIndex] || 0;
                    const heroGearSet = teams[sourceTeamIndex]?.gearSets?.[sourceSlotIndex] || null;
                    teams[sourceTeamIndex].slots[sourceSlotIndex] = null;
                    teams[sourceTeamIndex].tiers[sourceSlotIndex] = 0;
                    if (!teams[sourceTeamIndex].gearSets) {
                        teams[sourceTeamIndex].gearSets = [null, null, null, null, null];
                    }
                    teams[sourceTeamIndex].gearSets[sourceSlotIndex] = null;
                    teams[teamIndex].slots[slotIndex] = heroName;
                    if (!teams[teamIndex].tiers) {
                        teams[teamIndex].tiers = [0, 0, 0, 0, 0];
                    }
                    if (!teams[teamIndex].gearSets) {
                        teams[teamIndex].gearSets = [null, null, null, null, null];
                    }
                    teams[teamIndex].tiers[slotIndex] = heroTier;
                    teams[teamIndex].gearSets[slotIndex] = heroGearSet;
                }
            } else {
                // Dragging from hero pool
                teams[teamIndex].slots[slotIndex] = draggedHero;
                // Initialize tier to 0 if not set
                if (!teams[teamIndex].tiers) {
                    teams[teamIndex].tiers = [0, 0, 0, 0, 0];
                }
                if (teams[teamIndex].tiers[slotIndex] === undefined) {
                    teams[teamIndex].tiers[slotIndex] = 0;
                }
                // Initialize gear set to null if not set
                if (!teams[teamIndex].gearSets) {
                    teams[teamIndex].gearSets = [null, null, null, null, null];
                }
                if (teams[teamIndex].gearSets[slotIndex] === undefined) {
                    teams[teamIndex].gearSets[slotIndex] = null;
                }
                // Initialize skill order to empty array if not set
                if (!teams[teamIndex].skillOrders) {
                    teams[teamIndex].skillOrders = [[], [], [], [], []];
                }
                if (teams[teamIndex].skillOrders[slotIndex] === undefined) {
                    teams[teamIndex].skillOrders[slotIndex] = [];
                }
            }
            // Re-render to update row positioning
            const currentRow = getRowForFormation(teams[teamIndex].formationType || 'basic', slotIndex);
            slot.className = `team-slot team-slot-${currentRow}`;
            renderTeams();
            updateUrl();
        }
    });

    return slot;
}

// Create hero card for team slot
function createTeamSlotHeroCard(heroName, teamIndex, slotIndex, gearSet, skillOrder) {
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

    // Tier stars
    const tierStarsContainer = document.createElement('div');
    tierStarsContainer.className = 'tier-stars-container';
    const currentTier = teams[teamIndex].tiers?.[slotIndex] || 0;
    
    // Clear tier button (on the left)
    const clearTierBtn = document.createElement('button');
    clearTierBtn.className = 'tier-clear-btn';
    clearTierBtn.innerHTML = '×';
    clearTierBtn.title = 'Clear Tier';
    clearTierBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        teams[teamIndex].tiers[slotIndex] = 0;
        renderTeams();
        updateUrl();
    });
    tierStarsContainer.appendChild(clearTierBtn);
    
    // Stars container (centered)
    const starsGroup = document.createElement('div');
    starsGroup.className = 'tier-stars-group';
    
    for (let i = 1; i <= 6; i++) {
        const star = document.createElement('button');
        star.className = 'tier-star';
        star.dataset.tier = i;
        star.innerHTML = '★';
        star.title = `Tier ${i}`;
        if (i <= currentTier) {
            star.classList.add('active');
        }
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            teams[teamIndex].tiers[slotIndex] = i;
            renderTeams();
            updateUrl();
        });
        starsGroup.appendChild(star);
    }
    
    tierStarsContainer.appendChild(starsGroup);

    // Gear set dropdown
    const gearSetContainer = document.createElement('div');
    gearSetContainer.className = 'team-slot-gear-container';
    const gearSetSelect = document.createElement('select');
    gearSetSelect.className = 'team-slot-gear-select';
    gearSetSelect.title = 'Select Gear Set';
    
    // Add options
    GEAR_SETS.forEach(gearSet => {
        const option = document.createElement('option');
        option.value = gearSet === 'None' ? '' : gearSet;
        option.textContent = gearSet;
        gearSetSelect.appendChild(option);
    });
    
    // Set current value
    const currentGearSetValue = gearSet !== undefined && gearSet !== null ? gearSet : (teams[teamIndex].gearSets?.[slotIndex] || null);
    gearSetSelect.value = currentGearSetValue || '';
    
    // Add event listener
    gearSetSelect.addEventListener('change', (e) => {
        e.stopPropagation();
        if (!teams[teamIndex].gearSets) {
            teams[teamIndex].gearSets = [null, null, null, null, null];
        }
        teams[teamIndex].gearSets[slotIndex] = e.target.value || null;
        updateUrl();
    });
    
    gearSetContainer.appendChild(gearSetSelect);

    // Skill order selection
    const skillOrderContainer = createSkillOrderContainer(teamIndex, slotIndex);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-hero-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove Hero';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        teams[teamIndex].slots[slotIndex] = null;
        if (!teams[teamIndex].tiers) {
            teams[teamIndex].tiers = [0, 0, 0, 0, 0];
        }
        if (!teams[teamIndex].gearSets) {
            teams[teamIndex].gearSets = [null, null, null, null, null];
        }
        teams[teamIndex].tiers[slotIndex] = 0;
        teams[teamIndex].gearSets[slotIndex] = null;
        if (!teams[teamIndex].skillOrders) {
            teams[teamIndex].skillOrders = [[], [], [], [], []];
        }
        teams[teamIndex].skillOrders[slotIndex] = [];
        renderTeams();
        updateUrl();
    });

    // Append in correct order: gear, image, name, stars, skills, remove button
    imageContainer.appendChild(img);
    card.appendChild(gearSetContainer);
    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(tierStarsContainer);
    card.appendChild(skillOrderContainer);
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

// Create skill order container
function createSkillOrderContainer(teamIndex, slotIndex) {
    const container = document.createElement('div');
    container.className = 'skill-order-container';
    
    const skillBoxes = document.createElement('div');
    skillBoxes.className = 'skill-boxes';
    
    // Top skill (S2) and Bottom skill (S1)
    const s2Box = document.createElement('div');
    s2Box.className = 'skill-box';
    s2Box.dataset.skill = 's2';
    s2Box.textContent = '';
    s2Box.title = 'Top Skill (S2)';

    const s1Box = document.createElement('div');
    s1Box.className = 'skill-box';
    s1Box.dataset.skill = 's1';
    s1Box.textContent = '';
    s1Box.title = 'Bottom Skill (S1)';
    
    // Get current skill order
    const currentSkillOrder = teams[teamIndex].skillOrders?.[slotIndex] || [];
    
    // Update box appearance based on current order
    updateSkillBoxes([s2Box, s1Box], currentSkillOrder);
    
    // Click handlers
    s2Box.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSkillOrder(teamIndex, slotIndex, 's2');
    });
    
    s1Box.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSkillOrder(teamIndex, slotIndex, 's1');
    });
    
    skillBoxes.appendChild(s2Box);
    skillBoxes.appendChild(s1Box);

    container.appendChild(skillBoxes);

    return container;
}

// Toggle skill order (team-wide 1-10 system)
function toggleSkillOrder(teamIndex, slotIndex, skill) {
    if (!teams[teamIndex].skillOrders) {
        teams[teamIndex].skillOrders = [[], [], [], [], []];
    }

    // Get all skills for this team to calculate team-wide order
    const allTeamSkills = [];
    teams[teamIndex].skillOrders.forEach((heroSkills, idx) => {
        heroSkills.forEach(skillEntry => {
            allTeamSkills.push({
                ...skillEntry,
                slotIndex: idx
            });
        });
    });

    // Sort by order to get current sequence
    allTeamSkills.sort((a, b) => a.order - b.order);

    const skillOrder = teams[teamIndex].skillOrders[slotIndex] || [];
    const existingIndex = skillOrder.findIndex(s => s.skill === skill);

    if (existingIndex !== -1) {
        // Remove skill and reorder all team skills
        const removedOrder = skillOrder[existingIndex].order;
        skillOrder.splice(existingIndex, 1);

        // Reorder all skills across all heroes in the team
        teams[teamIndex].skillOrders.forEach((heroSkills, idx) => {
            heroSkills.forEach(s => {
                if (s.order > removedOrder) {
                    s.order--;
                }
            });
        });
    } else {
        // Add skill with next available team-wide order
        const nextOrder = allTeamSkills.length + 1;
        if (nextOrder <= 10) {
            skillOrder.push({ skill: skill, order: nextOrder });
        }
    }

    teams[teamIndex].skillOrders[slotIndex] = skillOrder;
    renderTeams();
    updateUrl();
}

// Update skill boxes appearance
function updateSkillBoxes(boxes, skillOrder) {
    // Re-render all boxes to ensure correct order numbers
    boxes.forEach(box => {
        const skill = box.dataset.skill;
        const skillEntry = skillOrder.find(s => s.skill === skill);

        if (skillEntry) {
            const order = skillEntry.order;
            box.classList.add('skill-selected');
            box.dataset.order = order;
            box.textContent = `${order}`;
            box.style.backgroundColor = getSkillOrderColor(order);
            box.style.color = '#fff';
            box.style.borderColor = getSkillOrderColor(order);
        } else {
            box.classList.remove('skill-selected');
            box.removeAttribute('data-order');
            box.textContent = '';
            box.style.backgroundColor = '';
            box.style.color = '';
            box.style.borderColor = '';
        }
    });
}

// Get color for skill order (green to red through color wheel)
function getSkillOrderColor(order) {
    // Order 1 = green (120deg), Order 10 = red (0deg)
    // Rotate from green (120deg) to red (0deg) = 120 degrees total
    // 10 positions, so each step is 120/9 = ~13.33 degrees
    const hue = 120 - ((order - 1) * (120 / 9));
    return `hsl(${hue}, 70%, 50%)`;
}

// Generate import string from current teams
function generateImportString() {
    const data = {
        subject: subject,
        teams: teams.map((team, index) => ({
            name: team.name || `Team ${index + 1}`,
            slots: team.slots,
            tiers: team.tiers || [0, 0, 0, 0, 0],
            gearSets: team.gearSets || [null, null, null, null, null],
            skillOrders: team.skillOrders || [[], [], [], [], []],
            pet: team.pet || null,
            formationType: team.formationType || 'basic'
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
                slots: team.slots || [null, null, null, null, null],
                tiers: team.tiers || [0, 0, 0, 0, 0],
                gearSets: team.gearSets || [null, null, null, null, null],
                skillOrders: team.skillOrders || [[], [], [], [], []],
                pet: team.pet || null,
                formationType: team.formationType || 'basic'
            }));
            
            // Ensure slots are exactly 5
            teams.forEach(team => {
                while (team.slots.length < 5) {
                    team.slots.push(null);
                }
                team.slots = team.slots.slice(0, 5);
                
                // Ensure tiers are exactly 5
                if (!team.tiers) {
                    team.tiers = [0, 0, 0, 0, 0];
                }
                while (team.tiers.length < 5) {
                    team.tiers.push(0);
                }
                team.tiers = team.tiers.slice(0, 5);
                
                // Ensure gearSets are exactly 5
                if (!team.gearSets) {
                    team.gearSets = [null, null, null, null, null];
                }
                while (team.gearSets.length < 5) {
                    team.gearSets.push(null);
                }
                team.gearSets = team.gearSets.slice(0, 5);
                
                // Ensure skillOrders are exactly 5
                if (!team.skillOrders) {
                    team.skillOrders = [[], [], [], [], []];
                }
                while (team.skillOrders.length < 5) {
                    team.skillOrders.push([]);
                }
                team.skillOrders = team.skillOrders.slice(0, 5);
            });
            
            // Update subject if present
            if (data.subject) {
                subject = data.subject;
                const subjectInput = document.getElementById('team-builder-subject');
                if (subjectInput) {
                    subjectInput.value = subject;
                }
            }
            
            renderTeams();
            return true;
        }
        return false;
    } catch (e) {
        console.error('Failed to parse import string:', e);
        return false;
    }
}

// Update URL with current state
function updateUrl() {
    const importString = generateImportString();
    const url = new URL(window.location.href);
    
    // Remove existing team builder params
    url.searchParams.delete('teams');
    url.searchParams.delete('subject');
    
    // Add new params
    url.searchParams.set('teams', importString);
    if (subject) {
        url.searchParams.set('subject', encodeURIComponent(subject));
    }
    
    // Update URL without reloading
    window.history.replaceState({}, '', url);
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

    // Share URL button
    const shareBtn = document.getElementById('share-url-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                shareBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Copied!
                `;
                setTimeout(() => {
                    shareBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        Share URL
                    `;
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('URL copied to clipboard!');
            });
        });
    }

    // Add team button
    const addTeamBtn = document.getElementById('add-team-btn');
    if (addTeamBtn) {
        addTeamBtn.addEventListener('click', () => {
            const defaultName = `Team ${teams.length + 1}`;
            teams.push({ name: defaultName, slots: [null, null, null, null, null], tiers: [0, 0, 0, 0, 0], gearSets: [null, null, null, null, null], skillOrders: [[], [], [], [], []], pet: null, formationType: 'basic' });
            renderTeams();
            updateUrl();
        });
    }

    // Clear all teams button
    const clearAllBtn = document.getElementById('clear-all-teams-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all teams? This cannot be undone.')) {
                teams.forEach(team => {
                    team.slots = [null, null, null, null, null];
                    team.tiers = [0, 0, 0, 0, 0];
                    team.gearSets = [null, null, null, null, null];
                    team.skillOrders = [[], [], [], [], []];
                    team.pet = null;
                });
                renderTeams();
                updateUrl();
            }
        });
    }
}
