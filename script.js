// Hero data - sorted by rarity (L++ to Unknown) then alphabetically
const heroes = [
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
    'Elysia',
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

// Embedded hero data (auto-generated from hero_data folder)
const EMBEDDED_HERO_DATA = {
    "Ace": {
        "name": "Ace",
        "effects": [
            "Physical Attack Boost",
            "Defense Reduction",
            "Physical Vulnerability",
            "Incoming Healing Reduction",
            "Reduced Buff Duration",
            "Debuff Removal",
            "Guts"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Alice": {
        "name": "Alice",
        "effects": [
            "Defense Boost",
            "Incoming Healing Boost",
            "Heal",
            "Continuous Healing"
        ],
        "type": "Support",
        "target_number": "None",
        "rarity": "L"
    },
    "Amelia": {
        "name": "Amelia",
        "effects": [
            "Effect Hit Rate Boost",
            "Unable to Recover",
            "Debuff Removal",
            "Revive"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Aquila": {
        "name": "Aquila",
        "effects": [
            "Effect Resist Reduction",
            "Death",
            "Link",
            "Death Turn Reduction",
            "Weakness Hit Chance Reduction",
            "Barrier"
        ],
        "type": "Defense",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Aragon": {
        "name": "Aragon",
        "effects": [
            "Defense-Based Damage",
            "All Attack Reduction",
            "Crit Damage Reduction",
            "Stun",
            "Reduced Buff Duration",
            "Heal",
            "Pierce",
            "Cooldown Reduction"
        ],
        "type": "Defense",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Ariel": {
        "name": "Ariel",
        "effects": [
            "[To be filled with hero-specific effects]"
        ],
        "type": "Magic",
        "target_number": "[To be filled]",
        "rarity": "Rare"
    },
    "Asura": {
        "name": "Asura",
        "effects": [
            "Defense Reduction",
            "Barrier",
            "Focus Target"
        ],
        "type": "Magic",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Ballista": {
        "name": "Ballista",
        "effects": [
            "Fixed Damage",
            "Damage Nullification",
            "Follow-Up Attack",
            "Pierce"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Bane": {
        "name": "Bane",
        "effects": [
            "Physical Attack Reduction",
            "Silence",
            "Immortality"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Bi Dam": {
        "name": "Bi Dam",
        "effects": [
            "Physical Damage Boost",
            "Bleed",
            "Explosion"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Biscuit": {
        "name": "Biscuit",
        "effects": [
            "Defense-Based Damage",
            "Weakness Hit Chance Boost",
            "Quintuple-Target Attack Resistance",
            "Increase damage to boss targets",
            "Defense Reduction",
            "Buff Removal"
        ],
        "type": "Support",
        "target_number": "3 Enemies",
        "rarity": "L+"
    },
    "Black Rose": {
        "name": "Black Rose",
        "effects": [
            "Physical Attack Boost",
            "All Attack Boost",
            "Petrify Immunity",
            "Buff Removal",
            "Heal"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "Rare"
    },
    "Catty": {
        "name": "Catty",
        "effects": [
            "Physical Attack Boost",
            "Weakness Hit Chance Boost",
            "Crit Rate Boost",
            "Physical Vulnerability",
            "Block Rate Reduction",
            "Unable to Recover"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Chancellor": {
        "name": "Chancellor",
        "effects": [
            "Defense-Based Damage",
            "Fixed Damage",
            "All Attack Reduction",
            "Defense Reduction",
            "All Damage Reduction",
            "Increased Miss Chance",
            "Buff Removal",
            "Damage Immunity",
            "Heal"
        ],
        "type": "Universal",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Chloe": {
        "name": "Chloe",
        "effects": [
            "All Attack Boost",
            "Crit Rate Boost",
            "Unable to Recover",
            "Shock Immunity",
            "Buff Removal",
            "Debuff Removal",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Cleo": {
        "name": "Cleo",
        "effects": [
            "Magic Attack Boost",
            "Physical Attack Reduction",
            "Petrify",
            "Silence Immunity",
            "Poison"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Colt": {
        "name": "Colt",
        "effects": [
            "Effect Hit Rate Boost",
            "All Attack Reduction",
            "Guts",
            "Camouflage",
            "Bomb"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Daisy": {
        "name": "Daisy",
        "effects": [
            "Max HP-Based Damage",
            "Magic Attack Boost",
            "Petrify Immunity",
            "Buff Removal",
            "Barrier"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L"
    },
    "Dellons": {
        "name": "Dellons",
        "effects": [
            "Physical Damage Boost",
            "Silence",
            "Damage Nullification"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Eileene": {
        "name": "Eileene",
        "effects": [
            "Physical Attack Boost",
            "Shock",
            "Revive",
            "Pierce"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Elysia": {
        "name": "Elysia",
        "effects": [
            "TBD (Update after release)"
        ],
        "type": "Universal",
        "target_number": "TBD",
        "rarity": "L"
    },
    "Espada": {
        "name": "Espada",
        "effects": [
            "Max HP-Based Damage",
            "Crit Rate Boost",
            "Magic Damage Boost",
            "Magic Resistance",
            "Magic Vulnerability"
        ],
        "type": "Magic",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Evan": {
        "name": "Evan",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "Block Rate Boost",
            "Stun",
            "Stun Immunity",
            "Barrier"
        ],
        "type": "Defense",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Fai": {
        "name": "Fai",
        "effects": [
            "Max HP-Based Damage",
            "Defense Reduction",
            "Physical Vulnerability",
            "Burn",
            "Buff Removal",
            "Revive",
            "Barrier",
            "Execution"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L++"
    },
    "Feng Yan": {
        "name": "Feng Yan",
        "effects": [
            "Defense Reduction",
            "Freeze Immunity",
            "Damage Immunity",
            "Ignore Defense"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Heavenia": {
        "name": "Heavenia",
        "effects": [
            "Physical Attack Boost",
            "Freeze",
            "Damage Immunity"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Hellenia": {
        "name": "Hellenia",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "Increased Miss Chance",
            "Debuff Removal",
            "Damage Immunity",
            "Heal",
            "Taunt"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "Rare"
    },
    "Hokin": {
        "name": "Hokin",
        "effects": [
            "Physical Attack Boost",
            "Physical Damage Boost",
            "Stun"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Jane": {
        "name": "Jane",
        "effects": [
            "Poison",
            "Camouflage"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Jave": {
        "name": "Jave",
        "effects": [
            "Stun",
            "Attack Based Defense Boost",
            "Counter Attack"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Jin": {
        "name": "Jin",
        "effects": [
            "Fixed Damage",
            "Physical Attack Boost",
            "Crit Rate Boost",
            "Stun",
            "Silence Immunity",
            "Barrier"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Joker": {
        "name": "Joker",
        "effects": [
            "Crit Damage Boost",
            "Crit Rate Reduction",
            "Stun",
            "Buff Removal"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Jupy": {
        "name": "Jupy",
        "effects": [
            "Crit Rate Boost",
            "Crit Damage Boost",
            "Poison",
            "Camouflage",
            "Change Skill"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Juri": {
        "name": "Juri",
        "effects": [
            "Max HP-Based Damage",
            "Defense Reduction",
            "Crowd Control Immunity",
            "Immortality",
            "Follow-Up Attack",
            "Souldeath"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L++"
    },
    "Kagura": {
        "name": "Kagura",
        "effects": [
            "Crit Damage Boost",
            "Physical Damage Boost",
            "Physical Vulnerability",
            "Incoming Healing Reduction",
            "Petrify",
            "Debuff Removal",
            "Indomitable",
            "Heal"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Karin": {
        "name": "Karin",
        "effects": [
            "Debuff Removal",
            "Revive",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Only Basic Attack",
        "rarity": "Rare"
    },
    "Karma": {
        "name": "Karma",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "All Damage Boost",
            "Block Rate Boost",
            "All Damage Reduction",
            "Pierce",
            "Ignore Defense"
        ],
        "type": "Universal",
        "target_number": "3 Enemies",
        "rarity": "L+"
    },
    "Karon": {
        "name": "Karon",
        "effects": [
            "Bleed Immunity",
            "Barrier",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Only Basic Attack",
        "rarity": "Rare"
    },
    "Klahan": {
        "name": "Klahan",
        "effects": [
            "Physical Attack Boost",
            "Physical Damage Boost",
            "All Damage Reduction",
            "Damage Immunity",
            "Heal",
            "Pierce"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Knox": {
        "name": "Knox",
        "effects": [
            "Max HP-Based Damage",
            "Death Effect Probability Boost",
            "Effect Resist Reduction",
            "Death",
            "Damage Immunity",
            "Barrier",
            "Taunt"
        ],
        "type": "Defense",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Kris": {
        "name": "Kris",
        "effects": [
            "Death",
            "Immortality",
            "Heal",
            "Cooldown Reset"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Kyle": {
        "name": "Kyle",
        "effects": [
            "Crit Rate Boost",
            "All Damage Nullification",
            "Eyes of the strong",
            "Pierce",
            "Ignore Defense",
            "Buff Removal"
        ],
        "type": "Attack",
        "target_number": "4 Enemies",
        "rarity": "L+"
    },
    "Kyrielle": {
        "name": "Kyrielle",
        "effects": [
            "All Damage Nullification",
            "Guts",
            "Speed-Based Attack Boost",
            "Magic Damage Boost",
            "Pierce",
            "Paralysis",
            "Debuff Removal",
            "Damage Boost"
        ],
        "type": "Magic",
        "target_number": "Single Enemy",
        "rarity": "L+"
    },
    "Lania": {
        "name": "Lania",
        "effects": [
            "Magic Attack Boost",
            "Effect Hit Rate Boost",
            "Freeze",
            "Freeze Immunity"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "Rare"
    },
    "Leo": {
        "name": "Leo",
        "effects": [
            "All Attack Boost",
            "Defense Reduction",
            "All Damage Reduction",
            "Bleed",
            "Death Immunity",
            "Revive",
            "Life Drain"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Li": {
        "name": "Li",
        "effects": [
            "Self Max HP-Based Damage",
            "Stun",
            "Damage Immunity",
            "Heal",
            "Counterattack",
            "Taunt",
            "HP Alteration"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Lina": {
        "name": "Lina",
        "effects": [
            "All Damage Boost",
            "Crit Damage Boost",
            "Effect Resist Boost",
            "Defense Reduction",
            "Barrier",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Lucy": {
        "name": "Lucy",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "Physical Attack Reduction",
            "Poison Immunity",
            "Debuff Removal",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Only Basic Attack",
        "rarity": "Rare"
    },
    "May": {
        "name": "May",
        "effects": [
            "Physical Damage Boost",
            "Physical Vulnerability",
            "Blind",
            "Bleed",
            "Burn",
            "Poison",
            "Barrier"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Mercure": {
        "name": "Mercure",
        "effects": [
            "Effect Resist Reduction",
            "Incoming Healing Reduction",
            "Stun",
            "Blessing",
            "Barrier",
            "Magic Reflux"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Miho": {
        "name": "Miho",
        "effects": [
            "Weakness Hit Damage Boost",
            "Magic Vulnerability",
            "Reduced Buff Duration",
            "Debuff Removal",
            "Guts"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Nia": {
        "name": "Nia",
        "effects": [
            "Effect Hit Rate Boost",
            "Shock",
            "Reduced Buff Duration",
            "Barrier",
            "Cooldown Increase"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L"
    },
    "Noho": {
        "name": "Noho",
        "effects": [
            "Self Max HP-Based Damage",
            "Magic Attack Boost",
            "Buff Removal",
            "Barrier",
            "HP Alteration"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Orly": {
        "name": "Orly",
        "effects": [
            "Crit Rate Boost",
            "Crit Damage Boost",
            "Defense Reduction",
            "Buff Removal",
            "Debuff Removal",
            "Damage Nullification",
            "Continuous Healing"
        ],
        "type": "Support",
        "target_number": "All Enemies",
        "rarity": "L"
    },
    "Pascal": {
        "name": "Pascal",
        "effects": [
            "Magic Attack Boost",
            "Crit Rate Boost",
            "Crit Damage Boost",
            "Damage Nullification",
            "Ignore Defense",
            "Cooldown Reset"
        ],
        "type": "Magic",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Platin": {
        "name": "Platin",
        "effects": [
            "Defense-Based Damage",
            "Fixed Damage",
            "All Attack Reduction",
            "Buff Removal",
            "Heal",
            "Damage-Based Healing",
            "HP Alteration"
        ],
        "type": "Support",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Rachel": {
        "name": "Rachel",
        "effects": [
            "Weakness Hit Chance Boost",
            "All Attack Reduction",
            "Defense Reduction",
            "All Damage Reduction",
            "Physical Vulnerability",
            "Burn",
            "Revive"
        ],
        "type": "Universal",
        "target_number": "3 Enemies (at T6)",
        "rarity": "L+"
    },
    "Rahkun": {
        "name": "Rahkun",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "Effect Resist Boost",
            "Physical Resistance",
            "Taunt"
        ],
        "type": "Defense",
        "target_number": "Only Basic Attack",
        "rarity": "Rare"
    },
    "Rei": {
        "name": "Rei",
        "effects": [
            "[To be filled with hero-specific effects]"
        ],
        "type": "Attack",
        "target_number": "[To be filled]",
        "rarity": "Rare"
    },
    "Rin": {
        "name": "Rin",
        "effects": [
            "Increased Miss Chance",
            "Reduced Buff Duration",
            "Damage Nullification",
            "Revive",
            "Barrier",
            "Cooldown Reset",
            "Confusion"
        ],
        "type": "Magic",
        "target_number": "4 Enemies",
        "rarity": "L+"
    },
    "Rook": {
        "name": "Rook",
        "effects": [
            "Self Max HP-Based Damage",
            "Crit Rate Boost",
            "Physical Resistance",
            "Block Rate Boost",
            "Barrier"
        ],
        "type": "Defense",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Rosie": {
        "name": "Rosie",
        "effects": [
            "Self Max HP-Based Damage",
            "Effect Probability Boost",
            "Effect Resist Reduction",
            "Death",
            "Reduced Buff Duration",
            "Damage Immunity",
            "Guts",
            "Revive"
        ],
        "type": "Support",
        "target_number": "All Enemies",
        "rarity": "L++"
    },
    "Rudy": {
        "name": "Rudy",
        "effects": [
            "Defense-Based Damage",
            "Defense Boost",
            "Damage Resistance",
            "Stun",
            "Crowd Control Immunity",
            "Reduced Buff Duration",
            "Debuff Removal",
            "Link"
        ],
        "type": "Defense",
        "target_number": "Single Enemy",
        "rarity": "L+"
    },
    "Ruri": {
        "name": "Ruri",
        "effects": [
            "Weakness Hit Chance Boost",
            "Magic Damage Boost",
            "Heal",
            "Ignore Defense"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Sarah": {
        "name": "Sarah",
        "effects": [
            "Defense Boost",
            "Damage Resistance",
            "Defense Reduction",
            "All Damage Reduction",
            "Sleep Immunity",
            "Heal"
        ],
        "type": "Support",
        "target_number": "All Enemies",
        "rarity": "Rare"
    },
    "Sera": {
        "name": "Sera",
        "effects": [
            "Crit Rate Boost",
            "Reduced Buff Duration"
        ],
        "type": "Magic",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Shane": {
        "name": "Shane",
        "effects": [
            "Crit Rate Boost",
            "Magic Resistance",
            "Follow-Up Attack"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Sieg": {
        "name": "Sieg",
        "effects": [
            "Physical Attack Boost",
            "All Damage Reduction",
            "Stun Immunity",
            "Ignore Defense"
        ],
        "type": "Universal",
        "target_number": "Single Enemy",
        "rarity": "L"
    },
    "Silvesta": {
        "name": "Silvesta",
        "effects": [
            "Reduced Buff Duration",
            "Blessing",
            "Guts",
            "Ignore Defense",
            "Life Drain"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Snipper": {
        "name": "Snipper",
        "effects": [
            "Max HP-Based Damage",
            "Burn"
        ],
        "type": "Attack",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Soi": {
        "name": "Soi",
        "effects": [
            "Effect Hit Rate Boost",
            "Bleed",
            "Reduced Buff Duration"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "Rare"
    },
    "Spike": {
        "name": "Spike",
        "effects": [
            "Self Max HP-Based Damage",
            "Effect Hit Rate Boost",
            "Effect Resist Boost",
            "Freeze",
            "Debuff Removal",
            "Guts",
            "Heal"
        ],
        "type": "Universal",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Sylvia": {
        "name": "Sylvia",
        "effects": [
            "Magic Attack Boost",
            "Defense Reduction",
            "Immortality",
            "Pierce",
            "Ignore Defense"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "Rare"
    },
    "Taka": {
        "name": "Taka",
        "effects": [
            "Crit Damage Boost",
            "Physical Vulnerability",
            "Damage Nullification",
            "Ignore Defense"
        ],
        "type": "Attack",
        "target_number": "3 Enemies",
        "rarity": "L"
    },
    "Teo": {
        "name": "Teo",
        "effects": [
            "Physical Attack Boost",
            "Crit Rate Boost",
            "Reduced Buff Duration",
            "Damage Nullification",
            "Immortality",
            "Pierce",
            "Cooldown Reset"
        ],
        "type": "Attack",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Vanessa": {
        "name": "Vanessa",
        "effects": [
            "Defense Reduction",
            "Magic Vulnerability",
            "Petrify",
            "Buff Removal",
            "Damage Immunity",
            "Pierce",
            "Cooldown Increase"
        ],
        "type": "Magic",
        "target_number": "4 Enemies",
        "rarity": "L+"
    },
    "Victoria": {
        "name": "Victoria",
        "effects": [
            "Magic Attack Boost",
            "Physical Resistance",
            "Magic Vulnerability",
            "Paralysis Immunity",
            "Heal"
        ],
        "type": "Support",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    },
    "Yeonhee": {
        "name": "Yeonhee",
        "effects": [
            "Max HP-Based Damage",
            "Magic Attack Boost",
            "Magic Damage Boost",
            "Sleep",
            "Damage Nullification",
            "Ignore Defense"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L+"
    },
    "Yu Shin": {
        "name": "Yu Shin",
        "effects": [
            "Effect Hit Rate Boost",
            "Effect Resist Reduction",
            "Incoming Healing Reduction",
            "Paralysis",
            "Debuff Removal",
            "Damage Immunity"
        ],
        "type": "Magic",
        "target_number": "All Enemies",
        "rarity": "L"
    },
    "Yui": {
        "name": "Yui",
        "effects": [
            "Physical Damage Boost",
            "Magic Attack Reduction",
            "Burn Immunity",
            "Revive",
            "Heal",
            "Continuous Healing"
        ],
        "type": "Support",
        "target_number": "Only Basic Attack",
        "rarity": "Rare"
    },
    "Yuri": {
        "name": "Yuri",
        "effects": [
            "Magic Damage Boost",
            "Burn",
            "Ignore Defense"
        ],
        "type": "Magic",
        "target_number": "Single Enemy",
        "rarity": "Rare"
    }
};


















// Configuration - easy to change for hosting
const HERO_PORTRAITS_PATH = 'Hero Portraits/';
const HERO_MODELS_PATH = 'Hero Models BGL/';
const PET_ICONS_PATH = 'Pet Icons/';
const HERO_PORTRAIT_FALLBACK = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='24' fill='%230c0812'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%235a4a78' font-size='18'>No Portrait</text></svg>";

// Helper function to get properly encoded image path
function getHeroImagePath(heroName, useModel = false) {
    // Use model for detail view, portrait for grid
    const folderPath = encodeURI(useModel ? HERO_MODELS_PATH : HERO_PORTRAITS_PATH);
    const fileName = encodeURIComponent(heroName) + '.png';
    return folderPath + fileName;
}

// Map hero type to type icon path
function getTypeIconPath(type) {
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
function getPetIconPath(petName) {
    if (!petName || petName === '---' || petName === 'placeholder') {
        return null;
    }
    const folderPath = encodeURI(PET_ICONS_PATH);
    const fileName = encodeURIComponent(petName) + '.png';
    return folderPath + fileName;
}

// State management
let currentView = 'grid';
let selectedHero = null;
let searchQuery = '';
let savedScrollPosition = 0;
let savedAdventScrollPosition = 0; // Save scroll position for advent view
let previousView = 'grid'; // Track which view to return to from detail view
let referrerPage = null; // Track if we came from external page (e.g., wish-list.html)
let selectedEffect = '';
let selectedType = '';
let selectedTarget = '';
let heroData = {}; // Stores hero data including effects, type, and target_number
let allEffects = new Set(); // Stores all unique effects
let allTargets = new Set(); // Stores all unique target numbers
const PLACEHOLDER_VALUE_REGEX = /\[.*to be filled.*\]|content to be added/i;
const ADVENT_PLACEHOLDER_NAME_REGEX = /^hero\s*\d*/i;

function isPlaceholderValue(value) {
    if (!value) return true;
    return PLACEHOLDER_VALUE_REGEX.test(value.trim().toLowerCase());
}

// ========================================
// ADVENT TEAMS - COMPLETE REWRITE
// ========================================

// Advent Teams Data Structure
const ADVENT_TEAMS_DATA = {
    'Yeonhee': {
        teams: [
            {
                name: 'Team 1',
                formationType: 'basic', // 2 front, 3 back - Pattern: 2,4 front | 1,3,5 back
                pet: 'Yeonji',
                notes: 'Need Miho T2 for this to work. Yeonhee sleeps the back 3 targets and Miho will cleanse with her S1 while also applying magic vulnerability.',
                heroes: [
                    { name: 'Lina', position: 1, row: 'back' },
                    { name: 'Daisy', position: 2, row: 'front' },
                    { name: 'Ruri', position: 3, row: 'back' },
                    { name: 'Miho', position: 4, row: 'front' },
                    { name: 'Biscuit', position: 5, row: 'back' }
                ],
                skills: [
                    { hero: 'Lina', s1: 3, s2: null },
                    { hero: 'Daisy', s1: 4, s2: null },
                    { hero: 'Ruri', s1: 5, s2: 6 },
                    { hero: 'Miho', s1: 7, s2: 2 },
                    { hero: 'Biscuit', s1: null, s2: 1 }
                ]
            },
            {
                name: 'Team 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Richel',
                notes: 'Just dump damage with remaining turns. Sarah will apply passive sleep immunity.',
                heroes: [
                    { name: 'Vanessa', position: 1, row: 'front' },
                    { name: 'Yeonhee', position: 2, row: 'front' },
                    { name: 'Sera', position: 3, row: 'back' },
                    { name: 'Rachel', position: 4, row: 'front' },
                    { name: 'Sarah', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Vanessa', s1: null, s2: 5 },
                    { hero: 'Yeonhee', s1: null, s2: 4 },
                    { hero: 'Sera', s1: 2, s2: 3 },
                    { hero: 'Rachel', s1: 1, s2: null },
                    { hero: 'Sarah', s1: null, s2: null }
                ]
            },
            {
                name: 'First Alternate 1',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Yeonji',
                notes: 'This team is for if you don\'t have Miho T2. Yeonhee ideally wants avenger gear since her bottom skill does pretty good damage.',
                heroes: [
                    { name: 'Lina', position: 1, row: 'front' },
                    { name: 'Biscuit', position: 2, row: 'front' },
                    { name: 'Ruri', position: 3, row: 'back' },
                    { name: 'Yeonhee', position: 4, row: 'front' },
                    { name: 'Sarah', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Lina', s1: 2, s2: null },
                    { hero: 'Biscuit', s1: null, s2: 1 },
                    { hero: 'Ruri', s1: 3, s2: 4 },
                    { hero: 'Yeonhee', s1: 6, s2: 5 },
                    { hero: 'Sarah', s1: null, s2: 7 }
                ]
            },
            {
                name: 'First Alternate 2',
                formationType: 'basic', // 2 front, 3 back - Pattern: 2,4 front | 1,3,5 back
                pet: 'Richel',
                notes: 'Orly can be replaced with Lucy since you probably don\'t have Miho T2 if you\'re running this. Can also replace Juri for Sera. Juri and Vanessa run avenger set.',
                heroes: [
                    { name: 'Vanessa', position: 1, row: 'back' },
                    { name: 'Juri', position: 2, row: 'front' },
                    { name: 'Orly', position: 3, row: 'back' },
                    { name: 'Miho', position: 4, row: 'front' },
                    { name: 'Daisy', position: 5, row: 'back' }
                ],
                skills: [
                    { hero: 'Vanessa', s1: null, s2: 5 },
                    { hero: 'Juri', s1: null, s2: null },
                    { hero: 'Orly', s1: 6, s2: 1 },
                    { hero: 'Miho', s1: 4, s2: 2 },
                    { hero: 'Daisy', s1: 3, s2: null }
                ]
            }
        ]
    },
    'Teo': {
        teams: [
            {
                name: 'Team 1',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Yeonji',
                notes: 'Teo will go immortal when his HP drops to 0. Use Biscuit top skill to kill him and move to Team 2.',
                heroes: [
                    { name: 'Lina', position: 1, row: 'front' },
                    { name: 'Biscuit', position: 2, row: 'front' },
                    { name: 'Pascal', position: 3, row: 'back' },
                    { name: 'Espada', position: 4, row: 'front' },
                    { name: 'Kyrielle', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Lina', s1: 3, s2: null },
                    { hero: 'Biscuit', s1: null, s2: 2 },
                    { hero: 'Pascal', s1: 4, s2: 5 },
                    { hero: 'Espada', s1: null, s2: 1 },
                    { hero: 'Kyrielle', s1: null, s2: null }
                ]
            },
            {
                name: 'Team 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Richel',
                notes: 'To min/max, avenger gear on everyone but not that important other than avenger on Yuri. Just dps with remaining turns.',
                heroes: [
                    { name: 'Rachel', position: 1, row: 'front' },
                    { name: 'Vanessa', position: 2, row: 'front' },
                    { name: 'Yuri', position: 3, row: 'back' },
                    { name: 'Miho', position: 4, row: 'front' },
                    { name: 'Daisy', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Rachel', s1: 1, s2: null },
                    { hero: 'Vanessa', s1: null, s2: null },
                    { hero: 'Yuri', s1: 5, s2: 4 },
                    { hero: 'Miho', s1: null, s2: 2 },
                    { hero: 'Daisy', s1: 3, s2: 6 }
                ]
            },
            {
                name: 'First Alternate 1',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Yeonji',
                notes: 'Teo will go immortal when his HP drops to 0. Use Biscuit top skill to kill him and move to Team 2.',
                heroes: [
                    { name: 'Lina', position: 1, row: 'front' },
                    { name: 'Biscuit', position: 2, row: 'front' },
                    { name: 'Yuri', position: 3, row: 'back' },
                    { name: 'Espada', position: 4, row: 'front' },
                    { name: 'Daisy', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Lina', s1: 3, s2: null },
                    { hero: 'Biscuit', s1: null, s2: 2 },
                    { hero: 'Yuri', s1: 5, s2: 4 },
                    { hero: 'Espada', s1: null, s2: 1 },
                    { hero: 'Daisy', s1: null, s2: 6 }
                ]
            },
            {
                name: 'First Alternate 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'Richel',
                notes: 'Just damage dump with remaning turns.',
                heroes: [
                    { name: 'Rachel', position: 1, row: 'front' },
                    { name: 'Vanessa', position: 2, row: 'front' },
                    { name: 'Pascal', position: 3, row: 'back' },
                    { name: 'Miho', position: 4, row: 'front' },
                    { name: 'Kyrielle', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: 'Rachel', s1: 1, s2: null },
                    { hero: 'Vanessa', s1: null, s2: null },
                    { hero: 'Pascal', s1: 3, s2: 4 },
                    { hero: 'Miho', s1: null, s2: 2 },
                    { hero: 'Kyrielle', s1: null, s2: null }
                ]
            }
        ]
    },
    'Karma': {
        teams: [
            {
                name: 'Team 1',
                formationType: 'balanced', // 3 front, 2 back - Pattern: 1,3,5 front | 2,4 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'back' },
                    { name: '---', position: 3, row: 'front' },
                    { name: '---', position: 4, row: 'back' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'Team 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'First Alternate 1',
                formationType: 'balanced', // 3 front, 2 back - Pattern: 1,3,5 front | 2,4 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'back' },
                    { name: '---', position: 3, row: 'front' },
                    { name: '---', position: 4, row: 'back' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'First Alternate 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            }
        ]
    },
    'Kyle': {
        teams: [
            {
                name: 'Team 1',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'Team 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'First Alternate 1',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            },
            {
                name: 'First Alternate 2',
                formationType: 'protective', // 4 front, 1 back - Pattern: 1,2,4,5 front | 3 back
                pet: 'placeholder',
                heroes: [
                    { name: '---', position: 1, row: 'front' },
                    { name: '---', position: 2, row: 'front' },
                    { name: '---', position: 3, row: 'back' },
                    { name: '---', position: 4, row: 'front' },
                    { name: '---', position: 5, row: 'front' }
                ],
                skills: [
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null },
                    { hero: '---', s1: null, s2: null }
                ]
            }
        ]
    }
};

function isPlaceholderTeam(team) {
    if (!team || !Array.isArray(team.heroes)) {
        return true;
    }
    return team.heroes.every(hero => ADVENT_PLACEHOLDER_NAME_REGEX.test((hero.name || '').toLowerCase()));
}

// Render a single hero column
function createAdventHeroColumn(heroData, skillData) {
    const column = document.createElement('div');
    column.className = `advent-hero-column ${heroData.row || ''}`;

    // Add click handler to entire column to show hero detail
    column.style.cursor = 'pointer';
    column.setAttribute('role', 'button');
    column.setAttribute('tabindex', '0');
    column.setAttribute('aria-label', `View details for ${heroData.name}`);
    const handleSelection = () => {
        // Save advent view scroll position before navigating
        savedAdventScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        previousView = 'advent'; // Save that we came from advent view
        showHeroDetail(heroData.name);
    };
    column.addEventListener('click', handleSelection);
    column.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSelection();
        }
    });

    // Add type-based border color to the entire hero column (matching type icon backgrounds)
    const typeColors = {
        'Attack': '#c93939',      // Red (matches type_1_attack.png)
        'Magic': '#3b82f6',       // Blue (matches type_2_magic.png)
        'Defense': '#a67c52',     // Brown/tan (matches type_3_defense.png)
        'Support': '#eab308',     // Yellow/gold (matches type_4_support.png)
        'Universal': '#9333ea'    // Purple (matches type_5_universal.png)
    };

    // Look up hero type from EMBEDDED_HERO_DATA
    const heroInfo = EMBEDDED_HERO_DATA[heroData.name];
    if (heroInfo && heroInfo.type && typeColors[heroInfo.type]) {
        column.style.border = `3px solid ${typeColors[heroInfo.type]}`;
        column.style.borderRadius = '8px';
    }

    // Hero portrait
    const portrait = document.createElement('div');
    portrait.className = 'advent-hero-portrait';
    const heroImagePath = `Downloaded%20Hero%20Portraits/${encodeURIComponent(heroData.name)}.png`;
    portrait.innerHTML = `<img src="${heroImagePath}" alt="${heroData.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23333%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23666%22 font-size=%2212%22>No Image</text></svg>'">`;

    column.appendChild(portrait);

    // Hero name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'advent-hero-name';
    nameDiv.textContent = heroData.name;
    column.appendChild(nameDiv);

    // Skill slots
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'advent-skills-container';

    const s1Slot = document.createElement('div');
    s1Slot.className = 'advent-skill-slot';
    s1Slot.textContent = skillData && skillData.s1 ? skillData.s1 : 'N/A';
    if (!skillData || !skillData.s1) s1Slot.classList.add('empty');
    skillsContainer.appendChild(s1Slot);

    const s2Slot = document.createElement('div');
    s2Slot.className = 'advent-skill-slot';
    s2Slot.textContent = skillData && skillData.s2 ? skillData.s2 : 'N/A';
    if (!skillData || !skillData.s2) s2Slot.classList.add('empty');
    skillsContainer.appendChild(s2Slot);

    column.appendChild(skillsContainer);

    return column;
}

// Render a team card
function renderTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'advent-team-card';

    // Team name header
    const header = document.createElement('div');
    header.className = 'advent-team-header';

    const title = document.createElement('h3');
    title.textContent = team.name;
    header.appendChild(title);

    card.appendChild(header);

    // Formation label
    const formationLabel = document.createElement('div');
    formationLabel.className = 'advent-formation-label';
    const formationNames = {
        'basic': 'Basic Formation (2 Front, 3 Back)',
        'balanced': 'Balanced Formation (3 Front, 2 Back)',
        'attack': 'Attack Formation (1 Front, 4 Back)',
        'protective': 'Protective Formation (4 Front, 1 Back)'
    };
    formationLabel.textContent = formationNames[team.formationType] || team.formationType;
    card.appendChild(formationLabel);

    // Heroes container
    const heroesContainer = document.createElement('div');
    heroesContainer.className = 'advent-heroes-container';

    // Create skill lookup map
    const skillMap = {};
    if (team.skills) {
        team.skills.forEach(skill => {
            skillMap[skill.hero] = skill;
        });
    }

    // Render each hero
    team.heroes.forEach(hero => {
        const heroColumn = createAdventHeroColumn(hero, skillMap[hero.name]);
        heroesContainer.appendChild(heroColumn);
    });

    card.appendChild(heroesContainer);

    // Pet and Notes Section (side by side)
    const bottomSection = document.createElement('div');
    bottomSection.className = 'advent-bottom-section';

    // Pet slot
    const petContainer = document.createElement('div');
    petContainer.className = 'advent-pet-container';

    const petIcon = document.createElement('div');
    petIcon.className = 'advent-pet-icon';

    const petPath = team.pet ? getPetIconPath(team.pet) : null;
    if (petPath) {
        // Show pet icon
        petIcon.innerHTML = `<img src="${petPath}" alt="${team.pet}" onerror="this.style.display='none'">`;
    } else {
        // Show placeholder
        petIcon.classList.add('placeholder');
        petIcon.innerHTML = `<div class="pet-placeholder-box"></div>`;
    }

    petContainer.appendChild(petIcon);

    const petLabel = document.createElement('div');
    petLabel.className = 'advent-pet-label';
    petLabel.textContent = petPath ? team.pet : 'Pet';
    petContainer.appendChild(petLabel);

    bottomSection.appendChild(petContainer);

    // Special Notes section
    const notesContainer = document.createElement('div');
    notesContainer.className = 'advent-notes-container';

    const notesTitle = document.createElement('div');
    notesTitle.className = 'advent-notes-title';
    notesTitle.textContent = 'Special Notes';
    notesContainer.appendChild(notesTitle);

    const notesContent = document.createElement('div');
    notesContent.className = 'advent-notes-content';
    if (team.notes) {
        notesContent.textContent = team.notes;
    } else {
        notesContent.textContent = 'No special notes';
        notesContent.classList.add('empty');
    }
    notesContainer.appendChild(notesContent);

    bottomSection.appendChild(notesContainer);

    card.appendChild(bottomSection);

    return card;
}

// Main function to populate advent teams
function populateAdventTeams() {
    const container = document.getElementById('advent-bosses-container');
    if (!container) {
        console.error('Advent bosses container not found');
        return;
    }

    container.innerHTML = '';

    // Iterate through each boss
    Object.keys(ADVENT_TEAMS_DATA).forEach(bossName => {
        const bossData = ADVENT_TEAMS_DATA[bossName];

        // Boss section
        const bossSection = document.createElement('div');
        bossSection.className = 'advent-boss-section';
        bossSection.dataset.boss = bossName.toLowerCase();

        // Boss header
        const bossHeader = document.createElement('div');
        bossHeader.className = 'advent-boss-header';
        const bossTitle = document.createElement('h2');
        bossTitle.textContent = bossName;
        bossHeader.appendChild(bossTitle);
        bossSection.appendChild(bossHeader);

        // Teams container
        const teamsContainer = document.createElement('div');
        teamsContainer.className = 'advent-teams-container';

        const validTeams = bossData.teams.filter(team => !isPlaceholderTeam(team));
        if (validTeams.length === 0) {
            const placeholderCard = document.createElement('div');
            placeholderCard.className = 'advent-team-card advent-team-card--empty';
            placeholderCard.textContent = 'Team recommendations are coming soon.';
            teamsContainer.appendChild(placeholderCard);
        } else {
            // Render each team with color coding to show pairs
            validTeams.forEach((team, index) => {
                const teamCard = renderTeamCard(team);

                // Color code team pairs: Team 1 + Team 2 (blue), First Alternate 1 + 2 (green), Second Alternate 1 + 2 (faded light red)
                if (index < 2) {
                    // Main team combo (Team 1 and Team 2)
                    teamCard.style.border = '3px solid #4a9eff';
                } else if (index < 4) {
                    // First alternative team combo (First Alternate 1 and First Alternate 2)
                    teamCard.style.border = '3px solid #51cf66';
                } else {
                    // Second alternative team combo (Second Alternate 1 and Second Alternate 2)
                    teamCard.style.border = '3px solid #ff8787';
                }

                teamsContainer.appendChild(teamCard);
            });
        }

        bossSection.appendChild(teamsContainer);
        container.appendChild(bossSection);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Always start at the top on page load/refresh
    window.scrollTo(0, 0);

    // Check for referrer page before dropping query params
    const initialUrl = new URL(window.location.href);
    if (initialUrl.searchParams.has('from')) {
        referrerPage = initialUrl.searchParams.get('from');
        // Drop helper query params (e.g., from=wishlist) to avoid trapping navigation
        initialUrl.searchParams.delete('from');
        const cleanedSearch = initialUrl.searchParams.toString();
        const newUrl = `${initialUrl.pathname}${cleanedSearch ? `?${cleanedSearch}` : ''}${initialUrl.hash}`;
        history.replaceState({}, '', newUrl);
    }

    // Load hero data from embedded data
    loadAllHeroData();

    renderHeroGrid();
    populateEffectFilter();
    populateTargetFilter();
    populateAdventTeams();
    setupEventListeners();

    // Check for URL hash and show hero if specified
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash) {
        // Decode URI component in case hero name has spaces
        const heroName = decodeURIComponent(hash);
        if (heroes.includes(heroName)) {
            // Use setTimeout to ensure DOM is fully ready
            setTimeout(() => {
                showHeroDetail(heroName);
            }, 100);
        }
    }
});

// Load hero data from embedded data (no fetch needed)
function loadAllHeroData() {
    let successCount = 0;

    // Load from embedded data
    heroData = EMBEDDED_HERO_DATA;

    // Populate allEffects and allTargets sets
    for (const heroName in heroData) {
        const data = heroData[heroName];
        if (data.effects && data.effects.length > 0) {
            const validEffects = data.effects.filter(effect => !isPlaceholderValue(effect));
            if (validEffects.length > 0) {
                validEffects.forEach(effect => allEffects.add(effect));
                successCount++;
            }
        }
        // Collect unique target numbers
        if (data.target_number && data.target_number !== 'None' && !isPlaceholderValue(data.target_number)) {
            allTargets.add(data.target_number);
        }
    }

    console.log(`Hero data loaded: ${successCount} heroes with effects`);
    console.log(`Total unique effects: ${allEffects.size}`);
    console.log(`Total unique targets: ${allTargets.size}`);
}


// Populate the effect filter dropdown
function populateEffectFilter() {
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
function populateTargetFilter() {
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

// Render the hero grid
function renderHeroGrid() {
    const grid = document.getElementById('heroes-grid');
    grid.innerHTML = '';

    const filteredHeroes = heroes.filter(hero => {
        // Filter by search query
        const matchesSearch = hero.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by selected effect
        let matchesEffect = true;
        if (selectedEffect) {
            const data = heroData[hero];
            matchesEffect = data && data.effects && data.effects.includes(selectedEffect);
        }

        // Filter by selected type
        let matchesType = true;
        if (selectedType) {
            const data = heroData[hero];
            matchesType = data && data.type === selectedType;
        }

        // Filter by selected target
        let matchesTarget = true;
        if (selectedTarget) {
            const data = heroData[hero];
            matchesTarget = data && data.target_number === selectedTarget;
        }

        return matchesSearch && matchesEffect && matchesType && matchesTarget;
    });

    filteredHeroes.forEach(hero => {
        const card = createHeroCard(hero);
        grid.appendChild(card);
    });

    // Show empty state if no results
    if (filteredHeroes.length === 0) {
        grid.innerHTML = '<div class="section-placeholder" style="grid-column: 1 / -1;">No heroes found matching your filters</div>';
    }
}

// Create a hero card element
function createHeroCard(heroName) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'hero-card';
    card.setAttribute('aria-label', `View details for ${heroName}`);
    card.addEventListener('click', () => {
        // Save grid view scroll position before navigating
        savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        previousView = 'grid'; // Save that we came from grid view
        showHeroDetail(heroName);
    });

    const heroInfo = heroData[heroName];
    if (heroInfo && heroInfo.type) {
        const normalizedType = heroInfo.type.trim().toLowerCase();
        card.dataset.heroType = normalizedType;
    }

    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image-container';

    const img = document.createElement('img');
    img.className = 'hero-image';
    img.src = getHeroImagePath(heroName);
    img.alt = heroName;
    img.loading = 'lazy';

    // Add type icon badge (top-left corner)
    if (heroInfo && heroInfo.type) {
        const typeIconBadge = document.createElement('div');
        typeIconBadge.className = 'type-icon-badge';
        const typeIcon = document.createElement('img');
        typeIcon.src = getTypeIconPath(heroInfo.type);
        typeIcon.alt = heroInfo.type;
        typeIconBadge.appendChild(typeIcon);
        imageContainer.appendChild(typeIconBadge);
    }

    // Add rarity badge (top-right corner)
    if (heroInfo && heroInfo.rarity) {
        const rarityBadge = document.createElement('div');
        rarityBadge.className = `rarity-badge rarity-${heroInfo.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        rarityBadge.textContent = heroInfo.rarity;
        imageContainer.appendChild(rarityBadge);
    }

    const name = document.createElement('div');
    name.className = 'hero-name';
    name.textContent = heroName;

    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    card.appendChild(name);

    return card;
}

// Show hero detail view
function showHeroDetail(heroName) {
    selectedHero = heroName;

    // Save current scroll position before switching views
    savedScrollPosition = window.scrollY || window.pageYOffset;

    // Update detail view content
    document.getElementById('detail-hero-name').textContent = heroName;
    const detailHeroImage = document.getElementById('detail-hero-image');
    const portraitSrc = getHeroImagePath(heroName, false);
    detailHeroImage.alt = heroName;
    detailHeroImage.onerror = () => {
        detailHeroImage.onerror = null;
        detailHeroImage.src = HERO_PORTRAIT_FALLBACK;
    };
    detailHeroImage.src = portraitSrc; // Match hero grid imagery

    // Populate portrait card badges
    const data = heroData[heroName];
    if (data) {
        // Set type badge
        if (data.type) {
            const typeIconPath = getTypeIconPath(data.type);
            const detailTypeIcon = document.getElementById('detail-type-icon');
            const detailTypeBadge = document.getElementById('detail-type-badge');

            detailTypeIcon.src = typeIconPath;
            detailTypeIcon.alt = data.type;
            detailTypeBadge.style.display = typeIconPath ? 'flex' : 'none';
        }

        // Set rarity badge
        if (data.rarity) {
            const rarityBadge = document.getElementById('detail-rarity-badge');
            rarityBadge.textContent = data.rarity;
            rarityBadge.className = `rarity-badge rarity-${data.rarity.toLowerCase().replace(/\+/g, 'plus')}`;
        }
    }

    // Reset meta information
    document.getElementById('hero-type-text').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-type-icon').style.display = 'none';
    document.getElementById('hero-target-number').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-role').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-primary-content').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-target-transcendence').innerHTML = '<em>To be added</em>';
    document.getElementById('hero-wishlist-priority').innerHTML = '<em>To be added</em>';

    // Populate Type and Target Number from hero data
    if (data) {
        if (data.type) {
            const typeIconPath = getTypeIconPath(data.type);
            const heroTypeIcon = document.getElementById('hero-type-icon');
            const heroTypeText = document.getElementById('hero-type-text');

            heroTypeIcon.src = typeIconPath;
            heroTypeIcon.alt = data.type;
            heroTypeIcon.style.display = typeIconPath ? 'block' : 'none';
            heroTypeText.textContent = data.type;
        }
        if (data.target_number) {
            document.getElementById('hero-target-number').textContent = data.target_number;
        }
    }

    // Update meta information for specific heroes
    if (heroName === 'Amelia') {
        document.getElementById('hero-role').textContent = 'Support, Buffs, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Ace') {
        document.getElementById('hero-role').textContent = 'Support/Debuffs';
        document.getElementById('hero-primary-content').textContent = 'Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Alice') {
        document.getElementById('hero-role').textContent = 'Healer';
        document.getElementById('hero-primary-content').textContent = 'Arena, Total War, GvG (Situational)';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Aragon') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Aquila') {
        document.getElementById('hero-role').textContent = 'Support/Tank';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War (Death comps)';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Low (high if you\'re a death comp freak)';
    } else if (heroName === 'Ballista') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Bi Dam') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very low';
    } else if (heroName === 'Biscuit') {
        document.getElementById('hero-role').textContent = 'Support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Advent, Nightmare Pushing';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'VERY high';
    } else if (heroName === 'Chancellor') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'GvG';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Dont';
    } else if (heroName === 'Colt') {
        document.getElementById('hero-role').textContent = 'Support, DPS, Counter CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Daisy') {
        document.getElementById('hero-role').textContent = 'Petrify Immunity';
        document.getElementById('hero-primary-content').textContent = 'Raid';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Dellons') {
        document.getElementById('hero-role').textContent = 'DPS, Support';
        document.getElementById('hero-primary-content').textContent = 'Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Eileene') {
        document.getElementById('hero-role').textContent = 'CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Nightmare, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Espada') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Raid';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Fai') {
        document.getElementById('hero-role').textContent = 'Dps, Support, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'Arena, Nightmare, Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0 (T6 goes crazy but lets be real here)';
        document.getElementById('hero-wishlist-priority').textContent = 'N/A';
    } else if (heroName === 'Jave') {
        document.getElementById('hero-role').textContent = 'DPS, CC';
        document.getElementById('hero-primary-content').textContent = 'Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very low';
    } else if (heroName === 'Juri') {
        document.getElementById('hero-role').textContent = 'Support, DPS, Debuff';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Nightmare, Total War, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0';
        document.getElementById('hero-wishlist-priority').textContent = 'N/A';
    } else if (heroName === 'Vanessa') {
        document.getElementById('hero-role').textContent = 'Support, Buffs, Debuffs';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High (High is you are looking for the best utility unit in the game, the higher transcendence the more utility)';
    } else if (heroName === 'Kagura') {
        document.getElementById('hero-role').textContent = 'Support/Debuffs/CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Karma') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Total War, Arena';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Klahan') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'Being fodder (nightmare farming is ok)';
        document.getElementById('hero-target-transcendence').textContent = 'Fodder';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Knox') {
        document.getElementById('hero-role').textContent = 'Tank/Death';
        document.getElementById('hero-primary-content').textContent = 'Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Do Not';
    } else if (heroName === 'Kyle') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Everything...';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Kris') {
        document.getElementById('hero-role').textContent = 'Death';
        document.getElementById('hero-primary-content').textContent = 'Total War, Arena, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Very Low';
    } else if (heroName === 'Platin') {
        document.getElementById('hero-role').textContent = 'Tank';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Rachel') {
        document.getElementById('hero-role').textContent = 'Debuff Support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Advent Expedition';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Rin') {
        document.getElementById('hero-role').textContent = 'DPS, Debuff';
        document.getElementById('hero-primary-content').textContent = 'Arena, Total War, GvG, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Rook') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Rudy') {
        document.getElementById('hero-role').textContent = 'Tank, Support';
        document.getElementById('hero-primary-content').textContent = 'Nightmare, Arena, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Ruri') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Pascal') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Raid, Nightmare (niche), Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Orly') {
        document.getElementById('hero-role').textContent = 'Support';
        document.getElementById('hero-primary-content').textContent = 'GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Nia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'Fodder';
        document.getElementById('hero-target-transcendence').textContent = 'Fodder';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Miho') {
        document.getElementById('hero-role').textContent = 'Support, sub-dps';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2 (T6 is fine but T2 is the biggest)';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Mercure') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Nightmare, Arena, Total War, GvG';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Lina') {
        document.getElementById('hero-role').textContent = 'Healer/Buffer';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush, Nightmare, Total War, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T2-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High';
    } else if (heroName === 'Kyrielle') {
        document.getElementById('hero-role').textContent = 'DPS, Counter CC, CC';
        document.getElementById('hero-primary-content').textContent = 'Arena, GvG, Total War, Advent Expedition';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Yeonhee') {
        document.getElementById('hero-role').textContent = 'DPS, Counter CC, CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare, Advent Expedition, Castle Rush';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Yu Shin') {
        document.getElementById('hero-role').textContent = 'CC';
        document.getElementById('hero-primary-content').textContent = 'GvG, Arena, Total War, Nightmare';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T2';
        document.getElementById('hero-wishlist-priority').textContent = 'Medium';
    } else if (heroName === 'Sieg') {
        document.getElementById('hero-role').textContent = 'DPS, support';
        document.getElementById('hero-primary-content').textContent = 'Raid, Castle Rush';
        document.getElementById('hero-target-transcendence').textContent = 'T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Low';
    } else if (heroName === 'Taka') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Castle Rush, Advent';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'High';
    } else if (heroName === 'Teo') {
        document.getElementById('hero-role').textContent = 'DPS';
        document.getElementById('hero-primary-content').textContent = 'Arena, Nightmare, GvG, Total War';
        document.getElementById('hero-target-transcendence').textContent = 'T0-T6';
        document.getElementById('hero-wishlist-priority').textContent = 'Very High (N/A if u pull him from welcome banner, which you should)';
    } else if (heroName === 'Spike') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Bane') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Catty') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Cleo') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Sylvia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Heavenia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Hellenia') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Lania') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'May') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Hokin') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Rahkun') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    } else if (heroName === 'Snipper') {
        document.getElementById('hero-role').textContent = 'Fodder';
        document.getElementById('hero-primary-content').textContent = 'None';
        document.getElementById('hero-target-transcendence').textContent = 'None';
        document.getElementById('hero-wishlist-priority').textContent = 'Do not';
    }

    // Clear and populate hero sections
    clearHeroSections();
    populateHeroSections(heroName);

    // Switch views
    switchView('detail');
}

// Switch between views
function switchView(view) {
    const gridView = document.getElementById('hero-grid-view');
    const detailView = document.getElementById('hero-detail-view');
    const adventView = document.getElementById('advent-teams-view');

    if (view === 'detail') {
        gridView.classList.remove('active');
        detailView.classList.add('active');
        adventView.classList.remove('active');
        currentView = 'detail';
        // Scroll to top when entering detail view
        window.scrollTo(0, 0);
    } else if (view === 'advent') {
        gridView.classList.remove('active');
        detailView.classList.remove('active');
        adventView.classList.add('active');
        currentView = 'advent';
        // Restore scroll position when returning to advent view
        setTimeout(() => {
            window.scrollTo(0, savedAdventScrollPosition);
        }, 0);
    } else {
        detailView.classList.remove('active');
        adventView.classList.remove('active');
        gridView.classList.add('active');
        currentView = 'grid';
        // Restore scroll position when returning to grid view
        setTimeout(() => {
            window.scrollTo(0, savedScrollPosition);
        }, 0);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Back button (from hero detail)
    document.getElementById('back-button').addEventListener('click', () => {
        // If we came from an external page (like wish-list), navigate back to it
        if (referrerPage === 'wishlist') {
            window.location.href = 'wish-list.html';
        } else {
            // Otherwise, return to the previous view (grid or advent)
            switchView(previousView === 'advent' ? 'advent' : 'grid');
        }
    });

    // Back button (from advent teams)
    document.getElementById('advent-back-button').addEventListener('click', () => {
        switchView('grid');
    });

    // Boss filter dropdown (optimized to use class-based hiding)
    document.getElementById('boss-filter').addEventListener('change', (e) => {
        const selectedBoss = e.target.value;
        const bossSections = document.querySelectorAll('.advent-boss-section');

        // Batch DOM changes using requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            bossSections.forEach(section => {
                if (selectedBoss === 'all') {
                    section.classList.remove('hidden');
                } else {
                    const shouldShow = section.dataset.boss === selectedBoss;
                    section.classList.toggle('hidden', !shouldShow);
                }
            });
        });
    });

    // Advent Teams link
    document.getElementById('advent-teams-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Save current scroll position before navigating
        savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        switchView('advent');
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderHeroGrid();
    });

    // Searchable effect filter
    setupEffectFilterListeners();

    // Type filter buttons
    setupTypeFilterListeners();

    // Target filter dropdown
    setupTargetFilterListeners();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Press Escape to go back or close dropdowns
        if (e.key === 'Escape') {
            if (currentView === 'detail' || currentView === 'advent') {
                switchView('grid');
            } else {
                const effectDropdown = document.getElementById('effect-dropdown');
                const targetDropdown = document.getElementById('target-dropdown');
                const effectSearchInput = document.getElementById('effect-search-input');
                const targetSearchInput = document.getElementById('target-search-input');
                effectDropdown.classList.remove('show');
                targetDropdown.classList.remove('show');
                updateComboboxExpandedState(effectSearchInput, false);
                updateComboboxExpandedState(targetSearchInput, false);
            }
        }
    });
}

// Setup effect filter listeners
function setupEffectFilterListeners() {
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

function updateComboboxExpandedState(input, isExpanded) {
    if (!input) return;
    input.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
}

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
    selectedEffect = value;

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

// Setup type filter button listeners
function setupTypeFilterListeners() {
    const typeButtons = document.querySelectorAll('.type-filter-button');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Update selected type
            selectedType = button.getAttribute('data-type');

            // Render filtered heroes
            renderHeroGrid();
        });
    });
}

// Setup target filter listeners
function setupTargetFilterListeners() {
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
    selectedTarget = value;

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

// Clear all hero sections
function clearHeroSections() {
    const sectionsContainer = document.getElementById('hero-sections');
    sectionsContainer.innerHTML = '';
}

// Helper function to get gear set image path
function getGearSetImagePath(gearSetName) {
    const folderPath = encodeURI('Gear Sets Photos/');
    const fileName = encodeURIComponent(gearSetName) + '.png';
    return folderPath + fileName;
}

// Helper function to create a single gear card
function createGearCard(gearName, mainStats, requiredStats, subStats = null) {
    return `
        <div class="gear-card">
            <div class="gear-card-title">${gearName}</div>
            <div class="gear-card-content">
                <div class="gear-card-image">
                    <img src="${getGearSetImagePath(gearName)}" alt="${gearName}" onerror="this.parentElement.style.display='none'">
                </div>
                <div class="gear-card-stats">
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Main Stats</span>
                        <div class="gear-stat-value">${mainStats || '<em>To be added</em>'}</div>
                    </div>
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Required Stat Thresholds</span>
                        <div class="gear-stat-value">${requiredStats || '<em>To be added</em>'}</div>
                    </div>
                    <div class="gear-stat-item">
                        <span class="gear-stat-label">Sub Stat Priority</span>
                        <div class="gear-stat-value">${subStats || '<em>To be added</em>'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper function to create a tier section with gear cards
function createTierSection(tierName, gearSets, mainStats, requiredStats, subStats = null) {
    // Parse gear sets (they can be comma-separated)
    const gearNames = gearSets.split(',').map(name => name.trim()).filter(name => name);

    const gearCardsHTML = gearNames.map(gearName =>
        createGearCard(gearName, mainStats, requiredStats, subStats)
    ).join('');

    return `
        <div class="tier-section">
            <h3 class="tier-section-title">${tierName}</h3>
            <div class="gear-cards-grid">
                ${gearCardsHTML}
            </div>
        </div>
    `;
}

// Helper function to check if T6 gear is different from T0
function isT6DifferentFromT0(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats) {
    // If T6 gear doesn't exist or is placeholder, it's not different
    if (!t6Gear || t6Gear === 'Content to be added' || t6Gear === 'N/A') {
        return false;
    }

    // Compare all gear attributes
    return t6Gear !== t0Gear ||
           t6MainStats !== t0MainStats ||
           t6RequiredStats !== t0RequiredStats ||
           t6SubStats !== t0SubStats;
}

// Helper function to build Gear PvE/PvP section with cards
function buildGearSection(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats) {
    let html = '';

    if (t0Gear && t0Gear !== 'Content to be added' && t0Gear !== 'N/A') {
        html += createTierSection('Gear T0', t0Gear, t0MainStats, t0RequiredStats, t0SubStats);
    }

    // Only show T6 section if it's different from T0
    if (t6Gear && t6Gear !== 'Content to be added' && t6Gear !== 'N/A') {
        if (isT6DifferentFromT0(t0Gear, t0MainStats, t0RequiredStats, t0SubStats, t6Gear, t6MainStats, t6RequiredStats, t6SubStats)) {
            html += createTierSection('Gear T6', t6Gear, t6MainStats, t6RequiredStats, t6SubStats);
        }
    }

    return html || '<div class="subsection-content" style="color: var(--text-secondary);"><em>Content to be added</em></div>';
}

// Populate hero sections with gear information
function populateHeroSections(heroName) {
    // Amelia-specific content
    if (heroName === 'Amelia') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>S1 concussion is very strong when paired with multi hit heroes. Can infinitely cc 3 enemies.</li>
                <li>Amelia should be squishy, as she provides a large shield and cleanse when dying</li>
                <li>Very strong against tank team due to HP alteration and anti-heal</li>
                <li>Game changer when paired with Kyle</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Vanguard Physical',                  // T0 Gear
            'All Attack % (not that important)', // T0 Main Stats
            'N/A',                                // T0 Required Stat Thresholds
            null,                                 // T0 Sub Stat Priority
            'Vanguard Physical',                  // T6 Gear
            'All Attack % (not that important)', // T6 Main Stats
            'N/A',                                // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Physical, Full Speed',  // T0 Gear
            'All Attack % (not that important)', // T0 Main Stats
            'N/A',                                // T0 Required Stat Thresholds
            null,                                 // T0 Sub Stat Priority
            'Spellweaver Physical, Vanguard Physical', // T6 Gear
            'All Attack % (not that important)', // T6 Main Stats
            'N/A',                                // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Amelia
    }

    // Ace-specific content
    if (heroName === 'Ace') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>The main reason you use Ace is because of his defense down passive. He is really sticky due to guts and provides good debuffs for your team.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Vanguard Physical',  // T0 Gear
            'N/A',                // T0 Main Stats
            'N/A',                // T0 Required Stat Thresholds
            null,                 // T0 Sub Stat Priority
            null,                 // T6 Gear (not used)
            null,                 // T6 Main Stats
            null,                 // T6 Required Stat Thresholds
            null                  // T6 Sub Stat Priority
        ) + '<div class="subsection-content" style="color: var(--text-tertiary); font-style: italic; margin-top: 1rem;">Why are u making Ace T6? Get a life</div>');

        addHeroSection('Gear PvP', buildGearSection(
            'Full Speed',    // T0 Gear
            'All Attack %',  // T0 Main Stats
            'SPEEEEEED',     // T0 Required Stat Thresholds
            null,            // T0 Sub Stat Priority
            null,            // T6 Gear (not used for Ace)
            null,            // T6 Main Stats
            null,            // T6 Required Stat Thresholds
            null             // T6 Sub Stat Priority
        ) + '<div class="subsection-content" style="color: var(--text-tertiary); font-style: italic; margin-top: 1rem;">Why are u making Ace T6? Get a life</div>');

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Ace
    }

    // Aragon-specific content (Fodder)
    if (heroName === 'Aragon') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Aragon
    }

    // Aquila-specific content
    if (heroName === 'Aquila') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Want to stack death with Aquila S2 and Kris S2 then proc it with Aquila S1. Leading with S2 is good cause it gives link.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Physical',
                        'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)',
                        'Not important but 100% block is good if you can get it',
                        'Block rate, Max HP'
                    )}
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)',
                        '100% block rate',
                        'Block rate, Max HP'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Physical',                           // T0 Gear
            'Max HP % (weapons), Block Rate (armor), All damage reduction (armor)', // T0 Main Stats
            'SPEED, rest not important but 100% block is good if you can get it',   // T0 Required Stat Thresholds
            'SPEED, Block rate, Max HP',                      // T0 Sub Stat Priority
            null,                                              // T6 Gear (not used)
            null,                                              // T6 Main Stats
            null,                                              // T6 Required Stat Thresholds
            null                                               // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2</p>
            </div>
        `);

        return; // Exit early for Aquila
    }

    // Ballista-specific content (Fodder)
    if (heroName === 'Ballista') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Ballista
    }

    // Bi Dam-specific content
    if (heroName === 'Bi Dam') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only used in one castle rush and advent. Low priority, only go for him if u get a bunch of random copies for no reason.</li>
                <li>Stack bleeds to detonate. Bleeds damage are based off of max attack</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',            // T0 Gear
            'Crit Rate, All Attack %',     // T0 Main Stats
            '100% crit rate',              // T0 Required Stat Thresholds
            'Attack, Crit Rate, Weakness Hit', // T0 Sub Stat Priority
            'Avenger Physical',            // T6 Gear
            'Crit Rate, All Attack %',     // T6 Main Stats
            '100% crit rate',              // T6 Required Stat Thresholds
            'Attack, Crit Rate, Weakness Hit'  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Bi Dam
    }

    // Biscuit-specific content
    if (heroName === 'Biscuit') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Amazing for clearing nightmare on 3* when used in physical team with Kyle</li>
                <li>Used in almost all PvE content. Need speed sub stats for Ox (so Espanda goes 4th)</li>
                <li>Can build crit set if you're pushing damage in castle rush or advent</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Magic',
                        'Defense (weapons), Block Rate (armors), Damange Reduction (armors)',
                        'None',
                        'Block rate, Defense, HP'
                    )}
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Magic (Situational)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Magic')}" alt="Assassin Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate (weapons), Defense % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">100% crit rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit rate, Crit damage, Defense</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1 &gt; passive &gt; basic attack</p>
            </div>
        `);

        return; // Exit early for Biscuit
    }

    // Alice-specific content
    if (heroName === 'Alice') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Defensive healer. Generally used in tank comp. The defense she gives makes a lot of the tanky heroes a lot stronger, especially Platin.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Paladin Magic',  // T0 Gear
            'Max HP%',        // T0 Main Stats
            'Max HP',         // T0 Required Stat Thresholds
            null,             // T0 Sub Stat Priority
            'Paladin Magic',  // T6 Gear
            'Max HP%',        // T6 Main Stats
            'Max HP',         // T6 Required Stat Thresholds
            null              // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Max HP% (weapons), Block Rate (armors)', // T0 Main Stats
            'Max HP, Speed',                       // T0 Required Stat Thresholds
            null,                                  // T0 Sub Stat Priority
            'Gatekeeper Magic',                    // T6 Gear
            'Max HP% (weapons), Block Rate (armors)', // T6 Main Stats
            'Max HP, Speed',                       // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Not that important overall but the basic attack and passive are both pretty nice</p>
            </div>
        `);

        return; // Exit early for Alice
    }

    // Chancellor-specific content
    if (heroName === 'Chancellor') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Can be used in guild war but lets be real this guy is fodder</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Chancellor
    }

    // Colt-specific content
    if (heroName === 'Colt') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Good in physical and magic comp in Arena</li>
                <li>OP when paired with Platin in GvG</li>
                <li>Cant be CCd due to camouflage and can counter cc if your whole team gets stunned</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'Speed, All Attack %, All Attack, Effect Hit Rate'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'Speed, All Attack %, All Attack, Effect Hit Rate'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Colt
    }

    // Daisy-specific content
    if (heroName === 'Daisy') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Really hard to find perfect gear for her to clear higher levels of Ox. Gotta find the balance between 1 shotting the ads and being tanky enough to live.</li>
                <li>Can occasionally be used to counter petrify in any other content (like nightmare 8-30)</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Magic',                                                    // T0 Gear
            'Crit Rate (weapons), All Attack % (Armor), Damage Taken Reduction (Armor)', // T0 Main Stats
            '100% Crit Rate, 16% Damage Taken Reduction, 200% Crit Damage',    // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, All Attack %, Max HP',                     // T0 Sub Stat Priority
            null,                                                                // T6 Gear
            null,                                                                // T6 Main Stats
            null,                                                                // T6 Required Stat Thresholds
            null                                                                 // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        return; // Exit early for Daisy
    }

    // Dellons-specific content
    if (heroName === 'Dellons') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Dellons is strong but too many units outshine him. Not very high prio. Might be in line for a buff after this next round.</li>
                <li>Weakness hit is good so he resets his ult</li>
                <li>Silence can be nice</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',                              // T0 Gear
            'Crit Rate (weapons), All Attack % (Armor)',     // T0 Main Stats
            '100% Crit Rate (18% from T4)',                  // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage',                        // T0 Sub Stat Priority
            null,                                             // T6 Gear
            null,                                             // T6 Main Stats
            null,                                             // T6 Required Stat Thresholds
            null                                              // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Weakness Hit Chance, All Attack % (armors)',
                        'None',
                        'Speed, Weakness Hit Chance, Crit Rate, Crit Damage'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Dellons
    }

    // Eileene-specific content
    if (heroName === 'Eileene') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>S2 is really strong. Multi-hit shock. Much stronger when paired with rosie but not necessary. T6 adds 10% x2 chance to hit which is very powerful.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',  // T0 Gear
            'N/A',                   // T0 Main Stats
            'None',                  // T0 Required Stat Thresholds
            'N/A',                   // T0 Sub Stat Priority
            null,                    // T6 Gear
            null,                    // T6 Main Stats
            null,                    // T6 Required Stat Thresholds
            null                     // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Physical',
                        'N/A',
                        'None',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Eileene
    }

    // Espada-specific content
    if (heroName === 'Espada') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Needs to have the 4th highest speed on your team for Ox</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                                                         // T0 Gear
            'Crit Rate (Armor)',                                                     // T0 Main Stats
            '60% Crit Rate, 200% Crit Damage',                                       // T0 Required Stat Thresholds
            'Crit Damage, Crit Rate, Weakness Hit Chance, All Attack %, All Attack', // T0 Sub Stat Priority
            null,                                                                    // T6 Gear
            null,                                                                    // T6 Main Stats
            null,                                                                    // T6 Required Stat Thresholds
            null                                                                     // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Espada
    }

    // Fai-specific content
    if (heroName === 'Fai') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Can use for power up dungeons before u have strong shane/Espada</li>
                <li>Passive phys vulnerability + S1 upgrade for defense down is a powerful combo to make your hitters like Kyle go crazy</li>
                <li>Weakness hit set is playable because she will more often target low hp targets with her execute</li>
                <li>Dont underestimate the burn, it does alot of damage</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Avenger Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'Speed',
                        'Speed, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Weakness Hit Chance, All Attack %',
                        'Speed',
                        'Speed, Weakness HIt Chance, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1 &gt; Passive</p>
            </div>
        `);

        return; // Exit early for Fai
    }

    // Jave-specific content
    if (heroName === 'Jave') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Usable in Total War. Hes not a bad unit but just doesnt see many use cases where he outshines other heroes.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Physical',                                    // T0 Gear
            'All Attack % (weapons), Block Rate (armors)',           // T0 Main Stats
            '100% Block, as much attack as possible',                // T0 Required Stat Thresholds
            'Block rate, All Attack %, All Attack, Defense',         // T0 Sub Stat Priority
            null,                                                      // T6 Gear (not used)
            null,                                                      // T6 Main Stats
            null,                                                      // T6 Required Stat Thresholds
            null                                                       // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Jave
    }

    // Juri-specific content
    if (heroName === 'Juri') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Soul death is Op in PvP. Counters phyiscal comp, can also be used IN physical comp.</li>
                <li>Can be used as DPS in Yeonhee advent 2nd team</li>
                <li>Follow up attack is pretty strong with Mercure dot</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate',
                        '100% Crit Rate',
                        'Crit Rate, Crit Damage'
                    )}
                    ${createGearCard(
                        'Avenger Magic',
                        'Crit Rate',
                        '100% Crit Rate',
                        'Crit Rate, Crit Damage, Weakness Hit, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Spellweaver Magic',                   // T0 Gear
            'Doesnt matter',                       // T0 Main Stats
            'Speed',                               // T0 Required Stat Thresholds
            'Speed',                               // T0 Sub Stat Priority
            null,                                   // T6 Gear (not used)
            null,                                   // T6 Main Stats
            null,                                   // T6 Required Stat Thresholds
            null                                    // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2 &gt; Passive</p>
            </div>
        `);

        return; // Exit early for Juri
    }

    // Vanessa-specific content
    if (heroName === 'Vanessa') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Sandstorm sits at (%70-%80) chance to inflict a skill cooldown increase. This is the highest "CC" ability in the game and Spellweaver set increases probability to (%80-%90). Skill cooldown increase in PvP is an amazing opener as landing any can mess up the enemies queued skills. This unit is very good for magic team compositions and can even be used in some physical teams since her passive gives (%20-%24) defense down.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',                          // T0 Gear
            'Effect Hit Rate',                            // T0 Main Stats
            'Effect Hit Rate',                            // T0 Required Stat Thresholds
            'Effect Resistance, Max HP%, Block Rate %',   // T0 Sub Stat Priority
            null,                                          // T6 Gear (not different from T0)
            null,                                          // T6 Main Stats
            null,                                          // T6 Required Stat Thresholds
            null                                           // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'Effect Hit Rate',
                        'N/A',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'Full Speed',
                        'Full Speed',
                        'Full Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 1, Skill 2, Passive (ALL GOOD)</p>
            </div>
        `);

        return; // Exit early for Vanessa
    }

    // Kagura-specific content
    if (heroName === 'Kagura') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Core PvP unit for physical comp. Stickiest unit in the game</li>
                <li>U want Kagura to die quickly in PvP to get the cleanse off</li>
                <li>Feels really bad when she casts S1 in PvP, so if you build full crit at least it doest decent damage</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Vanguard Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed, all attack %'
                    )}
                    ${createGearCard(
                        'Assassin Physical',
                        'All Attack %, Crit Rate (Weapons)',
                        'None',
                        'Speed, Crit Rate, All Attack %, Crit Damage'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'None',
                        'Speed > All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2</p>
            </div>
        `);

        return; // Exit early for Kagura
    }

    // Karma-specific content
    if (heroName === 'Karma') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Only really usable in full tank comp. Need T6 or he will feel pretty bad, but becomes an absolute menace in an upgraded tank comp. Really meant for whales tbh.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>Content to be added</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                            // T0 Gear
            'Weakness Hit (weapons), Block Rate (armors)', // T0 Main Stats
            '67% Block Rate',                              // T0 Required Stat Thresholds
            'Block Rate > Weakness Hit > Crit Rate',       // T0 Sub Stat Priority
            'Orchestrator Magic',                          // T6 Gear
            'Weakness Hit (weapons), Block Rate (armors)', // T6 Main Stats
            '67% Block Rate',                              // T6 Required Stat Thresholds
            'Block Rate > Weakness Hit > Crit Rate'        // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2 &gt; Basic Attack</p>
            </div>
        `);

        return; // Exit early for Karma
    }

    // Klahan-specific content (Fodder)
    if (heroName === 'Klahan') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder until buffed</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Klahan
    }

    // Knox-specific content
    if (heroName === 'Knox') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Main reason to have him is for his passive death chance increase in death comp</li>
                <li>Death comp is kinda weak rn, so mostly u will use him as fodder but keep 1-3 copies for when u need death (total war, nightmare)</li>
            </ul>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',                   // T0 Gear
            'Anything tanky',                         // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'Anything tanky',                         // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - only T0 has data
        addHeroSection('Gear PvP', buildGearSection(
            'Full Speed',                             // T0 Gear
            'N/A',                                    // T0 Main Stats
            'Speed',                                  // T0 Required Stat Thresholds
            'Speed',                                  // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>No priority specified</em>
            </div>
        `);

        return; // Exit early for Knox
    }

    // Kyle-specific content
    if (heroName === 'Kyle') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Most OP hero in the game. Good in almost all content. Beyond broken for pushing nightmare, tower, arena, total war, etc.</li>
                <li>No counter for Kyle in GvG. Just have to Kyle vs Kyle and Pray</li>
                <li>S2 is a buff removal so usually cast it 2nd if you need to strip immortality</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Physical')}" alt="Assassin Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Physical (Castle Rush/Bossing)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Physical')}" alt="Avenger Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Bounty Tracker Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Bounty Tracker Physical')}" alt="Bounty Tracker Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate, then stack as much crit damage and weakness hit as you can</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Weakness Hit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Physical (Castle Rush/Bossing)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Physical')}" alt="Avenger Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Assassin Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Assassin Physical')}" alt="Assassin Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% Crit Rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Speed, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    <div class="gear-card">
                        <div class="gear-card-title">Bounty Tracker Physical (General)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Bounty Tracker Physical')}" alt="Bounty Tracker Physical" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate, then stack as much crit damage and weakness hit as you can</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Weakness Hit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gear-card">
                        <div class="gear-card-title">Orchestrator Magic (Effect Resist)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Orchestrator Magic')}" alt="Orchestrator Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate, Crit Damage, All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">73% crit rate</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Damage, Crit Rate, Speed, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Passive &gt; S1 &gt; S2</p>
            </div>
        `);

        return; // Exit early for Kyle
    }

    // Kris-specific content
    if (heroName === 'Kris') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Death comp is not in a good spot right now. He might be better if it gets buffed, but atm its just for total war or specific nightmare levels.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',                                        // T0 Gear
            'Effect Hit Rate, Defense %, HP %, Block Rate (armors), Damage Reduction (Armors)', // T0 Main Stats
            '100% Block',                                                  // T0 Required Stat Thresholds
            'Block Rate, Defense %, HP %, Effect Hit',                     // T0 Sub Stat Priority
            null,                                                           // T6 Gear (not used)
            null,                                                           // T6 Main Stats
            null,                                                           // T6 Required Stat Thresholds
            null                                                            // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'Speed',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'HP %, Damage Reduction (armors), Block Rate (armors)',
                        'Speed',
                        'Speed, Block Rate, HP %, Defense %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All are good</p>
            </div>
        `);

        return; // Exit early for Kris
    }

    // Kyrielle-specific content
    if (heroName === 'Kyrielle') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Overall not that great of a hero at lower tiers. Once you get her to T2-T6 she becomes a little bit more of a viable PvP unit. T2 gives her single targert Skill 1 a recast on kill and Skill 2 is a AOE Paralysis. The good thing about this unit is at T6 you dont have to worry about queueing any skills in PvP since she becomes immune to CC. This hero also scales all attack with speed making it a good speed stick as well as good CC.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',          // T0 Gear
            'Effect Hit Rate',            // T0 Main Stats
            'None',                       // T0 Required Stat Thresholds
            'Effect Hit Rate, Speed, Crit Rate, Crit Damage, Weakness Hit Chance, All Attack %', // T0 Sub Stat Priority
            null,                         // T6 Gear (not specified)
            null,                         // T6 Main Stats
            null,                         // T6 Required Stat Thresholds
            null                          // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'Crit Rate, Crit Damage',
                        'None',
                        'Speed, Crit Rate, Crit Damage, Weakness Hit Chance, All Attack %'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'Full Speed',
                        'Full Speed',
                        'Full Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 2, Basic Attack, Skill 1, Passive</p>
            </div>
        `);

        return; // Exit early for Kyrielle
    }

    // Lina-specific content
    if (heroName === 'Lina') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Used in almost all content. Really good heals while also buffing your team's damage a ton. T6 unlocks backline defense debuff, which adds a lot of damage in content like castle rush.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Paladin Magic',                       // T0 Gear
            'Health %',                            // T0 Main Stats
            'None',                                // T0 Required Stat Thresholds
            'Health %, Health, Block Rate, Defense', // T0 Sub Stat Priority
            null,                                  // T6 Gear (not specified)
            null,                                  // T6 Main Stats
            null,                                  // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Health % (weapons), Block Rate (armors)', // T0 Main Stats
            '100% block rate',                     // T0 Required Stat Thresholds
            'Block Rate, HP %, HP',                // T0 Sub Stat Priority
            null,                                  // T6 Gear (not specified)
            null,                                  // T6 Main Stats
            null,                                  // T6 Required Stat Thresholds
            null                                   // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All</p>
            </div>
        `);

        return; // Exit early for Lina
    }

    // Mercure-specific content
    if (heroName === 'Mercure') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Really good in most content. Magic reflux spreads a lot faster when u get him T2 and T6, as well as with spellweaver set.</li>
                <li>Strong with platin in arena cause platin can solo tank and does a lot of aoe damage proccing magic reflux often</li>
                <li>Dont even think about playing him without 3 mages on the team</li>
                <li>Premier nightmare and tower pusher</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Physical',               // T0 Gear
            'All Attack %',                       // T0 Main Stats
            'None, just go for all attack',      // T0 Required Stat Thresholds
            'All Attack %',                       // T0 Sub Stat Priority
            null,                                 // T6 Gear (not specified)
            null,                                 // T6 Main Stats
            null,                                 // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Full Speed',
                        'All Attack %',
                        'Speed, then stack all attack as high as you can',
                        'Speed, All Attack %'
                    )}
                    ${createGearCard(
                        'Spellweaver Physical',
                        'All Attack %',
                        'Push for as much speed as possible',
                        'Speed, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All good but prio passive</p>
            </div>
        `);

        return; // Exit early for Mercure
    }

    // Miho-specific content
    if (heroName === 'Miho') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>T2 for the cleanse is really big for certain castle rushes and advent. Can clear the first 2 waves in CR easily, and magic vuln on her S1 for the boss.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate (weapons), All Attack % (armors)',
                        '100% crit rate',
                        'Crit Rate, Crit Damage, All Attack %'
                    )}
                    <div class="gear-card">
                        <div class="gear-card-title">Avenger Magic (Duo carry - need T6 biscuit)</div>
                        <div class="gear-card-content">
                            <div class="gear-card-image">
                                <img src="${getGearSetImagePath('Avenger Magic')}" alt="Avenger Magic" onerror="this.parentElement.style.display='none'">
                            </div>
                            <div class="gear-card-stats">
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Main Stats</span>
                                    <div class="gear-stat-value">Crit Rate (weapons), All Attack % (armors)</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Required Stat Thresholds</span>
                                    <div class="gear-stat-value">100% crit and as much weakness as u can get</div>
                                </div>
                                <div class="gear-stat-item">
                                    <span class="gear-stat-label">Sub Stat Priority</span>
                                    <div class="gear-stat-value">Crit Rate, Weakness Hit, Crit Damage, All Attack %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Miho
    }

    // Nia-specific content (Fodder)
    if (heroName === 'Nia') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Shes not useless but doesnt really find a place in the meta. Most likely will be phased out entirely after a few more hero releases.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Nia
    }

    // Orly-specific content
    if (heroName === 'Orly') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Solo back liner for mage compositions. T6 makes the mages (especially Silvesta) cracked out the wazoo.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Orchestrator Magic',                 // T0 Gear
            'All Attack % (weapons), Block Rate (armors), Damage Reduction (armors)', // T0 Main Stats
            'As much speed as possible',          // T0 Required Stat Thresholds
            'Speed, All Attack %, Block Rate, Effect Resist', // T0 Sub Stat Priority
            null,                                 // T6 Gear (not specified)
            null,                                 // T6 Main Stats
            null,                                 // T6 Required Stat Thresholds
            null                                  // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1, Basic Attack</p>
            </div>
        `);

        return; // Exit early for Orly
    }

    // Pascal-specific content
    if (heroName === 'Pascal') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Really need this unit. His kit is self-explanatory. Skill enhances and transcendence are really important.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                       // T0 Gear
            'Crit Rate, Crit Damage, All Attack % (armors)', // T0 Main Stats
            '100% crit rate, 46% weakness if using Biscuit. Dont need weakness if using Asura', // T0 Required Stat Thresholds
            'Crit Rate, Weakness Hit Rate (unless Asura), Crit Damage', // T0 Sub Stat Priority
            'Avenger Magic',                       // T6 Gear
            'Crit Damage (weapons), All Attack % (armors)', // T6 Main Stats
            '46% weakness',                        // T6 Required Stat Thresholds
            'Weakness Hit Rate, Crit Damage, All Attack %' // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>All except basic attack</p>
            </div>
        `);

        return; // Exit early for Pascal
    }

    // Platin-specific content
    if (heroName === 'Platin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Can play as solo front line with almost any comp in PVP</li>
                <li>Strong with colt in GvG</li>
                <li>Insanely stat hungry hero, hard to fit speed on him because he needs to be as tanky as possible</li>
            </ul>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Gear PvP', buildGearSection(
            'Gatekeeper Magic',                    // T0 Gear
            'Defense % (weapons), Block Rate (armors), Damage Reduction (one armor, optional)', // T0 Main Stats
            '100% block rate',                     // T0 Required Stat Thresholds
            'Block Rate, Defense %, Health %',     // T0 Sub Stat Priority
            'Gatekeeper Magic',                    // T6 Gear
            'Defense % (weapons), Block Rate (armors), Damage Reduction (one armor, optional)', // T6 Main Stats
            '100% block rate',                     // T6 Required Stat Thresholds
            'Block Rate, Defense %, Health %'      // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Not important but passive can be nice to have</p>
            </div>
        `);

        return; // Exit early for Platin
    }

    // Rachel-specific content
    if (heroName === 'Rachel') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Debuffs can feel OP at times. Pairs very well with Shane for debuff counter</li>
                <li>T6 makes her a dps in castle rush with 3 target hit</li>
            </ul>
        `, heroName);

        // Gear PvE section with T0 and T6
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'Weakness Hit (to hit middle target in castle rush), All Attack % (armors)',
                        '73% Weakness Hit',
                        'Block Rate, Weakness Hit'
                    )}
                </div>
            </div>
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Gatekeeper Physical',
                        'All Attack %, All Attack % (armors), Block Rate (armors)',
                        'None',
                        'Block Rate, All Attack %'
                    )}
                    ${createGearCard(
                        'Avenger Physical',
                        'Crit Rate, Crit Damage, All Attack % (armors)',
                        '100% Crit Rate, as much crit damage as possible',
                        'Crit Rate, Crit Damage, Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Rachel
    }

    // Rin-specific content
    if (heroName === 'Rin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only source of confusion in the game</li>
                <li>Confusion is an incredibly strong opener. Negates enemys effects and lowers their damage.</li>
                <li>Buff removal is really strong to kill heroes with immortality</li>
            </ul>
        `, heroName);

        // Gear PvE section with T0
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Magic',                           // T0 Gear
            'Crit Rate, Weakness Hit, Attack %',        // T0 Main Stats
            '67% crit with 3850 Attack is optimal (she gets more crit based on attack)', // T0 Required Stat Thresholds
            'Crit Rate, Weakness Hit, Attack %',        // T0 Sub Stat Priority
            null,                                        // T6 Gear (not specified)
            null,                                        // T6 Main Stats
            null,                                        // T6 Required Stat Thresholds
            null                                         // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', buildGearSection(
            'Assassin Magic',                           // T0 Gear
            'Crit Rate, Weakness Hit, Attack %',        // T0 Main Stats
            '67% crit with 3850 Attack is optimal (she gets more crit based on attack)', // T0 Required Stat Thresholds
            'Speed, Crit Rate, Weakness Hit, Attack %', // T0 Sub Stat Priority
            null,                                        // T6 Gear (not specified)
            null,                                        // T6 Main Stats
            null,                                        // T6 Required Stat Thresholds
            null                                         // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Rin
    }

    // Rook-specific content (Fodder)
    if (heroName === 'Rook') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This hero is not worth investing in.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Rook
    }

    // Rudy-specific content
    if (heroName === 'Rudy') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Only go for him if ur building tank comp, which is usually for whales.</li>
                <li>U can use him in nightmare if u need the link and/or cleanse</li>
            </ul>
        `, heroName);

        // Gear PvE section - T0 and T6 have same gear
        addHeroSection('Gear PvE', buildGearSection(
            'Orchestrator Physical',                  // T0 Gear
            'Defense % (weapons), Block Rate (armors)', // T0 Main Stats
            '100% Block Rate',                        // T0 Required Stat Thresholds
            'Block Rate, Defense %, Effect Resist',   // T0 Sub Stat Priority
            'Orchestrator Physical',                  // T6 Gear
            'Defense % (weapons), Block Rate (armors)', // T6 Main Stats
            '100% Block Rate',                        // T6 Required Stat Thresholds
            'Block Rate, Defense %, Effect Resist'    // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Rudy
    }

    // Ruri-specific content
    if (heroName === 'Ruri') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Her portrait art, model, and animations are really stupid. Need to buy skin to cover it.</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Magic',                          // T0 Gear
            'Crit Rate, Attack % (armors)',          // T0 Main Stats
            '7% weakness (if T2), 46% weakness if not T2, 100% crit rate', // T0 Required Stat Thresholds
            'Crit Rate, Crit Damange, Attack %, Weakness Hit (if not T2)', // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S1, S2, Passive</p>
            </div>
        `);

        return; // Exit early for Ruri
    }

    // Yeonhee-specific content
    if (heroName === 'Yeonhee') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Yeonhee is a very strong magic user who can be used in lots of places. She needs 100% crit chance to perform well, substat Crit Damage or Weakness Hit is just bonus damage! She does not have that great of skill enchances nothing to chase over, its better to prioritize other hero skill enhances unless you have most of your important ones out of the way.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Avenger Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Assassin Magic',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                    ${createGearCard(
                        'Bounty Tracker Physical',
                        'Crit Rate, Crit Damage',
                        '100% Crititcal Rate',
                        'Critical Damage, Weakness Hit Rate, Crititcal Damage, All Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>Skill 2, Passive, Skill 1, Basic Attack</p>
            </div>
        `);

        return; // Exit early for Yeonhee
    }

    // Yu Shin-specific content
    if (heroName === 'Yu Shin') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <ul style="margin: 0; padding-left: 1.5rem;">
                <li>Very good for locking targets down in both PvP and PVE</li>
                <li>T2 cleanse is really strong but no need to upgrade him more than that.</li>
                <li>Stats dont really matter, since point is to lock down enemy while mercure dot kills</li>
            </ul>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Spellweaver Magic',                      // T0 Gear
            'N/A',                                    // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'None',                                   // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - T0 has 3 gear sets
        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T0</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Spellweaver Magic',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Full Speed',
                        'N/A',
                        'Speed',
                        'Speed'
                    )}
                    ${createGearCard(
                        'Orchestrator Magic',
                        'N/A (T2 for counter cc/cleanse)',
                        'Speed',
                        'Speed'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, Passive</p>
            </div>
        `);

        return; // Exit early for Yu Shin
    }

    // Sieg-specific content
    if (heroName === 'Sieg') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Mainly used if u have T6 Biscuit as a 2nd dps for certain fights (dragon and Kris castle rush)</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Gatekeeper Physical',                    // T0 Gear
            'All Attack % (weapons), Block Rate (armors)', // T0 Main Stats
            'None',                                   // T0 Required Stat Thresholds
            'All Attack %, Block Rate',              // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        // Gear PvP section - only T6 has data
        addHeroSection('Gear PvP', `
            <div class="tier-section">
                <h3 class="tier-section-title">Gear T6</h3>
                <div class="gear-cards-grid">
                    ${createGearCard(
                        'Avenger Physical',
                        'Crit Rate, Weakness Hit, All Attack % (armors)',
                        '19% Weakness Hit Rate, 100% Crit Rate',
                        'Crit Rate, Crit Damage, Weakness Hit, Attack %'
                    )}
                </div>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>N/A</p>
            </div>
        `);

        return; // Exit early for Sieg
    }

    // Taka-specific content
    if (heroName === 'Taka') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Can replace him with Kyle early on, but he outscales Kyle later for castle rush. U use both on some.</p>
        `, heroName);

        // Gear PvE section - only T0 has data
        addHeroSection('Gear PvE', buildGearSection(
            'Avenger Physical',                       // T0 Gear
            'Crit Rate, Attack % (armors)',          // T0 Main Stats
            '100% Crit Rate, 20% Weakness Hit',      // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, Weakness Hit, Attack %', // T0 Sub Stat Priority
            null,                                     // T6 Gear (not specified)
            null,                                     // T6 Main Stats
            null,                                     // T6 Required Stat Thresholds
            null                                      // T6 Sub Stat Priority
        ));

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, S1, Passive</p>
            </div>
        `);

        return; // Exit early for Taka
    }

    // Teo-specific content
    if (heroName === 'Teo') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>AOE pumper. Will carry you through adventure and a lot of nightmare. Gets outshined by Kyle later on but still good to have for farming</p>
        `, heroName);

        // Gear PvE section - T0 and T6 have different gear
        addHeroSection('Gear PvE', buildGearSection(
            'Assassin Physical',                      // T0 Gear
            'Crit Rate, Crit Damage, Attack % (armors)', // T0 Main Stats
            '100% Crit Rate',                         // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, All Attack %',  // T0 Sub Stat Priority
            'Avenger Physical',                       // T6 Gear
            'Crit Damage, Attack % (armors)',        // T6 Main Stats
            'Max crit damage',                        // T6 Required Stat Thresholds
            'Crit Damage, Attack %'                   // T6 Sub Stat Priority
        ));

        // Gear PvP section - T0 and T6 have different gear
        addHeroSection('Gear PvP', buildGearSection(
            'Assassin Physical',                      // T0 Gear
            'Crit Rate, Crit Damage, Attack % (armors)', // T0 Main Stats
            '100% Crit Rate',                         // T0 Required Stat Thresholds
            'Crit Rate, Crit Damage, Speed, All Attack %', // T0 Sub Stat Priority
            'Bounty Tracker Physical',                // T6 Gear
            'Weakness Hit, Crit Damage, Attack % (armors)', // T6 Main Stats
            '100% Weakness Hit, pump rest into crit damage', // T6 Required Stat Thresholds
            'Weakness Hit, Crit Damage, Speed, Attack %' // T6 Sub Stat Priority
        ));

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>S2, S1, Passive</p>
            </div>
        `);

        return; // Exit early for Teo
    }

    // Spike-specific content (Fodder)
    if (heroName === 'Spike') {
        // Tips and Effects section (side-by-side) - shown first
        addTipsAndEffectsSection(`
            <p>Fodder. This hero is not worth investing in.</p>
        `, heroName);

        // Gear sections
        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Spike
    }

    // Bane-specific content (Fodder)
    if (heroName === 'Bane') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Bane
    }

    // Catty-specific content (Fodder)
    if (heroName === 'Catty') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Catty
    }

    // Cleo-specific content (Fodder)
    if (heroName === 'Cleo') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Cleo
    }

    // Sylvia-specific content (Fodder)
    if (heroName === 'Sylvia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Sylvia
    }

    // Heavenia-specific content (Fodder)
    if (heroName === 'Heavenia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Heavenia
    }

    // Hellenia-specific content (Fodder)
    if (heroName === 'Hellenia') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Hellenia
    }

    // Lania-specific content (Fodder)
    if (heroName === 'Lania') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Lania
    }

    // May-specific content (Fodder)
    if (heroName === 'May') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for May
    }

    // Hokin-specific content (Fodder)
    if (heroName === 'Hokin') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Hokin
    }

    // Rahkun-specific content (Fodder)
    if (heroName === 'Rahkun') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Rahkun
    }

    // Snipper-specific content (Fodder)
    if (heroName === 'Snipper') {
        addTipsAndEffectsSection(`
            <p>Fodder. This guy is garbage</p>
        `, heroName);

        addHeroSection('Gear PvE', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Gear PvP', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <em>N/A - Fodder hero</em>
            </div>
        `);

        addHeroSection('Skill Enhance Priority', `
            <div class="subsection-content" style="color: var(--text-secondary);">
                <p>None</p>
            </div>
        `);

        return; // Exit early for Snipper
    }

    // Default content for other heroes
    // Tips and Effects section (side-by-side) - shown first
    addTipsAndEffectsSection(`
        <em>Content to be added</em>
    `, heroName);

    // Gear sections
    addHeroSection('Gear PvE', `
        <div class="subsection-content" style="color: var(--text-secondary);">
            <em>Content to be added</em>
        </div>
    `);

    addHeroSection('Gear PvP', `
        <div class="subsection-content" style="color: var(--text-secondary);">
            <em>Content to be added</em>
        </div>
    `);

    addHeroSection('Skill Enhance Priority', `
        <div class="subsection-content" style="color: var(--text-secondary);">
            <em>Content to be added</em>
        </div>
    `);
}

// Helper function to add tips and effects section together
function addTipsAndEffectsSection(tipsContent, heroName) {
    const sectionsContainer = document.getElementById('hero-sections');

    // Create container for tips and effects side-by-side
    const container = document.createElement('div');
    container.className = 'tips-effects-container';

    // Tips section
    const tipsSection = document.createElement('div');
    tipsSection.className = 'tips-section';

    const tipsTitle = document.createElement('h2');
    tipsTitle.textContent = 'Tips/Important Info';

    const tipsContentDiv = document.createElement('div');
    tipsContentDiv.className = 'subsection-content';
    tipsContentDiv.innerHTML = tipsContent;
    tipsContentDiv.style.cssText = 'color: var(--text-secondary); line-height: 1.8;';

    tipsSection.appendChild(tipsTitle);
    tipsSection.appendChild(tipsContentDiv);

    // Effects section
    const effectsSection = document.createElement('div');
    effectsSection.className = 'effects-section';

    const effectsTitle = document.createElement('h2');
    effectsTitle.textContent = 'Effect List';

    const effectsList = document.createElement('ul');
    effectsList.className = 'effect-list';

    // Get effects for this hero
    const data = heroData[heroName];
    const validEffects = data && Array.isArray(data.effects)
        ? data.effects.filter(effect => !isPlaceholderValue(effect))
        : [];
    if (validEffects.length > 0) {
        console.log(`Displaying ${validEffects.length} effects for ${heroName}:`, validEffects);
        validEffects.forEach(effect => {
            const li = document.createElement('li');
            li.className = 'effect-item';
            li.textContent = effect;
            effectsList.appendChild(li);
        });
    } else {
        console.log(`No effects found for ${heroName}. Data:`, data);
        const li = document.createElement('li');
        li.className = 'effect-item';
        li.innerHTML = '<em>No effects listed</em>';
        li.style.fontStyle = 'italic';
        effectsList.appendChild(li);
    }

    effectsSection.appendChild(effectsTitle);
    effectsSection.appendChild(effectsList);

    // Add both sections to container
    container.appendChild(tipsSection);
    container.appendChild(effectsSection);

    // Remove placeholder if exists
    const placeholder = sectionsContainer.querySelector('.section-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    sectionsContainer.appendChild(container);
}

// Helper function to add hero sections dynamically
// This will be used when you specify what sections to add
function addHeroSection(title, content) {
    const sectionsContainer = document.getElementById('hero-sections');

    const section = document.createElement('div');
    section.className = 'hero-section';
    section.style.cssText = `
        padding: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 20px;
    `;

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = title;
    sectionTitle.style.cssText = `
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--accent-primary);
    `;

    const sectionContent = document.createElement('div');
    sectionContent.className = 'section-content';
    sectionContent.innerHTML = content;
    sectionContent.style.cssText = `
        color: var(--text-secondary);
        line-height: 1.6;
    `;

    section.appendChild(sectionTitle);
    section.appendChild(sectionContent);

    // Remove placeholder if exists
    const placeholder = sectionsContainer.querySelector('.section-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    sectionsContainer.appendChild(section);
}

// Export functions for potential use
window.heroDatabase = {
    heroes,
    showHeroDetail,
    addHeroSection,
    getCurrentHero: () => selectedHero
};
