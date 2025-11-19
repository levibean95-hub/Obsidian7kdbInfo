// Data-loader.js - Load and process hero and advent data
// This module handles loading data from JSON files and processing it

import { setHeroData, setAllEffects, setAllTargets, setAdventTeamsData } from './state.js';

// Load hero data from JSON file
export async function loadHeroData() {
    try {
        const response = await fetch('data/hero-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load hero data: ${response.status}`);
        }
        const data = await response.json();

        // Process and store the data
        setHeroData(data);

        // Extract all unique effects and targets
        const effects = new Set();
        const targets = new Set();

        Object.values(data).forEach(hero => {
            if (hero.effects && Array.isArray(hero.effects)) {
                hero.effects.forEach(effect => {
                    if (effect && !effect.includes('[To be filled') && !effect.includes('TBD')) {
                        effects.add(effect);
                    }
                });
            }
            if (hero.target_number && !hero.target_number.includes('[To be filled') && !hero.target_number.includes('TBD')) {
                targets.add(hero.target_number);
            }
        });

        setAllEffects(effects);
        setAllTargets(targets);

        return data;
    } catch (error) {
        console.error('Error loading hero data:', error);
        throw error;
    }
}

// Load advent teams data from JSON file
export async function loadAdventTeamsData() {
    try {
        const response = await fetch('data/advent-teams-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load advent teams data: ${response.status}`);
        }
        const data = await response.json();
        setAdventTeamsData(data);
        return data;
    } catch (error) {
        console.error('Error loading advent teams data:', error);
        throw error;
    }
}

// Load all data
export async function loadAllData() {
    try {
        await Promise.all([
            loadHeroData(),
            loadAdventTeamsData()
        ]);
        return true;
    } catch (error) {
        console.error('Error loading application data:', error);
        return false;
    }
}
