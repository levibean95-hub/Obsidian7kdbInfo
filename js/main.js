// Main.js - Application initialization
// This is the entry point that initializes the entire application

import { heroes } from './constants.js';
import { setReferrerPage, setSearchQuery } from './state.js';
import { loadAllData } from './data-loader.js';
import { renderHeroGrid } from './hero-grid.js';
import { populateEffectFilter, populateTargetFilter } from './filters.js';
import { populateAdventTeams } from './advent-teams.js';
import { setupEventListeners, switchView } from './views.js';
import { showHeroDetail } from './hero-detail.js';
import { initializeTeamBuilder } from './team-builder.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Always start at the top on page load/refresh
    window.scrollTo(0, 0);

    // Check for referrer page before dropping query params
    const initialUrl = new URL(window.location.href);
    if (initialUrl.searchParams.has('from')) {
        setReferrerPage(initialUrl.searchParams.get('from'));
        // Drop helper query params (e.g., from=wishlist) to avoid trapping navigation
        initialUrl.searchParams.delete('from');
        const cleanedSearch = initialUrl.searchParams.toString();
        const newUrl = `${initialUrl.pathname}${cleanedSearch ? `?${cleanedSearch}` : ''}${initialUrl.hash}`;
        history.replaceState({}, '', newUrl);
    }

    // Load all data from JSON files
    console.log('Loading application data...');
    const dataLoaded = await loadAllData();

    if (!dataLoaded) {
        console.error('Failed to load application data');
        alert('Failed to load hero data. Please refresh the page.');
        return;
    }

    console.log('Data loaded successfully. Initializing UI...');

    // Initialize the UI
    renderHeroGrid();
    populateEffectFilter();
    populateTargetFilter();
    populateAdventTeams();
    initializeTeamBuilder();
    setupEventListeners();

    // Setup search listener (must be after setupEventListeners)
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        setSearchQuery(e.target.value);
        renderHeroGrid();
    });

    // Check for URL hash first (for routing)
    const hash = window.location.hash.substring(1); // Remove the # symbol

    // Check for team builder route (#teams)
    if (hash === 'teams') {
        // Switch to team builder view
        setTimeout(() => {
            switchView('teambuilder');
        }, 100);
    }
    // Check for URL query parameters (team builder with shared teams)
    else if (window.location.search.includes('teams=')) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('teams')) {
            // Switch to team builder view if teams parameter exists
            setTimeout(() => {
                switchView('teambuilder');
            }, 100);
        }
    }
    // Check for advent teams route (#advent or #advent-<boss>)
    else if (hash.startsWith('advent')) {
        // Parse boss filter from hash (e.g., #advent-yeonhee)
        const bossMatch = hash.match(/^advent-(.+)$/);

        setTimeout(() => {
            switchView('advent');

            if (bossMatch) {
                const bossName = bossMatch[1];
                const bossFilter = document.getElementById('boss-filter');

                if (bossFilter) {
                    bossFilter.value = bossName;

                    // Trigger filter display update
                    const bossSections = document.querySelectorAll('.advent-boss-section');
                    requestAnimationFrame(() => {
                        bossSections.forEach(section => {
                            const shouldShow = section.dataset.boss === bossName;
                            section.classList.toggle('hidden', !shouldShow);
                        });
                    });
                }
            }
        }, 100);
    }
    // Check for hero hash
    else if (hash) {
        // Decode URI component in case hero name has spaces
        const heroName = decodeURIComponent(hash);
        if (heroes.includes(heroName)) {
            // Set history state for proper back button behavior
            history.replaceState({ hero: heroName }, '', `#${encodeURIComponent(heroName)}`);
            // Use setTimeout to ensure DOM is fully ready
            setTimeout(() => {
                showHeroDetail(heroName);
                switchView('detail');
            }, 100);
        } else {
            // Invalid hero in URL, clear the hash
            history.replaceState({}, '', window.location.pathname);
            // Ensure grid view is shown
            switchView('grid');
        }
    } else {
        // No URL parameters or hash - ensure grid view is shown (default)
        switchView('grid');
    }

    console.log('Application initialized successfully');
});
