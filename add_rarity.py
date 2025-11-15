"""
Script to add rarity information to hero data files based on GameWith tier list
"""
import os
import re

# Mapping of heroes to their tier/rarity from GameWith
HERO_RARITY = {
    # SSS Tier (Legendary)
    'Kagura': 'SSS',
    'Colt': 'SSS',
    'Karma': 'SSS',
    'Rin': 'SSS',
    'Mercure': 'SSS',
    'Yeonhee': 'SSS',
    'Teo': 'SSS',
    'Fai': 'SSS',
    'Rosie': 'SSS',
    'Juri': 'SSS',
    'Jave': 'SSS',

    # SS Tier (Legendary)
    'Klahan': 'SS',
    'Miho': 'SS',
    'Orly': 'SS',
    'Biscuit': 'SS',
    'Platin': 'SS',
    'Rudy': 'SS',
    'Rachel': 'SS',
    'Eileene': 'SS',
    'Spike': 'SS',
    'Kris': 'SS',
    'Dellons': 'SS',
    'Vanessa': 'SS',
    'Ace': 'SS',
    'Silvesta': 'SS',
    'Pascal': 'SS',
    'Lina': 'SS',

    # S+ Tier (Rare)
    'Amelia': 'S+',
    'Daisy': 'S+',
    'Taka': 'S+',
    'Evan': 'S+',
    'Alice': 'S+',
    'Espada': 'S+',
    'Leo': 'S+',
    'Nia': 'S+',
    'Knox': 'S+',

    # S Tier (Rare)
    'Karon': 'S',
    'Chloe': 'S',
    'Victoria': 'S',
    'Black Rose': 'S',
    'Lucy': 'S',
    'Ruri': 'S',
    'Bi Dam': 'S',
    'Feng Yan': 'S',
    'Yu Shin': 'S',
    'Asura': 'S',

    # A+ Tier (Uncommon)
    'Ariel': 'A+',
    'Heavenia': 'A+',
    'Sieg': 'A+',
    'Joker': 'A+',
    'Jin': 'A+',
    'Ballista': 'A+',
    'May': 'A+',
    'Yuri': 'A+',
    'Lania': 'A+',
    'Li': 'A+',
    'Rei': 'A+',
    'Soi': 'A+',
    'Sarah': 'A+',
    'Cleo': 'A+',

    # Lower Tiers
    'Bane': 'B',
    'Aragon': 'B',
    'Jane': 'B',
    'Jupy': 'B',
    'Sylvia': 'B',
    'Snipper': 'B',
    'Shane': 'B',
    'Sera': 'B',
    'Chancellor': 'B',
    'Noho': 'B',
    'Rook': 'B',
}

def add_rarity_to_hero_file(filepath):
    """Add rarity field to a hero data file"""
    # Extract hero name from filename
    filename = os.path.basename(filepath)
    hero_name = filename.replace('.txt', '')

    # Get rarity for this hero
    rarity = HERO_RARITY.get(hero_name, 'Unknown')

    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if rarity already exists
    if 'Rarity:' in content:
        print(f"[OK] {hero_name} - Rarity already exists, skipping")
        return False

    # Find the line after "Wish list priority:" and add rarity before "Type:"
    # Pattern: Look for "Wish list priority: X\n" and insert after it
    pattern = r'(Wish list priority: .+\n)'

    if re.search(pattern, content):
        # Insert rarity after wish list priority
        new_content = re.sub(
            pattern,
            f'\\1Rarity: {rarity}\n',
            content
        )

        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"[+] {hero_name} - Added rarity: {rarity}")
        return True
    else:
        print(f"[!] {hero_name} - Could not find 'Wish list priority' field")
        return False

def main():
    hero_data_dir = 'hero_data'

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found")
        return

    # Get all .txt files in hero_data directory
    hero_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(hero_files)} hero files\n")

    updated_count = 0
    skipped_count = 0
    error_count = 0
    unknown_heroes = []

    for filename in sorted(hero_files):
        filepath = os.path.join(hero_data_dir, filename)
        hero_name = filename.replace('.txt', '')

        if hero_name not in HERO_RARITY:
            unknown_heroes.append(hero_name)

        result = add_rarity_to_hero_file(filepath)
        if result:
            updated_count += 1
        elif 'Rarity:' in open(filepath, 'r', encoding='utf-8').read():
            skipped_count += 1
        else:
            error_count += 1

    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Updated: {updated_count}")
    print(f"  Skipped: {skipped_count}")
    print(f"  Errors: {error_count}")

    if unknown_heroes:
        print(f"\n  Unknown heroes (set to 'Unknown'):")
        for hero in unknown_heroes:
            print(f"    - {hero}")

if __name__ == '__main__':
    main()
