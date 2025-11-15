"""
Update Hero Types Script
========================
This script updates the Type field in all hero data files to use hero classes
(Attack, Magic, Defense, Support, Universal) instead of attack types (Physical/Magic).
"""

import os
import re

# Hero type mappings based on GameWith data
HERO_TYPES = {
    # Attack Type
    'Amelia': 'Attack',
    'Ballista': 'Attack',
    'Bi Dam': 'Attack',
    'Colt': 'Attack',
    'Dellons': 'Attack',
    'Fai': 'Attack',
    'Kagura': 'Attack',
    'Klahan': 'Attack',
    'Kyle': 'Attack',
    'Shane': 'Attack',
    'Taka': 'Attack',
    'Teo': 'Attack',

    # Defense Type
    'Aquila': 'Defense',
    'Aragon': 'Defense',
    'Rook': 'Defense',
    'Rudy': 'Defense',

    # Support Type
    'Alice': 'Support',
    'Biscuit': 'Support',
    'Lina': 'Support',
    'Orly': 'Support',
    'Platin': 'Support',
    'Rosie': 'Support',

    # Magic Type
    'Daisy': 'Magic',
    'Espada': 'Magic',
    'Juri': 'Magic',
    'Kyrielle': 'Magic',
    'Mercure': 'Magic',
    'Miho': 'Magic',
    'Pascal': 'Magic',
    'Rin': 'Magic',
    'Ruri': 'Magic',
    'Silvesta': 'Magic',
    'Vanessa': 'Magic',
    'Yeonhee': 'Magic',
    'Yu Shin': 'Magic',

    # Universal Type
    'Ace': 'Universal',
    'Chancellor': 'Universal',
    'Eileene': 'Universal',
    'Jave': 'Universal',
    'Karma': 'Universal',
    'Kris': 'Universal',
    'Nia': 'Universal',
    'Rachel': 'Universal',
    'Sieg': 'Universal',
    'Spike': 'Universal',
}

def update_hero_type_in_file(filepath, hero_name):
    """Update the Type field in a hero data file."""
    if hero_name not in HERO_TYPES:
        print(f"  [SKIP] {hero_name}: No type mapping found")
        return False

    new_type = HERO_TYPES[hero_name]

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the Type line
    pattern = r'^Type:\s*.+$'
    replacement = f'Type: {new_type}'

    new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  [OK] {hero_name}: Updated to {new_type}")
        return True
    else:
        print(f"  [NO CHANGE] {hero_name}: Type field not found or already set")
        return False

def main():
    print("=" * 60)
    print("Hero Type Update Script")
    print("=" * 60)
    print()

    hero_data_dir = 'hero_data'

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found!")
        return

    # Get all .txt files
    txt_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(txt_files)} hero data files")
    print()

    updated_count = 0

    for filename in sorted(txt_files):
        filepath = os.path.join(hero_data_dir, filename)
        hero_name = filename.replace('.txt', '')

        if update_hero_type_in_file(filepath, hero_name):
            updated_count += 1

    print()
    print(f"Total files updated: {updated_count}/{len(txt_files)}")
    print()
    print("Done! Now run 'python sync_hero_data.py' to update script.js")

if __name__ == '__main__':
    main()
