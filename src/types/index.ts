// Type definitions for the application

export interface Hero {
  name: string;
  role: string;
  primary_content: string;
  target_transcendence: string;
  wishlist_priority: string;
  type: 'Attack' | 'Magic' | 'Defense' | 'Support' | 'Universal';
  target_number: string;
  rarity: 'L++' | 'L+' | 'L' | 'Rare';
  effects: string[];
  gear_pve: {
    T0: GearConfig[];
    T6: GearConfig[];
  };
  gear_pvp: {
    T0: GearConfig[];
    T6: GearConfig[];
  };
  skill_enhance_priority: string;
  tips: string;
}

export interface GearConfig {
  name: string;
  main_stats: string;
  required_stat_thresholds: string;
  sub_stat_priority: string;
}

export interface AdventTeam {
  name: string;
  formationType: 'basic' | 'balanced' | 'attack' | 'protective';
  heroes: AdventHero[];
  skills: AdventSkill[];
  replacements?: string[];
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

export interface AdventBoss {
  [bossName: string]: AdventTeam[];
}

export interface TeamBuilderTeam {
  name: string;
  slots: (string | null)[];
  tiers: number[];
  gearSets: (string | null)[];
  skillOrders: SkillOrder[][];
  pet: string | null;
  formationType: 'basic' | 'balanced' | 'attack' | 'protective';
}

export interface SkillOrder {
  skill: 's1' | 's2';
  order: number;
}

export type View = 'grid' | 'detail' | 'advent' | 'teambuilder';

