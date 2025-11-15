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

    // Build T6 section
    if (gearData.T6 && gearData.T6.length > 0) {
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

    return html;
}

/**
 * Populate hero sections with gear information and tips
 * Handles hero-specific gear builds, tips, and skill enhance priorities
 * @param {string} heroName - Name of the hero to populate sections for
 */
export function populateHeroSections(heroName) {
    // Amelia-specific content
    if (heroName === 'Amelia') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>S1 concussion is very strong when paired with multi hit heroes. Can infinitely cc 3 enemies.</li>
                <li>Amelia should be squishy, as she provides a large shield and cleanse when dying</li>
                <li>Very strong against tank team due to HP alteration and anti-heal</li>
                <li>Game changer when paired with Kyle</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Vanguard Physical',                  // T0 Gear
            'All Attack % (not that important)', // T0 Main Stats
            'N/A',                                // T0 Required Stat Thresholds
            null,                                 // T0 Sub Stat Priority
            'Vanguard Physical',                  // T6 Gear
            'All Attack % (not that important)', // T6 Main Stats
            'N/A',                                // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Physical, Full Speed',  // T0 Gear
            'All Attack % (not that important)', // T0 Main Stats
            'N/A',                                // T0 Required Stat Thresholds
            null,                                 // T0 Sub Stat Priority
            'Spellweaver Physical, Vanguard Physical', // T6 Gear
            'All Attack % (not that important)', // T6 Main Stats
            'N/A',                                // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Amelia
    }

    // Ace-specific content
    if (heroName === 'Ace') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>The main reason you use Ace is because of his defense down passive. He is really sticky due to guts and provides good debuffs for your team.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Vanguard Physical',  // T0 Gear
            'N/A',                // T0 Main Stats
            'N/A',                // T0 Required Stat Thresholds
            null,                 // T0 Sub Stat Priority
            null,                 // T6 Gear (not used)
            null,                 // T6 Main Stats
            null,                 // T6 Required Stat Thresholds
            null                  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Full Speed',    // T0 Gear
            'All Attack %',  // T0 Main Stats
            'SPEEEEEED',     // T0 Required Stat Thresholds
            null,            // T0 Sub Stat Priority
            null,            // T6 Gear (not used for Ace)
            null,            // T6 Main Stats
            null,            // T6 Required Stat Thresholds
            null             // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Ace
    }

    // Aragon-specific content (Fodder)
    if (heroName === 'Aragon') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Aragon
    }

    // Aquila-specific content
    if (heroName === 'Aquila') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Want to stack death with Aquila S2 and Kris S2 then proc it with Aquila S1. Leading with S2 is good cause it gives link.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Physical',
                        'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)',
                        'Not important but 100% block is good if you can get it',
                        'Block rate, Max HP'
                    )}
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)',
                        '100% block rate',
                        'Block rate, Max HP'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Physical',                           // T0 Gear
            'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)', // T0 Main Stats
            'SPEED, rest not important but 100% block is good if you can get it',   // T0 Required Stat Thresholds
            'SPEED, Block rate, Max HP',                      // T0 Sub Stat Priority
            null,                                              // T6 Gear (not used)
            null,                                              // T6 Main Stats
            null,                                              // T6 Required Stat Thresholds
            null                                               // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2</p>
            </div>
        `);

        return; // Exit early for Aquila
    }

    // Ballista-specific content (Fodder)
    if (heroName === 'Ballista') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Ballista
    }

    // Bi Dam-specific content
    if (heroName === 'Bi Dam') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only used in one castle rush and advent. Low priority, only go for him if u get a bunch of random copies for no reason.</li>
                <li>Stack bleeds to detonate. Bleeds damage are based off of max attack</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',            // T0 Gear
            'Crit Rate, All Attack %',     // T0 Main Stats
            '100% crit rate',              // T0 Required Stat Thresholds
            'Attack, Crit Rate, Weakness Hit', // T0 Sub Stat Priority
            'Avenger Physical',            // T6 Gear
            'Crit Rate, All Attack %',     // T6 Main Stats
            '100% crit rate',              // T6 Required Stat Thresholds
            'Attack, Crit Rate, Weakness Hit'  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Bi Dam
    }

    // Biscuit-specific content
    if (heroName === 'Biscuit') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Amazing for clearing nightmare on 3* when used in physical team with Kyle</li>
                <li>Used in almost all PvE content. Need speed sub stats for Ox (so Espanda goes 4th)</li>
                <li>Can build crit set if you're pushing damage in castle rush or advent</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Magic',
                        'Defense (weapons), Block Rate (armors), Damange Reduction (armors)',
                        'None',
                        'Block rate, Defense, HP'
                    )}
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Magic (Situational)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Magic')}" alt="Assassin Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate (weapons), Defense % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">100% crit rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit rate, Crit damage, Defense</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1 &gt; passive &gt; basic attack</p>
            </div>
        `);

        return; // Exit early for Biscuit
    }

    // Alice-specific content
    if (heroName === 'Alice') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Defensive healer. Generally used in tank comp. The defense she gives makes a lot of the tanky heroes a lot stronger, especially Platin.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Paladin Magic',  // T0 Gear
            'Max HP%',        // T0 Main Stats
            'Max HP',         // T0 Required Stat Thresholds
            null,             // T0 Sub Stat Priority
            'Paladin Magic',  // T6 Gear
            'Max HP%',        // T6 Main Stats
            'Max HP',         // T6 Required Stat Thresholds
            null              // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Max HP% (weapons), Block Rate (armors)', // T0 Main Stats
            'Max HP, Speed',                       // T0 Required Stat Thresholds
            null,                                  // T0 Sub Stat Priority
            'Gatekeeper Magic',                    // T6 Gear
            'Max HP% (weapons), Block Rate (armors)', // T6 Main Stats
            'Max HP, Speed',                       // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Not that important overall but the basic attack and passive are both pretty nice</p>
            </div>
        `);

        return; // Exit early for Alice
    }

    // Chancellor-specific content
    if (heroName === 'Chancellor') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Can be used in guild war but lets be real this guy is fodder</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Chancellor
    }

    // Colt-specific content
    if (heroName === 'Colt') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Good in physical and magic comp in Arena</li>
                <li>OP when paired with Platin in GvG</li>
                <li>Cant be CCd due to camouflage and can counter cc if your whole team gets stunned</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'Speed, All Attack %, All Attack, Effect Hit Rate'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'Speed, All Attack %, All Attack, Effect Hit Rate'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Colt
    }

    // Daisy-specific content
    if (heroName === 'Daisy') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Really hard to find perfect gear for her to clear higher levels of Ox. Gotta find the balance between 1 shotting the ads and being tanky enough to live.</li>
                <li>Can occasionally be used to counter petrify in any other content (like nightmare 8-30)</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Magic',                                                    // T0 Gear
            'Crit Rate (weapons), All Attack % (Armor), Damage Taken Reduction (Armor)', // T0 Main Stats
            '100% Crit Rate, 16% Damage Taken Reduction, 200% Crit Damage',    // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, All Attack %, Max HP',                     // T0 Sub Stat Priority
            null,                                                                // T6 Gear
            null,                                                                // T6 Main Stats
            null,                                                                // T6 Required Stat Thresholds
            null                                                                 // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        return; // Exit early for Daisy
    }

    // Dellons-specific content
    if (heroName === 'Dellons') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Dellons is strong but too many units outshine him. Not very high prio. Might be in line for a buff after this next round.</li>
                <li>Weakness hit is good so he resets his ult</li>
                <li>Silence can be nice</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',                              // T0 Gear
            'Crit Rate (weapons), All Attack % (Armor)',     // T0 Main Stats
            '100% Crit Rate (18% from T4)',                  // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage',                        // T0 Sub Stat Priority
            null,                                             // T6 Gear
            null,                                             // T6 Main Stats
            null,                                             // T6 Required Stat Thresholds
            null                                              // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Weakness Hit Chance, All Attack % (armors)',
                        'None',
                        'Speed, Weakness Hit Chance, Crit Rate, Crit Damage'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Dellons
    }

    // Eileene-specific content
    if (heroName === 'Eileene') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>S2 is really strong. Multi-hit shock. Much stronger when paired with rosie but not necessary. T6 adds 10% x2 chance to hit which is very powerful.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',  // T0 Gear
            'N/A',                   // T0 Main Stats
            'None',                  // T0 Required Stat Thresholds
            'N/A',                   // T0 Sub Stat Priority
            null,                    // T6 Gear
            null,                    // T6 Main Stats
            null,                    // T6 Required Stat Thresholds
            null                     // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Physical',
                        'N/A',
                        'None',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Eileene
    }

    // Espada-specific content
    if (heroName === 'Espada') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Needs to have the 4th highest speed on your team for Ox</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                                                         // T0 Gear
            'Crit Rate (Armor)',                                                     // T0 Main Stats
            '60% Crit Rate, 200% Crit Damage',                                       // T0 Required Stat Thresholds
            'Crit Damage, Crit Rate, Weakness Hit Chance, All Attack %, All Attack', // T0 Sub Stat Priority
            null,                                                                    // T6 Gear
            null,                                                                    // T6 Main Stats
            null,                                                                    // T6 Required Stat Thresholds
            null                                                                     // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Espada
    }

    // Fai-specific content
    if (heroName === 'Fai') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Can use for power up dungeons before u have strong shane/Espada</li>
                <li>Passive phys vulnerability + S1 upgrade for defense down is a powerful combo to make your hitters like Kyle go crazy</li>
                <li>Weakness hit set is playable because she will more often target low hp targets with her execute</li>
                <li>Dont underestimate the burn, it does alot of damage</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Avenger Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'Speed',
                        'Speed, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Weakness Hit Chance, All Attack %',
                        'Speed',
                        'Speed, Weakness HIt Chance, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1 &gt; Passive</p>
            </div>
        `);

        return; // Exit early for Fai
    }

    // Jave-specific content
    if (heroName === 'Jave') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Usable in Total War. Hes not a bad unit but just doesnt see many use cases where he outshines other heroes.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Physical',                                    // T0 Gear
            'All Attack % (weapons), Block Rate (armors)',           // T0 Main Stats
            '100% Block, as much attack as possible',                // T0 Required Stat Thresholds
            'Block rate, All Attack %, All Attack, Defense',         // T0 Sub Stat Priority
            null,                                                      // T6 Gear (not used)
            null,                                                      // T6 Main Stats
            null,                                                      // T6 Required Stat Thresholds
            null                                                       // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Jave
    }

    // Juri-specific content
    if (heroName === 'Juri') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Soul death is Op in PvP. Counters phyiscal comp, can also be used IN physical comp.</li>
                <li>Can be used as DPS in Yeonhee advent 2nd team</li>
                <li>Follow up attack is pretty strong with Mercure dot</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate',
                        '100% Crit Rate',
                        'Crit Rate, Crit Damage'
                    )}
                    ${createGearCard(
                        'Avenger Magic',
                        'Crit Rate',
                        '100% Crit Rate',
                        'Crit Rate, Crit Damage, Weakness Hit, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Magic',                   // T0 Gear
            'Doesnt matter',                       // T0 Main Stats
            'Speed',                               // T0 Required Stat Thresholds
            'Speed',                               // T0 Sub Stat Priority
            null,                                   // T6 Gear (not used)
            null,                                   // T6 Main Stats
            null,                                   // T6 Required Stat Thresholds
            null                                    // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2 &gt; Passive</p>
            </div>
        `);

        return; // Exit early for Juri
    }

    // Vanessa-specific content
    if (heroName === 'Vanessa') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Sandstorm sits at (%70-%80) chance to inflict a skill cooldown increase. This is the highest "CC" ability in the game and Spellweaver set increases probability to (%80-%90). Skill cooldown increase in PvP is an amazing opener as landing any can mess up the enemies queued skills. This unit is very good for magic team compositions and can even be used in some physical teams since her passive gives (%20-%24) defense down.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',                          // T0 Gear
            'Effect Hit Rate',                            // T0 Main Stats
            'Effect Hit Rate',                            // T0 Required Stat Thresholds
            'Effect Resistance, Max HP%, Block Rate %',   // T0 Sub Stat Priority
            null,                                          // T6 Gear (not different from T0)
            null,                                          // T6 Main Stats
            null,                                          // T6 Required Stat Thresholds
            null                                           // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'Effect Hit Rate',
                        'N/A',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'Full Speed',
                        'Full Speed',
                        'Full Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 1, Skill 2, Passive (ALL GOOD)</p>
            </div>
        `);

        return; // Exit early for Vanessa
    }

    // Kagura-specific content
    if (heroName === 'Kagura') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Core PvP unit for physical comp. Stickiest unit in the game</li>
                <li>U want Kagura to die quickly in PvP to get the cleanse off</li>
                <li>Feels really bad when she casts S1 in PvP, so if you build full crit at least it doest decent damage</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed, all attack %'
                    )}
                    ${createGearCard(
                        'Assassin Physical',
                        'All Attack %, Crit Rate (Weapons)',
                        'None',
                        'Speed, Crit Rate, All Attack %, Crit Damage'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'Speed > All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2</p>
            </div>
        `);

        return; // Exit early for Kagura
    }

    // Karma-specific content
    if (heroName === 'Karma') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Only really usable in full tank comp. Need T6 or he will feel pretty bad, but becomes an absolute menace in an upgraded tank comp. Really meant for whales tbh.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                            // T0 Gear
            'Weakness Hit (weapons), Block Rate (armors)', // T0 Main Stats
            '67% Block Rate',                              // T0 Required Stat Thresholds
            'Block Rate > Weakness Hit > Crit Rate',       // T0 Sub Stat Priority
            'Orchestrator Magic',                          // T6 Gear
            'Weakness Hit (weapons), Block Rate (armors)', // T6 Main Stats
            '67% Block Rate',                              // T6 Required Stat Thresholds
            'Block Rate > Weakness Hit > Crit Rate'        // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2 &gt; Basic Attack</p>
            </div>
        `);

        return; // Exit early for Karma
    }

    // Klahan-specific content (Fodder)
    if (heroName === 'Klahan') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder until buffed</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Klahan
    }

    // Knox-specific content
    if (heroName === 'Knox') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Main reason to have him is for his passive death chance increase in death comp</li>
                <li>Death comp is kinda weak rn, so mostly u will use him as fodder but keep 1-3 copies for when u need death (total war, nightmare)</li>
            </ul>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',                   // T0 Gear
            'Anything tanky',                         // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'Anything tanky',                         // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - only T0 has data
        addHeroSection('Gear PvP', buildGearSection(
            'Full Speed',                             // T0 Gear
            'N/A',                                    // T0 Main Stats
            'Speed',                                  // T0 Required Stat Thresholds
            'Speed',                                  // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>No priority specified</em>
            </div>
        `);

        return; // Exit early for Knox
    }

    // Kyle-specific content
    if (heroName === 'Kyle') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Most OP hero in the game. Good in almost all content. Beyond broken for pushing nightmare, tower, arena, total war, etc.</li>
                <li>No counter for Kyle in GvG. Just have to Kyle vs Kyle and Pray</li>
                <li>S2 is a buff removal so usually cast it 2nd if you need to strip immortality</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Physical')}" alt="Assassin Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Physical (Castle Rush/Bossing)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Physical')}" alt="Avenger Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Bounty Tracker Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Bounty Tracker Physical')}" alt="Bounty Tracker Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate, then stack as much crit damage and weakness hit as you can</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Weakness Hit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Physical (Castle Rush/Bossing)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Physical')}" alt="Avenger Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Physical')}" alt="Assassin Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Speed, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Bounty Tracker Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Bounty Tracker Physical')}" alt="Bounty Tracker Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate, then stack as much crit damage and weakness hit as you can</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Weakness Hit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Orchestrator Magic (Effect Resist)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Orchestrator Magic')}" alt="Orchestrator Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Speed, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Passive &gt; S1 &gt; S2</p>
            </div>
        `);

        return; // Exit early for Kyle
    }

    // Kris-specific content
    if (heroName === 'Kris') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Death comp is not in a good spot right now. He might be better if it gets buffed, but atm its just for total war or specific nightmare levels.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',                                        // T0 Gear
            'Effect Hit Rate, Defense %, HP %, Block Rate (armors), Damage Reduction (Armors)', // T0 Main Stats
            '100% Block',                                                  // T0 Required Stat Thresholds
            'Block Rate, Defense %, HP %, Effect Hit',                     // T0 Sub Stat Priority
            null,                                                           // T6 Gear (not used)
            null,                                                           // T6 Main Stats
            null,                                                           // T6 Required Stat Thresholds
            null                                                            // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'Speed',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'HP %, Damage Reduction (armors), Block Rate (armors)',
                        'Speed',
                        'Speed, Block Rate, HP %, Defense %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All are good</p>
            </div>
        `);

        return; // Exit early for Kris
    }

    // Kyrielle-specific content
    if (heroName === 'Kyrielle') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Overall not that great of a hero at lower tiers. Once you get her to T2-T6 she becomes a little bit more of a viable PvP unit. T2 gives her single targert Skill 1 a recast on kill and Skill 2 is a AOE Paralysis. The good thing about this unit is at T6 you dont have to worry about queueing any skills in PvP since she becomes immune to CC. This hero also scales all attack with speed making it a good speed stick as well as good CC.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',          // T0 Gear
            'Effect Hit Rate',            // T0 Main Stats
            'None',                       // T0 Required Stat Thresholds
            'Effect Hit Rate, Speed, Crit Rate, Crit Damage, Weakness Hit Chance, All Attack %', // T0 Sub Stat Priority
            null,                         // T6 Gear (not specified)
            null,                         // T6 Main Stats
            null,                         // T6 Required Stat Thresholds
            null                          // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'Crit Rate, Crit Damage',
                        'None',
                        'Speed, Crit Rate, Crit Damage, Weakness Hit Chance, All Attack %'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'Full Speed',
                        'Full Speed',
                        'Full Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 2, Basic Attack, Skill 1, Passive</p>
            </div>
        `);

        return; // Exit early for Kyrielle
    }

    // Lina-specific content
    if (heroName === 'Lina') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Used in almost all content. Really good heals while also buffing your team's damage a ton. T6 unlocks backline defense debuff, which adds a lot of damage in content like castle rush.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Paladin Magic',                       // T0 Gear
            'Health %',                            // T0 Main Stats
            'None',                                // T0 Required Stat Thresholds
            'Health %, Health, Block Rate, Defense', // T0 Sub Stat Priority
            null,                                  // T6 Gear (not specified)
            null,                                  // T6 Main Stats
            null,                                  // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Health % (weapons), Block Rate (armors)', // T0 Main Stats
            '100% block rate',                     // T0 Required Stat Thresholds
            'Block Rate, HP %, HP',                // T0 Sub Stat Priority
            null,                                  // T6 Gear (not specified)
            null,                                  // T6 Main Stats
            null,                                  // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All</p>
            </div>
        `);

        return; // Exit early for Lina
    }

    // Mercure-specific content
    if (heroName === 'Mercure') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Really good in most content. Magic reflux spreads a lot faster when u get him T2 and T6, as well as with spellweaver set.</li>
                <li>Strong with platin in arena cause platin can solo tank and does a lot of aoe damage proccing magic reflux often</li>
                <li>Dont even think about playing him without 3 mages on the team</li>
                <li>Premier nightmare and tower pusher</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',               // T0 Gear
            'All Attack %',                       // T0 Main Stats
            'None, just go for all attack',      // T0 Required Stat Thresholds
            'All Attack %',                       // T0 Sub Stat Priority
            null,                                 // T6 Gear (not specified)
            null,                                 // T6 Main Stats
            null,                                 // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'All Attack %',
                        'Speed, then stack all attack as high as you can',
                        'Speed, All Attack %'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'Push for as much speed as possible',
                        'Speed, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All good but prio passive</p>
            </div>
        `);

        return; // Exit early for Mercure
    }

    // Miho-specific content
    if (heroName === 'Miho') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>T2 for the cleanse is really big for certain castle rushes and advent. Can clear the first 2 waves in CR easily, and magic vuln on her S1 for the boss.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate (weapons), All Attack % (armors)',
                        '100% crit rate',
                        'Crit Rate, Crit Damage, All Attack %'
                    )}
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Magic (Duo carry - need T6 biscuit)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Magic')}" alt="Avenger Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate (weapons), All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">100% crit and as much weakness as u can get</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit, Crit Damage, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Miho
    }

    // Nia-specific content (Fodder)
    if (heroName === 'Nia') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Shes not useless but doesnt really find a place in the meta. Most likely will be phased out entirely after a few more hero releases.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Nia
    }

    // Orly-specific content
    if (heroName === 'Orly') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Solo back liner for mage compositions. T6 makes the mages (especially Silvesta) cracked out the wazoo.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Orchestrator Magic',                 // T0 Gear
            'All Attack % (weapons), Block Rate (armors), Damage Reduction (armors)', // T0 Main Stats
            'As much speed as possible',          // T0 Required Stat Thresholds
            'Speed, All Attack %, Block Rate, Effect Resist', // T0 Sub Stat Priority
            null,                                 // T6 Gear (not specified)
            null,                                 // T6 Main Stats
            null,                                 // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1, Basic Attack</p>
            </div>
        `);

        return; // Exit early for Orly
    }

    // Pascal-specific content
    if (heroName === 'Pascal') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Really need this unit. His kit is self-explanatory. Skill enhances and transcendence are really important.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                       // T0 Gear
            'Crit Rate, Crit Damage, All Attack % (armors)', // T0 Main Stats
            '100% crit rate, 46% weakness if using Biscuit. Dont need weakness if using Asura', // T0 Required Stat Thresholds
            'Crit Rate, Weakness Hit Rate (unless Asura), Crit Damage', // T0 Sub Stat Priority
            'Avenger Magic',                       // T6 Gear
            'Crit Damage (weapons), All Attack % (armors)', // T6 Main Stats
            '46% weakness',                        // T6 Required Stat Thresholds
            'Weakness Hit Rate, Crit Damage, All Attack %' // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All except basic attack</p>
            </div>
        `);

        return; // Exit early for Pascal
    }

    // Platin-specific content
    if (heroName === 'Platin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Can play as solo front line with almost any comp in PVP</li>
                <li>Strong with colt in GvG</li>
                <li>Insanely stat hungry hero, hard to fit speed on him because he needs to be as tanky as possible</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Defense % (weapons), Block Rate (armors), Damage Reduction (one armor, optional)', // T0 Main Stats
            '100% block rate',                     // T0 Required Stat Thresholds
            'Block Rate, Defense %, Health %',     // T0 Sub Stat Priority
            'Gatekeeper Magic',                    // T6 Gear
            'Defense % (weapons), Block Rate (armors), Damage Reduction (one armor, optional)', // T6 Main Stats
            '100% block rate',                     // T6 Required Stat Thresholds
            'Block Rate, Defense %, Health %'      // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Not important but passive can be nice to have</p>
            </div>
        `);

        return; // Exit early for Platin
    }

    // Rachel-specific content
    if (heroName === 'Rachel') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Debuffs can feel OP at times. Pairs very well with Shane for debuff counter</li>
                <li>T6 makes her a dps in castle rush with 3 target hit</li>
            </ul>
        `, heroName);

        // Gear PvE section with T0 and T6
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'Weakness Hit (to hit middle target in castle rush), All Attack % (armors)',
                        '73% Weakness Hit',
                        'Block Rate, Weakness Hit'
                    )}
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'All Attack %, All Attack % (armors), Block Rate (armors)',
                        'None',
                        'Block Rate, All Attack %'
                    )}
                    ${createGearCard(
                        'Avenger Physical',
                        'Crit Rate, Crit Damage, All Attack % (armors)',
                        '100% Crit Rate, as much crit damage as possible',
                        'Crit Rate, Crit Damage, Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Rachel
    }

    // Rin-specific content
    if (heroName === 'Rin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only source of confusion in the game</li>
                <li>Confusion is an incredibly strong opener. Negates enemys effects and lowers their damage.</li>
                <li>Buff removal is really strong to kill heroes with immortality</li>
            </ul>
        `, heroName);

        // Gear PvE section with T0
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Magic',                           // T0 Gear
            'Crit Rate, Weakness Hit, Attack %',        // T0 Main Stats
            '67% crit with 3850 Attack is optimal (she gets more crit based on attack)', // T0 Required Stat Thresholds
            'Crit Rate, Weakness Hit, Attack %',        // T0 Sub Stat Priority
            null,                                        // T6 Gear (not specified)
            null,                                        // T6 Main Stats
            null,                                        // T6 Required Stat Thresholds
            null                                         // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Assassin Magic',                           // T0 Gear
            'Crit Rate, Weakness Hit, Attack %',        // T0 Main Stats
            '67% crit with 3850 Attack is optimal (she gets more crit based on attack)', // T0 Required Stat Thresholds
            'Speed, Crit Rate, Weakness Hit, Attack %', // T0 Sub Stat Priority
            null,                                        // T6 Gear (not specified)
            null,                                        // T6 Main Stats
            null,                                        // T6 Required Stat Thresholds
            null                                         // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Rin
    }

    // Rook-specific content (Fodder)
    if (heroName === 'Rook') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This hero is not worth investing in.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Rook
    }

    // Rudy-specific content
    if (heroName === 'Rudy') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only go for him if ur building tank comp, which is usually for whales.</li>
                <li>U can use him in nightmare if u need the link and/or cleanse</li>
            </ul>
        `, heroName);

        // Gear PvE section - T0 and T6 have same gear
        addHeroSection('Gear PvE', buildGearSection(
            'Orchestrator Physical',                  // T0 Gear
            'Defense % (weapons), Block Rate (armors)', // T0 Main Stats
            '100% Block Rate',                        // T0 Required Stat Thresholds
            'Block Rate, Defense %, Effect Resist',   // T0 Sub Stat Priority
            'Orchestrator Physical',                  // T6 Gear
            'Defense % (weapons), Block Rate (armors)', // T6 Main Stats
            '100% Block Rate',                        // T6 Required Stat Thresholds
            'Block Rate, Defense %, Effect Resist'    // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Rudy
    }

    // Ruri-specific content
    if (heroName === 'Ruri') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Her portrait art, model, and animations are really stupid. Need to buy skin to cover it.</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                          // T0 Gear
            'Crit Rate, Attack % (armors)',          // T0 Main Stats
            '7% weakness (if T2), 46% weakness if not T2, 100% crit rate', // T0 Required Stat Thresholds
            'Crit Rate, Crit Damange, Attack %, Weakness Hit (if not T2)', // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1, S2, Passive</p>
            </div>
        `);

        return; // Exit early for Ruri
    }

    // Yeonhee-specific content
    if (heroName === 'Yeonhee') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Yeonhee is a very strong magic user who can be used in lots of places. She needs 100% crit chance to perform well, substat Crit Damage or Weakness Hit is just bonus damage! She does not have that great of skill enchances nothing to chase over, its better to prioritize other hero skill enhances unless you have most of your important ones out of the way.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Avenger Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 2, Passive, Skill 1, Basic Attack</p>
            </div>
        `);

        return; // Exit early for Yeonhee
    }

    // Yu Shin-specific content
    if (heroName === 'Yu Shin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Very good for locking targets down in both PvP and PVE</li>
                <li>T2 cleanse is really strong but no need to upgrade him more than that.</li>
                <li>Stats dont really matter, since point is to lock down enemy while mercure dot kills</li>
            </ul>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',                      // T0 Gear
            'N/A',                                    // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'None',                                   // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - T0 has 3 gear sets
        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Orchestrator Magic',
                        'N/A (T2 for counter cc/cleanse)',
                        'Speed',
                        'Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Yu Shin
    }

    // Sieg-specific content
    if (heroName === 'Sieg') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Mainly used if u have T6 Biscuit as a 2nd dps for certain fights (dragon and Kris castle rush)</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Gatekeeper Physical',                    // T0 Gear
            'All Attack % (weapons), Block Rate (armors)', // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'All Attack %, Block Rate',              // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - only T6 has data
        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Avenger Physical',
                        'Crit Rate, Weakness Hit, All Attack % (armors)',
                        '19% Weakness Hit Rate, 100% Crit Rate',
                        'Crit Rate, Crit Damage, Weakness Hit, Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Sieg
    }

    // Taka-specific content
    if (heroName === 'Taka') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Can replace him with Kyle early on, but he outscales Kyle later for castle rush. U use both on some.</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',                       // T0 Gear
            'Crit Rate, Attack % (armors)',          // T0 Main Stats
            '100% Crit Rate, 20% Weakness Hit',      // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, Weakness Hit, Attack %', // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, S1, Passive</p>
            </div>
        `);

        return; // Exit early for Taka
    }

    // Teo-specific content
    if (heroName === 'Teo') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>AOE pumper. Will carry you through adventure and a lot of nightmare. Gets outshined by Kyle later on but still good to have for farming</p>
        `, heroName);

        // Gear PvE section - T0 and T6 have different gear
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Physical',                      // T0 Gear
            'Crit Rate, Crit Damage, Attack % (armors)', // T0 Main Stats
            '100% Crit Rate',                         // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, All Attack %',  // T0 Sub Stat Priority
            'Avenger Physical',                       // T6 Gear
            'Crit Damage, Attack % (armors)',        // T6 Main Stats
            'Max crit damage',                        // T6 Required Stat Thresholds
            'Crit Damage, Attack %'                   // T6 Sub Stat Priority
        ));

        // Gear PvP section - T0 and T6 have different gear
        addHeroSection('Gear PvP', buildGearSection(
            'Assassin Physical',                      // T0 Gear
            'Crit Rate, Crit Damage, Attack % (armors)', // T0 Main Stats
            '100% Crit Rate',                         // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, Speed, All Attack %', // T0 Sub Stat Priority
            'Bounty Tracker Physical',                // T6 Gear
            'Weakness Hit, Crit Damage, Attack % (armors)', // T6 Main Stats
            '100% Weakness Hit, pump rest into crit damage', // T6 Required Stat Thresholds
            'Weakness Hit, Crit Damage, Speed, Attack %' // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, S1, Passive</p>
            </div>
        `);

        return; // Exit early for Teo
    }

    // Spike-specific content (Fodder)
    if (heroName === 'Spike') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This hero is not worth investing in.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Spike
    }

    // Bane-specific content (Fodder)
    if (heroName === 'Bane') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Bane
    }

    // Catty-specific content (Fodder)
    if (heroName === 'Catty') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Catty
    }

    // Cleo-specific content (Fodder)
    if (heroName === 'Cleo') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Cleo
    }

    // Sylvia-specific content (Fodder)
    if (heroName === 'Sylvia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Sylvia
    }

    // Heavenia-specific content (Fodder)
    if (heroName === 'Heavenia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Heavenia
    }

    // Hellenia-specific content (Fodder)
    if (heroName === 'Hellenia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Hellenia
    }

    // Lania-specific content (Fodder)
    if (heroName === 'Lania') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Lania
    }

    // May-specific content (Fodder)
    if (heroName === 'May') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for May
    }

    // Hokin-specific content (Fodder)
    if (heroName === 'Hokin') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Hokin
    }

    // Rahkun-specific content (Fodder)
    if (heroName === 'Rahkun') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Rahkun
    }

    // Snipper-specific content (Fodder)
    if (heroName === 'Snipper') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Snipper
    }

    // Default content for heroes without explicit implementations
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

