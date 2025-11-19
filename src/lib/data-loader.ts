// Data-loader.ts - Load and process hero and advent data
// This module handles loading data from JSON files and processing it

import type { HeroDataMap, AdventTeamsData, GuildWarTeamsData } from './types';

// Load hero data from JSON file
export async function loadHeroData(): Promise<HeroDataMap> {
    try {
        const response = await fetch('/data/hero-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load hero data: ${response.status}`);
        }
        const data = await response.json() as HeroDataMap;
        return data;
    } catch (error) {
        console.error('Error loading hero data:', error);
        throw error;
    }
}

// Load advent teams data from JSON file
export async function loadAdventTeamsData(): Promise<AdventTeamsData> {
    try {
        const response = await fetch('/data/advent-teams-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load advent teams data: ${response.status}`);
        }
        const data = await response.json() as AdventTeamsData;
        return data;
    } catch (error) {
        console.error('Error loading advent teams data:', error);
        throw error;
    }
}

// Extract all unique effects from hero data
export function extractEffects(heroData: HeroDataMap): Set<string> {
    const effects = new Set<string>();
    Object.values(heroData).forEach(hero => {
        if (hero.effects && Array.isArray(hero.effects)) {
            hero.effects.forEach(effect => {
                if (effect && !effect.includes('[To be filled') && !effect.includes('TBD')) {
                    effects.add(effect);
                }
            });
        }
    });
    return effects;
}

// Extract all unique targets from hero data
export function extractTargets(heroData: HeroDataMap): Set<string> {
    const targets = new Set<string>();
    Object.values(heroData).forEach(hero => {
        if (hero.target_number && !hero.target_number.includes('[To be filled') && !hero.target_number.includes('TBD')) {
            targets.add(hero.target_number);
        }
    });
    return targets;
}

// Load guild war teams data from JSON file
export async function loadGuildWarTeamsData(): Promise<GuildWarTeamsData> {
    try {
        const response = await fetch('/data/guild-war-teams-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load guild war teams data: ${response.status}`);
        }
        const data = await response.json() as GuildWarTeamsData;
        return data;
    } catch (error) {
        console.error('Error loading guild war teams data:', error);
        throw error;
    }
}

// Load all data
export async function loadAllData(): Promise<{
    heroData: HeroDataMap;
    adventTeamsData: AdventTeamsData;
    guildWarTeamsData: GuildWarTeamsData;
    effects: Set<string>;
    targets: Set<string>;
}> {
    try {
        const [heroData, adventTeamsData, guildWarTeamsData] = await Promise.all([
            loadHeroData(),
            loadAdventTeamsData(),
            loadGuildWarTeamsData()
        ]);

        const effects = extractEffects(heroData);
        const targets = extractTargets(heroData);

        return {
            heroData,
            adventTeamsData,
            guildWarTeamsData,
            effects,
            targets
        };
    } catch (error) {
        console.error('Error loading application data:', error);
        throw error;
    }
}

