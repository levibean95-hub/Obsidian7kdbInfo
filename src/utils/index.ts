import {
  HERO_PORTRAITS_PATH,
  HERO_MODELS_PATH,
  PET_ICONS_PATH,
  GEAR_SETS_PATH,
  PLACEHOLDER_VALUE_REGEX,
  ADVENT_PLACEHOLDER_NAME_REGEX,
} from '../constants';
import type { AdventTeam } from '../types';

export function getHeroImagePath(heroName: string, useModel = false): string {
  // Vite serves static assets from public folder, so paths should be relative to public
  // If images are in root, we need to reference them with leading slash
  const folderPath = (useModel ? HERO_MODELS_PATH : HERO_PORTRAITS_PATH).replace(/ /g, '%20');
  const fileName = encodeURIComponent(heroName) + '.png';
  // Ensure path starts with / for absolute path from root
  return '/' + folderPath + fileName;
}

export function getTypeIconPath(type: string): string {
  const typeIconMap: Record<string, string> = {
    'Attack': '/Type Icons/type_1_attack.png',
    'Magic': '/Type Icons/type_2_magic.png',
    'Defense': '/Type Icons/type_3_defense.png',
    'Support': '/Type Icons/type_4_support.png',
    'Universal': '/Type Icons/type_5_universal.png',
  };
  return typeIconMap[type] || '';
}

export function getPetIconPath(petName: string | null): string | null {
  if (!petName || petName === '---' || petName === 'placeholder') {
    return null;
  }
  const folderPath = PET_ICONS_PATH.replace(/ /g, '%20');
  const fileName = encodeURIComponent(petName) + '.png';
  return '/' + folderPath + fileName;
}

export function getGearSetImagePath(gearSetName: string): string {
  const folderPath = GEAR_SETS_PATH.replace(/ /g, '%20');
  const fileName = encodeURIComponent(gearSetName) + '.png';
  return '/' + folderPath + fileName;
}

export function isPlaceholderValue(value: string | null | undefined): boolean {
  return !value || PLACEHOLDER_VALUE_REGEX.test(value);
}

export function isPlaceholderTeam(team: AdventTeam): boolean {
  if (!team || !Array.isArray(team.heroes)) {
    return true;
  }
  return team.heroes.some(
    (hero) => hero.name === '---' || ADVENT_PLACEHOLDER_NAME_REGEX.test(hero.name)
  );
}

