// Gear Builder Module
// Handles creating gear cards, tier sections, and populating hero gear information

import { heroData } from './state.js';
import { isPlaceholderValue } from './utils.js';

/**
 * Clear all hero sections from the detail view
 */
export function clearHeroSections() {
    const sectionsContainer = document.getElementById('hero-sections');
    sectionsContainer.innerHTML = '';
}

/**
 * Get the image path for a gear set
 * @param {string} gearSetName - Name of the gear set
 * @returns {string} URL-encoded path to the gear set image
 */
export function getGearSetImagePath(gearSetName) {
    const folderPath = encodeURI('Gear Sets Photos/');
    const fileName = encodeURIComponent(gearSetName) + '.png';
    return folderPath + fileName;
}

/**
 * Create a single gear card HTML element
 * @param {string} gearName - Name of the gear set
 * @param {string} mainStats - Main stat requirements
 * @param {string} requiredStats - Required stat thresholds
 * @param {string|null} subStats - Sub stat priorities
 * @returns {string} HTML markup for the gear card
 */
export function createGearCard(gearName, mainStats, requiredStats, subStats = null) {
    return `
        <div class="gear-card">
            <div class="gear-card-title">${gearName}</div>
            <div class="gear-card-content">
                <div class="gear-card-image">
                    <img src="${getGearSetImagePath(gearName)}" alt="${gearName}" onerror="this.parentElement.style.display='none'">
                </div>
                <div class="gear-card-stats">
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Main Stats</span>
                        <div class="gear-stat-value">${mainStats || '<em>To be added</em>'}</div>
                    </div>
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Required Stat Thresholds</span>
                        <div class="gear-stat-value">${requiredStats || '<em>To be added</em>'}</div>
                    </div>
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Sub Stat Priority</span>
                        <div class="gear-stat-value">${subStats || '<em>To be added</em>'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create a tier section (T0 or T6) with gear cards
 * @param {string} tierName - Tier name (e.g., "Gear T0", "Gear T6")
 * @param {string} gearSets - Comma-separated gear set names
 * @param {string} mainStats - Main stat requirements
 * @param {string} requiredStats - Required stat thresholds
 * @param {string|null} subStats - Sub stat priorities
 * @returns {string} HTML markup for the tier section
 */
export function createTierSection(tierName, gearSets, mainStats, requiredStats, subStats = null) {
    // Parse gear sets (they can be comma-separated)
    const gearNames = gearSets.split(',').map(name => name.trim()).filter(name => name);

    const gearCardsHTML = gearNames.map(gearName =>
        createGearCard(gearName, mainStats, requiredStats, subStats)
    ).join('');

    return `
        <div class="tier-section">
            <h3 class="tier-section-title">${tierName}</h3>
            <div class="gear-cards-grid">
                ${gearCardsHTML}
            </div>
        </div>
    `;
}

/**
 * Check if T6 gear configuration differs from T0
 * @param {string} t0Gear - T0 gear sets
 * @param {string} t0MainStats - T0 main stats
 * @param {string} t0RequiredStats - T0 required stat thresholds
 * @param {string|null} t0SubStats - T0 sub stat priorities
 * @param {string} t6Gear - T6 gear sets
 * @param {string} t6MainStats - T6 main stats
 * @param {string} t6RequiredStats - T6 required stat thresholds
 * @param {string|null} t6SubStats - T6 sub stat priorities
 * @returns {boolean} True if T6 is different from T0
 */
export function isT6DifferentFromT0(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats) {
    // If T6 gear doesn't exist or is placeholder, it's not different
    if (!t6Gear || t6Gear === 'Content to be added' || t6Gear === 'N/A') {
        return false;
    }

    // Compare all gear attributes
    return t6Gear !== t0Gear ||
           t6MainStats !== t0MainStats ||
           t6RequiredStats !== t0RequiredStats ||
           t6SubStats !== t0SubStats;
}

/**
 * Build a complete gear section (PvE or PvP) with T0 and conditional T6 tier sections
 * @param {string} t0Gear - T0 gear sets
 * @param {string} t0MainStats - T0 main stats
 * @param {string} t0RequiredStats - T0 required stat thresholds
 * @param {string|null} t0SubStats - T0 sub stat priorities
 * @param {string|null} t6Gear - T6 gear sets (optional)
 * @param {string|null} t6MainStats - T6 main stats (optional)
 * @param {string|null} t6RequiredStats - T6 required stat thresholds (optional)
 * @param {string|null} t6SubStats - T6 sub stat priorities (optional)
 * @returns {string} HTML markup for the complete gear section
 */
export function buildGearSection(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats) {
    let html = '';

    if (t0Gear && t0Gear !== 'Content to be added' && t0Gear !== 'N/A') {
        html += createTierSection('Gear T0', t0Gear, t0MainStats, t0RequiredStats, t0SubStats);
    }

    // Only show T6 section if it's different from T0
    if (t6Gear && t6Gear !== 'Content to be added' && t6Gear !== 'N/A') {
        if (isT6DifferentFromT0(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats)) {
            html += createTierSection('Gear T6', t6Gear, t6MainStats, t6RequiredStats, t6SubStats);
        }
    }

    return html || '<div class="subsection-content" style="color: var(--text-secondary);"><em>Content to be added</em></div>';
}

/**
 * Add tips and effects section to hero detail view
 * @param {string} tipsContent - HTML content for tips section
 * @param {string} heroName - Name of the hero
 */
export function addTipsAndEffectsSection(tipsContent, heroName) {
    const sectionsContainer = document.getElementById('hero-sections');

    // Create container for tips and effects side-by-side
    const container = document.createElement('div');
    container.className = 'tips-effects-container';

    // Tips section
    const tipsSection = document.createElement('div');
    tipsSection.className = 'tips-section';

    const tipsTitle = document.createElement('h2');
    tipsTitle.textContent = 'Tips/Important Info';

    const tipsContentDiv = document.createElement('div');
    tipsContentDiv.className = 'subsection-content';
    tipsContentDiv.innerHTML = tipsContent;
    tipsContentDiv.style.cssText = 'color: var(--text-secondary); line-height: 1.8;';

    tipsSection.appendChild(tipsTitle);
    tipsSection.appendChild(tipsContentDiv);

    // Effects section
    const effectsSection = document.createElement('div');
    effectsSection.className = 'effects-section';

    const effectsTitle = document.createElement('h2');
    effectsTitle.textContent = 'Effect List';

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'effects-toggle-btn collapsed';
    toggleBtn.setAttribute('aria-expanded', 'false');

    // Create text span (arrow will be added by CSS ::before)
    const btnText = document.createElement('span');
    btnText.className = 'btn-text';
    btnText.textContent = 'Show Effects';
    toggleBtn.appendChild(btnText);

    const effectsList = document.createElement('ul');
    effectsList.className = 'effect-list collapsed';

    // Get effects for this hero
    const data = heroData[heroName];
    const validEffects = data && Array.isArray(data.effects)
        ? data.effects.filter(effect => !isPlaceholderValue(effect))
        : [];
    if (validEffects.length > 0) {
        console.log(`Displaying ${validEffects.length} effects for ${heroName}:`, validEffects);
        validEffects.forEach(effect => {
            const li = document.createElement('li');
            li.className = 'effect-item';
            li.textContent = effect;
            effectsList.appendChild(li);
        });
    } else {
        console.log(`No effects found for ${heroName}. Data:`, data);
        const li = document.createElement('li');
        li.className = 'effect-item';
        li.innerHTML = '<em>No effects listed</em>';
        li.style.fontStyle = 'italic';
        effectsList.appendChild(li);
    }

    // Add toggle functionality
    toggleBtn.addEventListener('click', () => {
        const isCollapsed = effectsList.classList.contains('collapsed');
        effectsList.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');

        // Update button text (arrow is handled by CSS ::before)
        const textSpan = toggleBtn.querySelector('.btn-text');
        textSpan.textContent = isCollapsed ? 'Hide Effects' : 'Show Effects';

        toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
    });

    effectsSection.appendChild(effectsTitle);
    effectsSection.appendChild(toggleBtn);
    effectsSection.appendChild(effectsList);

    // Add both sections to container
    container.appendChild(tipsSection);
    container.appendChild(effectsSection);

    // Remove placeholder if exists
    const placeholder = sectionsContainer.querySelector('.section-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    sectionsContainer.appendChild(container);
}

/**
 * Add a hero section dynamically
 * @param {string} title - Section title
 * @param {string} content - HTML content for the section
 */
export function addHeroSection(title, content) {
    const sectionsContainer = document.getElementById('hero-sections');

    const section = document.createElement('div');
    section.className = 'hero-section';
    section.style.cssText = `
        padding: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 20px;
    `;

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = title;
    sectionTitle.style.cssText = `
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--accent-primary);
    `;

    const sectionContent = document.createElement('div');
    sectionContent.className = 'section-content';
    sectionContent.innerHTML = content;
    sectionContent.style.cssText = `
        color: var(--text-secondary);
        line-height: 1.6;
    `;

    section.appendChild(sectionTitle);
    section.appendChild(sectionContent);

    // Remove placeholder if exists
    const placeholder = sectionsContainer.querySelector('.section-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    sectionsContainer.appendChild(section);
}

/**
 * Build gear section HTML from JSON data
 * @param {Object} gearData - Gear data object with T0 and T6 arrays
 * @returns {string} HTML markup for the gear section
 */
function buildGearSectionFromJSON(gearData) {
    if (!gearData || (!gearData.T0?.length && !gearData.T6?.length)) {
        return `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>No gear configuration available</em>
            </div>
        `;
    }

    let html = '';

    // Build T0 section
    if (gearData.T0 && gearData.T0.length > 0) {
        const gearCardsHTML = gearData.T0.map(gear =>
            createGearCard(gear.name, gear.main_stats, gear.required_stat_thresholds, gear.sub_stat_priority)
        ).join('');

        html += `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${gearCardsHTML}
                </div>
            </div>
        `;
    }

    // Build T6 section - only show if different from T0
    if (gearData.T6 && gearData.T6.length > 0) {
        // Check if T6 is different from T0
        const t0GearNames = gearData.T0?.map(g => g.name).sort().join(',') || '';
        const t6GearNames = gearData.T6.map(g => g.name).sort().join(',');
        
        // Compare gear sets - if names are different, show T6
        let isDifferent = t0GearNames !== t6GearNames;
        
        // If names are the same, compare individual gear items
        if (!isDifferent && gearData.T0 && gearData.T0.length === gearData.T6.length) {
            for (let i = 0; i < gearData.T6.length; i++) {
                const t0Gear = gearData.T0[i];
                const t6Gear = gearData.T6[i];
                if (t0Gear.name !== t6Gear.name ||
                    t0Gear.main_stats !== t6Gear.main_stats ||
                    t0Gear.required_stat_thresholds !== t6Gear.required_stat_thresholds ||
                    t0Gear.sub_stat_priority !== t6Gear.sub_stat_priority) {
                    isDifferent = true;
                    break;
                }
            }
        }
        
        // Only show T6 if it's different from T0
        if (isDifferent) {
            const gearCardsHTML = gearData.T6.map(gear =>
                createGearCard(gear.name, gear.main_stats, gear.required_stat_thresholds, gear.sub_stat_priority)
            ).join('');

            html += `
                <div class="tier-section">
                    <h3 class="tier-section-title">Gear T6</h3>
                    <div class="gear-cards-grid">
                        ${gearCardsHTML}
                    </div>
                </div>
            `;
        }
    }

    return html;
}

/**
 * Populate hero sections with gear information and tips
 * All heroes now use JSON data from hero-data.json
 * @param {string} heroName - Name of the hero to populate sections for
 */
export function populateHeroSections(heroName) {
    // Pull data from JSON and display automatically
    const data = heroData[heroName];

    // Tips and Effects section (side-by-side) - shown first
    const tipsContent = data && data.tips
        ? `<p>${data.tips}</p>`
        : '<em>No tips available yet</em>';
    addTipsAndEffectsSection(tipsContent, heroName);

    // Gear PvE section from JSON
    const gearPvEHTML = data && data.gear_pve
        ? buildGearSectionFromJSON(data.gear_pve)
        : `<div class="subsection-content" style="color: var(--text-secondary);"><em>No PvE gear configuration available</em></div>`;
    addHeroSection('Gear PvE', gearPvEHTML);

    // Gear PvP section from JSON
    const gearPvPHTML = data && data.gear_pvp
        ? buildGearSectionFromJSON(data.gear_pvp)
        : `<div class="subsection-content" style="color: var(--text-secondary);"><em>No PvP gear configuration available</em></div>`;
    addHeroSection('Gear PvP', gearPvPHTML);

    // Skill Enhance Priority from JSON
    const skillPriorityContent = data && data.skill_enhance_priority
        ? `<div class="subsection-content" style="color: var(--text-secondary);"><p>${data.skill_enhance_priority}</p></div>`
        : `<div class="subsection-content" style="color: var(--text-secondary);"><em>No skill enhance priority available</em></div>`;
    addHeroSection('Skill Enhance Priority', skillPriorityContent);
}
