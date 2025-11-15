import type { Hero, AdventBoss } from '../types';

let heroDataCache: Record<string, Hero> | null = null;
let adventTeamsDataCache: AdventBoss | null = null;

export async function loadHeroData(): Promise<Record<string, Hero>> {
  if (heroDataCache) {
    return heroDataCache;
  }

  try {
    const response = await fetch('/data/hero-data.json');
    if (!response.ok) {
      throw new Error(`Failed to load hero data: ${response.status}`);
    }
    const data = await response.json();
    heroDataCache = data;
    return data;
  } catch (error) {
    console.error('Error loading hero data:', error);
    throw error;
  }
}

export async function loadAdventTeamsData(): Promise<AdventBoss> {
  if (adventTeamsDataCache) {
    return adventTeamsDataCache;
  }

  try {
    const response = await fetch('/data/advent-teams-data.json');
    if (!response.ok) {
      throw new Error(`Failed to load advent teams data: ${response.status}`);
    }
    const data = await response.json();
    adventTeamsDataCache = data;
    return data;
  } catch (error) {
    console.error('Error loading advent teams data:', error);
    throw error;
  }
}

export async function loadAllData() {
  try {
    const [heroData, adventData] = await Promise.all([
      loadHeroData(),
      loadAdventTeamsData(),
    ]);
    return { heroData, adventData };
  } catch (error) {
    console.error('Error loading application data:', error);
    throw error;
  }
}

export function getAllEffects(heroData: Record<string, Hero>): Set<string> {
  const effects = new Set<string>();
  Object.values(heroData).forEach((hero) => {
    if (hero.effects && Array.isArray(hero.effects)) {
      hero.effects.forEach((effect) => {
        if (effect && !effect.includes('[To be filled') && !effect.includes('TBD')) {
          effects.add(effect);
        }
      });
    }
  });
  return effects;
}

export function getAllTargets(heroData: Record<string, Hero>): Set<string> {
  const targets = new Set<string>();
  Object.values(heroData).forEach((hero) => {
    if (
      hero.target_number &&
      !hero.target_number.includes('[To be filled') &&
      !hero.target_number.includes('TBD')
    ) {
      targets.add(hero.target_number);
    }
  });
  return targets;
}

