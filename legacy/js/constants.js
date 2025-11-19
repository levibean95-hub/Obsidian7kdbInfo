// Constants.js - Application constants and configuration
// This module contains all constant values used throughout the application

// Hero list - sorted by rarity (L++ to Unknown) then alphabetically
export const heroes = [
    // L++ Tier
    'Fai',
    'Juri',
    'Rosie',
    // L+ Tier
    'Ace',
    'Aquila',
    'Biscuit',
    'Colt',
    'Dellons',
    'Eileene',
    'Elysia',
    'Jave',
    'Kagura',
    'Karma',
    'Klahan',
    'Kris',
    'Kyle',
    'Kyrielle',
    'Mercure',
    'Platin',
    'Rachel',
    'Rin',
    'Rudy',
    'Silvesta',
    'Spike',
    'Teo',
    'Vanessa',
    'Yeonhee',
    // L Tier
    'Alice',
    'Amelia',
    'Aragon',
    'Ballista',
    'Bi Dam',
    'Chancellor',
    'Daisy',
    'Espada',
    'Knox',
    'Lina',
    'Miho',
    'Nia',
    'Orly',
    'Pascal',
    'Rook',
    'Ruri',
    'Shane',
    'Sieg',
    'Taka',
    'Yu Shin',
    // Rare Tier
    'Ariel',
    'Asura',
    'Bane',
    'Black Rose',
    'Catty',
    'Chloe',
    'Cleo',
    'Evan',
    'Feng Yan',
    'Heavenia',
    'Hellenia',
    'Hokin',
    'Jane',
    'Jin',
    'Joker',
    'Jupy',
    'Karin',
    'Karon',
    'Lania',
    'Leo',
    'Li',
    'Lucy',
    'May',
    'Noho',
    'Rahkun',
    'Rei',
    'Sarah',
    'Sera',
    'Snipper',
    'Soi',
    'Sylvia',
    'Victoria',
    'Yui',
    'Yuri'
];

// File paths
export const HERO_PORTRAITS_PATH = 'Hero Portraits/';
export const HERO_MODELS_PATH = 'Hero Models BGL/';
export const PET_ICONS_PATH = 'Pet Icons/';
export const GEAR_SETS_PATH = 'Gear Sets Photos/';

// Fallback image for missing portraits
export const HERO_PORTRAIT_FALLBACK = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='24' fill='%230c0812'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%235a4a78' font-size='18'>No Portrait</text></svg>";

// Regex patterns
export const PLACEHOLDER_VALUE_REGEX = /\[.*to be filled.*\]|content to be added/i;
export const ADVENT_PLACEHOLDER_NAME_REGEX = /^hero\s*\d*/i;
