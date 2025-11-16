// Views.js - View switching and navigation
// This module handles switching between grid, detail, and advent views

import {
    currentView, setCurrentView,
    savedScrollPosition, setSavedScrollPosition,
    savedAdventScrollPosition,
    previousView, referrerPage
} from './state.js';
import {
    setupEffectFilterListeners,
    setupTypeFilterListeners,
    setupTargetFilterListeners
} from './filters.js';

// Update navigation active states
function updateNavActiveState(view) {
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(link => {
        if (link.dataset.view === view) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Ensure Hero Database (main page) always has the nav-link-main class
    const heroLink = document.getElementById('nav-heroes-link');
    if (heroLink && view === 'grid') {
        heroLink.classList.add('nav-link-main', 'active');
    }
}

// Switch between views
export function switchView(view) {
    const gridView = document.getElementById('hero-grid-view');
    const detailView = document.getElementById('hero-detail-view');
    const adventView = document.getElementById('advent-teams-view');
    const teamBuilderView = document.getElementById('team-builder-view');

    if (view === 'detail') {
        gridView.classList.remove('active');
        detailView.classList.add('active');
        adventView.classList.remove('active');
        teamBuilderView.classList.remove('active');
        setCurrentView('detail');
        updateNavActiveState('grid'); // Hero detail is part of hero database
        
        // Remove team builder URL parameters and hash when switching away from team builder
        const urlDetail = new URL(window.location.href);
        if (urlDetail.searchParams.has('teams') || urlDetail.searchParams.has('subject') || urlDetail.hash === '#teams') {
            urlDetail.searchParams.delete('teams');
            urlDetail.searchParams.delete('subject');
            if (urlDetail.hash === '#teams') {
                urlDetail.hash = '';
            }
            window.history.replaceState({}, '', urlDetail.pathname + urlDetail.hash);
        }
        
        // Scroll to top when entering detail view
        window.scrollTo(0, 0);
    } else if (view === 'advent') {
        gridView.classList.remove('active');
        detailView.classList.remove('active');
        adventView.classList.add('active');
        teamBuilderView.classList.remove('active');
        setCurrentView('advent');
        updateNavActiveState('advent');

        // Set URL hash for advent view (preserve boss filter if exists)
        const urlAdvent = new URL(window.location.href);
        urlAdvent.searchParams.delete('teams');
        urlAdvent.searchParams.delete('subject');

        // If there's no hash or it's #teams, set to #advent
        if (!urlAdvent.hash || urlAdvent.hash === '#teams') {
            urlAdvent.hash = '#advent';
        }
        // If hash already starts with #advent, keep it (e.g., #advent-yeonhee)
        window.history.replaceState({}, '', urlAdvent.pathname + urlAdvent.hash);

        // Restore scroll position when returning to advent view
        setTimeout(() => {
            window.scrollTo(0, savedAdventScrollPosition);
        }, 0);
    } else if (view === 'teambuilder') {
        gridView.classList.remove('active');
        detailView.classList.remove('active');
        adventView.classList.remove('active');
        teamBuilderView.classList.add('active');
        setCurrentView('teambuilder');
        updateNavActiveState('teambuilder');
        
        // Set clean URL route for team builder
        // Only set #teams if there are no query parameters (clean base route)
        const url = new URL(window.location.href);
        if (!url.searchParams.has('teams')) {
            window.history.replaceState({}, '', url.pathname + '#teams');
        }
        
        // Scroll to top when entering team builder view
        window.scrollTo(0, 0);
    } else {
        detailView.classList.remove('active');
        adventView.classList.remove('active');
        teamBuilderView.classList.remove('active');
        gridView.classList.add('active');
        setCurrentView('grid');
        updateNavActiveState('grid');
        
        // Remove team builder URL parameters and hash when switching away from team builder
        const url = new URL(window.location.href);
        if (url.searchParams.has('teams') || url.searchParams.has('subject') || url.hash === '#teams') {
            url.searchParams.delete('teams');
            url.searchParams.delete('subject');
            if (url.hash === '#teams') {
                url.hash = '';
            }
            window.history.replaceState({}, '', url.pathname + url.hash);
        }
        
        // Restore scroll position when returning to grid view
        setTimeout(() => {
            window.scrollTo(0, savedScrollPosition);
        }, 0);
    }
}

// Setup event listeners
export function setupEventListeners() {
    // Global Navigation Links
    document.getElementById('nav-heroes-link').addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState({}, '', window.location.pathname);
        switchView('grid');
    });

    document.getElementById('nav-advent-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Save current scroll position before navigating
        setSavedScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        window.history.pushState({}, '', window.location.pathname + '#advent');
        switchView('advent');
    });

    document.getElementById('nav-teams-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Save current scroll position before navigating
        setSavedScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        window.history.pushState({}, '', window.location.pathname + '#teams');
        switchView('teambuilder');
    });

    // Back to Heroes button in hero detail view
    document.getElementById('back-to-heroes').addEventListener('click', (e) => {
        e.preventDefault();

        // Check if user came from guild war teams page
        const referrer = sessionStorage.getItem('heroDetailReferrer');
        if (referrer === 'guild-war-teams') {
            sessionStorage.removeItem('heroDetailReferrer');
            window.location.href = 'guild-war-teams.html';
        } else {
            history.pushState({}, '', window.location.pathname);
            switchView('grid');
        }
    });

    // Boss filter dropdown
    document.getElementById('boss-filter').addEventListener('change', (e) => {
        const selectedBoss = e.target.value;
        const bossSections = document.querySelectorAll('.advent-boss-section');

        // Update URL hash based on selected boss
        const url = new URL(window.location.href);
        if (selectedBoss === 'all') {
            url.hash = '#advent';
        } else {
            url.hash = `#advent-${selectedBoss}`;
        }
        window.history.replaceState({}, '', url.pathname + url.hash);

        // Batch DOM changes using requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            bossSections.forEach(section => {
                if (selectedBoss === 'all') {
                    section.classList.remove('hidden');
                } else {
                    const shouldShow = section.dataset.boss === selectedBoss;
                    section.classList.toggle('hidden', !shouldShow);
                }
            });
        });
    });


    // Searchable effect filter
    setupEffectFilterListeners();

    // Type filter buttons
    setupTypeFilterListeners();

    // Target filter dropdown
    setupTargetFilterListeners();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Press Escape to go back or close dropdowns
        if (e.key === 'Escape') {
            if (currentView === 'detail' || currentView === 'advent' || currentView === 'teambuilder') {
                // Clear hash and query params, then go back
                const url = new URL(window.location.href);
                url.hash = '';
                url.search = '';
                history.pushState({}, '', url.pathname);
                switchView('grid');
            } else {
                const effectDropdown = document.getElementById('effect-dropdown');
                const targetDropdown = document.getElementById('target-dropdown');
                const effectSearchInput = document.getElementById('effect-search-input');
                const targetSearchInput = document.getElementById('target-search-input');
                effectDropdown.classList.remove('show');
                targetDropdown.classList.remove('show');
                if (effectSearchInput && effectSearchInput.setAttribute) {
                    effectSearchInput.setAttribute('aria-expanded', 'false');
                }
                if (targetSearchInput && targetSearchInput.setAttribute) {
                    targetSearchInput.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        const urlParams = new URLSearchParams(window.location.search);

        // Check for team builder route
        if (hash === 'teams' || urlParams.has('teams')) {
            switchView('teambuilder');
        } else if (hash.startsWith('advent')) {
            // Handle advent teams view with optional boss filter
            switchView('advent');

            // Parse boss filter from hash (e.g., #advent-yeonhee)
            const bossMatch = hash.match(/^advent-(.+)$/);
            const bossFilter = document.getElementById('boss-filter');

            if (bossMatch && bossFilter) {
                const bossName = bossMatch[1];
                bossFilter.value = bossName;

                // Trigger filter display update
                const bossSections = document.querySelectorAll('.advent-boss-section');
                requestAnimationFrame(() => {
                    bossSections.forEach(section => {
                        const shouldShow = section.dataset.boss === bossName;
                        section.classList.toggle('hidden', !shouldShow);
                    });
                });
            } else if (bossFilter) {
                // Reset to show all bosses
                bossFilter.value = 'all';
                const bossSections = document.querySelectorAll('.advent-boss-section');
                requestAnimationFrame(() => {
                    bossSections.forEach(section => {
                        section.classList.remove('hidden');
                    });
                });
            }
        } else if (hash) {
            // If there's a hash, decode and show that hero
            const heroName = decodeURIComponent(hash);
            // Import heroes to validate
            import('./constants.js').then(({ heroes }) => {
                if (heroes.includes(heroName)) {
                    import('./hero-detail.js').then(({ showHeroDetail }) => {
                        showHeroDetail(heroName);
                        switchView('detail');
                    });
                } else {
                    // Invalid hero, go back to grid
                    switchView('grid');
                }
            });
        } else {
            // No hash means we're going back to grid
            switchView('grid');
        }
    });
}
