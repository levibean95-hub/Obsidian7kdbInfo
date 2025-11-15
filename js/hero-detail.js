// Hero Detail Module
// Handles displaying individual hero information and metadata

import { HERO_PORTRAIT_FALLBACK } from './constants.js';
import { heroData, setSelectedHero, setSavedScrollPosition } from './state.js';
import { getHeroImagePath, getTypeIconPath } from './utils.js';
import { clearHeroSections, populateHeroSections } from './gear-builder.js';

/**
 * Display hero detail view with all metadata and sections
 * @param {string} heroName - Name of the hero to display
 */
export function showHeroDetail(heroName) {
    setSelectedHero(heroName);

    // Save current scroll position before switching views
    setSavedScrollPosition(window.scrollY || window.pageYOffset);

    // Update detail view content
    document.getElementById('detail-hero-name').textContent = heroName;
    const detailHeroImage = document.getElementById('detail-hero-image');
    const portraitSrc = getHeroImagePath(heroName, false);
    detailHeroImage.alt = heroName;
    detailHeroImage.onerror = () => {
        detailHeroImage.onerror = null;
        detailHeroImage.src = HERO_PORTRAIT_FALLBACK;
    };
    detailHeroImage.src = portraitSrc; // Match hero grid imagery

    // Populate portrait card badges
    const data = heroData[heroName];
    if (data) {
        // Set type badge
        if (data.type) {
            const typeIconPath = getTypeIconPath(data.type);
            const detailTypeIcon = document.getElementById('detail-type-icon');
            const detailTypeBadge = document.getElementById('detail-type-badge');

            detailTypeIcon.src = typeIconPath;
            detailTypeIcon.alt = data.type;
            detailTypeBadge.style.display = typeIconPath ? 'flex' : 'none';
        }

        // Set rarity badge
        if (data.rarity) {
            const rarityBadge = document.getElementById('detail-rarity-badge');
            rarityBadge.textContent = data.rarity;
            rarityBadge.className = `rarity-badge rarity-${data.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        }
    }

    // Reset meta information
    document.getElementById('hero-type-text').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-type-icon').style.display = 'none';
    document.getElementById('hero-target-number').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-role').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-primary-content').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-target-transcendence').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-wishlist-priority').innerHTML = '<em>To be added</em>';

    // Populate Type and Target Number from hero data
    if (data) {
        if (data.type) {
            const typeIconPath = getTypeIconPath(data.type);
            const heroTypeIcon = document.getElementById('hero-type-icon');
            const heroTypeText = document.getElementById('hero-type-text');

            heroTypeIcon.src = typeIconPath;
            heroTypeIcon.alt = data.type;
            heroTypeIcon.style.display = typeIconPath ? 'block' : 'none';
            heroTypeText.textContent = data.type;
        }
        if (data.target_number) {
            document.getElementById('hero-target-number').textContent = data.target_number;
        }
    }

    // Update meta information for specific heroes
    updateHeroMetaInformation(heroName);

    // Clear and populate hero sections
    clearHeroSections();
    populateHeroSections(heroName);

    // Note: View switching is handled by the caller (hero-grid.js or advent-teams.js)
}

/**
 * Update hero meta information (role, content, transcendence, etc.)
 * @param {string} heroName - Name of the hero
 */
export function updateHeroMetaInformation(heroName) {
    const data = heroData[heroName];

    // Pull metadata from JSON if available
    if (data) {
        if (data.role) {
            document.getElementById('hero-role').textContent = data.role;
        }
        if (data.primary_content) {
            document.getElementById('hero-primary-content').textContent = data.primary_content;
        }
        if (data.target_transcendence) {
            document.getElementById('hero-target-transcendence').textContent = data.target_transcendence;
        }
        if (data.wishlist_priority) {
            document.getElementById('hero-wishlist-priority').textContent = data.wishlist_priority;
        }
    }

    // Legacy hardcoded fallback (only used if JSON data is missing)
    // This preserves existing data for heroes not yet added to hero-data.json
    if (!data || !data.role) {
        updateLegacyMetaInformation(heroName);
    }
}

/**
 * Legacy hardcoded meta information fallback
 * @param {string} heroName - Name of the hero
 */
function updateLegacyMetaInformation(heroName) {
    if (heroName === 'Amelia') {
        document.getElementById('hero-role').textContent = 'Support, Buffs, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Ace') {
        document.getElementById('hero-role').textContent = 'Support/Debuffs';
        document.getElementById('hero-primary-content').textContent = 'Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Alice') {
        document.getElementById('hero-role').textContent = 'Healer';
        document.getElementById('hero-primary-content').textContent = 'Arena, Total War, GvG (Situational)';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Aragon') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Aquila') {
        document.getElementById('hero-role').textContent = 'Support/Tank';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War (Death comps)';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Low (high if you\'re a death comp freak)';
    } else if (heroName === 'Ballista') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Bi Dam') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very low';
    } else if (heroName === 'Biscuit') {
        document.getElementById('hero-role').textContent = 'Support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Advent, Nightmare Pushing';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'VERY high';
    } else if (heroName === 'Chancellor') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'GvG';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Dont';
    } else if (heroName === 'Colt') {
        document.getElementById('hero-role').textContent = 'Support, DPS, Counter CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Daisy') {
        document.getElementById('hero-role').textContent = 'Petrify Immunity';
        document.getElementById('hero-primary-content').textContent = 'Raid';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Dellons') {
        document.getElementById('hero-role').textContent = 'DPS, Support';
        document.getElementById('hero-primary-content').textContent = 'Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Eileene') {
        document.getElementById('hero-role').textContent = 'CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Nightmare, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Espada') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Raid';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Fai') {
        document.getElementById('hero-role').textContent = 'Dps, Support, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'Arena, Nightmare, Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0 (T6 goes crazy but lets be real here)';
        document.getElementById('hero-wishlist-priority').textContent = 'N/A';
    } else if (heroName === 'Jave') {
        document.getElementById('hero-role').textContent = 'DPS, CC';
        document.getElementById('hero-primary-content').textContent = 'Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very low';
    } else if (heroName === 'Juri') {
        document.getElementById('hero-role').textContent = 'Support, DPS, Debuff';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Nightmare, Total War, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0';
        document.getElementById('hero-wishlist-priority').textContent = 'N/A';
    } else if (heroName === 'Vanessa') {
        document.getElementById('hero-role').textContent = 'Support, Buffs, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High (High is you are looking for the best utility unit in the game, the higher transcendence the more utility)';
    } else if (heroName === 'Kagura') {
        document.getElementById('hero-role').textContent = 'Support/Debuffs/CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Karma') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Total War, Arena';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Klahan') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'Being fodder (nightmare farming is ok)';
        document.getElementById('hero-target-transcendence').textContent = 'Fodder';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Knox') {
        document.getElementById('hero-role').textContent = 'Tank/Death';
        document.getElementById('hero-primary-content').textContent = 'Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Do Not';
    } else if (heroName === 'Kyle') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Everything...';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Kris') {
        document.getElementById('hero-role').textContent = 'Death';
        document.getElementById('hero-primary-content').textContent = 'Total War, Arena, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Very Low';
    } else if (heroName === 'Platin') {
        document.getElementById('hero-role').textContent = 'Tank';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Rachel') {
        document.getElementById('hero-role').textContent = 'Debuff Support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Advent Expedition';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Rin') {
        document.getElementById('hero-role').textContent = 'DPS, Debuff';
        document.getElementById('hero-primary-content').textContent = 'Arena, Total War, GvG, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Rook') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Rudy') {
        document.getElementById('hero-role').textContent = 'Tank, Support';
        document.getElementById('hero-primary-content').textContent = 'Nightmare, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Ruri') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Pascal') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Raid, Nightmare (niche), Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Orly') {
        document.getElementById('hero-role').textContent = 'Support';
        document.getElementById('hero-primary-content').textContent = 'GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Nia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'Fodder';
        document.getElementById('hero-target-transcendence').textContent = 'Fodder';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Miho') {
        document.getElementById('hero-role').textContent = 'Support, sub-dps';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2 (T6 is fine but T2 is the biggest)';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Mercure') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Nightmare, Arena, Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Lina') {
        document.getElementById('hero-role').textContent = 'Healer/Buffer';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Nightmare, Total War, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Kyrielle') {
        document.getElementById('hero-role').textContent = 'DPS, Counter CC, CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War, Advent Expedition';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Yeonhee') {
        document.getElementById('hero-role').textContent = 'DPS, Counter CC, CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare, Advent Expedition, Castle Rush';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Yu Shin') {
        document.getElementById('hero-role').textContent = 'CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Sieg') {
        document.getElementById('hero-role').textContent = 'DPS, support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Taka') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Teo') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Arena, Nightmare, GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High (N/A if u pull him from welcome banner, which you should)';
    } else if (heroName === 'Spike') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Bane') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Catty') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Cleo') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Sylvia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Heavenia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Hellenia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Lania') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'May') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Hokin') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Rahkun') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Snipper') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    }
}
