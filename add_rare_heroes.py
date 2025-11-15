#!/usr/bin/env python3
"""
Script to batch add rare heroes to the 7K Gearing database
Fetches hero data from GameWith and creates necessary files
"""

import requests
from bs4 import BeautifulSoup
import os
import time

# List of all rare heroes with their IDs
RARE_HEROES = [
    ("Evan", 70607, "Defense"),
    ("Karin", 70606, "Support"),
    ("Ariel", 70594, "Magic"),
    ("Bane", 70592, "Magic"),
    ("Heavenia", 70589, "Attack"),
    ("Hellenia", 70588, "Attack"),
    ("Karon", 70586, "Support"),
    ("Catty", 70585, "Attack"),
    ("Chloe", 70584, "Support"),
    ("Jane", 70581, "Attack"),
    ("Jupy", 70580, "Attack"),
    ("Joker", 70579, "Magic"),
    ("Sylvia", 70578, "Magic"),
    ("Jin", 70577, "Attack"),
    ("Snipper", 70576, "Attack"),
    ("Sera", 70574, "Magic"),
    ("Noho", 70570, "Magic"),
    ("Victoria", 70567, "Support"),
    ("Black Rose", 70566, "Attack"),
    ("May", 70564, "Attack"),
    ("Yui", 70563, "Support"),
    ("Yuri", 70562, "Magic"),
    ("Lania", 70561, "Magic"),
    ("Li", 70560, "Attack"),
    ("Lucy", 70557, "Support"),
    ("Rei", 70555, "Attack"),
    ("Asura", 70554, "Magic"),
    ("Soi", 70553, "Attack"),
    ("Feng Yan", 70551, "Attack"),
    ("Cleo", 70541, "Magic"),
    ("Sarah", 70538, "Support"),
    ("Hokin", 70514, "Attack"),
    ("Rahkun", 70509, "Defense"),
    ("Leo", 70506, "Attack"),
]

BASE_URL = "https://gamewith.net/sevenknights-rebirth/"
PROJECT_DIR = r"C:\Users\B\Videos\Projects\7k Gearing"
PORTRAITS_DIR = os.path.join(PROJECT_DIR, "Hero Portraits")
HERO_DATA_DIR = os.path.join(PROJECT_DIR, "hero_data")

def fetch_hero_page(hero_id):
    """Fetch hero page and return BeautifulSoup object"""
    url = f"{BASE_URL}{hero_id}"
    print(f"  Fetching {url}...")
    response = requests.get(url)
    return BeautifulSoup(response.content, 'html.parser')

def extract_portrait_url(soup):
    """Extract portrait image URL from hero page"""
    # Look for the profile image (600x315 pixels from /jp/img/)
    images = soup.find_all('img')
    for img in images:
        src = img.get('src', '')
        if '/jp/img/' in src and src.endswith('.png'):
            if 'http' not in src:
                src = 'https:' + src if src.startswith('//') else 'https://img.gamewith.net' + src
            return src
    return None

def extract_effects(soup):
    """Extract hero effects/abilities from page"""
    effects = []
    # This is a simplified extraction - actual implementation would need to parse the skill descriptions
    # For now, return placeholder
    return ["[Effect data to be manually filled]"]

def extract_target_info(soup):
    """Extract target number from hero page"""
    # Simplified - would need actual parsing logic
    return "TBD"

def download_portrait(url, hero_name):
    """Download portrait image"""
    if not url:
        print(f"  WARNING: No portrait URL found for {hero_name}")
        return False

    filepath = os.path.join(PORTRAITS_DIR, f"{hero_name}.png")
    print(f"  Downloading portrait to {filepath}...")

    response = requests.get(url)
    if response.status_code == 200:
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"  ✓ Downloaded {hero_name}.png ({len(response.content)} bytes)")
        return True
    else:
        print(f"  ERROR: Failed to download portrait (status {response.status_code})")
        return False

def create_hero_data_file(hero_name, hero_type, target_info, effects):
    """Create hero_data txt file"""
    filepath = os.path.join(HERO_DATA_DIR, f"{hero_name}.txt")

    effects_text = "\n".join(effects)

    content = f"""=====================================
HERO: {hero_name}
=====================================

--- META INFORMATION ---
Role: {hero_type}
Primary content used in: [To be filled]
Target transcendence: T0
Wish list priority: Low
Type: {hero_type}
Target Number: {target_info}

--- EFFECTS ---
{effects_text}


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

    print(f"  ✓ Created {hero_name}.txt")

def main():
    print("=" * 60)
    print("Rare Heroes Batch Import Script")
    print("=" * 60)
    print(f"Total heroes to process: {len(RARE_HEROES)}\n")

    successful = []
    failed = []

    for hero_name, hero_id, hero_type in RARE_HEROES:
        print(f"\nProcessing {hero_name} (ID: {hero_id}, Type: {hero_type})...")

        try:
            # Fetch hero page
            soup = fetch_hero_page(hero_id)

            # Extract data
            portrait_url = extract_portrait_url(soup)
            effects = extract_effects(soup)
            target_info = extract_target_info(soup)

            # Download portrait
            if download_portrait(portrait_url, hero_name):
                # Create hero data file
                create_hero_data_file(hero_name, hero_type, target_info, effects)
                successful.append(hero_name)
            else:
                failed.append(hero_name)

            # Be nice to the server
            time.sleep(1)

        except Exception as e:
            print(f"  ERROR: {e}")
            failed.append(hero_name)

    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"Successfully processed: {len(successful)}/{len(RARE_HEROES)}")
    print(f"Failed: {len(failed)}/{len(RARE_HEROES)}")

    if failed:
        print("\nFailed heroes:")
        for hero in failed:
            print(f"  - {hero}")

    print("\nNext steps:")
    print("1. Add hero names to heroes array in script.js")
    print("2. Run sync_hero_data.py to update embedded data")
    print("3. Manually fill in effect data for each hero")

if __name__ == "__main__":
    main()
