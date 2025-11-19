// Utils.js - Utility helper functions
// This module contains all helper/utility functions used throughout the application

import {
    HERO_PORTRAITS_PATH,
    HERO_MODELS_PATH,
    PET_ICONS_PATH,
    PLACEHOLDER_VALUE_REGEX,
    ADVENT_PLACEHOLDER_NAME_REGEX
} from './constants.js';

// Helper function to get properly encoded image path
export function getHeroImagePath(heroName, useModel = false) {
    // Use model for detail view, portrait for grid
    const folderPath = encodeURI(useModel ? HERO_MODELS_PATH : HERO_PORTRAITS_PATH);
    const fileName = encodeURIComponent(heroName) + '.png';
    return folderPath + fileName;
}

// Map hero type to type icon path
export function getTypeIconPath(type) {
    const typeIconMap = {
        'Attack': 'Type Icons/type_1_attack.png',
        'Magic': 'Type Icons/type_2_magic.png',
        'Defense': 'Type Icons/type_3_defense.png',
        'Support': 'Type Icons/type_4_support.png',
        'Universal': 'Type Icons/type_5_universal.png'
    };
    return typeIconMap[type] || '';
}

// Helper function to get pet icon path
export function getPetIconPath(petName) {
    if (!petName || petName === '---' || petName === 'placeholder') {
        return null;
    }
    const folderPath = encodeURI(PET_ICONS_PATH);
    const fileName = encodeURIComponent(petName) + '.png';
    return folderPath + fileName;
}

// Check if a value is a placeholder
export function isPlaceholderValue(value) {
    return !value || PLACEHOLDER_VALUE_REGEX.test(value);
}

// Check if a team is a placeholder team
export function isPlaceholderTeam(team) {
    if (!team || !Array.isArray(team.heroes)) {
        return true;
    }
    // Check if any hero name is a placeholder
    return team.heroes.some(hero => hero.name === '---' || ADVENT_PLACEHOLDER_NAME_REGEX.test(hero.name));
}
