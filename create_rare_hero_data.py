#!/usr/bin/env python3
"""
Script to create hero_data txt files for all rare heroes
"""

import os

# List of all rare heroes with their types
RARE_HEROES = [
    ("Evan", "Defense"),
    ("Karin", "Support"),
    ("Ariel", "Magic"),
    ("Bane", "Magic"),
    ("Heavenia", "Attack"),
    ("Hellenia", "Attack"),
    ("Karon", "Support"),
    ("Catty", "Attack"),
    ("Chloe", "Support"),
    ("Jane", "Attack"),
    ("Jupy", "Attack"),
    ("Joker", "Magic"),
    ("Sylvia", "Magic"),
    ("Jin", "Attack"),
    ("Snipper", "Attack"),
    ("Sera", "Magic"),
    ("Noho", "Magic"),
    ("Victoria", "Support"),
    ("Black Rose", "Attack"),
    ("May", "Attack"),
    ("Yui", "Support"),
    ("Yuri", "Magic"),
    ("Lania", "Magic"),
    ("Li", "Attack"),
    ("Lucy", "Support"),
    ("Rei", "Attack"),
    ("Asura", "Magic"),
    ("Soi", "Attack"),
    ("Feng Yan", "Attack"),
    ("Cleo", "Magic"),
    ("Sarah", "Support"),
    ("Hokin", "Attack"),
    ("Rahkun", "Defense"),
    ("Leo", "Attack"),
]

PROJECT_DIR = r"C:\Users\B\Videos\Projects\7k Gearing"
HERO_DATA_DIR = os.path.join(PROJECT_DIR, "hero_data")

def create_hero_data_file(hero_name, hero_type):
    """Create hero_data txt file"""
    filepath = os.path.join(HERO_DATA_DIR, f"{hero_name}.txt")

    content = f"""=====================================
HERO: {hero_name}
=====================================

--- META INFORMATION ---
Role: {hero_type}
Primary content used in: [To be filled]
Target transcendence: T0
Wish list priority: Low
Type: {hero_type}
Target Number: [To be filled]

--- EFFECTS ---
[To be filled with hero-specific effects]


--- GEAR PVE ---
## T0 Gear Sets

Gear Set 1:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 2:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 3:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 4:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

## T6 Gear Sets

Gear Set 1:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 2:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 3:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 4:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

--- GEAR PVP ---
## T0 Gear Sets

Gear Set 1:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 2:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 3:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 4:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

## T6 Gear Sets

Gear Set 1:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 2:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 3:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

Gear Set 4:
Name:
Main Stats:
Required Stat Thresholds:
Sub Stat Priority:

--- SKILL ENHANCE PRIORITY ---
[To be filled with skill enhancement priorities]

--- TIPS/IMPORTANT INFO ---
[To be filled with hero-specific tips and information]
"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Created {hero_name}.txt")

def main():
    print("Creating hero_data files for all rare heroes...")
    print(f"Total heroes: {len(RARE_HEROES)}\n")

    for hero_name, hero_type in RARE_HEROES:
        create_hero_data_file(hero_name, hero_type)

    print(f"\nDone! Created {len(RARE_HEROES)} hero_data files.")

if __name__ == "__main__":
    main()
