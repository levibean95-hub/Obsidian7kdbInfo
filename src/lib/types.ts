// Types for hero data and application state

export interface GearSet {
    name: string;
    main_stats: string;
    required_stat_thresholds: string;
    sub_stat_priority: string;
}

export interface HeroGear {
    T0: GearSet[];
    T6: GearSet[];
}

export interface HeroData {
    name: string;
    role: string;
    primary_content: string;
    target_transcendence: string;
    wishlist_priority: string;
    type: string;
    target_number: string;
    rarity: string;
    effects: string[];
    gear_pve: HeroGear;
    gear_pvp: HeroGear;
    skill_enhance_priority: string;
    tips: string;
}

export interface HeroDataMap {
    [heroName: string]: HeroData;
}

export interface AdventHero {
    name: string;
    position: number;
    row: 'front' | 'back';
}

export interface AdventSkill {
    hero: string;
    s1: number | null;
    s2: number | null;
}

export interface AdventTeam {
    name: string;
    formationType: 'basic' | 'balanced' | 'attack' | 'protective';
    pet: string;
    notes: string;
    heroes: AdventHero[];
    skills: AdventSkill[];
}

export interface AdventBossData {
    teams: AdventTeam[];
}

export interface AdventTeamsData {
    [bossName: string]: AdventBossData;
}

export interface GuildWarHero {
    name: string;
    position: number;
    row: 'front' | 'back';
}

export interface GuildWarSkill {
    hero: string;
    s1: number | null;
    s2: number | null;
}

export interface GuildWarTeam {
    name: string;
    formationType: 'basic' | 'balanced' | 'attack' | 'protective';
    pet: string;
    notes: string;
    heroes: GuildWarHero[];
    skills: GuildWarSkill[];
}

export interface GuildWarTeamsData {
    [category: string]: {
        teams: GuildWarTeam[];
    };
}

export type ViewType = 'grid' | 'detail' | 'advent' | 'teambuilder';

// Team Builder Types
export interface SkillOrder {
    skill: 's1' | 's2';
    order: number;
}

export interface TeamBuilderTeam {
    name: string;
    slots: (string | null)[];
    tiers: number[];
    gearSets: (string | null)[];
    skillOrders: SkillOrder[][];
    pet: string | null;
    notes: string;
    formationType: 'basic' | 'balanced' | 'attack' | 'protective';
}

export interface AppState {
    currentView: ViewType;
    selectedHero: string | null;
    previousView: ViewType;
    referrerPage: string | null;
    searchQuery: string;
    selectedEffect: string;
    selectedType: string;
    selectedTarget: string;
    savedScrollPosition: number;
    savedAdventScrollPosition: number;
    heroData: HeroDataMap;
    allEffects: Set<string>;
    allTargets: Set<string>;
    adventTeamsData: AdventTeamsData;
    guildWarTeamsData: GuildWarTeamsData;
}


export interface SavedLoadout {
    id: string;
    name: string;
    timestamp: number;
    data: string;
}
