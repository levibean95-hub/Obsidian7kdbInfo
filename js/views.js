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
        
        // Remove team builder URL parameters and hash when switching away from team builder
        const urlAdvent = new URL(window.location.href);
        if (urlAdvent.searchParams.has('teams') || urlAdvent.searchParams.has('subject') || urlAdvent.hash === '#teams') {
            urlAdvent.searchParams.delete('teams');
            urlAdvent.searchParams.delete('subject');
            if (urlAdvent.hash === '#teams') {
                urlAdvent.hash = '';
            }
            window.history.replaceState({}, '', urlAdvent.pathname + urlAdvent.hash);
        }
        
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
    // Back button (from hero detail)
    document.getElementById('back-button').addEventListener('click', () => {
        // If we came from an external page (like wish-list), navigate back to it
        if (referrerPage === 'wishlist') {
            window.location.href = 'wish-list.html';
        } else {
            // Clear the URL hash and go back
            history.pushState({}, '', window.location.pathname);
            // Otherwise, return to the previous view (grid or advent)
            switchView(previousView === 'advent' ? 'advent' : 'grid');
        }
    });

    // Back button (from advent teams)
    document.getElementById('advent-back-button').addEventListener('click', () => {
        // Clear the URL hash
        history.pushState({}, '', window.location.pathname);
        switchView('grid');
    });

    // Boss filter dropdown
    document.getElementById('boss-filter').addEventListener('change', (e) => {
        const selectedBoss = e.target.value;
        const bossSections = document.querySelectorAll('.advent-boss-section');

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

    // Advent Teams link
    document.getElementById('advent-teams-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Save current scroll position before navigating
        setSavedScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        switchView('advent');
    });

    // Team Builder link
    document.getElementById('team-builder-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Save current scroll position before navigating
        setSavedScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
        // Navigate to clean team builder route
        window.history.pushState({}, '', window.location.pathname + '#teams');
        switchView('teambuilder');
    });

    // Team Builder back button
    document.getElementById('team-builder-back-button').addEventListener('click', () => {
        // Clear the URL hash and query params
        const url = new URL(window.location.href);
        url.hash = '';
        url.search = '';
        history.pushState({}, '', url.pathname);
        switchView('grid');
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
