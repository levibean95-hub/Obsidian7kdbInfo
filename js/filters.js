// Filters.js - Filter and search functionality
// This module handles all filtering logic for heroes (search, effects, types, targets)

import {
    searchQuery, setSearchQuery,
    selectedEffect, setSelectedEffect,
    selectedType, setSelectedType,
    selectedTarget, setSelectedTarget,
    allEffects, allTargets
} from './state.js';
import { renderHeroGrid } from './hero-grid.js';

// Populate the effect filter dropdown
export function populateEffectFilter() {
    const effectDropdown = document.getElementById('effect-dropdown');

    // Sort effects alphabetically
    const sortedEffects = Array.from(allEffects).sort();

    console.log(`Populating effect filter with ${sortedEffects.length} effects:`, sortedEffects);

    // Keep the "All Effects" option and clear the rest
    effectDropdown.innerHTML = '';
    const defaultOption = document.createElement('div');
    defaultOption.className = `effect-option${selectedEffect ? '' : ' selected'}`;
    defaultOption.setAttribute('data-value', '');
    defaultOption.setAttribute('role', 'option');
    defaultOption.setAttribute('aria-selected', selectedEffect ? 'false' : 'true');
    defaultOption.textContent = 'All Effects';
    effectDropdown.appendChild(defaultOption);

    // Add each effect as an option
    sortedEffects.forEach(effect => {
        const option = document.createElement('div');
        option.className = 'effect-option';
        option.setAttribute('data-value', effect);
        option.textContent = effect;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', effect === selectedEffect ? 'true' : 'false');
        if (effect === selectedEffect) {
            option.classList.add('selected');
        }
        effectDropdown.appendChild(option);
    });

    if (sortedEffects.length === 0) {
        console.warn('No effects found to populate the filter dropdown. Check if hero data files are loading correctly.');
    }
}

// Populate the target filter dropdown
export function populateTargetFilter() {
    const targetDropdown = document.getElementById('target-dropdown');

    // Sort targets in a specific order
    const targetOrder = ['Single Enemy', '3 Enemies', '4 Enemies', 'All Enemies'];
    const sortedTargets = Array.from(allTargets).sort((a, b) => {
        const indexA = targetOrder.indexOf(a);
        const indexB = targetOrder.indexOf(b);
        const safeA = indexA === -1 ? targetOrder.length : indexA;
        const safeB = indexB === -1 ? targetOrder.length : indexB;
        if (safeA !== safeB) {
            return safeA - safeB;
        }
        return a.localeCompare(b);
    });

    console.log(`Populating target filter with ${sortedTargets.length} targets:`, sortedTargets);

    // Keep the "All Targets" option and clear the rest
    targetDropdown.innerHTML = '';
    const defaultOption = document.createElement('div');
    defaultOption.className = `effect-option${selectedTarget ? '' : ' selected'}`;
    defaultOption.setAttribute('data-value', '');
    defaultOption.setAttribute('role', 'option');
    defaultOption.setAttribute('aria-selected', selectedTarget ? 'false' : 'true');
    defaultOption.textContent = 'All Targets';
    targetDropdown.appendChild(defaultOption);

    // Add each target as an option
    sortedTargets.forEach(target => {
        const option = document.createElement('div');
        option.className = 'effect-option';
        option.setAttribute('data-value', target);
        option.textContent = target;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', target === selectedTarget ? 'true' : 'false');
        if (target === selectedTarget) {
            option.classList.add('selected');
        }
        targetDropdown.appendChild(option);
    });

    if (sortedTargets.length === 0) {
        console.warn('No targets found to populate the filter dropdown.');
    }
}

// Update combobox expanded state
function updateComboboxExpandedState(input, isExpanded) {
    if (!input) return;
    input.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
}

// Toggle dropdown empty state
function toggleDropdownEmptyState(dropdown, hasMatches, message) {
    if (!dropdown) return;
    let emptyState = dropdown.querySelector('.dropdown-empty');
    if (!hasMatches) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'dropdown-empty';
            emptyState.setAttribute('role', 'status');
            emptyState.textContent = message;
            dropdown.appendChild(emptyState);
        }
    } else if (emptyState) {
        emptyState.remove();
    }
}

// Filter effect options based on search term
function filterEffectOptions(searchTerm) {
    const dropdown = document.getElementById('effect-dropdown');
    const options = dropdown.querySelectorAll('.effect-option');
    let matchingOptions = 0;

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const value = option.getAttribute('data-value');

        // Always show "All Effects" option
        if (value === '') {
            option.classList.remove('hidden');
        } else if (text.includes(searchTerm)) {
            option.classList.remove('hidden');
            matchingOptions++;
        } else {
            option.classList.add('hidden');
        }
    });

    // Show dropdown if there are visible options
    toggleDropdownEmptyState(dropdown, matchingOptions > 0, 'No effects match your search');
    if (matchingOptions === 0) {
        dropdown.classList.add('show');
    }
}

