"""
Hero Data Sync Script
=====================
This script reads all hero data files from hero_data/ folder,
extracts the effects, and updates the hero-data.json file

Usage: python sync_hero_data.py
"""

import os
import re
import json

def parse_gear_section(gear_text):
    """Parse a gear section (PVE or PVP) with T0 and T6 gear sets."""
    gear_data = {'T0': [], 'T6': []}

    # Split by T0 and T6 sections
    t0_match = re.search(r'##\s*T0\s*Gear Sets\s*\n(.*?)(?=##\s*T6|$)', gear_text, re.DOTALL)
    t6_match = re.search(r'##\s*T6\s*Gear Sets\s*\n(.*?)$', gear_text, re.DOTALL)

    for tier, match in [('T0', t0_match), ('T6', t6_match)]:
        if not match:
            continue

        tier_text = match.group(1)
        # Find all gear sets in this tier
        gear_sets = re.finditer(r'Gear Set \d+:\s*\n(.*?)(?=Gear Set \d+:|$)', tier_text, re.DOTALL)

        for gear_set in gear_sets:
            gear_content = gear_set.group(1).strip()

            # Extract fields
            name_match = re.search(r'Name:\s*(.*)$', gear_content, re.MULTILINE)
            main_stats_match = re.search(r'Main Stats:\s*(.*)$', gear_content, re.MULTILINE)
            thresholds_match = re.search(r'Required Stat Thresholds:\s*(.*)$', gear_content, re.MULTILINE)
            priority_match = re.search(r'Sub Stat Priority:\s*(.*)$', gear_content, re.MULTILINE)

            name = name_match.group(1).strip() if name_match else ''
            main_stats = main_stats_match.group(1).strip() if main_stats_match else ''
            thresholds = thresholds_match.group(1).strip() if thresholds_match else ''
            priority = priority_match.group(1).strip() if priority_match else ''

            # Only add gear sets that have actual data (not empty fields or field labels)
            # Skip if name is empty or contains a field label
            if name and not any(label in name for label in ['Name:', 'Main Stats:', 'Required Stat', 'Sub Stat']):
                gear_set_data = {
                    'name': name,
                    'main_stats': main_stats if 'Main Stats:' not in main_stats else '',
                    'required_stat_thresholds': thresholds if 'Required Stat' not in thresholds else '',
                    'sub_stat_priority': priority if 'Sub Stat' not in priority else ''
                }
                gear_data[tier].append(gear_set_data)

    return gear_data

