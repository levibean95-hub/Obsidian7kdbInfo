// State.js - Application state management
// This module contains all global state variables

// View state
export let currentView = 'grid';
export let selectedHero = null;
export let previousView = 'grid'; // Track which view to return to from detail view
export let referrerPage = null; // Track if we came from external page (e.g., wish-list.html)

// Filter state
export let searchQuery = '';
export let selectedEffect = '';
export let selectedType = '';
export let selectedTarget = '';

// Scroll positions
export let savedScrollPosition = 0;
export let savedAdventScrollPosition = 0;

// Data storage
export let heroData = {}; // Stores hero data including effects, type, and target_number
export let allEffects = new Set(); // Stores all unique effects
export let allTargets = new Set(); // Stores all unique target numbers
export let adventTeamsData = {}; // Stores advent teams data

// State setters
export function setCurrentView(view) {
    currentView = view;
}

export function setSelectedHero(hero) {
    selectedHero = hero;
}

export function setPreviousView(view) {
    previousView = view;
}

export function setReferrerPage(page) {
    referrerPage = page;
}

export function setSearchQuery(query) {
    searchQuery = query;
}

export function setSelectedEffect(effect) {
    selectedEffect = effect;
}

export function setSelectedType(type) {
    selectedType = type;
}

export function setSelectedTarget(target) {
    selectedTarget = target;
}

export function setSavedScrollPosition(position) {
    savedScrollPosition = position;
}

export function setSavedAdventScrollPosition(position) {
    savedAdventScrollPosition = position;
}

export function setHeroData(data) {
    heroData = data;
}

export function setAllEffects(effects) {
    allEffects = effects;
}

export function setAllTargets(targets) {
    allTargets = targets;
}

export function setAdventTeamsData(data) {
    adventTeamsData = data;
}