// Select an effect
function selectEffect(value, displayText) {
    const effectSearchInput = document.getElementById('effect-search-input');
    const effectDropdown = document.getElementById('effect-dropdown');
    const clearBtn = document.getElementById('clear-effect-btn');
    const options = document.querySelectorAll('#effect-dropdown .effect-option');

    // Update selected effect
    setSelectedEffect(value);

    // Update input display
    effectSearchInput.value = value ? displayText : '';
    effectSearchInput.placeholder = 'Filter by Effect...';

    // Show/hide clear button
    if (value) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }

    // Update selected class on options
    options.forEach(opt => {
        if (opt.getAttribute('data-value') === value) {
            opt.classList.add('selected');
            opt.setAttribute('aria-selected', 'true');
        } else {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
        }
    });

    // Close dropdown
    effectDropdown.classList.remove('show');
    updateComboboxExpandedState(effectSearchInput, false);

    // Render filtered heroes
    renderHeroGrid();
}

// Setup effect filter listeners
export function setupEffectFilterListeners() {
    const effectSearchInput = document.getElementById('effect-search-input');
    const effectDropdown = document.getElementById('effect-dropdown');
    const clearBtn = document.getElementById('clear-effect-btn');
    const openDropdown = () => {
        effectDropdown.classList.add('show');
        updateComboboxExpandedState(effectSearchInput, true);
    };

    // Show dropdown when input is focused or clicked
    effectSearchInput.addEventListener('focus', () => {
        openDropdown();
        filterEffectOptions(''); // Show all options
    });

    effectSearchInput.addEventListener('click', () => {
        openDropdown();
    });

    // Filter options as user types
    effectSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        openDropdown();
        filterEffectOptions(searchTerm);
    });

    // Handle clicking on effect options
    effectDropdown.addEventListener('click', (e) => {
        const option = e.target.closest('.effect-option');
        if (option) {
            const value = option.getAttribute('data-value');
            selectEffect(value, option.textContent);
        }
    });

    // Clear button
    clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectEffect('', 'Filter by Effect...');
        effectSearchInput.focus();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.effect-filter-container')) {
            effectDropdown.classList.remove('show');
            updateComboboxExpandedState(effectSearchInput, false);
        }
    });
}

// Setup type filter button listeners
export function setupTypeFilterListeners() {
    const typeButtons = document.querySelectorAll('.type-filter-button');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Update selected type
            setSelectedType(button.getAttribute('data-type'));

            // Render filtered heroes
            renderHeroGrid();
        });
    });
}

// Filter target options based on search term
function filterTargetOptions(searchTerm) {
    const dropdown = document.getElementById('target-dropdown');
    const options = dropdown.querySelectorAll('.effect-option');
    let matchingOptions = 0;

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const value = option.getAttribute('data-value');

        // Always show "All Targets" option
        if (value === '') {
            option.classList.remove('hidden');
        } else if (text.includes(searchTerm)) {
            option.classList.remove('hidden');
            matchingOptions++;
        } else {
            option.classList.add('hidden');
        }
    });

    // Show dropdown if there are visible options
    toggleDropdownEmptyState(dropdown, matchingOptions > 0, 'No targets match your search');
    if (matchingOptions === 0) {
        dropdown.classList.add('show');
    }
}

// Select a target
function selectTarget(value, displayText) {
    const targetSearchInput = document.getElementById('target-search-input');
    const targetDropdown = document.getElementById('target-dropdown');
    const clearBtn = document.getElementById('clear-target-btn');
    const options = document.querySelectorAll('#target-dropdown .effect-option');

    // Update selected target
    setSelectedTarget(value);

    // Update input display
    targetSearchInput.value = value ? displayText : '';
    targetSearchInput.placeholder = 'Filter by Target...';

    // Show/hide clear button
    if (value) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }

    // Update selected class on options
    options.forEach(opt => {
        if (opt.getAttribute('data-value') === value) {
            opt.classList.add('selected');
            opt.setAttribute('aria-selected', 'true');
        } else {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
        }
    });

    // Close dropdown
    targetDropdown.classList.remove('show');
    updateComboboxExpandedState(targetSearchInput, false);

    // Render filtered heroes
    renderHeroGrid();
}

// Setup target filter listeners
export function setupTargetFilterListeners() {
    const targetSearchInput = document.getElementById('target-search-input');
    const targetDropdown = document.getElementById('target-dropdown');
    const clearBtn = document.getElementById('clear-target-btn');
    const openDropdown = () => {
        targetDropdown.classList.add('show');
        updateComboboxExpandedState(targetSearchInput, true);
    };

    // Show dropdown when input is focused or clicked
    targetSearchInput.addEventListener('focus', () => {
        openDropdown();
        filterTargetOptions(''); // Show all options
    });

    targetSearchInput.addEventListener('click', () => {
        openDropdown();
    });

    // Filter options as user types
    targetSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        openDropdown();
        filterTargetOptions(searchTerm);
    });

    // Handle clicking on target options
    targetDropdown.addEventListener('click', (e) => {
        const option = e.target.closest('.effect-option');
        if (option) {
            const value = option.getAttribute('data-value');
            selectTarget(value, option.textContent);
        }
    });

    // Clear button
    clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectTarget('', 'Filter by Target...');
        targetSearchInput.focus();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.target-filter-container')) {
            targetDropdown.classList.remove('show');
            updateComboboxExpandedState(targetSearchInput, false);
        }
    });
}