def parse_hero_data_file(filepath):
    """Parse a hero data file and extract all information."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract hero name
    hero_match = re.search(r'^HERO:\s*(.+)$', content, re.MULTILINE)
    if not hero_match:
        return None

    hero_name = hero_match.group(1).strip()

    # Extract META INFORMATION fields
    role_match = re.search(r'^Role:\s*(.+)$', content, re.MULTILINE)
    role = role_match.group(1).strip() if role_match else None

    primary_content_match = re.search(r'^Primary content used in:\s*(.+)$', content, re.MULTILINE)
    primary_content = primary_content_match.group(1).strip() if primary_content_match else None

    target_trans_match = re.search(r'^Target transcendence:\s*(.+)$', content, re.MULTILINE)
    target_transcendence = target_trans_match.group(1).strip() if target_trans_match else None

    wishlist_match = re.search(r'^Wish list priority:\s*(.+)$', content, re.MULTILINE)
    wishlist_priority = wishlist_match.group(1).strip() if wishlist_match else None

    type_match = re.search(r'^Type:\s*(.+)$', content, re.MULTILINE)
    hero_type = type_match.group(1).strip() if type_match else None

    target_match = re.search(r'^Target Number:\s*(.+)$', content, re.MULTILINE)
    target_number = target_match.group(1).strip() if target_match else None

    rarity_match = re.search(r'^Rarity:\s*(.+)$', content, re.MULTILINE)
    rarity = rarity_match.group(1).strip() if rarity_match else 'Unknown'

    # Extract effects section
    effects_match = re.search(r'^---\s*EFFECTS?\s*---\s*\n(.*?)(?=\n---|\Z)', content, re.MULTILINE | re.DOTALL)
    effects = []
    if effects_match:
        effects_text = effects_match.group(1).strip()
        effects = [line.strip() for line in effects_text.split('\n') if line.strip()]

    # Extract GEAR PVE section
    gear_pve_match = re.search(r'^---\s*GEAR PVE\s*---\s*\n(.*?)(?=\n---|\Z)', content, re.MULTILINE | re.DOTALL)
    gear_pve = parse_gear_section(gear_pve_match.group(1)) if gear_pve_match else {'T0': [], 'T6': []}

    # Extract GEAR PVP section
    gear_pvp_match = re.search(r'^---\s*GEAR PVP\s*---\s*\n(.*?)(?=\n---|\Z)', content, re.MULTILINE | re.DOTALL)
    gear_pvp = parse_gear_section(gear_pvp_match.group(1)) if gear_pvp_match else {'T0': [], 'T6': []}

    # Extract SKILL ENHANCE PRIORITY section
    skill_priority_match = re.search(r'^---\s*SKILL ENHANCE PRIORITY\s*---\s*\n(.*?)(?=\n---|\Z)', content, re.MULTILINE | re.DOTALL)
    skill_enhance_priority = skill_priority_match.group(1).strip() if skill_priority_match else None

    # Extract TIPS/IMPORTANT INFO section
    tips_match = re.search(r'^---\s*TIPS/IMPORTANT INFO\s*---\s*\n(.*?)$', content, re.MULTILINE | re.DOTALL)
    tips = tips_match.group(1).strip() if tips_match else None

    return {
        'name': hero_name,
        'role': role,
        'primary_content': primary_content,
        'target_transcendence': target_transcendence,
        'wishlist_priority': wishlist_priority,
        'type': hero_type,
        'target_number': target_number,
        'rarity': rarity,
        'effects': effects,
        'gear_pve': gear_pve,
        'gear_pvp': gear_pvp,
        'skill_enhance_priority': skill_enhance_priority,
        'tips': tips
    }

def generate_json_data():
    """Generate the hero data JSON from all hero data files."""
    hero_data_dir = 'hero_data'
    hero_data_json = {}

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found!")
        return None

    # Get all .txt files in hero_data directory
    txt_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(txt_files)} hero data files")

    for filename in sorted(txt_files):
        filepath = os.path.join(hero_data_dir, filename)
        hero_data = parse_hero_data_file(filepath)

        if hero_data:
            hero_name = hero_data['name']
            hero_data_json[hero_name] = hero_data

            # Count gear sets
            pve_gear_count = len(hero_data['gear_pve']['T0']) + len(hero_data['gear_pve']['T6'])
            pvp_gear_count = len(hero_data['gear_pvp']['T0']) + len(hero_data['gear_pvp']['T6'])

            print(f"  [OK] {hero_name}: {len(hero_data['effects'])} effects, " +
                  f"{pve_gear_count} PVE gear sets, {pvp_gear_count} PVP gear sets")
        else:
            print(f"  [ERROR] Failed to parse {filename}")

    return hero_data_json

def write_json_file(data):
    """Write the hero data to JSON file."""
    json_path = 'data/hero-data.json'

    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)

    # Write JSON file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    return True

def main():
    print("=" * 60)
    print("Hero Data Sync Script")
    print("=" * 60)
    print()

    print("Parsing hero data files...")
    hero_data = generate_json_data()

    if not hero_data:
        print("\nError: No data generated")
        return

    print(f"\nTotal heroes processed: {len(hero_data)}")

    # Count total effects
    total_effects = sum(len(hero['effects']) for hero in hero_data.values())
    print(f"Total effects: {total_effects}")

    print("\nWriting hero-data.json...")
    if write_json_file(hero_data):
        print("[SUCCESS] data/hero-data.json updated successfully!")
        print("\nDone! The hero data JSON is now in sync with hero_data files.")
        print("Remember to hard refresh your browser (Ctrl+F5) to see changes.")
    else:
        print("[ERROR] Failed to write hero-data.json")

if __name__ == '__main__':
    main()
