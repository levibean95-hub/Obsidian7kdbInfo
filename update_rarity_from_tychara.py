"""
Update hero rarities based on Tychara game data
"""
import os
import re

# Official rarity data from https://tychara.com/7kRebirth/Data/7kReBirthCharacter.json
HERO_RARITY = {
    # L++
    'Fai': 'L++',
    'Rosie': 'L++',
    'Juri': 'L++',

    # L+
    'Rudy': 'L+',
    'Eileene': 'L+',
    'Rachel': 'L+',
    'Dellons': 'L+',
    'Spike': 'L+',
    'Jave': 'L+',
    'Kris': 'L+',
    'Vanessa': 'L+',
    'Mercure': 'L+',
    'Colt': 'L+',
    'Platin': 'L+',
    'Ace': 'L+',
    'Rin': 'L+',
    'Teo': 'L+',
    'Yeonhee': 'L+',
    'Karma': 'L+',
    'Silvesta': 'L+',
    'Biscuit': 'L+',

    # L
    'Orly': 'L',
    'Daisy': 'L',
    'Taka': 'L',
    'Rook': 'L',
    'Chancellor': 'L',
    'Alice': 'L',
    'Aragon': 'L',
    'Ruri': 'L',
    'Nia': 'L',
    'Espada': 'L',
    'Shane': 'L',
    'Sieg': 'L',
    'Ballista': 'L',
    'Lina': 'L',
    'Yu Shin': 'L',
    'Bi Dam': 'L',
    'Pascal': 'L',
    'Knox': 'L',

    # R (Rare)
    'Evan': 'Rare',
    'Karin': 'Rare',
    'Yuri': 'Rare',
    'Li': 'Rare',
    'Yui': 'Rare',
    'Ariel': 'Rare',
    'Jupy': 'Rare',
    'Snipper': 'Rare',
    'Hellenia': 'Rare',
    'Heavenia': 'Rare',
    'Karon': 'Rare',
    'Victoria': 'Rare',
    'Lucy': 'Rare',
    'Sylvia': 'Rare',
    'Joker': 'Rare',
    'May': 'Rare',
    'Noho': 'Rare',
    'Chloe': 'Rare',
    'Jane': 'Rare',
    'Black Rose': 'Rare',
    'Sera': 'Rare',
    'Catty': 'Rare',
    'Jin': 'Rare',
    'Rei': 'Rare',
    'Soi': 'Rare',
    'Feng Yan': 'Rare',
    'Asura': 'Rare',
    'Hokin': 'Rare',
    'Rahkun': 'Rare',
    'Leo': 'Rare',
    'Bane': 'Rare',
    'Cleo': 'Rare',
    'Lania': 'Rare',
    'Sarah': 'Rare',

    # Heroes not in Tychara data (keeping as Unknown)
    'Aquila': 'Unknown',
    'Kyle': 'Unknown',
    'Kyrielle': 'Unknown',
    'Amelia': 'Unknown',
    'Klahan': 'Unknown',
    'Miho': 'Unknown',
}

def update_hero_rarity(filepath, hero_name, new_rarity):
    """Update the rarity in a hero data file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the rarity line
    pattern = r'(Rarity:\s*)(.+)'
    new_content = re.sub(pattern, f'\\1{new_rarity}', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    hero_data_dir = 'hero_data'

    print("=" * 60)
    print("Update Hero Rarities from Tychara Game Data")
    print("=" * 60)
    print()

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found")
        return

    # Get all .txt files
    hero_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(hero_files)} hero files\n")

    updated_count = 0
    rarity_counts = {'L++': 0, 'L+': 0, 'L': 0, 'Rare': 0, 'Unknown': 0}

    for filename in sorted(hero_files):
        hero_name = filename.replace('.txt', '')
        filepath = os.path.join(hero_data_dir, filename)

        # Get the rarity for this hero
        rarity = HERO_RARITY.get(hero_name, 'Unknown')
        rarity_counts[rarity] += 1

        # Update the file
        if update_hero_rarity(filepath, hero_name, rarity):
            print(f"[+] {hero_name:20} -> {rarity}")
            updated_count += 1
        else:
            print(f"[=] {hero_name:20} -> {rarity} (no change)")

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} heroes")
    print(f"\nRarity distribution:")
    print(f"  L++: {rarity_counts['L++']} heroes")
    print(f"  L+: {rarity_counts['L+']} heroes")
    print(f"  L: {rarity_counts['L']} heroes")
    print(f"  Rare: {rarity_counts['Rare']} heroes")
    print(f"  Unknown: {rarity_counts['Unknown']} heroes")

if __name__ == '__main__':
    main()
