// Hero-grid.js - Hero grid view rendering
// This module handles rendering the hero grid with cards

import { heroes } from './constants.js';
import {
    searchQuery, selectedEffect, selectedType, selectedTarget,
    heroData, setSavedScrollPosition, setPreviousView
} from './state.js';
import { getHeroImagePath, getTypeIconPath } from './utils.js';
import { showHeroDetail } from './hero-detail.js';
import { switchView } from './views.js';

// Render the hero grid
export function renderHeroGrid() {
    const grid = document.getElementById('heroes-grid');
    grid.innerHTML = '';

    const filteredHeroes = heroes.filter(hero => {
        // Filter by search query
        const matchesSearch = hero.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by selected effect
        let matchesEffect = true;
        if (selectedEffect) {
            const data = heroData[hero];
            matchesEffect = data && data.effects && data.effects.includes(selectedEffect);
        }

        // Filter by selected type
        let matchesType = true;
        if (selectedType) {
            const data = heroData[hero];
            matchesType = data && data.type === selectedType;
        }

        // Filter by selected target
        let matchesTarget = true;
        if (selectedTarget) {
            const data = heroData[hero];
            matchesTarget = data && data.target_number === selectedTarget;
        }

        return matchesSearch && matchesEffect && matchesType && matchesTarget;
    });

    filteredHeroes.forEach(hero => {
        const card = createHeroCard(hero);
        grid.appendChild(card);
    });

    // Show empty state if no results
    if (filteredHeroes.length === 0) {
        grid.innerHTML = '<div class="section-placeholder" style="grid-column: 1 / -1;">No heroes found matching your filters</div>';
    }
}

// Create a hero card element
function createHeroCard(heroName) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'hero-card';
    card.setAttribute('aria-label', `View details for ${heroName}`);
    card.addEventListener('click', () => {
        // Save grid view scroll position before navigating
        setSavedScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        setPreviousView('grid'); // Save that we came from grid view

        // Update URL with hero name
        const heroHash = encodeURIComponent(heroName);
        history.pushState({ hero: heroName }, '', `#${heroHash}`);

        showHeroDetail(heroName);
        switchView('detail');
    });

    const heroInfo = heroData[heroName];
    if (heroInfo && heroInfo.type) {
        const normalizedType = heroInfo.type.trim().toLowerCase();
        card.dataset.heroType = normalizedType;
    }

    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image-container';

    const img = document.createElement('img');
    img.className = 'hero-image';
    img.src = getHeroImagePath(heroName);
    img.alt = heroName;
    img.loading = 'lazy';

    // Add type icon badge (top-left corner)
    if (heroInfo && heroInfo.type) {
        const typeIconBadge = document.createElement('div');
        typeIconBadge.className = 'type-icon-badge';
        const typeIcon = document.createElement('img');
        typeIcon.src = getTypeIconPath(heroInfo.type);
        typeIcon.alt = heroInfo.type;
        typeIconBadge.appendChild(typeIcon);
        imageContainer.appendChild(typeIconBadge);
    }

    // Add rarity badge (top-right corner)
    if (heroInfo && heroInfo.rarity) {
        const rarityBadge = document.createElement('div');
        rarityBadge.className = `rarity-badge rarity-${heroInfo.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        rarityBadge.textContent = heroInfo.rarity;
        imageContainer.appendChild(rarityBadge);
    }

    const name = document.createElement('div');
    name.className = 'hero-name';
    name.textContent = heroName;

    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);

    return card;
}
